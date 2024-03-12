<template>
  <div class="dashboard-container">
    <div class="HeaderComponent">
      <HeaderComponent />
    </div>

    <div class="main-wrapper" :class="{ 'sidebar-collapsed': !sidebarVisible }">

      <SidebarComponent :sidebar-visible="sidebarVisible" @toggle-sidebar="toggleSidebar" />

      <div class="main-content">
        <div class="dashboard-content" v-if="isLoggedIn">
          <div class="generate-filter-container">
            <div class="generate-report-button">
              <button class="generateReport" @click="generateReport">Generate Report&nbsp;
                <font-awesome-icon :icon="['fas', 'download']" />
              </button>
            </div>
            <div class="filter-container">
              <button class="filter-header" @click="toggleFilter">
                <span>Filter</span>
                <span v-if="isOpen" class="arrow">&#x25B2;</span>
                <span v-else class="arrow">&#x25BC;</span>
              </button>
              <div v-show="isOpen" class="filter-dropdown">
                <select v-model="selectedFilters" multiple @change="filterTable">
                  <option v-for="option in filterOptions" :key="option.value" :value="option.value">{{ option.label }}
                  </option>
                </select>
              </div>
              <div class="search-bar">
                <input type="text" v-model="searchQuery" placeholder="Search Document...">
              </div>
            </div>
            <table class="document-table">
              <thead>
                <tr>
                  <th>Document Code</th>
                  <th>Document Type</th>
                  <th>Document Title</th>
                  <th>Action Needed</th>
                  <th>Agency/Source</th>
                  <th>Received By/from</th>
                  <th>Date Received</th>
                  <th>Forwarded To:</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody v-if="!loading">
                <tr v-for="document in documentList" :key="document.id"
                  :class="{ 'edited-row': document.id === editedRowId, 'highlighted-row': document.id === deletedRowId }">
                  <td>{{ document.document_code }}</td>
                  <td>{{ document.document_type }}</td>
                  <td>{{ document.document_title }}</td>
                  <td>{{ document.actions }}</td>
                  <td>{{ document.agency }}</td>
                  <td>{{ document.received_from }}</td>
                  <td>{{ document.rcv_date }}</td>
                  <td>{{ document.fwd_to }}</td>
                  <td>{{ document.fwd_date }}</td>
                  <td>
                    <div :class="getStatusClass(document.status)">
                      {{ document.status }}
                    </div>
                  </td>
                  <td>
                    <font-awesome-icon :icon="['fas', 'edit']" @click="openEditModal(document)" class="action-icon" />

                    <font-awesome-icon :icon="['fas', 'trash-alt']" @click="confirmDelete(document)"
                      class="action-icon" />
                  </td>
                </tr>
              </tbody>
              <tbody v-if="loading">
                <tr>
                  <td colspan="10" class="loading-indicator-cell">
                    <div class="loading-indicator"></div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="pagination-container">
              <button @click="changePage('Previous')" :disabled="currentPage.value === 1">Previous</button>&nbsp;
              <button @click="changePage('Next')" :disabled="nextButtonDisabled">Next</button>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>

    <!-- Modal -->
    <div v-if="isEditModalOpen" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Edit Document</h2>
          <p>Document Code: {{ editedDocument.document_code }}</p>
          <p>Date Received: {{ editedDocument.rcv_date }}</p>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="form-row">
              <div class="form-group">
                <label for="documentType">Document Type:</label>
                <input type="text" id="documentType" v-model="editedDocument.document_type" required>
                </div>
                <div class="form-group">
                <label for="actionsNeeded">Actions Needed:</label>
                <input type="text" id="actionsNeeded" v-model="editedDocument.actions" required>
              </div>
            </div>
            <div class="title-group">
              <label for="documentTitle">Document Title:</label>
              <textarea id="documentTitle" v-model="editedDocument.document_title" row="6" style="resize: none;" required></textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="agencySource">Agency/Source:</label>
                <input type="text" id="agencySource" v-model="editedDocument.agency" required>
                </div>
                <div class="form-group">
                <label for="receivedBy">Received By/From:</label>
                <input type="text" id="receivedBy" v-model="editedDocument.received_from" required>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="forward">Forward To:</label>
                <input type="text" id="forward" v-model="editedDocument.fwd_to" required>
              </div>
              <div class="form-group">
                <label for="forward">Forward Date:</label>
                <input type="date" id="forward" v-model="editedDocument.fwd_date" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="department">Office:</label>
                <select id="department" v-model="editedDocument.office" required>
                  <option disabled value="">Select Department</option>
                  <option value="Accounting">Accounting Office</option>
                  <option value="Provincial">Provincial Office</option>
                  <option value="Regional">Regional Office</option>
                  <option value="RDoffice">RD Office</option>
                </select>
                </div>
                <div class="form-group">
                <label for="in_out">In/Out:</label>
                <select type="text" id="in_out" v-model="editedDocument.in_out" required>
                  <option value="In">Incoming</option>
                  <option value="Out">Outgoing</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="status">Status:</label>
              <select id="status" v-model="editedDocument.status" required>
                <option value="Received">Received</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div class="button-container">
              <button type="submit" class="modal-button">Save</button>
              <button class="close modal-button cancel-button" @click="closeEditModal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import HeaderComponent from '../components/dashboardcomp/HeaderComponent.vue';
