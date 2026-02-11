// // // // // // src/pages/Project/Backlog.jsx
// // // // // import "./Backlog.css";

// // // // // export default function Backlog() {
// // // // //   // ---- stub handlers (future use) ----
// // // // //   const onAddSprint = () => {};
// // // // //   const onAddUserStory = () => {};
// // // // //   const onOpenFilters = () => {};
// // // // //   const onSearch = () => {};

// // // // //   return (
// // // // //     <div className="backlog">
// // // // //       {/* ===== TOP: Scrum header ===== */}
// // // // //       <div className="backlog__header">
// // // // //         <h2>Scrum</h2>

// // // // //         <div className="backlog__stats">
// // // // //           <div className="progress-box" />
// // // // //           <div className="stats-text">
// // // // //             <span className="percent">0%</span>
// // // // //             <span>0 defined points</span>
// // // // //             <span>0 closed points</span>
// // // // //             <span>0 points / sprint</span>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* ===== GRAPH + SPRINTS ===== */}
// // // // //       <div className="backlog__top">
// // // // //         <div className="graph-hint">
// // // // //           <div className="bars" />
// // // // //           <div>
// // // // //             <strong>CUSTOMIZE YOUR BACKLOG GRAPH</strong>
// // // // //             <p>
// // // // //               To have a nice graph that helps you follow the evolution of the
// // // // //               project you have to set up the points and sprints through the{" "}
// // // // //               <span className="link">Admin</span>
// // // // //             </p>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="sprints">
// // // // //           <h4>SPRINTS</h4>
// // // // //           <p className="empty-text">There are no sprints yet</p>
// // // // //           <button className="link-btn" onClick={onAddSprint}>
// // // // //             Add a sprint +
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* ===== BACKLOG LIST ===== */}
// // // // //       <div className="backlog__list">
// // // // //         <div className="list-header">
// // // // //           <h3>
// // // // //             Backlog <span className="muted">0 user stories</span>
// // // // //           </h3>

// // // // //           <div className="list-actions">
// // // // //             <button className="primary-btn" onClick={onAddUserStory}>
// // // // //               + USER STORY
// // // // //             </button>
// // // // //             <button className="icon-btn">≡</button>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="list-toolbar">
// // // // //           <button className="filter-btn" onClick={onOpenFilters}>
// // // // //             Filters
// // // // //           </button>
// // // // //           <input
// // // // //             placeholder="subject or reference"
// // // // //             onChange={onSearch}
// // // // //           />
// // // // //         </div>

// // // // //         {/* ===== EMPTY STATE ===== */}
// // // // //         <div className="empty-state">
// // // // //           <p>The backlog is empty!</p>
// // // // //           <button className="primary-btn" onClick={onAddUserStory}>
// // // // //             + ADD A USER STORY
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // // src/pages/Project/Backlog.jsx
// // // // import { useState } from "react";
// // // // import UserStoryModal from "../../components/UserStoryModal/UserStoryModal";
// // // // import "./Backlog.css";

// // // // export default function Backlog() {
// // // //   const [showModal, setShowModal] = useState(false);

// // // //   // ---- handlers ----
// // // //   const onAddSprint = () => {};
// // // //   const onAddUserStory = () => setShowModal(true);
// // // //   const onCloseModal = () => setShowModal(false);
// // // //   const onOpenFilters = () => {};
// // // //   const onSearch = () => {};

// // // //   return (
// // // //     <>
// // // //       <div className="backlog">
// // // //         {/* ===== TOP: Scrum header ===== */}
// // // //         <div className="backlog__header">
// // // //           <h2>Scrum</h2>

// // // //           <div className="backlog__stats">
// // // //             <div className="progress-box" />
// // // //             <div className="stats-text">
// // // //               <span className="percent">0%</span>
// // // //               <span>0 defined points</span>
// // // //               <span>0 closed points</span>
// // // //               <span>0 points / sprint</span>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* ===== GRAPH + SPRINTS ===== */}
// // // //         <div className="backlog__top">
// // // //           <div className="graph-hint">
// // // //             <div className="bars" />
// // // //             <div>
// // // //               <strong>CUSTOMIZE YOUR BACKLOG GRAPH</strong>
// // // //               <p>
// // // //                 To have a nice graph that helps you follow the evolution of the
// // // //                 project you have to set up the points and sprints through the{" "}
// // // //                 <span className="link">Admin</span>
// // // //               </p>
// // // //             </div>
// // // //           </div>

// // // //           <div className="sprints">
// // // //             <h4>SPRINTS</h4>
// // // //             <p className="empty-text">There are no sprints yet</p>
// // // //             <button className="link-btn" onClick={onAddSprint}>
// // // //               Add a sprint +
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         {/* ===== BACKLOG LIST ===== */}
// // // //         <div className="backlog__list">
// // // //           <div className="list-header">
// // // //             <h3>
// // // //               Backlog <span className="muted">0 user stories</span>
// // // //             </h3>

