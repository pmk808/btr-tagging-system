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
        <form @submit.prevent="register" :class="{ 'error': registrationError }">
          <input type="email" v-model="email" placeholder="Email" required>
          <input type="password" v-model="registerPassword" placeholder="Password" required>
          <input type="text" v-model="name" placeholder="Name" required>
          <select v-model="department">
            <option disabled value="">Select Department</option>
            <option value="Receiving">Receiving Officer</option>
            <option value="Admin">Admin Office</option>
            <option value="Provincial">Provincial Office</option>
            <option value="Accounting">Accounting Office</option>
            <option value="RD">Regional Director</option>
          </select>
          <button :disabled="loading" type="submit">
            <span v-if="loading">Registering...</span>
            <span v-else>REGISTER</span>
          </button>
          <p v-if="registrationError" class="error-message">{{ registrationError }}</p>
        </form>
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
const loading = ref(false);

const email = ref('');
const registerPassword = ref('');
const name = ref('');
const department = ref('');

const register = async () => {
  loading.value = true;
  try {
    if (!department.value) {
      registrationError.value = "Please select a department";
      return;
    }

    const isAdmin = ['Accounting', 'Provincial', 'Admin'].includes(department.value) ? false : true;

    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: registerPassword.value
    });

    if (error) {
      registrationError.value = error.message;
    } else {
      // After successful registration, store additional user details in the Supabase users table
      const { error } = await supabase
        .from('users')
        .insert([{ email: email.value, name: name.value, department: department.value, isAdmin: isAdmin }]);

      if (error) {
        registrationError.value = error.message;
      } else {
        // Redirect on success
        router.push('/');
      }
    }
  } catch (error) {
    registrationError.value = error.message;
  } finally {
    loading.value = false;
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
  top: 5%;
  left: 0;
  justify-content: center;
  width: 50%;
  height: 75%;
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

.error-message {
  color: red;
}

.register-form input[type="text"].error,
.register-form input[type="email"].error,
.register-form input[type="password"].error {
  border: 1px solid red;
  box-shadow: 0 0 5px red;
}
</style>