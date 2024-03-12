<template>
  <div class="tagging-form">
    <div class="form-row">
    <h2>Document Tagging Form</h2>
    <div class="header-info">
      <p class="document-code">Document Code: ABC123</p>
      <p class="current-date">Date: {{ currentDate }}</p>
    </div>
    </div>
    <form @submit.prevent="submitForm">
      <!-- Document Type and Action Needed -->
      <div class="form-row">
        <div class="form-group">
          <label for="documentType">Document Type</label>
          <input type="text" id="documentType" v-model="documentType" required>
        </div>
        <div class="form-group">
          <label for="actionsNeeded">Action(s) Needed</label>
          <input type="text" id="actionsNeeded" v-model="actionsNeeded" required>
        </div>
      </div>
      <div class="title-group">
          <label for="documentTitle">Document Title</label>
          <textarea id="documentTitle" v-model="documentTitle" rows="6" style="resize: none;" required></textarea>
        </div>
      <!-- Agency/Source and Received From/By -->
      <div class="form-row">
        <div class="form-group">
          <label for="agencySource">Agency/Source</label>
          <input type="text" id="agencySource" v-model="agencySource" required>
        </div>
        <div class="form-group">
          <label for="receivedBy">Received From/By: &nbsp;</label>
          <input type="text" id="receivedBy" v-model="receivedBy" required>
        </div>
      </div>
      <!-- Forward To and Forwarded Date -->
      <div class="form-row">
        <div class="form-group">
          <label for="forward">Forwarded To: &nbsp;</label>
          <input type="text" id="forward" v-model="forward" required>
        </div>
          <div class="form-group">
            <label for="fwdDate">Forwarded Date: &nbsp;</label>
            <input type="text" id="fwdDate" v-model="currentDate" readonly>
        </div>
      </div>
      <!-- Office: and In or Out: -->
      <div class="form-row">
        <div class="form-group">
          <label for="department">Office: &nbsp;</label>
          <select v-model="department" required>
            <option disabled value="">Select Department</option>
            <option value="Accounting">Accounting Office</option>
            <option value="Provincial">Provincial Office</option>
            <option value="Regional">Regional Office</option>
            <option value="RDoffice">RD Office</option>
          </select>
        </div>
        <div class="form-group">
          <label for="in_out">In or Out: &nbsp;</label>
          <select v-model="in_out" required>
            <option disabled value="">Select</option>
            <option value="Incoming">Incoming</option>
            <option value="Outgoing">Outgoing</option>
          </select>
        </div>
      </div>
      <!-- Submit Button -->
      <div class="buttons">
        <button type="submit">Submit</button>&nbsp;&nbsp;
        <button type="reset" @click="resetForm">Clear</button>
      </div>
    </form>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { supabase } from '../supabaseconfig.js';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const router = useRouter();

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
      router.push('/dashboard');

      Swal.fire({
        icon: 'success',
        title: 'Form Submitted Successfully!',
        showConfirmButton: false,
        timer: 1500
      });

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
  background-color: rgba(0, 0, 0, 0.5);
  /* Semi-transparent black */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  /* Ensure it appears above other content */
}

.tagging-form {
  position: relative;
  top: -100px;
  width: 60%;
  margin-left: 40%;
  margin: 0 auto;
}

/* Modal Dialog */
.modal-dialog {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 70%;
  /* Expand the width */
  max-height: 100vh;
  /* Set a maximum width */
  overflow-y: auto;
  /* Hide the overflow content */
}

/* Modal Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  /* Add a border between header and body */
  padding-bottom: 10px;
  /* Add some padding at the bottom */
  margin-bottom: 10px;
  /* Add some margin at the bottom */
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
  height: 300px;
  /* Adjust the height */
}

/* Form Group */
.form-group {
  margin-bottom: 1rem;
  width: 48%;
}

.form-row {
  display: flex;
  justify-content: space-between;
}

.label {
  display: inline-block;
  width: 20%;
}

/* Form Inputs */
input[type="text"],
textarea,
select {
  width: calc(100% - 10px);
  /* Adjust the width to accommodate the border */
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
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
  background-color: #FDD116;
}

/* Buttons Container */
.buttons {
  margin-top: 1rem;
  text-align: right;
  font-size: 20px;
}
</style>