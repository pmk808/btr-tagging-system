<template>
  <div class="login-container">
    <!-- Overlay image -->
    <div class="overlay-image">
      <!-- Treasury Department Logo -->
      <div class="treasury-office">
        <img src="../assets/BTr-removebg-preview.png" alt="Treasury Department Logo" class="treasury-logo">
      </div>
      <div class="title-logo">
        <h1>DOCUMENT STATUS TAGGING SYSTEM</h1>
        <p>Quick and Easy: Bureau of Treasury Document Status Tagging System</p>
      </div>
    </div>
    <div class="login-content">
      <!-- Login Form -->
      <div class="login-form">
        <h2>Login</h2>
        <form @submit.prevent="login">
          <input type="text" v-model="username" placeholder="Username" required>
          <input type="password" v-model="password" placeholder="Password" required>
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <router-link to="/signup">Sign up</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'LoginPage',
  setup() {
    const router = useRouter()

    const login = () => {
      router.push('/')
    }

    return {
      login,
    }
  }
};
</script>
  
<style scoped>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
}

.login-container {
  display: flex;
  height: 100%;
}

.overlay-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%; /* Set width to cover the left half of the container */
  height: 100%;
  border-radius: 20px;
  background: linear-gradient(rgba(255, 255, 0, 0.418), rgba(255, 255, 0, 0.678)), url('../assets/btr-hq1.jpg') center/cover no-repeat; /* Set the background image for overlay */
  z-index: 0; /* Ensure the overlay is behind other elements */
}

.login-content {
  position: absolute;
  top: 25%;
  right: 0;
  width: 50%;
  height: 50%;
  display: flex;
  flex: 1;
}

.title-logo {
  text-align: center; /* Center text */
}

.treasury-office {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-weight: bold;
}

.treasury-logo {
  max-width: 60%;
  position: relative; /* Set the position to relative */
}

.login-form {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  border-radius: 20px;
  height: 100%;
  border: 1px solid #003aa2; /* Add border */
  background-color: #fff; /* Set background color */
}

.login-form form {
  max-width: 300px;
  width: 100%;
  border-radius: 20px;
}

.login-form input[type="text"],
.login-form input[type="password"],
.login-form button {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  border: none;
  outline: none;
}

.login-form button {
  background-color: #0038A7;
  color: #fff;
  cursor: pointer;
}

.login-form button:hover {
  background-color: #FDD116;
}
</style>
