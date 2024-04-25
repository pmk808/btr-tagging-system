<template>
    <div class="dds-container">
        <HeaderComponent />
        <div class="main-wrapper" :class="{ 'sidebar-collapsed': !sidebarVisible }">
            <SidebarComponent :sidebar-visible="sidebarVisible" @toggle-sidebar="toggleSidebar" />
            <div class="main-content">
                <div class="dds-content">
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


