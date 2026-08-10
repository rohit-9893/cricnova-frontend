export const MATCH_TYPES = [
  "Limited Overs",
  "Box/Turf Cricket",
  "Pair Cricket",
  "Test Match",
  "The Hundred",
];

export const BALL_TYPES = [
  { id: "tennis", label: "Tennis", icon: "tennisball-outline", color: "#84CC16" },
  { id: "leather", label: "Leather", icon: "baseball-outline", color: "#EF4444" },
  { id: "other", label: "Other", icon: "ellipse-outline", color: "#F59E0B" },
];

export const PITCH_TYPES = ["TURF", "CEMENT", "ROUGH", "ASTROTURF", "MATTING"];

export const WICKET_TYPES = [
  { id: "BOWLED", label: "Bowled" },
  { id: "CATCH", label: "Caught" },
  { id: "RUN_OUT", label: "Run Out" },
  { id: "LBW", label: "LBW" },
  { id: "STUMPED", label: "Stumped" },
  { id: "HIT_WICKET", label: "Hit Wicket" },
];

export default {
  MATCH_TYPES,
  BALL_TYPES,
  PITCH_TYPES,
  WICKET_TYPES,
};
