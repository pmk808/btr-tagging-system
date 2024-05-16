<!-- ConfirmDialog.vue -->
<template>
    <div v-if="visible" class="modal-overlay">
      <div class="modal-container">
        <h3 class="modal-title">{{ title }}</h3>
        <p class="modal-message">{{ message }}</p>
        <div class="modal-actions">
          <button class="btn btn-confirm" @click="confirm">Confirm</button>
          <button class="btn btn-cancel" @click="cancel">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
   defineProps({
    title: {
      type: String,
      default: 'Confirm'
    },
    message: {
      type: String,
      default: 'Are you sure?'
    },
    visible: {
      type: Boolean,
      default: false
    }
  });
  
  const emit = defineEmits(['confirm', 'cancel']);
  
  const confirm = () => {
    emit('confirm');
  };
  
  const cancel = () => {
    emit('cancel');
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-container {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
    transition: 0.5s ease;
  }
  
  .modal-title {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
    color: #0038A7;
  }
  
  .modal-message {
    margin-bottom: 20px;
    font-size: 16px;
    color: #0038A7;
  }
  
  .modal-actions {
    display: flex;
    justify-content: space-between;
  }
  
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-confirm {
    background: #0038A7;
    color: #fff;
  }

  .btn-confirm[disabled] {
    background-color: #ccc;
  cursor: not-allowed
  }

  .btn-confirm:hover:not([disabled]) {
    background-color: #001F5E;
  }
  
  .btn-cancel {
    background: #fdd116;
    color: #fff;
  }

  .btn-cancel[disabled] {
    background-color: #ccc;
    cursor: not-allowed;
}

    .btn-cancel:hover:not([disabled]) {
        background-color: #fdd316a6;
    }
  </style>