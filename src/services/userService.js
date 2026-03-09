import { authFetch } from "./authFetch";

/* ================= GET ALL USERS ================= */

export const getUsers = async () =>
  await authFetch("/users/");

/* ================= GET CURRENT USER ================= */

export const getCurrentUser = async () =>
  await authFetch("/users/me/");


/* ================= SIGNUP ================= */

export const signupUser = async (data) =>
  await authFetch("/users/signup/", {
    method: "POST",
    body: JSON.stringify(data),
  });

/* ================= ASSIGN ROLES ================= */

export const assignRoles = async (userId, roles) =>
  await authFetch(`/users/${userId}/roles/`, {
    method: "POST",
    body: JSON.stringify({ roles }),
  });