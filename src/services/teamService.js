import apiClient from "./apiClient";

/**
 * Team API Service Module
 * Base: /api/v1/teams
 * All endpoints are protected — Bearer token is auto-attached via apiClient interceptor.
 */

// 1. Create New Team — POST /api/v1/teams
// Body: { name, description, logoUrl, location }
export const createTeam = async (teamData) => {
  try {
    const response = await apiClient.post("/teams", teamData);
    return response;
  } catch (error) {
    console.warn("[CREATE TEAM API ERROR]:", error);
    throw error;
  }
};

// 2. Fetch My Teams — GET /api/v1/teams/me
// Returns all teams owned/created by the logged-in user
export const fetchMyTeams = async () => {
  try {
    const response = await apiClient.get("/teams/me");
    return response;
  } catch (error) {
    console.warn("[FETCH MY TEAMS API ERROR]:", error);
    throw error;
  }
};

// 3. Get Team by ID — GET /api/v1/teams/:teamId
// Returns specific team details + squad
export const getTeamById = async (teamId) => {
  try {
    const response = await apiClient.get(`/teams/${teamId}`);
    return response;
  } catch (error) {
    console.warn("[GET TEAM API ERROR]:", error);
    throw error;
  }
};

// 4. Update Team — PATCH /api/v1/teams/:teamId
// Body: { name, description, logoUrl, location } (any subset)
export const updateTeam = async (teamId, teamData) => {
  try {
    const response = await apiClient.patch(`/teams/${teamId}`, teamData);
    return response;
  } catch (error) {
    console.warn("[UPDATE TEAM API ERROR]:", error);
    throw error;
  }
};

// 5. Delete / Archive Team — DELETE /api/v1/teams/:teamId
export const deleteTeam = async (teamId) => {
  try {
    const response = await apiClient.delete(`/teams/${teamId}`);
    return response;
  } catch (error) {
    console.warn("[DELETE TEAM API ERROR]:", error);
    throw error;
  }
};

export default {
  createTeam,
  fetchMyTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
};
