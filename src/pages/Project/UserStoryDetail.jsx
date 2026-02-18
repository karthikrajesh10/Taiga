
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
  deleteStory
} from "../../services/userStoryService";

import {
  getTasksByStory
} from "../../services/taskService";

import "./UserStoryDetail.css";

const STATUS_OPTIONS = ["New", "Ready", "In Progress", "Done", "Archived"];

export default function UserStoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("New");

  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);

  useEffect(() => {
    loadStory();
  }, [id]);

  const loadStory = async () => {
    try {
      setLoading(true);

      const data = await getStory(id);
      setStory(data);

      setSubject(data.title || "");
      setDescription(data.description || "");
      setStatus(data.status || 1);

      const taskData = await getTasksByStory(id);
      setTasks(taskData);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */

  const deleteStoryDetail = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user story?"
    );

    if (!confirmed) return;

    try {
      await deleteStory(id);
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Failed to delete user story");
    }
  };

  /* ================= SAVE ================= */

  const saveChanges = async () => {
    try {
      setSaving(true);

      const { stringToStatusNumber, createSlug } = await import("../../utils/statusMapping");
      
      const updated = await updateStory(id, {
        title: subject,
        slug: createSlug(subject),
        description,
        status: typeof status === 'string' ? stringToStatusNumber(status) : status,
      });

      setStory(updated);
      setDirty(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="us-detail">Loading…</div>;
  if (!story) return <div className="us-detail">Not found</div>;

  return (
    <>
      <div className="us-detail">
        {/* HEADER */}
        <div className="us-header">
          <h1>
            #{story.id}
            <input
              className="us-subject-input"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                setDirty(true);
              }}
            />
          </h1>

          <div className="us-status">
            OPEN{" "}
            <select
              className="pill"
              value={status}
              onChange={(e) => {
                setStatus(parseInt(e.target.value));
                setDirty(true);
              }}
            >
              <option value={1}>New</option>
              <option value={2}>In Progress</option>
              <option value={3}>Ready For Test</option>
              <option value={4}>Done</option>
            </select>
          </div>
        </div>

        <span className="us-type">USER STORY</span>

        <div className="us-created">
          Created at{" "}
          <span>{new Date(story.created_at).toLocaleString()}</span>
        </div>

        {/* SAVE BAR */}
        {dirty && (
          <div className="us-save-bar">
            <button
              className="save-btn"
              disabled={saving}
              onClick={saveChanges}
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        )}

        <div className="us-layout">
          {/* LEFT */}
          <div className="us-left">

            <div className="tags">Add tag +</div>

            <textarea
              className="us-desc-input"
              value={description}
              placeholder="Add a description"
              onChange={(e) => {
                setDescription(e.target.value);
                setDirty(true);
              }}
            />

            {/* ✅ TASK SECTION */}
            <div className="us-tasks">
              <h4>Tasks</h4>

              {tasks.length === 0 ? (
                <div className="us-task-empty">
                  No tasks yet.
                </div>
              ) : (
                tasks.map((task) => (
                  <div key={task.id} className="us-task-row">
                    #{task.id} {task.title}
                  </div>
                ))
              )}

              <button
                className="link"
                onClick={() => setShowTaskModal(true)}
              >
                + Add Task
              </button>
            </div>

            {/* ATTACHMENTS */}
            <div className="attachments">
              <div className="attachments-header">
                <span>0 Attachments</span>
                <button>+</button>
              </div>
              <div className="dropzone">
                Drop attachments here!
              </div>
            </div>

            {/* COMMENTS */}
            <div className="comments">
              <h4>0 Comments</h4>
              <textarea placeholder="Type a new comment here" />
            </div>

          </div>

          {/* RIGHT */}
          <div className="us-right">

            <div className="points">
              <h4>POINTS</h4>
              <div>UX <span>?</span></div>
              <div>Design <span>?</span></div>
              <div>Front <span>?</span></div>
              <div>Back <span>?</span></div>
              <div className="total">total points <span>?</span></div>
            </div>

            <div className="assigned">
              <h4>ASSIGNED</h4>
              <div className="assignee">Unassigned</div>
              <button>+ Add assigned</button>
            </div>

            <div className="watchers">
              <h4>WATCHERS</h4>
              <button>+ Add watchers</button>
              <button className="link">Watch</button>
            </div>

            <div className="us-icons">
              <button>⏱</button>
              <button>👥</button>
              <button>📁</button>
              <button>🔒</button>
              <button
                className="danger"
                title="Delete user story"
                onClick={deleteStoryDetail}
              >
                🗑
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ✅ TASK MODAL */}
      {showTaskModal && (
        <TaskCreateModal
          projectSlug={story.project_slug}
          userstoryId={story.id}
          onClose={() => setShowTaskModal(false)}
          onCreated={(task) =>
            setTasks((prev) => [...prev, task])
          }
        />
      )}
    </>
  );
}
