import apiClient from "./apiClient";

/**
 * Tournament API Service Module
 */
export const createTournament = async (tournamentData) => {
  try {
    const response = await apiClient.post("/tournaments/create", tournamentData);
    return response;
  } catch (error) {
    console.warn("[CREATE TOURNAMENT API ERROR]:", error);
    throw error;
  }
};

export const fetchTournaments = async () => {
  try {
    const response = await apiClient.get("/tournaments");
    return response;
  } catch (error) {
    console.warn("[FETCH TOURNAMENTS API ERROR]:", error);
    throw error;
  }
};

export default {
  createTournament,
  fetchTournaments,
};
