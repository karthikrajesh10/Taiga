

// // import { useParams, useNavigate } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import { authFetch } from "../../services/api";
// // import "./Taskboard.css";

// // const STATUS_COLUMNS = [
// //   { key: "New", label: "NEW" },
// //   { key: "In Progress", label: "IN PROGRESS" },
// //   { key: "Ready for Test", label: "READY FOR TEST" },
// //   { key: "Done", label: "CLOSED" },
// // ];

// // export default function Taskboard() {
// //   const { slug, sprintId } = useParams();
// //   const navigate = useNavigate();

// //   const [stories, setStories] = useState([]);
// //   const [sprint, setSprint] = useState(null);

// //   useEffect(() => {
// //     const loadData = async () => {
// //       try {
// //         const [storiesRes, sprintRes] = await Promise.all([
// //           authFetch(`/userstories/?project__slug=${slug}&sprint=${sprintId}`),
// //           authFetch(`/sprints/${sprintId}/`),
// //         ]);

// //         if (storiesRes.ok) setStories(await storiesRes.json());
// //         if (sprintRes.ok) setSprint(await sprintRes.json());
// //       } catch (err) {
// //         console.error(err);
// //       }
// //     };

// //     loadData();
// //   }, [slug, sprintId]);

// //   const updateStatus = async (storyId, status) => {
// //     await authFetch(`/userstories/${storyId}/`, {
// //       method: "PATCH",
// //       body: JSON.stringify({ status }),
// //     });

// //     setStories((prev) =>
// //       prev.map((s) => (s.id === storyId ? { ...s, status } : s))
// //     );
// //   };

// //   const deleteSprint = async () => {
// //     const confirmed = window.confirm(
// //       "Are you sure you want to delete this sprint?\nAll stories will move back to backlog."
// //     );

// //     if (!confirmed) return;

// //     try {
// //       await authFetch(`/sprints/${sprintId}/`, {
// //         method: "DELETE",
// //       });

// //       navigate(`/project/${slug}/backlog`);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   return (
// //     <>
// //       {/* ===== SPRINT HEADER ===== */}
// //       <div className="taskboard-header">
// //         <div>
// //           <h2>{sprint?.name || "Sprint"}</h2>
// //           <span className="dates">
// //             {sprint?.start_date} → {sprint?.end_date}
// //           </span>
// //         </div>

// //         <button className="danger-btn" onClick={deleteSprint}>
// //           Delete Sprint
// //         </button>
// //       </div>

// //       {/* ===== TASKBOARD ===== */}
// //       <div className="taskboard">
// //         {STATUS_COLUMNS.map((column) => (
// //           <div key={column.key} className="taskboard-column">
// //             <div className="column-header">
// //               <h4>{column.label}</h4>
// //               <span className="count">
// //                 {stories.filter((s) => s.status === column.key).length}
// //               </span>
// //             </div>

// //             <div className="column-body">
// //               {stories
// //                 .filter((s) => s.status === column.key)
// //                 .map((story) => (
// //                   <div key={story.id} className="task-card">
// //                     <span className="ref">#{story.ref}</span>
// //                     <div className="task-title">{story.subject}</div>

// //                     <select
// //                       value={story.status}
// //                       onChange={(e) =>
// //                         updateStatus(story.id, e.target.value)
// //                       }
// //                     >
// //                       {STATUS_COLUMNS.map((c) => (
// //                         <option key={c.key} value={c.key}>
// //                           {c.label}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>
// //                 ))}
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </>
// //   );
// // }


// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// import {
//   getSprintStories
// } from "../../services/userStoryService";

// import {
//   getTasksByStory
// } from "../../services/taskService";

// import {
//   deleteSprint,
//   getSprint
// } from "../../services/sprintService";


// import TaskCreateModal from "../../components/TaskCreateModal/TaskCreateModal";
// import "./Taskboard.css";

// const STATUS_COLUMNS = [
//   { key: 1, label: "NEW" },
//   { key: 2, label: "IN PROGRESS" },
//   { key: 3, label: "READY FOR TEST" },
//   { key: 4, label: "DONE" },
// ];

// const STATUS_LABELS = {
//   1: "NEW",
//   2: "IN PROGRESS",
//   3: "READY FOR TEST",
//   4: "DONE",
// };


// export default function Taskboard() {
//   const { slug, sprintId } = useParams();
//   const navigate = useNavigate();

