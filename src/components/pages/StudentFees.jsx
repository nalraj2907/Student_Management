import React, { useState, useEffect } from 'react';
import { getStudents } from '../../utils/storage';

const StudentFees = ({ user }) => {
  const isAdmin = user?.role === 'admin';
  const [students, setStudents] = useState([]);
  const [feeRecords, setFeeRecords] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [feeAmount, setFeeAmount] = useState('');
  const [feeType, setFeeType] = useState('tuition');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentStatus, setPaymentStatus] = useState('paid');

  useEffect(() => {
    const loadedStudents = getStudents();
    setStudents(loadedStudents);
    // Load fee records from localStorage
    const storedFees = localStorage.getItem('fees');
    if (storedFees) {
      setFeeRecords(JSON.parse(storedFees));
    }
  }, []);

  const addFeeRecord = (e) => {
    e.preventDefault();
    if (!selectedStudent || !feeAmount) return;

    const record = {
      id: Date.now().toString(),
      studentId: selectedStudent,
      amount: parseFloat(feeAmount),
      feeType,
      paymentDate,
      status: paymentStatus,
      createdAt: new Date().toISOString(),
    };

    const updatedRecords = [...feeRecords, record];
    setFeeRecords(updatedRecords);
    localStorage.setItem('fees', JSON.stringify(updatedRecords));

    // Reset form
    setFeeAmount('');
    setSelectedStudent('');
  };

  const getStudentFees = (studentId) => {
    return feeRecords.filter((f) => f.studentId === studentId);
  };

  const getTotalFees = (studentId) => {
    const fees = getStudentFees(studentId);
    return fees.reduce((sum, fee) => sum + fee.amount, 0);
  };

  const getPaidFees = (studentId) => {
    const fees = getStudentFees(studentId).filter((f) => f.status === 'paid');
    return fees.reduce((sum, fee) => sum + fee.amount, 0);
  };

  const selectedStudentData = students.find((s) => s.id === selectedStudent);

  return (
    <div className="space-y-6">
      {/* Add Fee Form - Only for Admin */}
      {isAdmin && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Fee Record</h2>
          <form onSubmit={addFeeRecord} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student
            </label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} ({student.studentId})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fee Amount
            </label>
            <input
              type="number"
              value={feeAmount}
              onChange={(e) => setFeeAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fee Type
            </label>
            <select
              value={feeType}
              onChange={(e) => setFeeType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="tuition">Tuition Fee</option>
              <option value="library">Library Fee</option>
              <option value="lab">Lab Fee</option>
              <option value="sports">Sports Fee</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Date
            </label>
            <input
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          <div className="md:col-span-2 lg:col-span-5">
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Add Fee Record
            </button>
          </div>
        </form>
        </div>
      )}

      {/* Fee Records Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Fee Records</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fee Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Date
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feeRecords.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No fee records found. Add a fee record above.
                  </td>
                </tr>
              ) : (
                feeRecords
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((record) => {
                    const student = students.find((s) => s.id === record.studentId);
                    return (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {student ? (
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
                                <div className="text-sm text-gray-500">{student.studentId}</div>
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">Student not found</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                          {record.feeType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          ${record.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(record.paymentDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {record.status === 'paid' && (
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Paid
                            </span>
                          )}
                          {record.status === 'pending' && (
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          )}
                          {record.status === 'overdue' && (
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Overdue
                            </span>
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

      {/* Student Fee Summary */}
      {students.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Fee Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {students.map((student) => {
              const totalFees = getTotalFees(student.id);
              const paidFees = getPaidFees(student.id);
              const pendingFees = totalFees - paidFees;
              return (
                <div
                  key={student.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center mb-3">
                    {student.image ? (
                      <img
                        className="h-12 w-12 rounded-full object-cover mr-3"
                        src={student.image}
                        alt={student.name}
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold mr-3">
                        {student.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.studentId}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Fees:</span>
                      <span className="font-semibold">${totalFees.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Paid:</span>
                      <span className="font-semibold text-green-600">${paidFees.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pending:</span>
                      <span className="font-semibold text-red-600">${pendingFees.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentFees;

