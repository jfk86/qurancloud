// src/services/progress.service.js
// Mock data for testing without backend

// Mock progress data
const mockProgressData = {
  completedSurahs: [
    { _id: '1', name: 'Al-Fatiha', rating: 4.5, completedAt: '2025-03-09T14:30:00' },
    { _id: '112', name: 'Al-Ikhlas', rating: 5.0, completedAt: '2025-03-05T14:30:00' },
    { _id: '113', name: 'Al-Falaq', rating: 4.8, completedAt: '2025-02-28T11:20:00' },
    { _id: '114', name: 'An-Nas', rating: 4.7, completedAt: '2025-02-25T10:15:00' },
    { _id: '103', name: 'Al-Asr', rating: 4.6, completedAt: '2025-02-20T16:45:00' },
    { _id: '108', name: 'Al-Kawthar', rating: 4.9, completedAt: '2025-02-15T09:30:00' },
    { _id: '110', name: 'An-Nasr', rating: 4.7, completedAt: '2025-02-10T13:20:00' },
    { _id: '111', name: 'Al-Masad', rating: 4.5, completedAt: '2025-02-05T15:10:00' },
    { _id: '105', name: 'Al-Fil', rating: 4.8, completedAt: '2025-01-30T11:45:00' },
    { _id: '106', name: 'Quraysh', rating: 4.6, completedAt: '2025-01-25T14:20:00' },
    { _id: '107', name: 'Al-Ma\'un', rating: 4.7, completedAt: '2025-01-20T10:30:00' },
    { _id: '109', name: 'Al-Kafirun', rating: 4.9, completedAt: '2025-01-15T16:15:00' }
  ],
  recitationHistory: [
    { date: '2025-03-09T14:30:00', duration: 25, completed: 1 },
    { date: '2025-03-08T10:15:00', duration: 30, completed: 1 },
    { date: '2025-03-07T16:45:00', duration: 15, completed: 0 },
    { date: '2025-03-06T11:30:00', duration: 20, completed: 1 },
    { date: '2025-03-05T14:30:00', duration: 30, completed: 2 }
  ],
  achievements: [
    {
      _id: '1',
      title: 'Consistency Champion',
      description: 'Completed recitations for 5 consecutive days',
      earnedAt: '2025-03-08T10:00:00',
      icon: 'trophy'
    },
    {
      _id: '2',
      title: 'First Perfect Score',
      description: 'Received a 5.0 rating on Surah Al-Ikhlas',
      earnedAt: '2025-03-05T14:30:00',
      icon: 'star'
    },
    {
      _id: '3',
      title: 'Surah Milestone',
      description: 'Completed 10 surahs',
      earnedAt: '2025-03-01T09:15:00',
      icon: 'medal'
    }
  ]
};

// Get progress data for the current user
export const getProgress = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockProgressData;
};

// Get progress data for a specific student (teacher only)
export const getStudentProgress = async (studentId) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockProgressData;
};

// Add a completed Surah
export const addCompletedSurah = async (surahData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newSurah = {
    _id: Date.now().toString(),
    ...surahData,
    completedAt: new Date().toISOString()
  };
  mockProgressData.completedSurahs.push(newSurah);
  return newSurah;
};

// Update recitation history
export const updateRecitationHistory = async (recitationData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newRecitation = {
    ...recitationData,
    date: new Date().toISOString()
  };
  mockProgressData.recitationHistory.push(newRecitation);
  return newRecitation;
};

// Get achievements for the current user
export const getAchievements = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockProgressData.achievements;
};