//   const [stories, setStories] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [sprint, setSprint] = useState(null);

//   const [activeStory, setActiveStory] = useState(null);
//   const [collapsedStories, setCollapsedStories] = useState(() => new Set());
//   const user = JSON.parse(localStorage.getItem("user"));
//   const isPM = user?.role === "PM";
//   const isSuperAdmin = user?.is_superuser === true;
//   const canDeleteSprint = isPM || isSuperAdmin;

//   /* ================= LOAD DATA ================= */
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const storiesData = await getSprintStories(slug, sprintId);
//         setStories(storiesData);

//         const sprintData = await getSprint(sprintId);
//         setSprint(sprintData);

//         const taskLists = await Promise.all(
//           storiesData.map((s) => getTasksByStory(s.id))
//         );

//         setTasks(taskLists.flat());
//       } catch (err) {
//         console.error(err);
//       }
//     };


//     loadData();
//   }, [slug, sprintId]);

//   /* ================= TASK STATUS UPDATE ================= */
//   const updateTaskStatus = async (taskId, status) => {
//     const { updateTask } = await import("../../services/taskService");
    
//     const statusNumber = typeof status === 'string' ? parseInt(status) : status;
//     await updateTask(taskId, { 
//       status: statusNumber
//     });

//     setTasks((prev) =>
//       prev.map((t) => (t.id === taskId ? { ...t, status: statusNumber } : t))
//     );
//   };

//   const toggleStoryCollapsed = (storyId) => {
//     setCollapsedStories((prev) => {
//       const next = new Set(prev);
//       if (next.has(storyId)) next.delete(storyId);
//       else next.add(storyId);
//       return next;
//     });
//   };

//   const tasksForCell = (storyId, statusKey) => {
//     return tasks.filter(
//       (t) => t.user_story === storyId && t.status === statusKey
//     );
//   };

//   /* ================= DELETE SPRINT ================= */
//   const handleDeleteSprint = async () => {
//     if (!window.confirm("Delete this sprint?")) return;

//     try {
//       await deleteSprint(sprintId);
//       navigate(`/project/${slug}/backlog`);
//     } catch (err) {
//       console.error("Failed to delete sprint", err);
//     }
//   };

//   return (
//     <>
//       {/* ===== HEADER ===== */}
//       <div className="taskboard-header">
//         <div>
//           <h2>{sprint?.name || "Sprint"}</h2>
//           <span className="dates">
//             {sprint?.start_date} → {sprint?.end_date}
//           </span>
//         </div>

//         {canDeleteSprint && (
//           <button className="danger-btn" onClick={handleDeleteSprint}>
//             Delete Sprint
//           </button>
//         )}
//       </div>

//       {/* ===== BOARD ===== */}
//       <div className="taskboard-grid">
//         {/* ===== GRID HEADER ===== */}
//         <div className="taskboard-grid__cell taskboard-grid__header taskboard-grid__cell--story">
//           USER STORY
//         </div>
//         {STATUS_COLUMNS.map((c) => (
//           <div
//             key={c.key}
//             className={`taskboard-grid__cell taskboard-grid__header taskboard-grid__cell--status taskboard-grid__cell--status-${c.key}`}
//           >
//             {c.label}
//           </div>
//         ))}

//         {/* ===== STORY ROWS ===== */}
//         {stories.map((story) => {
//           const isCollapsed = collapsedStories.has(story.id);

//           return (
//             <div key={story.id} className="taskboard-grid__row">
//               <div className="taskboard-grid__cell taskboard-grid__cell--story">
//                 <div className="story-cell">
//                   <button
//                     className="story-toggle"
//                     onClick={() => toggleStoryCollapsed(story.id)}
//                     title={isCollapsed ? "Expand" : "Collapse"}
//                   >
//                     {isCollapsed ? "▸" : "▾"}
//                   </button>

//                   <div className="story-main">
//                     <div
//                       className="story-title"
//                       onClick={() => navigate(`/project/${slug}/us/${story.id}`)}
//                       title={story.title}
//                     >
//                       <span className="story-ref">#{story.id}</span> {story.title}
//                     </div>
//                   </div>

