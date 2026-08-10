import apiClient from "./apiClient";

/**
 * Match API Service Module
 * Connects to Backend Live Match endpoints
 */
export const createMatch = async (matchData) => {
  try {
    const response = await apiClient.post("/matches/create", matchData);
    return response;
  } catch (error) {
    console.warn("[CREATE MATCH API ERROR]:", error);
    throw error;
  }
};

export const updateToss = async (matchId, tossWinnerId, tossChoice) => {
  try {
    const response = await apiClient.post(`/matches/${matchId}/toss`, {
      tossWinnerId,
      tossChoice,
    });
    return response;
  } catch (error) {
    console.warn("[UPDATE TOSS API ERROR]:", error);
    throw error;
  }
};

export const recordBallScore = async (matchId, ballData) => {
  try {
    const response = await apiClient.post(`/matches/${matchId}/score-ball`, ballData);
    return response;
  } catch (error) {
    console.warn("[RECORD BALL API ERROR]:", error);
    throw error;
  }
};

export const fetchLiveMatches = async () => {
  try {
    const response = await apiClient.get("/matches/live");
    return response;
  } catch (error) {
    console.warn("[FETCH LIVE MATCHES ERROR]:", error);
    throw error;
  }
};

export default {
  createMatch,
  updateToss,
  recordBallScore,
  fetchLiveMatches,
};
