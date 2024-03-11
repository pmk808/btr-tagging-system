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
    <input type="text" v-model="searchQuery" placeholder="Search...">
    <button @click="searchDocuments"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>
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
              </tr>
            </thead>
            <tbody v-if="!loading">
              <tr v-for="document in documentList" :key="document.code">
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
      <FooterComponent />
    </div>
  </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import HeaderComponent from '../components/dashboardcomp/HeaderComponent.vue';
import SidebarComponent from '../components/dashboardcomp/SidebarComponent.vue';
import FooterComponent from '../components/dashboardcomp/FooterComponent.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { supabase } from '../supabaseconfig.js';

const nextButtonDisabled = ref(false);
const sidebarVisible = ref(true);
const isLoggedIn = ref(true);
const documentList = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(10);

function toggleSidebar() {
  sidebarVisible.value = !sidebarVisible.value;
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

      // Check if it's the last page
      if (data.length < itemsPerPage.value) {
        // Assuming you have a way to manage the disabled state of your "Next" button, e.g., a ref called 'nextButtonDisabled'
        nextButtonDisabled.value = true;
      } else {
        // Re-enable "Next" button in case it was previously disabled
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

function changePage(direction) { // Consider changing the parameter name to 'direction'
  if (direction === 'Previous') {
    currentPage.value = Math.max(1, currentPage.value - 1); // Prevent going below page 1
  } else if (direction === 'Next') {
    currentPage.value++;
  } else {
    console.error('Invalid direction:', direction);
  }

  fetchDocuments();
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
  justify-content: flex-end !important;
  margin-bottom: 10px;
}

.generate-report-cell {
  text-align: left;
}

.loading-indicator-cell {
  text-align: center;
}

.loading-indicator {
  border: 4px solid #0038A7;
  /* Blue border */
  border-top: 4px solid #FFD700;
  /* Yellow border on top */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  /* Animation for spinning */
}

/* Animation for spinning */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* Dashboard Container */
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
</style>