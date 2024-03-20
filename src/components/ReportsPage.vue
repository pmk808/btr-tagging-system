<template>
  <div class="reports-container">
    <HeaderComponent />
    <SidebarComponent :sidebar-visible="sidebarVisible" @toggle-sidebar="toggleSidebar" />
    <div class="main-content">
      <div class="reports-content">
        <div class="chart-container">
          <h2>Bar Chart</h2>
          <canvas ref="barChartCanvas" width="600" height="300"></canvas>
        </div>&nbsp;
        <div class="chart-container">
          <h2>Pie Chart</h2>
          <canvas ref="pieChartCanvas" width="300" height="300"></canvas>
        </div>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script setup>
import HeaderComponent from '../components/dashboardcomp/HeaderComponent.vue';
import SidebarComponent from '../components/dashboardcomp/SidebarComponent.vue';
import FooterComponent from '../components/dashboardcomp/FooterComponent.vue';
import { Chart, registerables } from 'chart.js';
import { ref, onMounted } from 'vue';
import { supabase } from '../supabaseconfig.js';

Chart.register(...registerables);

const sidebarVisible = ref(true);
const barChartCanvas = ref(null);
const pieChartCanvas = ref(null);

function toggleSidebar() {
  sidebarVisible.value = !sidebarVisible.value;
}

const chartData = ref({
  barChartData: {
    labels: [],
    datasets: [{
      label: 'Transaction Counts',
      data: [],
      backgroundColor: [] // Changed to an empty array
    }]
  },
  pieChartData: {
    labels: ['Incoming', 'Outgoing'], // Set default labels
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  }
});

onMounted(async () => {
  await fetchData();
  createCharts();
});

async function fetchData() {
  // Fetch data for bar chart
  const { data: barData, error: barError } = await supabase
    .from('taggingForm')
    .select('office');

  if (barError) {
    console.error('Error fetching bar chart data:', barError.message);
    return;
  }

  const officeCounts = {};

  // Count occurrences of each office
  barData.forEach(item => {
    const office = item.office;
    officeCounts[office] = (officeCounts[office] || 0) + 1;
  });

  // Extract office names and counts for bar chart data
  chartData.value.barChartData.labels = Object.keys(officeCounts);
  chartData.value.barChartData.datasets[0].data = Object.values(officeCounts);

  // Generate random colors for each bar
  const randomColors = Array.from({ length: chartData.value.barChartData.labels.length }, () => getRandomColor());
  chartData.value.barChartData.datasets[0].backgroundColor = randomColors;

  // Fetch data for pie chart
  const { data: pieData, error: pieError } = await supabase
    .from('taggingForm')
    .select('in_out');

  if (pieError) {
    console.error('Error fetching pie chart data:', pieError.message);
    return;
  }

  const incomingCount = pieData.filter(item => item.in_out === 'Incoming').length;
  const outgoingCount = pieData.filter(item => item.in_out === 'Outgoing').length;

  // Update pie chart data
  chartData.value.pieChartData.datasets[0].data = [incomingCount, outgoingCount];
  chartData.value.pieChartData.labels = ['Incoming', 'Outgoing']; // Set labels based on data

  // Generate random colors for pie chart
  chartData.value.pieChartData.datasets[0].backgroundColor = [getRandomColor(), getRandomColor()];
}

function getRandomColor() {
  // Generate a random hexadecimal color code
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function createCharts() {
  // Create and update bar chart
  if (barChartCanvas.value) {
    const ctx = barChartCanvas.value.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: chartData.value.barChartData,
      options: {
        // Chart.js options for customization
      }
    });
  }

  // Create and update pie chart
  if (pieChartCanvas.value) {
    const ctx = pieChartCanvas.value.getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: chartData.value.pieChartData,
      options: {
        // Chart.js options for customization
      }
    });
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');

.reports-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%; /* Allow full width if needed */
}

.main-content {
  display: flex;
  flex: 1;
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Center content vertically */
  padding: 15px;
  width: 100%; /* Allow full width if needed */
}

.reports-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
}

.chart-container {
  text-align: center; /* Center content horizontally */
  margin-top: 100px; /* Add margin to the top */
}
</style>