import SidebarComponent from '../components/dashboardcomp/SidebarComponent.vue';
import FooterComponent from '../components/dashboardcomp/FooterComponent.vue';
import Swal from 'sweetalert2';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { supabase } from '../supabaseconfig.js';

const nextButtonDisabled = ref(false);
const sidebarVisible = ref(true);
const isLoggedIn = ref(true);
const documentList = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(10);

const deletedRowId = ref(null);
const editedRowId = ref(null);

function toggleSidebar() {
  sidebarVisible.value = !sidebarVisible.value;
}

async function confirmDelete(document) {
  const { value } = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  });

  if (value) {
    deleteDocument(document);
  }
}

async function fetchDocuments() {
  console.log('Fetching documents for page:', currentPage.value);
  loading.value = true;
  try {
    const { data, error } = await supabase
      .from('taggingForm')
      .select('*', { count: 'exact' })
      .range((currentPage.value - 1) * itemsPerPage.value, currentPage.value * itemsPerPage.value - 1);

    if (error) {
      console.error('Error fetching documents:', error.message);
    } else {
      documentList.value = data;

      if (data.length < itemsPerPage.value) {
        nextButtonDisabled.value = true;
      } else {

        nextButtonDisabled.value = false;
      }
    }
  } catch (error) {
    console.error('Error fetching documents:', error.message);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchDocuments();
});

function getStatusClass(status) {
  return {
    'status-capsule': true,
    'green': status === 'Received',
    'yellow': status === 'Pending'
  };
}

function changePage(direction) {
  if (direction === 'Previous') {
    currentPage.value = Math.max(1, currentPage.value - 1);
  } else if (direction === 'Next') {
    currentPage.value++;
  } else {
    console.error('Invalid direction:', direction);
  }

  fetchDocuments();
}

const isEditModalOpen = ref(false);
const editedDocument = ref(null);


function openEditModal(document) {
  isEditModalOpen.value = true;
  editedDocument.value = { ...document };
}

function closeEditModal() {
  isEditModalOpen.value = false;
  editedDocument.value = null;
}

function submitForm() {
  console.log('Form submitted with edited document:', editedDocument.value);

  // Call an async function to update the document in the database
  updateDocumentInDatabase(editedDocument.value);
}

