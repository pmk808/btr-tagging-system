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
            <!-- Forwarded To: -->
            <div class="form-group">
              <label for="forward">Forwarded To:</label>
              <input type="text" id="forward" v-model="forward" required>
            </div>
            <!-- Date -->
            <div class="form-group">
              <label for="date">Date</label>
              <input type="date" id="date" v-model="date" required>
            </div>
             <!-- Office: -->
             <div class="form-group">
              <label for="department">Office:</label>
              <select v-model="department">
                <option disabled value="">Select Department</option>
                <option value="accounting">Accounting Office</option>
                <option value="provincial">Provincial Office</option>
                <option value="regional">Regional Office</option>
                <option value="rdoffice">RD Office</option>
              </select>
            </div>
            <!-- In or Out: -->
            <div class="form-group">
              <label for="in_out">In or Out:</label>
              <select v-model="in_out">
                <option disabled value="">Select</option>
                <option value="incoming">Incoming</option>
                <option value="outgoing">Outgoing</option>
              </select>
            </div>
            <!-- In or Out: -->
            <div class="form-group">
              <label for="status">Status</label>
              <select v-model="status">
                <option disabled value="">Select</option>
                <option value="pending">Pending</option>
                <option value="received">Received</option>
              </select>
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
const forward = ref('');
const date = ref('');
const department = ref('');
const in_out = ref('');
const status = ref('');

const emit = defineEmits(['close-modal', 'update-form']); 

const currentDate = new Date().toLocaleDateString();

const closeModal = () => { 
  emit('close-modal');
};

const submitForm = () => {
  // You can perform form validation here before submitting
  if (documentType.value && documentTitle.value && actionsNeeded.value && receivedBy.value && agencySource.value && forward.value && date.value && department.value && in_out.value && status.value) {
    // Emit an event to inform the parent component that the form is submitted
    emit('update-form', {
      documentType: documentType.value,
      documentTitle: documentTitle.value,
      actionsNeeded: actionsNeeded.value,
      receivedBy: receivedBy.value,
      agencySource: agencySource.value,
      forward: forward.value,
      date: date.value,
      department: department.value,
      in_out: in_out.value,
      status: status.value
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
  width: 70%; /* Expand the width */
  max-height: 80vh; /* Set a maximum width */
  overflow-y: auto; /* Hide the overflow content */
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

/* Modal Body */
.modal-body {
  height: 650px; /* Adjust the height */
}

/* Form Group */
.form-group {
  margin-bottom: 1rem;
}

/* Form Inputs */
input[type="text"],
input[type="date"],
select {
  width: calc(100% - 2px); /* Adjust the width to accommodate the border */
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

/* Buttons Container */
.buttons {
  margin-top: 1rem;
  text-align: right;
}
</style>
