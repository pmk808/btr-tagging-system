<template>
    <div class="modal-overlay">
      <div class="modal-dialog">
        <div class="modal-content tagging-form-modal">
          <div class="modal-header">
            <h3>Document Tagging Form</h3>
            <button class="close-button" @click="closeModal">X</button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="documentType">Document Type</label>
                <input type="text" id="documentType" v-model="documentType" required>
              </div>
              <div class="form-group">
                <label for="documentTitle">Document Title</label>
                <input type="text" id="documentTitle" v-model="documentTitle" required>
              </div>
              <div class="form-group">
                <label for="actionsNeeded">Action(s) Needed</label>
                <input type="text" id="actionsNeeded" v-model="actionsNeeded" required>
              </div>
              <div class="form-group">
                <label for="receivedBy">Received By / From</label>
                <input type="text" id="receivedBy" v-model="receivedBy" required>
              </div>
              <div class="form-group">
                <label for="agencySource">Agency/Source</label>
                <input type="text" id="agencySource" v-model="agencySource" required>
              </div>
              <div class="form-group">
                <label for="date">Date</label>
                <input type="date" id="date" v-model="date" required>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits } from 'vue';
  
  const documentType = ref('');
  const documentTitle = ref('');
  const actionsNeeded = ref('');
  const receivedBy = ref('');
  const agencySource = ref('');
const date = ref('');

const emit = defineEmits(['close-modal', 'update-form']); 
  
  const closeModal = () => {
    emit('close-modal');
  };
  
  const submitForm = () => {
  // You can perform form validation here before submitting
  if (documentType.value && documentTitle.value && actionsNeeded.value && receivedBy.value && agencySource.value && date.value) {
    // Emit an event to inform the parent component that the form is submitted
    emit('update-form', {
      documentType: documentType.value,
      documentTitle: documentTitle.value,
      actionsNeeded: actionsNeeded.value,
      receivedBy: receivedBy.value,
      agencySource: agencySource.value,
      date: date.value
    });
    // Close the modal after form submission
    closeModal();
  } else {
    // Handle form validation errors or display an error message
    console.error('Please fill in all fields');
  }
};
  </script>
  
  <style scoped>
  /* Add your modal styling here */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; /* Ensure it appears above other content */
  }
  
  .modal-dialog {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    max-width: 80%;
  }
  
  .modal-content {
    /* Add additional styling for the modal content */
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .close-button {
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .modal-body {
    /* Add additional styling for the modal body */
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  input[type="text"],
  input[type="date"] {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    background-color: #0038A7;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #001F5E;
  }
  </style>
  