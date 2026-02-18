// import { authFetch } from "./authFetch";

// export const getProjectIssues = (slug) =>
//   authFetch(`/issues/?project_slug=${slug}`);

// export const createIssue = (data) =>
//   authFetch(`/issues/`, {
//     method: "POST",
//     body: JSON.stringify(data),
//   });

import { authFetch } from "./authFetch";

/* ================= GET PROJECT ISSUES ================= */

export const getProjectIssues = async (slug) =>
  await authFetch(`/issues/?project_slug=${slug}`);

/* ================= CREATE ISSUE ================= */

export const createIssue = async (data) =>
  await authFetch("/issues/", {
    method: "POST",
    body: JSON.stringify(data),
  });

/* ================= UPDATE ISSUE ================= */

export const updateIssue = async (id, data) =>
  await authFetch(`/issues/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

/* ================= DELETE ISSUE ================= */

export const deleteIssue = async (id) =>
  await authFetch(`/issues/${id}/`, {
    method: "DELETE",
  });