// // // //             <div className="list-actions">
// // // //               <button className="primary-btn" onClick={onAddUserStory}>
// // // //                 + USER STORY
// // // //               </button>
// // // //               <button className="icon-btn">≡</button>
// // // //             </div>
// // // //           </div>

// // // //           <div className="list-toolbar">
// // // //             <button className="filter-btn" onClick={onOpenFilters}>
// // // //               Filters
// // // //             </button>
// // // //             <input
// // // //               placeholder="subject or reference"
// // // //               onChange={onSearch}
// // // //             />
// // // //           </div>

// // // //           {/* ===== EMPTY STATE ===== */}
// // // //           <div className="empty-state">
// // // //             <p>The backlog is empty!</p>
// // // //             <button className="primary-btn" onClick={onAddUserStory}>
// // // //               + ADD A USER STORY
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* ===== MODAL ===== */}
// // // //       {showModal && <UserStoryModal onClose={onCloseModal} />}
// // // //     </>
// // // //   );
// // // // }

// // // // src/pages/Project/Backlog.jsx
// // // // src/pages/Project/Backlog.jsx

// // // import { useState } from "react";
// // // import { useNavigate, useParams } from "react-router-dom";
// // // import UserStoryModal from "../../components/UserStoryModal/UserStoryModal";
// // // import "./Backlog.css";

// // // const STATUS_OPTIONS = ["New", "Ready", "In Progress", "Done"];
// // // const POINT_OPTIONS = ["?", 1, 2, 3, 5, 8];

// // // export default function Backlog() {
// // //   const [showModal, setShowModal] = useState(false);
// // //   const [editStory, setEditStory] = useState(null);
// // //   const [stories, setStories] = useState([]);

// // //   const navigate = useNavigate();
// // //   const { slug } = useParams();

// // //   // ---- handlers ----
// // //   const onAddSprint = () => {};
// // //   const onAddUserStory = () => {
// // //     setEditStory(null);
// // //     setShowModal(true);
// // //   };
// // //   const onCloseModal = () => setShowModal(false);
// // //   const onOpenFilters = () => {};
// // //   const onSearch = () => {};

// // //   // CREATE / UPDATE
// // //   const onCreateStory = (story) => {
// // //     if (editStory) {
// // //       setStories((prev) =>
// // //         prev.map((s) => (s.id === editStory.id ? { ...s, ...story } : s))
// // //       );
// // //     } else {
// // //       setStories((prev) => [
// // //         ...prev,
// // //         {
// // //           id: prev.length + 1,
// // //           status: "New",
// // //           points: "?",
// // //           ...story,
// // //         },
// // //       ]);
// // //     }
// // //     setShowModal(false);
// // //   };

// // //   // STATUS CHANGE
// // //   const updateStatus = (id, status) => {
// // //     setStories((prev) =>
// // //       prev.map((s) => (s.id === id ? { ...s, status } : s))
// // //     );
// // //   };

// // //   // POINTS CHANGE
// // //   const updatePoints = (id, points) => {
// // //     setStories((prev) =>
// // //       prev.map((s) => (s.id === id ? { ...s, points } : s))
// // //     );
// // //   };

// // //   // DRAG & DROP
// // //   const onDragStart = (e, index) => {
// // //     e.dataTransfer.setData("index", index);
// // //   };

// // //   const onDrop = (e, index) => {
// // //     const fromIndex = e.dataTransfer.getData("index");
// // //     if (fromIndex === null) return;

// // //     const updated = [...stories];
// // //     const [moved] = updated.splice(fromIndex, 1);
// // //     updated.splice(index, 0, moved);
// // //     setStories(updated);
// // //   };

// // //   return (
// // //     <>
// // //       <div className="backlog">
// // //         {/* ===== SCRUM HEADER ===== */}
// // //         <div className="backlog__header">
// // //           <h2>Scrum</h2>
// // //           <div className="backlog__stats">
// // //             <div className="progress-box" />
// // //             <div className="stats-text">
// // //               <span className="percent">0%</span>
// // //               <span>0 defined points</span>
// // //               <span>0 closed points</span>
// // //               <span>0 points / sprint</span>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* ===== GRAPH + SPRINTS ===== */}
// // //         <div className="backlog__top">
// // //           <div className="graph-hint">
// // //             <div className="bars" />
// // //             <div>
// // //               <strong>CUSTOMIZE YOUR BACKLOG GRAPH</strong>
// // //               <p>
// // //                 To have a nice graph that helps you follow the evolution of the
// // //                 project you have to set up the points and sprints through the{" "}
// // //                 <span className="link">Admin</span>
// // //               </p>
// // //             </div>
// // //           </div>

