<template>
     <!-- Footer -->
     <div class="footer">
            <span><font-awesome-icon :icon="['far', 'copyright']" /> 2024 Coded by Brylle and Mcphy</span>
        </div>
</template>

<script>
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import '@fortawesome/fontawesome-free/js/all.js';
export default {
    components: {
        FontAwesomeIcon
    }
}
</script>

<style scoped>
/* Footer Styles */
.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #0038A7;
    color: #fff;
    text-align: center;
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
}
</style>