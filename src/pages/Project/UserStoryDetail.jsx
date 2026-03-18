
// import { useEffect, useState } from "react";
// import { useNavigate,useParams } from "react-router-dom";
// // import { authFetch } from "../../services/authFetch";
// import "./UserStoryDetail.css";
// import {
//   getStory,
//   updateStory,
//   deleteStory
// } from "../../services/userStoryService";
// import {
//   getTasksByStory,
//   createTask
// } from "../../services/taskService";



// const STATUS_OPTIONS = ["New", "Ready", "In Progress", "Done", "Archived"];

// export default function UserStoryDetail() {
//   const { id } = useParams();

//   const [story, setStory] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Editable fields
//   const [subject, setSubject] = useState("");
//   const [description, setDescription] = useState("");
//   const [status, setStatus] = useState("New");

//   const [saving, setSaving] = useState(false);
//   const [dirty, setDirty] = useState(false);
//   const [tasks, setTasks] = useState([]);
//   const [showTaskModal, setShowTaskModal] = useState(false);


//   const navigate = useNavigate();


//   useEffect(() => {
//     loadStory();
//   }, [id]);

//   const loadStory = async () => {
//     try {
//       const data = await getStory(id);
//       setStory(data);
//       setSubject(data.subject || "");
//       setDescription(data.description || "");
//       setStatus(data.status);
//       const taskData = await getTasksByStory(id);
//       setTasks(taskData);

//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= DELETE ================= */

//   const deleteStorydetail = async () => {
//         const confirmed = window.confirm(
//           "Are you sure you want to delete this user story?"
//         );

//         if (!confirmed) return;

//         try {
//           await deleteStory(id);

          

//           // Redirect to backlog
//           navigate(-1); // go back to backlog
//         } catch (err) {
//           console.error(err);
//           alert("Failed to delete user story");
//         }
//       };


//   /* ================= SAVE ================= */

//   const saveChanges = async () => {
//     try {
//       setSaving(true);

//       const updated = await updateStory(id, {
//         subject,
//         description,
//         status,
//       });

//       setStory(updated);
//       setDirty(false);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setSaving(false);
//     }
//   };


//   if (loading) return <div className="us-detail">Loading…</div>;
//   if (!story) return <div className="us-detail">Not found</div>;

//   return (
//     <div className="us-detail">
//       {/* HEADER */}
//       <div className="us-header">
//         <h1>
//           #{story.ref}
//           <input
//             className="us-subject-input"
//             value={subject}
//             onChange={(e) => {
//               setSubject(e.target.value);
//               setDirty(true);
//             }}
//           />
//         </h1>

//         <div className="us-status">
//           OPEN{" "}
//           <select
//             className="pill"
//             value={status}
//             onChange={(e) => {
//               setStatus(e.target.value);
//               setDirty(true);
//             }}
//           >
//             {STATUS_OPTIONS.map((s) => (
//               <option key={s}>{s}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <span className="us-type">USER STORY</span>

//       <div className="us-created">
//         Created at{" "}
//         <span>{new Date(story.created_at).toLocaleString()}</span>
//       </div>

//       {/* SAVE BAR */}
//       {dirty && (
//         <div className="us-save-bar">
//           <button
//             className="save-btn"
//             disabled={saving}
//             onClick={saveChanges}
//           >
//             {saving ? "Saving…" : "Save changes"}
//           </button>
//         </div>
//       )}

//       <div className="us-layout">
//         {/* LEFT */}
//         <div className="us-left">
//           <div className="tags">Add tag +</div>

//           <textarea
//             className="us-desc-input"
//             value={description}
//             placeholder="Add a description"
//             onChange={(e) => {
//               setDescription(e.target.value);
//               setDirty(true);
//             }}
//           />

//           {/* ATTACHMENTS */}
//           <div className="attachments">
//             <div className="attachments-header">
//               <span>0 Attachments</span>
//               <button>+</button>
//             </div>
//             <div className="dropzone">Drop attachments here!</div>
//           </div>

//           {/* COMMENTS */}
//           <div className="comments">
//             <h4>0 Comments</h4>
//             <textarea placeholder="Type a new comment here" />
//           </div>
//         </div>

