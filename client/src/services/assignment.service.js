// src/services/assignment.service.js
// Mock data for testing without backend

// Mock assignments data
const mockAssignments = [
  {
    _id: '1',
    title: 'Memorize Surah Al-Fatiha',
    description: 'Focus on proper tajweed and pronunciation',
    surah: {
      number: 1,
      name: 'Al-Fatiha',
      verses: {
        start: 1,
        end: 7
      }
    },
    dueDate: '2025-03-20T00:00:00.000Z',
    assignedTo: ['student1', 'student2'],
    status: 'active'
  },
  {
    _id: '2',
    title: 'Review Surah Al-Ikhlas',
    description: 'Practice recitation with proper melody',
    surah: {
      number: 112,
      name: 'Al-Ikhlas',
      verses: {
        start: 1,
        end: 4
      }
    },
    dueDate: '2025-03-15T00:00:00.000Z',
    assignedTo: ['student1'],
    status: 'active'
  }
];

// Mock students data
const mockStudents = [
  {
    _id: 'student1',
    name: 'Ahmed Ali',
    email: 'ahmed@example.com'
  },
  {
    _id: 'student2',
    name: 'Sara Khan',
    email: 'sara@example.com'
  },
  {
    _id: 'student3',
    name: 'Mohammed Hassan',
    email: 'mohammed@example.com'
  }
];

// Get all assignments
export const getAssignments = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockAssignments;
};

// Get a single assignment by ID
export const getAssignment = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockAssignments.find(a => a._id === id);
};

// Create a new assignment
export const createAssignment = async (assignmentData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newAssignment = {
    _id: Date.now().toString(),
    ...assignmentData,
    status: 'active'
  };
  mockAssignments.push(newAssignment);
  return newAssignment;
};

// Update an existing assignment
export const updateAssignment = async (id, assignmentData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockAssignments.findIndex(a => a._id === id);
  if (index !== -1) {
    mockAssignments[index] = { ...mockAssignments[index], ...assignmentData };
    return mockAssignments[index];
  }
  throw new Error('Assignment not found');
};

// Delete an assignment
export const deleteAssignment = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockAssignments.findIndex(a => a._id === id);
  if (index !== -1) {
    mockAssignments.splice(index, 1);
    return { success: true };
  }
  throw new Error('Assignment not found');
};

// Get all students (for assignment assignment)
export const getAllStudents = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockStudents;
};