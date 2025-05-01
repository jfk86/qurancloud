const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  completedSurahs: [{
    surahNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 114
    },
    name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    completedAt: {
      type: Date,
      default: Date.now
    },
    feedback: {
      type: String
    }
  }],
  recitationHistory: [{
    date: {
      type: Date,
      default: Date.now
    },
    duration: {
      type: Number, // in minutes
      default: 0
    },
    completed: {
      type: Number, // number of surahs or verses completed
      default: 0
    }
  }],
  achievements: [{
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    earnedAt: {
      type: Date,
      default: Date.now
    },
    icon: {
      type: String,
      default: 'trophy'
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Progress', ProgressSchema);