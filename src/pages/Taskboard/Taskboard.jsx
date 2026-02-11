// // // import { useParams } from "react-router-dom";
// // // import { useState } from "react";
// // // import { authFetch } from "../../services/api";
// // // import { useEffect } from "react";

// // // export default function Taskboard() {
// // //   const { slug, sprintId } = useParams();
// // //   const [stories, setStories] = useState([]);

// // //   useEffect(() => {
// // //     const loadStories = async () => {
// // //       const res = await authFetch(
// // //         `/userstories/?project__slug=${slug}&sprint=${sprintId}`
// // //       );
// // //       if (res.ok) setStories(await res.json());
// // //     };
// // //     loadStories();
// // //   }, [slug, sprintId]);

// // //   const columns = {
// // //     New: [],
// // //     "In Progress": [],
// // //     "Ready for Test": [],
// // //     Closed: [],
// // //   };

// // //   stories.forEach((s) => columns[s.status]?.push(s));

// // //   return (
// // //     <div className="taskboard">
// // //       {Object.entries(columns).map(([status, items]) => (
// // //         <div key={status} className="taskboard-column">
// // //           <h4>{status}</h4>
// // //           {items.map((story) => (
// // //             <div key={story.id} className="task-card">
// // //               #{story.ref} {story.subject}
// // //             </div>
// // //           ))}
// // //         </div>
// // //       ))}
// // //     </div>
// // //   );
// // // }

// // import { useParams } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import { authFetch } from "../../services/api";
// // import "./Taskboard.css";

// // const STATUS_COLUMNS = [
// //   { key: "New", label: "NEW" },
// //   { key: "In Progress", label: "IN PROGRESS" },
// //   { key: "Ready for Test", label: "READY FOR TEST" },
// //   { key: "Done", label: "CLOSED" },
// // ];

// // export default function Taskboard() {
// //   const { slug, sprintId } = useParams();
// //   const [stories, setStories] = useState([]);

// //   useEffect(() => {
// //     const loadStories = async () => {
// //       try {
// //         const res = await authFetch(
// //           `/userstories/?project__slug=${slug}&sprint=${sprintId}`
// //         );
// //         if (!res.ok) throw new Error("Failed to load sprint stories");
// //         setStories(await res.json());
// //       } catch (err) {
// //         console.error(err);
// //       }
// //     };

// //     loadStories();
// //   }, [slug, sprintId]);

// //   const updateStatus = async (storyId, status) => {
// //     try {
// //       await authFetch(`/userstories/${storyId}/`, {
// //         method: "PATCH",
// //         body: JSON.stringify({ status }),
// //       });

// //       setStories((prev) =>
// //         prev.map((s) =>
// //           s.id === storyId ? { ...s, status } : s
// //         )
// //       );
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   return (
// //     <div className="taskboard">
// //       {STATUS_COLUMNS.map((column) => (
// //         <div key={column.key} className="taskboard-column">
// //           <div className="column-header">
// //             <h4>{column.label}</h4>
// //             <span className="count">
// //               {stories.filter((s) => s.status === column.key).length}
// //             </span>
// //           </div>

// //           <div className="column-body">
// //             {stories
// //               .filter((s) => s.status === column.key)
// //               .map((story) => (
// //                 <div key={story.id} className="task-card">
// //                   <div className="task-card-header">
// //                     <span className="ref">#{story.ref}</span>
// //                   </div>

// //                   <div className="task-title">{story.subject}</div>

// //                   <select
// //                     className="task-status"
// //                     value={story.status}
// //                     onChange={(e) =>
// //                       updateStatus(story.id, e.target.value)
// //                     }
// //                   >
// //                     {STATUS_COLUMNS.map((c) => (
// //                       <option key={c.key} value={c.key}>
// //                         {c.label}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>
// //               ))}
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { authFetch } from "../../services/api";
// import "./Taskboard.css";

// const STATUS_COLUMNS = [
//   { key: "New", label: "NEW" },
//   { key: "In Progress", label: "IN PROGRESS" },
//   { key: "Ready for Test", label: "READY FOR TEST" },
//   { key: "Done", label: "CLOSED" },
// ];

// export default function Taskboard() {
//   const { slug, sprintId } = useParams();
//   const navigate = useNavigate();

//   const [stories, setStories] = useState([]);
//   const [sprint, setSprint] = useState(null);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const [storiesRes, sprintRes] = await Promise.all([
//           authFetch(`/userstories/?project__slug=${slug}&sprint=${sprintId}`),
//           authFetch(`/sprints/${sprintId}/`),
//         ]);

//         if (storiesRes.ok) setStories(await storiesRes.json());
//         if (sprintRes.ok) setSprint(await sprintRes.json());
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     loadData();
//   }, [slug, sprintId]);

//   const updateStatus = async (storyId, status) => {
//     await authFetch(`/userstories/${storyId}/`, {
//       method: "PATCH",
//       body: JSON.stringify({ status }),
//     });

//     setStories((prev) =>
//       prev.map((s) => (s.id === storyId ? { ...s, status } : s))
//     );
//   };

//   const deleteSprint = async () => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this sprint?\nAll stories will move back to backlog."
//     );

//     if (!confirmed) return;

//     try {
//       await authFetch(`/sprints/${sprintId}/`, {
//         method: "DELETE",
//       });

//       navigate(`/project/${slug}/backlog`);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       {/* ===== SPRINT HEADER ===== */}
//       <div className="taskboard-header">
//         <div>
//           <h2>{sprint?.name || "Sprint"}</h2>
//           <span className="dates">
//             {sprint?.start_date} → {sprint?.end_date}
//           </span>
//         </div>

//         <button className="danger-btn" onClick={deleteSprint}>
//           Delete Sprint
//         </button>
//       </div>

//       {/* ===== TASKBOARD ===== */}
//       <div className="taskboard">
//         {STATUS_COLUMNS.map((column) => (
//           <div key={column.key} className="taskboard-column">
//             <div className="column-header">
//               <h4>{column.label}</h4>
//               <span className="count">
//                 {stories.filter((s) => s.status === column.key).length}
//               </span>
//             </div>

//             <div className="column-body">
//               {stories
//                 .filter((s) => s.status === column.key)
//                 .map((story) => (
//                   <div key={story.id} className="task-card">
//                     <span className="ref">#{story.ref}</span>
//                     <div className="task-title">{story.subject}</div>

//                     <select
//                       value={story.status}
//                       onChange={(e) =>
//                         updateStatus(story.id, e.target.value)
//                       }
//                     >
//                       {STATUS_COLUMNS.map((c) => (
//                         <option key={c.key} value={c.key}>
//                           {c.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }


import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authFetch } from "../../services/api";
import TaskCreateModal from "../../components/TaskCreateModal/TaskCreateModal";
import "./Taskboard.css";

