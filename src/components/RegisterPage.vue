<template>
  <div class="register-container">
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
    <div class="register-content">
      <!-- Registration Form -->
      <div class="registration-form">
        <h2>REGISTER AN ACCOUNT</h2>
        <form @submit.prevent="register">

          <input type="text" v-model="email" placeholder="Email" required>
          <input type="password" v-model="registerPassword" placeholder="Password" required>
          <input type="email" v-model="email" placeholder="Email" required>
          <select v-model="department">
            <option disabled value="">Select Department</option>
            <option value="desk">Front Desk</option>
            <option value="regional">Regional Office</option>
            <option value="provincial">Provincial Office</option>
            <option value="accounting">Accounting Office</option>
          </select>
          <button type="submit">REGISTER</button>
        </form>
        <p v-if="registrationError" class="error-message">{{ registrationError }}</p>
        <p>Already have an Account?
          <router-link to="/" class="router-link">Login</router-link>
        </p>
        <RouterView class="router-view" v-slot="{ Component }">
          <Transition :name="fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { supabase } from '../supabaseconfig.js';
import { ref } from 'vue';

const router = useRouter();
const registrationError = ref('');

const email = ref('');
const registerPassword = ref('');
const username = ref('');
const department = ref('');

const register = async () => {
  try {

    const { error } = await supabase.auth.signUp({  
      email: email.value,
      password: registerPassword.value,
      options: { 
        data: {
          username: username.value,
          department: department.value
        } 
      }
    });

    if (error) {
      registrationError.value = error.message;
    } else {
      router.push('/'); // Redirect on success
    }
  } catch (error) {
    registrationError.value = error.message;
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');

body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Poppins, sans-serif;
}

.register-container {
  display: flex;
  height: 100%;
}

.overlay-image {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  border-top-left-radius: 70px;
  border-bottom-left-radius: 70px;
  background: linear-gradient(rgba(0, 56, 167, 0.514), rgb(0, 56, 167)), url('../assets/btr-hq1.jpg') center/cover no-repeat;
  z-index: 0;
}

.register-content {
  position: absolute;
  top: 10%;
  left: 0;
  justify-content: center;
  width: 50%;
  height: 70%;
  display: flex;
  flex: 1;
}

.title-logo {
  font-family: 'Poppins', sans-serif;
  text-align: center;
  color: #fff;
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
  position: relative;
}

.registration-form {
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  border-radius: 20px;
  height: 100%;
  font-family: 'Poppins', sans-serif;
  border: 1px solid gray;
  box-shadow: 0 0 15px 0 #fdd116;
  background-color: #fff;
}

.registration-form h2 {
  color: #0038A7;
}

.registration-form form {
  max-width: 300px;
  width: 100%;
  border-radius: 15px;
  padding: 10px;
}

.registration-form input[type="text"],
.registration-form input[type="password"],
.registration-form input[type="email"] {
  font-family: 'Poppins', sans-serif;
  width: 90%;
  border: 1px solid #0038A7;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
}

.registration-form select{
  font-family: 'Poppins', sans-serif;
  width: 95%;
  border: 1px solid #0038A7;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
}

.registration-form button {
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  border: none;
  outline: none;
}

.registration-form button {
  background-color: #0038A7;
  color: #fff;
  cursor: pointer;
}

.registration-form button:hover {
  background-color: #FDD116;
}

.registration-form {
  margin-top: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: 600ms ease all;
}

.fade-enter,
.fade-leave-to {
  transform: translateX(-100%);
}
</style>