<script lang="ts">
    import { goto } from '$app/navigation';
    
    let username: string = '';
    let password: string = '';
    let confirmPassword: string = '';
    let error: string | null = null;

    async function handleSignup() {
        try {
            // Basic validation
            if (password !== confirmPassword) {
                error = "Passwords do not match";
                return;
            }

            if (password.length < 6) {
                error = "Password must be at least 6 characters long";
                return;
            }

            const response = await fetch('http://localhost:8000/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // Redirect to login page after successful registration
            goto('/login');
        } catch (err) {
            error = err instanceof Error ? err.message : 'Registration failed';
        }
    }

    function handleLoginClick() {
        goto('/login');
    }
</script>

<div class="wrapper">
    <div class="container">
        <form on:submit|preventDefault={handleSignup}>
            <h2>Create Account</h2>
            
            {#if error}
                <div class="error">{error}</div>
            {/if}
            
            <div class="form-group">
                <label for="username">Username</label>
                <input 
                    type="text" 
                    id="username"
                    bind:value={username}
                    required
                />
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input 
                    type="password" 
                    id="password"
                    bind:value={password}
                    required
                />
            </div>

            <div class="form-group">
                <label for="confirm-password">Confirm Password</label>
                <input 
                    type="password" 
                    id="confirm-password"
                    bind:value={confirmPassword}
                    required
                />
            </div>

            <button type="submit">Sign Up</button>

            <div class="login-link">
                Already have an account? 
                <button type="button" class="link-button" on:click={handleLoginClick}>
                    Login here
                </button>
            </div>
        </form>
    </div>
</div>

<style>
    .wrapper {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f5f5f5;
    }

    .container {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    h2 {
        text-align: center;
        margin: 0 0 1.5rem 0;
        color: #333;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    label {
        color: #555;
        font-size: 0.9rem;
    }

    input {
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
    }

    input:focus {
        outline: none;
        border-color: var(--color-bg);
        box-shadow: 0 0 0 2px rgba(var(--color-bg-rgb), 0.1);
    }

    button {
        background-color: #7278ee;
        color: white;
        padding: 0.75rem;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    button:hover {
        background-color: #9297f8;
    }

    .error {
        background-color: #fff2f2;
        color: #d63031;
        padding: 0.75rem;
        border-radius: 4px;
        font-size: 0.9rem;
        text-align: center;
    }

    .login-link {
        text-align: center;
        font-size: 0.9rem;
        color: #666;
    }

    .link-button {
        background: none;
        border: none;
        color: var(--color-bg);
        padding: 0;
        font: inherit;
        cursor: pointer;
        text-decoration: underline;
    }

    .link-button:hover {
        color: var(--color-bg-dark);
        background: none;
    }
</style>