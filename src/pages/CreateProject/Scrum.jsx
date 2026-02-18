// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // import Header from "../../components/Header/Header";
// // import ProjectVisibilityToggle from "../../components/ProjectVisibilityToggle/ProjectVisibilityToggle";
// // import ProjectFooterActions from "../../components/ProjectFooterActions/ProjectFooterActions";

// // import "./ProjectForm.css";

// // export default function Scrum() {
// //   const navigate = useNavigate();

// //   const [projectName, setProjectName] = useState("");
// //   const [projectDesc, setProjectDesc] = useState("");

// //   // 🔹 helper to create URL-safe slug
// //   const createSlug = (name) =>
// //     name
// //       .toLowerCase()
// //       .trim()
// //       .replace(/\s+/g, "-")
// //       .replace(/[^a-z0-9-]/g, "");

// //   const handleCreate = () => {
// //     if (!projectName.trim()) {
// //       alert("Project name is required");
// //       return;
// //     }

// //     const slug = createSlug(projectName);

// //     // 👉 Navigate to project workspace (Scrum → Backlog)
// //     navigate(`/project/${slug}/backlog`);
// //   };

// //   return (
// //     <>
// //       <Header variant="dashboard" />

// //       <main className="project-form">
// //         <h1>Scrum</h1>
// //         <p className="subtitle">
// //           Prioritize and solve your tasks in short time cycles.
// //         </p>

// //         <label>New project details</label>

// //         <input
// //           placeholder="Project Name (Required)"
// //           value={projectName}
// //           onChange={(e) => setProjectName(e.target.value)}
// //         />

// //         <textarea
// //           placeholder="Project Description (Required)"
// //           value={projectDesc}
// //           onChange={(e) => setProjectDesc(e.target.value)}
// //         />

// //         <ProjectVisibilityToggle />

// //         <ProjectFooterActions
// //           onBack={() => navigate("/project/new")}
// //           onCreate={handleCreate}
// //         />
// //       </main>
// //     </>
// //   );
// // }

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import Header from "../../components/Header/Header";
// import ProjectVisibilityToggle from "../../components/ProjectVisibilityToggle/ProjectVisibilityToggle";
// import ProjectFooterActions from "../../components/ProjectFooterActions/ProjectFooterActions";
// import { authFetch } from "../../services/api";

// import "./ProjectForm.css";

// export default function Scrum() {
//   const navigate = useNavigate();

//   const [projectName, setProjectName] = useState("");
//   const [projectDesc, setProjectDesc] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // 🔹 helper to create URL-safe slug
//   const createSlug = (name) =>
//     name
//       .toLowerCase()
//       .trim()
//       .replace(/\s+/g, "-")
//       .replace(/[^a-z0-9-]/g, "");

//   const handleCreate = async () => {
//     if (!projectName.trim()) {
//       setError("Project name is required");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     const payload = {
//       name: projectName,
//       slug: createSlug(projectName),
//       // description: projectDesc,   // enable later
//     };

//     try {
//       const res = await authFetch("/projects/", {
//         method: "POST",
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to create project");
//       }

//       const project = await res.json();

//       // ✅ Backend decides the slug
//       navigate(`/project/${project.slug}/backlog`);
//     } catch (err) {
//       console.error(err);
//       setError("Unable to create project. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Header variant="dashboard" />

//       <main className="project-form">
//         <h1>Scrum</h1>
//         <p className="subtitle">
//           Prioritize and solve your tasks in short time cycles.
//         </p>

//         <label>New project details</label>

//         <input
//           placeholder="Project Name (Required)"
//           value={projectName}
//           onChange={(e) => setProjectName(e.target.value)}
//         />

//         <textarea
//           placeholder="Project Description (Required)"
//           value={projectDesc}
//           onChange={(e) => setProjectDesc(e.target.value)}
//         />

//         <ProjectVisibilityToggle />

//         {error && <div className="form-error">{error}</div>}

//         <ProjectFooterActions
//           onBack={() => navigate("/project/new")}
//           onCreate={handleCreate}
//           loading={loading}
//         />
//       </main>
//     </>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header/Header";
import ProjectVisibilityToggle from "../../components/ProjectVisibilityToggle/ProjectVisibilityToggle";
import ProjectFooterActions from "../../components/ProjectFooterActions/ProjectFooterActions";
import { authFetch } from "../../services/authFetch";
import { createProject } from "../../services/projectService";



import "./ProjectForm.css";

export default function Scrum() {
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 helper to create URL-safe slug
  const createSlug = (name) =>
    name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  const handleCreate = async () => {
    if (!projectName.trim()) {
      setError("Project name is required");
      return;
    }

    setLoading(true);
    setError("");

    const payload = {
      name: projectName,
      slug: createSlug(projectName),
      description: projectDesc,
    };

    try {
      const project = await createProject(payload);

      navigate(`/project/${project.slug}/backlog`);
    } catch (err) {
      setError(err.message || "Unable to create project.");
    } finally {
      setLoading(false);
    }
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
          disabled={loading}
        />

        <textarea
          placeholder="Project Description"
          value={projectDesc}
          onChange={(e) => setProjectDesc(e.target.value)}
          disabled={loading}
        />

        <ProjectVisibilityToggle />

        {error && <div className="form-error">{error}</div>}

        <ProjectFooterActions
          onBack={() => navigate("/project/new")}
          onCreate={handleCreate}
          loading={loading}
        />
      </main>
    </>
  );
}
