

const add = document.getElementById("add");
const input = document.getElementById("input");
const container = document.getElementById("cont")

window.onload = function(){
  fetch("http://localhost:4000/get-todos")
  .then(response=>response.json())
  .then(data=>{
    data.forEach(todo=>{
      const taskDiv = createTaskElement(todo.task);
      container.appendChild(taskDiv);
    })
  })
  .catch(error=>{
    console.error(error);
  })
}

function createTaskElement(tasktext){
  const task = document.createElement('div');
  task.classList.add('task-lists');

  const text = document.createElement('span');
  text.textContent = tasktext;
  task.appendChild(text);

  const Edit = document.createElement('button');
  Edit.id = "edit";
  Edit.textContent = "Edit";
  task.appendChild(Edit);

  const Delete = document.createElement('button');
  Delete.id = "delete";
  Delete.textContent = "Delete";
  task.appendChild(Delete);

  Delete.addEventListener('click',()=>{
    fetch("http://localhost:4000/delete-todos",{
      method:"DELETE",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({task:text.textContent})
    })
    .then(response=>response.json())
    .then(data=>{
      console.log("Delete from server: ",data);
      task.remove();
    })
    .catch(error => console.error("Error deleting task:", error));
  })

  Edit.addEventListener('click',()=>{
    if(text.isContentEditable){
        text.contentEditable = "false";
        Edit.textContent = "Edit";
    }else{
        text.contentEditable ="true";
        text.focus();
        Edit.textContent = "Save";
    }
})

return task;
}

add.addEventListener('click',function(event){

  event.preventDefault();

   let inputValue = input.value.trim();
   //Make a div to add the things:
   const task = document.createElement(inputValue);
   container.appendChild(task);
   input.value = '';
   submitTodo(inputValue);
})  

function submitTodo(text){
  fetch('http://localhost:4000/add-todo',{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({task:text})
  })
  .then(response=>response.json())
  .then(data =>{
   console.log("task added successfullly");
  })
  .catch(error=>{
    console.error(error);
  })
}


