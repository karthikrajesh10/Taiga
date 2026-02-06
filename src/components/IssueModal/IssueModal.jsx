import { useState } from "react";
import "./IssueModal.css";

export default function IssueModal({ onClose, onCreate }) {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [assignedToMe, setAssignedToMe] = useState(false);

  const [type, setType] = useState("bug");
  const [severity, setSeverity] = useState("normal");
  const [priority, setPriority] = useState("normal");

  const [openMenu, setOpenMenu] = useState(null); // type | severity | priority

  const handleCreate = () => {
    if (!subject.trim()) return;

    onCreate({
      subject,
      description,
      type,
      severity,
      priority,
      assignedToMe,
    });
  };

  const closeMenu = () => setOpenMenu(null);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>

        <h2>New issue</h2>

        <div className="issue-grid">
          {/* ================= LEFT ================= */}
          <div className="issue-left">
            <input
              className="modal-input"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <div className="tags">Add tag +</div>

            <textarea
              className="modal-textarea"
              placeholder="Please add descriptive text to help others better understand this issue"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* ATTACHMENTS */}
            <div className="issue-attachments">
              <div className="issue-attachments-header">
                <span>0 Attachments</span>
                <button>+</button>
              </div>
              <div className="issue-dropzone">
                Drop attachments here!
              </div>
            </div>

            <button className="create-btn" onClick={handleCreate}>
              CREATE
            </button>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="issue-right">
            {/* ASSIGN */}
            <div className="issue-assign">
              <div className="issue-avatar">❄️</div>
              {assignedToMe ? (
                <span>
                  Assigned to <b>me</b>
                </span>
              ) : (
                <span onClick={() => setAssignedToMe(true)}>
                  Assign or <b>Assign to me</b>
                </span>
              )}
            </div>

            {/* META */}
            <div className="issue-meta">

              {/* TYPE */}
              <div className="issue-meta-row">
                <span>type</span>
                <div
                  className="meta-value clickable"
                  onClick={() => setOpenMenu(openMenu === "type" ? null : "type")}
                >
                  {type}
                  <span className={`dot ${type}`} />
                </div>

                {openMenu === "type" && (
                  <div className="meta-menu">
                    {["bug", "question", "enhancement"].map((v) => (
                      <div
                        key={v}
                        className="meta-option"
                        onClick={() => {
                          setType(v);
                          closeMenu();
                        }}
                      >
                        <span className={`dot ${v}`} />
                        {v}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SEVERITY */}
              <div className="issue-meta-row">
                <span>severity</span>
                <div
                  className="meta-value clickable"
                  onClick={() =>
                    setOpenMenu(openMenu === "severity" ? null : "severity")
                  }
                >
                  {severity}
                  <span className={`dot ${severity}`} />
                </div>

                {openMenu === "severity" && (
                  <div className="meta-menu">
                    {["wishlist", "minor", "normal", "important", "critical"].map(
                      (v) => (
                        <div
                          key={v}
                          className="meta-option"
                          onClick={() => {
                            setSeverity(v);
                            closeMenu();
                          }}
                        >
                          <span className={`dot ${v}`} />
                          {v}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* PRIORITY */}
              <div className="issue-meta-row">
                <span>priority</span>
                <div
                  className="meta-value clickable"
                  onClick={() =>
                    setOpenMenu(openMenu === "priority" ? null : "priority")
                  }
                >
                  {priority}
                  <span className={`dot prio-${priority}`} />
                </div>

                {openMenu === "priority" && (
                  <div className="meta-menu">
                    {["low", "normal", "high"].map((v) => (
                      <div
                        key={v}
                        className="meta-option"
                        onClick={() => {
                          setPriority(v);
                          closeMenu();
                        }}
                      >
                        <span className={`dot prio-${v}`} />
                        {v}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ICONS */}
              <div className="issue-icons">
                <button title="Due date">⏱</button>
                <button title="Blocked">🔒</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}