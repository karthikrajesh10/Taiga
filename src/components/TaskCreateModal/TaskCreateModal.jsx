import { useState } from "react";
import { authFetch } from "../../services/api";
import "./TaskCreateModal.css";

export default function TaskCreateModal({
  projectSlug,
  userstoryId,
  onClose,
  onCreated,
}) {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("New");

  const createTask = async () => {
    if (!subject.trim()) return;

    const res = await authFetch("/tasks/", {
      method: "POST",
      body: JSON.stringify({
        subject,
        description,
        status,
        project_slug: projectSlug,
        userstory: userstoryId,
      }),
    });

    if (res.ok) {
      const task = await res.json();
      onCreated(task);   // 🔥 inject into taskboard
      onClose();
    } else {
      console.error("Failed to create task");
    }
  };

  return (
    <div className="taiga-modal-overlay">
      <div className="taiga-modal">
        {/* HEADER */}
        <div className="taiga-modal-header">
          <h2>New task</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* BODY */}
        <div className="taiga-modal-body">
          <input
            className="task-subject"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            autoFocus
          />

          <div className="task-meta">
            <select
              className="status-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="New">New</option>
              <option value="In Progress">In progress</option>
              <option value="Ready for Test">Ready for test</option>
              <option value="Done">Closed</option>
            </select>

            <div className="assign">
              <span className="avatar-placeholder" />
              <span>
                Assign or <strong>Assign to me</strong>
              </span>
            </div>
          </div>

          <button className="add-tag">Add tag +</button>

          <textarea
            className="task-description"
            placeholder="Please add descriptive text to help others better understand this task"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* ATTACHMENTS PLACEHOLDER */}
          <div className="attachments">
            <div className="attachments-header">
              <span>0 Attachments</span>
              <button className="add-attachment">+</button>
            </div>
            <div className="drop-area">
              Drop attachments here!
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="taiga-modal-footer">
          <button className="create-btn" onClick={createTask}>
            CREATE
          </button>
        </div>
      </div>
    </div>
  );
}
