import Project from "./AppLogic/Project";
import Storage from "./AppLogic/Storage";
import Task from "./AppLogic/Task";
import navigation from "./UI/Navigation";
import handleModal from "./UI/Modal";
import ProjectUI from "./UI/ProjectUI";
import TaskUI from "./UI/TaskUI";
import pubSub from "./PubSub";

const TodoListApp = (() => {
	function checkTasksAndProjectsStored() {
		console.log(Storage.checkTasksStored(), Storage.checkProjectsStored());
		return Storage.checkTasksStored() && Storage.checkProjectsStored();
	}

	function renderTasksAndProjects() {
		// add to array
		pubSub.publish("populate-tasks-local-storage", Task.taskList);
		pubSub.publish("populate-projects-local-storage", Project.taskList);
		// add to dom
		pubSub.publish("check-tasks-to-filter");
		pubSub.publish("populate-projects-dom", Project.projectList);
	}

	function addDefaultProjectsAndTasksIfNoneStored() {
		console.log(checkTasksAndProjectsStored());
		if (checkTasksAndProjectsStored()) {
			pubSub.publish("add-task-local-storage", {
				key: "task",
				value: Storage.defaultTasks,
			});
			pubSub.publish("add-project-local-storage", {
				key: "project",
				value: Storage.defaultProjects,
			});
		}
	}

	function render() {
		Task.render();
		Project.render();
		handleModal.render();
		navigation.render();
		ProjectUI.render();
		TaskUI.render();
		Storage.render();
		addDefaultProjectsAndTasksIfNoneStored();
		renderTasksAndProjects();
	}

	return { render };
})();
export default TodoListApp;