import { useEffect, useState } from "react";
import {
  createTimeLog,
  getTimeLogsByTask,
  deleteTimeLog,
} from "../../services/timeLogService";
import "./TimeLogModal.css";

function calcHours(from, to) {
  if (!from || !to) return null;
  const [fh, fm] = from.split(":").map(Number);
  const [th, tm] = to.split(":").map(Number);
  const diff = (th * 60 + tm - (fh * 60 + fm)) / 60;
  return diff > 0 ? Math.round(diff * 100) / 100 : null;
}

export default function TimeLogModal({ task, projectId, sprintId, onClose, onLogged }) {
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [logs, setLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const workedHours = calcHours(fromTime, toTime);

  /* ── Load existing logs for this task ── */
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTimeLogsByTask(task.id);
        setLogs(data);
      } catch (err) {
        console.error("Failed to load logs", err);
      } finally {
        setLoadingLogs(false);
      }
    };
    load();
  }, [task.id]);

  /* ── Submit ── */
  const handleSubmit = async () => {
    setError("");
    if (!date) return setError("Please select a date.");
    if (!fromTime || !toTime) return setError("Please select start and end time.");
    if (!workedHours) return setError("End time must be after start time.");

    setSubmitting(true);
    try {
      const newLog = await createTimeLog({
        task: task.id,
        project: projectId ?? null,
        sprint: sprintId ? parseInt(sprintId) : null,
        date,
        worked_hours: workedHours,
        comment,
      });
      setLogs((prev) => [newLog, ...prev]);
      onLogged(newLog);
      // Reset form
      setFromTime("");
      setToTime("");
      setComment("");
      setDate(today);
    } catch (err) {
      console.error(err);
      setError("Failed to log time. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Delete ── */
  const handleDelete = async (logId, loggedHours) => {
    if (!window.confirm("Delete this log entry?")) return;
    setDeletingId(logId);
    try {
      await deleteTimeLog(logId);
      setLogs((prev) => prev.filter((l) => l.id !== logId));
      onLogged({ worked_hours: -loggedHours }); // subtract from actual_hours
    } catch (err) {
      console.error("Failed to delete log", err);
      alert("Failed to delete log.");
    } finally {
      setDeletingId(null);
    }
  };

  const totalHours = logs.reduce((sum, l) => sum + l.worked_hours, 0);

  return (
    <div
      className="timelog-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="timelog-modal">

        {/* ── Header ── */}
        <div className="timelog-modal__header">
          <div>
            <h2>Log Time</h2>
            <p className="timelog-modal__subtitle">
              #{task.id} — {task.title}
            </p>
          </div>
          <button className="timelog-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {/* ── Form ── */}
        <div className="timelog-form">
          <div className="timelog-form__row">
            <div className="timelog-form__field">
              <label>Date</label>
              <input
                type="date"
                value={date}
                max={today}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="timelog-form__field">
              <label>From</label>
              <input
                type="time"
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
              />
            </div>
            <div className="timelog-form__field">
              <label>To</label>
              <input
                type="time"
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
              />
            </div>
            <div className="timelog-form__field timelog-form__field--hours">
              <label>Hours</label>
              <span className={`timelog-hours-badge ${workedHours ? "timelog-hours-badge--active" : ""}`}>
                {workedHours != null ? `${workedHours}h` : "—"}
              </span>
            </div>
          </div>

          <div className="timelog-form__field">
            <label>Comment <span className="optional">(optional)</span></label>
            <input
              type="text"
              placeholder="e.g. Worked on login feature"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
            />
          </div>

          {error && <p className="timelog-error">{error}</p>}

          <button
            className="timelog-submit"
            onClick={handleSubmit}
            disabled={submitting || !workedHours}
          >
            {submitting ? "Logging…" : `Log ${workedHours != null ? workedHours + "h" : "Time"}`}
          </button>
        </div>

        {/* ── Log History ── */}
        <div className="timelog-history">
          <div className="timelog-history__header">
            <h3>Log History</h3>
            {totalHours > 0 && (
              <span className="timelog-total-badge">{totalHours}h total</span>
            )}
          </div>

          {loadingLogs ? (
            <p className="timelog-empty">Loading…</p>
          ) : logs.length === 0 ? (
            <p className="timelog-empty">No time logged yet for this task.</p>
          ) : (
            <table className="timelog-table">
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
                      <span className="timelog-hours-cell">{log.worked_hours}h</span>
                    </td>
                    <td>{log.username}</td>
                    <td className="timelog-comment">{log.comment || "—"}</td>
                    <td>
                      <button
                        className="timelog-delete-btn"
                        onClick={() => handleDelete(log.id, log.worked_hours)}
                        disabled={deletingId === log.id}
                        title="Delete this log"
                      >
                        {deletingId === log.id ? "⏳" : "🗑"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td><strong>Total</strong></td>
                  <td><strong>{totalHours}h</strong></td>
                  <td colSpan={3}></td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}