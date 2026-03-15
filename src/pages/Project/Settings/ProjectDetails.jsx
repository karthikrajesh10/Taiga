// // // // src/pages/Settings/ProjectDetails.jsx
// // // import "./ProjectDetails.css";

// // // export default function ProjectDetails() {
// // //   return (
// // //     <div className="project-details">
// // //       <h2 className="page-title">Project details</h2>

// // //       <div className="project-details__layout">
// // //         {/* LEFT */}
// // //         <div className="project-details__logo">
// // //           <div className="logo-box">
// // //             <span>LOGO</span>
// // //           </div>

// // //           <button className="secondary-btn">CHANGE LOGO</button>
// // //           <button className="link-btn">Use default image</button>
// // //         </div>

// // //         {/* RIGHT */}
// // //         <div className="project-details__form">
// // //           <div className="form-group">
// // //             <label>Project name</label>
// // //             <input type="text" value="Sample" readOnly />
// // //           </div>

// // //           <div className="form-group">
// // //             <label>Description</label>
// // //             <textarea rows="4" defaultValue="Demo" />
// // //           </div>

// // //           <div className="form-group">
// // //             <label>Tags</label>
// // //             <button className="link-btn">Add tag +</button>
// // //           </div>

// // //           <hr />

// // //           <div className="owner">
// // //             <strong>Project owner</strong>
// // //             <div className="owner-card">
// // //               <div className="avatar">A</div>
// // //               <div>
// // //                 <div className="name">admin</div>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           <div className="toggle-row">
// // //             <span>Is this project looking for people?</span>
// // //             <input type="checkbox" />
// // //           </div>

// // //           <div className="toggle-row">
// // //             <span>Receive feedback from Taiga users?</span>
// // //             <input type="checkbox" defaultChecked />
// // //           </div>

// // //           <div className="visibility">
// // //             <button className="primary-btn active">PUBLIC PROJECT</button>
// // //             <button className="secondary-btn">PRIVATE PROJECT</button>
// // //           </div>

// // //           <button className="save-btn">SAVE</button>

// // //           <button className="danger-link">Delete this project</button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // src/pages/Settings/ProjectDetails.jsx
// // import { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import {
// //   getProjectBySlug,
// //   updateProject,
// //   deleteProject,
// // } from "../../services/projectService";
// // import "./ProjectDetails.css";

// // export default function ProjectDetails() {
// //   const { slug } = useParams();
// //   const navigate = useNavigate();

// //   const user = JSON.parse(localStorage.getItem("user"));
// //   const canEdit =
// //     user?.is_superuser === true || user?.role === "PM";

// //   const [project, setProject] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   const [name, setName] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [editingName, setEditingName] = useState(false);
// //   const [editingDesc, setEditingDesc] = useState(false);
// //   const [dirty, setDirty] = useState(false);
// //   const [saving, setSaving] = useState(false);

// //   /* ── load ── */
// //   useEffect(() => {
// //     const load = async () => {
// //       try {
// //         const data = await getProjectBySlug(slug);
// //         setProject(data);
// //         setName(data?.name || "");
// //         setDescription(data?.description || "");
// //       } catch (err) {
// //         console.error("Failed to load project", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     load();
// //   }, [slug]);

// //   /* ── save ── */
// //   const handleSave = async () => {
// //     if (!project) return;
// //     setSaving(true);
// //     try {
// //       const updated = await updateProject(project.id, {
// //         name,
// //         description,
// //       });
// //       setProject(updated);
// //       setDirty(false);
// //       setEditingName(false);
// //       setEditingDesc(false);
// //     } catch (err) {
// //       console.error("Failed to save project", err);
// //       alert("Failed to save changes.");
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   /* ── delete ── */
// //   const handleDelete = async () => {
// //     if (!window.confirm("Are you sure you want to delete this project? This cannot be undone.")) return;
// //     try {
// //       await deleteProject(project.id);
// //       navigate("/");
// //     } catch (err) {
// //       console.error("Failed to delete project", err);
// //       alert("Failed to delete project.");
// //     }
// //   };

