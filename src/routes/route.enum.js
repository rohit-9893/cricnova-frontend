/**
 * Route Enums for CricNovas Mobile Application
 * Organizes Auth and Main Application Route Paths
 */

export const AuthRouteEnum = {
  ROOT: "/(auth)",
  SPLASH: "/splash",
  LOGIN: "/(auth)/LoginScreen",
  MOBILE_INPUT: "/(auth)/MobileInputScreen",
  OTP_VERIFICATION: "/(auth)/OtpVerifyScreen",
  GUEST_CITY: "/(auth)/GuestCityScreen",
  REGISTER: "/(auth)/RegisterScreen",
};

export const AppRouteEnum = {
  INDEX: "/",
  HOME: "/(home)",
  PLACEHOLDER: "/placeholder",
  MATCH: {
    INDEX: "/match",
    SELECT_PLAYING_TEAMS: "/match/SelectPlayingTeamsScreen",
    SELECT_TEAM: "/match/SelectTeamScreen",
    CREATE_TEAM: "/match/CreateTeamScreen",
    START_MATCH_SETUP: "/match/StartMatchSetupScreen",
  },
  TEAM: {
    INDEX: "/team",
    TEAM_ROSTER: "/team/TeamRosterScreen",
  },
  TOURNAMENT: {
    INDEX: "/tournament",
    CREATE_TOURNAMENT: "/tournament/CreateTournamentScreen",
  },
  PROFILE: {
    INDEX: "/profile",
    MY_PROFILE: "/profile/MyProfileScreen",
    EDIT_PROFILE: "/profile/EditProfileScreen",
  },
  NOTIFICATIONS: {
    INDEX: "/notifications",
  },
  SEARCH: {
    INDEX: "/search",
  },
  SELECT_LOCATION: {
    INDEX: "/select-location",
  },
};
