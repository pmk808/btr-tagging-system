<template>
    <div class="login-container">
      <div class="treasury-office">
        <img src="BTr-removebg-preview.png" alt="Treasury Department Logo" class="treasury-logo">
      </div>
      <div class="login-form">
        <h2>Login</h2>
        <form @submit.prevent="login">
          <input type="text" v-model="username" placeholder="Username" required>
          <input type="password" v-model="password" placeholder="Password" required>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginPage',
  props: {
    msg: String
  }
  };
  </script>
  
  <style scoped>
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  
  .login-container {
    display: flex;
    height: 100%;
  }
  
  .treasury-office {
    flex: 1;
    background: linear-gradient(rgba(255, 255, 0, 0.3), rgba(255, 255, 0, 0.3));
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
  
  .treasury-logo {
    max-width: 80%;
  }
  
  .login-form {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
  }
  
  .login-form form {
    max-width: 300px;
    width: 100%;
  }
  
  .login-form input[type="text"],
  .login-form input[type="password"],
  .login-form button {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .login-form button {
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
  }
  
  .login-form button:hover {
    background-color: #0056b3;
  }
  </style>