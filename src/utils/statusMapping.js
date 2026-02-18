// Status mapping utilities
// Backend uses numeric statuses: 1=New, 2=In Progress, 3=Ready For Test, 4=Done

export const STATUS_TO_NUMBER = {
  "New": 1,
  "In Progress": 2,
  "Ready for Test": 3,
  "Ready For Test": 3,
  "Done": 4,
  "Closed": 4,
};

export const NUMBER_TO_STATUS = {
  1: "New",
  2: "In Progress",
  3: "Ready For Test",
  4: "Done",
};

export const stringToStatusNumber = (status) => {
  return STATUS_TO_NUMBER[status] || 1;
};

export const numberToStatusString = (status) => {
  return NUMBER_TO_STATUS[status] || "New";
};

// Helper to create slug from title
export const createSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};
