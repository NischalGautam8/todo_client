<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    
    interface TodoItem {
        _id: string;
        description: string;
        completed: boolean;
        priority: number;
        tags: string[];
    }
    
    export let todo: TodoItem;
    
    const dispatch = createEventDispatcher();
    
    async function toggleCompleted() {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8000/api/todo/${todo._id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    description: todo.description,
                    priority: todo.priority,
                    tags: todo.tags,
                    completed: !todo.completed
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update todo');
            }
            
            todo.completed = !todo.completed;
        } catch (err) {
            console.error("Error updating todo:", err);
        }
    }
</script>

<div class="container">
    <input on:change={toggleCompleted} type="checkbox" checked={todo.completed} class="checkbox"/>
    <div class="text-container">
        <p class="description">{todo.description}</p>
    </div>
</div>

<style>
    .container {
        display: flex;
        gap: 12px;
        align-items: flex-start;
        background: white;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 0.5rem;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .container:hover {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transform: translateY(-1px);
    }

    .text-container {
        flex: 1;
        padding-top: 2px;
    }

    .description {
        margin: 0;
        font-size: 1rem;
        color: var(--color-gray-28);
        line-height: 1.5;
        font-weight: 400;
        word-break: break-word;
        transition: color 0.2s ease;
        text-align: left;
    }

    .checkbox {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border: 2px solid #ccc;
        border-radius: 50%;
        outline: none;
        cursor: pointer;
        position: relative;
        transition: all 0.2s ease;
        flex-shrink: 0;
    }

    .checkbox:checked {
        background-color: #5cb85c;
        border-color: #5cb85c;
    }

    .checkbox:checked::after {
        content: "✓";
        position: absolute;
        color: rgb(252, 252, 252);
        font-size: 14px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .checkbox:hover {
        border-color: #5cb85c;
    }

    /* Style for completed todos */
    .checkbox:checked + .text-container .description {
        text-decoration: line-through;
        color: var(--color-gray-58);
    }
</style>
