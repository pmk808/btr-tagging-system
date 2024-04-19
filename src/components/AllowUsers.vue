<template>
    <div class="allow-users-container">
      <HeaderComponent />
      <div class="main-wrapper" :class="{ 'sidebar-collapsed': !sidebarVisible }">
        <SidebarComponent :sidebar-visible="sidebarVisible" @toggle-sidebar="toggleSidebar" />
        <div class="main-content">
          <!-- Add content specific to Allow Users page here -->
          <div class="allow-users-content">
            <h2>Allow Users Component</h2>
            <p>This is the Allow Users component. Only admins can access this page.</p>
            <!-- Add your content here -->
          </div>
        </div>
        <FooterComponent />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import HeaderComponent from '../components/dashboardcomp/HeaderComponent.vue';
  import SidebarComponent from '../components/dashboardcomp/SidebarComponent.vue';
  import FooterComponent from '../components/dashboardcomp/FooterComponent.vue';
  import '@fortawesome/fontawesome-free/js/all.js';
  
  const sidebarVisible = ref(true);
  
  function toggleSidebar() {
    sidebarVisible.value = !sidebarVisible.value;
  }
  </script>
  
  <style scoped>
  .allow-users-content {
    margin-top: 150px; /* Adjust the margin-top value as needed */
  }
  </style>
  