// //   if (loading) return <div className="project-details">Loading…</div>;
// //   if (!project) return <div className="project-details">Project not found.</div>;

// //   const ownerUsername =
// //     project.owner?.username ||
// //     project.owner_username ||
// //     project.owner_name ||
// //     "Unknown";

// //   const ownerInitial = ownerUsername.charAt(0).toUpperCase();

// //   return (
// //     <div className="project-details">
// //       <h2 className="page-title">Project details</h2>

// //       <div className="project-details__layout">
// //         {/* ── LEFT: logo ── */}
// //         <div className="project-details__logo">
// //           <div className="logo-box">
// //             <span>{name.charAt(0).toUpperCase() || "P"}</span>
// //           </div>
// //           {canEdit && (
// //             <>
// //               <button className="secondary-btn">CHANGE LOGO</button>
// //               <button className="link-btn">Use default image</button>
// //             </>
// //           )}
// //         </div>

// //         {/* ── RIGHT: form ── */}
// //         <div className="project-details__form">

// //           {/* Project name */}
// //           <div className="form-group">
// //             <label>Project name</label>
// //             {canEdit && editingName ? (
// //               <input
// //                 type="text"
// //                 value={name}
// //                 autoFocus
// //                 onChange={(e) => { setName(e.target.value); setDirty(true); }}
// //                 onBlur={() => setEditingName(false)}
// //                 onKeyDown={(e) => {
// //                   if (e.key === "Enter") setEditingName(false);
// //                   if (e.key === "Escape") { setName(project.name); setEditingName(false); }
// //                 }}
// //               />
// //             ) : (
// //               <div
// //                 className={`field-display ${canEdit ? "field-display--editable" : ""}`}
// //                 onClick={() => canEdit && setEditingName(true)}
// //                 title={canEdit ? "Click to edit" : undefined}
// //               >
// //                 {name}
// //                 {canEdit && <span className="edit-hint">✎</span>}
// //               </div>
// //             )}
// //           </div>

// //           {/* Description */}
// //           <div className="form-group">
// //             <label>Description</label>
// //             {canEdit && editingDesc ? (
// //               <textarea
// //                 rows="4"
// //                 value={description}
// //                 autoFocus
// //                 onChange={(e) => { setDescription(e.target.value); setDirty(true); }}
// //                 onBlur={() => setEditingDesc(false)}
// //                 onKeyDown={(e) => {
// //                   if (e.key === "Escape") { setDescription(project.description || ""); setEditingDesc(false); }
// //                 }}
// //               />
// //             ) : (
// //               <div
// //                 className={`field-display field-display--multiline ${canEdit ? "field-display--editable" : ""}`}
// //                 onClick={() => canEdit && setEditingDesc(true)}
// //                 title={canEdit ? "Click to edit" : undefined}
// //               >
// //                 {description || <span className="placeholder">No description</span>}
// //                 {canEdit && <span className="edit-hint">✎</span>}
// //               </div>
// //             )}
// //           </div>

// //           {/* Tags */}
// //           <div className="form-group">
// //             <label>Tags</label>
// //             <button className="link-btn">Add tag +</button>
// //           </div>

// //           <hr />

// //           {/* Owner */}
// //           <div className="owner">
// //             <strong>Project owner</strong>
// //             <div className="owner-card">
// //               <div className="avatar">{ownerInitial}</div>
// //               <div>
// //                 <div className="name">{ownerUsername}</div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Toggles */}
// //           <div className="toggle-row">
// //             <span>Is this project looking for people?</span>
// //             <input type="checkbox" />
// //           </div>

// //           <div className="toggle-row">
// //             <span>Receive feedback from Taiga users?</span>
// //             <input type="checkbox" defaultChecked />
// //           </div>

