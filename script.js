document.addEventListener("DOMContentLoaded", () => {
  // Restore tasks from localStorage if they exist
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks) {
    storedTasks.forEach((task) => tasks.push(task));
    updateTaskList();
    updateStats();
  }

  // Add event listener for the background change button
  const changeBackgroundButton = document.getElementById("changeBackground");
  changeBackgroundButton.addEventListener("click", changeBackground);
});

let tasks = [];

// Save tasks to localStorage
const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const backgrounds = [
  "url(./img/b1.jpeg)",
  "url(./img/b2.webp)",
  "url(./img/b3.jpeg)",
  "url(./img/b5.webp)",
  "url(./img/b6.jpeg)",
  "url(./img/b8.jpeg)",
  "url(./img/b10.avif)",
  "url(./img/b11.jpeg)",
  "url(./img/b12.avif)",
  "url(./img/b13.jpeg)",
  "url(./img/b14.jpeg)",
  "url(./img/b14.avif)",
];

let currentIndex = 0;

// Change background image
function changeBackground() {
  currentIndex = (currentIndex + 1) % backgrounds.length;
  document.body.style.backgroundImage = backgrounds[currentIndex];
}

// Change background every 60 seconds
setInterval(changeBackground, 60000);

const updateDateTime = () => {
  const now = new Date();
  const options = { weekday: "long", hour: "2-digit", minute: "2-digit" };
  const formattedDate = now.toLocaleDateString("en-US", { weekday: "long" });
  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dateTimeString = `${formattedDate} - ${formattedTime}`;
  document.querySelector(".date-hour").textContent = dateTimeString;
};

updateDateTime();
setInterval(updateDateTime, 60000);

const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
    taskInput.value = "";
    updateTaskList();
    updateStats();
    saveTasks();
  }
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
  updateStats();
  saveTasks();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTaskList();
  updateStats();
  saveTasks();
};

const editTask = (index) => {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = tasks[index].text;

  tasks.splice(index, 1);
  updateTaskList();
  updateStats();
  saveTasks();
};

const updateStats = () => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress = document.getElementById("progress");

  const progressBarWidth =
    totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  progress.style.width = `${progressBarWidth}%`;

  document.getElementById(
    "numbers"
  ).innerHTML = `${completedTasks}/${totalTasks}`;

  if (totalTasks > 0 && completedTasks === totalTasks) {
    celebrationConfetti();
  }
};

const updateTaskList = () => {
  const taskList = document.getElementById("task-list");
  if (!taskList) {
    console.error("Task list element not found.");
    return;
  }

  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox" ${
                      task.completed ? "checked" : ""
                    }/>
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="img/edit.png" alt="edit" onclick="editTask(${index})"/>
                    <img src="img/delete1.gif" alt="delete" onclick="deleteTask(${index})"/>
                </div>
            </div>
        `;

    listItem
      .querySelector(".checkbox")
      .addEventListener("change", () => toggleTaskComplete(index));
    taskList.append(listItem);
  });
};

// Add task on button click
document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});

// Celebration confetti effect
const celebrationConfetti = () => {
  console.log("Celebration confetti triggered");
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
};
