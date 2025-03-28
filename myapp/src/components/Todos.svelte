<script lang="ts">
    let todos = [];
    let currentView = 'all';
    let completedTodos = [];
    import Todo from "./Todo.svelte";
    import AddTodo from "./AddTodo.svelte";
    
    $: filteredTodos = todos.filter(todo => {
        if (currentView === 'active') return !todo.completed;
        if (currentView === 'completed') return todo.completed;
        return true; // 'all' view
    });
    async function clearCompleted(){
        try{
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8000/api/todo', {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ids: todos.filter(todo => todo.completed).map(todo => todo._id)
                })
            }); 
            fetchTodos();
        }catch(err){
            console.log(err)
        }
    }
    async function fetchTodos() {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8000/api/todo', {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            todos = data.todos;
            completedTodos = data.completedTodos;
        } catch(err) {
            console.log("error fetching todos", err);
        }
    }

    function handleTodoAdded() {
        fetchTodos(); // Refresh the list when a todo is added
    }
    
    function setView(view) {
        currentView = view;
    }
    
    fetchTodos();
</script>

<AddTodo on:todoAdded={handleTodoAdded} />

<div class="list">
    <ul class="todos">
        {#each filteredTodos as todo }
            <Todo {todo}/>
        {/each}
    </ul>

    <div class="footer">
        <p>{todos.filter(todo => !todo.completed).length} items left</p>
        <div class="footer_center">
            <button 
                class:active={currentView === 'all'} 
                on:click={() => setView('all')}
            >All</button>
            <button 
                class:active={currentView === 'active'} 
                on:click={() => setView('active')}
            >Active</button>
            <button 
                class:active={currentView === 'completed'} 
                on:click={() => setView('completed')}
            >Completed</button>
        </div>
        <button  class="clear_completed"
            disabled={!todos.some(todo => todo.completed)} 
            on:click={clearCompleted}
        >Clear Completed</button>
    </div>
</div>

<style>
    .clear_completed{
        background-color: #7278ee;
        padding : 5px 3px;
        color :white;
        border-radius: 5px;
    }
    .list {
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
        padding: 10px;
        max-width: 60%;
        margin-left: auto;
        margin-right: auto;
        border-radius: 5px;
    }
    .todos {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-top: 1px solid #e6e6e6;
        font-size: 14px;
        color: #777;
    }

    .footer_center {
        display: flex;
        gap: 8px;
    }

    .footer_center button {
        border: 1px solid transparent;
        background: transparent;
        padding: 5px 10px;
        border-radius: 3px;
        cursor: pointer;
        color: #777;
        transition: all 0.2s ease;
    }

    .footer_center button:hover {
        border-color: var(--color-bg);
        color: var(--color-bg);
    }

    .footer_center button.active {
        background-color: #7278ee;  /* Using the theme color */
        color: white;
        border-color: var(--color-bg);
        padding: 5px 10px;
    }

    p {
        margin: 0;
        cursor: pointer;
    }

    p:hover {
        text-decoration: underline;
    }
</style>