//         {/* RIGHT (unchanged UI) */}
//         <div className="us-right">
//           <div className="points">
//             <h4>POINTS</h4>
//             <div>UX <span>?</span></div>
//             <div>Design <span>?</span></div>
//             <div>Front <span>?</span></div>
//             <div>Back <span>?</span></div>
//             <div className="total">total points <span>?</span></div>
//           </div>

//           <div className="assigned">
//             <h4>ASSIGNED</h4>
//             <div className="assignee">Unassigned</div>
//             <button>+ Add assigned</button>
//           </div>

//           <div className="watchers">
//             <h4>WATCHERS</h4>
//             <button>+ Add watchers</button>
//             <button className="link">Watch</button>
//           </div>

//           <div className="us-icons">
//             <button>⏱</button>
//             <button>👥</button>
//             <button>📁</button>
//             <button>🔒</button>
//             <button
//               className="danger"
//               title="Delete user story"
//               onClick={deleteStorydetail}
//             >
//               🗑
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TaskCreateModal from "../../components/TaskCreateModal/TaskCreateModal";

import {
  getStory,
  updateStory,
  deleteStory,
} from "../../services/userStoryService";

import {
  getTasksByStory,
  updateTask,
  deleteTask,
} from "../../services/taskService";

import { getProjectMembers } from "../../services/membershipService";
import { getProjectIdBySlug } from "../../services/projectService";

import "./UserStoryDetail.css";

const STATUS_OPTIONS = [
  { value: 1, label: "New" },
  { value: 2, label: "In Progress" },
  { value: 3, label: "Ready For Test" },
  { value: 4, label: "Done" },
];

