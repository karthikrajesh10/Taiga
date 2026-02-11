// src/pages/Project/Issues.jsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authFetch } from "../../services/api";
import { useEffect } from "react";
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
  const onCreateIssue = async (issue) => {
      try {
        const res = await authFetch("/issues/", {
          method: "POST",
          body: JSON.stringify({
            subject: issue.subject,
            description: issue.description,
            type: issue.type,
            severity: issue.severity,
            priority: issue.priority,
            project_slug: slug,
          }),
        });

        if (!res.ok) throw new Error("Failed to create issue");

        const created = await res.json();
        setIssues((prev) => [...prev, created]);
        setShowModal(false);
      } catch (err) {
        console.error(err);
      }
    };

  useEffect(() => {
      const loadIssues = async () => {
        try {
          const res = await authFetch(
            `/issues/?project__slug=${slug}`
          );
          if (res.ok) {
            setIssues(await res.json());
          }
        } catch (err) {
          console.error(err);
        }
      };

      loadIssues();
    }, [slug]);


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
              <div key={issue.ref} className="issues__row">
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
                    #{issue.ref} {issue.subject}
              </span>

                {/* STATUS */}
                <span className="issues__status">
                  {issue.status} ⌄
                </span>

                {/* MODIFIED */}
                <span className="issues__modified">
                  {new Date(issue.modified_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
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