// // //           <div className="sprints">
// // //             <h4>SPRINTS</h4>
// // //             <p className="empty-text">There are no sprints yet</p>
// // //             <button className="link-btn" onClick={onAddSprint}>
// // //               Add a sprint +
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* ===== BACKLOG LIST ===== */}
// // //         <div className="backlog__list">
// // //           <div className="list-header">
// // //             <h3>
// // //               Backlog{" "}
// // //               <span className="muted">{stories.length} user stories</span>
// // //             </h3>

// // //             <div className="list-actions">
// // //               <button className="primary-btn" onClick={onAddUserStory}>
// // //                 + USER STORY
// // //               </button>
// // //               <button className="icon-btn">≡</button>
// // //             </div>
// // //           </div>

// // //           <div className="list-toolbar">
// // //             <button className="filter-btn" onClick={onOpenFilters}>
// // //               Filters
// // //             </button>
// // //             <input
// // //               placeholder="subject or reference"
// // //               onChange={onSearch}
// // //             />
// // //           </div>

// // //           {/* ===== LIST ===== */}
// // //           {stories.length === 0 ? (
// // //             <div className="empty-state">
// // //               <p>The backlog is empty!</p>
// // //               <button className="primary-btn" onClick={onAddUserStory}>
// // //                 + ADD A USER STORY
// // //               </button>
// // //             </div>
// // //           ) : (
// // //             <div className="story-list">
// // //               {stories.map((story, index) => (
// // //                 <div
// // //                   key={story.id}
// // //                   className="story-row"
// // //                   draggable
// // //                   onDragStart={(e) => onDragStart(e, index)}
// // //                   onDragOver={(e) => e.preventDefault()}
// // //                   onDrop={(e) => onDrop(e, index)}
// // //                   // onClick={() => {
// // //                   //   setEditStory(story);
// // //                   //   setShowModal(true);
// // //                   // }}
// // //                   onClick={() => navigate(`/project/${slug}/us/${story.id}`)}
// // //                 >
// // //                   {/* LEFT */}
// // //                   <div className="story-left">
// // //                     <span className="drag">⋮⋮</span>
// // //                     <input type="checkbox" />
// // //                     <span className="story-id">#{story.id}</span>
// // //                     <span className="story-title">{story.subject}</span>
// // //                   </div>

// // //                   {/* RIGHT */}
// // //                   <div className="story-right" onClick={(e) => e.stopPropagation()}>
// // //                     {/* STATUS */}
// // //                     <select
// // //                       className="story-status"
// // //                       value={story.status}
// // //                       onChange={(e) =>
// // //                         updateStatus(story.id, e.target.value)
// // //                       }
// // //                     >
// // //                       {STATUS_OPTIONS.map((s) => (
// // //                         <option key={s}>{s}</option>
// // //                       ))}
// // //                     </select>

// // //                     {/* POINTS */}
// // //                     <select
// // //                       className="story-points"
// // //                       value={story.points}
// // //                       onChange={(e) =>
// // //                         updatePoints(story.id, e.target.value)
// // //                       }
// // //                     >
// // //                       {POINT_OPTIONS.map((p) => (
// // //                         <option key={p}>{p}</option>
// // //                       ))}
// // //                     </select>

// // //                     <span className="story-menu">⋮</span>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* ===== MODAL ===== */}
// // //       {showModal && (
// // //         <UserStoryModal
// // //           onClose={onCloseModal}
// // //           onCreate={onCreateStory}
// // //           story={editStory}
// // //         />
// // //       )}
// // //     </>
// // //   );
// // // }

// // import { useEffect, useState } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import UserStoryModal from "../../components/UserStoryModal/UserStoryModal";
// // import { authFetch } from "../../services/api";
// // import "./Backlog.css";

// // const STATUS_OPTIONS = ["New", "Ready", "In Progress", "Done"];
// // const POINT_OPTIONS = ["?", 1, 2, 3, 5, 8];

// // export default function Backlog() {
// //   const [showModal, setShowModal] = useState(false);
// //   const [stories, setStories] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [projectId, setProjectId] = useState(null); // ✅ IMPORTANT

// //   const navigate = useNavigate();
// //   const { slug } = useParams();

// //   /* ================= FETCH PROJECT ID ================= */

// //   useEffect(() => {
// //     fetchProject();
// //   }, [slug]);

// //   const fetchProject = async () => {
// //     try {
// //       const res = await authFetch(`/projects/?slug=${slug}`);
// //       if (!res.ok) throw new Error("Failed to fetch project");