export default function UserStoryDetail() {
  const { id, slug } = useParams();
  const navigate = useNavigate();

  /* ── Auth / permissions ── */
  const user = JSON.parse(localStorage.getItem("user"));
  const isSuperAdmin = user?.is_superuser === true;
  const canEdit = isSuperAdmin || user?.role === "PM" || user?.role === "MGR" || user?.role === "Manager";

  /* ── Story state ── */
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  /* ── Inline editing ── */
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState("");

  const [editingDesc, setEditingDesc] = useState(false);
  const [descValue, setDescValue] = useState("");

  /* ── Status ── */
  const [status, setStatus] = useState(1);

  /* ── Tasks ── */
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);

  /* ── Members / assign ── */
  const [projectId, setProjectId] = useState(null);
  const [assigningTaskId, setAssigningTaskId] = useState(null);
  const [members, setMembers] = useState([]);
  const [assigningUsers, setAssigningUsers] = useState(new Set());

  /* ── Load story ── */
  useEffect(() => {
    const loadStory = async () => {
      try {
        setLoading(true);
        const data = await getStory(id);
        setStory(data);
        setTitleValue(data.title || "");
        setDescValue(data.description || "");
        setStatus(data.status || 1);
        const taskData = await getTasksByStory(id);
        setTasks(taskData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadStory();
  }, [id]);

  /* ── Load project ID ── */
  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      try {
        const pid = await getProjectIdBySlug(slug);
        setProjectId(pid || null);
      } catch (err) {
        console.error("Failed to load project", err);
      }
    };
    load();
  }, [slug]);

  /* ── Load members ── */
  useEffect(() => {
    const load = async () => {
      if (!projectId) return;
      try {
        const data = await getProjectMembers(projectId);
        setMembers(data);
      } catch (err) {
        console.error("Failed to load members", err);
      }
    };
    load();
  }, [projectId]);

  /* ── Save title ── */
  const handleSaveTitle = async () => {
    if (!titleValue.trim() || titleValue === story.title) {
      setEditingTitle(false);
      return;
    }
    setSaving(true);
    try {
      const { createSlug } = await import("../../utils/statusMapping");
      const updated = await updateStory(id, {
        title: titleValue.trim(),
        slug: createSlug(titleValue.trim()),
      });
      setStory((prev) => ({ ...prev, title: updated.title, slug: updated.slug }));
    } catch (err) {
      console.error("Failed to save title", err);
      alert("Failed to save title.");
    } finally {
      setSaving(false);
      setEditingTitle(false);
    }
  };

  /* ── Save description ── */
  const handleSaveDesc = async () => {
    setSaving(true);
    try {
      await updateStory(id, { description: descValue });
      setStory((prev) => ({ ...prev, description: descValue }));
    } catch (err) {
      console.error("Failed to save description", err);
      alert("Failed to save description.");
    } finally {
      setSaving(false);
      setEditingDesc(false);
    }
  };

  /* ── Update status ── */
  const handleStatusChange = async (e) => {
    const newStatus = parseInt(e.target.value);
    setStatus(newStatus);
    try {
      await updateStory(id, { status: newStatus });
      setStory((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update status.");
    }
  };

  /* ── Delete story ── */
  const handleDelete = async () => {
    if (!window.confirm("Delete this user story? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await deleteStory(id);
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Failed to delete user story.");
      setDeleting(false);
    }
  };

  /* ── Assign task ── */
  const handleAssignTask = async (taskId, userId) => {
    setAssigningUsers((prev) => new Set(prev).add(userId));
    try {
      await updateTask(taskId, { assignee: userId });
      const taskData = await getTasksByStory(id);
      setTasks(taskData);
      setAssigningTaskId(null);
    } catch (err) {
      console.error("Failed to assign task", err);
      alert("Failed to assign task.");
    } finally {
      setAssigningUsers((prev) => {
        const next = new Set(prev);
        next.delete(userId);
        return next;
      });
    }
  };

  /* ── Delete task ── */
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (err) {
      console.error("Failed to delete task", err);
      alert("Failed to delete task.");
    }
  };

  const getAssigneeName = (task) => {
    if (task.assignee_username) return task.assignee_username;
    if (task.assignee) {
      const member = members.find((m) => m.user.id === task.assignee);
      return member ? member.user.username : `User #${task.assignee}`;
    }
    return null;
  };

  const currentStatus = STATUS_OPTIONS.find((s) => s.value === status) || STATUS_OPTIONS[0];

  if (loading) return <div className="usd-loading">Loading…</div>;
  if (!story) return <div className="usd-loading">Story not found.</div>;

  return (
    <>
      <div className="usd-page">

        {/* ── Back ── */}
        <button className="usd-back" onClick={() => navigate(-1)}>
          ← Back to Backlog
        </button>

        {/* ── Title row ── */}
        <div className="usd-title-row">
          <div className="usd-title-wrap">
            <span className="usd-badge">USER STORY</span>

            {editingTitle ? (
              <input
                className="usd-title-input"
                value={titleValue}
                autoFocus
                onChange={(e) => setTitleValue(e.target.value)}
                onBlur={handleSaveTitle}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveTitle();
                  if (e.key === "Escape") {
                    setTitleValue(story.title);
                    setEditingTitle(false);
                  }
                }}
              />
            ) : (
              <h1
                className={`usd-title ${canEdit ? "usd-title--editable" : ""}`}
                title={canEdit ? "Click to edit" : ""}
                onClick={() => canEdit && setEditingTitle(true)}
              >
                <span className="usd-ref">#{story.id}</span> {story.title}
                {canEdit && <span className="usd-edit-hint"> ✎</span>}
              </h1>
            )}

            <div className="usd-created">
              Created{" "}
              <span>{new Date(story.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>
            </div>
          </div>

          <div className="usd-header-actions">
            <div className="usd-status-wrap">
              <span
                className="usd-status-dot"
                style={{ background: status >= 4 ? "#36b37e" : "#00a0b0" }}
              />
              <select
                className="usd-status-select"
                value={status}
                onChange={handleStatusChange}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {canEdit && (
              <button
                className="usd-delete-btn"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting…" : "🗑 Delete Story"}
              </button>
            )}
          </div>
        </div>

        {/* ── Layout ── */}
        <div className="usd-layout">

          {/* ══ LEFT ══ */}
          <div className="usd-left">

            {/* Description */}
            <div className="usd-section">
              <div className="usd-section-label">Description</div>

              {editingDesc ? (
                <div className="usd-desc-editor">
                  <textarea
                    className="usd-desc-input"
                    value={descValue}
                    autoFocus
                    onChange={(e) => setDescValue(e.target.value)}
                  />
                  <div className="usd-save-bar">
                    <button
                      className="usd-save-btn"
                      onClick={handleSaveDesc}
                      disabled={saving}
                    >
                      {saving ? "Saving…" : "Save"}
                    </button>
                    <button
                      className="usd-cancel-btn"
                      onClick={() => {
                        setDescValue(story.description || "");
                        setEditingDesc(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className={`usd-desc ${canEdit ? "usd-desc--editable" : ""}`}
                  onClick={() => canEdit && setEditingDesc(true)}
                  title={canEdit ? "Click to edit" : ""}
                >
                  {story.description || (
                    <span className="usd-placeholder">
                      {canEdit ? "Click to add a description…" : "No description provided."}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Tasks */}
            <div className="usd-section">
              <div className="usd-section-label">
                Tasks
                <span className="usd-task-count">{tasks.length}</span>
              </div>

              {tasks.length === 0 ? (
                <div className="usd-task-empty">No tasks yet.</div>
              ) : (
                <div className="usd-task-list">
                  {tasks.map((task) => {
                    const assigneeName = getAssigneeName(task);
                    return (
                      <div key={task.id} className="usd-task-row">
                        <div className="usd-task-info">
                          <span className="usd-task-id">#{task.id}</span>
                          <span
                            className="usd-task-title"
                            onClick={() => navigate(`/project/${slug}/task/${task.id}`)}
                          >
                            {task.title}
                          </span>
                          {assigneeName && (
                            <span className="usd-task-assignee">👤 {assigneeName}</span>
                          )}
                        </div>
                        {canEdit && (
                          <div className="usd-task-actions">
                            <button
                              className="usd-assign-btn"
                              onClick={() => setAssigningTaskId(task.id)}
                            >
                              Assign
                            </button>
                            <button
                              className="usd-task-delete-btn"
                              onClick={() => handleDeleteTask(task.id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {canEdit && (
                <button className="usd-add-task-btn" onClick={() => setShowTaskModal(true)}>
                  + Add Task
                </button>
              )}
            </div>

            {/* Comments */}
            <div className="usd-section usd-comments">
              <div className="usd-section-label">Comments</div>
              <div className="usd-comments-empty">0 comments</div>
              <textarea className="usd-comment-input" placeholder="Add a comment…" />
            </div>

          </div>

          {/* ══ RIGHT ══ */}
          <div className="usd-right">

            <div className="usd-meta-card">
              <div className="usd-meta-row">
                <span className="usd-meta-label">Status</span>
                <span className="usd-meta-value">
                  <span className="usd-status-label">{currentStatus.label}</span>
                </span>
              </div>

              <div className="usd-meta-divider" />

              <div className="usd-meta-row">
                <span className="usd-meta-label">Created</span>
                <span className="usd-meta-value">
                  {new Date(story.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="usd-meta-divider" />

              <div className="usd-meta-row">
                <span className="usd-meta-label">Tasks</span>
                <span className="usd-meta-value">{tasks.length}</span>
              </div>
            </div>

            {/* Points */}
            <div className="usd-points-card">
              <div className="usd-section-label">Story Points</div>
              {["UX", "Design", "Front", "Back"].map((label) => (
                <div key={label} className="usd-points-row">
                  <span>{label}</span>
                  <span className="usd-points-val">?</span>
                </div>
              ))}
              <div className="usd-points-divider" />
              <div className="usd-points-row usd-points-total">
                <span>Total</span>
                <span className="usd-points-val">?</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Task modal */}
      {showTaskModal && (
        <TaskCreateModal
          projectSlug={story.project_slug}
          userstoryId={story.id}
          onClose={() => setShowTaskModal(false)}
          onCreated={(task) => setTasks((prev) => [...prev, task])}
        />
      )}

      {/* Assign modal */}
      {assigningTaskId && (
        <div
          className="usd-assign-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) setAssigningTaskId(null); }}
        >
          <div className="usd-assign-modal">
            <button className="usd-assign-close" onClick={() => setAssigningTaskId(null)}>✕</button>
            <h2>Assign Task #{assigningTaskId}</h2>
            <p className="usd-assign-subtitle">Select a member to assign this task to:</p>

            {members.length === 0 ? (
              <div className="usd-assign-empty">No members available.</div>
            ) : (
              <div className="usd-member-list">
                {members.map((membership) => (
                  <div key={membership.id} className="usd-member-item">
                    <div className="usd-member-avatar">
                      {membership.user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="usd-member-info">
                      <div className="usd-member-name">{membership.user.username}</div>
                      <div className="usd-member-email">{membership.user.email}</div>
                    </div>
                    <button
                      className="usd-member-assign-btn"
                      onClick={() => handleAssignTask(assigningTaskId, membership.user.id)}
                      disabled={assigningUsers.has(membership.user.id)}
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
