import React, { useState, useEffect } from 'react';
import { getStudents } from '../../utils/storage';

const AttendanceDetails = ({ user }) => {
  const isAdmin = user?.role === 'admin';
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedStudent, setSelectedStudent] = useState('');

  useEffect(() => {
    const loadedStudents = getStudents();
    setStudents(loadedStudents);
    // Load attendance from localStorage
    const storedAttendance = localStorage.getItem('attendance');
    if (storedAttendance) {
      setAttendanceRecords(JSON.parse(storedAttendance));
    }
  }, []);

  const markAttendance = (studentId, status) => {
    const record = {
      studentId,
      date: selectedDate,
      status, // 'present', 'absent', 'late'
    };

    const updatedRecords = [...attendanceRecords];
    const existingIndex = updatedRecords.findIndex(
      (r) => r.studentId === studentId && r.date === selectedDate
    );

    if (existingIndex !== -1) {
      updatedRecords[existingIndex] = record;
    } else {
      updatedRecords.push(record);
    }

    setAttendanceRecords(updatedRecords);
    localStorage.setItem('attendance', JSON.stringify(updatedRecords));
  };

  const getAttendanceStatus = (studentId, date) => {
    const record = attendanceRecords.find(
      (r) => r.studentId === studentId && r.date === date
    );
    return record ? record.status : null;
  };

  const filteredStudents = selectedStudent
    ? students.filter((s) => s.id === selectedStudent)
    : students;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Attendance Details</h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Student
            </label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Students</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} ({student.studentId})
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <div className="w-full bg-gray-100 rounded-md p-3 text-center">
              <div className="text-sm text-gray-600">Total Students</div>
              <div className="text-2xl font-bold text-gray-800">{students.length}</div>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No students found. Add students first.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const status = getAttendanceStatus(student.id, selectedDate);
                  return (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {student.image ? (
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={student.image}
                                alt={student.name}
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                                {student.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {student.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.studentId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.course}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {status === 'present' && (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Present
                          </span>
                        )}
                        {status === 'absent' && (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Absent
                          </span>
                        )}
                        {status === 'late' && (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Late
                          </span>
                        )}
                        {!status && (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            Not Marked
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        {isAdmin ? (
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => markAttendance(student.id, 'present')}
                              className={`px-3 py-1 rounded-md text-xs ${
                                status === 'present'
                                  ? 'bg-green-600 text-white'
                                  : 'bg-green-100 text-green-700 hover:bg-green-200'
                              }`}
                            >
                              Present
                            </button>
                            <button
                              onClick={() => markAttendance(student.id, 'absent')}
                              className={`px-3 py-1 rounded-md text-xs ${
                                status === 'absent'
                                  ? 'bg-red-600 text-white'
                                  : 'bg-red-100 text-red-700 hover:bg-red-200'
                              }`}
                            >
                              Absent
                            </button>
                            <button
                              onClick={() => markAttendance(student.id, 'late')}
                              className={`px-3 py-1 rounded-md text-xs ${
                                status === 'late'
                                  ? 'bg-yellow-600 text-white'
                                  : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                              }`}
                            >
                              Late
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs">View Only</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDetails;

