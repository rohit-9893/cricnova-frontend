import createStore from "./createStore";

export const useMatchStore = createStore((set, get) => ({
  // Match Config & Setup
  matchId: null,
  teamA: { teamName: "Team A", avatarInitials: "TA", avatarColor: "#7C3AED" },
  teamB: { teamName: "Team B", avatarInitials: "TB", avatarColor: "#EC4899" },
  totalOvers: 20,
  oversPerBowler: 4,
  ballType: "tennis",
  pitchType: "TURF",
  venue: "Stadium Ground",

  // Live Match Dynamic State
  tossWinner: null,
  tossChoice: "BAT",
  battingTeam: null,
  bowlingTeam: null,
  currentInning: 1,

  totalRuns: 0,
  wickets: 0,
  oversCompleted: 0,
  legalBallsInCurrentOver: 0,

  striker: "Striker 1",
  nonStriker: "Non-Striker",
  currentBowler: "Bowler 1",

  targetRuns: null,
  isInningsComplete: false,
  isMatchFinished: false,
  matchWinner: null,

  currentOverTimeline: [], // e.g. ['1', '4', 'Wd', 'W']
  ballHistory: [], // Full snapshots array for Undo Ball support

  // Initializing Match Setup
  setupMatch: (matchConfig) => {
    set({
      ...matchConfig,
      totalOvers: Number(matchConfig.totalOvers || 20),
      battingTeam: matchConfig.teamA,
      bowlingTeam: matchConfig.teamB,
      totalRuns: 0,
      wickets: 0,
      oversCompleted: 0,
      legalBallsInCurrentOver: 0,
      targetRuns: null,
      isInningsComplete: false,
      isMatchFinished: false,
      matchWinner: null,
      currentOverTimeline: [],
      ballHistory: [],
    });
  },

  // Record Toss Result
  setTossResult: (winnerTeam, choice) => {
    const isWinnerTeamA = winnerTeam.teamName === get().teamA.teamName;
    const battingFirst =
      (isWinnerTeamA && choice === "BAT") || (!isWinnerTeamA && choice === "BOWL")
        ? get().teamA
        : get().teamB;
    const bowlingFirst = battingFirst.teamName === get().teamA.teamName ? get().teamB : get().teamA;

    const strikerName = battingFirst.roster?.[0]?.name || `${battingFirst.teamName} Batter 1`;
    const nonStrikerName = battingFirst.roster?.[1]?.name || `${battingFirst.teamName} Batter 2`;
    const bowlerName = bowlingFirst.roster?.[0]?.name || `${bowlingFirst.teamName} Bowler 1`;

    set({
      tossWinner: winnerTeam,
      tossChoice: choice,
      battingTeam: battingFirst,
      bowlingTeam: bowlingFirst,
      striker: strikerName,
      nonStriker: nonStrikerName,
      currentBowler: bowlerName,
    });
  },

  // Set Opening Players (Striker, Non-Striker, Bowler)
  setOpeningPlayers: (strikerName, nonStrikerName, bowlerName) => {
    set({
      striker: strikerName,
      nonStriker: nonStrikerName,
      currentBowler: bowlerName,
    });
  },

  // Record Ball Action (Runs, Extras, Wickets)
  recordBall: ({ runs = 0, isExtra = false, extraType = null, isWicket = false, wicketType = null }) => {
    const state = get();

    // Prevent scoring if match is already finished or innings is complete
    if (state.isMatchFinished || state.isInningsComplete) {
      return false;
    }

    const maxOvers = Number(state.totalOvers || 20);

    // Stop if max overs already completed before this ball
    if (state.oversCompleted >= maxOvers || state.wickets >= 10) {
      set({ isInningsComplete: true });
      return false;
    }

    // Take snapshot for Undo functionality
    const snapshot = {
      totalRuns: state.totalRuns,
      wickets: state.wickets,
      oversCompleted: state.oversCompleted,
      legalBallsInCurrentOver: state.legalBallsInCurrentOver,
      striker: state.striker,
      nonStriker: state.nonStriker,
      currentBowler: state.currentBowler,
      currentOverTimeline: [...state.currentOverTimeline],
      isInningsComplete: state.isInningsComplete,
      isMatchFinished: state.isMatchFinished,
      matchWinner: state.matchWinner,
    };

    let addedRuns = Number(runs);
    let isLegalBall = true;
    let ballTag = String(runs);

    // Extra calculation (Wide / No ball adds 1 penalty run & is illegal)
    if (isExtra) {
      if (extraType === "WD" || extraType === "NB") {
        addedRuns += 1;
        isLegalBall = false;
        ballTag = extraType === "WD" ? `${runs > 0 ? runs : ""}Wd` : `${runs > 0 ? runs : ""}Nb`;
      } else if (extraType === "B" || extraType === "LB") {
        ballTag = `${runs}${extraType}`;
      }
    }

    if (isWicket) {
      ballTag = "W";
    }

    // New state values
    let newRuns = state.totalRuns + addedRuns;
    let newWickets = isWicket ? state.wickets + 1 : state.wickets;
    let newLegalBalls = state.legalBallsInCurrentOver + (isLegalBall ? 1 : 0);
    let newOversCompleted = state.oversCompleted;
    let newTimeline = [...state.currentOverTimeline, ballTag];

    let newStriker = state.striker;
    let newNonStriker = state.nonStriker;

    // Odd runs strike rotation (1, 3, 5 runs swap striker & non-striker)
    if (addedRuns % 2 !== 0 && !isWicket) {
      const temp = newStriker;
      newStriker = newNonStriker;
      newNonStriker = temp;
    }

    // Wicket handling: new batsman comes on strike
    if (isWicket) {
      newStriker = `Batsman ${newWickets + 2}`;
    }

    // Over Completion Check (6 legal balls)
    let isOverComplete = false;
    if (newLegalBalls >= 6) {
      newOversCompleted += 1;
      newLegalBalls = 0;
      newTimeline = [];
      isOverComplete = true;
      // End of over strike rotation
      const temp = newStriker;
      newStriker = newNonStriker;
      newNonStriker = temp;
    }

    // Check Innings Complete or Target Chased
    let inningsDone = state.isInningsComplete;
    let matchDone = state.isMatchFinished;
    let winner = state.matchWinner;

    if (state.currentInning === 2 && state.targetRuns) {
      if (newRuns >= state.targetRuns) {
        matchDone = true;
        winner = state.battingTeam;
      } else if (newOversCompleted >= maxOvers || newWickets >= 10) {
        matchDone = true;
        winner = state.bowlingTeam;
      }
    } else if (newOversCompleted >= maxOvers || newWickets >= 10) {
      inningsDone = true;
    }

    set({
      totalRuns: newRuns,
      wickets: newWickets,
      oversCompleted: newOversCompleted,
      legalBallsInCurrentOver: newLegalBalls,
      striker: newStriker,
      nonStriker: newNonStriker,
      currentOverTimeline: newTimeline,
      isInningsComplete: inningsDone,
      isMatchFinished: matchDone,
      matchWinner: winner,
      ballHistory: [...state.ballHistory, snapshot],
    });

    return true;
  },

  // Start 2nd Innings Target Chase
  startSecondInning: () => {
    const state = get();
    const target = state.totalRuns + 1;
    const newBattingTeam = state.bowlingTeam;
    const newBowlingTeam = state.battingTeam;

    const strikerName = newBattingTeam?.roster?.[0]?.name || `${newBattingTeam?.teamName || "Team"} Batter 1`;
    const nonStrikerName = newBattingTeam?.roster?.[1]?.name || `${newBattingTeam?.teamName || "Team"} Batter 2`;
    const bowlerName = newBowlingTeam?.roster?.[0]?.name || `${newBowlingTeam?.teamName || "Team"} Bowler 1`;

    set({
      currentInning: 2,
      targetRuns: target,
      totalRuns: 0,
      wickets: 0,
      oversCompleted: 0,
      legalBallsInCurrentOver: 0,
      battingTeam: newBattingTeam,
      bowlingTeam: newBowlingTeam,
      striker: strikerName,
      nonStriker: nonStrikerName,
      currentBowler: bowlerName,
      currentOverTimeline: [],
      isInningsComplete: false,
      isMatchFinished: false,
      ballHistory: [],
    });
  },

  // Undo Last Ball Action
  undoLastBall: () => {
    const { ballHistory } = get();
    if (ballHistory.length === 0) return;

    const previousSnapshot = ballHistory[ballHistory.length - 1];
    const updatedHistory = ballHistory.slice(0, -1);

    set({
      ...previousSnapshot,
      ballHistory: updatedHistory,
    });
  },

  // Swap Striker & Non-Striker Manually
  swapStrikers: () => {
    const { striker, nonStriker } = get();
    set({ striker: nonStriker, nonStriker: striker });
  },

  // Change Bowler
  setBowler: (bowlerName) => {
    set({ currentBowler: bowlerName });
  },
}));

export default useMatchStore;
