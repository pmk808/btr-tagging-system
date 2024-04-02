<template>
  <div class="reports-container">
    <HeaderComponent />
    <SidebarComponent :sidebar-visible="sidebarVisible" @toggle-sidebar="toggleSidebar" />
    <div class="main-content">
      <div class="reports-content">
        <div class="charts-container">
          <div class="bar-chart-container">
            <div class="chart-container">
              <h2>Regional Bar Chart</h2>
              <canvas ref="regionalBarChartCanvas" width="500" height="250"></canvas>
            </div>
            <div class="chart-container">
              <h2>Provincial Bar Chart</h2>
              <canvas ref="provincialBarChartCanvas" width="500" height="250"></canvas>
            </div>
          </div>
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          <div class="chart-container pie-chart-container">
            <h2>Pie Chart</h2>
            <canvas ref="pieChartCanvas" width="450" height="300"></canvas>
            <div class="pie-chart-labels" v-if="piePercentages">
              <div v-for="(percentage, label) in piePercentages" :key="label">{{ label }}: {{ percentage }}%</div>
            </div>
          </div>
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
const regionalBarChartCanvas = ref(null);
const provincialBarChartCanvas = ref(null);
const pieChartCanvas = ref(null);
const piePercentages = ref(null);


function toggleSidebar() {
  sidebarVisible.value = !sidebarVisible.value;
}

