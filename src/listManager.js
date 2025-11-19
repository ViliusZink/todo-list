import List, { Task } from "./list.js";

export default class ListManager {
    constructor() {
        this.lists = [];
        this.listButtons = [];

        this.load();

        if(this.listButtons.length > 0){
            this.listButtons[0].classList.add("active");
        }

        this.show();
    }

    show(){
        const listsDiv = document.getElementById("lists");
        listsDiv.innerHTML = "";
        for(let i = 0; i < this.listButtons.length; ++i){
            let buttonDiv = document.createElement("div");
            buttonDiv.id = "listButtonDiv";
            let deleteList = document.createElement("button");
            deleteList.id = "deleteList";
            deleteList.textContent = "✖";
            deleteList.addEventListener("click", () => this.removeList(this.listButtons[i].id));
            buttonDiv.appendChild(this.listButtons[i]);
            buttonDiv.appendChild(deleteList);
            listsDiv.appendChild(buttonDiv);

            if(this.listButtons[i].classList.contains("active")){
                this.lists[i].show();
            }
        }

        let addButton = document.createElement("button");
        addButton.textContent = "ADD LIST";
        addButton.id = "addListButton";
        addButton.addEventListener("click", () => this.addList());
        listsDiv.appendChild(addButton);
    }

    removeList(id){
        for(let i = 0; i < this.listButtons.length; ++i){
            if(this.listButtons[i].id == id){
                this.lists.splice(i, 1);
                this.listButtons.splice(i, 1);
                this.show();
                this.save();
            }
        }
    }

    addList() {
        const listDialog = document.getElementById("listDialog");
        listDialog.innerHTML = "";
        let listName = document.createElement("h1");
        listName.textContent = "List name:";
        let listNameInput = document.createElement("input");
        listNameInput.type = "text";
        let saveButton = document.createElement("button");
        saveButton.textContent = "SAVE";
        saveButton.addEventListener("click", () => {
            let newList = new List(listNameInput.value);
            newList.manager = this;
            this.lists.push(newList);
            let button = document.createElement("button");
            button.id = newList.id;
            button.textContent = newList.name;
            button.addEventListener("click", () => {
                for(let j = 0; j < this.listButtons.length; ++j){
                    if(this.listButtons[j].id == button.id){
                        button.classList.add("active");
                    }
                    else{
                        this.listButtons[j].classList.remove("active");
                    }
                }
                this.show();
            });
            this.listButtons.push(button);

            for(let j = 0; j < this.listButtons.length; ++j){
                    if(this.listButtons[j].id == button.id){
                        button.classList.add("active");
                    }
                    else{
                        this.listButtons[j].classList.remove("active");
                    }
                }

            listDialog.close();
            this.show();
            this.save();
        });
        listDialog.appendChild(listName);
        listDialog.appendChild(listNameInput);
        listDialog.appendChild(saveButton);
        listDialog.showModal();
    }

    save() {
        const data = this.lists.map(list => ({
            id: list.id,
            name: list.name,
            tasks: list.tasks.map(task => ({
                id: task.id,
                title: task.title,
                description: task.description,
                year: task.year,
                month: task.month,
                day: task.day,
                priority: task.priority,
                complete: task.complete
            }))
        }));

        localStorage.setItem("lists", JSON.stringify(data));
    }

    load() {
        const data = JSON.parse(localStorage.getItem("lists"));
        if (!data) return;

        this.lists = [];
        this.listButtons = [];

        data.forEach(storedList => {
            let list = new List(storedList.name);
            list.manager = this;
            list.id = storedList.id;

            storedList.tasks.forEach(t => {
                let task = new Task(
                    t.title,
                    t.description,
                    t.year,
                    t.month,
                    t.day,
                    t.priority,
                    list
                );
                task.id = t.id;
                task.complete = t.complete;
                list.tasks.push(task);
            });

            this.lists.push(list);

            let button = document.createElement("button");
            button.id = list.id;
            button.textContent = list.name;

            button.addEventListener("click", () => {
                this.listButtons.forEach(b => b.classList.remove("active"));
                button.classList.add("active");
                this.show();
            });

            this.listButtons.push(button);
        });
    }
}