// //           {/* Visibility */}
// //           <div className="visibility">
// //             <button className="primary-btn active">PUBLIC PROJECT</button>
// //             <button className="secondary-btn">PRIVATE PROJECT</button>
// //           </div>

// //           {/* Save — canEdit only */}
// //           {canEdit && (
// //             <button
// //               className="save-btn"
// //               onClick={handleSave}
// //               disabled={!dirty || saving}
// //             >
// //               {saving ? "Saving…" : "SAVE"}
// //             </button>
// //           )}

// //           {/* Delete — canEdit only */}
// //           {canEdit && (
// //             <button className="danger-link" onClick={handleDelete}>
// //               Delete this project
// //             </button>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// // src/pages/Settings/ProjectDetails.jsx
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   getProjectBySlug,
//   updateProject,
//   deleteProject,
// } from "../../services/projectService";
// import "./ProjectDetails.css";

// export default function ProjectDetails() {
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user"));
//   const canEdit =
//     user?.is_superuser === true || user?.role === "PM";

//   const [project, setProject] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [editingName, setEditingName] = useState(false);
//   const [editingDesc, setEditingDesc] = useState(false);
//   const [dirty, setDirty] = useState(false);
//   const [saving, setSaving] = useState(false);

//   /* ── load ── */
//   useEffect(() => {
//     const load = async () => {
//       try {
//         const data = await getProjectBySlug(slug);
//         setProject(data);
//         setName(data?.name || "");
//         setDescription(data?.description || "");
//       } catch (err) {
//         console.error("Failed to load project", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, [slug]);

//   /* ── save ── */
//   const handleSave = async () => {
//     if (!project) return;
//     setSaving(true);
//     try {
//       const updated = await updateProject(project.id, {
//         name,
//         description,
//       });
//       setProject(updated);
//       setDirty(false);
//       setEditingName(false);
//       setEditingDesc(false);
//     } catch (err) {
//       console.error("Failed to save project", err);
//       alert("Failed to save changes.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* ── delete ── */
//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this project? This cannot be undone.")) return;
//     try {
//       await deleteProject(project.id);
//       navigate("/");
//     } catch (err) {
//       console.error("Failed to delete project", err);
//       alert("Failed to delete project.");
//     }
//   };

//   if (loading) return <div className="project-details">Loading…</div>;
//   if (!project) return <div className="project-details">Project not found.</div>;

//   const ownerUsername =
//     project.owner?.username ||
//     project.owner_username ||
//     project.owner_name ||
//     "Unknown";

//   const ownerInitial = ownerUsername.charAt(0).toUpperCase();

//   return (
//     <div className="project-details">
//       <h2 className="page-title">Project details</h2>

//       <div className="project-details__layout">
//         {/* ── LEFT: logo ── */}
//         <div className="project-details__logo">
//           <div className="logo-box">
//             <span>{name.charAt(0).toUpperCase() || "P"}</span>
//           </div>
//           {canEdit && (
//             <>
//               <button className="secondary-btn">CHANGE LOGO</button>
//               <button className="link-btn">Use default image</button>
//             </>
//           )}
//         </div>

//         {/* ── RIGHT: form ── */}
//         <div className="project-details__form">

//           {/* Project name */}
//           <div className="form-group">
//             <label>Project name</label>
//             {canEdit && editingName ? (
//               <input
//                 type="text"
//                 value={name}
//                 autoFocus
//                 onChange={(e) => { setName(e.target.value); setDirty(true); }}
//                 onBlur={() => setEditingName(false)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") setEditingName(false);
//                   if (e.key === "Escape") { setName(project.name); setEditingName(false); }
//                 }}
//               />
//             ) : (
//               <div
//                 className={`field-display ${canEdit ? "field-display--editable" : ""}`}
//                 onClick={() => canEdit && setEditingName(true)}
//                 title={canEdit ? "Click to edit" : undefined}
//               >
//                 {name}
//                 {canEdit && <span className="edit-hint">✎</span>}
//               </div>
//             )}
//           </div>

