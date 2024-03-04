<template>
    <!-- Sidebar -->
    <div class="sidebar">
            <h3>Sidebar</h3>
            <ul>
                <li><router-link to="/dashboard">Dashboard</router-link></li>
                <li><router-link to="/tagging">Tagging</router-link></li>
                <li><router-link to="/reports">Reports</router-link></li>
            </ul>
            <ul>
                <li><router-link to="/">Logout</router-link></li>
            </ul>
        </div>
</template>

<style scoped>
/* Sidebar Styles */
.sidebar {
    width: 20%;
    height: 100%;
    color: #0038A7;
    padding: 20px;
    border-right: 1px solid #000000;
    box-shadow: 2px 0 0 #0038A7;
    font-family: 'Poppins', sans-serif;
}

.sidebar h3 {
    margin-bottom: 50px;
}

.sidebar ul {
    list-style-type: none;
    margin-bottom: 20px;
    padding: 0;
}

.sidebar ul li {
    margin-bottom: 20px;
    font-size: 20px;
}

.sidebar ul li a {
    color: #0038A7;
    text-decoration: none;
}

.sidebar ul li a:hover {
    text-decoration: underline;
}
</style>