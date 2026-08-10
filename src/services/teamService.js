import apiClient from "./apiClient";

/**
 * Team API Service Module
 */
export const createTeam = async (teamData) => {
  try {
    const response = await apiClient.post("/teams/create", teamData);
    return response;
  } catch (error) {
    console.warn("[CREATE TEAM API ERROR]:", error);
    throw error;
  }
};

export const fetchMyTeams = async () => {
  try {
    const response = await apiClient.get("/teams/my-teams");
    return response;
  } catch (error) {
    console.warn("[FETCH TEAMS API ERROR]:", error);
    throw error;
  }
};

export const addPlayerToRoster = async (teamId, playerData) => {
  try {
    const response = await apiClient.post(`/teams/${teamId}/players`, playerData);
    return response;
  } catch (error) {
    console.warn("[ADD PLAYER API ERROR]:", error);
    throw error;
  }
};

export default {
  createTeam,
  fetchMyTeams,
  addPlayerToRoster,
};