//                   <div className="story-actions">
//                     <button
//                       className="story-action-btn"
//                       title="Add task"
//                       onClick={() => setActiveStory(story)}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {STATUS_COLUMNS.map((col) => (
//                 <div
//                   key={col.key}
//                   className={`taskboard-grid__cell taskboard-grid__cell--status taskboard-grid__cell--status-${col.key}`}
//                 >
//                   {!isCollapsed && (
//                     <div className="task-cell">
//                       {tasksForCell(story.id, col.key).map((task) => (
//                         <div key={task.id} className="task-card">
//                           <div className="task-card__top">
//                             <span className="ref">#{task.id}</span>

//                             <select
//                               className="task-status"
//                               value={task.status}
//                               onChange={(e) =>
//                                 updateTaskStatus(task.id, parseInt(e.target.value))
//                               }
//                               title="Change status"
//                             >
//                               {STATUS_COLUMNS.map((c) => (
//                                 <option key={c.key} value={c.key}>
//                                   {STATUS_LABELS[c.key]}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>

//                           <div className="task-title">{task.title}</div>
//                           <div className="task-meta"></div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           );
//         })}

//         {/* ===== STORYLESS TASKS ROW (visual parity) ===== */}
//         <div className="taskboard-grid__row taskboard-grid__row--storyless">
//           <div className="taskboard-grid__cell taskboard-grid__cell--story">
//             <div className="storyless">
//               <span className="storyless__label">Storyless tasks</span>
//             </div>
//           </div>
//           {STATUS_COLUMNS.map((col) => (
//             <div
//               key={col.key}
//               className={`taskboard-grid__cell taskboard-grid__cell--status taskboard-grid__cell--status-${col.key}`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* ===== TASK MODAL ===== */}
//       {activeStory && (
//         <TaskCreateModal
//           projectSlug={slug}
//           userstoryId={activeStory.id}
//           onClose={() => setActiveStory(null)}
//           onCreated={(task) =>
//             setTasks((prev) => [...prev, task])
//           }
//         />
//       )}
//     </>
//   );
// }

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  getSprintStories
} from "../../services/userStoryService";

import {
  getTasksByStory,
  updateTask
} from "../../services/taskService";

import {
  deleteSprint,
  getSprint
} from "../../services/sprintService";

import {
  getProjectMembers
} from "../../services/membershipService";

import { getProjectIdBySlug } from "../../services/projectService";

import TaskCreateModal from "../../components/TaskCreateModal/TaskCreateModal";
import "./Taskboard.css";

const STATUS_COLUMNS = [
  { key: 1, label: "NEW" },
  { key: 2, label: "IN PROGRESS" },
  { key: 3, label: "READY FOR TEST" },
  { key: 4, label: "DONE" },
];

const STATUS_LABELS = {
  1: "NEW",
  2: "IN PROGRESS",
  3: "READY FOR TEST",
  4: "DONE",
};


