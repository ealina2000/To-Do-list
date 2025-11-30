const input = document.getElementById('todo-inp');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');



// try to load saved lodos from localStorage(if any)
const savedTodos = localStorage.getItem('todos');
const todos = savedTodos ? JSON.parse(savedTodos) : [];

// let todos=[];
// if(savedTodos){
//     todos=JSON.parse(savedTodos);
// }
// let todos=JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    // save current todo array to localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
}


// function renderTodos(){
//     // clear existing list
//     todoList.innerHTML='';
//     // render each todo item
//     todos.forEach((todo,index)=>{
//         const li=document.createElement('li');
//         li.textContent=todo;
//         // add a delete button for each item
//         const delBtn=document.createElement('button');
//         delBtn.textContent='Delete';
//         delBtn.addEventListener('click',()=>{
//             deleteTodo(index);
//         });
//         li.appendChild(delBtn);
//         todoList.appendChild(li);
//     });
// }


function createTodoNode(todo, idx) {

    // create li element
    const li = document.createElement("li");

    // span to hold todo text
    const span = document.createElement('span');
    span.textContent = todo.text;
    span.style.textDecoration = todo.completed ? 'line-through' : '';
   span.addEventListener('dblclick',()=>{
    const newText=prompt('Edit Your Todo :',todo.text);
    if(newText !== null){
        todo.text=newText.trim();
        span.textContent = todo.text;
        saveTodos();
    }
   })

    // checkbox to toggle completion
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener('change',()=>{
        todo.completed = checkbox.checked;
        span.style.textDecoration = todo.completed ? 'line-through' : '';
        saveTodos();
    })
    

    // create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        todos.splice(idx, 1);
        saveTodos();
        render();
    });

    li.append(checkbox,span,deleteBtn);
    return li;
}

// Render the whole todo list from the todos array
function render() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const node=createTodoNode(todo,index);
        todoList.appendChild(node);
    });
}

function addTodo() {
    const text = input.value.trim();
    if (!text) return;
    todos.push({text:text,completed:false});
    input.value='';
    saveTodos();
    render();
}

addBtn.addEventListener('click', addTodo);

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }   
});

render();
