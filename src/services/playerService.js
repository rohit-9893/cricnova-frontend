import apiClient from "./apiClient";

// 1. Search Players by Name or Phone - GET /api/v1/players/search?query={term}
export const searchPlayers = async (query) => {
  try {
    const response = await apiClient.get("/players/search", {
      params: { query },
    });
    return response;
  } catch (error) {
    console.warn("[SEARCH PLAYERS API ERROR]:", error);
    throw error;
  }
};

// 2. Create Local / Unregistered Player - POST /api/v1/players/create
export const createLocalPlayer = async (playerData) => {
  try {
    const allowedKeys = [
      "name",
      "phone",
      "city",
      "battingStyle",
      "bowlingStyle",
      "role",
      "isGuest",
    ];

    const cleanPayload = {};
    Object.keys(playerData || {}).forEach((key) => {
      if (
        allowedKeys.includes(key) &&
        playerData[key] !== undefined &&
        playerData[key] !== null
      ) {
        cleanPayload[key] = playerData[key];
      }
    });

    const response = await apiClient.post("/players/create", cleanPayload);
    return response;
  } catch (error) {
    console.warn("[CREATE LOCAL PLAYER API ERROR]:", error);
    throw error;
  }
};

// 3. Fetch Player Career Stats - GET /api/v1/players/:id/stats
export const getPlayerStats = async (playerId) => {
  try {
    const response = await apiClient.get(`/players/${playerId}/stats`);
    return response;
  } catch (error) {
    console.warn("[GET PLAYER STATS API ERROR]:", error);
    throw error;
  }
};

// 4. Update Playing Roles (Batting/Bowling Style) - PATCH /api/v1/players/roles
export const updatePlayerRoles = async (rolesPayload) => {
  try {
    const allowedKeys = ["battingStyle", "bowlingStyle", "role"];

    const cleanPayload = {};
    Object.keys(rolesPayload || {}).forEach((key) => {
      if (
        allowedKeys.includes(key) &&
        rolesPayload[key] !== undefined &&
        rolesPayload[key] !== null
      ) {
        cleanPayload[key] = rolesPayload[key];
      }
    });

    const response = await apiClient.patch("/players/roles", cleanPayload);
    return response;
  } catch (error) {
    console.warn("[UPDATE PLAYER ROLES API ERROR]:", error);
    throw error;
  }
};

export default {
  searchPlayers,
  createLocalPlayer,
  getPlayerStats,
  updatePlayerRoles,
};
