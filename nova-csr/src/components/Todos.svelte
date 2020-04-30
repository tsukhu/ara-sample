
<style>
.container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding-left: 10px;
  padding-right: 10px;
  color: #333;
  height: 90vh;
  margin-top: 5vh;
  margin-bottom: 5vh;
  overflow-y: auto;
}

.app-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 80px;
  opacity: 0.5;
}

svg {
  width: 64px;
  height: 64px;
}

.todo-list {
  list-style: none;
  margin-bottom: 20px;
}

.todo-item {
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.todo-item span {
  flex-grow: 1;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 22px;
}

.done span {
  text-decoration: line-through;
}

input[type="checkbox"] {
  display: none;
}

.tick {
  width: 30px;
  height: 30px;
  border: 3px solid #333;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.tick::before {
  content: '✓';
  font-size: 20px;
  display: none;
}

.done .tick::before {
  display: inline;
}

.delete-todo {
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
}

.delete-todo svg {
  width: 30px;
  height: 30px;
  pointer-events: none;
}

form {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 3px solid #333;
}

.empty-state {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: none;
}

.checklist-icon {
  margin-bottom: 20px;
}

.empty-state__title, .empty-state__description {
  margin-bottom: 20px;
}

.todo-list:empty {
  display: none;
}

.todo-list:empty + .empty-state {
  display: flex;
}
</style>
<script>
  import { afterUpdate } from 'svelte';
  afterUpdate(() => {
    document.querySelector('.js-todo-input').focus();
  });
  let todoItems = [];
  let newTodo = '';
  function addTodo() {
    newTodo = newTodo.trim();
    if (!newTodo) return;
    const todo = {
      text: newTodo,
      checked: false,
      id: Date.now(),
    };
    todoItems = [...todoItems, todo];
    newTodo = '';
  }
  function toggleDone(id) {
    const index = todoItems.findIndex(item => item.id === Number(id));
    todoItems[index].checked = !todoItems[index].checked;
  }
  function deleteTodo(id) {
    todoItems = todoItems.filter(item => item.id !== Number(id));
  }
</script>

<main>
  <div class="container">
    <h1 class="app-title">todos</h1>
    <ul class="todo-list">
      {#each todoItems as todo (todo.id)}
        <li class="todo-item {todo.checked ? 'done' : ''}">
          <input id={todo.id} type="checkbox" />
          <label for={todo.id} class="tick" on:click={() => toggleDone(todo.id)}></label>
          <span>{todo.text}</span>
          <button class="delete-todo" on:click={() => deleteTodo(todo.id)}>
            <svg><use href="#delete-icon"></use></svg>
          </button>
        </li>
      {/each}
    </ul>
    <div class="empty-state">
      <svg class="checklist-icon"><use href="#checklist-icon"></use></svg>
      <h2 class="empty-state__title">Add your first todo</h2>
      <p class="empty-state__description">What do you want to get done today?</p>
    </div>
    <form on:submit|preventDefault={addTodo}>
      <input class="js-todo-input" type="text" aria-label="Enter a new todo item" placeholder="E.g. Build a web app" bind:value={newTodo}>
    </form>
  </div>
</main>