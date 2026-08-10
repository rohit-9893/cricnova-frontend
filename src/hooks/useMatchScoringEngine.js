import useMatchStore from "../store/useMatchStore";

export const useMatchScoringEngine = () => {
  // Subscribe to primitive state values individually to maintain stable reference identity for React 19's useSyncExternalStore
  const totalRuns = useMatchStore((s) => s.totalRuns);
  const wickets = useMatchStore((s) => s.wickets);
  const oversCompleted = useMatchStore((s) => s.oversCompleted);
  const legalBalls = useMatchStore((s) => s.legalBallsInCurrentOver);
  const totalOvers = useMatchStore((s) => s.totalOvers);
  const currentInning = useMatchStore((s) => s.currentInning);
  const targetRuns = useMatchStore((s) => s.targetRuns);
  const isInningsComplete = useMatchStore((s) => s.isInningsComplete);
  const isMatchFinished = useMatchStore((s) => s.isMatchFinished);
  const matchWinner = useMatchStore((s) => s.matchWinner);

  const striker = useMatchStore((s) => s.striker);
  const nonStriker = useMatchStore((s) => s.nonStriker);
  const bowler = useMatchStore((s) => s.currentBowler);
  const timeline = useMatchStore((s) => s.currentOverTimeline);
  const teamA = useMatchStore((s) => s.teamA);
  const teamB = useMatchStore((s) => s.teamB);
  const battingTeam = useMatchStore((s) => s.battingTeam);
  const bowlingTeam = useMatchStore((s) => s.bowlingTeam);

  const recordBall = useMatchStore((s) => s.recordBall);
  const undoLastBall = useMatchStore((s) => s.undoLastBall);
  const swapStrikers = useMatchStore((s) => s.swapStrikers);
  const setBowler = useMatchStore((s) => s.setBowler);
  const startSecondInning = useMatchStore((s) => s.startSecondInning);

  // Formatted Overs (e.g., "4.3")
  const formattedOvers = `${oversCompleted}.${legalBalls}`;

  // Current Run Rate calculation
  const totalBallsCompleted = oversCompleted * 6 + legalBalls;
  const currentRunRate =
    totalBallsCompleted > 0
      ? ((totalRuns / totalBallsCompleted) * 6).toFixed(2)
      : "0.00";

  // Score ball actions
  const scoreRuns = (runs) => {
    recordBall({ runs, isExtra: false, isWicket: false });
  };

  const scoreExtra = (extraType, runs = 0) => {
    recordBall({ runs, isExtra: true, extraType });
  };

  const scoreWicket = (wicketType = "BOWLED") => {
    recordBall({ runs: 0, isWicket: true, wicketType });
  };

  return {
    totalRuns,
    wickets,
    oversCompleted,
    legalBalls,
    totalOvers,
    currentInning,
    targetRuns,
    isInningsComplete,
    isMatchFinished,
    matchWinner,
    striker,
    nonStriker,
    bowler,
    timeline,
    teamA,
    teamB,
    battingTeam,
    bowlingTeam,
    formattedOvers,
    currentRunRate,
    scoreRuns,
    scoreExtra,
    scoreWicket,
    undoLastBall,
    swapStrikers,
    setBowler,
    startSecondInning,
  };
};

export default useMatchScoringEngine;
