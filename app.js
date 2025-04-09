// alert("Hii somi")
const todoform=document.querySelector('form');
const todoInput=document.getElementById('todo-input');
const todoListUL=document.getElementById('todo-list');

let allTodos=getTodos();
updateTodoList();

todoform.addEventListener('submit',(e)=>{
    e.preventDefault();
    // this default prevent page reloading
    // alert("test");
    addTodo();
})
function addTodo(){
    const todoText=todoInput.value.trim();
    if(todoText.length >0){
        const todoObject={
            text:todoText,
            completed:false
        }
        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();
        // after pushing todo to array  input field is set to empty
        todoInput.value="";
    }

}
function updateTodoList(){
    todoListUL.innerHTML="";
    allTodos.forEach((todo,todoIndex)=>{
        todoItem=createTodoItem(todo,todoIndex);
        todoListUL.append(todoItem);
    })
}

function createTodoItem(todo,todoIndex){
    const todoId="todo-"+todoIndex;
    const todoLI=document.createElement("li");
    const todoText=todo.text;   
    todoLI.className="todo";
    // todoListUL.append(todoLI);

    todoLI.innerHTML=`<input type="checkbox" id="${todoId}">
                <label for="${todoId}" class="custom-checkbox">
                    <svg xmlns="http://www.w3.org/2000/svg" height="px" viewBox="0 -960 960 960" width="24px" fill="transparent"><path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z"/></svg>
                </label>
                <label for="${todoId}" class="todo-text">
                   ${todoText}
                </label>
                <button class="delete-button">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--secondary-color)"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>`
    
    const deleteButton=todoLI.querySelector(".delete-button")
    deleteButton.addEventListener("click",()=>{
        deleteTodoItem(todoIndex);
        
    })
    const checkbox=todoLI.addEventListener("change",()=>{
        allTodos[todoIndex].completed=checkbox.checked;
        saveTodos();
    })
    // checkbox.checked=todo.completed;
    return todoLI;
}
function deleteTodoItem(todoIndex){
    allTodos=allTodos.filter((_,i)=>i !==todoIndex);
    // this is using filter it filter outs array based on certain criteria
    saveTodos();
    updateTodoList();
}

function saveTodos(){
    const todosjson=JSON.stringify(allTodos);
    localStorage.setItem("todos",todosjson);
    // we know in localstorage we can only store string  so above stringify array or json data
}

// even reloaded the page all todos vanishes
// because yet we have not loaded todos from localstorage
// so we create new function
function getTodos(){
    const todos=localStorage.getItem("todos")|| "[]";
    return JSON.parse(todos);
    // as we converted todo in javascript array

}