//           {/* Description */}
//           <div className="form-group">
//             <label>Description</label>
//             {canEdit && editingDesc ? (
//               <textarea
//                 rows="4"
//                 value={description}
//                 autoFocus
//                 onChange={(e) => { setDescription(e.target.value); setDirty(true); }}
//                 onBlur={() => setEditingDesc(false)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Escape") { setDescription(project.description || ""); setEditingDesc(false); }
//                 }}
//               />
//             ) : (
//               <div
//                 className={`field-display field-display--multiline ${canEdit ? "field-display--editable" : ""}`}
//                 onClick={() => canEdit && setEditingDesc(true)}
//                 title={canEdit ? "Click to edit" : undefined}
//               >
//                 {description || <span className="placeholder">No description</span>}
//                 {canEdit && <span className="edit-hint">✎</span>}
//               </div>
//             )}
//           </div>

//           {/* Tags */}
//           <div className="form-group">
//             <label>Tags</label>
//             <button className="link-btn">Add tag +</button>
//           </div>

//           <hr />

//           {/* Owner */}
//           <div className="owner">
//             <strong>Project owner</strong>
//             <div className="owner-card">
//               <div className="avatar">{ownerInitial}</div>
//               <div>
//                 <div className="name">{ownerUsername}</div>
//               </div>
//             </div>
//           </div>

//           {/* Toggles */}
//           <div className="toggle-row">
//             <span>Is this project looking for people?</span>
//             <input type="checkbox" />
//           </div>

//           <div className="toggle-row">
//             <span>Receive feedback from Taiga users?</span>
//             <input type="checkbox" defaultChecked />
//           </div>

//           {/* Visibility */}
//           <div className="visibility">
//             <button className="primary-btn active">PUBLIC PROJECT</button>
//             <button className="secondary-btn">PRIVATE PROJECT</button>
//           </div>

//           {/* Save — canEdit only */}
//           {canEdit && (
//             <button
//               className="save-btn"
//               onClick={handleSave}
//               disabled={!dirty || saving}
//             >
//               {saving ? "Saving…" : "SAVE"}
//             </button>
//           )}

//           {/* Delete — canEdit only */}
//           {canEdit && (
//             <button className="danger-link" onClick={handleDelete}>
//               Delete this project
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// src/pages/Settings/ProjectDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProjectBySlug,
  updateProject,
  deleteProject,
} from "../../../services/projectService";
import "./ProjectDetails.css";
import { getUsers } from "../../../services/userService";

