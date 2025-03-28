<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    
    let todoInput = '';
    let isLoading = false;
    let error = null;

    async function handleSubmit() {
        if (!todoInput.trim()) return;
        
        isLoading = true;
        error = null;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:8000/api/todo", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    description: todoInput.trim(),
                    completed: false,
                    priority: 0,
                    tags: []
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            todoInput = ''; // Clear input on success
            dispatch('todoAdded'); // Emit event to refresh todo list
            
        } catch (err) {
            console.error("Error adding todo:", err);
            error = "Failed to add todo. Please try again.";
        } finally {
            isLoading = false;
        }
    }
</script>

<div class="input-container">
    <input 
        placeholder="What needs to be done?" 
        type="text" 
        class="input-field"
        bind:value={todoInput}
        on:keydown={(e) => e.key === 'Enter' && !isLoading && handleSubmit()}
        disabled={isLoading}
    >
    <button 
        class="add-button"
        on:click={handleSubmit}
        disabled={isLoading}
    >
        {#if isLoading}
            Adding...
        {:else}
            Add
        {/if}
    </button>
</div>

{#if error}
    <div class="error-message">
        {error}
    </div>
{/if}

<style>
    .input-container {
        background: white;
        padding: 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin: 2rem auto;
        max-width: 600px;
        display: flex;
        gap: 1rem;  
    }

    .input-field {
        flex: 1;
        padding: 0.8rem 1rem;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 1rem;
        transition: all 0.3s ease;
        outline: none;
    }

    .input-field:focus {
        border-color: #7278ee;
        box-shadow: 0 0 0 3px rgba(114, 120, 238, 0.2);
    }

    .input-field::placeholder {
        color: #9ca3af;
    }

    .input-field:disabled {
        background-color: #f3f4f6;
        cursor: not-allowed;
    }

    .add-button {
        background-color: #7278ee;
        color: white;
        padding: 0.8rem 1.5rem;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        min-width: 100px;
    }

    .add-button:hover:not(:disabled) {
        background-color: #5c62cc;
        transform: translateY(-1px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .add-button:active:not(:disabled) {
        transform: translateY(0);
        box-shadow: none;
    }

    .add-button:disabled {
        background-color: #9ca3af;
        cursor: not-allowed;
    }

    .error-message {
        color: #dc2626;
        text-align: center;
        margin-top: 0.5rem;
        font-size: 0.875rem;
    }
</style>