// //       const data = await res.json();
// //       if (data.length > 0) {
// //         setProjectId(data[0].id); // ✅ store ID
// //       }
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   /* ================= FETCH STORIES ================= */

// //   useEffect(() => {
// //     if (!projectId) return;
// //     loadStories();
// //   }, [projectId]);

// //   const loadStories = async () => {
// //     try {
// //       setLoading(true);

// //       const res = await authFetch(
// //         `/userstories/?project__slug=${slug}`
// //       );
// //       if (!res.ok) throw new Error("Failed to load user stories");

// //       const data = await res.json();
// //       setStories(data);
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   /* ================= CREATE STORY ================= */

// //   const onCreateStory = async (story) => {
// //     try {
// //       const res = await authFetch("/userstories/", {
// //         method: "POST",
// //         body: JSON.stringify({
// //           subject: story.subject,
// //           description: story.description,
// //           status: story.status,
// //           project: projectId, // ✅ FIXED
// //         }),
// //       });

// //       if (!res.ok) throw new Error("Failed to create user story");

// //       const created = await res.json();
// //       setStories((prev) => [...prev, created]);
// //       setShowModal(false);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   /* ================= UPDATE STATUS ================= */

// //   const updateStatus = async (id, status) => {
// //     setStories((prev) =>
// //       prev.map((s) => (s.id === id ? { ...s, status } : s))
// //     );

// //     try {
// //       await authFetch(`/userstories/${id}/`, {
// //         method: "PATCH",
// //         body: JSON.stringify({ status }),
// //       });
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   /* ================= POINTS (UI ONLY) ================= */

// //   const updatePoints = (id, points) => {
// //     setStories((prev) =>
// //       prev.map((s) => (s.id === id ? { ...s, points } : s))
// //     );
// //   };

// //   /* ================= DRAG & DROP (LOCAL ONLY) ================= */

// //   const onDragStart = (e, index) => {
// //     e.dataTransfer.setData("index", index);
// //   };

// //   const onDrop = (e, index) => {
// //     const fromIndex = e.dataTransfer.getData("index");
// //     if (fromIndex === null) return;

// //     const updated = [...stories];
// //     const [moved] = updated.splice(fromIndex, 1);
// //     updated.splice(index, 0, moved);
// //     setStories(updated);
// //   };

// //   return (
// //     <>
// //       <div className="backlog">
// //         {/* ===== SCRUM HEADER ===== */}
// //         <div className="backlog__header">
// //           <h2>Scrum</h2>
// //           <div className="backlog__stats">
// //             <div className="progress-box" />
// //             <div className="stats-text">
// //               <span className="percent">0%</span>
// //               <span>0 defined points</span>
// //               <span>0 closed points</span>
// //               <span>0 points / sprint</span>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ===== GRAPH + SPRINTS ===== */}
// //         <div className="backlog__top">
// //           <div className="graph-hint">
// //             <div className="bars" />
// //             <div>
// //               <strong>CUSTOMIZE YOUR BACKLOG GRAPH</strong>
// //               <p>
// //                 To have a nice graph that helps you follow the evolution
// //                 of the project you have to set up the points and sprints
// //                 through the <span className="link">Admin</span>
// //               </p>
// //             </div>
// //           </div>

// //           <div className="sprints">
// //             <h4>SPRINTS</h4>
// //             <p className="empty-text">There are no sprints yet</p>
// //             <button className="link-btn">Add a sprint +</button>
// //           </div>
// //         </div>

// //         {/* ===== BACKLOG LIST ===== */}
// //         <div className="backlog__list">
// //           <div className="list-header">
// //             <h3>
// //               Backlog{" "}
// //               <span className="muted">
// //                 {stories.length} user stories
// //               </span>
// //             </h3>

// //             <div className="list-actions">
// //               <button
// //                 className="primary-btn"
// //                 onClick={() => setShowModal(true)}
// //               >
// //                 + USER STORY
// //               </button>
// //               <button className="icon-btn">≡</button>
// //             </div>
// //           </div>

// //           <div className="list-toolbar">
// //             <button className="filter-btn">Filters</button>
// //             <input placeholder="subject or reference" />
// //           </div>

