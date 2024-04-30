<template>
    <div class="dds-container">
        <HeaderComponent />
        <div class="main-wrapper" :class="{ 'sidebar-collapsed': !sidebarVisible }">
            <SidebarComponent :sidebar-visible="sidebarVisible" @toggle-sidebar="toggleSidebar" />
            <div class="main-content">
                <div class="dds-content">

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
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="document in paginatedDocuments" :key="document.id">
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
                                <td>{{ document.status }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="pagination">
                        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
                        <span>Page {{ currentPage }}</span>
                        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
                    </div>

                </div>
            </div>
            <FooterComponent />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { supabase } from '../supabaseconfig.js';
import HeaderComponent from '../components/dashboardcomp/HeaderComponent.vue';
import SidebarComponent from '../components/dashboardcomp/SidebarComponent.vue';
import FooterComponent from '../components/dashboardcomp/FooterComponent.vue';
import '@fortawesome/fontawesome-free/js/all.js';

const sidebarVisible = ref(true);
const documents = ref([]);
const currentPage = ref(1);
const pageSize = 10; // Number of items per page

const fetchDocuments = async () => {
    const { data, error } = await supabase.from('taggingForm').select('*').eq('office', 'Pdds');
    if (error) {
        console.error('Error fetching documents:', error.message);
    } else {
        documents.value = data || [];
    }
};

// Fetch documents when the component is mounted
onMounted(() => {
    fetchDocuments();
});

// Computed property to filter documents with 'Pdds' value in the 'office' column
const filteredDocuments = computed(() => {
    return documents.value.filter(document => document.office === 'Pdds');
});


// Computed property to paginate the filtered documents
const paginatedDocuments = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredDocuments.value.slice(startIndex, endIndex);
});

// Computed property to calculate the total number of pages
const totalPages = computed(() => {
    return Math.ceil(filteredDocuments.value.length / pageSize);
});

// Method to navigate to the previous page
const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

// Method to navigate to the next page
const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};
</script>

<style scoped>
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

.main-content {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  padding: 15px;
  margin-top: 100px; /* Adjust the margin-top value to move the table down */
}

@media screen and (max-width: 768px) {
    .main-content {
        padding: 15px 10px;
        margin-top: 200px;
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

</style>
