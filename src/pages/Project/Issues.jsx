// src/pages/Project/Issues.jsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { authFetch } from "../../services/api";
import { authFetch } from "../../services/authFetch";






import { useEffect } from "react";
import IssueModal from "../../components/IssueModal/IssueModal";
import { getTasksByStory } from "../../services/taskService";
import "./Issues.css";

export default function Issues() {
  const [showModal, setShowModal] = useState(false);
  const [issues, setIssues] = useState([]);
  const [projectTasks, setProjectTasks] = useState([]);

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
        if (!issue?.taskId) {
          throw new Error("Task is required");
        }

        const created = await authFetch("/issues/", {
          method: "POST",
          body: JSON.stringify({
            task: Number(issue.taskId),
            type: issue.type.charAt(0).toUpperCase() + issue.type.slice(1),
            title: issue.title,
            description: issue.description || "",
          }),
        });

        setIssues((prev) => [...prev, created]);
        setShowModal(false);
      } catch (err) {
        console.error(err);
        throw err;
      }
    };

  useEffect(() => {
      const loadIssues = async () => {
        try {
          const issuesData = await authFetch(
            `/issues/?project_slug=${slug}`
          );
          setIssues(issuesData);
        } catch (err) {
          console.error(err);
        }
      };

      loadIssues();
    }, [slug]);

  useEffect(() => {
    const loadProjectTasks = async () => {
      try {
        // Try to fetch all stories for project, then tasks per story.
        const stories = await authFetch(`/userstories/?project_slug=${slug}`);
        const lists = await Promise.all(
          (stories || []).map((s) => getTasksByStory(s.id))
        );
        const flat = lists.flat();

        // Deduplicate by task id
        const map = new Map();
        flat.forEach((t) => map.set(t.id, t));
        setProjectTasks([...map.values()]);
      } catch (err) {
        console.error(err);
        setProjectTasks([]);
      }
    };

    loadProjectTasks();
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
              <div key={issue.id} className="issues__row">
                {/* TYPE */}
                <span className={`dot ${issue.type?.toLowerCase() || 'bug'}`} />

                {/* ISSUE */}
                <span
                    className="issues__title link"
                    onClick={() =>
                      navigate(`/project/${slug}/issue/${issue.id}`)
                    }
                  >
                    #{issue.id} {issue.title}
              </span>

                {/* STATUS */}
                <span className="issues__status">
                  {issue.status === 1 ? 'New' : issue.status === 2 ? 'In Progress' : issue.status === 3 ? 'Ready For Test' : 'Done'} ⌄
                </span>

                {/* MODIFIED */}
                <span className="issues__modified">
                  {issue.created_at ? new Date(issue.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }) : ''}
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
          tasks={projectTasks}
        />
      )}
    </>
  );
}