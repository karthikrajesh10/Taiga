// // import { authFetch } from "./authFetch";

// // export const getProjects = () =>
// //   authFetch("/projects/");

// // export const createProject = (data) =>
// //   authFetch("/projects/", {
// //     method: "POST",
// //     body: JSON.stringify(data),
// //   });

// import { authFetch } from "./authFetch";

// export const getProjects = async () => {
//   const res = await authFetch("/projects/");

//   if (!res.ok) {
//     const err = await res.json();
//     throw new Error(err.detail || "Failed to fetch projects");
//   }

//   return await res.json();  // return array
// };

// export const createProject = async (data) => {
//   const res = await authFetch("/projects/", {
//     method: "POST",
//     body: JSON.stringify(data),
//   });

//   if (!res.ok) {
//     const err = await res.json();
//     throw new Error(err.detail || "Failed to create project");
//   }

//   return await res.json();  // return created project
// };
import { authFetch } from "./authFetch";

export const getProjects = async () => {
  return await authFetch("/projects/");
};

export const createProject = async (data) => {
  return await authFetch("/projects/", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/**
 * Resolve a project by slug.
 *
 * Some backends ignore the `?slug=` filter and return an array of projects; in that
 * case we must find the matching slug client-side to avoid accidentally selecting
 * the first project (often id=1).
 */
export const getProjectBySlug = async (slug) => {
  if (!slug) return null;

  const encoded = encodeURIComponent(slug);
  const data = await authFetch(`/projects/?slug=${encoded}`);

  if (Array.isArray(data)) {
    return data.find((p) => p?.slug === slug) || null;
  }

  // If the backend returns a single project object, just return it.
  return data || null;
};

export const getProjectIdBySlug = async (slug) => {
  const project = await getProjectBySlug(slug);
  const id = project?.id;
  if (!id) return null;
  return id;
};