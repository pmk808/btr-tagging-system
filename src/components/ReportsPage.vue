<template>
    <div class="reports-container">
        <HeaderComponent />
        <SidebarComponent :sidebar-visible="sidebarVisible" @toggle-sidebar="toggleSidebar" />
        <!-- Main Content -->
        <div class="main-content">
            <!-- Tagging Content -->
            <div class="reports-content">
                <!-- Placeholders for Tagging Widgets -->
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
    name: 'ReportsPage',
    components: {
        HeaderComponent,
        SidebarComponent,
        FooterComponent
    }, data () {
        return {
            sidebarVisible: true
        };
    },
    methods: {
        toggleSidebar() {
            this.sidebarVisible = !this.sidebarVisible;
        }
    }
};
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');

/* Dashboard Container */
.reports-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

/* Main Content Styles */
.main-content {
    display: flex;
    flex: 1;
    padding: 15px;
    
}

/* Reports Content Styles */
.reports-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
}
</style>