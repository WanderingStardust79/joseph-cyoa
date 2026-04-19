import { useState, useCallback, useRef } from "react";
import scenes from "../data/scenes";

const INITIAL_TRAITS = { faith: 0, courage: 0, wisdom: 0 };
const FADE_DURATION = 250;

export default function useGameState() {
  const [scene, setScene] = useState("intro");
  const [traits, setTraits] = useState({ ...INITIAL_TRAITS });
  const [choices, setChoices] = useState(0);
  const [altExplored, setAltExplored] = useState(0);
  const [recoveries, setRecoveries] = useState(0);
  const [visited, setVisited] = useState(() => new Set(["intro"]));
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [fade, setFade] = useState(false);
  const [traitPopup, setTraitPopup] = useState(null);
  const [pendingNext, setPendingNext] = useState(null);
  const [perspectiveSwitch, setPerspectiveSwitch] = useState(null);

  const prevCharRef = useRef(null);

  const sceneData = scenes ? scenes[scene] : undefined;

  const go = useCallback(
    (sceneKey) => {
      setFade(true);
      setTimeout(() => {
        setScene(sceneKey);
        setVisited((prev) => {
          const next = new Set(prev);
          next.add(sceneKey);
          return next;
        });

        // Detect perspective switch
        if (scenes) {
          const nextScene = scenes[sceneKey];
          if (nextScene && nextScene.who) {
            if (
              prevCharRef.current &&
              prevCharRef.current !== nextScene.who
            ) {
              setPerspectiveSwitch(nextScene.who);
            }
            prevCharRef.current = nextScene.who;
          }
        }

        setFade(false);
      }, FADE_DURATION);
    },
    [scenes]
  );

  const pick = useCallback(
    (choice) => {
      // Update traits from choice
      if (choice.tr) {
        setTraits((prev) => {
          const updated = { ...prev };
          for (const [key, val] of Object.entries(choice.tr)) {
            updated[key] = (updated[key] || 0) + val;
          }
          return updated;
        });
        setTraitPopup(choice.tr);
      }

      // Increment total choices
      setChoices((c) => c + 1);

      // Track alt explored
      const targetScene = scenes ? scenes[choice.next] : null;
      if (targetScene && targetScene.alt) {
        setAltExplored((a) => a + 1);
      }

      // Track recoveries
      if (choice.next && choice.next.includes("_rec")) {
        setRecoveries((r) => r + 1);
      }

      // Update streak
      if (targetScene && targetScene.alt) {
        setStreak(0);
      } else {
        setStreak((s) => s + 1);
      }

      // Add points from current scene
      if (sceneData && sceneData.points) {
        setScore((s) => s + sceneData.points);
      }

      // If current scene has scripture, show it before navigating
      if (sceneData && sceneData.scripture) {
        setPendingNext(choice.next);
      } else {
        go(choice.next);
      }
    },
    [scenes, sceneData, go]
  );

  const closeScripture = useCallback(() => {
    const next = pendingNext;
    setPendingNext(null);
    if (next) {
      go(next);
    }
  }, [pendingNext, go]);

  const restart = useCallback(() => {
    setScene("intro");
    setTraits({ ...INITIAL_TRAITS });
    setChoices(0);
    setAltExplored(0);
    setRecoveries(0);
    setVisited(new Set(["intro"]));
    setStreak(0);
    setScore(0);
    setFade(false);
    setTraitPopup(null);
    setPendingNext(null);
    setPerspectiveSwitch(null);
    prevCharRef.current = null;
  }, []);

  return {
    scene,
    sceneData,
    traits,
    choices,
    altExplored,
    recoveries,
    visited,
    streak,
    score,
    fade,
    traitPopup,
    setTraitPopup,
    pendingNext,
    perspectiveSwitch,
    setPerspectiveSwitch,
    go,
    pick,
    closeScripture,
    restart,
  };
}
