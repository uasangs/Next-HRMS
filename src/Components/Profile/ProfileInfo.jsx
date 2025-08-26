// ProfileInfo.js
import React from 'react';
import Header from '../Header/Header';

const ProfileInfo = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="employee-profile-container">
        <div className="profile-header">
          <h1 className="profile-title">Employee Profile - Profile Settings</h1>
          <p className="profile-subtitle">Manage profile picture and display preferences</p>
        </div>
        <div className="tab-content-container">
          <div className="placeholder-content">
            <h3>Profile Settings</h3>
            <p>This section will contain profile picture upload, display name settings, and other profile-related configurations.</p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .employee-profile-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
        .profile-header {
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e1e5e9;
        }
        .profile-title {
          font-size: 24px;
          font-weight: 600;
          color: #333;
          margin: 0 0 5px 0;
        }
        .profile-subtitle {
          font-size: 14px;
          color: #666;
          margin: 0;
        }
        .tab-content-container {
          min-height: 400px;
          background: white;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #e1e5e9;
        }
        .placeholder-content {
          text-align: center;
          padding: 60px 20px;
          color: #666;
        }
        .placeholder-content h3 {
          font-size: 18px;
          margin-bottom: 15px;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default ProfileInfo;
