if (localStorage.main) {
  document.body.innerHTML = localStorage.main;
}

let drag = null;

let addBtns = document.querySelectorAll('.add');
let editBtns = document.querySelectorAll('.edit');
let deleteBtns = document.querySelectorAll('.delete');


function add(self) {
  let task = document.createElement('li');
  task.classList.add('task');
  task.draggable = true;
  task.onkeydown = update();
  task.innerHTML =
    `
					<span><input type ='text'></span>
					<button class="edit" onclick="edit(event)">Edit</button>
					<button class="delete" onclick="deleteTask(event)">Delete</button>
      `;


  let listId = self.parentElement.childNodes[3].id;
  let currList = document.getElementById(listId);
  currList.append(task);
  task.firstElementChild.firstElementChild.focus();
  task.firstElementChild.firstElementChild
  drag_start();
  update();


}


function edit(e) {
  let taskInput = e.target.parentElement.firstElementChild;
  taskInput.select();
  update();

}

function deleteTask(e) {
  e.target.parentElement.remove();
  update();

}


function drag_over() {
  let lists = document.querySelectorAll('.list');
  lists.forEach(list => {
    list.addEventListener('dragover', e => {
      e.preventDefault();
    })
    list.addEventListener('drop', e => {
      e.preventDefault();
      list.append(drag);
      update();
    })
  })
}
drag_over();


function drag_start() {
  let tasks = document.querySelectorAll('.task');
  tasks.forEach(task => {
    task.addEventListener('dragstart', () => {
      drag = task;
    })
  })
}

function update() {
  let main = document.querySelector('main');
  localStorage.setItem('main', main.outerHTML);
}
update();

