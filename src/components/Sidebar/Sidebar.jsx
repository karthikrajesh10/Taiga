import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const [scrumOpen, setScrumOpen] = useState(false);
  const navigate = useNavigate();
  const { slug } = useParams();

  const goToBacklog = () => navigate(`/project/${slug}/backlog`);
  const goToTimeline = () => navigate(`/project/${slug}/timeline`);
  const goToIssues = () => navigate(`/project/${slug}/issues`);

  // placeholders
  const goToSearch = () => {};
  const goToWiki = () => {};
  const goToTeam = () => navigate(`/project/${slug}/team`);
  const goToSettings = () =>  navigate(`/project/${slug}/admin/project-profile/details`);

  return (
    <aside className="sidebar">
      <div className="sidebar__project">
        <span className="sidebar__project-name">Sample</span>
      </div>

      {/* SCRUM */}
      <div
        className="sidebar__item"
        onClick={() => setScrumOpen(!scrumOpen)}
      >
        Scrum <span>{scrumOpen ? "▾" : "▸"}</span>
      </div>

      {scrumOpen && (
        <>
          <div className="sidebar__subitem" onClick={goToBacklog}>
            Backlog
          </div>
          <div className="sidebar__subitem" onClick={goToTimeline}>
            Timeline
          </div>
        </>
      )}

      {/* ISSUES */}
      <div className="sidebar__item" onClick={goToIssues}>
        Issues
      </div>

      <div className="sidebar__divider" />

      {/* FUTURE */}
      <div className="sidebar__item" onClick={goToSearch}>Search</div>
      <div className="sidebar__item" onClick={goToWiki}>Wiki</div>
      <div className="sidebar__item" onClick={goToTeam}>Team</div>
      <div className="sidebar__item" onClick={goToSettings}>Settings</div>
    </aside>
  );
}