const STATUS_COLUMNS = [
  { key: "New", label: "NEW" },
  { key: "In Progress", label: "IN PROGRESS" },
  { key: "Ready for Test", label: "READY FOR TEST" },
  { key: "Done", label: "CLOSED" },
];

export default function Taskboard() {
  const { slug, sprintId } = useParams();
  const navigate = useNavigate();

  const [stories, setStories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [sprint, setSprint] = useState(null);

  const [activeStory, setActiveStory] = useState(null);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const loadData = async () => {
      try {
        const [storiesRes, sprintRes] = await Promise.all([
          authFetch(`/userstories/?project__slug=${slug}&sprint=${sprintId}`),
          authFetch(`/sprints/${sprintId}/`),
        ]);

        const storiesData = storiesRes.ok ? await storiesRes.json() : [];
        setStories(storiesData);

        if (sprintRes.ok) setSprint(await sprintRes.json());

        // Load tasks for all stories
        const taskRequests = storiesData.map((s) =>
          authFetch(`/tasks/?project__slug=${slug}&userstory=${s.id}`)
        );

        const taskResponses = await Promise.all(taskRequests);
        const taskLists = await Promise.all(
          taskResponses.map((r) => (r.ok ? r.json() : []))
        );

        setTasks(taskLists.flat());
      } catch (err) {
        console.error(err);
      }
    };

    loadData();
  }, [slug, sprintId]);

  /* ================= TASK STATUS UPDATE ================= */
  const updateTaskStatus = async (taskId, status) => {
    await authFetch(`/tasks/${taskId}/`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t))
    );
  };

  /* ================= DELETE SPRINT ================= */
  const deleteSprint = async () => {
    if (!window.confirm("Delete this sprint?")) return;

    await authFetch(`/sprints/${sprintId}/`, { method: "DELETE" });
    navigate(`/project/${slug}/backlog`);
  };

  return (
    <>
      {/* ===== HEADER ===== */}
      <div className="taskboard-header">
        <div>
          <h2>{sprint?.name || "Sprint"}</h2>
          <span className="dates">
            {sprint?.start_date} → {sprint?.end_date}
          </span>
        </div>

        <button className="danger-btn" onClick={deleteSprint}>
          Delete Sprint
        </button>
      </div>

      {/* ===== BOARD ===== */}
      <div className="taskboard">
        {STATUS_COLUMNS.map((column) => (
          <div key={column.key} className="taskboard-column">
            <div className="column-header">
              <h4>{column.label}</h4>
            </div>

            <div className="column-body">
              {stories.map((story) => (
                <div key={story.id} className="story-lane">
                  {/* STORY HEADER */}
                  <div className="story-header">
                    <span>
                      #{story.ref} {story.subject}
                    </span>
                    <button
                      className="add-task-btn"
                      onClick={() => setActiveStory(story)}
                    >
                      +
                    </button>
                  </div>

                  {/* TASKS */}
                  {tasks
                    .filter(
                      (t) =>
                        t.userstory === story.id &&
                        t.status === column.key
                    )
                    .map((task) => (
                      <div key={task.id} className="task-card">
                        <span className="ref">#{task.ref}</span>
                        <div className="task-title">{task.subject}</div>

                        <select
                          value={task.status}
                          onChange={(e) =>
                            updateTaskStatus(task.id, e.target.value)
                          }
                        >
                          {STATUS_COLUMNS.map((c) => (
                            <option key={c.key} value={c.key}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ===== TASK MODAL ===== */}
      {activeStory && (
        <TaskCreateModal
          projectSlug={slug}
          userstoryId={activeStory.id}
          onClose={() => setActiveStory(null)}
          onCreated={(task) =>
            setTasks((prev) => [...prev, task])
          }
        />
      )}
    </>
  );
}
