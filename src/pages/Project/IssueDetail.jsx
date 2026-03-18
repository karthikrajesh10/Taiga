// // // src/pages/Project/IssueDetail.jsx
// // import { useParams } from "react-router-dom";
// // import "./IssueDetail.css";

// // export default function IssueDetail() {
// //   const { id } = useParams();

// //   const issue = {
// //     id,
// //     subject: "Login",
// //     description: "Need to complete login authentication",
// //     type: "enhancement",
// //     severity: "normal",
// //     priority: "normal",
// //     createdBy: "admin",
// //     createdAt: "05 Feb 2026 11:58",
// //   };

// //   return (
// //     <div className="issue-detail">
// //       {/* HEADER */}
// //       <div className="issue-detail__header">
// //         <h1>
// //           #{issue.id} {issue.subject}
// //         </h1>

// //         <div className="issue-detail__status">
// //           <span className="status-text">OPEN</span>
// //           <span className="status-pill">NEW ⌄</span>
// //         </div>
// //       </div>

// //       <div className="issue-detail__layout">
// //         {/* LEFT */}
// //         <div className="issue-detail__left">
// //           <span className="tag-link">Add tag +</span>

// //           <p className="issue-description">{issue.description}</p>

// //           {/* ATTACHMENTS */}
// //           <div className="attachments">
// //             <div className="attachments-header">
// //               <span>0 Attachments</span>
// //               <button className="icon-btn">+</button>
// //             </div>
// //             <div className="dropzone">Drop attachments here!</div>
// //           </div>

// //           {/* COMMENTS */}
// //           <div className="comments">
// //             <div className="comments-header">0 Comments</div>
// //             <textarea placeholder="Type a new comment here" />
// //           </div>
// //         </div>

// //         {/* RIGHT */}
// //         <div className="issue-detail__right">
// //           <div className="meta-row">
// //             <span>type</span>
// //             <span className="meta-value">
// //               Enhancement <span className="dot enhancement" />
// //             </span>
// //           </div>

// //           <div className="meta-row">
// //             <span>severity</span>
// //             <span className="meta-value">
// //               Normal <span className="dot normal" />
// //             </span>
// //           </div>

// //           <div className="meta-row">
// //             <span>priority</span>
// //             <span className="meta-value">
// //               Normal <span className="dot prio-normal" />
// //             </span>
// //           </div>

// //           <hr />

// //           <div className="side-block">
// //             <strong>ASSIGNED</strong>
// //             <div className="side-actions">
// //               <button>+ Add assigned</button>
// //               <button className="link">Assign to me</button>
// //             </div>
// //           </div>

// //           <div className="side-block">
// //             <strong>WATCHERS</strong>
// //             <div className="side-actions">
// //               <button>+ Add watchers</button>
// //               <button className="link">Watch</button>
// //             </div>
// //           </div>

// //           <div className="issue-icons">
// //             <button>⏱</button>
// //             <button>📄</button>
// //             <button>🔗</button>
// //             <button>🔒</button>
// //             <button>🗑</button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { authFetch } from "../../services/authFetch";

// import "./IssueDetail.css";

// const STATUS_OPTIONS = ["New", "In Progress", "Ready", "Closed"];

// export default function IssueDetail() {
//   const { slug, id } = useParams();
//   const navigate = useNavigate();

//   const [issue, setIssue] = useState(null);
//   const [loading, setLoading] = useState(true);

//   /* ================= LOAD ISSUE ================= */

//   useEffect(() => {
//     const loadIssue = async () => {
//       try {
//         const issueData = await authFetch(`/issues/${id}/`);
//         setIssue(issueData);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadIssue();
//   }, [id]);

//   /* ================= UPDATE STATUS ================= */

//   const updateStatus = async (status) => {
//     try {
//       const { updateIssue } = await import("../../services/issueService");
//       const { stringToStatusNumber } = await import("../../utils/statusMapping");
      
//       const statusNumber = typeof status === 'string' ? stringToStatusNumber(status) : status;
//       await updateIssue(id, { status: statusNumber });

//       setIssue((prev) => ({ ...prev, status: statusNumber }));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   /* ================= DELETE ISSUE ================= */

//   const deleteIssue = async () => {
//     if (!window.confirm("Delete this issue?")) return;