export default function Taskboard() {
  const { slug, sprintId } = useParams();
  const navigate = useNavigate();

  const [stories, setStories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [sprint, setSprint] = useState(null);

  const [activeStory, setActiveStory] = useState(null);
  const [collapsedStories, setCollapsedStories] = useState(() => new Set());

  // Role-based access
  const user = JSON.parse(localStorage.getItem("user"));
  const isPM = user?.role === "PM";
  
  const isSuperAdmin = user?.is_superuser === true;
  const canDeleteSprint = isPM || isSuperAdmin;
  const canEdit = user?.is_superuser === true || user?.role === "PM" || user?.role === "Manager";
  

  // Members & assignment
  const [members, setMembers] = useState([]);
  const [assigningTaskId, setAssigningTaskId] = useState(null);
  const [assigningUsers, setAssigningUsers] = useState(new Set());

  // Inline task editing
  const [editingTask, setEditingTask] = useState(null); // { id, title }

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const loadData = async () => {
      try {
        const storiesData = await getSprintStories(slug, sprintId);
        setStories(storiesData);

        const sprintData = await getSprint(sprintId);
        setSprint(sprintData);

        const taskLists = await Promise.all(
          storiesData.map((s) => getTasksByStory(s.id))
        );

        setTasks(taskLists.flat());
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, [slug, sprintId]);

  /* ================= LOAD MEMBERS ================= */
  useEffect(() => {
    const loadMembers = async () => {
      try {
        const projectId = await getProjectIdBySlug(slug);
        if (!projectId) return;
        const data = await getProjectMembers(projectId);
        setMembers(data);
      } catch (err) {
        console.error("Failed to load members", err);
      }
    };
    loadMembers();
  }, [slug]);

  /* ================= TASK STATUS UPDATE ================= */
  const updateTaskStatus = async (taskId, status) => {
    const statusNumber = typeof status === 'string' ? parseInt(status) : status;
    await updateTask(taskId, { status: statusNumber });

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: statusNumber } : t))
    );
  };

  /* ================= TASK TITLE EDIT ================= */
  const handleSaveTaskTitle = async (taskId, newTitle) => {
    if (!newTitle.trim()) {
      setEditingTask(null);
      return;
    }
    try {
      await updateTask(taskId, { title: newTitle.trim() });
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, title: newTitle.trim() } : t))
      );
    } catch (err) {
      console.error("Failed to update task title", err);
      alert("Failed to save task title. Please try again.");
    } finally {
      setEditingTask(null);
    }
  };

  /* ================= ASSIGN TASK ================= */
  const handleAssignTask = async (taskId, userId) => {
    setAssigningUsers((prev) => new Set(prev).add(userId));

    try {
      await updateTask(taskId, { assignee: userId });

      const assignedMember = members.find(m => m.user.id === userId);
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId
            ? { ...t, assignee: userId, assignee_username: assignedMember?.user.username }
            : t
        )
      );

      setAssigningTaskId(null);
    } catch (err) {
      console.error("Failed to assign task", err);
      alert("Failed to assign task. Please try again.");
    } finally {
      setAssigningUsers((prev) => {
        const next = new Set(prev);
        next.delete(userId);
        return next;
      });
    }
  };

  /* ================= GET ASSIGNEE NAME ================= */
  const getAssigneeName = (task) => {
    if (task.assignee_username) return task.assignee_username;
    if (task.assignee) {
      const member = members.find(m => m.user.id === task.assignee);
      if (member) return member.user.username;
      return `User #${task.assignee}`;
    }
    return null;
  };

  /* ================= HELPERS ================= */
  const toggleStoryCollapsed = (storyId) => {
    setCollapsedStories((prev) => {
      const next = new Set(prev);
      if (next.has(storyId)) next.delete(storyId);
      else next.add(storyId);
      return next;
    });
  };

  const tasksForCell = (storyId, statusKey) => {
    return tasks.filter(
      (t) => t.user_story === storyId && t.status === statusKey
    );
  };

  /* ================= DELETE SPRINT ================= */
  const handleDeleteSprint = async () => {
    if (!window.confirm("Delete this sprint?")) return;

    try {
      await deleteSprint(sprintId);
      navigate(`/project/${slug}/backlog`);
    } catch (err) {
      console.error("Failed to delete sprint", err);
    }
  };

  return (
    <>
      {/* ===== HEADER ===== */}
      <div className="taskboard-header">
        <div>
          <h2>{sprint?.name || "Sprint"}</h2>
          <span className="dates">
            {sprint?.start_date} → {sprint?.end_date}
          </span>
        </div>

        {canDeleteSprint && (
          <button className="danger-btn" onClick={handleDeleteSprint}>
            Delete Sprint
          </button>
        )}
      </div>

      {/* ===== BOARD ===== */}
      <div className="taskboard-grid">
        {/* ===== GRID HEADER ===== */}
        <div className="taskboard-grid__cell taskboard-grid__header taskboard-grid__cell--story">
          USER STORY
        </div>
        {STATUS_COLUMNS.map((c) => (
          <div
            key={c.key}
            className={`taskboard-grid__cell taskboard-grid__header taskboard-grid__cell--status taskboard-grid__cell--status-${c.key}`}
          >
            {c.label}
          </div>
        ))}

        {/* ===== STORY ROWS ===== */}
        {stories.map((story) => {
          const isCollapsed = collapsedStories.has(story.id);

          return (
            <div key={story.id} className="taskboard-grid__row">
              <div className="taskboard-grid__cell taskboard-grid__cell--story">
                <div className="story-cell">
                  <button
                    className="story-toggle"
                    onClick={() => toggleStoryCollapsed(story.id)}
                    title={isCollapsed ? "Expand" : "Collapse"}
                  >
                    {isCollapsed ? "▸" : "▾"}
                  </button>

                  <div className="story-main">
                    <div
                      className="story-title"
                      onClick={() => navigate(`/project/${slug}/us/${story.id}`)}
                      title={story.title}
                    >
                      <span className="story-ref">#{story.id}</span> {story.title}
                    </div>
                  </div>

                  <div className="story-actions">
                    <button
                      className="story-action-btn"
                      title="Add task"
                      onClick={() => setActiveStory(story)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {STATUS_COLUMNS.map((col) => (
                <div
                  key={col.key}
                  className={`taskboard-grid__cell taskboard-grid__cell--status taskboard-grid__cell--status-${col.key}`}
                >
                  {!isCollapsed && (
                    <div className="task-cell">
                      {tasksForCell(story.id, col.key).map((task) => {
                        const assigneeName = getAssigneeName(task);
                        return (
                          <div key={task.id} className="task-card">

                            {/* ── TOP ROW: id + status dropdown ── */}
                            <div className="task-card__top">
                              <span className="ref">#{task.id}</span>
                              <select
                                className="task-status"
                                value={task.status}
                                onChange={(e) =>
                                  updateTaskStatus(task.id, parseInt(e.target.value))
                                }
                                title="Change status"
                              >
                                {STATUS_COLUMNS.map((c) => (
                                  <option key={c.key} value={c.key}>
                                    {STATUS_LABELS[c.key]}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* ── TITLE: click to edit inline ── */}
                            {editingTask?.id === task.id ? (
                              <input
                                className="task-title-input"
                                value={editingTask.title}
                                autoFocus
                                onChange={(e) =>
                                  setEditingTask({ ...editingTask, title: e.target.value })
                                }
                                onBlur={() =>
                                  handleSaveTaskTitle(task.id, editingTask.title)
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter")
                                    handleSaveTaskTitle(task.id, editingTask.title);
                                  if (e.key === "Escape") setEditingTask(null);
                                }}
                              />
                            ) : (
                              <div
                                className="task-title"
                                title="Click to edit"
                                onClick={() =>
                                  canEdit && setEditingTask({ id: task.id, title: task.title })
                                }
                              >
                                {task.title}
                              </div>
                            )}

                            {/* ── META: assignee + reassign button ── */}
                            <div className="task-meta">
                              <span className="task-assignee">
                                {assigneeName ? `👤 ${assigneeName}` : "Unassigned"}
                              </span>
                              {canEdit && (
                                <button
                                  className="task-assign-btn"
                                  title="Reassign task"
                                  onClick={() => setAssigningTaskId(task.id)}
                                >
                                  ✎
                                </button>
                              )}
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
        })}

        {/* ===== STORYLESS TASKS ROW ===== */}
        <div className="taskboard-grid__row taskboard-grid__row--storyless">
          <div className="taskboard-grid__cell taskboard-grid__cell--story">
            <div className="storyless">
              <span className="storyless__label">Storyless tasks</span>
            </div>
          </div>
          {STATUS_COLUMNS.map((col) => (
            <div
              key={col.key}
              className={`taskboard-grid__cell taskboard-grid__cell--status taskboard-grid__cell--status-${col.key}`}
            />
          ))}
        </div>
      </div>

      {/* ===== TASK CREATE MODAL ===== */}
      {activeStory && (
        <TaskCreateModal
          projectSlug={slug}
          userstoryId={activeStory.id}
          onClose={() => setActiveStory(null)}
          onCreated={(task) =>
            setTasks((prev) => [...prev, task])
          }
        />
      )}

      {/* ===== ASSIGN MEMBER MODAL ===== */}
      {assigningTaskId && (
        <div
          className="assign-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setAssigningTaskId(null);
          }}
        >
          <div className="assign-modal">
            <button
              className="assign-close"
              onClick={() => setAssigningTaskId(null)}
              aria-label="Close"
            >
              ✕
            </button>

            <h2>Assign Task #{assigningTaskId}</h2>
            <p className="assign-subtitle">Select a member to assign this task to:</p>

            {members.length === 0 ? (
              <div className="assign-empty">No members available.</div>
            ) : (
              <div className="member-list">
                {members.map((membership) => (
                  <div key={membership.id} className="member-item">
                    <div className="member-item__avatar">
                      {membership.user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="member-item__info">
                      <div className="member-item__name">{membership.user.username}</div>
                      <div className="member-item__email">{membership.user.email}</div>
                      {membership.user.role && (
                        <div className="member-item__role">{membership.user.role}</div>
                      )}
                    </div>
                    <button
                      className="member-item__assign-btn"
                      onClick={() => handleAssignTask(assigningTaskId, membership.user.id)}
                      disabled={assigningUsers.has(membership.user.id)}
                      title="Assign to this member"
                    >
                      {assigningUsers.has(membership.user.id) ? "⏳" : "+"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
