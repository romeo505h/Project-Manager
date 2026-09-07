const projects = JSON.parse(localStorage.getItem("projects")) || [];
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editingProjectId = null;
console.table(tasks);
const addProjectButton = document.querySelector("#add-project-btn");
const projectList = document.querySelector(".project-list");
const projectFormTitle = document.querySelector(".project-form-title");
const projectForm = document.querySelector(".project-form");
const projectNameInput = document.querySelector("#project-name");
const projectDescriptionInput = document.querySelector("#project-description");
const projectDeadlineInput = document.querySelector("#project-deadline");
const createProjectButton = document.querySelector("#create-project-btn");
const formError = document.querySelector(".form-error");
const projectCount = document.querySelector("#project-count");
const taskCount = document.querySelector("#task-count");
const completedCount = document.querySelector("#completed-count");
const overdueCount = document.querySelector("#overdue-count");

function updateDashboard() {
    projectCount.textContent = projects.length;
    taskCount.textContent = tasks.length;

    const completedTasks = tasks.filter(function (task) {
        return task.completed;
    });
    completedCount.textContent = completedTasks.length;
    const overdueProjects = projects.filter(function (project) {
        return project.deadline !== "No deadline" && new Date(project.deadline) < new Date() && project.status !== "Completed";
    });
    overdueCount.textContent = overdueProjects.length;
}

function updateProjectProgress(project, projectElement) {
    const projectTasks = tasks.filter(function (task) {
        return task.projectId === project.id;
    });

    if (projectTasks.length === 0) {
        project.progress = 0;
    } else {
        const completedTasks = projectTasks.filter(function (task) {
            return task.completed;
        });
        project.progress = Math.round(
            (completedTasks.length / projectTasks.length) * 100
        );
    }
    const progressFill = projectElement.querySelector(".progress-fill");
    const progressText = projectElement.querySelector(".progress-container span");

    progressFill.style.width = project.progress + "%";
    progressText.textContent = project.progress + "%";
    localStorage.setItem("projects", JSON.stringify(projects));
}


