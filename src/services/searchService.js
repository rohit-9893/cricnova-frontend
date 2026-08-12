import apiClient from "./apiClient";

// Search Players by Name or Phone
export const searchPlayers = async (query) => {
  try {
    const response = await apiClient.get("/players/search", { params: { query } });
    return response;
  } catch (error) {
    console.warn("[SEARCH PLAYERS API ERROR]:", error);
    throw error;
  }
};

// Search Teams by Name
export const searchTeams = async (query) => {
  try {
    const response = await apiClient.get("/teams/search", { params: { query } });
    return response;
  } catch (error) {
    console.warn("[SEARCH TEAMS API ERROR]:", error);
    throw error;
  }
};

// Search Tournaments by Name
export const searchTournaments = async (query) => {
  try {
    const response = await apiClient.get("/tournaments/search", { params: { query } });
    return response;
  } catch (error) {
    console.warn("[SEARCH TOURNAMENTS API ERROR]:", error);
    throw error;
  }
};

export default { searchPlayers, searchTeams, searchTournaments };
