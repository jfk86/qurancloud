// routes/progressRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Progress = require('../models/Progress');
const User = require('../models/User');

// @route   GET /api/progress
// @desc    Get progress for current user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let progress = await Progress.findOne({ student: req.user.id });

    // If no progress record exists, create one
    if (!progress) {
      progress = new Progress({
        student: req.user.id,
        completedSurahs: [],
        completedVerses: []
      });
      await progress.save();
    }

    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/progress/student/:id
// @desc    Get progress for a specific student
// @access  Private (Teachers only)
router.get('/student/:id', auth, async (req, res) => {
  try {
    // Verify user is a teacher
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    const progress = await Progress.findOne({ student: req.params.id });

    if (!progress) {
      return res.status(404).json({ msg: 'Progress record not found' });
    }

    res.json(progress);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Progress record not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/progress/surah
// @desc    Add a completed Surah
// @access  Private
router.post('/surah', auth, async (req, res) => {
  try {
    const { number, name } = req.body;

    if (!number || !name) {
      return res.status(400).json({ msg: 'Surah number and name are required' });
    }

    let progress = await Progress.findOne({ student: req.user.id });

    // If no progress record exists, create one
    if (!progress) {
      progress = new Progress({
        student: req.user.id,
        completedSurahs: [],
        completedVerses: []
      });
    }

    // Check if Surah is already completed
    if (progress.completedSurahs.some(surah => surah.number === number)) {
      return res.status(400).json({ msg: 'Surah already marked as completed' });
    }

    // Add completed Surah
    progress.completedSurahs.push({
      number,
      name,
      completedAt: Date.now()
    });

    // Update last activity
    progress.lastActivity = Date.now();

    await progress.save();

    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/progress/verse
// @desc    Add a completed verse
// @access  Private
router.post('/verse', auth, async (req, res) => {
  try {
    const { surah, verse } = req.body;

    if (!surah || !verse) {
      return res.status(400).json({ msg: 'Surah and verse numbers are required' });
    }

    let progress = await Progress.findOne({ student: req.user.id });

    // If no progress record exists, create one
    if (!progress) {
      progress = new Progress({
        student: req.user.id,
        completedSurahs: [],
        completedVerses: []
      });
    }

    // Check if verse is already completed
    if (progress.completedVerses.some(v => v.surah === surah && v.verse === verse)) {
      return res.status(400).json({ msg: 'Verse already marked as completed' });
    }

    // Add completed verse
    progress.completedVerses.push({
      surah,
      verse,
      completedAt: Date.now()
    });

    // Update last activity
    progress.lastActivity = Date.now();

    await progress.save();

    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/progress/all
// @desc    Get progress for all students
// @access  Private (Teachers only)
router.get('/all', auth, async (req, res) => {
  try {
    // Verify user is a teacher
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    const progress = await Progress.find()
      .populate('student', 'name email')
      .sort({ 'lastActivity': -1 });

    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;