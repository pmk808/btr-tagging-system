<template>
    <div class="dashboard-container">
        <!-- Header -->
        <div class="header">
            <h1>Document Status Tagging System</h1>
            <p>Manage your documents efficiently</p>
        </div>

        <!-- Sidebar -->
        <div class="sidebar">
            <h3>Sidebar</h3>
            <ul>
                <li><router-link to="/dashboard">Dashboard</router-link></li>
                <li><router-link to="/profile">Tagging</router-link></li>
                <li><router-link to="/settings">Reports</router-link></li>
            </ul>
            <ul>
                <li><router-link to="/">Logout</router-link></li>
            </ul>
        </div>

        <!-- Main Content -->
        <div class="main-content">
            <!-- Dashboard Content -->
            <div class="dashboard-content">
                <!-- Placeholders for Dashboard Widgets -->
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>&copy; 2024 Your Company</p>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'DashboardPage'
};
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
/* Dashboard Container */
.dashboard-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

/* Header Styles */
.header {
    color: #0038A7;
    padding: 20px;
    box-shadow: 0 2px 0 0 #0038A7;
    margin-bottom: 20px;
    background: linear-gradient(rgba(253, 211, 22, 0.767), rgba(253, 211, 22, 0.363)), url('../assets/btr-hq2.jpg') no-repeat;
    background-size: cover;
    background-position: center;
    font-family: 'Poppins', sans-serif;
}

.header h1 {
    font-size: 40px;
    margin-bottom: 10px;
}

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

.widget {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.widget h2 {
    margin-bottom: 15px;
}

/* Footer Styles */
.footer {
    background-color: #0038A7;
    color: #fff;
    text-align: center;
    font-family: 'Poppins', sans-serif;
}
</style>
  