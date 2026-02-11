// // // import { useParams } from "react-router-dom";
// // // import "./UserStoryDetail.css";

// // // export default function UserStoryDetail() {
// // //   const { id } = useParams();

// // //   // later: fetch from global store / backend
// // //   const story = {
// // //     id,
// // //     subject: "Frontend",
// // //     description: "Create frontend",
// // //     createdBy: "admin",
// // //     createdAt: "03 Feb 2026 16:27",
// // //     status: "New",
// // //     points: {
// // //       ux: "?",
// // //       design: "?",
// // //       front: "?",
// // //       back: "?",
// // //       total: "?",
// // //     },
// // //     assigned: "admin",
// // //   };

// // //   return (
// // //     <div className="us-detail">
// // //       {/* HEADER */}
// // //       <div className="us-header">
// // //         <h1>#{story.id} {story.subject}</h1>

// // //         <div className="us-status">
// // //           OPEN <span className="pill">NEW ⌄</span>
// // //         </div>
// // //       </div>

// // //       <span className="us-type">USER STORY</span>

// // //       <div className="us-created">
// // //         Created by <b>{story.createdBy}</b>
// // //         <span>{story.createdAt}</span>
// // //       </div>

// // //       <div className="us-layout">
// // //         {/* LEFT */}
// // //         <div className="us-left">
// // //           <div className="tags">Add tag +</div>

// // //           <p className="us-desc">{story.description}</p>

// // //           {/* ATTACHMENTS */}
// // //           <div className="attachments">
// // //             <div className="attachments-header">
// // //               <span>0 Attachments</span>
// // //               <button>+</button>
// // //             </div>
// // //             <div className="dropzone">Drop attachments here!</div>
// // //           </div>

// // //           {/* TASKS */}
// // //           <div className="tasks">
// // //             <div className="tasks-header">
// // //               <span>Tasks</span>
// // //               <button>+</button>
// // //             </div>
// // //           </div>

// // //           {/* COMMENTS */}
// // //           <div className="comments">
// // //             <h4>0 Comments</h4>
// // //             <textarea placeholder="Type a new comment here" />
// // //           </div>
// // //         </div>

// // //         {/* RIGHT */}
// // //         <div className="us-right">
// // //           <div className="points">
// // //             <h4>POINTS</h4>
// // //             <div>UX <span>{story.points.ux}</span></div>
// // //             <div>Design <span>{story.points.design}</span></div>
// // //             <div>Front <span>{story.points.front}</span></div>
// // //             <div>Back <span>{story.points.back}</span></div>
// // //             <div className="total">
// // //               total points <span>{story.points.total}</span>
// // //             </div>
// // //           </div>

// // //           <div className="assigned">
// // //             <h4>ASSIGNED</h4>
// // //             <div className="assignee">{story.assigned}</div>
// // //             <button>+ Add assigned</button>
// // //           </div>

// // //           <div className="watchers">
// // //             <h4>WATCHERS</h4>
// // //             <button>+ Add watchers</button>
// // //             <button className="link">Watch</button>
// // //           </div>

// // //           <div className="us-icons">
// // //             <button>⏱</button>
// // //             <button>👥</button>
// // //             <button>📁</button>
// // //             <button>🔒</button>
// // //             <button>🗑</button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import { authFetch } from "../../services/api";
// // import "./UserStoryDetail.css";

// // export default function UserStoryDetail() {
// //   const { id } = useParams();
// //   const [story, setStory] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     loadStory();
// //   }, [id]);

// //   const loadStory = async () => {
// //     try {
// //       const res = await authFetch(`/userstories/${id}/`);
// //       if (!res.ok) throw new Error("Failed to load story");

// //       const data = await res.json();
// //       setStory(data);
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (loading) return <div className="us-detail">Loading…</div>;
// //   if (!story) return <div className="us-detail">Not found</div>;

// //   return (
// //     <div className="us-detail">
// //       {/* HEADER */}
// //       <div className="us-header">
// //         <h1>
// //           #{story.id} {story.subject}
// //         </h1>

// //         <div className="us-status">
// //           OPEN <span className="pill">{story.status} ⌄</span>
// //         </div>
// //       </div>

// //       <span className="us-type">USER STORY</span>

// //       <div className="us-created">
// //         Created at{" "}
// //         <span>{new Date(story.created_at).toLocaleString()}</span>
// //       </div>

// //       <div className="us-layout">
// //         {/* LEFT */}
// //         <div className="us-left">
// //           <div className="tags">Add tag +</div>

// //           <p className="us-desc">{story.description || "No description"}</p>

// //           {/* ATTACHMENTS */}
// //           <div className="attachments">
// //             <div className="attachments-header">
// //               <span>0 Attachments</span>
// //               <button>+</button>
// //             </div>
// //             <div className="dropzone">Drop attachments here!</div>
// //           </div>

// //           {/* COMMENTS */}
// //           <div className="comments">
// //             <h4>0 Comments</h4>
// //             <textarea placeholder="Type a new comment here" />
// //           </div>
// //         </div>

// //         {/* RIGHT */}
// //         <div className="us-right">
// //           <div className="points">
// //             <h4>POINTS</h4>
// //             <div>UX <span>?</span></div>
// //             <div>Design <span>?</span></div>
// //             <div>Front <span>?</span></div>
// //             <div>Back <span>?</span></div>
// //             <div className="total">
// //               total points <span>?</span>
// //             </div>
// //           </div>

