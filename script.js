let input = document.getElementById("input");
let listOfTodos = document.querySelector(".list-of-items");
let store = Redux.createStore(reducer);
let todos = store.getState();


function reducer(todos = [], action) {
  switch (action.type) {
    case "add":
      todos.push(action.todo);
      return todos;
    case "remove":
      todos.splice(action.itemId, 1);
     return todos;
     case "toggle":
         todos[action.itemId].isDone= !todos[action.itemId].isDone;
       return todos;
    default:
      return todos;
  }
}
function handleClick(event) {
  store.dispatch({ type: "remove", itemId: event.target.dataset.id });
  buildUI();
}
function handleToggle(event){
  
    store.dispatch({ type: "toggle", itemId: event.target.dataset.ark });
    buildUI();
}
function buildUI() {
  listOfTodos.innerHTML = "";
  todos.forEach((todo, index) => {
    let item = document.createElement("li");
    item.classList.add("message", "m-0", "mb-1", "is-white");
    todo.isDone? item.classList.add("is-success"):'';
   
  
    let div = document.createElement("div");
    div.classList.add("message-header", "pl-6", "is-size-5", "box");
    div.setAttribute('data-ark', index);
    div.innerHTML = `<span class='pointer' data-ark=${index} onclick="handleToggle(event)">${todo.name}</span><button data-id=${index} onclick="handleClick(event)" class="delete has-background-danger"></button>`;
    item.append(div);
    listOfTodos.append(item);
    console.log(todos);
  });
}
document.addEventListener("keypress", (event) => {
  if (event.keyCode == 13) {
    if (input.value.length == 0) {
      alert("Name cannot be empty");
    } else {
      let todoItem = {
        name: event.target.value[0].toUpperCase()+event.target.value.substring(1),
        isDone: false,
      };

      store.dispatch({ type: "add", todo: todoItem });

      buildUI();
      input.value = "";
    }
  }
});
