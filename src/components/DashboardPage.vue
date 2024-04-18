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
              <button class="generateReport" @click="generateReport()">Generate PDF&nbsp;
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
                <input type="text" v-model="searchQuery" placeholder="Search...">
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
                  <th>Received From/By</th>
                  <th>Date Received</th>
                  <th>Forwarded To:</th>
                  <th>Date</th>
                  <th>Office</th>
                  <th>In/Out</th>
                  <th>Status</th>
                  <template v-if="isAdmin">
                    <th>Edit</th>
                  </template>
                </tr>
              </thead>
              <tbody v-if="!loading">

                <template v-if="documentList.length > 0">
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
                    <td>{{ document.office }}</td>
                    <td>{{ document.in_out }}</td>
                    <td>
                      <div :class="getStatusClass(document.status, document.in_out)">
                        {{ document.status }}
                      </div>
                    </td>
                    <template v-if="isAdmin">
                      <td>
                        <font-awesome-icon :icon="['fas', 'edit']" @click="openEditModal(document)"
                          class="action-icon" />
                        <font-awesome-icon :icon="['fas', 'trash-alt']" @click="confirmDelete(document)"
                          class="action-icon" />
                      </td>
                    </template>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="11" class="no-data-found">No data found</td>
                  </tr>
                </template>
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
        <h3>{{ editedDocument.in_out }} Document</h3>
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
              <textarea id="documentTitle" v-model="editedDocument.document_title" row="6" style="resize: none;"
                required></textarea>
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
                <input type="date" id="forward" v-model="editedDocument.fwd_date" @change="updateStatus" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="department">Office:</label>
                <select id="department" v-model="editedDocument.office" required>
                  <option disabled value="">Select Department</option>
                  <option value="Raccounting">Admin - Accounting</option>
                  <optiion value="Ragbs">Admin - AGBs</optiion>
                  <option value="Rbudget">Admin - Budget</option>
                  <option value="Rcashier">Admin - Cashier</option>
                  <option value="Rcentral">Admin - Central</option>
                  <option value="Roperations">Admin - Operations</option>
                  <option value="RDoffice">RD/Staff Office</option>
                  <option value="Pdds">Provincial - DDS</option>
                  <option value="Pmati">Provincial - Mati</option>
                  <option value="Ptagum">Provincial - Tagum</option>
                  <option value="others">Other Agency</option>
                </select>
              </div>
              <div class="form-group">
                <label for="status">Status:</label>
                <select id="status" v-model="editedDocument.status" required>
                  <template v-if="editedDocument.in_out === 'Incoming'">
                    <option value="Forwarded">Forwarded</option>
                    <option value="Pending">Pending</option>
                    <option value="Returned">Returned</option>
                  </template>
                  <template v-else-if="editedDocument.in_out === 'Outgoing'">
                    <option value="Released">Released</option>
                    <option value="Pending">Pending</option>
                    <option value="Returned">Returned</option>
                  </template>
                  <template v-else>
                    <!-- Default options -->
                    <option value="">Select Status</option>
                  </template>
                </select>
              </div>
              <div class="form-group"></div>
              <div v-if="editedDocument.status === 'Returned'" class="form-group">
                <label for="note">Note:</label>
                <input type="text" id="note" v-model="editedDocument.note" required>
              </div>
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
import { ref, onMounted, watch } from 'vue';
import HeaderComponent from '../components/dashboardcomp/HeaderComponent.vue';
import SidebarComponent from '../components/dashboardcomp/SidebarComponent.vue';
import FooterComponent from '../components/dashboardcomp/FooterComponent.vue';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { supabase } from '../supabaseconfig.js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const nextButtonDisabled = ref(false);
const sidebarVisible = ref(true);
const isLoggedIn = ref(true);
const documentList = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const searchQuery = ref('');
const isAdmin = ref(false);
const deletedRowId = ref(null);
const editedRowId = ref(null);

function toggleSidebar() {
  sidebarVisible.value = !sidebarVisible.value;
}

