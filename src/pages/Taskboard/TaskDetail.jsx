import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTask, updateTask, deleteTask } from "../../services/taskService";
import { getProjectMembers } from "../../services/membershipService";
import { getStory } from "../../services/userStoryService";
import { getProjectIdBySlug } from "../../services/projectService";
import {
  createTimeLog,
  getTimeLogsByTask,
  deleteTimeLog,
} from "../../services/timeLogService";
import "./TaskDetail.css";

const STATUS_OPTIONS = [
  { value: 1, label: "New" },
  { value: 2, label: "In Progress" },
  { value: 3, label: "Ready For Test" },
  { value: 4, label: "Done" },
];

function calcHours(from, to) {
  if (!from || !to) return null;
  const [fh, fm] = from.split(":").map(Number);
  const [th, tm] = to.split(":").map(Number);
  const diff = (th * 60 + tm - (fh * 60 + fm)) / 60;
  return diff > 0 ? Math.round(diff * 100) / 100 : null;
}

export default function TaskDetail() {
  const { slug, taskId } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isSuperAdmin = user?.is_superuser === true;
  const isDev = user?.role === "DEV";
  const canEdit = isSuperAdmin || user?.role === "PM" || user?.role === "MGR";

  const [task, setTask] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Inline title editing
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState("");

  // Description editing
  const [editingDesc, setEditingDesc] = useState(false);
  const [descValue, setDescValue] = useState("");

  // Estimated hours editing
  const [editingEst, setEditingEst] = useState(false);
  const [estValue, setEstValue] = useState("");

  // Time log form
  const today = new Date().toISOString().split("T")[0];
  const [logs, setLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [logDate, setLogDate] = useState(today);
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [logComment, setLogComment] = useState("");
  const [loggingTime, setLoggingTime] = useState(false);
  const [logError, setLogError] = useState("");
  const [deletingLogId, setDeletingLogId] = useState(null);
  const [userStory, setUserStory] = useState(null);

  const workedHours = calcHours(fromTime, toTime);
  const totalLoggedHours = logs.reduce((s, l) => s + l.worked_hours, 0);

  const canEditActualHours =
    isSuperAdmin || isDev || user?.id === task?.assignee;

  /* ── Load task ── */
//   useEffect(() => {
//     const load = async () => {
//       try {
//         const data = await getTask(taskId);
//         setTask(data);
//         setTitleValue(data.title);
//         setDescValue(data.description || "");
//         setEstValue(data.estimated_hours ?? "");
//       } catch (err) {
//         console.error("Failed to load task", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, [taskId]);
  useEffect(() => {
  const load = async () => {
    try {
      const data = await getTask(taskId);

      setTask(data);
      setTitleValue(data.title);
      setDescValue(data.description || "");
      setEstValue(data.estimated_hours ?? "");

      // Fetch user story if exists
      if (data.user_story) {
        const us = await getStory(data.user_story);
        setUserStory(us);
      }

    } catch (err) {
      console.error("Failed to load task", err);
    } finally {
      setLoading(false);
    }
  };

  load();
}, [taskId]);

  /* ── Load members ── */
  useEffect(() => {
    const load = async () => {
      try {
        const projectId = await getProjectIdBySlug(slug);
        if (!projectId) return;
        const data = await getProjectMembers(projectId);
        setMembers(data);
      } catch (err) {
        console.error("Failed to load members", err);
      }
    };
    load();
  }, [slug]);

  /* ── Load time logs ── */
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTimeLogsByTask(taskId);
        setLogs(data);
      } catch (err) {
        console.error("Failed to load logs", err);
      } finally {
        setLoadingLogs(false);
      }
    };
    load();
  }, [taskId]);

  /* ── Save title ── */
  const handleSaveTitle = async () => {
    if (!titleValue.trim() || titleValue === task.title) {
      setEditingTitle(false);
      return;
    }
    setSaving(true);
    try {
      await updateTask(taskId, { title: titleValue.trim() });
      setTask((prev) => ({ ...prev, title: titleValue.trim() }));
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
      await updateTask(taskId, { description: descValue });
      setTask((prev) => ({ ...prev, description: descValue }));
    } catch (err) {
      console.error("Failed to save description", err);
      alert("Failed to save description.");
    } finally {
      setSaving(false);
      setEditingDesc(false);
    }
  };

  /* ── Save estimated hours ── */
  const handleSaveEst = async () => {
    const parsed = parseFloat(estValue);
    if (isNaN(parsed) || parsed < 0) {
      setEditingEst(false);
      return;
    }
    setSaving(true);
    try {
      await updateTask(taskId, { estimated_hours: parsed });
      setTask((prev) => ({ ...prev, estimated_hours: parsed }));
    } catch (err) {
      console.error("Failed to save estimated hours", err);
      alert("Failed to save estimated hours.");
    } finally {
      setSaving(false);
      setEditingEst(false);
    }
  };

  /* ── Save status ── */
  const handleStatusChange = async (e) => {
    const newStatus = parseInt(e.target.value);
    try {
      await updateTask(taskId, { status: newStatus });
      setTask((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update status.");
    }
  };

  /* ── Delete task ── */
  const handleDelete = async () => {
    if (!window.confirm("Delete this task? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await deleteTask(taskId);
      navigate(-1);
    } catch (err) {
      console.error("Failed to delete task", err);
      alert("Failed to delete task.");
      setDeleting(false);
    }
  };

  /* ── Log time ── */
  const handleLogTime = async () => {
    setLogError("");
    if (!logDate) return setLogError("Please select a date.");
    if (!fromTime || !toTime) return setLogError("Please select start and end time.");
    if (!workedHours) return setLogError("End time must be after start time.");

    setLoggingTime(true);
    try {
      const newLog = await createTimeLog({
        task: parseInt(taskId),
        project: task.project ?? null,
        sprint: task.sprint ?? null,
        date: logDate,
        worked_hours: workedHours,
        comment: logComment,
      });
      setLogs((prev) => [newLog, ...prev]);
      setFromTime("");
      setToTime("");
      setLogComment("");
      setLogDate(today);
    } catch (err) {
      console.error("Failed to log time", err);
      setLogError("Failed to log time. Please try again.");
    } finally {
      setLoggingTime(false);
    }
  };

  /* ── Delete log ── */
  const handleDeleteLog = async (logId) => {
    if (!window.confirm("Delete this log entry?")) return;
    setDeletingLogId(logId);
    try {
      await deleteTimeLog(logId);
      setLogs((prev) => prev.filter((l) => l.id !== logId));
    } catch (err) {
      console.error("Failed to delete log", err);
      alert("Failed to delete log.");
    } finally {
      setDeletingLogId(null);
    }
  };

  const getAssigneeName = () => {
    if (!task?.assignee) return "Unassigned";
    const member = members.find((m) => m.user.id === task.assignee);
    return member ? member.user.username : `User #${task.assignee}`;
  };

  if (loading) return <div className="td-loading">Loading task…</div>;
  if (!task) return <div className="td-loading">Task not found.</div>;

  return (
    <div className="td-page">

      {/* ── Back ── */}
      <button className="td-back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* ── Title ── */}
      <div className="td-title-row">
        {editingTitle ? (
          <input
            className="td-title-input"
            value={titleValue}
            autoFocus
            onChange={(e) => setTitleValue(e.target.value)}
            onBlur={handleSaveTitle}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveTitle();
              if (e.key === "Escape") {
                setTitleValue(task.title);
                setEditingTitle(false);
              }
            }}
          />
        ) : (
          <h1
            className="td-title"
            title={canEdit ? "Click to edit" : ""}
            onClick={() => canEdit && setEditingTitle(true)}
          >
            <span className="td-ref">#{task.id}</span> {task.title}
          </h1>
        )}

        {canEdit && (
          <button
            className="td-delete-btn"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting…" : "🗑 Delete Task"}
          </button>
        )}
      </div>

      {/* ── Two column layout ── */}
      <div className="td-layout">

        {/* ══════════ LEFT ══════════ */}
        <div className="td-left">

          {/* Status */}
          <div className="td-section">
            <div className="td-section-label">Status</div>
            <select
              className="td-status-select"
              value={task.status}
              onChange={handleStatusChange}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="td-section">
            <div className="td-section-label">Description</div>
            {editingDesc ? (
              <div>
                <textarea
                  className="td-desc-input"
                  value={descValue}
                  autoFocus
                  onChange={(e) => setDescValue(e.target.value)}
                />
                <div className="td-save-bar">
                  <button className="td-save-btn" onClick={handleSaveDesc} disabled={saving}>
                    {saving ? "Saving…" : "Save"}
                  </button>
                  <button
                    className="td-cancel-btn"
                    onClick={() => {
                      setDescValue(task.description || "");
                      setEditingDesc(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={`td-desc ${canEdit ? "td-desc--editable" : ""}`}
                onClick={() => canEdit && setEditingDesc(true)}
                title={canEdit ? "Click to edit" : ""}
              >
                {task.description || (
                  <span className="td-placeholder">
                    {canEdit ? "Click to add a description…" : "No description."}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Meta panel */}
          <div className="td-meta-panel">
            {/* <div className="td-meta-row">
              <span className="td-meta-label">User Story</span>
              <span className="td-meta-value">#{task.user_story}</span>
            </div> */}
            <div className="td-meta-row">
                <span className="td-meta-label">User Story</span>
                <span className="td-meta-value">
                    <span className="td-ref">#{task.user_story}</span>
                    {userStory && (
                    <span className="td-us-title"> — {userStory.title}</span>
                    )}
                </span>
            </div>

            <div className="td-meta-row">
              <span className="td-meta-label">Assignee</span>
              <span className="td-meta-value">👤 {getAssigneeName()}</span>
            </div>

            <div className="td-meta-row">
              <span className="td-meta-label">Estimated Hours</span>
              <span className="td-meta-value">
                {editingEst ? (
                  <input
                    className="td-hours-input"
                    type="number"
                    min="0"
                    step="0.5"
                    value={estValue}
                    autoFocus
                    onChange={(e) => setEstValue(e.target.value)}
                    onBlur={handleSaveEst}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveEst();
                      if (e.key === "Escape") setEditingEst(false);
                    }}
                  />
                ) : (
                  <span
                    className={`td-hours-display ${canEdit ? "td-hours-display--editable" : ""}`}
                    onClick={() => canEdit && setEditingEst(true)}
                    title={canEdit ? "Click to edit" : ""}
                  >
                    {task.estimated_hours != null ? `${task.estimated_hours}h` : "—"}
                    {canEdit && <span className="td-edit-hint"> ✎</span>}
                  </span>
                )}
              </span>
            </div>

            <div className="td-meta-row">
              <span className="td-meta-label">Actual Hours</span>
              <span className="td-meta-value td-actual-hours">
                {totalLoggedHours > 0 ? `${totalLoggedHours}h` : "—"}
              </span>
            </div>

            <div className="td-meta-row">
              <span className="td-meta-label">Created</span>
              <span className="td-meta-value">
                {new Date(task.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* ══════════ RIGHT ══════════ */}
        <div className="td-right">

          {/* Log time form
          {canEditActualHours && (
            <div className="td-timelog-form">
              <h3 className="td-section-title">Log Time</h3>

              <div className="td-timelog-row">
                <div className="td-timelog-field">
                  <label>Date</label>
                  <input
                    type="date"
                    value={logDate}
                    max={today}
                    onChange={(e) => setLogDate(e.target.value)}
                  />
                </div>
                <div className="td-timelog-field">
                  <label>From</label>
                  <input
                    type="time"
                    value={fromTime}
                    onChange={(e) => setFromTime(e.target.value)}
                  />
                </div>
                <div className="td-timelog-field">
                  <label>To</label>
                  <input
                    type="time"
                    value={toTime}
                    onChange={(e) => setToTime(e.target.value)}
                  />
                </div>
                <div className="td-timelog-field td-timelog-field--hours">
                  <label>Hours</label>
                  <span className={`td-hours-badge ${workedHours ? "td-hours-badge--active" : ""}`}>
                    {workedHours != null ? `${workedHours}h` : "—"}
                  </span>
                </div>
              </div>

              <div className="td-timelog-field">
                <label>Comment <span className="td-optional">(optional)</span></label>
                <input
                  type="text"
                  placeholder="e.g. Implemented auth flow"
                  value={logComment}
                  onChange={(e) => setLogComment(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleLogTime(); }}
                />
              </div>

              {logError && <p className="td-log-error">{logError}</p>}

              <button
                className="td-log-btn"
                onClick={handleLogTime}
                disabled={loggingTime || !workedHours}
              >
                {loggingTime
                  ? "Logging…"
                  : `Log ${workedHours != null ? workedHours + "h" : "Time"}`}
              </button>
            </div>
          )} */}

          {/* Log history */}
          <div className="td-log-history">
            <div className="td-log-history__header">
              <h3 className="td-section-title">Log History</h3>
              {totalLoggedHours > 0 && (
                <span className="td-total-badge">{totalLoggedHours}h total</span>
              )}
            </div>

            {loadingLogs ? (
              <p className="td-empty">Loading…</p>
            ) : logs.length === 0 ? (
              <p className="td-empty">No time logged yet.</p>
            ) : (
              <table className="td-log-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Hours</th>
                    <th>By</th>
                    <th>Comment</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td>{log.date}</td>
                      <td>
                        <span className="td-log-hours">{log.worked_hours}h</span>
                      </td>
                      <td>{log.username}</td>
                      <td className="td-log-comment">{log.comment || "—"}</td>
                      <td>
                        <button
                          className="td-log-delete"
                          onClick={() => handleDeleteLog(log.id)}
                          disabled={deletingLogId === log.id}
                          title="Delete log"
                        >
                          {deletingLogId === log.id ? "⏳" : "🗑"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td><strong>Total</strong></td>
                    <td><strong>{totalLoggedHours}h</strong></td>
                    <td colSpan={3}></td>
                  </tr>
                </tfoot>
              </table>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}