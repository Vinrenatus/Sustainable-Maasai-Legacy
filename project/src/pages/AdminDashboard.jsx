import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('news');
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
    };
    fetchAdminData();
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'news':
        return (
          <div>
            <h2>News</h2>
            {data.news.map(item => (
              <div key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
            ))}
          </div>
        );
      case 'products':
        return (
          <div>
            <h2>Products</h2>
            {data.products.map(item => (
              <div key={item.id}>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex max-w-7xl mx-auto p-8">
      <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-grow p-4">{renderSection()}</div>
    </div>
  );
};

export default AdminDashboard;