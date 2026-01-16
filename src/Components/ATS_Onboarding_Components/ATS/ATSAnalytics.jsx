import React, { useState } from "react";
import "./ATSAnalytics.css";
import Header from "../../Header/Header";

const ATSAnalytics = () => {
  const [timeRange, setTimeRange] = useState("last30days");

  const analyticsData = {
    overview: {
      totalApplications: 245,
      activeJobs: 12,
      interviewsScheduled: 48,
      offersExtended: 15,
      offersAccepted: 12,
      avgTimeToHire: "28 days",
      avgCostPerHire: "₹45,000"
    },
    hiringFunnel: [
      { stage: "Applications", count: 245, percentage: 100 },
      { stage: "Screening", count: 156, percentage: 64 },
      { stage: "Interview", count: 48, percentage: 20 },
      { stage: "Offer", count: 15, percentage: 6 },
      { stage: "Hired", count: 12, percentage: 5 }
    ],
    sourceAnalysis: [
      { source: "LinkedIn", applications: 85, hires: 5, cost: "₹12,000" },
      { source: "Job Boards", applications: 62, hires: 3, cost: "₹8,500" },
      { source: "Referrals", applications: 48, hires: 3, cost: "₹5,000" },
      { source: "Career Site", applications: 35, hires: 1, cost: "₹2,000" },
      { source: "Agencies", applications: 15, hires: 0, cost: "₹15,000" }
    ],
    departmentMetrics: [
      { department: "Engineering", openings: 5, applications: 98, hires: 4 },
      { department: "Product", openings: 2, applications: 45, hires: 3 },
      { department: "Design", openings: 3, applications: 52, hires: 2 },
      { department: "Sales", openings: 2, applications: 50, hires: 3 }
    ],
    monthlyTrends: [
      { month: "Sep", applications: 65, hires: 3 },
      { month: "Oct", applications: 78, hires: 4 },
      { month: "Nov", applications: 82, hires: 3 },
      { month: "Dec", applications: 72, hires: 2 },
      { month: "Jan", applications: 48, hires: 0 }
    ]
  };

  const calculateConversionRate = (from, to) => {
    return ((to / from) * 100).toFixed(1);
  };

  return (
    <div className="ats-analytics-container">
      <Header />
      
      <div className="ats-analytics-content">
        {/* Page Header */}
        <div className="analytics-page-header">
          <div>
            <h1>ATS Analytics & Reports</h1>
            <p>Comprehensive recruitment metrics and insights</p>
          </div>
          <div className="header-controls">
            <select 
              className="time-range-selector" 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="last90days">Last 90 Days</option>
              <option value="thisyear">This Year</option>
            </select>
            <button className="export-report-btn">
              <span className="btn-icon">📊</span>
              Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="key-metrics-grid">
          <div className="metric-card">
            <div className="metric-icon applications">📝</div>
            <div className="metric-info">
              <div className="metric-number">{analyticsData.overview.totalApplications}</div>
              <div className="metric-label">Total Applications</div>
              <div className="metric-trend positive">↑ 12% from last month</div>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon jobs">💼</div>
            <div className="metric-info">
              <div className="metric-number">{analyticsData.overview.activeJobs}</div>
              <div className="metric-label">Active Job Openings</div>
              <div className="metric-trend">→ No change</div>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon interviews">📅</div>
            <div className="metric-info">
              <div className="metric-number">{analyticsData.overview.interviewsScheduled}</div>
              <div className="metric-label">Interviews Scheduled</div>
              <div className="metric-trend positive">↑ 8%</div>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon offers">✉️</div>
            <div className="metric-info">
              <div className="metric-number">{analyticsData.overview.offersExtended}</div>
              <div className="metric-label">Offers Extended</div>
              <div className="metric-trend positive">↑ 15%</div>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon hires">🎯</div>
            <div className="metric-info">
              <div className="metric-number">{analyticsData.overview.offersAccepted}</div>
              <div className="metric-label">Hires (Accepted)</div>
              <div className="metric-trend positive">↑ 20%</div>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon time">⏱️</div>
            <div className="metric-info">
              <div className="metric-number">{analyticsData.overview.avgTimeToHire}</div>
              <div className="metric-label">Avg Time to Hire</div>
              <div className="metric-trend negative">↑ 3 days</div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="charts-grid">
          {/* Hiring Funnel */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Hiring Funnel</h3>
              <p>Conversion rates at each stage</p>
            </div>
            <div className="funnel-chart">
              {analyticsData.hiringFunnel.map((stage, index) => (
                <div key={index} className="funnel-stage">
                  <div className="stage-bar" style={{ width: `${stage.percentage}%` }}>
                    <span className="stage-label">{stage.stage}</span>
                    <span className="stage-count">{stage.count}</span>
                  </div>
                  <div className="stage-percentage">{stage.percentage}%</div>
                </div>
              ))}
            </div>
            <div className="funnel-insights">
              <div className="insight-item">
                <span>Application → Hire Rate:</span>
                <strong>{calculateConversionRate(245, 12)}%</strong>
              </div>
              <div className="insight-item">
                <span>Interview → Offer Rate:</span>
                <strong>{calculateConversionRate(48, 15)}%</strong>
              </div>
            </div>
          </div>

          {/* Source Analysis */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Source Performance</h3>
              <p>Applications and hires by source</p>
            </div>
            <div className="source-table">
              <table>
                <thead>
                  <tr>
                    <th>Source</th>
                    <th>Applications</th>
                    <th>Hires</th>
                    <th>Cost</th>
                    <th>ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.sourceAnalysis.map((source, index) => (
                    <tr key={index}>
                      <td className="source-name">{source.source}</td>
                      <td>{source.applications}</td>
                      <td className="hires-count">{source.hires}</td>
                      <td>{source.cost}</td>
                      <td>
                        <span className={`roi-badge ${source.hires > 0 ? 'positive' : 'negative'}`}>
                          {source.hires > 0 ? 'Good' : 'Low'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Department Metrics */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Department-wise Hiring</h3>
              <p>Openings and applications by department</p>
            </div>
            <div className="department-chart">
              {analyticsData.departmentMetrics.map((dept, index) => (
                <div key={index} className="department-row">
                  <div className="dept-name">{dept.department}</div>
                  <div className="dept-metrics">
                    <div className="dept-metric">
                      <span className="dept-label">Openings:</span>
                      <span className="dept-value">{dept.openings}</span>
                    </div>
                    <div className="dept-metric">
                      <span className="dept-label">Applications:</span>
                      <span className="dept-value">{dept.applications}</span>
                    </div>
                    <div className="dept-metric">
                      <span className="dept-label">Hires:</span>
                      <span className="dept-value highlight">{dept.hires}</span>
                    </div>
                  </div>
                  <div className="dept-progress">
                    <div 
                      className="dept-progress-bar" 
                      style={{ width: `${(dept.hires / dept.openings) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Monthly Trends</h3>
              <p>Applications and hires over time</p>
            </div>
            <div className="trends-chart">
              <div className="chart-bars">
                {analyticsData.monthlyTrends.map((month, index) => (
                  <div key={index} className="month-bar">
                    <div className="bar-container">
                      <div 
                        className="bar applications-bar" 
                        style={{ height: `${(month.applications / 100) * 100}%` }}
                      ></div>
                      <div 
                        className="bar hires-bar" 
                        style={{ height: `${(month.hires / 10) * 100}%` }}
                      ></div>
                    </div>
                    <div className="month-label">{month.month}</div>
                  </div>
                ))}
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-color applications"></span>
                  <span>Applications</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color hires"></span>
                  <span>Hires</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATSAnalytics;
