<template>
    <div class="dashboard-container">
      <HeaderComponent />
      <SidebarComponent :sidebar-visible="sidebarVisible" @toggle-sidebar="toggleSidebar" />
      <div class="main-content">
        <div class="dashboard-content" v-if="isLoggedIn">
          </div>
      </div>
  
      <FooterComponent />
    </div>
  </template>
  
<script setup>
import { ref } from 'vue';
import HeaderComponent from '../components/dashboardcomp/HeaderComponent.vue';
import SidebarComponent from '../components/dashboardcomp/SidebarComponent.vue';
import FooterComponent from '../components/dashboardcomp/FooterComponent.vue';

const sidebarVisible = ref(true); 

function toggleSidebar() {
  sidebarVisible.value = !sidebarVisible.value;
}
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');

/* Dashboard Container */
.dashboard-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

/* Main Content Styles */
.main-content {
    display: flex;
    flex: 1;
    padding: 15px;
    
}

/* Dashboard Content Styles */
.dashboard-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
}
</style>