// //           <div className="assigned">
// //             <h4>ASSIGNED</h4>
// //             <div className="assignee">Unassigned</div>
// //             <button>+ Add assigned</button>
// //           </div>

// //           <div className="watchers">
// //             <h4>WATCHERS</h4>
// //             <button>+ Add watchers</button>
// //             <button className="link">Watch</button>
// //           </div>

// //           <div className="us-icons">
// //             <button>⏱</button>
// //             <button>👥</button>
// //             <button>📁</button>
// //             <button>🔒</button>
// //             <button>🗑</button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { authFetch } from "../../services/api";
// import "./UserStoryDetail.css";

// const STATUS_OPTIONS = [
//   "New",
//   "Ready",
//   "In Progress",
//   "Done",
//   "Archived",
// ];

// export default function UserStoryDetail() {
//   const { id } = useParams();
//   const [story, setStory] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [subject, setSubject] = useState("");
//   const [description, setDescription] = useState("");
//   const [status, setStatus] = useState("");

//   useEffect(() => {
//     loadStory();
//   }, [id]);

//   const loadStory = async () => {
//     try {
//       const res = await authFetch(`/userstories/${id}/`);
//       if (!res.ok) throw new Error("Failed to load story");

//       const data = await res.json();
//       setStory(data);
//       setSubject(data.subject || "");
//       setDescription(data.description || "");
//       setStatus(data.status || "New");
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= PATCH HELPERS ================= */

//   const patchStory = async (payload) => {
//     try {
//       await authFetch(`/userstories/${id}/`, {
//         method: "PATCH",
//         body: JSON.stringify(payload),
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const onSubjectBlur = () => {
//     if (subject !== story.subject) {
//       patchStory({ subject });
//       setStory((s) => ({ ...s, subject }));
//     }
//   };

//   const onDescriptionBlur = () => {
//     if (description !== story.description) {
//       patchStory({ description });
//       setStory((s) => ({ ...s, description }));
//     }
//   };

//   const onStatusChange = (newStatus) => {
//     setStatus(newStatus);
//     patchStory({ status: newStatus });
//     setStory((s) => ({ ...s, status: newStatus }));
//   };

//   /* ================= RENDER ================= */

//   if (loading) return <div className="us-detail">Loading…</div>;
//   if (!story) return <div className="us-detail">Not found</div>;

//   return (
//     <div className="us-detail">
//       {/* HEADER */}
//       <div className="us-header">
//         <h1>
//           #{story.ref}{" "}
//           <input
//             className="us-subject-input"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             onBlur={onSubjectBlur}
//           />
//         </h1>

//         <div className="us-status">
//           OPEN{" "}
//           <select
//             className="pill"
//             value={status}
//             onChange={(e) => onStatusChange(e.target.value)}
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

//       <div className="us-layout">
//         {/* LEFT */}
//         <div className="us-left">
//           <div className="tags">Add tag +</div>

//           <textarea
//             className="us-desc-input"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             onBlur={onDescriptionBlur}
//             placeholder="Add a description"
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

//         {/* RIGHT */}
//         <div className="us-right">
//           <div className="points">
//             <h4>POINTS</h4>
//             <div>UX <span>?</span></div>
//             <div>Design <span>?</span></div>
//             <div>Front <span>?</span></div>
//             <div>Back <span>?</span></div>
//             <div className="total">
//               total points <span>?</span>
//             </div>
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
//             <button>🗑</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { authFetch } from "../../services/api";
import "./UserStoryDetail.css";

const STATUS_OPTIONS = ["New", "Ready", "In Progress", "Done", "Archived"];

export default function UserStoryDetail() {
  const { id } = useParams();

  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  // Editable fields
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("New");

  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    loadStory();
  }, [id]);

  const loadStory = async () => {
    try {
      const res = await authFetch(`/userstories/${id}/`);
      if (!res.ok) throw new Error("Failed to load story");

      const data = await res.json();
      setStory(data);
      setSubject(data.subject || "");
      setDescription(data.description || "");
      setStatus(data.status || "New");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  /* ================= DELETE ================= */

  const deleteStory = async () => {
        const confirmed = window.confirm(
          "Are you sure you want to delete this user story?"
        );

        if (!confirmed) return;

        try {
          const res = await authFetch(`/userstories/${id}/`, {
            method: "DELETE",
          });

          if (!res.ok) throw new Error("Delete failed");

          // Redirect to backlog
          navigate(-1); // go back to backlog
        } catch (err) {
          console.error(err);
          alert("Failed to delete user story");
        }
      };


  /* ================= SAVE ================= */

  const saveChanges = async () => {
    try {
      setSaving(true);

      const payload = {
        subject,
        description,
        status,
      };

      const res = await authFetch(`/userstories/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Save failed");

      const updated = await res.json();
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
    <div className="us-detail">
      {/* HEADER */}
      <div className="us-header">
        <h1>
          #{story.ref}
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
              setStatus(e.target.value);
              setDirty(true);
            }}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
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

          {/* ATTACHMENTS */}
          <div className="attachments">
            <div className="attachments-header">
              <span>0 Attachments</span>
              <button>+</button>
            </div>
            <div className="dropzone">Drop attachments here!</div>
          </div>

          {/* COMMENTS */}
          <div className="comments">
            <h4>0 Comments</h4>
            <textarea placeholder="Type a new comment here" />
          </div>
        </div>

        {/* RIGHT (unchanged UI) */}
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
              onClick={deleteStory}
            >
              🗑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
