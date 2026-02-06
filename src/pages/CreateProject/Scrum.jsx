import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header/Header";
import ProjectVisibilityToggle from "../../components/ProjectVisibilityToggle/ProjectVisibilityToggle";
import ProjectFooterActions from "../../components/ProjectFooterActions/ProjectFooterActions";

import "./ProjectForm.css";

export default function Scrum() {
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");

  // 🔹 helper to create URL-safe slug
  const createSlug = (name) =>
    name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  const handleCreate = () => {
    if (!projectName.trim()) {
      alert("Project name is required");
      return;
    }

    const slug = createSlug(projectName);

    // 👉 Navigate to project workspace (Scrum → Backlog)
    navigate(`/project/${slug}/backlog`);
  };

  return (
    <>
      <Header variant="dashboard" />

      <main className="project-form">
        <h1>Scrum</h1>
        <p className="subtitle">
          Prioritize and solve your tasks in short time cycles.
        </p>

        <label>New project details</label>

        <input
          placeholder="Project Name (Required)"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />

        <textarea
          placeholder="Project Description (Required)"
          value={projectDesc}
          onChange={(e) => setProjectDesc(e.target.value)}
        />

        <ProjectVisibilityToggle />

        <ProjectFooterActions
          onBack={() => navigate("/project/new")}
          onCreate={handleCreate}
        />
      </main>
    </>
  );
}