export default function ProjectDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const canEdit =
    user?.is_superuser === true || user?.role === "PM";

  const canViewOwner = user?.is_superuser === true || user?.role === "PM";
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [owner, setOwner] = useState(null);

  /* ── load ── */
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProjectBySlug(slug);
        setProject(data);
        setName(data?.name || "");
        setDescription(data?.description || "");
      } catch (err) {
        console.error("Failed to load project", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);
  useEffect(() => {
      if (!project?.created_by || !canViewOwner) return;
      const loadOwner = async () => {
        try {
          const users = await getUsers();
          const found = users.find(u => String(u.id) === String(project.created_by));
          setOwner(found || null);
        } catch (err) {
          console.error("Failed to load owner", err);
        }
      };
      loadOwner();
    }, [project?.created_by]);

  /* ── save ── */
  const handleSave = async () => {
    if (!project) return;
    setSaving(true);
    try {
      const updated = await updateProject(project.id, {
        name,
        description,
      });
      setProject(updated);
      setDirty(false);
      setEditingName(false);
      setEditingDesc(false);
    } catch (err) {
      console.error("Failed to save project", err);
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  /* ── delete ── */
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this project? This cannot be undone.")) return;
    try {
      await deleteProject(project.id);
      navigate("/");
    } catch (err) {
      console.error("Failed to delete project", err);
      alert("Failed to delete project.");
    }
  };

  if (loading) return <div className="project-details">Loading…</div>;
  if (!project) return <div className="project-details">Project not found.</div>;

  // const ownerUsername =
  //   project.owner?.username ||
  //   project.owner_username ||
  //   project.owner_name ||
  //   "Unknown";

  // const ownerInitial = ownerUsername.charAt(0).toUpperCase();

  return (
    <div className="project-details">
      <h2 className="page-title">Project details</h2>

      <div className="project-details__layout">
        {/* ── LEFT: logo ── */}
        <div className="project-details__logo">
          <div className="logo-box">
            <span>{name.charAt(0).toUpperCase() || "P"}</span>
          </div>
          {canEdit && (
            <>
              <button className="secondary-btn">CHANGE LOGO</button>
              <button className="link-btn">Use default image</button>
            </>
          )}
        </div>

        {/* ── RIGHT: form ── */}
        <div className="project-details__form">

          {/* Project name */}
          <div className="form-group">
            <label>Project name</label>
            {canEdit && editingName ? (
              <input
                type="text"
                value={name}
                autoFocus
                onChange={(e) => { setName(e.target.value); setDirty(true); }}
                onBlur={() => setEditingName(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setEditingName(false);
                  if (e.key === "Escape") { setName(project.name); setEditingName(false); }
                }}
              />
            ) : (
              <div
                className={`field-display ${canEdit ? "field-display--editable" : ""}`}
                onClick={() => canEdit && setEditingName(true)}
                title={canEdit ? "Click to edit" : undefined}
              >
                {name}
                {canEdit && <span className="edit-hint">✎</span>}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            {canEdit && editingDesc ? (
              <textarea
                rows="4"
                value={description}
                autoFocus
                onChange={(e) => { setDescription(e.target.value); setDirty(true); }}
                onBlur={() => setEditingDesc(false)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") { setDescription(project.description || ""); setEditingDesc(false); }
                }}
              />
            ) : (
              <div
                className={`field-display field-display--multiline ${canEdit ? "field-display--editable" : ""}`}
                onClick={() => canEdit && setEditingDesc(true)}
                title={canEdit ? "Click to edit" : undefined}
              >
                {description || <span className="placeholder">No description</span>}
                {canEdit && <span className="edit-hint">✎</span>}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="form-group">
            <label>Tags</label>
            <button className="link-btn">Add tag +</button>
          </div>

          <hr />

          {/* Owner */}
          {canViewOwner && (
            <div className="owner">
              <strong>Project owner</strong>
              <div className="owner-card">
                <div className="avatar">
                  {owner?.username?.charAt(0).toUpperCase() ?? "?"}
                </div>
                <div>
                  <div className="name">{owner?.username ?? `User #${project.created_by}`}</div>
                  {owner?.email && (
                    <div style={{ fontSize: "12px", color: "#6b778c" }}>{owner.email}</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Toggles */}
          <div className="toggle-row">
            <span>Is this project looking for people?</span>
            <input type="checkbox" />
          </div>

          <div className="toggle-row">
            <span>Receive feedback from Taiga users?</span>
            <input type="checkbox" defaultChecked />
          </div>

          {/* Visibility */}
          <div className="visibility">
            <button className="primary-btn active">PUBLIC PROJECT</button>
            <button className="secondary-btn">PRIVATE PROJECT</button>
          </div>

          {/* Save — canEdit only */}
          {canEdit && (
            <button
              className="save-btn"
              onClick={handleSave}
              disabled={!dirty || saving}
            >
              {saving ? "Saving…" : "SAVE"}
            </button>
          )}

          {/* Delete — canEdit only */}
          {canEdit && (
            <button className="danger-link" onClick={handleDelete}>
              Delete this project
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
