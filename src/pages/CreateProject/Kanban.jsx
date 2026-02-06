import Header from "../../components/Header/Header";
import ProjectVisibilityToggle from "../../components/ProjectVisibilityToggle/ProjectVisibilityToggle";
import ProjectFooterActions from "../../components/ProjectFooterActions/ProjectFooterActions";
import "./ProjectForm.css";

export default function Kanban() {
  return (
    <>
      <Header variant="dashboard" />

      <main className="project-form">
        <h1>Kanban</h1>
        <p className="subtitle">
          Keep a constant workflow on independent tasks
        </p>

        <label>New project details</label>

        <input placeholder="Project Name (Required)" />
        <textarea placeholder="Project Description (Required)" />

        <ProjectVisibilityToggle/>

        <ProjectFooterActions />
      </main>
    </>
  );
}