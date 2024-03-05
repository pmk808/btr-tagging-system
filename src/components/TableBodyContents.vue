<template>
    <tbody class="document-table">
            <tr v-for="document in documentList" :key="document.code">
              <td>{{ document.code }}</td>
              <td>{{ document.type }}</td>
              <td>{{ document.title }}</td>
              <td>{{ document.action }}</td>
              <td>{{ document.agency }}</td>
              <td>{{ document.receivedFrom }}</td>
              <td>{{ document.dateReceived }}</td>
              <td>{{ document.forwardedTo }}</td>
              <td>{{ document.date }}</td>
              <td>{{ document.status }}</td>
            </tr>
          </tbody>
</template>

<script setup>
import { ref } from 'vue';

const documentList = ref([
  {
    code: 'BTrXI-R2024-03-001',
    type: 'Policy',
    title: 'Policy Document',
    action: 'Review',
    agency: 'HR Department',
    receivedFrom: 'John Doe',
    dateReceived: '2024-03-15',
    forwardedTo: 'Manager',
    date: '2024-03-16',
    status: 'Pending'
  },
  {
    code: 'BTrXI-R2024-03-002',
    type: 'Invoice',
    title: 'Invoice Document',
    action: 'Approve',
    agency: 'Finance Department',
    receivedFrom: 'Jane Doe',
    dateReceived: '2024-03-15',
    forwardedTo: 'Accountant',
    date: '2024-03-16',
    status: 'Approved'
  },
  {
    code: 'BTrXI-R2024-03-003',
    type: 'Report',
    title: 'Report Document',
    action: 'Review',
    agency: 'Marketing Department',
    receivedFrom: 'John Smith',
    dateReceived: '2024-03-15',
    forwardedTo: 'Manager',
    date: '2024-03-16',
    status: 'Pending'
  },
  {
    code: 'BTrXI-R2024-03-004',
    type: 'Memo',
    title: 'Memo Document',
    action: 'Approve',
    agency: 'HR Department',
    receivedFrom: 'Jane Smith',
    dateReceived: '2024-03-15',
    forwardedTo: 'Manager',
    date: '2024-03-16',
    status: 'Approved'
  },
  {
    code: 'BTrXI-R2024-03-005',
    type: 'Policy',
    title: 'Policy Document',
    action: 'Review',
    agency: 'HR Department',
    receivedFrom: 'John Doe',
    dateReceived: '2024-03-15',
    forwardedTo: 'Manager',
    date: '2024-03-16',
    status: 'Pending'
  }
]);
</script>

<style scoped>
.document-table tr:nth-child(even) {
  background-color: #cac9c9;;
}

.document-table tr:hover {
  background-color: #dbdbdb;
}

.document-table tr {
  font-size: 13px;
}
</style>