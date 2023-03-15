import pubSub from "../PubSub";
import TaskUI from "./TaskUI";

const navigation = (() => {
	const getSelectedProject = () => document.querySelector(".selected");

	const getMainTitle = () => document.querySelector("#main-title");

	function updateMainTitle() {
		const currentSelectedTitle = document.querySelector(
			".selected .projects-item-name"
		);
		const mainTitle = getMainTitle();
		mainTitle.textContent = currentSelectedTitle.textContent;
	}

	function defaultToInboxProject() {
		const inbox = document.querySelector("[data-main-project-id='0']");

		inbox.classList.add("selected");
		updateMainTitle();
	}

	function styleSelectedProject(e) {
		const currentSelectedProject = getSelectedProject();
		const newProjectToSelect = e.target.closest(".projects-item");

		if (currentSelectedProject === newProjectToSelect) return;
		if (currentSelectedProject) {
			currentSelectedProject.classList.remove("selected");
		}

		newProjectToSelect.classList.add("selected");
	}

	function switchProject(e) {
		styleSelectedProject(e);
		updateMainTitle();
		TaskUI.checkTasksToFilter();
	}

	function toggleNavigation() {
		const taskSection = document.querySelector("#task-section");
		const nav = document.querySelector("nav");

		function setNavValue() {
			let { navOpened } = taskSection.dataset;
			navOpened = navOpened === "true" ? "false" : "true";
			taskSection.dataset.navOpened = navOpened;
		}

		function toggleNavigationBar() {
			nav.classList.toggle("hide");
			setNavValue();
		}

		
		const headerHamburgerMenu = document.querySelector(
			"#header-hamburger-menu"
		);

		
		headerHamburgerMenu.addEventListener("click", toggleNavigationBar);
	}
	function render() {
		toggleNavigation();

		const mainProjects = document.querySelector("#main-projects-list");
		mainProjects.addEventListener("click", (e) => switchProject(e));
		pubSub.subscribe("project-selected", switchProject);
		pubSub.subscribe("default-to-inbox-project", defaultToInboxProject);
	}
	return { render };
})();

export default navigation;
