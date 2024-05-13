<template>
    <div class="tagging-container">
      <HeaderComponent />
      <div class="main-wrapper" :class="{ 'sidebar-collapsed': !sidebarVisible }">
        <SidebarComponent :sidebar-visible="sidebarVisible" @toggle-sidebar="toggleSidebar" />
        <div class="main-content">
          <div class="tagging-content" v-if="isLoggedIn">
          </div>
          <DDSTaggingForm />
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
  import DDSTaggingForm from '../components/DDSTaggingform.vue';
  import '@fortawesome/fontawesome-free/js/all.js';
  
  const sidebarVisible = ref(true);
  const isLoggedIn = ref(true);
  
  function toggleSidebar() {
    sidebarVisible.value = !sidebarVisible.value;
  }
  
  </script>  
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
  
  .tagging-container {
      display: flex;
      flex-direction: column;
      height: 100%;
  }
  
  .main-content {
      display: flex;
    flex: 1;
    justify-content: center;
    align-items: flex-start;
    padding: 15px;
    margin-top: 200px;
    transition: width 500ms;
  }
  
  .main-wrapper {
    display: flex;
    flex: 1;
    transition: margin-left 500ms;
  }
  
  .main-wrapper.sidebar-collapsed {
    margin-left: 60px;
  }
  
  .tagging-content {
      display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
  }
  
  .generateForm {
    background-color: #fdd116;
    font-size: 15px;
    color: #fff;
    border-radius: 5px;
    padding: 5px;
    margin-left: auto;
  }
  
  .generateForm:hover {
    background-color: #fdd116;
    color: #0038A7;
    transition: 0.5s ease;
  }
  
  .document-table {
    width: 100%;
    max-width: 1250px;
    border-collapse: collapse;
    transition: width 500ms;
    margin: 0 auto;
    position: relative;
    border-radius: 5px;
  }
  
  .document-table th,
  .document-table td {
    border: 1px solid #dddddd;
    padding: 8px;
    text-align: center;
  }
  
  .document-table th {
    background-color: #0038A7;
    color: #f2f2f2;
  }
  
  @media screen and (max-width: 768px) {
    .main-content {
      padding: 15px 10px;
      margin-top: 100px;
    }
  }
  
  @media screen and (max-width: 576px) {
    .main-wrapper {
      flex-direction: column;
    }
  
    .generateForm {
      margin-left: 0;
      margin-top: 10px;
    }
  }
  
  </style>