<template>
    <form @submit.prevent="registerUser">
        <div>
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" />
        </div>
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" />
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" />
        </div>

        <button type="submit">Register</button>
    </form>
</template>

<script>
import { ref } from 'vue'

export default {
    setup() {
        const username = ref('')
        const email = ref('')
        const password = ref('')

        const registerUser = () => {
            // Placeholder for now - you'll add validation later
            console.log('User Data:', username.value, email.value, password.value)
        }

        return { username, email, password, registerUser }
    }
}
</script>


