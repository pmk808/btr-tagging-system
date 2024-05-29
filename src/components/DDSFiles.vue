<template>
    <div class="dds-container">
        <HeaderComponent />
        <div class="main-wrapper" :class="{ 'sidebar-collapsed': !sidebarVisible }">
            <SidebarComponent :sidebar-visible="sidebarVisible" @toggle-sidebar="toggleSidebar" />
            <div class="main-content">
                <div class="dds-content">
                    <div class="button-container">
                        <button class="generate-report-button" @click="generatePDF">Generate PDF&nbsp;<font-awesome-icon
                                :icon="['fas', 'download']" /></button>
                        <input type="text" v-model="searchQuery" placeholder="Search..." class="search-input" />
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
                                <th>In/Out</th>
                                <th>Status</th>
                                <th>Select Recipient</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="document in paginatedDocuments" :key="document.id">
                                {{ console.log(document) }}
                                <td>{{ document.document_code }}</td>
                                <td>{{ document.document_type }}</td>
                                <td>{{ document.document_title }}</td>
                                <td>{{ document.actions }}</td>
                                <td>{{ document.agency }}</td>
                                <td>{{ document.received_from }}</td>
                                <td>{{ document.rcv_date }}</td>
                                <td>{{ document.fwd_to }}</td>
                                <td>{{ document.fwd_date }}</td>
                                <td>{{ document.in_out }}</td>
                                <td>
                                    <div :class="getStatusClass(document.status)">
                                        {{ document.status }}
                                    </div>
                                </td>
                                <td>
                                    <select v-model="document.select_recipient" @change="updateRecipient(document)">
                                        <option value="Ma'am Gab">Ma'am Gab</option>
                                        <option value="Sir Jones">Sir Jones</option>
                                        <option value="Ma'am Susan">Ma'am Susan</option>
                                        <option value="Sir Pong">Sir Pong</option>
                                        <option value="Ma'am Cora">Ma'am Cora</option>
                                    </select>
                                </td>
                            </tr>
                            <tr v-if="!paginatedDocuments.length">
                                <td colspan="12" class="no-results">No results found</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="pagination-container">
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const sidebarVisible = ref(true);
const documents = ref([]);
const currentPage = ref(1);
const pageSize = 10; // Number of items per page
const searchQuery = ref('');

const fetchDocuments = async () => {
    const { data, error } = await supabase.from('taggingForm').select('*').eq('office', 'Pdds');
    if (error) {
        console.error('Error fetching documents:', error.message);
    } else {
        documents.value = data || [];
    }
};

const updateRecipient = async (document) => {
    try {
        const { data, error } = await supabase.from('taggingForm').update({ select_recipient: document.select_recipient }).eq('id', document.id);
        if (error) {
            throw new Error(error.message);
        }
        console.log('Recipient updated successfully:', data);
    } catch (error) {
        console.error('Error updating recipient:', error.message);
    }
};

// Fetch documents when the component is mounted
onMounted(() => {
    fetchDocuments();
});

// Computed property to filter documents with 'Pdds' value in the 'office' column
const filteredDocuments = computed(() => {
    return documents.value.filter(document => document.office === 'Pdds' && (
        (document.document_code && document.document_code.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
        (document.document_type && document.document_type.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
        (document.document_title && document.document_title.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
        (document.agency && document.agency.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
        (document.actions && document.actions.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
        (document.received_from && document.received_from.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
        (document.select_recipient && document.select_recipient.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
        (document.fwd_to && document.fwd_to.toLowerCase().includes(searchQuery.value.toLowerCase()))
    ));
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
    } else if (in_out === 'Internal') {
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

const generatePDF = () => {
    // Create a new jsPDF instance with landscape orientation
    const doc = new jsPDF({
        orientation: 'landscape'
    });

    // Add a title to the PDF
    doc.text('Document Report', 10, 10);

    // Define columns for the table
    const columns = [
        'Document Code',
        'Document Type',
        'Document Title',
        'Action Needed',
        'Agency/Source',
        'Received From/By',
        'Date Received',
        'Forwarded To',
        'Date',
        'In/Out',
        'Status',
        'Select Recipient'
    ];

    // Extract data from paginatedDocuments
    const data = paginatedDocuments.value.map(document => [
        document.document_code,
        document.document_type,
        document.document_title,
        document.actions,
        document.agency,
        document.received_from,
        document.rcv_date,
        document.fwd_to,
        document.fwd_date,
        document.in_out,
        document.status,
        document.select_recipient
    ]);

    // Add autoTable plugin to jsPDF with blue header color
    doc.autoTable({
        head: [columns],
        body: data,
        headStyles: {
            fillColor: [0, 56, 167], // Blue color
            textColor: [255, 255, 255] // White text color
        }
    });

    // Save the PDF
    doc.save('dds_report.pdf');
};

</script>

<style scoped>
.dds-content {
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    padding-bottom: 10px;
    flex: 1;
    justify-content: center;
    width: 85%;
    margin-left: 15%;
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

.document-table td select {
    border: 1px solid #dddddd;
    padding: 5px;
    text-align: center;
    font-size: 12px;
    background-color: #0038A7;
    color: #f2f2f2;
    border-radius: 10px;
    font-weight: 300;
    cursor: pointer;
    /* Optional: Add cursor pointer */
    width: 100%;
    /* Optional: Set width */
}

.main-content {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: flex-start;
    padding: 15px;
    margin-top: 100px;
    /* Adjust the margin-top value to move the table down */
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
    justify-content: flex-start;
    /* Align buttons to the left */
    margin-bottom: 20px;
    margin-top: 20px;
}

.generate-report-button {
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

.generate-report-button:hover {
    background-color: #ffd700;
    color: #0038a7;
}

.generate-report-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.status-capsule {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
}

/* Define styles for different status colors */
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
    color: white;
}

.search-input {
    margin: 0 auto;
    font-size: 15px;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid #0038A7;
    box-shadow: #0038A7 1px;
    color: #000;
}

.no-results {
    text-align: center;
    /* Center the message */
}
</style>
