// src/pages/Project/Issues.jsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IssueModal from "../../components/IssueModal/IssueModal";
import "./Issues.css";

export default function Issues() {
  const [showModal, setShowModal] = useState(false);
  const [issues, setIssues] = useState([]);

  const navigate = useNavigate();
  const { slug } = useParams();

  // ---- handlers ----
  const onFilter = () => {};
  const onSearch = () => {};
  const onToggleTags = () => {};
  const onViewOptions = () => {};

  const onNewIssue = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);

  const onCreateIssue = (issue) => {
    setIssues((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        status: "New",
        modified: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        ...issue,
      },
    ]);
    setShowModal(false);
  };

  return (
    <>
      <div className="issues">
        {/* Header */}
        <div className="issues__header">
          <h1>Issues</h1>

          <div className="issues__actions">
            <button className="issues__filter" onClick={onFilter}>
              ⚙ Filters
            </button>

            <input
              className="issues__search"
              placeholder="subject or reference"
              onChange={onSearch}
            />

            <label className="issues__toggle">
              <input type="checkbox" onChange={onToggleTags} />
              <span>Tags</span>
            </label>

            <button className="issues__new" onClick={onNewIssue}>
              + NEW ISSUE
            </button>

            <button className="issues__view" onClick={onViewOptions}>
              ☰
            </button>
          </div>
        </div>

        {/* Empty state / List */}
        {issues.length === 0 ? (
          <div className="issues__empty">
            <div className="issues__illustration" />
            <p className="issues__empty-text">
              There are no issues to report :-)
            </p>
            <p className="issues__empty-link">Did you find an issue?</p>
          </div>
        ) : (
          <div className="issues__list">
            {issues.map((issue) => (
              <div key={issue.id} className="issues__row">
                {/* TYPE */}
                <span className={`dot ${issue.type}`} />

                {/* SEVERITY */}
                <span className={`dot prio-${issue.severity}`} />

                {/* PRIORITY */}
                <span className={`dot ${issue.priority}`} />

                {/* ISSUE */}
                <span
                    className="issues__title link"
                    onClick={() =>
                      navigate(`/project/${slug}/issue/${issue.id}`)
                    }
                  >
                    #{issue.id} {issue.subject}
              </span>

                {/* STATUS */}
                <span className="issues__status">
                  {issue.status} ⌄
                </span>

                {/* MODIFIED */}
                <span className="issues__modified">
                  {issue.modified}
                </span>

                {/* ASSIGN */}
                <span className="issues__assignee">❄️</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <IssueModal
          onClose={onCloseModal}
          onCreate={onCreateIssue}
        />
      )}
    </>
  );
}