const chartData = ref({
  regionalBarChartData: {
    labels: [],
    datasets: [{
      label: 'Regional Transaction Counts',
      data: [],
      backgroundColor: []
    }]
  },
  provincialBarChartData: {
    labels: [],
    datasets: [{
      label: 'Provincial Transaction Counts',
      data: [],
      backgroundColor: []
    }]
  },
  pieChartData: {
    labels: ['Incoming', 'Outgoing'],
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
  const { data, error } = await supabase
    .from('taggingForm')
    .select('office');

  if (error) {
    console.error('Error fetching data:', error.message);
    return;
  }

  const regionalOfficeCounts = {};
  const provincialOfficeCounts = {};
  let othersCount = 0;

  data.forEach(item => {
    const office = item.office;
    if (office.startsWith('R')) {
      // Remove 'R' prefix for display
      let formattedOffice = office.replace(/^R/, '');
      // Check if the office name is exactly 'Doffice' (for 'RDoffice')
      if (formattedOffice === 'Doffice') {
        formattedOffice = 'RD Office'; // Keep it as 'RDoffice'
      } else {
        // Capitalize the first letter
        formattedOffice = formattedOffice.charAt(0).toUpperCase() + formattedOffice.slice(1);
      }
      regionalOfficeCounts[formattedOffice] = (regionalOfficeCounts[formattedOffice] || 0) + 1;
    } else if (office.startsWith('P')) {
      // Remove 'P' prefix for display
      let formattedOffice = office.replace(/^P/, '');
      if (formattedOffice === 'dds') {
        formattedOffice = 'Davao del Sur';
      }
      // Capitalize the first letter
      formattedOffice = formattedOffice.charAt(0).toUpperCase() + formattedOffice.slice(1);
      provincialOfficeCounts[formattedOffice] = (provincialOfficeCounts[formattedOffice] || 0) + 1;
    } else {
      othersCount++;
    }
  });

  // Extract regional office names and counts for bar chart data
  chartData.value.regionalBarChartData.labels = Object.keys(regionalOfficeCounts);
  chartData.value.regionalBarChartData.datasets[0].data = Object.values(regionalOfficeCounts);

  // Extract provincial office names and counts for bar chart data
  chartData.value.provincialBarChartData.labels = Object.keys(provincialOfficeCounts);
  chartData.value.provincialBarChartData.datasets[0].data = Object.values(provincialOfficeCounts);

  // Include 'others' count in regional bar chart
  if (othersCount > 0) {
    chartData.value.regionalBarChartData.labels.push('Other Agencies');
    chartData.value.regionalBarChartData.datasets[0].data.push(othersCount);
  }

  chartData.value.regionalBarChartData.labels = chartData.value.regionalBarChartData.labels.map(label => {
    return label.charAt(0).toUpperCase() + label.slice(1);
  });
  chartData.value.provincialBarChartData.labels = chartData.value.provincialBarChartData.labels.map(label => {
    return label.charAt(0).toUpperCase() + label.slice(1);
  });

  // Generate random colors for regional bar chart
  const regionalRandomColors = Array.from({ length: chartData.value.regionalBarChartData.labels.length }, () => getRandomColor());
  chartData.value.regionalBarChartData.datasets[0].backgroundColor = regionalRandomColors;

  // Generate random colors for provincial bar chart
  const provincialRandomColors = Array.from({ length: chartData.value.provincialBarChartData.labels.length }, () => getRandomColor());
  chartData.value.provincialBarChartData.datasets[0].backgroundColor = provincialRandomColors;

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

  // Generate random colors for pie chart
  chartData.value.pieChartData.datasets[0].backgroundColor = [getRandomColor(), getRandomColor()];
}

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function logPercentages(pieChart) {
  const data = pieChart.data.datasets[0].data;
  const total = data.reduce((acc, val) => acc + val, 0);
  const percentages = {};

  data.forEach((value, index) => {
    const percentage = ((value / total) * 100).toFixed(2);
    const label = pieChart.data.labels[index];
    percentages[label] = percentage;
  });

  piePercentages.value = percentages;
}

function createCharts() {
  // Destroy existing chart instances
  if (regionalBarChartCanvas.value) {
    const regionalBarCtx = regionalBarChartCanvas.value.getContext('2d');
    if (regionalBarCtx.chart) {
      regionalBarCtx.chart.destroy();
    }
  }

  if (provincialBarChartCanvas.value) {
    const provincialBarCtx = provincialBarChartCanvas.value.getContext('2d');
    if (provincialBarCtx.chart) {
      provincialBarCtx.chart.destroy();
    }
  }

  if (pieChartCanvas.value) {
    const pieCtx = pieChartCanvas.value.getContext('2d');
    if (pieCtx.chart) {
      pieCtx.chart.destroy();
    }
  }

  // Create and update regional bar chart
  if (regionalBarChartCanvas.value) {
    const regionalBarCtx = regionalBarChartCanvas.value.getContext('2d');
    new Chart(regionalBarCtx, {
      type: 'bar',
      data: chartData.value.regionalBarChartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Regional Transaction Counts' // Label for y-axis
            },
            ticks: {
              stepSize: 1, // Display whole numbers only
              precision: 0 // Remove decimal points
            }
          }
        },
        plugins: {
          legend: {
            display: false // Hide legend
          }
        }
      }
    });
  }

  // Create and update provincial bar chart
  if (provincialBarChartCanvas.value) {
    const provincialBarCtx = provincialBarChartCanvas.value.getContext('2d');
    new Chart(provincialBarCtx, {
      type: 'bar',
      data: chartData.value.provincialBarChartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Provincial Transaction Counts' // Label for y-axis
            },
            ticks: {
              stepSize: 1, // Display whole numbers only
              precision: 0 // Remove decimal points
            }
          }
        },
        plugins: {
          legend: {
            display: false // Hide legend
          }
        }
      }
    });
  }

  // Create and update pie chart
  if (pieChartCanvas.value) {
    const pieCtx = pieChartCanvas.value.getContext('2d');
    const pieChart = new Chart(pieCtx, {
      type: 'pie',
      data: chartData.value.pieChartData,
      options: {
        plugins: {
          legend: {
            display: true, // Show legend
            position: 'top'
          },
        }
      }
    });

    logPercentages(pieChart);
  }
}
</script>

<style scoped>
.reports-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.main-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  width: 100%;
}

.reports-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-gap: 20px;
}


.charts-container {
  display: flex;
  flex-direction: row;
  margin-top: 80px;
  margin-left: 100px;
}

.bar-chart-container {
  display: flex;
  flex-direction: column;
  /* Arrange bar charts vertically */
}

.chart-container {
  text-align: center;
  margin-top: 10px;
  /* Adjust margin for spacing */
}

.canvas-container {
  width: 500;
  /* Adjust width to fit two bar charts */
}

.pie-chart-labels {
  margin-top: 10px;
}
</style>
