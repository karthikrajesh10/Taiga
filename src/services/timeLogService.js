import { authFetch } from "./authFetch";

/* ================= LOG TIME ================= */
export const createTimeLog = async (data) =>
  await authFetch("/timelogs/", {
    method: "POST",
    body: JSON.stringify(data),
  });

/* ================= GET LOGS BY TASK ================= */
export const getTimeLogsByTask = async (taskId) =>
  await authFetch(`/timelogs/?task=${taskId}`);

/* ================= GET LOGS BY PROJECT ================= */
export const getTimeLogsByProject = async (projectId) =>
  await authFetch(`/timelogs/?project=${projectId}`);

/* ================= GET LOGS BY SPRINT ================= */
export const getTimeLogsBySprint = async (sprintId) =>
  await authFetch(`/timelogs/?sprint=${sprintId}`);

/* ================= GET MY LOGS ================= */
export const getMyTimeLogs = async () =>
  await authFetch(`/timelogs/my/`);

/* ================= GET TASK SUMMARY (total per user) ================= */
export const getTaskTimeLogSummary = async (taskId) =>
  await authFetch(`/timelogs/task-summary/?task=${taskId}`);

/* ================= UPDATE LOG ================= */
export const updateTimeLog = async (logId, data) =>
  await authFetch(`/timelogs/${logId}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

/* ================= DELETE LOG ================= */
export const deleteTimeLog = async (logId) =>
  await authFetch(`/timelogs/${logId}/`, {
    method: "DELETE",
  });