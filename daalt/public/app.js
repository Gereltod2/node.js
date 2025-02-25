const form = document.getElementById('todo-form');
const input = document.getElementById('todo-title');
const todoList = document.getElementById('todo-list');

// Todo жагсаалтыг харуулах
const getTodos = async () => {
  const res = await fetch('/todos');
  const todos = await res.json();
  todoList.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.title;
    
    const editButton = document.createElement('button');
    editButton.textContent = 'zasah';
    editButton.onclick = async () => {
      const newTitle = prompt('shine um bich', todo.title);
      if (newTitle) {
        await fetch(`/todos/${todo.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title: newTitle })
        });
        getTodos();
      }
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'ustgah';
    deleteButton.onclick = async () => {
      await fetch(`/todos/${todo.id}`, {
        method: 'DELETE'
      });
      getTodos();
    };

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });
};

// Todo нэмэх
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = input.value;
  await fetch('/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title })
  });
  input.value = '';
  getTodos();
});

getTodos();