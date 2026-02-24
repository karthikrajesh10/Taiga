import { authFetch } from "./authFetch";

/* ================= ADD MEMBER ================= */

export const addMember = async (data) =>
  await authFetch("/memberships/", {
    method: "POST",
    body: JSON.stringify(data),
  });

/* ================= GET PROJECT MEMBERS ================= */

export const getProjectMembers = async (projectId) =>
  await authFetch(`/memberships/?project=${projectId}`);

/* ================= REMOVE MEMBER ================= */

export const removeMember = async (id) =>
  await authFetch(`/memberships/${id}/`, {
    method: "DELETE",
  });