
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
// import './MyLeave.css';
import { fetchLeaveBalance } from '../../Home/dashboardApi';
import Header from '../../Header/Header'
import { 
  Search, Filter, Clock, X, 
  ChevronDown, ChevronUp, Plus, Check, XCircle, Calendar, 
  Users, Building, AlertCircle 
} from 'lucide-react';

const TeamLeavereq = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Table state management
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [showFilter, setShowFilter] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [requestTypeFilter, setRequestTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  
  // Sort states
  const [sortBy, setSortBy] = useState('fromDate');
  const [sortOrder, setSortOrder] = useState('desc');

  // Mock data for attendance requests
  const mockData = [
    {
      id: 'HR-ARQ-25-07-001',
      employeeName: 'Developer Daiyan',
      status: 'Submitted',
      employeeId: 'FI-00001',
      department: 'Engineering',
      reason: 'Sick Leave',
      requestType: 'Sick Leave',
      fromDate: '2025-08-21',
      toDate: '2025-08-22',
      duration: '2 days'
    },
    {
      id: 'HR-ARQ-25-07-002',
      employeeName: 'Sarah Wilson',
      status: 'Approved',
      employeeId: 'FI-00002',
      department: 'Marketing',
      reason: 'Medical Appointment',
      requestType: 'Casual Leave',
      fromDate: '2025-08-20',
      toDate: '2025-08-20',
      duration: '4 hours'
    },
    {
      id: 'HR-ARQ-25-07-003',
      employeeName: 'John Smith',
      status: 'Pending',
      employeeId: 'FI-00003',
      department: 'Sales',
      reason: 'Personal Emergency',
      requestType: 'Earned Leave',
      fromDate: '2025-08-21',
      toDate: '2025-08-21',
      duration: '1 day'
    },
    {
      id: 'HR-ARQ-25-07-004',
      employeeName: 'Emma Johnson',
      status: 'Rejected',
      employeeId: 'FI-00004',
      department: 'HR',
      reason: 'Vacation Request',
      requestType: 'Privilege Leave',
      fromDate: '2025-08-19',
      toDate: '2025-08-25',
      duration: '7 days'
    },
    {
      id: 'HR-ARQ-25-07-005',
      employeeName: 'Michael Brown',
      status: 'Submitted',
      employeeId: 'FI-00005',
      department: 'Finance',
      reason: 'Family Event',
      requestType: 'Compensatory Off',
      fromDate: '2025-08-21',
      toDate: '2025-08-23',
      duration: '3 days'
    },
    {
      id: 'HR-ARQ-25-07-006',
      employeeName: 'Lisa Davis',
      status: 'Approved',
      employeeId: 'FI-00006',
      department: 'Engineering',
      reason: 'Maternity Leave',
      requestType: 'Maternity Leave',
      fromDate: '2025-08-18',
      toDate: '2025-11-15',
      duration: '90 days'
    },
    {
      id: 'HR-ARQ-25-07-007',
      employeeName: 'Robert Garcia',
      status: 'Pending',
      employeeId: 'FI-00007',
      department: 'Operations',
      reason: 'Extended Leave',
      requestType: 'Leave Without Pay',
      fromDate: '2025-08-20',
      toDate: '2025-08-24',
      duration: '5 days'
    },
    {
      id: 'HR-ARQ-25-07-008',
      employeeName: 'Jennifer Lee',
      status: 'Submitted',
      employeeId: 'FI-00008',
      department: 'Marketing',
      reason: 'Personal Work',
      requestType: 'Casual Leave',
      fromDate: '2025-08-21',
      toDate: '2025-08-22',
      duration: '2 days'
    }
  ];

  // Get unique values for filters
  const uniqueDepartments = [...new Set(mockData.map(item => item.department))].sort();
  const uniqueRequestTypes = [...new Set(mockData.map(item => item.requestType))].sort();

  useEffect(() => {
    const employeeId = localStorage.getItem('employee_id');
    if (!employeeId) {
      console.error("❌ Employee ID not found in localStorage.");
      setLoading(false);
      return;
    }

    const loadLeaves = async () => {
      try {
        setLoading(true);
        const data = await fetchLeaveBalance(employeeId);
        console.log("✅ Leave Balance Response:", data);

        // Convert object to array
        const converted = Object.entries(data).map(([type, total]) => ({
          leave_type: type,
          total: total,
        }));

        setLeaveData(converted);
      } catch (error) {
        console.error("❌ Error fetching leave data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLeaves();
  }, []);

  // Filter and sort data
  const filteredData = useMemo(() => {
    let result = [...mockData];

    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(item =>
        item.employeeName.toLowerCase().includes(search) ||
        item.employeeId.toLowerCase().includes(search) ||
        item.id.toLowerCase().includes(search) ||
        item.department.toLowerCase().includes(search) ||
        item.requestType.toLowerCase().includes(search)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(item => item.status === statusFilter);
    }

    // Department filter
    if (departmentFilter !== 'all') {
      result = result.filter(item => item.department === departmentFilter);
    }

    // Request type filter
    if (requestTypeFilter !== 'all') {
      result = result.filter(item => item.requestType === requestTypeFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      result = result.filter(item => {
        const itemDate = new Date(item.fromDate);
        const daysDiff = Math.floor((today - itemDate) / (1000 * 60 * 60 * 24));
        
        switch (dateFilter) {
          case 'today': return daysDiff === 0;
          case 'yesterday': return daysDiff === 1;
          case 'last7days': return daysDiff <= 7;
          case 'last30days': return daysDiff <= 30;
          case 'thisweek':
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay());
            return itemDate >= startOfWeek;
          case 'thismonth':
            return itemDate.getMonth() === today.getMonth() && 
                   itemDate.getFullYear() === today.getFullYear();
          default: return true;
        }
      });
    }

    // Sort
    result.sort((a, b) => {
      let aVal, bVal;
      
      switch (sortBy) {
        case 'employeeName':
          aVal = a.employeeName.toLowerCase();
          bVal = b.employeeName.toLowerCase();
          break;
        case 'status':
          aVal = a.status.toLowerCase();
          bVal = b.status.toLowerCase();
          break;
        case 'employeeId':
          aVal = a.employeeId.toLowerCase();
          bVal = b.employeeId.toLowerCase();
          break;
        case 'fromDate':
          aVal = new Date(a.fromDate);
          bVal = new Date(b.fromDate);
          break;
        default:
          aVal = a[sortBy];
          bVal = b[sortBy];
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return result;
  }, [searchTerm, statusFilter, departmentFilter, requestTypeFilter, dateFilter, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Helper functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'Submitted': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Approved': return 'text-green-600 bg-green-50 border-green-200';
      case 'Pending': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Rejected': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) return null;
    return sortOrder === 'asc' ? 
      <ChevronUp className="w-3 h-3" /> : 
      <ChevronDown className="w-3 h-3" />;
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setDepartmentFilter('all');
    setRequestTypeFilter('all');
    setDateFilter('all');
    setCurrentPage(1);
  };

  const toggleRowSelection = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedRows.size === paginatedData.length && paginatedData.length > 0) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map(item => item.id)));
    }
  };

  const handleBulkAccept = () => {
    console.log('Bulk Accept Leave Requests:', Array.from(selectedRows));
    setSelectedRows(new Set());
  };

  const handleBulkReject = () => {
    console.log('Bulk Reject Leave Requests:', Array.from(selectedRows));
    setSelectedRows(new Set());
  };

  const activeFiltersCount = [
    statusFilter !== 'all',
    departmentFilter !== 'all', 
    requestTypeFilter !== 'all',
    dateFilter !== 'all',
    searchTerm.length > 0
  ].filter(Boolean).length;

  return (
    <>
      <Header/>
      {/* Manager's Visual Analytics Dashboard */}
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto mb-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden" style={{ height: '450px' }}>
            
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-pulse text-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-3"></div>
                  <div className="h-3 bg-gray-300 rounded w-40 mb-2 mx-auto"></div>
                  <div className="h-2 bg-gray-200 rounded w-32 mx-auto"></div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col">
                
                {/* Header with Key Metrics */}
                <div className="bg-gradient-to-r from-slate-800 to-slate-600 text-white p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold mb-1">Leave Analytics Dashboard</h2>
                      <p className="text-sm opacity-90">Visual insights for team leave management</p>
                    </div>
                    
                  </div>
                </div>

                {/* Main Dashboard Content */}
                <div className="flex-1 p-4 grid grid-cols-12 gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  
                  {/* Status Distribution Chart - FIXED DONUT CHART */}
                  <div className="col-span-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Request Status Distribution</h3>
                    <div className="relative h-32">
                      {/* Donut Chart */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <svg width="120" height="120" viewBox="0 0 120 120" className="transform -rotate-90">
                            {/* Background circle */}
                            <circle cx="60" cy="60" r="45" fill="none" stroke="#e5e7eb" strokeWidth="12"/>
                            
                            {/* Calculate percentages and cumulative offsets */}
                            {(() => {
                              const submitted = mockData.filter(r => r.status === 'Submitted').length;
                              const pending = mockData.filter(r => r.status === 'Pending').length;
                              const approved = mockData.filter(r => r.status === 'Approved').length;
                              const rejected = mockData.filter(r => r.status === 'Rejected').length;
                              const total = mockData.length;
                              
                              const submittedPercent = submitted / total;
                              const pendingPercent = pending / total;
                              const approvedPercent = approved / total;
                              const rejectedPercent = rejected / total;
                              
                              const circumference = 283; // 2 * π * 45
                              
                              const submittedLength = submittedPercent * circumference;
                              const pendingLength = pendingPercent * circumference;
                              const approvedLength = approvedPercent * circumference;
                              const rejectedLength = rejectedPercent * circumference;
                              
                              let offset = 0;
                              
                              return (
                                <>
                                  {/* Submitted (Blue) */}
                                  {submitted > 0 && (
                                    <circle cx="60" cy="60" r="45" fill="none" stroke="#3b82f6" strokeWidth="12"
                                      strokeDasharray={`${submittedLength} ${circumference}`}
                                      strokeDashoffset={-offset}/>
                                  )}
                                  
                                  {/* Pending (Orange) */}
                                  {pending > 0 && (
                                    <circle cx="60" cy="60" r="45" fill="none" stroke="#f59e0b" strokeWidth="12"
                                      strokeDasharray={`${pendingLength} ${circumference}`}
                                      strokeDashoffset={-(offset += submittedLength)}/>
                                  )}
                                  
                                  {/* Approved (Green) */}
                                  {approved > 0 && (
                                    <circle cx="60" cy="60" r="45" fill="none" stroke="#10b981" strokeWidth="12"
                                      strokeDasharray={`${approvedLength} ${circumference}`}
                                      strokeDashoffset={-(offset += pendingLength)}/>
                                  )}
                                  
                                  {/* Rejected (Red) - This was missing! */}
                                  {rejected > 0 && (
                                    <circle cx="60" cy="60" r="45" fill="none" stroke="#ef4444" strokeWidth="12"
                                      strokeDasharray={`${rejectedLength} ${circumference}`}
                                      strokeDashoffset={-(offset += approvedLength)}/>
                                  )}
                                </>
                              );
                            })()}
                          </svg>
                          
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-base font-bold text-gray-800">{mockData.length}</span>
                            <span className="text-xs text-gray-600">Total</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Legend */}
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {[
                        { label: 'Submitted', count: mockData.filter(r => r.status === 'Submitted').length, color: 'bg-blue-500' },
                        { label: 'Pending', count: mockData.filter(r => r.status === 'Pending').length, color: 'bg-orange-500' },
                        { label: 'Approved', count: mockData.filter(r => r.status === 'Approved').length, color: 'bg-green-500' },
                        { label: 'Rejected', count: mockData.filter(r => r.status === 'Rejected').length, color: 'bg-red-500' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                          <span className="text-xs text-gray-700">{item.label} ({item.count})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Department Analysis */}
                  <div className="col-span-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Department Workload</h3>
                    <div className="space-y-3">
                      {['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'].map((dept, index) => {
                        const deptRequests = mockData.filter(r => r.department === dept).length;
                        const maxRequests = Math.max(...['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'].map(d => 
                          mockData.filter(r => r.department === d).length));
                        const percentage = maxRequests > 0 ? (deptRequests / maxRequests) * 100 : 0;
                        const colors = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-teal-500', 'bg-indigo-500'];
                        
                        return (
                          <div key={index} className="relative">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium text-gray-700">{dept}</span>
                              <span className="text-xs font-bold text-gray-800">{deptRequests}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${colors[index % colors.length]} transition-all duration-500`}
                                style={{ width: `${Math.max(percentage, 5)}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Leave Type Analysis */}
                  <div className="col-span-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-100">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Leave Type Distribution</h3>
                    <div className="space-y-3">
                      {uniqueRequestTypes.map((type, index) => {
                        const typeCount = mockData.filter(r => r.requestType === type).length;
                        const percentage = (typeCount / mockData.length) * 100;
                        const colors = ['bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500'];
                        
                        return (
                          <div key={index} className="relative">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium text-gray-700">{type}</span>
                              <span className="text-xs font-bold text-gray-800">{typeCount}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${colors[index % colors.length]} transition-all duration-500`}
                                style={{ width: `${Math.max(percentage, 5)}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-600 mt-1">{Math.round(percentage)}%</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>



                </div>

              </div>
            )}
          </div>
        </div>

      {/* Leave Requests Table Section */}
      <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
            {/* Top Header */}
            <div className="flex items-center justify-between p-3 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <h1 className="text-lg font-semibold text-gray-900">My Leave Requests</h1>
              </div>
              
              {/* Always Visible Search Bar */}
              <div className="flex items-center gap-3">
                <div className="w-72 relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                  <input
                    type="text"
                    placeholder="Search by employee name, ID, department, leave type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ focusRingColor: '#ec4899' }}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 rounded"
                    >
                      <X className="w-2 h-2" />
                    </button>
                  )}
                </div>
                
                <Link 
                  to="/dashboard/leaverequest"
                  className="bg-gray-900 hover:bg-gray-800 text-white px-2 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1 no-underline"
                >
                  <Plus className="w-3 h-3" />
                  Add Request
                </Link>
              </div>
            </div>

            {/* Search Results Info */}
            {searchTerm && (
              <div className="px-3 py-1.5 bg-blue-50 border-b border-gray-200">
                <div className="text-xs text-blue-700">
                  Found {filteredData.length} result{filteredData.length !== 1 ? 's' : ''} for "{searchTerm}"
                </div>
              </div>
            )}

            {/* Filter Section */}
            <div className="border-b border-gray-200">
              {/* Filter Toggle Bar */}
              <div className="px-3 py-2 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowFilter(!showFilter)}
                    className={`flex items-center gap-1 px-2 py-0.5 text-xs border rounded transition-all duration-200 ${
                      showFilter 
                        ? 'border-pink-500 text-pink-600 bg-pink-50 shadow-sm' 
                        : 'border-gray-300 text-gray-600 hover:bg-white hover:border-gray-400'
                    }`}
                    style={{ 
                      borderColor: showFilter ? '#ec4899' : undefined,
                      color: showFilter ? '#ec4899' : undefined,
                      backgroundColor: showFilter ? '#fdf2f8' : undefined
                    }}
                  >
                    <Filter className="w-2.5 h-2.5" />
                    <span className="font-medium">Filters</span>
                    {activeFiltersCount > 0 && (
                      <span className="px-1 py-0.5 bg-pink-600 text-white text-xs rounded-full font-medium" style={{ backgroundColor: '#ec4899' }}>
                        {activeFiltersCount}
                      </span>
                    )}
                    {showFilter ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
                  </button>

                  <div className="h-4 w-px bg-gray-300"></div>

                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-600">Leave Requests</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-600">
                    {selectedRows.size > 0 ? `${selectedRows.size} selected` : `${mockData.length} total requests`}
                  </span>
                  <Calendar className="w-3 h-3 text-gray-400" />
                </div>
              </div>

              {/* Advanced Filters Panel */}
              {showFilter && (
                <div className="px-3 py-3 bg-white border-t border-gray-100">
                  <div className="space-y-3">
                    {/* Filter Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {/* Status Filter */}
                      <div className="space-y-1">
                        <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
                          <AlertCircle className="w-3 h-3 text-gray-400" />
                          Status
                        </label>
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
                        >
                          <option value="all">All Status</option>
                          <option value="Submitted">Submitted</option>
                          <option value="Approved">Approved</option>
                          <option value="Pending">Pending</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>

                      {/* Department Filter */}
                      <div className="space-y-1">
                        <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
                          <Building className="w-3 h-3 text-gray-400" />
                          Department
                        </label>
                        <select
                          value={departmentFilter}
                          onChange={(e) => setDepartmentFilter(e.target.value)}
                          className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
                        >
                          <option value="all">All Departments</option>
                          {uniqueDepartments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>

                      {/* Request Type Filter */}
                      <div className="space-y-1">
                        <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
                          <Users className="w-3 h-3 text-gray-400" />
                          Leave Type
                        </label>
                        <select
                          value={requestTypeFilter}
                          onChange={(e) => setRequestTypeFilter(e.target.value)}
                          className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
                        >
                          <option value="all">All Types</option>
                          {uniqueRequestTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      {/* Date Filter */}
                      <div className="space-y-1">
                        <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          From Date Range
                        </label>
                        <select
                          value={dateFilter}
                          onChange={(e) => setDateFilter(e.target.value)}
                          className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-pink-500 focus:border-pink-500 bg-white"
                        >
                          <option value="all">All Dates</option>
                          <option value="today">Today</option>
                          <option value="yesterday">Yesterday</option>
                          <option value="thisweek">This Week</option>
                          <option value="last7days">Last 7 Days</option>
                          <option value="thismonth">This Month</option>
                          <option value="last30days">Last 30 Days</option>
                        </select>
                      </div>
                    </div>

                    {/* Filter Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="text-xs text-gray-500">
                        {activeFiltersCount > 0 ? (
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                            {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active
                          </span>
                        ) : (
                          'No filters applied'
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={clearAllFilters}
                          className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded border border-gray-300 transition-colors"
                        >
                          Clear All
                        </button>
                        <button
                          onClick={() => setShowFilter(false)}
                          className="px-2 py-1 text-xs text-white rounded transition-colors"
                          style={{ backgroundColor: '#ec4899' }}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bulk Actions Bar - Shows when items are selected */}
            {selectedRows.size > 0 && (
              <div className="px-3 py-1.5 bg-pink-50 border-b border-pink-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-pink-800">
                      {selectedRows.size} item{selectedRows.size !== 1 ? 's' : ''} selected
                    </span>
                    <button
                      onClick={() => setSelectedRows(new Set())}
                      className="text-xs text-pink-600 hover:text-pink-800 underline"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleBulkAccept}
                      className="flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium text-green-700 bg-green-100 border border-green-300 rounded hover:bg-green-200 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      Accept ({selectedRows.size})
                    </button>
                    <button
                      onClick={handleBulkReject}
                      className="flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium text-red-700 bg-red-100 border border-red-300 rounded hover:bg-red-200 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject ({selectedRows.size})
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="w-6 p-2">
                      <input
                        type="checkbox"
                        checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded border-gray-300 focus:ring-pink-500"
                        style={{ accentColor: '#ec4899' }}
                      />
                    </th>
                    <th 
                      className="text-left p-2 text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('employeeId')}
                    >
                      <div className="flex items-center gap-1">
                        Employee ID
                        {getSortIcon('employeeId')}
                      </div>
                    </th>
                    <th 
                      className="text-left p-2 text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('employeeName')}
                    >
                      <div className="flex items-center gap-1">
                        Employee Name
                        {getSortIcon('employeeName')}
                      </div>
                    </th>
                    <th className="text-left p-2 text-xs font-medium text-gray-600">Request ID</th>
                    <th 
                      className="text-left p-2 text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center gap-1">
                        Status
                        {getSortIcon('status')}
                      </div>
                    </th>
                    <th className="text-left p-2 text-xs font-medium text-gray-600">Leave Type</th>
                    <th className="w-20 p-2 text-center text-xs font-medium text-gray-600">
                      <Calendar className="w-3 h-3 mx-auto" />
                      <div className="text-xs mt-0.5">From Date</div>
                    </th>
                    <th className="w-20 p-2 text-center text-xs font-medium text-gray-600">
                      <Calendar className="w-3 h-3 mx-auto" />
                      <div className="text-xs mt-0.5">To Date</div>
                    </th>
                    <th className="w-12 p-2 text-center text-xs font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedData.map((item) => (
                    <tr 
                      key={item.id} 
                      className={`hover:bg-gray-50 transition-colors ${
                        selectedRows.has(item.id) ? 'bg-pink-50' : ''
                      }`}
                      style={{ 
                        borderLeftColor: selectedRows.has(item.id) ? '#ec4899' : 'transparent',
                        borderLeftWidth: selectedRows.has(item.id) ? '3px' : '0px'
                      }}
                    >
                      <td className="p-2">
                        <input
                          type="checkbox"
                          checked={selectedRows.has(item.id)}
                          onChange={() => toggleRowSelection(item.id)}
                          className="rounded border-gray-300 focus:ring-pink-500"
                          style={{ accentColor: '#ec4899' }}
                        />
                      </td>
                      <td className="p-2">
                        <span className="text-gray-900 text-xs">{item.employeeId}</span>
                      </td>
                      <td className="p-2">
                        <div>
                          <span className="font-medium text-gray-900 text-xs">{item.employeeName}</span>
                          <div className="text-xs text-gray-500 mt-0.5">{item.department}</div>
                        </div>
                      </td>
                      <td className="p-2">
                        <div>
                          <span className="text-gray-600 text-xs font-mono">{item.id}</span>
                          <div className="text-xs text-gray-500">{item.duration}</div>
                        </div>
                      </td>
                      <td className="p-2">
                        <span 
                          className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(item.status)}`}
                          style={{ 
                            borderColor: item.status === 'Submitted' ? '#ec4899' : undefined,
                            color: item.status === 'Submitted' ? '#ec4899' : undefined,
                            backgroundColor: item.status === 'Submitted' ? '#fdf2f8' : undefined
                          }}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="p-2">
                        <div className="text-xs text-gray-700 font-medium">{item.requestType}</div>
                        <div className="text-xs text-gray-500">{item.duration}</div>
                      </td>
                      <td className="p-2 text-center">
                        <div className="text-xs text-gray-600 font-medium">
                          {new Date(item.fromDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(item.fromDate).getFullYear()}
                        </div>
                      </td>
                      <td className="p-2 text-center">
                        <div className="text-xs text-gray-600 font-medium">
                          {new Date(item.toDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(item.toDate).getFullYear()}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center justify-center gap-1">
                          <button 
                            className="text-gray-400 hover:text-green-600 rounded transition-colors" 
                            title="Accept Leave Request"
                            onClick={() => console.log('Accept Leave Request:', item.id)}
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button 
                            className="text-gray-400 hover:text-red-600 rounded transition-colors" 
                            title="Reject Leave Request"
                            onClick={() => console.log('Reject Leave Request:', item.id)}
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Empty State */}
              {paginatedData.length === 0 && (
                <div className="text-center py-8">
                  <Search className="mx-auto h-8 w-8 text-gray-400" />
                  <h3 className="mt-2 text-xs font-medium text-gray-900">No requests found</h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {activeFiltersCount > 0 || searchTerm 
                      ? 'Try adjusting your search or filter criteria'
                      : 'No leave requests available'
                    }
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-600">Show:</span>
                {[20, 100, 500, 2500].map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setItemsPerPage(size);
                      setCurrentPage(1);
                    }}
                    className={`px-2 py-1 text-xs rounded transition-colors border-2 font-semibold ${
                      itemsPerPage === size
                        ? 'text-white border-pink-600 bg-pink-600 shadow-md'
                        : 'text-black border-gray-600 bg-white hover:bg-gray-50 hover:border-gray-700 shadow-sm'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
                </span>
                
                {totalPages > 1 && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-2 py-0.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Prev
                    </button>
                    
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1;
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-2 py-1 text-xs rounded transition-colors border-2 font-semibold ${
                              currentPage === page
                                ? 'text-white border-pink-600 bg-pink-600 shadow-md'
                                : 'text-black border-gray-600 bg-white hover:bg-gray-50 hover:border-gray-700 shadow-sm'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-2 py-0.5 text-xs border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamLeavereq;