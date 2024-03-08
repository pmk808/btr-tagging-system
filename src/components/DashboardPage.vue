<template>
  <div class="dashboard-container">
    <div class="HeaderComponent">
      <HeaderComponent />
    </div>
    <div class="main-wrapper" :class="{ 'sidebar-collapsed': !sidebarVisible }">
      <SidebarComponent :sidebar-visible="sidebarVisible" @toggle-sidebar="toggleSidebar" />
      <div class="main-content">
        <div class="dashboard-content" v-if="isLoggedIn">
          <table class="document-table">
            <thead>
              <tr>
                <th colspan="15">
                  <button class="generateReport" @click="generateReport">Generate Report&nbsp;
                    <font-awesome-icon :icon="['fas', 'download']" /></button>
                </th>
              </tr>
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
            <tbody>
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
                <td>{{ document.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <FooterComponent />
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

const sidebarVisible = ref(true);
const isLoggedIn = ref(true);
const documentList = ref([]);

function toggleSidebar() {
  sidebarVisible.value = !sidebarVisible.value;
}

async function fetchDocuments() {
  const { data, error } = await supabase.from('taggingForm').select('*');
  if (error) {
    console.error('Error fetching documents:', error.message);
  } else {
    documentList.value = data;
  }
}

onMounted(() => {
  fetchDocuments();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');

/* Dashboard Container */
.dashboard-container {
  display: flex;
  flex-direction: column;
  position: relative;
  top: -100px;
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
  margin-left: 20%;
  width: 80% ;
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

.generateReport {
  background-color: #fdd116;
  font-size: 15px;
  color: #fff;
  border-radius: 5px;
  padding: 5px;
  margin-left: auto;
}

.generateReport:hover {
  background-color: #fdd116;
  color: #0038A7;
  transition: 0.5s ease;
}

.document-table {
  width: 100%;
  max-width: 1250px;
  border-collapse: collapse;
  transition: width 500ms;
  margin: 0 auto;
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
}
</style>