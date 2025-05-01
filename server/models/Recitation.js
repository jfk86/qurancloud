const mongoose = require('mongoose');

const RecitationSchema = new mongoose.Schema({
  // Preserve existing fields
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  // Enhanced surah information
  surah: {
    number: {
      type: Number,
      required: true,
      min: 1,
      max: 114
    },
    name: {
      type: String,
      required: true
    },
    verses: {
      start: {
        type: Number,
        required: true,
        min: 1
      },
      end: {
        type: Number,
        required: true,
        min: 1
      }
    }
  },
  // Keep original fields for backward compatibility
  ayah: {
    type: String
  },
  audioUrl: {
    type: String
  },
  notes: {
    type: String
  },
  feedback: {
    type: String
  },
  // Enhanced status options
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'approved', 'needs-improvement'],
    default: 'pending'
  },
  // Additional fields for better tracking
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment'
  },
  duration: {
    type: Number, // in seconds
    default: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  reviewedAt: {
    type: Date
  },
  // Keep original date field
  date: {
    type: Date,
    default: Date.now
  },
  // Add createdAt for consistency with other models
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('recitation', RecitationSchema);