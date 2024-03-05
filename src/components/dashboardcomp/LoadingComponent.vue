<template>
    <div class="loading">
      <div class="spinner"></div>
    </div>
  </template>
  
  <style scoped>
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #0038A7; /* Adjust color as needed */
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>  