<template>
    <div class="dashboard-container">
      <!-- Header -->
      <div class="header">
        <h1>Welcome to the Dashboard</h1>
        <p>Manage your documents efficiently</p>
      </div>
  
      <!-- Sidebar -->
      <div class="sidebar">
        <h3>Sidebar</h3>
        <ul>
          <li><router-link to="/dashboard">Dashboard</router-link></li>
          <li><router-link to="/profile">Profile</router-link></li>
          <li><router-link to="/settings">Settings</router-link></li>
        </ul>
      </div>
  
      <!-- Main Content -->
      <div class="main-content">
        <!-- Dashboard Content -->
        <div class="dashboard-content">
          <!-- Placeholders for Dashboard Widgets -->
        </div>
      </div>
  
      <!-- Footer -->
      <div class="footer">
        <p>&copy; 2024 Your Company</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DashboardPage'
  };
  </script>
  
  <style scoped>
  /* Dashboard Container */
  .dashboard-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  /* Header Styles */
  .header {
    background-color: #0038A7;
    color: #fff;
    padding: 20px;
  }
  
  .header h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  /* Sidebar Styles */
  .sidebar {
    width: 20%;
    background-color: #0038A7;
    color: #fff;
    padding: 20px;
  }
  
  .sidebar h3 {
    margin-bottom: 20px;
  }
  
  .sidebar ul {
    list-style-type: none;
    padding: 0;
  }
  
  .sidebar ul li {
    margin-bottom: 10px;
  }
  
  .sidebar ul li a {
    color: #fff;
    text-decoration: none;
  }
  
  .sidebar ul li a:hover {
    text-decoration: underline;
  }
  
  /* Main Content Styles */
  .main-content {
    display: flex;
    flex: 1;
    padding: 20px;
  }
  
  /* Dashboard Content Styles */
  .dashboard-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
  }
  
  .widget {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .widget h2 {
    margin-bottom: 15px;
  }
  
  /* Footer Styles */
  .footer {
    background-color: #0038A7;
    color: #fff;
    padding: 20px;
    text-align: center;
  }
  </style>
  