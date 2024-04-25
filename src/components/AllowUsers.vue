<template>
  <div class="allow-users-container">
    <HeaderComponent />
    <div class="main-wrapper" :class="{ 'sidebar-collapsed': !sidebarVisible }">
      <SidebarComponent :sidebar-visible="sidebarVisible" @toggle-sidebar="toggleSidebar" />
      <div class="main-content">
        <div class="allow-users-content">
          <h2>Allow Users</h2>
          <table class="user-table">
            <thead>
              <tr>
                <th style="width: 30%;">Name</th>
                <th style="width: 30%;">Email</th>
                <th style="width: 25%;">Department</th>
                <th style="width: 25%;">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.department }}</td>
                <td>
                  <select v-model="user.statusValue" @change="updateUserStatus(user, $event.target.value)">
                    <option value="activated">Activate</option>
                    <option value="deactivated">Deactivate</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <FooterComponent />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import HeaderComponent from '../components/dashboardcomp/HeaderComponent.vue';
import SidebarComponent from '../components/dashboardcomp/SidebarComponent.vue';
import FooterComponent from '../components/dashboardcomp/FooterComponent.vue';
import '@fortawesome/fontawesome-free/js/all.js';
import { supabase } from '../supabaseconfig.js';

const sidebarVisible = ref(true);
const users = ref([]);

function toggleSidebar() {
  sidebarVisible.value = !sidebarVisible.value;
}

async function fetchUsers() {
  const { data, error } = await supabase.from('users').select('*');
  if (error) {
    console.error('Error fetching users:', error.message);
  } else {
    users.value = data.map(user => ({
      ...user,
      statusValue: user.status 
    }));
  }
}

const updateUserStatus = async (user, status) => {
  const newStatus = status === 'activated' ? 'activated' : 'deactivated'; 

  user.status = newStatus; 

  const { error } = await supabase
    .from('users')
    .update({ status: newStatus })
    .eq('uid', user.uid);

  if (error) {
    console.error('Error updating user status:', error.message);
  } else {
    console.log('User status updated successfully!');
  }
};

onMounted(fetchUsers);
</script>

<style scoped>
.allow-users-content {
  margin-top: 150px;
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

.user-table td select {
    border: 1px solid #dddddd;
    padding: 5px;
    text-align: center;
    font-size: 12px;
    background-color: #0038A7;
    color: #f2f2f2;
    border-radius: 10px;
    font-weight: 300;
}
</style>
