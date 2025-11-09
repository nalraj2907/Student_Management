const STORAGE_KEY = 'students';

export const getStudents = () => {
  try {
    const students = localStorage.getItem(STORAGE_KEY);
    return students ? JSON.parse(students) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

export const saveStudents = (students) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const addStudent = (student) => {
  const students = getStudents();
  const newStudent = {
    ...student,
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
  };
  students.push(newStudent);
  saveStudents(students);
  return newStudent;
};

export const updateStudent = (id, updatedStudent) => {
  const students = getStudents();
  const index = students.findIndex((s) => s.id === id);
  if (index !== -1) {
    students[index] = { ...updatedStudent, id };
    saveStudents(students);
    return students[index];
  }
  return null;
};

export const deleteStudent = (id) => {
  const students = getStudents();
  const filtered = students.filter((s) => s.id !== id);
  saveStudents(filtered);
  return filtered;
};

