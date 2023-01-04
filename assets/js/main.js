const inputTask = document.querySelector('.input-task');
const btnTask = document.querySelector('.btn-task');
const tasks = document.querySelector('.tasks');

function createLi()
{
    const li = document.createElement('li');
    return li;
}

inputTask.addEventListener('keypress', function(e)
{
    if(e.keyCode === 13)
    {
        if(!inputTask.value) return;
        createTask(inputTask.value);
    }
});

function clearInput()
{
    inputTask.value = '';
    inputTask.focus();
}

function createClearBtn(li)
{
    li.innerText += ' ';
    const clearBtn = document.createElement('button');
    clearBtn.innerText = 'Delete';
    //clearBtn.classList.add('Delete');
    clearBtn.setAttribute('class', 'delete');
    li.appendChild(clearBtn);
}

function createTask(textInput)
{
    const li = createLi();
    li.innerText = textInput;
    tasks.appendChild(li);
    clearInput();
    createClearBtn(li);
    saveTasks();
}

btnTask.addEventListener('click', function()
{
    if(!inputTask.value) return;
    createTask(inputTask.value);
});

document.addEventListener('click', function(e)
{
    const el = e.target;
    if (el.classList.contains('delete'))
    {
        el.parentElement.remove();
        saveTasks();
    }
});
function saveTasks()
{
    const liTasks = tasks.querySelectorAll('li');
    const tasksList = [];
    for (let task of liTasks)
    {
        let textTask = task.innerText;
        textTask = textTask.replace('Delete', '').trim();
        //console.log(textTask);
        tasksList.push(textTask);
    }
    //.log(taskslist);
    const taskJSON = JSON.stringify(tasksList);
    //console.log(taskJSON);
    localStorage.setItem('tasks', taskJSON);
}
function addSavedTasks()
{
    const tasks = localStorage.getItem('tasks');
    const tasksList = JSON.parse(tasks);
    for (let task of tasksList)
    {
        createTask(task);
    }
}
addSavedTasks();