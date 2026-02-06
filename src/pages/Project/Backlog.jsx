// // // src/pages/Project/Backlog.jsx
// // import "./Backlog.css";

// // export default function Backlog() {
// //   // ---- stub handlers (future use) ----
// //   const onAddSprint = () => {};
// //   const onAddUserStory = () => {};
// //   const onOpenFilters = () => {};
// //   const onSearch = () => {};

// //   return (
// //     <div className="backlog">
// //       {/* ===== TOP: Scrum header ===== */}
// //       <div className="backlog__header">
// //         <h2>Scrum</h2>

// //         <div className="backlog__stats">
// //           <div className="progress-box" />
// //           <div className="stats-text">
// //             <span className="percent">0%</span>
// //             <span>0 defined points</span>
// //             <span>0 closed points</span>
// //             <span>0 points / sprint</span>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ===== GRAPH + SPRINTS ===== */}
// //       <div className="backlog__top">
// //         <div className="graph-hint">
// //           <div className="bars" />
// //           <div>
// //             <strong>CUSTOMIZE YOUR BACKLOG GRAPH</strong>
// //             <p>
// //               To have a nice graph that helps you follow the evolution of the
// //               project you have to set up the points and sprints through the{" "}
// //               <span className="link">Admin</span>
// //             </p>
// //           </div>
// //         </div>

// //         <div className="sprints">
// //           <h4>SPRINTS</h4>
// //           <p className="empty-text">There are no sprints yet</p>
// //           <button className="link-btn" onClick={onAddSprint}>
// //             Add a sprint +
// //           </button>
// //         </div>
// //       </div>

// //       {/* ===== BACKLOG LIST ===== */}
// //       <div className="backlog__list">
// //         <div className="list-header">
// //           <h3>
// //             Backlog <span className="muted">0 user stories</span>
// //           </h3>

// //           <div className="list-actions">
// //             <button className="primary-btn" onClick={onAddUserStory}>
// //               + USER STORY
// //             </button>
// //             <button className="icon-btn">≡</button>
// //           </div>
// //         </div>

// //         <div className="list-toolbar">
// //           <button className="filter-btn" onClick={onOpenFilters}>
// //             Filters
// //           </button>
// //           <input
// //             placeholder="subject or reference"
// //             onChange={onSearch}
// //           />
// //         </div>

// //         {/* ===== EMPTY STATE ===== */}
// //         <div className="empty-state">
// //           <p>The backlog is empty!</p>
// //           <button className="primary-btn" onClick={onAddUserStory}>
// //             + ADD A USER STORY
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// // src/pages/Project/Backlog.jsx
// import { useState } from "react";
// import UserStoryModal from "../../components/UserStoryModal/UserStoryModal";
// import "./Backlog.css";

// export default function Backlog() {
//   const [showModal, setShowModal] = useState(false);

//   // ---- handlers ----
//   const onAddSprint = () => {};
//   const onAddUserStory = () => setShowModal(true);
//   const onCloseModal = () => setShowModal(false);
//   const onOpenFilters = () => {};
//   const onSearch = () => {};

//   return (
//     <>
//       <div className="backlog">
//         {/* ===== TOP: Scrum header ===== */}
//         <div className="backlog__header">
//           <h2>Scrum</h2>

//           <div className="backlog__stats">
//             <div className="progress-box" />
//             <div className="stats-text">
//               <span className="percent">0%</span>
//               <span>0 defined points</span>
//               <span>0 closed points</span>
//               <span>0 points / sprint</span>
//             </div>
//           </div>
//         </div>

//         {/* ===== GRAPH + SPRINTS ===== */}
//         <div className="backlog__top">
//           <div className="graph-hint">
//             <div className="bars" />
//             <div>
//               <strong>CUSTOMIZE YOUR BACKLOG GRAPH</strong>
//               <p>
//                 To have a nice graph that helps you follow the evolution of the
//                 project you have to set up the points and sprints through the{" "}
//                 <span className="link">Admin</span>
//               </p>
//             </div>
//           </div>

//           <div className="sprints">
//             <h4>SPRINTS</h4>
//             <p className="empty-text">There are no sprints yet</p>
//             <button className="link-btn" onClick={onAddSprint}>
//               Add a sprint +
//             </button>
//           </div>
//         </div>

//         {/* ===== BACKLOG LIST ===== */}
//         <div className="backlog__list">
//           <div className="list-header">
//             <h3>
//               Backlog <span className="muted">0 user stories</span>
//             </h3>

//             <div className="list-actions">
//               <button className="primary-btn" onClick={onAddUserStory}>
//                 + USER STORY
//               </button>
//               <button className="icon-btn">≡</button>
//             </div>
//           </div>

//           <div className="list-toolbar">
//             <button className="filter-btn" onClick={onOpenFilters}>
//               Filters
//             </button>
//             <input
//               placeholder="subject or reference"
//               onChange={onSearch}
//             />
//           </div>

//           {/* ===== EMPTY STATE ===== */}
//           <div className="empty-state">
//             <p>The backlog is empty!</p>
//             <button className="primary-btn" onClick={onAddUserStory}>
//               + ADD A USER STORY
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ===== MODAL ===== */}
//       {showModal && <UserStoryModal onClose={onCloseModal} />}
//     </>
//   );
// }