// //           {loading ? (
// //             <div className="empty-state">Loading…</div>
// //           ) : stories.length === 0 ? (
// //             <div className="empty-state">
// //               <p>The backlog is empty!</p>
// //               <button
// //                 className="primary-btn"
// //                 onClick={() => setShowModal(true)}
// //               >
// //                 + ADD A USER STORY
// //               </button>
// //             </div>
// //           ) : (
// //             <div className="story-list">
// //               {stories.map((story, index) => (
// //                 <div
// //                   key={story.id}
// //                   className="story-row"
// //                   draggable
// //                   onDragStart={(e) => onDragStart(e, index)}
// //                   onDragOver={(e) => e.preventDefault()}
// //                   onDrop={(e) => onDrop(e, index)}
// //                   onClick={() =>
// //                     navigate(`/project/${slug}/us/${story.id}`)
// //                   }
// //                 >
// //                   <div className="story-left">
// //                     <span className="drag">⋮⋮</span>
// //                     <input type="checkbox" />
// //                     <span className="story-id">#{story.id}</span>
// //                     <span className="story-title">
// //                       {story.subject}
// //                     </span>
// //                   </div>

// //                   <div
// //                     className="story-right"
// //                     onClick={(e) => e.stopPropagation()}
// //                   >
// //                     <select
// //                       className="story-status"
// //                       value={story.status}
// //                       onChange={(e) =>
// //                         updateStatus(story.id, e.target.value)
// //                       }
// //                     >
// //                       {STATUS_OPTIONS.map((s) => (
// //                         <option key={s}>{s}</option>
// //                       ))}
// //                     </select>

// //                     <select
// //                       className="story-points"
// //                       value={story.points || "?"}
// //                       onChange={(e) =>
// //                         updatePoints(story.id, e.target.value)
// //                       }
// //                     >
// //                       {POINT_OPTIONS.map((p) => (
// //                         <option key={p}>{p}</option>
// //                       ))}
// //                     </select>

// //                     <span className="story-menu">⋮</span>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {showModal && projectId && (
// //         <UserStoryModal
// //           onClose={() => setShowModal(false)}
// //           onCreate={onCreateStory}
// //         />
// //       )}
// //     </>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import UserStoryModal from "../../components/UserStoryModal/UserStoryModal";
// import SprintModal from "../../components/SprintModal/SprintModal";
// import { authFetch } from "../../services/api";
// import "./Backlog.css";

// const STATUS_OPTIONS = ["New", "Ready", "In Progress", "Done"];
// const POINT_OPTIONS = ["?", 1, 2, 3, 5, 8];

// export default function Backlog() {
//   const [showModal, setShowModal] = useState(false);
//   const [stories, setStories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sprints, setSprints] = useState([]);
//   const [showSprintModal, setShowSprintModal] = useState(false);



//   const navigate = useNavigate();
//   const { slug } = useParams();

//   /* ================= FETCH STORIES ================= */

//   useEffect(() => {
//     loadStories();
//     loadSprints();
//   }, [slug]);

//   const loadStories = async () => {
//     try {
//       setLoading(true);

//       const res = await authFetch(
//         `/userstories/?project__slug=${slug}`
//       );

//       if (!res.ok) throw new Error("Failed to load user stories");

//       const data = await res.json();
//       setStories(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const loadSprints = async () => {
//       try {
//         const res = await authFetch(`/sprints/?project_slug=${slug}`);
//         if (!res.ok) throw new Error("Failed to load sprints");
//         setSprints(await res.json());
//       } catch (err) {
//         console.error(err);
//       }
//     };

//   /* ================= CREATE STORY ================= */

//   const onCreateStory = async (story) => {
//     try {
//       const res = await authFetch("/userstories/", {
//         method: "POST",
//         body: JSON.stringify({
//           subject: story.subject,
//           description: story.description,
//           status: story.status,
//           project_slug: slug, // ✅ CORRECT
//         }),
//       });

//       if (!res.ok) throw new Error("Failed to create user story");

//       const created = await res.json();
//       setStories((prev) => [...prev, created]);
//       setShowModal(false);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   /* ================= UPDATE STATUS ================= */

//   const updateStatus = async (id, status) => {
//     setStories((prev) =>
//       prev.map((s) => (s.id === id ? { ...s, status } : s))
//     );

//     try {
//       await authFetch(`/userstories/${id}/`, {
//         method: "PATCH",
//         body: JSON.stringify({ status }),
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   /* ================= CREATE SPRINTS ================= */
//   const createSprint = async (sprint) => {
//       try {
//         const res = await authFetch("/sprints/", {
//           method: "POST",
//           body: JSON.stringify({
//             ...sprint,
//             project_slug: slug,
//             is_active: true,
//           }),
//         });

//         if (!res.ok) throw new Error("Failed to create sprint");

//         const created = await res.json();
//         setSprints((prev) => [...prev, created]);
//         setShowSprintModal(false);
//       } catch (err) {
//         console.error(err);
//       }
//     };

  

//   /* ================= POINTS (UI ONLY) ================= */

//   const updatePoints = (id, points) => {
//     setStories((prev) =>
//       prev.map((s) => (s.id === id ? { ...s, points } : s))
//     );
//   };

//   /* ================= DRAG & DROP (LOCAL ONLY) ================= */

