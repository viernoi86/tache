// Sélectionne les éléments HTML
const taskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Fonction pour sauvegarder les tâches dans le localStorage
function saveTasks() {
  const tasks = Array.from(taskList.children).map(item => ({
    text: item.textContent.replace("Supprimer", "").trim(),
    completed: item.classList.contains("completed")
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Fonction pour charger les tâches depuis le localStorage
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => {
    const taskItem = document.createElement("li");
    taskItem.textContent = task.text;

    // Si la tâche est terminée, applique la classe correspondante
    if (task.completed) {
      taskItem.classList.add("completed");
    }

    // Ajoute un bouton "Supprimer" pour chaque tâche
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Supprimer";
    deleteButton.addEventListener("click", () => {
      taskItem.remove();
      saveTasks();
    });

    // Ajoute un événement pour marquer comme terminé
    taskItem.addEventListener("click", () => {
      taskItem.classList.toggle("completed");
      saveTasks();
    });

    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
  });
}

// Fonction pour ajouter une nouvelle tâche
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return; // Empêche l'ajout de tâches vides

  const taskItem = document.createElement("li");
  taskItem.textContent = taskText;

  // Ajoute un bouton "Supprimer"
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Supprimer";
  deleteButton.addEventListener("click", () => {
    taskItem.remove();
    saveTasks();
  });

  // Ajoute un événement pour marquer comme terminé
  taskItem.addEventListener("click", () => {
    taskItem.classList.toggle("completed");
    saveTasks();
  });

  taskItem.appendChild(deleteButton);
  taskList.appendChild(taskItem);

  // Réinitialise le champ de saisie et sauvegarde les tâches
  taskInput.value = "";
  saveTasks();
}

// Ajoute l'événement au bouton "Ajouter"
addTaskButton.addEventListener("click", addTask);

// Charge les tâches existantes au démarrage
loadTasks();
