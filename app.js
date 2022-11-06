// Selectors
const addForm = document.querySelector('.add-form');
const taskList = document.querySelector('#todos');
// Function to get local todos
const insertTodo = (todo) => {
    // Creating elements to append to tasklist
    const itemEl = document.createElement('li');
    itemEl.classList.add('todo');
    const itemName = document.createElement('span');
    itemName.classList.add('todo-name');
    itemName.innerText = todo;
    const itemIcon = document.createElement('i');
    itemIcon.classList.add('fa-solid');
    itemIcon.classList.add('fa-trash');
    itemIcon.classList.add('delete');
    itemEl.appendChild(itemName);
    itemEl.appendChild(itemIcon);
    taskList.appendChild(itemEl);
    // const taskHtml = `
    //                     <li class="task"><span class='todo-name'>${todo}</span><i class='fa-solid fa-trash delete'></i></li>
    //                 `
    // taskList.insertAdjacentHTML("afterbegin",taskHtml);
};
// Function to load todos from local storage
const getLocalTodos = () => {
    let todos;
    if(localStorage.getItem('todos') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(todo => {
        insertTodo(todo);
    });
};
// Function to delete todo from local storage
const deleteLocalTodo = (todoIndex) => {
    let todos;
    if(localStorage.getItem('todos') === null) {
        let todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
};
// Function to save todos to localstorage
const saveLocalTodo = (todo) => {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
};
// EventListeners
// Load local todos on page load
window.addEventListener('DOMContentLoaded', () => {
    getLocalTodos();
});
// Create new todo
addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTodo = addForm.todo.value.trim();
    if(newTodo.length != 0) {
        insertTodo(newTodo);
        saveLocalTodo(newTodo);
        addForm.reset();
    } else {
        alert('please input a task')
    }
});
// Delete todo
taskList.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete')) {
        let item = e.target.parentElement.querySelector('.todo-name');
        const itemIndex = item.textContent;
        deleteLocalTodo(itemIndex);
        e.target.parentElement.remove();
    }
});