//     try {
//       const { deleteIssue: deleteIssueService } = await import("../../services/issueService");
//       await deleteIssueService(id);
//       navigate(`/project/${slug}/issues`);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading) return <div className="issue-detail">Loading…</div>;
//   if (!issue) return <div className="issue-detail">Issue not found</div>;

//   return (
//     <div className="issue-detail">
//       {/* ===== HEADER ===== */}
//       <div className="issue-detail__header">
//         <h1>
//           #{issue.id} {issue.title}
//         </h1>

//         <div className="issue-detail__status">
//           <span className="status-text">OPEN</span>

//           <select
//             className="status-pill"
//             value={issue.status || 1}
//             onChange={(e) => updateStatus(parseInt(e.target.value))}
//           >
//             <option value={1}>New</option>
//             <option value={2}>In Progress</option>
//             <option value={3}>Ready For Test</option>
//             <option value={4}>Done</option>
//           </select>
//         </div>
//       </div>

//       <div className="issue-detail__layout">
//         {/* ===== LEFT ===== */}
//         <div className="issue-detail__left">
//           <span className="tag-link">Add tag +</span>

//           <p className="issue-description">
//             {issue.description || "No description"}
//           </p>

//           {/* COMMENTS (future) */}
//           <div className="comments">
//             <div className="comments-header">0 Comments</div>
//             <textarea placeholder="Type a new comment here" />
//           </div>
//         </div>

//         {/* ===== RIGHT ===== */}
//         <div className="issue-detail__right">
//           <div className="meta-row">
//             <span>type</span>
//             <span className="meta-value">
//               {issue.type || "Question"}{" "}
//               <span
//                 className={`dot ${String(issue.type || "question").toLowerCase()}`}
//               />
//             </span>
//           </div>

//           <hr />

//           <div className="side-block">
//             <strong>CREATED BY</strong>
//             <div>{issue.created_by_username || issue.created_by || "-"}</div>
//           </div>

//           <div className="side-block">
//             <strong>ASSIGNED</strong>
//             <div>{issue.assigned_to_username || "Unassigned"}</div>
//           </div>

//           <div className="issue-icons">
//             <button title="Delete issue" onClick={deleteIssue}>
//               🗑
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authFetch } from "../../services/authFetch";
import { updateIssue, deleteIssue as deleteIssueService } from "../../services/issueService";
import "./IssueDetail.css";

const STATUS_OPTIONS = [
  { value: 1, label: "New" },
  { value: 2, label: "In Progress" },
  { value: 3, label: "Ready For Test" },
  { value: 4, label: "Done" },
];

const TYPE_COLORS = {
  bug: "#e55353",
  enhancement: "#36cfc9",
  question: "#7b61ff",
  normal: "#36b37e",
};