async function updateDocumentInDatabase(document) {
  try {
    const { error } = await supabase
      .from('taggingForm')
      .update({
        document_code: document.document_code,
        document_type: document.document_type,
        document_title: document.document_title,
        actions: document.actions,
        received_from: document.received_from,
        agency: document.agency,
        fwd_to: document.fwd_to,
        fwd_date: document.fwd_date,
        office: document.office,
        in_out: document.in_out,
        status: document.status
      })
      .eq('id', document.id); // Assuming 'id' is the unique identifier for the document

    if (error) {
      console.error('Error updating document:', error.message);
      return;
    }

    const index = documentList.value.findIndex(doc => doc.id === document.id);
    if (index !== -1) {
      documentList.value.splice(index, 1, { ...document });
    }

    Swal.fire({
      icon: 'success',
      title: 'Edited successfully',
      showConfirmButton: false,
      timer: 1500
    });

    editedRowId.value = document.id;

    // Revert the highlight effect after 5 seconds
    setTimeout(() => {
      editedRowId.value = null;
    }, 1000);
    closeEditModal(); // Close the modal after successful update
  } catch (error) {
    console.error('Error updating document:', error.message);
  }
}

async function deleteDocument(document) {
  try {
    const { error } = await supabase
      .from('taggingForm')
      .delete()
      .eq('id', document.id);

    if (error) {
      console.error('Error deleting document:', error.message);
      return;
    }

    const index = documentList.value.findIndex(doc => doc.id === document.id);
    if (index !== -1) {
      documentList.value.splice(index, 1);
    }

    // Show "deleted successfully" alert
    Swal.fire({
      icon: 'success',
      title: 'Deleted successfully',
      showConfirmButton: false,
      timer: 1500
    });
  } catch (error) {
    console.error('Error deleting document:', error.message);
  }
}

const filterOptions = [
  { value: 'incoming', label: 'Incoming' },
  { value: 'outgoing', label: 'Outgoing' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'weekly', label: 'Weekly' }
];

const selectedFilters = ref([]);

// Flag to control the visibility of the filter dropdown
const isOpen = ref(false);

// Method to toggle the visibility of the filter dropdown
function toggleFilter() {
  isOpen.value = !isOpen.value;
}

// Method to handle filter change
// function filterTable() { ======>>> MC BUTANG DIRE ANG LOGIC SA FILTERING
//   // Logic to filter the table based on selectedFilters
// }


</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');

.edited-row {
  background-color: #ffffcc;
  /* You can adjust the background color as per your preference */
}

.highlighted-row {
  background-color: #ffffcc;
  /* Adjust the highlight color as per your preference */
}

.action-icon+.action-icon {
  margin-left: 0px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination-container button {
  background-color: #0038A7;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 7px 12px;
  cursor: pointer;
  margin-right: 5px;
}

.pagination-container button:hover {
  background-color: #001F5E;
}

.pagination-container button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button-container {
  display: flex;

  justify-content: center;
  margin-bottom: 20px;
}


.generate-report-cell {
  text-align: left;
}

.loading-indicator-cell {
  text-align: center;
}

.loading-indicator {

  border: 4px solid #0038A7;
  border-top: 4px solid #FFD700;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;

}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.dashboard-container {
  display: flex;
  flex-direction: column;
  position: relative;
  top: -80px;
  height: 100%;
  padding-bottom: 10px;
}

.main-content {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  padding: 15px;
  margin-top: 200px;
  transition: width 500ms;
}

.HeaderComponent {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
}

.main-wrapper {
  display: flex;
  flex: 1;
  position: relative;
  margin-left: 15%;
  width: 85%;
  transition: margin-left 500ms, width 500ms;
}

.dashboard-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
}


.main-wrapper.sidebar-collapsed {
  margin-left: 0;
  width: 100%;
}

.generate-filter-container {
  justify-content: flex-end;
  display: grid;
}

.generate-report-button,
.filter-container {
  margin-bottom: 5px;
}

.filter-header {
  background-color: #fdd116;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: left;
  width: 14%;
}

.filter-dropdown {
  display: flex;
  justify-content: space-between;
  align-items: left;
  margin-top: 5px;
  padding: 5px;
  font-size: 15px;
  color: #fff;
  border-radius: 5px;
}

