const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Recitation = require('../models/Recitation');
const User = require('../models/User');

// @route   POST api/recitations
// @desc    Create a new recitation
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('studentId', 'Student ID is required').not().isEmpty(),
      check('surah', 'Surah is required').not().isEmpty(),
      check('ayah', 'Ayah is required').not().isEmpty(),
      check('audioUrl', 'Audio URL is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { studentId, surah, ayah, audioUrl, notes } = req.body;

      // Check if student exists
      const student = await User.findById(studentId);
      if (!student) {
        return res.status(404).json({ msg: 'Student not found' });
      }

      // Create new recitation
      const newRecitation = new Recitation({
        teacher: req.user.id,
        student: studentId,
        surah,
        ayah,
        audioUrl,
        notes
      });

      const recitation = await newRecitation.save();
      res.json(recitation);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/recitations
// @desc    Get all recitations for a teacher
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const recitations = await Recitation.find({ teacher: req.user.id })
      .populate('student', ['name', 'email'])
      .sort({ date: -1 });
    res.json(recitations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/recitations/student/:id
// @desc    Get all recitations for a specific student
// @access  Private
router.get('/student/:id', auth, async (req, res) => {
  try {
    const recitations = await Recitation.find({
      teacher: req.user.id,
      student: req.params.id
    })
      .populate('student', ['name', 'email'])
      .sort({ date: -1 });
    res.json(recitations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/recitations/:id
// @desc    Get recitation by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const recitation = await Recitation.findById(req.params.id)
      .populate('student', ['name', 'email']);

    if (!recitation) {
      return res.status(404).json({ msg: 'Recitation not found' });
    }

    // Check if user is authorized to view this recitation
    if (recitation.teacher.toString() !== req.user.id && 
        recitation.student.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    res.json(recitation);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Recitation not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/recitations/:id
// @desc    Update a recitation
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    let recitation = await Recitation.findById(req.params.id);

    if (!recitation) {
      return res.status(404).json({ msg: 'Recitation not found' });
    }

    // Check if user is authorized to update this recitation
    if (recitation.teacher.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Update fields
    const { surah, ayah, audioUrl, notes, feedback, status } = req.body;
    
    if (surah) recitation.surah = surah;
    if (ayah) recitation.ayah = ayah;
    if (audioUrl) recitation.audioUrl = audioUrl;
    if (notes) recitation.notes = notes;
    if (feedback) recitation.feedback = feedback;
    if (status) recitation.status = status;

    await recitation.save();
    res.json(recitation);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Recitation not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/recitations/:id
// @desc    Delete a recitation
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const recitation = await Recitation.findById(req.params.id);

    if (!recitation) {
      return res.status(404).json({ msg: 'Recitation not found' });
    }

    // Check if user is authorized to delete this recitation
    if (recitation.teacher.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await recitation.remove();
    res.json({ msg: 'Recitation removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Recitation not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;