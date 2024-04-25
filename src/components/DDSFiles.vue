<template>
    <div class="dds-container">
        <HeaderComponent />
        <div class="main-wrapper" :class="{ 'sidebar-collapsed': !sidebarVisible }">
            <SidebarComponent :sidebar-visible="sidebarVisible" @toggle-sidebar="toggleSidebar" />
            <div class="main-content">
                <div class="dds-content">
                    <h1>Davao del Sur Provincial Office Files</h1>
                    <table class="dds-files">
                        <thead>
                            <tr>
                                <th>Document Code</th>
                                <th>Document Type</th>
                                <th>Document Title</th>
                                <th>Action Needed</th>
                                <th>Agency/Source</th>
                                <th>Received From/By</th>
                                <th>Received Date</th>
                                <th>Forwarded To</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <FooterComponent />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import HeaderComponent from '../components/dashboardcomp/HeaderComponent.vue';
import SidebarComponent from '../components/dashboardcomp/SidebarComponent.vue';
import FooterComponent from '../components/dashboardcomp/FooterComponent.vue';
import '@fortawesome/fontawesome-free/js/all.js';
const sidebarVisible = ref(true);
</script>

<style scoped>
.dds-content {
    margin-top: 150px;
    display: flex;
    flex-direction: column;
    position: relative;
    top: -80px;
    height: 100%;
    padding-bottom: 10px;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: flex-start;
    padding: 15px;
    margin-top: 200px;
    display: flex;
    flex: 1;
    position: relative;
    margin-left: 15%;
    width: 85%;
    transition: margin-left 500ms, width 500ms;
}

.dds-files {
    width: 100%;
    max-width: 1500px;
    border-collapse: collapse;
    transition: width 500ms;
    margin: 5px auto 0;
    position: relative;
    border-radius: 5px;
}

.dds-files th {
    background-color: #0038A7; /* separate once there is content */
    color: #f2f2f2;             /* separate once there is content */
    font-size: 12px;
    border: 1px solid #dddddd;
  padding: 5px;
  text-align: center;
}
</style>
