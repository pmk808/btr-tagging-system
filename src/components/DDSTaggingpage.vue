<template>
  <div class="dds-container">
    <HeaderComponent />
    <div class="main-wrapper" :class="{ 'sidebar-collapsed': !sidebarVisible }">
      <SidebarComponent :sidebar-visible="sidebarVisible" @toggle-sidebar="toggleSidebar" />
      <div class="main-content">
        <div class="dds-content">
          <div class="button-container">
            <button class="generate-report-button" @click="generatePDF">
              Generate PDF&nbsp;<font-awesome-icon :icon="['fas', 'download']" />
            </button>
            <input type="text" v-model="searchQuery" placeholder="Search..." class="search-input" />
            <button class="open-modal-button" @click="openModal">New Entry</button>
          </div>
          <div class="table-container">
            <table class="document-table">
              <thead>
                <tr>
                  <th>Document Type</th>
                  <th>Document Title</th>
                  <th>Forwarded To</th>
                  <th>Forwarded Date</th>
                  <th>Office</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="document in paginatedDocuments" :key="document.id">
                  <td>{{ document.document_type }}</td>
                  <td>{{ document.document_title }}</td>
                  <td>{{ document.fwd_to }}</td>
                  <td>{{ document.fwd_date }}</td>
                  <td>{{ document.office }}</td>
                </tr>
                <tr v-if="!paginatedDocuments.length">
                  <td colspan="5" class="no-results">No results found</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pagination-container">
            <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
            <span>Page {{ currentPage }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
    <div class="modal" v-if="isModalOpen">
      <div class="modal-content">
        <div class="ddstagging-form">
          <div class="form-row">
            <h2>Document Tagging Form</h2>
            <div class="header-info">
              <p class="current-date">Date: {{ currentDate }}</p>
            </div>
          </div>
          <form @submit.prevent="submitForm">
            <div class="form-row">
              <div class="form-group">
                <label for="documentType">Document Type</label>
                <input type="text" id="documentType" v-model="documentType" required>
              </div>
            </div>
            <div class="title-group">
              <label for="documentTitle">Document Title</label>
              <textarea id="documentTitle" v-model="documentTitle" rows="6" style="resize: none;" required></textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="forward">Forwarded To: &nbsp;</label>
                <input type="text" id="forward" v-model="fwdTo" required>
              </div>
              <div class="form-group">
                <label for="fwdDate">Forwarded Date: &nbsp;</label>
                <input type="date" id="fwdDate" v-model="fwdDate" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="department">Office: &nbsp;</label>
                <select v-model="office" required>
                  <option disabled value="">Select Department</option>
                  <option value="Raccounting">Admin - Accounting</option>
                  <option value="Ragbs">Admin - AGBs</option>
                  <option value="Rbudget">Admin - Budget</option>
                  <option value="Rcashier">Admin - Cashier</option>
                  <option value="Rcentral">Admin - Central</option>
                  <option value="Roperations">Admin - Operations</option>
                  <option value="RDoffice">RD/Staff Office</option>
                </select>
              </div>
            </div>
            <div class="buttons">
              <button type="submit" :disabled="isLoading">
                {{ isLoading ? 'Processing...' : 'Submit' }}
              </button>&nbsp;
              <button type="reset" @click="resetForm">Clear</button>
            </div>
          </form>
        </div>
        <button @click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import HeaderComponent from '../components/dashboardcomp/HeaderComponent.vue';
import SidebarComponent from '../components/dashboardcomp/SidebarComponent.vue';
import FooterComponent from '../components/dashboardcomp/FooterComponent.vue';
import '@fortawesome/fontawesome-free/js/all.js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { supabase } from '../supabaseconfig.js';

const sidebarVisible = ref(true);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(5);

const documents = ref([]);

const fetchDocuments = async () => {
  let { data, error } = await supabase
    .from('dds_outgoing')
    .select('*');
  
  if (error) {
    console.error(error);
  } else {
    documents.value = data;
  }
};

onMounted(fetchDocuments);

const filteredDocuments = computed(() => {
  return documents.value.filter(document =>
    document.document_title?.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const paginatedDocuments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredDocuments.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredDocuments.value.length / itemsPerPage.value);
});

function toggleSidebar() {
  sidebarVisible.value = !sidebarVisible.value;
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

const isModalOpen = ref(false);

function openModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

function generatePDF() {
  const doc = new jsPDF({
    orientation: 'landscape'
  });

  doc.text('Document Report', 10, 10);

  const columns = [
    'Document Type',
    'Document Title',
    'Forwarded To',
    'Forwarded Date',
    'Office'
  ];

  const data = paginatedDocuments.value.map(document => [
    document.document_type,
    document.document_title,
    document.fwd_to,
    document.fwd_date,
    document.office
  ]);

  doc.autoTable({
    head: [columns],
    body: data,
    headStyles: {
      fillColor: [0, 56, 167],
      textColor: [255, 255, 255]
    }
  });

  doc.save('dds_report.pdf');
}

const currentDate = ref(new Date().toLocaleDateString());
const documentType = ref('');
const documentTitle = ref('');
const fwdTo = ref('');
const fwdDate = ref(currentDate.value);
const office = ref('');
const isLoading = ref(false);

const submitForm = async () => {
  isLoading.value = true;
  
  const { error } = await supabase
    .from('dds_outgoing')
    .insert([
      {
        document_type: documentType.value,
        document_title: documentTitle.value,
        fwd_to: fwdTo.value,
        fwd_date: fwdDate.value,
        office: office.value
      }
    ]);

  if (error) {
    console.error(error);
  } else {
    fetchDocuments();
    resetForm();
    closeModal();
  }
  
  isLoading.value = false;
};

function resetForm() {
  documentType.value = '';
  documentTitle.value = '';
  fwdTo.value = '';
  fwdDate.value = currentDate.value;
  office.value = '';
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');

.dds-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.main-content {
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 15px;
  margin-top: 100px;
}

.dds-content {
  display: flex;
  flex-direction: column;
  width: 85%;
}

.table-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.document-table {
  width: 100%;
  max-width: 1250px;
  border-collapse: collapse;
  margin: 0;
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

.document-table .pending {
  background-color: yellow;
  color: black;
  font-weight: bold;
}

.document-table .forwarded {
  background-color: green;
  color: white;
  font-weight: bold;
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
  margin-left: 5px;
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
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 20px;
}

.generate-report-button {
  display: flex;
  align-items: center;
  background-color: #fdd116;
  font-size: 15px;
  color: #0038A7;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
}

.generate-report-button:hover {
  background-color: #ffd700;
  color: #0038A7;
  transition: 0.5s ease;
}

.search-input {
  font-size: 15px;
  padding: 5px;
  border-radius: 10px;
  border: 1px solid #0038A7;
  color: #000;
}

.no-results {
  text-align: center;
}

.status-capsule {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

.status-capsule.green {
  background-color: green;
  color: white;
}

.status-capsule.yellow {
  background-color: yellow;
  color: black;
}

.status-capsule.orange {
  background-color: orange;
  color: white;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  /* Ensure the modal has a high z-index */
  overflow: hidden;
  /* Prevent overflow in the modal container */
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 90vh;
  /* Limit the height of the modal content */
  overflow-y: auto;
  /* Enable vertical scrolling */
  width: 80%;
  /* Increase the modal width */
  max-width: 800px;
  /* Set a max-width for the modal */
}

.ddstagging-form {
  max-width: 600px;
  margin: 0 auto;
}

.ddstagging-form .form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.ddstagging-form .form-group {
  flex: 1;
  margin-right: 10px;
}

.ddstagging-form .form-group:last-child {
  margin-right: 0;
}

.ddstagging-form label {
  font-weight: bold;
  margin-bottom: 5px;
}

.ddstagging-form input,
.ddstagging-form textarea,
.ddstagging-form select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.ddstagging-form .buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.ddstagging-form .buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #0038A7;
  color: #fff;
  cursor: pointer;
}

.ddstagging-form .buttons button[disabled] {
  background-color: #ccc;
  cursor: not-allowed;
}

.ddstagging-form .buttons button:hover:not([disabled]) {
  background-color: #001F5E;
}
</style>
