import { useParams } from "react-router-dom";
import "./UserStoryDetail.css";

export default function UserStoryDetail() {
  const { id } = useParams();

  // later: fetch from global store / backend
  const story = {
    id,
    subject: "Frontend",
    description: "Create frontend",
    createdBy: "admin",
    createdAt: "03 Feb 2026 16:27",
    status: "New",
    points: {
      ux: "?",
      design: "?",
      front: "?",
      back: "?",
      total: "?",
    },
    assigned: "admin",
  };

  return (
    <div className="us-detail">
      {/* HEADER */}
      <div className="us-header">
        <h1>#{story.id} {story.subject}</h1>

        <div className="us-status">
          OPEN <span className="pill">NEW ⌄</span>
        </div>
      </div>

      <span className="us-type">USER STORY</span>

      <div className="us-created">
        Created by <b>{story.createdBy}</b>
        <span>{story.createdAt}</span>
      </div>

      <div className="us-layout">
        {/* LEFT */}
        <div className="us-left">
          <div className="tags">Add tag +</div>

          <p className="us-desc">{story.description}</p>

          {/* ATTACHMENTS */}
          <div className="attachments">
            <div className="attachments-header">
              <span>0 Attachments</span>
              <button>+</button>
            </div>
            <div className="dropzone">Drop attachments here!</div>
          </div>

          {/* TASKS */}
          <div className="tasks">
            <div className="tasks-header">
              <span>Tasks</span>
              <button>+</button>
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
            <div>UX <span>{story.points.ux}</span></div>
            <div>Design <span>{story.points.design}</span></div>
            <div>Front <span>{story.points.front}</span></div>
            <div>Back <span>{story.points.back}</span></div>
            <div className="total">
              total points <span>{story.points.total}</span>
            </div>
          </div>

          <div className="assigned">
            <h4>ASSIGNED</h4>
            <div className="assignee">{story.assigned}</div>
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
            <button>🗑</button>
          </div>
        </div>
      </div>
    </div>
  );
}