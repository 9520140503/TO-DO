const add = document.getElementById("add");
const input = document.getElementById("input");
const container = document.getElementById("cont")

add.addEventListener('click',function(){
   let inputValue = input.value.trim();
   //Make a div to add the things:
   const task = document.createElement('div');
   task.classList.add('tasks-list');
   
   const text = document.createElement('span');
   //Text added:
   text.textContent = inputValue;
   task.appendChild(text);

   //Empty the input:
   input.value = '';

   //edit button:
   const Edit = document.createElement('button');
   Edit.id = "edit";
   Edit.textContent = "Edit";
   task.appendChild(Edit);

   //Delete:
   const Delete = document.createElement('button');
   Delete.id = "delete";
   Delete.textContent = "Delete";
   task.appendChild(Delete);

   container.appendChild(task);

   Delete.addEventListener('click',()=>{
     text.remove();
     task.remove();
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

})  