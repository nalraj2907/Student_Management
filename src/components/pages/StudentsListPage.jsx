import React, { useState, useEffect } from 'react';
import StudentList from '../StudentList';
import StudentForm from '../StudentForm';
import Modal from '../Modal';
import { getStudents, addStudent, updateStudent, deleteStudent } from '../../utils/storage';

const StudentsListPage = ({ user }) => {
  const isAdmin = user?.role === 'admin';
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('');

  useEffect(() => {
    const loadedStudents = getStudents();
    setStudents(loadedStudents);
    setFilteredStudents(loadedStudents);
  }, []);

  useEffect(() => {
    let filtered = students;

    // Filter by search term (name or student ID)
    if (searchTerm) {
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by course
    if (filterCourse) {
      filtered = filtered.filter(
        (student) =>
          student.course.toLowerCase() === filterCourse.toLowerCase()
      );
    }

    setFilteredStudents(filtered);
  }, [searchTerm, filterCourse, students]);

  const handleAddStudent = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      const updatedStudents = deleteStudent(id);
      setStudents(updatedStudents);
    }
  };

  const handleSubmitStudent = (studentData) => {
    if (editingStudent) {
      // Update existing student
      const updated = updateStudent(editingStudent.id, studentData);
      if (updated) {
        setStudents(getStudents());
      }
    } else {
      // Add new student
      addStudent(studentData);
      setStudents(getStudents());
    }
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  // Get unique courses for filter dropdown
  const uniqueCourses = [...new Set(students.map((s) => s.course))].sort();

  return (
    <div className="space-y-6">
      {/* Actions Bar */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Search */}
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or student ID..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Course Filter */}
          <div className="md:w-64">
            <label htmlFor="courseFilter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Course
            </label>
            <select
              id="courseFilter"
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Courses</option>
              {uniqueCourses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          {/* Add Student Button - Only for Admin */}
          {isAdmin && (
            <div className="flex items-end">
              <button
                onClick={handleAddStudent}
                className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Student
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600">
            Showing {filteredStudents.length} of {students.length} student(s)
          </div>
      </div>

      {/* Student List */}
      <StudentList
        students={filteredStudents}
        onEdit={isAdmin ? handleEditStudent : null}
        onDelete={isAdmin ? handleDeleteStudent : null}
        user={user}
      />

      {/* Modal for Add/Edit */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingStudent ? 'Edit Student' : 'Add New Student'}
      >
        <StudentForm
          student={editingStudent}
          onSubmit={handleSubmitStudent}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default StudentsListPage;

