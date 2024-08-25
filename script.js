document.addEventListener("DOMContentLoaded", () => {
    
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (storedTasks) {
        storedTasks.forEach((task) => tasks.push(task));
        updateTaskList();
        updateStats();
    }
});

let tasks = [];


const saveTasks = () => {
    localStorage.setItem('tasks',JSON.stringify(tasks))
}



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

function changeBackground() {
  currentIndex = (currentIndex + 1) % backgrounds.length;
  document.body.style.backgroundImage = backgrounds[currentIndex];
}

setInterval(changeBackground, 60000);






const updateDateTime = () => {
    const now = new Date();
    const options = { weekday: 'long', hour: '2-digit', minute: '2-digit' };
    const formattedDate = now.toLocaleDateString('en-US', { weekday: 'long' });
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    const dateTimeString = `${formattedDate} - ${formattedTime}`;
    document.querySelector('.date-hour').textContent = dateTimeString;
};

updateDateTime();
setInterval(updateDateTime, 60000);

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";

    }
    updateTaskList();
    updateStats();
    saveTasks();
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

    const progressBarWidth = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    
    progress.style.width = `${progressBarWidth}%`;

    document.getElementById("numbers").innerHTML = `${completedTasks}/${totalTasks}`;

    if (tasks.length & completedTasks === totalTasks) {
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
        <div class="taskItem" >
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox"  ${task.completed ? "checked" : ""
                }/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
            <img src="img/edit.png" alt="edit" onclick="editTask(${index})"/>
            <img src="img/delete1.gif" alt="delete" onclick="deleteTask(${index})"/>
            </div>
        </div>
        `;

    listItem.querySelector(".checkbox").addEventListener("change", () => toggleTaskComplete(index));
    taskList.append(listItem);
    });
};

document.getElementById("newTask").addEventListener("click", function (e) {
    e.preventDefault();
    addTask();
});


const celebrationConfetti = () => {
    tsParticles.load({
      id: "tsparticles",
      options: {
        fullScreen: {
          zIndex: 1,
        },
        particles: {
          color: {
            value: ["#FFFFFF", "#FFd700"],
          },
          move: {
            direction: "bottom",
            enable: true,
            outModes: {
              default: "out",
            },
            size: true,
            speed: {
              min: 1,
              max: 3,
            },
          },
          number: {
            value: 500,
            density: {
              enable: true,
              area: 800,
            },
          },
          opacity: {
            value: 1,
            animation: {
              enable: false,
              startValue: "max",
              destroy: "min",
              speed: 0.3,
              sync: true,
            },
          },
          rotate: {
            value: {
              min: 0,
              max: 360,
            },
            direction: "random",
            move: true,
            animation: {
              enable: true,
              speed: 60,
            },
          },
          tilt: {
            direction: "random",
            enable: true,
            move: true,
            value: {
              min: 0,
              max: 360,
            },
            animation: {
              enable: true,
              speed: 60,
            },
          },
          shape: {
            type: ["circle", "square"],
            options: {},
          },
          size: {
            value: {
              min: 2,
              max: 4,
            },
          },
          roll: {
            darken: {
              enable: true,
              value: 30,
            },
            enlighten: {
              enable: true,
              value: 30,
            },
            enable: true,
            speed: {
              min: 15,
              max: 25,
            },
          },
          wobble: {
            distance: 30,
            enable: true,
            move: true,
            speed: {
              min: -15,
              max: 15,
            },
          },
        },
      },
    });
}