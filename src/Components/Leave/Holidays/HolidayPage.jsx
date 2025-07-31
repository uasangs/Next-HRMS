import React, { useEffect, useState } from 'react';
import { fetchHolidayList } from '../../Home/dashboardApi';
import './HolidayPage.css';
import Header from '../../Header/Header';

const HolidayPage = ({ employeeId }) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [holidays, setHolidays] = useState({ past: [], upcoming: [], optional: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadHolidays = async () => {
      if (!employeeId) return;

      setLoading(true);
      setError('');

      try {
        const allHolidays = await fetchHolidayList(employeeId);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset to midnight for accurate comparison

        const past = [];
        const upcoming = [];
        const optional = [];

        allHolidays.forEach((holiday, index) => {
          const holidayDate = new Date(holiday.holiday_date);
          holidayDate.setHours(0, 0, 0, 0);

          const entry = {
            id: index + 1,
            date: holidayDate.toLocaleDateString('en-GB'),
            day: holidayDate.toLocaleDateString('en-US', { weekday: 'long' }),
            name: holiday.holiday_name,
          };

          if (holiday.optional) {
            optional.push(entry);
          } else if (holidayDate < today) {
            past.push(entry);
          } else {
            upcoming.push(entry);
          }
        });

        setHolidays({ past, upcoming, optional });
      } catch (err) {
        console.error('Error fetching holiday list:', err);
        setError('Failed to load holidays. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadHolidays();
  }, [employeeId]);

  return (
    <>
      <Header />
      <div className="holiday-page">
        <h2 className="title">Holiday List - 2025</h2>

        <div className="button-group">
          <button
            className={`tab-btn ${activeTab === 'past' ? 'active past' : 'past'}`}
            onClick={() => setActiveTab('past')}
          >
            Past Holidays
          </button>
          <button
            className={`tab-btn ${activeTab === 'upcoming' ? 'active upcoming' : 'upcoming'}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Future Holidays
          </button>
          <button
            className={`tab-btn ${activeTab === 'optional' ? 'active optional' : 'optional'}`}
            onClick={() => setActiveTab('optional')}
          >
            Optional Holidays
          </button>
        </div>

        {loading ? (
          <p className="loading-text">Loading holidays...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <table className="holiday-table">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Date</th>
                <th>Day</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {holidays[activeTab]?.length === 0 ? (
                <tr>
                  <td colSpan="4">No holidays to show.</td>
                </tr>
              ) : (
                holidays[activeTab].map((holiday) => (
                  <tr key={holiday.id}>
                    <td>{holiday.id}</td>
                    <td>{holiday.date}</td>
                    <td>{holiday.day}</td>
                    <td>
                      <span className="holiday-label">{holiday.name}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default HolidayPage;
