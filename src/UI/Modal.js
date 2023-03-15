import { formatISO9075 } from "date-fns";
import pubSub from "../PubSub";
import Project from "../AppLogic/Project";
import Task from "../AppLogic/Task";

const handleModal = (() => {
	function clearModalValues(task) {
		task.title.value = "";
		task.title.classList.remove("active");
		task.titleError.classList.remove("active");
		if (task.isAddProject) return;

		task.dueDate.value = "";
		task.description.value = "";
		task.priority.value = "Low";
	}

	function toggleModal(modal, overlayModal) {
		modal.classList.toggle("active");
		overlayModal.classList.toggle("active");
	}

	function toggleError(title, titleError) {
		if (title.value) {
			title.classList.remove("active");
			titleError.classList.remove("active");
		} else {
			title.classList.add("active");
			titleError.classList.add("active");
		}
	}

	function addTask() {
		const modal = document.querySelector("#add-task-modal");
		const overlayModal = document.querySelector("#add-task-modal-overlay");
		const openModal = document.querySelector("#add-task");
		const cancelBtn = document.querySelector("#add-task-cancel");
		const closeBtn = document.querySelector(
			"#add-task-modal-header-cancel"
		);
		const addBtn = document.querySelector("#add-task-add");

		const title = document.querySelector("#add-task-title");
		const titleError = document.querySelector("#add-task-title-error");
		const dueDate = document.querySelector("#add-task-due-date");
		const description = document.querySelector("#add-task-description");
		const priority = document.querySelector("#add-task-priority");

		title.addEventListener("keyup", () => toggleError(title, titleError));
		cancelBtn.addEventListener("click", () =>
			toggleModal(modal, overlayModal)
		);
		closeBtn.addEventListener("click", () =>
			toggleModal(modal, overlayModal)
		);

		openModal.addEventListener("click", () => {
			clearModalValues({
				title,
				dueDate,
				description,
				priority,
				titleError,
			});
			toggleModal(modal, overlayModal);
		});

		addBtn.addEventListener("click", () => {
			if (!title.value) {
				toggleError(title, titleError);
				return;
			}

			toggleModal(modal, overlayModal);

			const { projectId } = document.querySelector(".selected").dataset;
			const projectIdValue = projectId != null ? +projectId : "";
			pubSub.publish("add-task", {
				title: title.value,
				dueDate: new Date(`${dueDate.value}`).toString(),
				description: description.value,
				priority: priority.value,
				id: Task.taskList.length,
				projectId: projectIdValue,
			});
			pubSub.publish("check-tasks-to-filter");
		});
	}

	function addProject() {
		const modal = document.querySelector("#add-project-modal");
		const overlayModal = document.querySelector(
			"#add-project-modal-overlay"
		);
		const openModal = document.querySelector("#nav-add-project");
		const cancelBtn = document.querySelector("#add-project-cancel");
		const closeBtn = document.querySelector(
			"#add-project-modal-header-cancel"
		);
		const addBtn = document.querySelector("#add-project-add");

		const title = document.querySelector("#add-project-title");
		const titleError = document.querySelector("#add-project-title-error");

		title.addEventListener("keyup", () => toggleError(title, titleError));
		cancelBtn.addEventListener("click", () =>
			toggleModal(modal, overlayModal)
		);
		closeBtn.addEventListener("click", () =>
			toggleModal(modal, overlayModal)
		);

		openModal.addEventListener("click", () => {
			clearModalValues({ title, titleError, isAddProject: true });
			toggleModal(modal, overlayModal);
		});

		addBtn.addEventListener("click", () => {
			if (!title.value) {
				toggleError(title, titleError);
				return;
			}
			toggleModal(modal, overlayModal);
			pubSub.publish("add-project", title.value);
		});
	}
	function editTask() {
		const modal = document.querySelector("#edit-task-modal");
		const overlayModal = document.querySelector("#edit-task-modal-overlay");
		const cancelBtn = document.querySelector("#edit-task-cancel");
		const closeBtn = document.querySelector(
			"#edit-task-modal-header-cancel"
		);
		const saveBtn = document.querySelector("#edit-task-save");

		const title = document.querySelector("#edit-task-title");
		const titleError = document.querySelector("#edit-task-title-error");
		const dueDate = document.querySelector("#edit-task-due-date");
		const description = document.querySelector("#edit-task-description");
		const priority = document.querySelector("#edit-task-priority");

		const setEditInputValues = (task) => {
			title.value = task.title;
			if (task.dueDate !== "Invalid Date") {
				dueDate.value = formatISO9075(new Date(task.dueDate));
			}
			description.value = task.description;
			priority.value = task.priority;
			toggleError(title, titleError);
		};

		const getCurrentTaskId = () => {
			const { taskId } =
				document.querySelector(".edit-task-active").dataset;
			return +taskId;
		};

		pubSub.subscribe("open-edit-task-modal", () => {
			toggleModal(modal, overlayModal);
			setEditInputValues(Task.taskList[getCurrentTaskId()]);
		});

		title.addEventListener("keyup", () => toggleError(title, titleError));
		cancelBtn.addEventListener("click", () =>
			toggleModal(modal, overlayModal)
		);
		closeBtn.addEventListener("click", () =>
			toggleModal(modal, overlayModal)
		);
		saveBtn.addEventListener("click", () => {
			if (!title.value) {
				toggleError(title, titleError);
				return;
			}
			toggleModal(modal, overlayModal);

			pubSub.publish("edit-task", {
				title: title.value,
				dueDate: new Date(dueDate.value).toString(),
				description: description.value,
				priority: priority.value,
				id: getCurrentTaskId(),
			});
			const currentTask = document.querySelector(".edit-task-active");
			currentTask.classList.remove("edit-task-active");
			pubSub.publish("check-tasks-to-filter");
		});
	}
	function editProject() {
		const modal = document.querySelector("#edit-project-modal");
		const overlayModal = document.querySelector(
			"#edit-project-modal-overlay"
		);
		const cancelBtn = document.querySelector("#edit-project-cancel");
		const closeBtn = document.querySelector(
			"#edit-project-modal-header-cancel"
		);
		const saveBtn = document.querySelector("#edit-project-save");

		const title = document.querySelector("#edit-project-title");
		const titleError = document.querySelector("#edit-project-title-error");

		const setEditInputValues = (task) => {
			title.value = task.title;
			toggleError(title, titleError);
		};

		title.addEventListener("keyup", () => toggleError(title, titleError));
		cancelBtn.addEventListener("click", () =>
			toggleModal(modal, overlayModal)
		);
		closeBtn.addEventListener("click", () =>
			toggleModal(modal, overlayModal)
		);

		saveBtn.addEventListener("click", () => {
			if (!title.value) {
				toggleError(title, titleError);
				return;
			}

			toggleModal(modal, overlayModal);
			const { projectId } = document.querySelector(".selected").dataset;

			pubSub.publish("edit-project", {
				title: title.value,
				id: projectId,
			});
			pubSub.publish("check-tasks-to-filter");
		});

		pubSub.subscribe("open-edit-project-modal", (projectId) => {
			toggleModal(modal, overlayModal);
			setEditInputValues(Project.projectList[projectId]);
		});
	}
	function deleteProject() {
		const modal = document.querySelector("#delete-project-modal");
		const overlayModal = document.querySelector(
			"#delete-project-modal-overlay"
		);

		const cancelBtn = document.querySelector("#delete-project-cancel");
		const closeBtn = document.querySelector(
			"#delete-project-modal-header-cancel"
		);
		const deleteBtn = document.querySelector("#delete-project-confirm");

		pubSub.subscribe("open-delete-project-modal", () => {
			toggleModal(modal, overlayModal);
		});

		cancelBtn.addEventListener("click", () =>
			toggleModal(modal, overlayModal)
		);
		closeBtn.addEventListener("click", () =>
			toggleModal(modal, overlayModal)
		);

		deleteBtn.addEventListener("click", () => {
			toggleModal(modal, overlayModal);
			const { projectId } = document.querySelector(".selected").dataset;

			pubSub.publish("delete-project", +projectId);

			pubSub.publish("delete-project-array", Project.projectList);
			pubSub.publish("delete-project-tasks", +projectId);

			pubSub.publish("update-task-project-id", +projectId);
			pubSub.publish("update-task-id");

			pubSub.publish("populate-projects-dom", Project.projectList);
			pubSub.publish("default-to-inbox-project");
			pubSub.publish("check-tasks-to-filter");
		});
	}

	function render() {
		addTask();
		addProject();
		editTask();
		editProject();
		deleteProject();
	}

	return {
		render,
	};
})();

export default handleModal;
