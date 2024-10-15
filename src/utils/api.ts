import { IRecord } from "../app/types";

const url = "https://ticto-test-backend.onrender.com";

export const getRecords = async (): Promise<IRecord[]> => {
  const response = await fetch(url + "/api/v1/record/expense");
  if (!response.ok) {
    throw new Error("Failed to fetch records");
  }
  return await response.json();
};

export const createRecord = async (
  recordData: Omit<IRecord, "_id">
): Promise<IRecord> => {
  const response = await fetch(url + "/api/v1/record/expense", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recordData),
  });
  if (!response.ok) {
    throw new Error("Failed to create record");
  }
  return await response.json();
};

export const getTotalEntries = async (): Promise<{ totalEntries: number }> => {
  const response = await fetch(url + "/api/v1/record/entries");
  if (!response.ok) {
    throw new Error("Failed to fetch total entries");
  }
  return await response.json();
};

export const getTotalExits = async (): Promise<{ totalExits: number }> => {
  const response = await fetch("/api/v1/record/exits");
  if (!response.ok) {
    throw new Error("Failed to fetch total exits");
  }
  return await response.json();
};

export const getTotalBalance = async (): Promise<{ totalBalance: number }> => {
  const response = await fetch("/api/record/total");
  if (!response.ok) {
    throw new Error("Failed to fetch total balance");
  }
  return await response.json();
};

export const updateRecord = async (
  id: string,
  recordData: Omit<IRecord, "_id">
): Promise<IRecord> => {
  const response = await fetch(url + `/api/v1/record/expense/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recordData),
  });
  if (!response.ok) {
    throw new Error("Failed to update record");
  }
  return await response.json();
};

// Função para excluir um registro
export const deleteRecord = async (id: string): Promise<void> => {
  const response = await fetch(url + `/api/v1/record/expense/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete record");
  }
};