export default function IssueDetail() {
  const { slug, id } = useParams();
  const navigate = useNavigate();

  /* ── Auth / permissions ── */
  const user = JSON.parse(localStorage.getItem("user"));
  const isSuperAdmin = user?.is_superuser === true;
  const canEdit = isSuperAdmin || user?.role === "PM" || user?.role === "MGR";

  /* ── State ── */
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Inline title editing
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState("");

  // Description editing
  const [editingDesc, setEditingDesc] = useState(false);
  const [descValue, setDescValue] = useState("");

  /* ── Load issue ── */
  useEffect(() => {
    const load = async () => {
      try {
        const data = await authFetch(`/issues/${id}/`);
        setIssue(data);
        setTitleValue(data.title);
        setDescValue(data.description || "");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  /* ── Save title ── */
  const handleSaveTitle = async () => {
    if (!titleValue.trim() || titleValue === issue.title) {
      setEditingTitle(false);
      return;
    }
    setSaving(true);
    try {
      await updateIssue(id, { title: titleValue.trim() });
      setIssue((prev) => ({ ...prev, title: titleValue.trim() }));
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
      await updateIssue(id, { description: descValue });
      setIssue((prev) => ({ ...prev, description: descValue }));
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
    try {
      await updateIssue(id, { status: newStatus });
      setIssue((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update status.");
    }
  };

  /* ── Delete issue ── */
  const handleDelete = async () => {
    if (!window.confirm("Delete this issue? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await deleteIssueService(id);
      navigate(`/project/${slug}/issues`);
    } catch (err) {
      console.error("Failed to delete issue", err);
      alert("Failed to delete issue.");
      setDeleting(false);
    }
  };

  if (loading) return <div className="id-loading">Loading issue…</div>;
  if (!issue) return <div className="id-loading">Issue not found.</div>;

  const typeKey = String(issue.type || "normal").toLowerCase();
  const typeColor = TYPE_COLORS[typeKey] || "#adb5bd";
  const currentStatus = STATUS_OPTIONS.find((s) => s.value === issue.status) || STATUS_OPTIONS[0];

  return (
    <div className="id-page">

      {/* ── Back ── */}
      <button className="id-back" onClick={() => navigate(-1)}>
        ← Back to Issues
      </button>

      {/* ── Title row ── */}
      <div className="id-title-row">
        <div className="id-title-wrap">
          {editingTitle ? (
            <input
              className="id-title-input"
              value={titleValue}
              autoFocus
              onChange={(e) => setTitleValue(e.target.value)}
              onBlur={handleSaveTitle}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveTitle();
                if (e.key === "Escape") {
                  setTitleValue(issue.title);
                  setEditingTitle(false);
                }
              }}
            />
          ) : (
            <h1
              className={`id-title ${canEdit ? "id-title--editable" : ""}`}
              title={canEdit ? "Click to edit" : ""}
              onClick={() => canEdit && setEditingTitle(true)}
            >
              <span className="id-ref">#{issue.id}</span> {issue.title}
              {canEdit && <span className="id-edit-hint"> ✎</span>}
            </h1>
          )}
        </div>

        <div className="id-header-actions">
          <div className="id-status-wrap">
            <span
              className="id-status-dot"
              style={{ background: currentStatus.value >= 4 ? "#36b37e" : "#00a0b0" }}
            />
            <select
              className="id-status-select"
              value={issue.status || 1}
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
              className="id-delete-btn"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting…" : "🗑 Delete Issue"}
            </button>
          )}
        </div>
      </div>

      {/* ── Layout ── */}
      <div className="id-layout">

        {/* ══ LEFT ══ */}
        <div className="id-left">

          {/* Description */}
          <div className="id-section">
            <div className="id-section-label">Description</div>

            {editingDesc ? (
              <div className="id-desc-editor">
                <textarea
                  className="id-desc-input"
                  value={descValue}
                  autoFocus
                  onChange={(e) => setDescValue(e.target.value)}
                />
                <div className="id-save-bar">
                  <button
                    className="id-save-btn"
                    onClick={handleSaveDesc}
                    disabled={saving}
                  >
                    {saving ? "Saving…" : "Save"}
                  </button>
                  <button
                    className="id-cancel-btn"
                    onClick={() => {
                      setDescValue(issue.description || "");
                      setEditingDesc(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={`id-desc ${canEdit ? "id-desc--editable" : ""}`}
                onClick={() => canEdit && setEditingDesc(true)}
                title={canEdit ? "Click to edit" : ""}
              >
                {issue.description || (
                  <span className="id-placeholder">
                    {canEdit ? "Click to add a description…" : "No description provided."}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Comments */}
          <div className="id-section id-comments">
            <div className="id-section-label">Comments</div>
            <div className="id-comments-empty">0 comments</div>
            <textarea
              className="id-comment-input"
              placeholder="Add a comment…"
            />
          </div>
        </div>

        {/* ══ RIGHT ══ */}
        <div className="id-right">

          {/* Type */}
          <div className="id-meta-card">
            <div className="id-meta-row">
              <span className="id-meta-label">Type</span>
              <span className="id-meta-value">
                <span
                  className="id-type-badge"
                  style={{ background: typeColor + "22", color: typeColor, borderColor: typeColor + "55" }}
                >
                  <span
                    className="id-type-dot"
                    style={{ background: typeColor }}
                  />
                  {issue.type || "Normal"}
                </span>
              </span>
            </div>

            <div className="id-meta-divider" />

            <div className="id-meta-row">
              <span className="id-meta-label">Status</span>
              <span className="id-meta-value">
                <span className="id-status-label">{currentStatus.label}</span>
              </span>
            </div>

            <div className="id-meta-divider" />

            <div className="id-meta-row">
              <span className="id-meta-label">Created</span>
              <span className="id-meta-value">
                {issue.created_at
                  ? new Date(issue.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "—"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