watch(searchQuery, () => {
  fetchDocuments();
});



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
  loading.value = true;
  try {
    let query = supabase.from('taggingForm').select('*').order('created_at', { ascending: false });

    // Apply filters if any selected
    if (selectedFilters.value.length > 0 && !selectedFilters.value.includes('')) {
      query = query.in('in_out', selectedFilters.value);
    }

    // Apply search query if present
    if (searchQuery.value) {
      query = query.or(`document_code.ilike.%${searchQuery.value}%,document_type.ilike.%${searchQuery.value}%,document_title.ilike.%${searchQuery.value}%,actions.ilike.%${searchQuery.value}%,received_from.ilike.%${searchQuery.value}%,agency.ilike.%${searchQuery.value}%,fwd_to.ilike.%${searchQuery.value}%,office.ilike.%${searchQuery.value}%,in_out.ilike.%${searchQuery.value}%,status.ilike.%${searchQuery.value}%`);
    }

    // Pagination
    query = query.range((currentPage.value - 1) * itemsPerPage.value, currentPage.value * itemsPerPage.value - 1);

    const { data, error } = await query;

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

async function generateReport() {
  loading.value = true; // Set loading to true while fetching data
  try {
    const doc = new jsPDF('landscape'); // Specify landscape orientation

    // Fetch all data from the taggingForm table
    const { data, error } = await supabase.from('taggingForm').select('*').order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching documents for report:', error.message);
      return;
    }

    if (!data || data.length === 0) {
      console.error('No data available for report.');
      return;
    }

    // Define custom column headers
    const headers = [
      'Document Code',
      'Document Type',
      'Document Title',
      'Action Needed',
      'Agency/Source',
      'Office',
      'Received By/from',
      'Date Received',
      'Forwarded To:',
      'Date',
    ];

    // Function to add table to PDF
    const addTable = (dataArray, title, isFirstTable) => {
      if (dataArray.length > 0) {
        if (!isFirstTable) {
          // Add a new page
          doc.addPage('landscape');
        }

        // Add bold title for the section
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text(title, 14, 10); // Adjust the position as needed

        // Reset font style
        doc.setFont('helvetica', 'normal');

        // Add the table
        doc.autoTable({
          startY: 20, // Start after the title
          head: [headers],
          body: dataArray.map(doc => [
            doc.document_code,
            doc.document_type,
            doc.document_title,
            doc.actions,
            doc.agency,
            doc.office,
            doc.received_from,
            doc.rcv_date,
            doc.fwd_to,
            doc.fwd_date,
          ]),
          columnStyles: {
            0: { columnWidth: 'auto' },
            1: { columnWidth: 'auto' },
            2: { columnWidth: 'auto' },
            3: { columnWidth: 25 },
            4: { columnWidth: 25 },
            5: { columnWidth: 'auto' },
            6: { columnWidth: 25 },
            7: { columnWidth: 'auto' },
            8: { columnWidth: 25 },
            9: { columnWidth: 'auto' },
          },
          theme: 'grid',
          styles: {
            font: 'Arial',
            fontSize: 10,
            fontStyle: 'bold',
            cellPadding: 3,
            overflow: 'linebreak',
            halign: 'center',
          },
          headStyles: {
            fillColor: [0, 56, 167],
            textColor: [255, 255, 255],
          },
        });
      }
    };

    // Group data by section titles
    const groupedData = {};
    data.forEach(doc => {
      const sectionTitle = getSectionTitle(doc);
      if (!groupedData[sectionTitle]) {
        groupedData[sectionTitle] = [];
      }
      groupedData[sectionTitle].push(doc);
    });

    // Add tables for each section
    let isFirstTable = true;
    for (const title in groupedData) {
      addTable(groupedData[title], title, isFirstTable);
      isFirstTable = false;
    }

    // Save the PDF
    doc.save('document_report.pdf');
  } catch (error) {
    console.error('Error generating report:', error.message);
  } finally {
    loading.value = false; // Reset loading after fetching data or encountering an error
  }
}

