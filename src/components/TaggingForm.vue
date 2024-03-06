<template>
  <div class="modal-overlay">
    <div class="modal-dialog">
      <div class="modal-content tagging-form-modal">
        <div class="modal-header">
          <h3>Document Tagging Form</h3>
          <div class="header-info">
            <p class="document-code">Document Code: ABC123</p>
            <p class="current-date">{{ currentDate }}</p>
          </div>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <!-- Document Type and Document Title -->
            <div class="form-row">
              <div class="form-group">
                <label for="documentType">Document Type</label>
                <input type="text" id="documentType" v-model="documentType" required>
              </div>
              <div class="form-group">
                <label for="documentTitle">Document Title</label>
                <input type="text" id="documentTitle" v-model="documentTitle" required>
              </div>
            </div>
            <!-- Action Needed and Agency/Source -->
            <div class="form-row">
              <div class="form-group">
                <label for="actionsNeeded">Action(s) Needed</label>
                <input type="text" id="actionsNeeded" v-model="actionsNeeded" required>
              </div>
              <div class="form-group">
                <label for="agencySource">Agency/Source</label>
                <input type="text" id="agencySource" v-model="agencySource" required>
              </div>
            </div>
            <!-- Received By/From -->
            <div class="form-group">
              <label for="receivedBy">Received By / From</label>
              <input type="text" id="receivedBy" v-model="receivedBy" required>
            </div>
            <!-- Date -->
            <div class="form-group">
              <label for="date">Date</label>
              <input type="date" id="date" v-model="date" required>
            </div>
            <!-- Submit and Cancel Buttons -->
            <div class="buttons">
              <button type="submit">Submit</button>&nbsp;
              <button type="reset" @click="closeModal">Cancel</button>
            </div>
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

const currentDate = new Date().toLocaleDateString();

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
/* Modal Overlay */
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

/* Modal Dialog */
.modal-dialog {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 90%; /* Expand the width */
}

/* Modal Content */
.modal-content {
  /* Additional styling for modal content */
}

/* Modal Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc; /* Add a border between header and body */
  padding-bottom: 10px; /* Add some padding at the bottom */
  margin-bottom: 10px; /* Add some margin at the bottom */
}

/* Close Button */
.close-button {
  background: #0038A7;
  border: none;
  cursor: pointer;
  color: white; /* Add color to close button text */
  font-weight: bold; /* Make close button text bold */
  padding: 5px 10px; /* Add padding to close button */
  border-radius: 5px; /* Add border-radius to close button */
}

.close-button:hover {
  background: #001F5E; /* Change background color on hover */
}

/* Modal Body */
.modal-body {
  /* Additional styling for modal body */
}

/* Form Group */
.form-group {
  margin-bottom: 1rem;
}

/* Form Inputs */
input[type="text"],
input[type="date"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Submit Button */
button[type="submit"],
button[type="reset"] {
  background-color: #0038A7;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

button[type="submit"]:hover,
button[type="reset"]:hover {
  background-color: #001F5E;
}

/* Header Info */
.header-info {
  display: flex;
  align-items: center;
}

/* Document Code */
.document-code {
  font-size: 14px;
  margin-right: 10px;
}

/* Current Date */
.current-date {
  font-size: 14px;
}
</style>
