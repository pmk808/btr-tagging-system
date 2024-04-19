<template>
  <div class="allow-users-container">
    <HeaderComponent />
    <div class="main-wrapper" :class="{ 'sidebar-collapsed': !sidebarVisible }">
      <SidebarComponent :sidebar-visible="sidebarVisible" @toggle-sidebar="toggleSidebar" />
      <div class="main-content">
        <!-- Add content specific to Allow Users page here -->
        <div class="allow-users-content">
          <h2>Allow Users</h2>
          <!-- Table -->
          <table class="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <!-- Table rows will go here -->
            </tbody>
          </table>
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
  display: flex;
  flex-direction: column;
  position: relative;
  top: -80px;
  height: 100%;
  padding-bottom: 10px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  padding: 15px;
  margin-top: 200px;
  display: flex;
  flex: 1;
  position: relative;
  margin-left: 15%;
  width: 85%;
  transition: margin-left 500ms, width 500ms;
}

.user-table {
  width: 100%;
  max-width: 1500px;
  border-collapse: collapse;
  transition: width 500ms;
  margin: 5px auto 0;
  position: relative;
  border-radius: 5px;
}

.user-table th,
.user-table td {
  border: 1px solid #dddddd;
  padding: 5px;
  text-align: center;
  font-size: 12px;
}

.user-table th {
  background-color: #0038A7;
  color: #f2f2f2;
}
</style>
