// src/pages/Project/IssueDetail.jsx
import { useParams } from "react-router-dom";
import "./IssueDetail.css";

export default function IssueDetail() {
  const { id } = useParams();

  const issue = {
    id,
    subject: "Login",
    description: "Need to complete login authentication",
    type: "enhancement",
    severity: "normal",
    priority: "normal",
    createdBy: "admin",
    createdAt: "05 Feb 2026 11:58",
  };

  return (
    <div className="issue-detail">
      {/* HEADER */}
      <div className="issue-detail__header">
        <h1>
          #{issue.id} {issue.subject}
        </h1>

        <div className="issue-detail__status">
          <span className="status-text">OPEN</span>
          <span className="status-pill">NEW ⌄</span>
        </div>
      </div>

      <div className="issue-detail__layout">
        {/* LEFT */}
        <div className="issue-detail__left">
          <span className="tag-link">Add tag +</span>

          <p className="issue-description">{issue.description}</p>

          {/* ATTACHMENTS */}
          <div className="attachments">
            <div className="attachments-header">
              <span>0 Attachments</span>
              <button className="icon-btn">+</button>
            </div>
            <div className="dropzone">Drop attachments here!</div>
          </div>

          {/* COMMENTS */}
          <div className="comments">
            <div className="comments-header">0 Comments</div>
            <textarea placeholder="Type a new comment here" />
          </div>
        </div>

        {/* RIGHT */}
        <div className="issue-detail__right">
          <div className="meta-row">
            <span>type</span>
            <span className="meta-value">
              Enhancement <span className="dot enhancement" />
            </span>
          </div>

          <div className="meta-row">
            <span>severity</span>
            <span className="meta-value">
              Normal <span className="dot normal" />
            </span>
          </div>

          <div className="meta-row">
            <span>priority</span>
            <span className="meta-value">
              Normal <span className="dot prio-normal" />
            </span>
          </div>

          <hr />

          <div className="side-block">
            <strong>ASSIGNED</strong>
            <div className="side-actions">
              <button>+ Add assigned</button>
              <button className="link">Assign to me</button>
            </div>
          </div>

          <div className="side-block">
            <strong>WATCHERS</strong>
            <div className="side-actions">
              <button>+ Add watchers</button>
              <button className="link">Watch</button>
            </div>
          </div>

          <div className="issue-icons">
            <button>⏱</button>
            <button>📄</button>
            <button>🔗</button>
            <button>🔒</button>
            <button>🗑</button>
          </div>
        </div>
      </div>
    </div>
  );
}