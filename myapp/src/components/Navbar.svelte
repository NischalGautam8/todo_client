<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    
    let username: string = '';
    
    const signOut = () => {
        localStorage.removeItem('token');
        goto('/login');
    }
    
    onMount(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Decode JWT token to get username
            const payload = JSON.parse(atob(token.split('.')[1]));
            username = payload.username;
        }
    });
</script>

<div class="container">
    <h2>Todo<span class="app">App</span></h2>
    <div class="user-section">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
        <span class="username">{username}</span>
        <button class="signout-btn" on:click={signOut}>
            <svg class="signout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
        </button>
    </div>
</div>

<style>
    .container {
        background: white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin: 0;
        padding: 0.3rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .user-section {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .icon {
        width: 24px;
        height: 24px;
        color: #666;
    }

    .username {
        font-size: 1rem;
        color: #333;
        font-weight: 500;
    }
    
    .app {
        color: #7278ee;
    }

    .signout-btn {
        background: none;
        border: none;
        padding: 0.25rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        border-radius: 4px;
        transition: background-color 0.2s;
    }

    .signout-btn:hover {
        background-color: #f0f0f0;
    }

    .signout-icon {
        width: 20px;
        height: 20px;
        color: #666;
    }
</style>
