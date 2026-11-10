const buttons = document.querySelectorAll(".status button");
const addtask = document.querySelector(".addTask button");
let taskList = document.querySelector(".showTask ul");
let taskMsg = document.querySelector(".showTask .taskMsg");



buttons.forEach((btn) => {
    btn.addEventListener("click", () => {

        buttons.forEach((b) => {
            b.classList.remove("selected");
        });

        btn.classList.add("selected");
        let status = btn.innerText;
        filterTask(status);
    });
});

addtask.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateTaskList();
    console.log("Button clicked");
}
);

const updateTaskList = () => {
    let task = document.querySelector(".addTask input");
    let taskValue = task.value;
    if (taskValue === "") {
        return;
    }
    taskMsg.style.display = "none";

    let li = document.createElement("li");
    li.innerHTML = `
    <div class="taskItem">
        <div class="left">
            <input type="checkbox">
            <span>${taskValue}</span>
        </div>

        <button class="deleteBtn"><i class="fa-solid fa-trash-can"></i></button>
    </div>
 `;
    //checkBox completed task style
    let checkBox = li.querySelector("input");
    let taskText = li.querySelector("span");
    checkBox.addEventListener("change", () => {
        if (checkBox.checked) {
            taskText.style.textDecoration = "line-through";
            taskText.style.fontStyle = "italic";
            taskText.style.opacity = "0.6";
        }
        else {
            taskText.style.textDecoration = "none";
            taskText.style.fontStyle = "normal";
            taskText.style.opacity = "1";
        }
        updateCount();
    });
    // deleteTask
    let deleteTask = li.querySelector(".taskItem .deleteBtn");
    deleteTask.addEventListener("click", () => {
        console.log("taskDelete");
        li.remove();
        updateCount();

    });
    taskList.appendChild(li);
    task.value = "";
    updateCount();
    console.log(taskList);
}

// update footer msg

function updateCount() {
    let taskLi = document.querySelectorAll("li");
    let count = 0;
    taskLi.forEach((check) => {
        let box = check.querySelector("input");

        if (!box.checked) {
            count++;
            console.log(count);


        }
    });
    let msg = document.querySelector("footer .msg");

    if (count === 0) {
        msg.innerHTML = `<p>No remaining task</p>`;
    }
    else {
        msg.innerHTML = `<p>${count} task remaining</p>`;
    }
}




// filter Task
const filterTask = (status) => {
    let allTask = document.querySelectorAll(".taskList li");
    allTask.forEach((task) => {
        let checkbox = task.querySelector("input");
        if (status === "All") {
            task.style.display = "block";
        }
        else if (status === "Completed") {
            if (checkbox.checked) {
                task.style.display = "block";

            }
            else {
                task.style.display = "none";
            }
        }
        else if (status === "Active") {
            if (!checkbox.checked) {
                task.style.display = "block";

            }
            else {
                task.style.display = "none";
            }

        }

    });


};