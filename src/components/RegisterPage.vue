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
                <h2>LOGIN INTO YOUR ACCOUNT</h2>
                <form @submit.prevent="login">
                    <input type="text" v-model="username" placeholder="Username" required>
                    <input type="password" v-model="password" placeholder="Password" required>
                    <button type="submit">LOGIN</button>
                </form>
                <p>Don't have an account? <router-link to="/signup">Sign up</router-link></p>
            </div>
            <!-- Registration Form -->
            <div class="registration-form">
                <h2>REGISTER AN ACCOUNT</h2>
                <form @submit.prevent="register">
                    <input type="text" v-model="registerUsername" placeholder="Username" required>
                    <input type="password" v-model="registerPassword" placeholder="Password" required>
                    <input type="text" v-model="name" placeholder="Name" required>
                    <input type="email" v-model="email" placeholder="Email" required>
                    <input type="text" v-model="department" placeholder="Department" required>
                    <button type="submit">REGISTER</button>
                </form>
                <p>Already have an Account? <router-Link to="/">Login</router-Link></p>
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

    const register = () => {
      // Handle registration logic here
      router.push('/')
    }

    return {
      login,
      register,
      username: '',
      password: '',
      registerUsername: '',
      registerPassword: '',
      name: '',
      email: '',
      department: ''
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
  border-bottom-right-radius: 70px;
  background: linear-gradient(rgba(255, 255, 0, 0.418), rgba(255, 255, 0, 0.678)), url('../assets/btr-hq1.jpg') center/cover no-repeat; /* Set the background image for overlay */
  z-index: 0; /* Ensure the overlay is behind other elements */
}

.login-content {
  position: absolute;
  top: 20%;
  right: 0;
  justify-content: center;
  width: 50%;
  height: 50%;
  display: flex;
  flex: 1;
  border-top-left-radius: 70px;
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
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  border-radius: 20px;
  height: 100%;
  font-family: Arial, Helvetica, sans-serif;
  border: 1px solid gray;
  box-shadow: 0 0 10px 0 #0039a29a;
  background-color: #fff;
}

.login-form form {
  max-width: 300px;
  width: 100%;
  border-radius: 15px;
  padding: 10px;
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

.registration-form {
  margin-top: 20px; /* Add some spacing between login and registration forms */
}
</style>