import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateNewsForm from '../components/CreateNewsForm';
import CreateProductForm from '../components/CreateProductForm';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('news');
  const [newsList, setNewsList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [adminData, setAdminData] = useState({ contacts: [], applications: [], users: [] });
  const token = localStorage.getItem('token');

  const fetchData = () => {
    axios.get('http://localhost:5000/api/admin/dashboard', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => setAdminData(response.data))
      .catch(error => console.error('Error fetching admin data:', error));

    axios.get('http://localhost:5000/api/news', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => setNewsList(response.data.news))
      .catch(error => console.error('Error fetching news:', error));

    axios.get('http://localhost:5000/api/product', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => setProductList(response.data.products))
      .catch(error => console.error('Error fetching products:', error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'news':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">News</h2>
            <CreateNewsForm />
            {newsList.map(item => (
              <div key={item.id} className="border p-4 rounded mb-2 flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p>{item.content}</p>
                </div>
                <button onClick={() => {
                  axios.delete(`http://localhost:5000/api/news/${item.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                  }).then(() => fetchData());
                }} className="bg-red-600 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </div>
            ))}
          </div>
        );
      case 'products':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <CreateProductForm />
            {productList.map(item => (
              <div key={item.id} className="border p-4 rounded mb-2 flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p>{item.description}</p>
                  <p>${item.price}</p>
                </div>
                <button onClick={() => {
                  axios.delete(`http://localhost:5000/api/product/${item.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                  }).then(() => fetchData());
                }} className="bg-red-600 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </div>
            ))}
          </div>
        );
      case 'contacts':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
            {adminData.contacts.length > 0 ? adminData.contacts.map(msg => (
              <div key={msg.id} className="border p-4 rounded mb-2">
                <p><strong>Name:</strong> {msg.name}</p>
                <p><strong>Email:</strong> {msg.email}</p>
                <p><strong>Subject:</strong> {msg.subject}</p>
                <p>{msg.message}</p>
                <p><em>{msg.submitted_at}</em></p>
              </div>
            )) : <p>No contact messages.</p>}
          </div>
        );
      case 'applications':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Warrior Applications</h2>
            {adminData.applications.length > 0 ? adminData.applications.map(app => (
              <div key={app.id} className="border p-4 rounded mb-2">
                <p><strong>Name:</strong> {app.name}</p>
                <p><strong>Age:</strong> {app.age}</p>
                <p><strong>Email:</strong> {app.email}</p>
                <p><strong>Phone:</strong> {app.phone}</p>
                <p>{app.reason}</p>
              </div>
            )) : <p>No warrior applications.</p>}
          </div>
        );
      case 'users':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            {adminData.users.length > 0 ? adminData.users.map(user => (
              <div key={user.id} className="border p-4 rounded mb-2">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
              </div>
            )) : <p>No users found.</p>}
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
