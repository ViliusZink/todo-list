export default class Task {

    constructor(title, description, year, month, day, priority, id){
        this.title = title;
        this.description = description;
        this.year = year;
        this.month = month;
        this.day = day;
        this.priority = priority;
        this.complete = false;
        this.id = id;
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
        taskCheck.value = this.complete;
        taskCheck.addEventListener("change", () => {
            this.complete = taskCheck.value;
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
            
        });
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "DELETE";
        deleteBtn.addEventListener("click", () => {
            
        });
        buttonDiv.appendChild(editBtn);
        buttonDiv.appendChild(deleteBtn);
        taskDiv.appendChild(buttonDiv);

        tasks.appendChild(taskDiv);
    }
}