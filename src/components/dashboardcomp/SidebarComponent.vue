<template>
    <!-- Sidebar -->
    <div :class="['sidebar', { 'collapsed': !sidebarVisible }]">
      <button class="toggle-btn" @click="$emit('toggle-sidebar')">
        {{ sidebarVisible ? 'Hide Sidebar' : 'Show Sidebar' }}
      </button>
      <h3>Sidebar</h3>
      <ul>
        <li><router-link to="/dashboard">Dashboard</router-link></li>
        <li><router-link to="/tagging">Tagging</router-link></li>
        <li><router-link to="/reports">Reports</router-link></li>
      </ul>
      <ul>
        <li><router-link to="/">Logout</router-link></li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: ['sidebarVisible']
  };
  </script>
  
  <style scoped>
  /* Sidebar Styles */
  .sidebar {
    width: 200px; /* Adjust the width as needed */
    height: 100%;
    float: left;
    z-index: 2;
    color: #fff;
    background-color: #0038A7;
    padding: 20px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border-right: 1px solid #000000;
    box-shadow: 1px 0 0 #0038A7;
    font-family: 'Poppins', sans-serif;
    transition: width 0.3s ease; /* Add transition for smooth animation */
  }
  
  .sidebar.collapsed {
    width: 0;
    overflow: hidden;
  }
  
  .sidebar h3 {
    margin-bottom: 50px;
  }
  
  .sidebar ul {
    list-style-type: none;
    margin-bottom: 20px;
    padding: 0;
  }
  
  .sidebar ul li {
    margin-bottom: 20px;
    font-size: 20px;
  }
  
  .sidebar ul li a {
    color: #fff;
    text-decoration: none;
    margin-bottom: 20px;
    display: block;
    padding: 31px;
  }
  
  .sidebar ul li a:hover {
    text-decoration: underline;
  }
  
  .toggle-btn {
    display: block;
    margin-bottom: 20px;
  }
  </style>
  