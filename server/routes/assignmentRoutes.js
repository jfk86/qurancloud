// routes/assignmentRoutes.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Assignment = require('../models/Assignment');
const User = require('../models/User');

// @route   POST /api/assignments
// @desc    Create a new assignment
// @access  Private (Teachers only)
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('surah.number', 'Surah number is required').isNumeric(),
      check('surah.name', 'Surah name is required').not().isEmpty(),
      check('surah.verses.start', 'Starting verse is required').isNumeric(),
      check('surah.verses.end', 'Ending verse is required').isNumeric()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Verify user is a teacher
      if (req.user.role !== 'teacher') {
        return res.status(403).json({ msg: 'Not authorized to create assignments' });
      }

      const { title, description, surah, dueDate, assignedTo } = req.body;

      // Create new assignment
      const assignment = new Assignment({
        title,
        description,
        surah,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        assignedTo,
        createdBy: req.user.id
      });

      await assignment.save();

      res.json(assignment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET /api/assignments
// @desc    Get all assignments (teachers get all, students get their assignments)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let assignments;

    if (req.user.role === 'teacher') {
      // Teachers see assignments they created
      assignments = await Assignment.find({ createdBy: req.user.id })
        .sort({ createdAt: -1 });
    } else {
      // Students see assignments assigned to them
      assignments = await Assignment.find({ assignedTo: req.user.id })
        .sort({ createdAt: -1 });
    }

    res.json(assignments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/assignments/:id
// @desc    Get assignment by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ msg: 'Assignment not found' });
    }

    // Check if user has access to this assignment
    if (
      req.user.role !== 'teacher' && 
      !assignment.assignedTo.includes(req.user.id)
    ) {
      return res.status(403).json({ msg: 'Not authorized to view this assignment' });
    }

    res.json(assignment);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Assignment not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/assignments/:id
// @desc    Update assignment
// @access  Private (Teachers only)
router.put('/:id', auth, async (req, res) => {
  try {
    // Verify user is a teacher
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ msg: 'Not authorized to update assignments' });
    }

    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ msg: 'Assignment not found' });
    }

    // Check if teacher created this assignment
    if (assignment.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized to update this assignment' });
    }

    // Update fields
    const { title, description, surah, dueDate, assignedTo } = req.body;

    if (title) assignment.title = title;
    if (description) assignment.description = description;
    if (surah) assignment.surah = surah;
    if (dueDate) assignment.dueDate = new Date(dueDate);
    if (assignedTo) assignment.assignedTo = assignedTo;

    await assignment.save();

    res.json(assignment);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Assignment not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/assignments/:id
// @desc    Delete assignment
// @access  Private (Teachers only)
router.delete('/:id', auth, async (req, res) => {
  try {
    // Verify user is a teacher
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ msg: 'Not authorized to delete assignments' });
    }

    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ msg: 'Assignment not found' });
    }

    // Check if teacher created this assignment
    if (assignment.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized to delete this assignment' });
    }

    await assignment.remove();

    res.json({ msg: 'Assignment removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Assignment not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/assignments/students
// @desc    Get all students (for teacher to assign assignments)
// @access  Private (Teachers only)
router.get('/students/all', auth, async (req, res) => {
  try {
    // Verify user is a teacher
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    const students = await User.find({ role: 'student' })
      .select('-password')
      .sort({ name: 1 });

    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;