function updateProjectStatus(project, projectElement) {
    const projectTasks = tasks.filter(function (task) {
        return task.projectId === project.id;
    });
    const allTasksCompleted =
        projectTasks.length > 0 &&
        projectTasks.every(function (task) {
            return task.completed;
        });

    const statusElement = projectElement.querySelector(".status");

    if (allTasksCompleted) {
        project.status = "Completed";
        statusElement.textContent = "Completed";
        statusElement.classList.add("completed")
    } else {
        project.status = "Active";
        statusElement.textContent = "Active";
        statusElement.classList.remove("completed");
    }
    localStorage.setItem("projects", JSON.stringify(projects));
}
function renderEmptyState() {
    if (projects.length === 0) {
        projectList.innerHTML = `
        <div class="empty-state">
            <h3>No projects yet</h3>
            <p>Create your first project to get started.</p>
        </div>
        `;
    }
}
function renderProject(project) {
    const newProject = document.createElement("div");
    newProject.classList.add("project-card");
    newProject.dataset.projectId = project.id;
    newProject.innerHTML = `
                <div class="project-title">
                    <h3>${project.name}</h3>
                    <span class ="status">${project.status}</span>
                </div>
                <p>${project.description}</p>
                <div class="progress-section">
                    <p>Progress</p>
                    <div class="progress-container">
                        <div class="progress-bar">
                            <div class="progress-fill"></div>
                        </div>
                        <span>${project.progress}%</span>
                    </div>
                </div>
                <div class="project-footer">
                    <p>Due: ${project.deadline}</p>
                    <div class="project-actions">
                        <button class="edit-project-btn">Edit Project</button>
                        <button class="delete-project-btn" aria-label="Delete project">x</button>
                    </div>
                </div>
                <button class="add-task-btn">+ Add Task</button>
                <div class="task-form hidden">
                    <input type="text" class="task-name-input" placeholder="Task name">
                    <button type="button" class="create-task-btn">Create Task</button>
                </div>
                <div class="task-list"></div>
            `;
    projectList.appendChild(newProject);
    updateProjectProgress(project, newProject);
    updateProjectStatus(project, newProject);

    const deleteButton = newProject.querySelector(".delete-project-btn");
    deleteButton.addEventListener("click", function () {
        const confirmed = confirm(`Are you sure you want to delete "${project.name}"? This will also delete all tasks in this project.`);
        if (!confirmed) {
            return;
        }
        const projectId = Number(newProject.dataset.projectId);

        const remainingTasks = tasks.filter(function (task) {
            return task.projectId !== projectId;
        });
        tasks.length = 0;
        tasks.push(...remainingTasks);

        const remainingProjects = projects.filter(function (project) {
            return project.id !== projectId;
        });
        projects.length = 0;
        projects.push(...remainingProjects);
        localStorage.setItem("projects", JSON.stringify(projects));
        localStorage.setItem("tasks", JSON.stringify(tasks));
        updateDashboard();
        newProject.remove();
        if (projects.length === 0) {
            renderEmptyState();
        }

        console.table(projects);
        console.table(tasks);
    });

    projectNameInput.value = "";
    projectDescriptionInput.value = "";
    projectDeadlineInput.value = "";
    projectForm.classList.add("hidden");

    const addTaskButton = newProject.querySelector(".add-task-btn");
    const taskList = newProject.querySelector(".task-list");
    const taskForm = newProject.querySelector(".task-form");
    const taskNameInput = newProject.querySelector(".task-name-input");
    const createTaskButton = newProject.querySelector(".create-task-btn")
    const projectTasks = tasks.filter(function (task) {
        return task.projectId === project.id;
    });

    function renderTask(task, taskList, project) {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");

        taskElement.innerHTML = `
            <span>${task.name}</span>
            <input type="checkbox" class="task-checkbox">
            <div class="task-actions">
                <button class="edit-task-btn">Edit</button>
                <button class="delete-task-btn">x</button>
            </div>
        `;
        taskList.appendChild(taskElement);
        taskElement.dataset.taskId = task.id;

        const checkbox = taskElement.querySelector(".task-checkbox");
        checkbox.checked = task.completed;

        const editTaskButton = taskElement.querySelector(".edit-task-btn");
        const deleteTaskButton = taskElement.querySelector(".delete-task-btn");

        editTaskButton.addEventListener("click", function () {
            const taskNameSpan = taskElement.querySelector("span");
            const input = document.createElement("input");
            input.type = "text";
            input.value = task.name;
            input.classList.add("task-edit-input");

            const saveButton = document.createElement("button");
            saveButton.textContent = "Save";
            saveButton.classList.add("save-task-btn");

            const cancelButton = document.createElement("button");
            cancelButton.textContent = "Cancel";
            cancelButton.classList.add("cancel-task-btn");

            taskNameSpan.replaceWith(input);

            const actions = taskElement.querySelector(".task-actions");
            if (actions) {
                actions.appendChild(saveButton);
                actions.appendChild(cancelButton);
            } else {
                taskElement.appendChild(saveButton);
                taskElement.appendChild(cancelButton);
            }
            input.focus();
            input.select();

            checkbox.hidden = true;
            editTaskButton.hidden = true;
            deleteTaskButton.hidden = true;

            function saveTask() {
                const newTaskName = input.value.trim();

                if (newTaskName === "") {
                    input.classList.add("input-error");
                    return;
                }

                task.name = newTaskName;

                const newTaskNameSpan = document.createElement("span");
                newTaskNameSpan.textContent = task.name;

                input.replaceWith(newTaskNameSpan);
                saveButton.replaceWith(editTaskButton);
                cancelButton.remove();

                checkbox.hidden = false;
                editTaskButton.hidden = false;
                deleteTaskButton.hidden = false;

                localStorage.setItem("tasks", JSON.stringify(tasks));
            }

            function cancelEdit() {
                input.replaceWith(taskNameSpan);
                saveButton.replaceWith(editTaskButton);
                cancelButton.remove();

                checkbox.hidden = false;
                editTaskButton.hidden = false;
                deleteTaskButton.hidden = false;
            }
            saveButton.addEventListener("click", saveTask);
            cancelButton.addEventListener("click", cancelEdit);
            input.addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                    saveTask();
                }
                if (event.key === "Escape") {
                    cancelEdit();
                }
            });
        });

        deleteTaskButton.addEventListener("click", function () {
            const confirmed = confirm(`Are you sure you want to delete "${task.name}"?`);
            if (!confirmed) {
                return;
            }

            const taskId = Number(taskElement.dataset.taskId);
            const remainingTasks = tasks.filter(function (task) {
                return task.id !== taskId;
            });

            tasks.length = 0;
            tasks.push(...remainingTasks);
            taskElement.remove();
            localStorage.setItem("tasks", JSON.stringify(tasks));
            updateProjectProgress(project, newProject);
            updateProjectStatus(project, newProject);
            updateDashboard();

            console.table(tasks);
        });
        checkbox.addEventListener("change", function () {
            task.completed = checkbox.checked;

            localStorage.setItem("tasks", JSON.stringify(tasks));

            updateProjectProgress(project, newProject);
            updateProjectStatus(project, newProject);
            updateDashboard();

            console.table(tasks);
        });
    }
    projectTasks.forEach(function (task) {
        renderTask(task, taskList, project);
    });

    addTaskButton.addEventListener("click", function () {
        taskForm.classList.toggle("hidden");
    });

    function createTask() {
        if (taskNameInput.value.trim() === "") {
            return;
        }

        const newTask = {
            id: Date.now(),
            projectId: project.id,
            name: taskNameInput.value.trim(),
            completed: false
        };
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTask(newTask, taskList, project);
        updateProjectProgress(project, newProject);
        updateProjectStatus(project, newProject);
        updateDashboard();
        taskNameInput.value = "";
        taskForm.classList.add("hidden");
    }
    createTaskButton.addEventListener("click", function () {
        createTask();
    });

    taskNameInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            createTask();
        }
    });

    const editProjectButton = newProject.querySelector(".edit-project-btn");
    editProjectButton.addEventListener("click", function () {
        editingProjectId = project.id;

        projectNameInput.value = project.name;
        projectDescriptionInput.value = project.description;
        projectDeadlineInput.value =
            project.deadline === "No deadline" ? "" : project.deadline;

        createProjectButton.textContent = "Save Changes";
        projectFormTitle.textContent = "Edit Project";

        projectForm.classList.remove("hidden");
        projectForm.classList.add("editing");

        projectForm.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
        projectNameInput.focus();
    });
}
addProjectButton.addEventListener("click", function () {
    editingProjectId = null;

    projectNameInput.value = "";
    projectDescriptionInput.value = "";
    projectDeadlineInput.value = "";

    formError.textContent = "";
    createProjectButton.textContent = "Create Project";
    projectFormTitle.textContent = "Create New Project";

    projectForm.classList.remove("editing");
    projectForm.classList.toggle("hidden");
});

projectForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (projectNameInput.value.trim() === "") {
        projectNameInput.classList.add("input-error");
        formError.textContent = "Please enter a project name.";
        return;
    }
    projectNameInput.classList.remove("input-error");

    if (projectDescriptionInput.value.trim() === "") {
        projectDescriptionInput.classList.add("input-error");
        formError.textContent = "Please add a description.";
        return;
    }
    projectDescriptionInput.classList.remove("input-error");

    formError.textContent = "";

    if (editingProjectId !== null) {
        const project = projects.find(function (project) {
            return project.id === editingProjectId;
        });

        const projectElement = document.querySelector(`[data-project-id="${editingProjectId}"]`);

        project.name = projectNameInput.value;
        project.description = projectDescriptionInput.value;
        project.deadline = projectDeadlineInput.value || "No deadline";

        localStorage.setItem("projects", JSON.stringify(projects));

        projectElement.querySelector("h3").textContent = project.name;
        projectElement.querySelector(".project-title").nextElementSibling.textContent = project.description;
        projectElement.querySelector(".project-footer p").textContent = "Due: " + project.deadline;

        console.table(projects);

        editingProjectId = null;
        createProjectButton.textContent = "Create Project";
        projectFormTitle.textContent = "Create New Project";
        projectForm.classList.remove("editing");

        updateDashboard();

        projectNameInput.value = "";
        projectDescriptionInput.value = "";
        projectDeadlineInput.value = "";
        projectForm.classList.add("hidden");

    } else {
        const project = {
            id: Date.now(),
            name: projectNameInput.value,
            description: projectDescriptionInput.value,
            deadline: projectDeadlineInput.value || "No deadline",
            status: "Active",
            progress: 0
        };

        projects.push(project);
        localStorage.setItem("projects", JSON.stringify(projects));
        const emptyState = projectList.querySelector(".empty-state");

        if (emptyState) {
            emptyState.remove();
        }

        renderProject(project);
        updateDashboard();

        console.table(projects);
    }
});

projectNameInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();

        if (projectNameInput.value.trim() === "") {
            projectNameInput.classList.add("input-error");
            formError.textContent = "Please enter a project name.";
            return;
        }
        projectNameInput.classList.remove("input-error");
        formError.textContent = "";
        projectDescriptionInput.focus();
    }
});

projectDescriptionInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();

        if (projectDescriptionInput.value.trim() === "") {
            projectDescriptionInput.classList.add("input-error");
            formError.textContent = "Please add a description.";
            return;
        }
        projectDescriptionInput.classList.remove("input-error");
        formError.textContent = "";
        projectDeadlineInput.focus();
    }
});

projectDeadlineInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        createProjectButton.focus();
    }
})

projectNameInput.addEventListener("input", function () {
    if (projectNameInput.value.trim() !== "") {
        projectNameInput.classList.remove("input-error");
        formError.textContent = "";
    }
});

projectDescriptionInput.addEventListener("input", function () {
    if (projectDescriptionInput.value.trim() !== "") {
        projectDescriptionInput.classList.remove("input-error");
        formError.textContent = "";
    }
});

updateDashboard();

if (projects.length === 0) {
    renderEmptyState();
} else {
    projects.forEach(function (project) {
        renderProject(project);
    });
}  
