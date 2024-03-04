<template>
    <div class="dashboard-container">
        <HeaderComponent />
        <SidebarComponent />
        <!-- Main Content -->
        <div class="main-content">
            <!-- Dashboard Content -->
            <div class="dashboard-content">
                <!-- Placeholders for Dashboard Widgets -->
            </div>
        </div>

        <FooterComponent />
    </div>
</template>
  
<script>
import HeaderComponent from '../components/dashboardcomp/HeaderComponent.vue';
import SidebarComponent from '../components/dashboardcomp/SidebarComponent.vue';
import FooterComponent from '../components/dashboardcomp/FooterComponent.vue';

export default {
    name: 'DashboardPage',
    components: {
        HeaderComponent,
        SidebarComponent,
        FooterComponent
    }
};
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');

/* Dashboard Container */
.dashboard-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

/* Main Content Styles */
.main-content {
    display: flex;
    flex: 1;
    padding: 20px;
}

/* Dashboard Content Styles */
.dashboard-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
}
</style>