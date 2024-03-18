<template>
  <!-- Sidebar -->
  <div :class="['sidebar', { 'collapsed': !sidebarVisible }]">
    <span class="toggle-btn" @click="toggleSidebar">
      <font-awesome-icon :icon="sidebarVisible ? ['fas', 'bars'] : ['fas', 'angles-right']" />
    </span>
    <h3>Welcome</h3>
    <ul>
      <li :class="{ 'active': $route.path === '/dashboard' }"><router-link to="/dashboard">
          <span class="icons">
            <font-awesome-icon :icon="['fas', 'house']" /></span>Dashboard</router-link></li>
      <!-- Conditionally render the "Tagging" tab -->
      <template v-if="isAdmin">
        <li :class="{ 'active': $route.path === '/tagging' }"><router-link to="/tagging">
            <span class="icons"><font-awesome-icon :icon="['fas', 'tags']" /></span>Tagging
          </router-link></li>
      </template>
      <!-- End of conditional rendering -->
      <li :class="{ 'active': $route.path === '/reports' }"><router-link to="/reports">
          <span class="icons">
            <font-awesome-icon :icon="['fas', 'chart-area']" /></span>Reports</router-link></li>
    </ul>
    <ul>
      <li :class="{ 'active': $route.path === '/' }"><router-link to="/" @click="logout">
          <span class="icons">
            <font-awesome-icon :icon="['fas', 'right-from-bracket']" /></span>Logout</router-link></li>
    </ul>
  </div>
</template>

<script setup>
import '@fortawesome/fontawesome-free/js/all.js';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRouter } from 'vue-router';

import { ref, onMounted } from 'vue';
import { supabase } from '../../supabaseconfig.js'; // Assuming you have a file for Supabase configuration

const router = useRouter();
const sidebarVisible = ref(true);
const isAdmin = ref(false); // Initialize isAdmin as false by default

const toggleSidebar = () => {
  sidebarVisible.value = !sidebarVisible.value;
};

const logout = () => {
  // Clear token from local storage
  localStorage.removeItem('sb-yszwlktldjrohxuneyop-auth-token');
  // Redirect to login page
  router.push('/');
};

const fetchUserData = async () => {
  // Fetch token from localStorage
  const token = localStorage.getItem('sb-yszwlktldjrohxuneyop-auth-token');

  // Function to extract the email from the access token
  const extractEmailFromToken = (token) => {
    try {
      // Parse the token as JSON
      const tokenData = JSON.parse(token);
      // Extract the email from the user object
      const email = tokenData?.user?.email;
      return email;
    } catch (error) {
      console.error('Error extracting email from token:', error.message);
      return null;
    }
  };

  const email = extractEmailFromToken(token);

  if (email) {
    try {
      // Fetch user data from your database based on the email
      const { userData, dbError } = await fetchUserDataFromDatabase(email);
      if (dbError) {
        throw dbError;
      }
      
      // Check if user is admin
      isAdmin.value = userData?.isAdmin ?? false;
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  } else {
    console.error('Email is missing from token.');
  }
};

const fetchUserDataFromDatabase = async (email) => {
  try {
    // Make a request to Supabase to fetch user data based on the email
    const { data: userData, error } = await supabase
      .from('users')
      .select('isAdmin')
      .eq('email', email)
      .single();
      
    if (error) {
      throw error;
    }

    return { userData };
  } catch (error) {
    console.error('Error fetching user data from database:', error.message);
    return { dbError: error };
  }
};



// Fetch user data when the component is mounted
onMounted(fetchUserData);
</script>

<style scoped>
/* Sidebar Styles */
.sidebar {
  width: 150px;
  height: 100%;
  float: left;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 4;
  color: #fff;
  background-color: #0038A7;
  padding: 20px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-right: 1px solid #000000;
  box-shadow: 1px 0 0 #0038A7;
  font-family: 'Poppins', sans-serif;
  flex-direction: column;
  transition: 0.5s ease;
}

.sidebar.collapsed {
  width: 0;
  overflow: auto;
  bottom: 0;
  margin-right: 1em;
}

.icons {
  padding-right: 10px;
  padding-left: 15px;
  white-space: nowrap;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
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
  margin-bottom: 40px;
  display: block;
  padding: 10px;
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar ul li a:hover {
  text-decoration: underline;
}

.sidebar ul li a:active {
  color: #fff;
  background-color: #fdd116;
}

.active {
  background-color: #fdd116;
  color: #0038A7;
  font-weight: bold;
  border-radius: 8px;
}

.toggle-btn {
  background-color: #0038A7;
  color: #fff;
  font-size: 20px;
  margin-bottom: 20px;
}

.toggle-btn:hover {
  cursor: pointer;
}
</style>
