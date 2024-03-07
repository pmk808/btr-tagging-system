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
import { ref, onMounted } from 'vue';
import { supabase } from '../supabaseconfig.js';


const documentList = ref([]);

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