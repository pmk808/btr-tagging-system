<template>
  <!-- Sidebar -->
  <div :class="['sidebar', { 'collapsed': !sidebarVisible }]">
    <span class="toggle-btn" @click="$emit('toggle-Sidebar')">
      <font-awesome-icon :icon="sidebarVisible ? ['fas', 'bars'] : ['fas', 'angles-right']" />
    </span>
    <ul>
      <li :class="{ 'active': $route.path === '/dashboard' }"><router-link to="/dashboard">
          <span class="icons">
            <font-awesome-icon :icon="['fas', 'house']" /></span>Dashboard</router-link></li>
      <li :class="{ 'active': $route.path === '/tagging' }"><router-link to="/tagging">
          <span class="icons"><font-awesome-icon :icon="['fas', 'tags']" /></span>Tagging
        </router-link></li>
      <li :class="{ 'active': $route.path === '/reports' }"><router-link to="/reports">
          <span class="icons">
            <font-awesome-icon :icon="['fas', 'chart-area']" /></span>Reports</router-link></li>
    </ul>
    <ul>
      <li :class="{ 'active': $route.path === '/' }"><router-link to="/">
          <span class="icons">
            <font-awesome-icon :icon="['fas', 'right-from-bracket']" /></span>Logout</router-link></li>
    </ul>
  </div>
</template>

<script>
import '@fortawesome/fontawesome-free/js/all.js';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default {
  components: {
    FontAwesomeIcon
  },
  props: ['sidebarVisible']
};
</script>

<style scoped>
/* Sidebar Styles */
.sidebar {
  width: 210px;
  height: 100%;
  float: left;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  color: #fff;
  background-color: #0038A7;
  padding: 25px;
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
  font-size: 20px;
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
</style>