.filter-dropdown select {
  width: 14%;
  padding: 5px;
  border: 1px solid #0038A7;
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  color: #0038A7;
}

.generateReport {
  justify-content: space-between;
  display: flex;
  align-items: left;
  background-color: #fdd116;
  font-size: 15px;
  color: #fff;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
}

.generateReport:hover {
  background-color: #fdd116;
  color: #0038A7;
  transition: 0.5s ease;
}

.search-bar input {
  font-size: 15px;
  padding: 5px;
  border-radius: 10px;
  border: 1px solid #0038A7;
  box-shadow: #0038A7 1px;
  color: #000;
}

.search-bar button {
  background-color: #0038A7;
  color: #fdfdfd;
  border: 1px solid #fff;
  box-shadow: #dddddd 1px;
  border-radius: 20px;
  padding: 5px;
  cursor: pointer;
  margin-left: 5px;
  font-size: 25px;
}

.document-table {
  width: 100%;
  max-width: 1500px;
  border-collapse: collapse;
  transition: width 500ms;
  margin: 5px auto 0;
  position: relative;
  border-radius: 5px;
}

.document-table th,
.document-table td {
  border: 1px solid #dddddd;
  padding: 5px;
  text-align: center;
  font-size: 12px;
}

.document-table th {
  background-color: #0038A7;
  color: #f2f2f2;
}

@media screen and (max-width: 768px) {
  .main-content {
    padding: 15px 10px;
    margin-top: 100px;
  }
}

@media screen and (max-width: 576px) {
  .main-wrapper {
    flex-direction: column;
  }

  .generateReport {
    margin-left: 0;
    margin-top: 10px;
  }

  .filter-container {
    flex-direction: column;
  }

  .generate-report-button {
    margin-top: 10px;
  }
}

.status-capsule {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
}

.green {
  background-color: green;
  color: white;
}

.yellow {
  background-color: yellow;
  color: black;
}

.action-icon {
  cursor: pointer;
  color: #0038A7;
  font-size: 20px;
  padding: 5px;
}

/* Modal Container */
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 15px;
  border: 1px solid #888;
  width: 80%; /* Adjust width as needed */
  margin-left:17%;
  height: -100vh;
}

/* Modal Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px; /* Increase margin bottom */
}

.modal-header h2 {
  margin: 0;
}

/* Modal Body */
.modal-body {
  padding: 10px;
}

.modal-body label {
  display: block;
  margin-bottom: 10px;
}

.modal-body input,
.modal-body textarea,
.modal-body select {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: 'Poppins', sans-serif;
  font-size: 12px; /* Match font size with other form fields */
}

/* Modal Footer */
.button-container {
  display: flex;
  justify-content: center;
}

.modal-body button {
  background-color: #0038A7;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px; /* Adjust padding */
  cursor: pointer;
  margin-right: 10px; /* Add margin right */
}

.modal-body button:hover {
  background-color: #001F5E;
}

.cancel-button {
  background-color: #ccc;
  color: #fff;
}

/* Form Group */
.form-group {
  margin-bottom: 1rem;
  width: 48%;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

/* Add this CSS to match the styling of other form fields */

.modal-body select {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  appearance: none;
  /* Remove default appearance */
  background-color: #fff;
  /* Set background color */
  cursor: pointer;
  /* Show pointer cursor on hover */
}

/* Style for the dropdown arrow */
.modal-body select::after {
  content: '\25BC';
  /* Unicode character for downward arrow */
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  /* Ensure the arrow doesn't interfere with clicking the select */
}

/* Style for the selected option */
.modal-body select option:checked {
  background-color: #0038A7;
  /* Set background color for selected option */
  color: #fff;
  /* Set text color for selected option */
}

/* Hover effect for options */
.modal-body select option:hover {
  background-color: #001F5E;
  /* Set background color on hover */
}
</style>