// Helper function to get section title based on doc.office
function getSectionTitle(doc) {
  switch (true) {
    case doc.office === 'RDoffice':
      return `Regional Director - ${doc.in_out === 'Incoming' ? 'Incoming' : 'Outgoing'}`;
    case doc.office.startsWith('R'):
      return `Regional - ${doc.in_out === 'Incoming' ? 'Incoming' : 'Outgoing'}`;
    case doc.office.startsWith('P'):
      return `Provincial - ${doc.in_out === 'Incoming' ? 'Incoming' : 'Outgoing'}`;
    case doc.office === 'others':
      return `Regional - ${doc.in_out === 'Incoming' ? 'Incoming' : 'Outgoing'}`;
    default:
      return `Regional - ${doc.in_out === 'Incoming' ? 'Incoming' : 'Outgoing'}`;
  }
}


function getStatusClass(status, in_out) {
  if (in_out === 'Incoming') {
    return {
      'status-capsule': true,
      'green': status === 'Forwarded',
      'yellow': status === 'Pending',
      'orange': status === 'Returned'
    };
  } else if (in_out === 'Outgoing') {
    return {
      'status-capsule': true,
      'green': status === 'Released',
      'yellow': status === 'Pending',
      'orange': status === 'Returned'
    };
  } else {
    return {
      'status-capsule': true,
      'green': status === 'Forwarded',
      'yellow': status === 'Pending',
      'orange': status === 'Returned'
    };
  }
}

function updateStatus() {
  // Check if the selected date is not empty
  if (editedDocument.value.fwd_date) {
    // Update the status based on the selected date
    if (editedDocument.value.in_out === 'Incoming') {
      // Update the status to 'Forwarded' if the document is incoming
      editedDocument.value.status = 'Forwarded';
    } else if (editedDocument.value.in_out === 'Outgoing') {
      // Update the status to 'Released' if the document is outgoing
      editedDocument.value.status = 'Released';
    } else {
      // Handle other cases if necessary
    }
  }
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
    if (document.status !== 'Returned') {
      // If status is not 'Returned', set note to null
      document.note = null;
    }
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
        status: document.status,
        note: document.note
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
  { value: 'Incoming', label: 'Incoming' },
  { value: 'Outgoing', label: 'Outgoing' },
  { value: '', label: 'All' },
];

const selectedFilters = ref([]);

// Flag to control the visibility of the filter dropdown
const isOpen = ref(false);

// Method to toggle the visibility of the filter dropdown
function toggleFilter() {
  isOpen.value = !isOpen.value;
}

function filterTable() {
  // Call fetchDocuments() after updating selectedFilters
  fetchDocuments();
}

const fetchUserData = async () => {
  // Fetch token from localStorage
  const token = localStorage.getItem('sb-yszwlktldjrohxuneyop-auth-token');

  // Function to extract the email from the access token
  const extractEmailFromToken = (token) => {
    try {
      // Parse the token as JSON
      const tokenData = JSON.parse(token);
      // Extract the email from the user object
      const email = tokenData?.user?.email;
      return email;
    } catch (error) {
      console.error('Error extracting email from token:', error.message);
      return null;
    }
  };

  const email = extractEmailFromToken(token);

  if (email) {
    try {
      // Fetch user data from your database based on the email
      const { userData, dbError } = await fetchUserDataFromDatabase(email);
      if (dbError) {
        throw dbError;
      }

      // Check if user is admin
      isAdmin.value = userData?.isAdmin ?? false;
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  } else {
    console.error('Email is missing from token.');
  }
};

const fetchUserDataFromDatabase = async (email) => {
  try {
    // Make a request to Supabase to fetch user data based on the email
    const { data: userData, error } = await supabase
      .from('users')
      .select('isAdmin')
      .eq('email', email)
      .single();

    if (error) {
      throw error;
    }

    return { userData };
  } catch (error) {
    console.error('Error fetching user data from database:', error.message);
    return { dbError: error };
  }
};

// Fetch user data when the component is mounted
onMounted(fetchUserData);
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


.main-wrapper.sidebar-collapsed .main-content {
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

.orange {
  background-color: orange;
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
  width: 80%;
  /* Adjust width as needed */
  margin-left: 17%;
  height: -100vh;
}

/* Modal Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  /* Increase margin bottom */
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
  font-size: 12px;
  /* Match font size with other form fields */
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
  padding: 8px 16px;
  /* Adjust padding */
  cursor: pointer;
  margin-right: 10px;
  /* Add margin right */
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