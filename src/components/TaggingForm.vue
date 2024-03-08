<template>
  <div class="tagging-form">
    <h3>Document Tagging Form</h3>
    <div class="header-info">
      <p class="document-code">Document Code: ABC123</p>
      <p class="current-date">{{ currentDate }}</p>
    </div>
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
      <!-- Office: -->
      <div class="form-group">
        <label for="department">Office:</label>
        <select v-model="department">
          <option disabled value="">Select Department</option>
          <option value="Accounting">Accounting Office</option>
          <option value="Provincial">Provincial Office</option>
          <option value="Regional">Regional Office</option>
          <option value="RDoffice">RD Office</option>
        </select>
      </div>
      <!-- In or Out: -->
      <div class="form-group">
        <label for="in_out">In or Out:</label>
        <select v-model="in_out">
          <option disabled value="">Select</option>
          <option value="Incoming">Incoming</option>
          <option value="Outgoing">Outgoing</option>
        </select>
      </div>
      <!-- Submit Button -->
      <div class="buttons">
        <button type="submit">Submit</button>&nbsp;
        <button type="reset" @click="resetForm">Clear</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { supabase } from '../supabaseconfig.js';

const documentType = ref('');
const documentTitle = ref('');
const actionsNeeded = ref('');
const receivedBy = ref('');
const agencySource = ref('');
const forward = ref('');
const department = ref('');
const in_out = ref('');
const status = ref('Pending');
const documentCode = ref(''); 

const currentDate = new Date().toLocaleDateString();

const fetchLatestDocumentCode = async () => {
    try {
        const { data, error } = await supabase
            .from('taggingForm')
            .select('document_code')
            .eq('in_out', in_out.value) // Filter by the current transaction type
            .order('document_code', { ascending: false })
            .limit(1);

        if (error) throw error;

        documentCode.value = data.length > 0 ? data[0].document_code : '';

    } catch (error) {
        console.error('Error fetching latest document code:', error);
        // Handle error gracefully
    }
};

const generateDocumentCode = () => {
  const defaultPrefix = 'BTrXI-';
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString().slice(-4);
  const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);

  // Extract transaction number with padding intact
  let transactionNumber = 0; 
  if (documentCode.value) {
    transactionNumber = parseInt(documentCode.value.slice(-3), 10); 
  }

  // Increment and ensure padding
  transactionNumber++; 
  const paddedTransactionNumber = transactionNumber.toString().padStart(3, '0');

  return defaultPrefix + 'R' + year + '-' + month + '-' + paddedTransactionNumber;
};


const submitForm = async () => {
  
  await fetchLatestDocumentCode(); 
  const documentCode = generateDocumentCode();
  const currentDate = new Date().toLocaleDateString();

  console.log('Document Type:', documentType.value);
  console.log('Document Title:', documentTitle.value);
  console.log('Actions Needed:', actionsNeeded.value);
  console.log('Received By:', receivedBy.value);
  console.log('Agency/Source:', agencySource.value);
  console.log('Forwarded To:', forward.value);
  console.log('Office:', department.value);
  console.log('In or Out:', in_out.value);
  console.log('Status:', status.value);
  
  if (documentType.value && documentTitle.value && actionsNeeded.value && receivedBy.value && agencySource.value && forward.value && department.value && in_out.value && status.value) {
    try {
      const { error } = await supabase
        .from('taggingForm')
        .insert([
          {
            document_code: documentCode,
            document_type: documentType.value,
            document_title: documentTitle.value,
            actions: actionsNeeded.value,
            received_from: receivedBy.value,
            rcv_date: currentDate,
            agency: agencySource.value,
            fwd_to: forward.value,
            fwd_date: currentDate,
            office: department.value,
            in_out: in_out.value,
            status: status.value,
          },
        ]);
      
      if (error) {
        throw error;
      }

      resetForm();
      console.log('Form submitted successfully');
    
  } catch (error) {
      console.error('Error inserting form data into Supabase:', error.message);
      console.log('Failed to submit the form');
    }
  } else {
    console.error('Please fill in all fields');
  }
};

const resetForm = () => {
  documentCode.value = '';
  documentType.value = '';
  documentTitle.value = '';
  actionsNeeded.value = '';
  receivedBy.value = '';
  agencySource.value = '';
  forward.value = '';
  department.value = '';
  in_out.value = '';
  status.value = 'Pending';
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
