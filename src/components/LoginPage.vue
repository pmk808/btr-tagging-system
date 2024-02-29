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
        <p>Don't have an account?
            <router-link to="/signup">Sign up</router-link>
        </p>
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
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');

body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Poppins', sans-serif;
}

.login-container {
  display: flex;
  height: 100%;
}

.overlay-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  border-top-right-radius: 70px;
  border-bottom-right-radius: 70px;
  background: linear-gradient(rgba(253, 211, 22, 0.473), rgb(253, 211, 22)), url('../assets/btr-hq1.jpg') center/cover no-repeat;
  /* Set the background image for overlay */
  z-index: 0;
}

.login-content {
  position: absolute;
  top: 20%;
  right: 0;
  justify-content: center;
  width: 50%;
  height: 60%;
  display: flex;
  flex: 1;
  border-top-left-radius: 70px;
}

.title-logo {
  font-family: 'Poppins', sans-serif;
  text-align: center;
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
  font-family: 'Poppins', sans-serif;
  max-width: 60%;
  position: relative;
  color: #000;
}

.login-form {
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  border-radius: 20px;
  height: 100%;
  font-family: 'Poppins', sans-serif;
  border: 1px solid gray;
  box-shadow: 0 0 10px 0 #0039a29a;
  background-color: #fff;
}

.login-form h2 {
  color: #0038A7;
}

.login-form form {
  max-width: 300px;
  width: 100%;
  border-radius: 15px;
  padding: 10px;
}

.login-form input[type="text"],
.login-form input[type="password"] {
  font-family: 'Poppins', sans-serif;
  width: 85%;
  border: 1px solid #0038A7;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
}

.login-form button {
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

.login-form button {
  background-color: #0038A7;
  color: #fff;
  cursor: pointer;
}

.login-form button:hover {
  background-color: #FDD116;
}

@media only screen and (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }

  .overlay-image {
    width: 100%;
    height: 50%;
    border-radius: 0;
  }

  .login-content {
    width: 100%;
    height: 50%;
    border-radius: 0;
  }
}
</style>