//   const onDragStart = (e, index) => {
//     e.dataTransfer.setData("index", index);
//   };

//   const onDrop = (e, index) => {
//     const fromIndex = e.dataTransfer.getData("index");
//     if (fromIndex === null) return;

//     const updated = [...stories];
//     const [moved] = updated.splice(fromIndex, 1);
//     updated.splice(index, 0, moved);
//     setStories(updated);
//   };

//   return (
//     <>
//       <div className="backlog">
//         {/* ===== SCRUM HEADER ===== */}
//         <div className="backlog__header">
//           <h2>Scrum</h2>
//           <div className="backlog__stats">
//             <div className="progress-box" />
//             <div className="stats-text">
//               <span className="percent">0%</span>
//               <span>0 defined points</span>
//               <span>0 closed points</span>
//               <span>0 points / sprint</span>
//             </div>
//           </div>
//         </div>

//         {/* ===== GRAPH + SPRINTS ===== */}
//         <div className="backlog__top">
//           <div className="graph-hint">
//             <div className="bars" />
//             <div>
//               <strong>CUSTOMIZE YOUR BACKLOG GRAPH</strong>
//               <p>
//                 To have a nice graph that helps you follow the evolution
//                 of the project you have to set up the points and sprints
//                 through the <span className="link">Admin</span>
//               </p>
//             </div>
//           </div>

//           <div className="sprints">
//             <h4>SPRINTS</h4>
//             {sprints.length === 0 ? (
//                   <p className="empty-text">There are no sprints yet</p>
//                 ) : (
//                   sprints.map((sprint) => (
//                     <div key={sprint.id} className="sprint-card">
//                       <strong>{sprint.name}</strong>
//                       <div className="sprint-dates">
//                         {sprint.start_date} → {sprint.end_date}
//                       </div>

//                       <div className="sprint-dropzone">
//                         Drop stories here to start a new sprint
//                       </div>

//                       <button
//                         className="link"
//                         onClick={() =>
//                           navigate(`/project/${slug}/taskboard/${sprint.id}`)
//                         }
//                       >
//                         Sprint Taskboard
//                       </button>
//                     </div>
//                   ))
//                 )}

//             <button className="link-btn" onClick={() => setShowSprintModal(true)}>
//               Add a sprint +
//             </button>
//           </div>
//         </div>

//         {/* ===== BACKLOG LIST ===== */}
//         <div className="backlog__list">
//           <div className="list-header">
//             <h3>
//               Backlog{" "}
//               <span className="muted">
//                 {stories.length} user stories
//               </span>
//             </h3>

//             <div className="list-actions">
//               <button
//                 className="primary-btn"
//                 onClick={() => setShowModal(true)}
//               >
//                 + USER STORY
//               </button>
//               <button className="icon-btn">≡</button>
//             </div>
//           </div>

//           <div className="list-toolbar">
//             <button className="filter-btn">Filters</button>
//             <input placeholder="subject or reference" />
//           </div>

//           {loading ? (
//             <div className="empty-state">Loading…</div>
//           ) : stories.length === 0 ? (
//             <div className="empty-state">
//               <p>The backlog is empty!</p>
//               <button
//                 className="primary-btn"
//                 onClick={() => setShowModal(true)}
//               >
//                 + ADD A USER STORY
//               </button>
//             </div>
//           ) : (
//             <div className="story-list">
//               {stories.map((story, index) => (
//                 <div
//                   key={story.id}
//                   className="story-row"
//                   draggable
//                   onDragStart={(e) => onDragStart(e, index)}
//                   onDragOver={(e) => e.preventDefault()}
//                   onDrop={(e) => onDrop(e, index)}
//                   onClick={() =>
//                     navigate(`/project/${slug}/us/${story.id}`)
//                   }
//                 >
//                   <div className="story-left">
//                     <span className="drag">⋮⋮</span>
//                     <input type="checkbox" />
//                     <span className="story-id">#{story.ref}</span>
//                     <span className="story-title">
//                       {story.subject}
//                     </span>
//                   </div>

//                   <div
//                     className="story-right"
//                     onClick={(e) => e.stopPropagation()}
//                   >
//                     <select
//                       className="story-status"
//                       value={story.status}
//                       onChange={(e) =>
//                         updateStatus(story.id, e.target.value)
//                       }
//                     >
//                       {STATUS_OPTIONS.map((s) => (
//                         <option key={s}>{s}</option>
//                       ))}
//                     </select>

//                     <select
//                       className="story-points"
//                       value={story.points || "?"}
//                       onChange={(e) =>
//                         updatePoints(story.id, e.target.value)
//                       }
//                     >
//                       {POINT_OPTIONS.map((p) => (
//                         <option key={p}>{p}</option>
//                       ))}
//                     </select>

