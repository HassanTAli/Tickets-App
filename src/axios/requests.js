import { instance } from "./instance";

// get departments from db.json
export const getDepartments = async () => {
  const response = await instance.get("/departments");
  const data = await response.data;
  return data;
};

// get tickets from db.json
export const getTickets = async () => {
  const response = await instance.get("/tickets");
  const data = await response.data;
  return data;
};

// get ticket from db.json
export const getTicket = async (ticketId) => {
  const response = await instance.get(`/tickets/${ticketId}`);
  const data = await response.data;
  return data;
};

// get status from db.json
export const getStatus = async () => {
  const response = await instance.get("/status");
  const data = await response.data;
  return data;
};
