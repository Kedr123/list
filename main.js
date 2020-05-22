const todoControl =  document.querySelector(".todo-control"),
      todoList    =  document.querySelector(".todo-list"),
      todoCompleted =  document.querySelector(".todo-completed"),
      todoContainer =  document.querySelector(".todo-container");

let obj =  [ ];
let set_cookie= ( name, value, exp_y, exp_m, exp_d, path, domain, secure )=>
{
  var cookie_string =  name +  " = "  +  escape (  value );
  if( exp_y){
    var expires =  new Date ( exp_y,  exp_m,  exp_d );
    cookie_string += "; expires=" +  expires.toGMTString();
  }
  if( path) cookie_string += "; path=" +  escape ( path );

  if(domain) cookie_string += "; domain=" +  escape ( domain );

  if(secure) cookie_string += "; secure";

  document.cookie = cookie_string;
}

let get_cookie=( name)=>{
  var results = document.cookie.match ('(^|;) ?' + name + '=([^;]*)(;|$)');
  if(results) return (unescape(results[2]));
  else return null;
}

let save=()=>{set_cookie("objs", JSON.stringify(obj));}

let load=()=>{obj = JSON.parse(get_cookie("objs"));}

window.onload = function(event){ load(); render(); };

const render = () =>{
    save();
    todoCompleted.textContent = "";
    todoList.textContent = "";
    if(obj == null)
        obj = [];
    obj.forEach((element)=>{
        const li = document.createElement("li");
        li.classList.add("todo-item");
        li.innerHTML = `<span class="text-todo">${element.value}</span>
                        <div class="todo-buttons">
                            <button class="todo-remove"></button>
                            <button class="todo-complete"></button>
                        </div>`
        if(element.completed)
            todoCompleted.append(li);
        else
            todoList.append(li);
    })
}

todoControl.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = todoControl.querySelector("input");
    if(input.value.replace(/\s/g, "").length == 0)
        return;
    newObj = {
        value : input.value,
        completed : false
    };
    obj.push(newObj);
    input.value = "";
    render();
})

const ADVsearch = (target) => {
    const elemText = target.querySelector(".text-todo").textContent,
          elemCompleted = target.closest(".todo-completed");
    let ind = null;
    obj.forEach((element, index) => {
        if(element.value === elemText)
            if(element.completed == (elemCompleted != null))
                ind = index;
    })
    return ind;
}

todoContainer.addEventListener("click", (event) => {
    event.preventDefault();
    const target = event.target;
    if(!target.matches("button"))
        return;
    if(target.matches(".todo-remove")){
        obj.splice(ADVsearch(target.closest("li")), 1);
    }
    if(target.matches(".todo-complete")){
        obj[ADVsearch(target.closest("li"))].completed = !obj[ADVsearch(target.closest("li"))].completed;
    }
    render();
})