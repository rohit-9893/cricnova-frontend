import apiClient from "./apiClient";

/**
 * Team Membership API Service Module
 * Base: /api/v1/teams/:teamId/members
 */

// 1. Add Player to Team — POST /api/v1/teams/:teamId/members
// Body: { playerProfileId, jerseyNumber }
export const addTeamMember = async (teamId, memberData) => {
  try {
    const response = await apiClient.post(`/teams/${teamId}/members`, memberData);
    return response;
  } catch (error) {
    console.warn("[ADD TEAM MEMBER API ERROR]:", error);
    throw error;
  }
};

// 2. Fetch Team Members List — GET /api/v1/teams/:teamId/members
export const fetchTeamMembers = async (teamId) => {
  try {
    const response = await apiClient.get(`/teams/${teamId}/members`);
    return response;
  } catch (error) {
    console.warn("[FETCH TEAM MEMBERS API ERROR]:", error);
    throw error;
  }
};

// 3. Get Single Member Details — GET /api/v1/teams/:teamId/members/:membershipId
export const getTeamMemberById = async (teamId, membershipId) => {
  try {
    const response = await apiClient.get(`/teams/${teamId}/members/${membershipId}`);
    return response;
  } catch (error) {
    console.warn("[GET TEAM MEMBER BY ID ERROR]:", error);
    throw error;
  }
};

// 4. Update Member Jersey Number — PATCH /api/v1/teams/:teamId/members/:membershipId/jersey
// Body: { jerseyNumber }
export const updateMemberJersey = async (teamId, membershipId, jerseyNumber) => {
  try {
    const response = await apiClient.patch(
      `/teams/${teamId}/members/${membershipId}/jersey`,
      { jerseyNumber }
    );
    return response;
  } catch (error) {
    console.warn("[UPDATE MEMBER JERSEY ERROR]:", error);
    throw error;
  }
};

// 5. Leave Team — POST /api/v1/teams/:teamId/members/:membershipId/leave
export const leaveTeam = async (teamId, membershipId) => {
  try {
    const response = await apiClient.post(
      `/teams/${teamId}/members/${membershipId}/leave`
    );
    return response;
  } catch (error) {
    console.warn("[LEAVE TEAM ERROR]:", error);
    throw error;
  }
};

// 6. Remove Player from Team — DELETE /api/v1/teams/:teamId/members/:membershipId
export const removeTeamMember = async (teamId, membershipId) => {
  try {
    const response = await apiClient.delete(
      `/teams/${teamId}/members/${membershipId}`
    );
    return response;
  } catch (error) {
    console.warn("[REMOVE TEAM MEMBER ERROR]:", error);
    throw error;
  }
};

export default {
  addTeamMember,
  fetchTeamMembers,
  getTeamMemberById,
  updateMemberJersey,
  leaveTeam,
  removeTeamMember,
};
