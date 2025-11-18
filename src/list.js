class Task {

    constructor(title, description, year, month, day, priority, list){
        this.title = title;
        this.description = description;
        this.year = year;
        this.month = month;
        this.day = day;
        this.priority = priority;
        this.complete = false;
        this.id = crypto.randomUUID();
        this.list = list;
    }

    show() {
        const tasks = document.getElementById("tasks");

        let taskDiv = document.createElement("div");
        taskDiv.id = "taskDiv";

        if(this.priority == "high"){
            taskDiv.style.backgroundColor = "rgba(255, 159, 159, 1)";
        }
        else if (this.priority == "medium"){
            taskDiv.style.backgroundColor = "rgba(255, 225, 159, 1)";
        }
        else {
            taskDiv.style.backgroundColor = "rgba(255, 255, 255, 1)";
        }

        let taskTitleDiv = document.createElement("div");
        taskTitleDiv.id = "taskTitleDiv";
        let taskCheck = document.createElement("input");
        taskCheck.type = "checkbox";
        taskCheck.checked = this.complete;
        taskCheck.addEventListener("change", () => {
            this.complete = taskCheck.checked;
        });
        let taskTitle = document.createElement("h1");
        taskTitle.textContent = this.title;
        taskTitleDiv.appendChild(taskCheck);
        taskTitleDiv.appendChild(taskTitle);
        taskDiv.appendChild(taskTitleDiv);

        let taskDescription = document.createElement("p");
        taskDescription.textContent = this.description;
        taskDiv.appendChild(taskDescription);

        let taskDateDiv = document.createElement("div");
        taskDateDiv.id = "taskDateDiv";
        let taskDateText = document.createElement("h1");
        taskDateText.textContent = "Due date:";
        let taskDate = document.createElement("p");
        taskDate.textContent = this.year + "-" + this.month + "-" + this.day;
        taskDateDiv.appendChild(taskDateText);
        taskDateDiv.appendChild(taskDate);
        taskDiv.appendChild(taskDateDiv);

        let buttonDiv = document.createElement("div");
        buttonDiv.id = "buttonDiv";
        let editBtn = document.createElement("button");
        editBtn.textContent = "EDIT";
        editBtn.addEventListener("click", () => {
            this.list.newTask(this.title, this.description, this.year, this.month, this.day, this.priority, this.id);
        });
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "DELETE";
        deleteBtn.addEventListener("click", () => {
            this.list.deleteTask(this.id);
        });
        buttonDiv.appendChild(editBtn);
        buttonDiv.appendChild(deleteBtn);
        taskDiv.appendChild(buttonDiv);

        tasks.appendChild(taskDiv);
    }
}

export default class List {
    constructor(name) {
        this.tasks = [];
        this.name = name;
        this.id = crypto.randomUUID();
    }

    show() {
        const listDetails = document.getElementById("listDetails");
        listDetails.innerHTML = "";
        let listName = document.createElement("h1");
        listName.textContent = this.name;
        listDetails.appendChild(listName);
        let newButton = document.createElement("button");
        newButton.textContent = "NEW TASK";
        newButton.addEventListener("click", () => {
            this.newTask("", "", "", "", "", "low", "");
        });
        listDetails.appendChild(newButton);

        const tasks = document.getElementById("tasks");
        tasks.innerHTML = "";
        for(let i = 0; i < this.tasks.length; ++i){
            this.tasks[i].show();
        }
    }

    newTask(title, description, year, month, day, priority, id) {
        const dialog = document.getElementById("dialog");
        let titleInput = document.getElementById("titleInput");
        titleInput.value = title;
        let descriptionInput = document.getElementById("descriptionInput");
        descriptionInput.value = description;
        let yearInput = document.getElementById("yearInput");
        yearInput.value = year;
        let monthInput = document.getElementById("monthInput");
        monthInput.value = month;
        let dayInput = document.getElementById("dayInput");
        dayInput.value = day;
        let priorityInput = document.getElementById("priorityInput");
        priorityInput.value = priority;
        let button = document.getElementById("saveButton");
        dialog.showModal();

        if (button._handler) {
        button.removeEventListener("click", button._handler);
        }

        const handler = () => this.saveTask(id);

        button._handler = handler;

        button.addEventListener("click", handler);
    }

    saveTask(id) {
        const dialog = document.getElementById("dialog");
        let titleInput = document.getElementById("titleInput");
        let descriptionInput = document.getElementById("descriptionInput");
        let yearInput = document.getElementById("yearInput");
        let monthInput = document.getElementById("monthInput");
        let dayInput = document.getElementById("dayInput");
        let priorityInput = document.getElementById("priorityInput");

        let task = new Task(titleInput.value, descriptionInput.value, yearInput.value,
                                monthInput.value, dayInput.value, priorityInput.value, this);

        let updated = false;
        for(let i = 0; i < this.tasks.length; ++i){
            if(this.tasks[i].id == id){
                this.tasks[i] = task;
                updated = true;
            }
        }
        if(!updated){
            this.tasks.push(task);
        }

        dialog.close();
        this.show();
    }

    deleteTask(id){
        for(let i = 0; i < this.tasks.length; ++i){
            if(this.tasks[i].id == id){
                this.tasks.splice(i, 1);
                this.show();
            }
        }
    }
}