import { format } from "date-fns";
import pubSub from "../PubSub";

const TaskUI = (() => {
	const formatDueDate = (dueDate) => format(dueDate, "EEEE, LLLL do, y, p");

	const getCurrentTaskId = (e) => +e.target.closest(".task").dataset.taskId;

	const getEditTaskIcon = () =>
		`<svg class="edit edit-task" style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M21.7 13.35L20.7 14.35L18.65 12.35L19.65 11.35C19.85 11.14 20.19 11.13 20.42 11.35L21.7 12.63C21.89 12.83 21.89 13.15 21.7 13.35M12 18.94V21H14.06L20.12 14.88L18.07 12.88L12 18.94M5 19H10V21H5C3.9 21 3 20.11 3 19V5C3 3.9 3.9 3 5 3H6V1H8V3H16V1H18V3H19C20.11 3 21 3.9 21 5V9H5V19M5 5V7H19V5H5Z" />
</svg>`;

	function checkTasksToFilter() {
		const { mainProjectId } = document.querySelector(".selected").dataset;
		if (mainProjectId != null) {
			const mainProjectNames = ["inbox", "today", "week"];
			pubSub.publish(`filter-${mainProjectNames[mainProjectId]}-tasks`);
		} else {
			const { projectId } = document.querySelector(".selected").dataset;
			pubSub.publish("filter-custom-project-tasks", +projectId);
		}
	}

	function createTask(task) {
		const allTasks = document.querySelector(".all-tasks");

		const taskContainer = document.createElement("div");
		const taskContentLeft = document.createElement("div");
		const taskContentRight = document.createElement("div");
		const titleDescriptionContainer = document.createElement("div");
		const editTaskContainer = document.createElement("div");

		const completeTask = document.createElement("div");
		const titleTask = document.createElement("div");
		const descriptionTask = document.createElement("div");
		const dueDateTask = document.createElement("div");

		taskContentLeft.classList.add("task-content-left");
		taskContentRight.classList.add("task-content-right");
		completeTask.classList.add("complete-task");
		editTaskContainer.classList.add("edit-task-container");
		titleDescriptionContainer.classList.add("text-task");
		taskContainer.classList.add("task", task.priority);
		titleTask.classList.add("title-task");
		descriptionTask.classList.add("description-task");
		dueDateTask.classList.add("due-date-task");

		taskContainer.dataset.taskId = task.id;
		titleTask.textContent = task.title;
		descriptionTask.textContent = task.description;

		dueDateTask.textContent =
			task.dueDate !== "Invalid Date"
				? formatDueDate(new Date(task.dueDate))
				: "No Due Date";

		editTaskContainer.innerHTML += getEditTaskIcon();

		titleDescriptionContainer.append(titleTask, descriptionTask);
		taskContentLeft.append(completeTask, titleDescriptionContainer);
		taskContentRight.append(dueDateTask, editTaskContainer);
		taskContainer.append(taskContentLeft, taskContentRight);
		allTasks.appendChild(taskContainer);

		completeTask.addEventListener("click", (e) => {
			pubSub.publish("complete-task", getCurrentTaskId(e));
			checkTasksToFilter();
		});

		editTaskContainer.addEventListener("click", (e) => {
			const taskClicked = e.target.closest(".task");
			taskClicked.classList.add("edit-task-active");
			pubSub.publish("open-edit-task-modal");
		});
	}

	function removeAllTasks() {
		const allTasks = document.querySelector(".all-tasks");
		allTasks.innerHTML = "";
	}

	function handleTasks(tasks) {
		removeAllTasks();
		tasks.forEach((task) => createTask(task));
	}

	function render() {
		pubSub.subscribe("filter-tasks", handleTasks);
		pubSub.subscribe("check-tasks-to-filter", checkTasksToFilter);
	}
	return { render, checkTasksToFilter };
})();
export default TaskUI;