//                     <span className="story-menu">⋮</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {showModal && (
//         <UserStoryModal
//           onClose={() => setShowModal(false)}
//           onCreate={onCreateStory}
//         />
//       )}
//       {showSprintModal && (
//           <SprintModal
//             onClose={() => setShowSprintModal(false)}
//             onSave={createSprint}
//           />
//         )}
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserStoryModal from "../../components/UserStoryModal/UserStoryModal";
import SprintModal from "../../components/SprintModal/SprintModal";
import { authFetch } from "../../services/api";
import "./Backlog.css";

const STATUS_OPTIONS = ["New", "Ready", "In Progress", "Done"];
const POINT_OPTIONS = ["?", 1, 2, 3, 5, 8];

export default function Backlog() {
  const [showModal, setShowModal] = useState(false);
  const [stories, setStories] = useState([]); // backlog stories
  const [sprints, setSprints] = useState([]);
  const [sprintStories, setSprintStories] = useState({});
  const [loading, setLoading] = useState(true);
  const [showSprintModal, setShowSprintModal] = useState(false);

  const navigate = useNavigate();
  const { slug } = useParams();

  /* ================= FETCH BACKLOG STORIES ================= */

  // const loadStories = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await authFetch(
  //       `/userstories/?project__slug=${slug}&sprint__isnull=true`
  //     );
  //     if (!res.ok) throw new Error("Failed to load backlog stories");
  //     setStories(await res.json());
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
    const loadBacklogStories = async () => {
        try {
          setLoading(true);

          const res = await authFetch(
            `/userstories/?project__slug=${slug}&sprint__isnull=true`
          );

          if (!res.ok) throw new Error("Failed to load backlog stories");

          setStories(await res.json());
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

  /* ================= FETCH SPRINTS ================= */

  const loadSprints = async () => {
    try {
      const res = await authFetch(`/sprints/?project_slug=${slug}`);
      if (!res.ok) throw new Error("Failed to load sprints");
      const sprintList = await res.json();
      setSprints(sprintList);

      // fetch stories per sprint
      const map = {};
      for (const sprint of sprintList) {
        const r = await authFetch(
          `/userstories/?project__slug=${slug}&sprint=${sprint.id}`
        );
        map[sprint.id] = r.ok ? await r.json() : [];
      }
      setSprintStories(map);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadBacklogStories();
    loadSprints();
  }, [slug]);

  /* ================= MOVE STORY ================= */

  const moveStoryToSprint = async (storyId, sprintId) => {
      try {
        await authFetch(`/userstories/${storyId}/`, {
          method: "PATCH",
          body: JSON.stringify({
            sprint: sprintId,
          }),
        });
        await loadBacklogStories();
        await loadSprints();
        //   if (!res.ok) throw new Error("Failed to move story");

        //   const updatedStory = await res.json();

        // // Remove from backlog UI immediately
        // setStories((prev) => prev.filter((s) => s.id !== storyId));
        // setSprintStories((prev) => ({
        //   ...prev,
        //   [sprintId]: [...(prev[sprintId] || []), updatedStory],
        // }));

      } catch (err) {
        console.error(err);
      }
    };

  const removeFromSprint = async (storyId,sprintId) => {
    try {
       await authFetch(`/userstories/${storyId}/`, {
        method: "PATCH",
        body: JSON.stringify({ sprint: null }),
      });
      //  if (!res.ok) throw new Error("Failed to remove from sprint");

      //   const updatedStory = await res.json();

      // // Remove from sprint UI
      //   setSprintStories((prev) => ({
      //     ...prev,
      //     [sprintId]: prev[sprintId].filter((s) => s.id !== storyId),
      //   }));

      //   // Add back to backlog
      //   setStories((prev) => [...prev, updatedStory]);
      await loadBacklogStories();
      await loadSprints();
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= CREATE STORY ================= */

  const onCreateStory = async (story) => {
    try {
      const res = await authFetch("/userstories/", {
        method: "POST",
        body: JSON.stringify({
          subject: story.subject,
          description: story.description,
          status: story.status,
          project_slug: slug,
        }),
      });
      if (!res.ok) throw new Error("Failed to create story");
      const created = await res.json();
      setStories((prev) => [...prev, created]);
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= CREATE SPRINT ================= */

  const createSprint = async (sprint) => {
    try {
      const res = await authFetch("/sprints/", {
        method: "POST",
        body: JSON.stringify({
          ...sprint,
          project_slug: slug,
          is_active: true,
        }),
      });
      if (!res.ok) throw new Error("Failed to create sprint");
      const created = await res.json();
      setSprints((prev) => [...prev, created]);
      setShowSprintModal(false);
    } catch (err) {
      console.error(err);
    }
  };
  const updateStatus = (id, status) => {
      setStories((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status } : s))
      );
    };
    const updatePoints = (id, points) => {
      setStories((prev) =>
        prev.map((s) => (s.id === id ? { ...s, points } : s))
      );
    };

  return (
    <>
      <div className="backlog">
        {/* ===== HEADER ===== */}
        <div className="backlog__header">
          <h2>Scrum</h2>
          <div className="backlog__stats">
            <div className="progress-box" />
            <div className="stats-text">
              <span className="percent">0%</span>
              <span>0 defined points</span>
              <span>0 closed points</span>
              <span>0 points / sprint</span>
            </div>
          </div>
        </div>

        {/* ===== GRAPH + SPRINTS ===== */}
        <div className="backlog__top">
          <div className="graph-hint">
            <div className="bars" />
            <div>
              <strong>CUSTOMIZE YOUR BACKLOG GRAPH</strong>
              <p>
                To have a nice graph that helps you follow the evolution of the
                project you have to set up the points and sprints through the{" "}
                <span className="link">Admin</span>
              </p>
            </div>
          </div>

          <div className="sprints">
            <h4>SPRINTS</h4>

            {sprints.map((sprint) => (
              <div key={sprint.id} className="sprint-card">
                <strong>{sprint.name}</strong>
                <div className="sprint-dates">
                  {sprint.start_date} → {sprint.end_date}
                </div>

                {(sprintStories[sprint.id] || []).map((story) => (
                  <div key={story.id} className="story-row">
                    <span>#{story.ref} {story.subject}</span>
                    <button
                      className="link"
                      onClick={() => removeFromSprint(story.id,sprint.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <button
                  className="link"
                  onClick={() =>
                    navigate(`/project/${slug}/taskboard/${sprint.id}`)
                  }
                >
                  Sprint Taskboard
                </button>
              </div>
            ))}

            <button className="link-btn" onClick={() => setShowSprintModal(true)}>
              Add a sprint +
            </button>
          </div>
        </div>

        {/* ===== BACKLOG LIST ===== */}
        <div className="backlog__list">
          <div className="list-header">
            <h3>
              Backlog <span className="muted">{stories.length} user stories</span>
            </h3>
            <button className="primary-btn" onClick={() => setShowModal(true)}>
              + USER STORY
            </button>
          </div>

          {loading ? (
            <div className="empty-state">Loading…</div>
          ) : stories.length === 0 ? (
            <div className="empty-state">The backlog is empty!</div>
          ) : (
            // <div className="story-list">
            //   {stories.map((story) => (
            //     <div key={story.id} className="story-row">
            //       <span>
            //         #{story.ref} {story.subject}
            //       </span>

            //       <select
            //         onChange={(e) =>
            //           moveStoryToSprint(story.id, e.target.value)
            //         }
            //         defaultValue=""
            //       >
            //         <option value="" disabled>
            //           Move to sprint
            //         </option>
            //         {sprints.map((s) => (
            //           <option key={s.id} value={s.id}>
            //             {s.name}
            //           </option>
            //         ))}
            //       </select>
            //     </div>
            //   ))}
            // </div>
            <div className="story-list">
                {stories.map((story) => (
                  <div
                    key={story.id}
                    className="story-row"
                    onClick={() => navigate(`/project/${slug}/us/${story.id}`)}
                  >
                    {/* LEFT */}
                    <div className="story-left">
                      <span className="story-id">#{story.ref}</span>
                      <span className="story-title">{story.subject}</span>
                    </div>

                    {/* RIGHT */}
                    <div
                      className="story-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Status */}
                      <select
                        className="story-status"
                        value={story.status || "New"}
                        onChange={(e) =>
                          updateStatus(story.id, e.target.value)
                        }
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>

                      {/* Points */}
                      <select
                        className="story-points"
                        value={story.points || "?"}
                        onChange={(e) =>
                          updatePoints(story.id, e.target.value)
                        }
                      >
                        {POINT_OPTIONS.map((p) => (
                          <option key={p}>{p}</option>
                        ))}
                      </select>

                      {/* Move to Sprint */}
                      <select
                        className="story-sprint"
                        defaultValue=""
                        onChange={(e) =>
                          moveStoryToSprint(story.id, e.target.value)
                        }
                      >
                        <option value="" disabled>
                          Move to sprint
                        </option>
                        {sprints.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>

          )}
        </div>
      </div>

      {showModal && (
        <UserStoryModal onClose={() => setShowModal(false)} onCreate={onCreateStory} />
      )}

      {showSprintModal && (
        <SprintModal onClose={() => setShowSprintModal(false)} onSave={createSprint} />
      )}
    </>
  );
}
