import pubSub from "../PubSub";

const Project = (() => {
	const projectList = [];

	function updateProjectId() {
		let updatedId = 0;
		projectList.forEach((item) => {
			item.id = updatedId;
			updatedId += 1;
		});
	}

	function addProject(title) {
		projectList.push({ title, id: projectList.length, task: [] });

		pubSub.publish(
			"add-project-array",
			projectList[projectList.length - 1]
		);
		pubSub.publish("add-project-local-storage", {
			key: "project",
			value: projectList,
		});
	}

	function deleteProject(projectId) {
		projectList.splice(projectId, 1);
		updateProjectId();
		pubSub.publish("delete-project-local-storage", {
			key: "project",
			value: projectList,
		});

		console.log(projectList);
	}

	function editProjectTitle(project) {
		projectList[project.id].title = project.title;
		pubSub.publish("edit-project-array", project.id);
		pubSub.publish("edit-project-local-storage", {
			key: "project",
			value: projectList,
		});
	}

	function render() {
		pubSub.subscribe("add-project", addProject);
		pubSub.subscribe("delete-project", deleteProject);
		pubSub.subscribe("edit-project", editProjectTitle);
	}
	return { render, projectList };
})();

export default Project;

// export { addProject, deleteProject, editProjectTitle, projectList };