// src/pages/Project/Backlog.jsx
// src/pages/Project/Backlog.jsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserStoryModal from "../../components/UserStoryModal/UserStoryModal";
import "./Backlog.css";

const STATUS_OPTIONS = ["New", "Ready", "In Progress", "Done"];
const POINT_OPTIONS = ["?", 1, 2, 3, 5, 8];

export default function Backlog() {
  const [showModal, setShowModal] = useState(false);
  const [editStory, setEditStory] = useState(null);
  const [stories, setStories] = useState([]);

  const navigate = useNavigate();
  const { slug } = useParams();

  // ---- handlers ----
  const onAddSprint = () => {};
  const onAddUserStory = () => {
    setEditStory(null);
    setShowModal(true);
  };
  const onCloseModal = () => setShowModal(false);
  const onOpenFilters = () => {};
  const onSearch = () => {};

  // CREATE / UPDATE
  const onCreateStory = (story) => {
    if (editStory) {
      setStories((prev) =>
        prev.map((s) => (s.id === editStory.id ? { ...s, ...story } : s))
      );
    } else {
      setStories((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          status: "New",
          points: "?",
          ...story,
        },
      ]);
    }
    setShowModal(false);
  };

  // STATUS CHANGE
  const updateStatus = (id, status) => {
    setStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  // POINTS CHANGE
  const updatePoints = (id, points) => {
    setStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, points } : s))
    );
  };

  // DRAG & DROP
  const onDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const onDrop = (e, index) => {
    const fromIndex = e.dataTransfer.getData("index");
    if (fromIndex === null) return;

    const updated = [...stories];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(index, 0, moved);
    setStories(updated);
  };

  return (
    <>
      <div className="backlog">
        {/* ===== SCRUM HEADER ===== */}
        <div className="backlog__header">
          <h2>Scrum</h2>
          <div className="backlog__stats">
            <div className="progress-box" />
            <div className="stats-text">
              <span className="percent">0%</span>
              <span>0 defined points</span>
              <span>0 closed points</span>
              <span>0 points / sprint</span>
            </div>
          </div>
        </div>

        {/* ===== GRAPH + SPRINTS ===== */}
        <div className="backlog__top">
          <div className="graph-hint">
            <div className="bars" />
            <div>
              <strong>CUSTOMIZE YOUR BACKLOG GRAPH</strong>
              <p>
                To have a nice graph that helps you follow the evolution of the
                project you have to set up the points and sprints through the{" "}
                <span className="link">Admin</span>
              </p>
            </div>
          </div>

          <div className="sprints">
            <h4>SPRINTS</h4>
            <p className="empty-text">There are no sprints yet</p>
            <button className="link-btn" onClick={onAddSprint}>
              Add a sprint +
            </button>
          </div>
        </div>

        {/* ===== BACKLOG LIST ===== */}
        <div className="backlog__list">
          <div className="list-header">
            <h3>
              Backlog{" "}
              <span className="muted">{stories.length} user stories</span>
            </h3>

            <div className="list-actions">
              <button className="primary-btn" onClick={onAddUserStory}>
                + USER STORY
              </button>
              <button className="icon-btn">≡</button>
            </div>
          </div>

          <div className="list-toolbar">
            <button className="filter-btn" onClick={onOpenFilters}>
              Filters
            </button>
            <input
              placeholder="subject or reference"
              onChange={onSearch}
            />
          </div>

          {/* ===== LIST ===== */}
          {stories.length === 0 ? (
            <div className="empty-state">
              <p>The backlog is empty!</p>
              <button className="primary-btn" onClick={onAddUserStory}>
                + ADD A USER STORY
              </button>
            </div>
          ) : (
            <div className="story-list">
              {stories.map((story, index) => (
                <div
                  key={story.id}
                  className="story-row"
                  draggable
                  onDragStart={(e) => onDragStart(e, index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => onDrop(e, index)}
                  // onClick={() => {
                  //   setEditStory(story);
                  //   setShowModal(true);
                  // }}
                  onClick={() => navigate(`/project/${slug}/us/${story.id}`)}
                >
                  {/* LEFT */}
                  <div className="story-left">
                    <span className="drag">⋮⋮</span>
                    <input type="checkbox" />
                    <span className="story-id">#{story.id}</span>
                    <span className="story-title">{story.subject}</span>
                  </div>

                  {/* RIGHT */}
                  <div className="story-right" onClick={(e) => e.stopPropagation()}>
                    {/* STATUS */}
                    <select
                      className="story-status"
                      value={story.status}
                      onChange={(e) =>
                        updateStatus(story.id, e.target.value)
                      }
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>

                    {/* POINTS */}
                    <select
                      className="story-points"
                      value={story.points}
                      onChange={(e) =>
                        updatePoints(story.id, e.target.value)
                      }
                    >
                      {POINT_OPTIONS.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>

                    <span className="story-menu">⋮</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===== MODAL ===== */}
      {showModal && (
        <UserStoryModal
          onClose={onCloseModal}
          onCreate={onCreateStory}
          story={editStory}
        />
      )}
    </>
  );
}