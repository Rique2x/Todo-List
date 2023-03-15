import pubSub from "../PubSub";
import Project from "./Project";
import Task from "./Task";

const Storage = (() => {
	const getLocalStorageItem = (item) =>
		JSON.parse(localStorage.getItem(item) || "[]");

	const getSelectedProjectId = () => +getLocalStorageItem("project-id");

	const getSelectedProjectAttribute = () => {
		localStorage.getItem("project-attribute");
	};

	function populateStoredTasks() {
		const storedTasks = getLocalStorageItem("task");
		storedTasks.forEach((task) => Task.taskList.push(task));
	}

	function checkTasksStored() {
		const storedTasks = getLocalStorageItem("task");
		return storedTasks.length === 0;
	}

	function checkProjectsStored() {
		const storedProjects = getLocalStorageItem("project");
		return storedProjects.length === 0;
	}

	function populateStoredProjects() {
		const storedProjects = getLocalStorageItem("project");

		storedProjects.forEach((project) => {
			Project.projectList.push(project);
		});
	}

	function setItem({ key, value }) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	const defaultTasks = [
		{
			title: "Complete Todo List",
			description: "A project by The Odin Project.",
			dueDate:
				"Tue Dec 13 2022 17:09:00 GMT-0600 (Central Standard Time)",
			priority: "High",
			id: 0,
			projectId: 0,
		},
		{
			title: "Wash the dishes",
			description: "",
			dueDate:
				"Tue Dec 14 2022 20:00:00 GMT-0600 (Central Standard Time)",
			priority: "Medium",
			id: 1,
			projectId: 0,
		},
		{
			title: "Make the bed",
			description: "",
			dueDate: "Invalid Date",
			priority: "Low",
			id: 2,
			projectId: 1,
		},
		{
			title: "Eat dinner",
			description: "",
			dueDate:
				"Tue Dec 13 2022 18:30:00 GMT-0600 (Central Standard Time)",
			priority: "High",
			id: 3,
			projectId: 1,
		},
	];

	const defaultProjects = [
		{
			title: "Default Project 1",
			id: 0,
			task: [defaultTasks[0], defaultTasks[1]],
		},
		{
			title: "Default Project 2",
			id: 1,
			task: [defaultTasks[2], defaultTasks[3]],
		},
	];

	function render() {
		// project local storage
		pubSub.subscribe("add-project-local-storage", setItem);
		pubSub.subscribe("delete-project-local-storage", setItem);
		pubSub.subscribe("edit-project-local-storage", setItem);

		// task local storage
		pubSub.subscribe("complete-task-local-storage", setItem);
		pubSub.subscribe("add-task-local-storage", setItem);

		// populate
		pubSub.subscribe("populate-tasks-local-storage", populateStoredTasks);
		pubSub.subscribe(
			"populate-projects-local-storage",
			populateStoredProjects
		);
	}

	return {
		populateStoredTasks,
		populateStoredProjects,
		checkTasksStored,
		checkProjectsStored,
		getSelectedProjectId,
		getSelectedProjectAttribute,
		defaultProjects,
		defaultTasks,
		render,
		setItem,
	};
})();

export default Storage;
