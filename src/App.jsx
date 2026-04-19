import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { SCENES } from "./data/scenes";
import { CHARACTERS, BACKGROUNDS } from "./data/characters";
import useGameState from "./hooks/useGameState";
import useNarration from "./hooks/useNarration";
import useSoundEffects from "./hooks/useSoundEffects";
import { shuffleChoices } from "./utils/shuffle";
import Illustration from "./components/Illustrations";
import ScriptureCard from "./components/ScriptureCard";
import ChoiceButton from "./components/ChoiceButton";
import TraitToast from "./components/TraitToast";
import PerspectiveSwitch from "./components/PerspectiveSwitch";
import JourneyMap from "./components/JourneyMap";
import ProgressBar from "./components/ProgressBar";
import Header from "./components/Header";
import ResultsScreen from "./components/ResultsScreen";
import Onboarding from "./components/Onboarding";

export default function App() {
  const [onboarded, setOnboarded] = useState(
    () => localStorage.getItem("joseph-cyoa-onboarded") === "true"
  );
  const [showMap, setShowMap] = useState(false);
  const prevChRef = useRef(null);
  const choicesRef = useRef(null);

  const {
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
  } = useGameState();

  const { on, speaking, speak, stop, toggle } = useNarration();
  const { play, setEnabled, enabled } = useSoundEffects();

  const shuffledChoices = useMemo(
    () => shuffleChoices(sceneData?.choices || [], scene),
    [scene, sceneData?.choices]
  );

  const characterTheme =
    sceneData?.who && CHARACTERS[sceneData.who]
      ? CHARACTERS[sceneData.who].theme
      : "";

  const bgClass =
    sceneData?.bg && BACKGROUNDS[sceneData.bg]
      ? BACKGROUNDS[sceneData.bg]
      : "";

  // Narration: speak scene text when scene changes
  useEffect(() => {
    stop();
    if (on && sceneData?.text) {
      const fullText = sceneData.subtitle
        ? `${sceneData.subtitle}. ${sceneData.text}`
        : sceneData.text;
      speak(fullText);
    }
  }, [scene]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sound: page flip on scene transition
  useEffect(() => {
    if (scene && scene !== "results") {
      play("pageFlip");
    }
  }, [scene]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sound: chapter complete when ch changes
  useEffect(() => {
    if (sceneData?.ch != null && prevChRef.current != null && sceneData.ch !== prevChRef.current) {
      play("chapterComplete");
    }
    prevChRef.current = sceneData?.ch ?? null;
  }, [sceneData?.ch]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-scroll choices into view
  useEffect(() => {
    if (choicesRef.current) {
      const timer = setTimeout(() => {
        choicesRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [scene]);

  const handleFinishOnboarding = useCallback(() => {
    localStorage.setItem("joseph-cyoa-onboarded", "true");
    setOnboarded(true);
  }, []);

  const handlePick = useCallback(
    (choice) => {
      play("click");
      const target = SCENES[choice.next];
      if (target && target.alt) {
        play("wrong");
      } else {
        play("correct");
      }
      pick(choice);
    },
    [pick, play]
  );

  const handleMapToggle = useCallback(() => {
    setShowMap((prev) => !prev);
  }, []);

  // --- Onboarding gate ---
  if (!onboarded) {
    return <Onboarding onComplete={handleFinishOnboarding} />;
  }

  // --- Results screen ---
  if (scene === "results") {
    return (
      <ResultsScreen
        traits={traits}
        choices={choices}
        altExplored={altExplored}
        recoveries={recoveries}
        onRestart={restart}
      />
    );
  }

  if (!sceneData) return null;

  const { title, subtitle, text, quote, scripture, ill, alt, who } = sceneData;

  return (
    <div
      className={`game-container ${bgClass} ${characterTheme}`}
      style={{
        minHeight: "100vh",
        transition: "background 0.5s ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ProgressBar current={sceneData.ch || 0} total={9} />

      <Header
        character={who || null}
        isAlt={alt}
        traits={traits}
        narration={{ on, speaking, toggle }}
        onMapOpen={handleMapToggle}
        streak={streak}
      />

      {/* Overlays */}
      {showMap && (
        <JourneyMap
          currentChapter={sceneData.ch || 0}
          visited={visited}
          scenes={SCENES}
          onClose={handleMapToggle}
        />
      )}

      {traitPopup && (
        <TraitToast traits={traitPopup} onDone={() => setTraitPopup(null)} />
      )}

      {perspectiveSwitch && (
        <PerspectiveSwitch
          who={perspectiveSwitch}
          onDone={() => setPerspectiveSwitch(null)}
        />
      )}

      {/* Main content */}
      <main
        className={`scene-content ${fade ? "fade-in" : ""}`}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px 14px",
          maxWidth: 500,
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Illustration type={ill} isAlt={alt} />

        <h2
          className="scene-title"
          style={{
            fontFamily: "var(--font-display, serif)",
            color: alt
              ? "var(--color-alt-path, #c0392b)"
              : "var(--color-primary, #2c3e50)",
            fontSize: 20,
            textAlign: "center",
            margin: "12px 0 4px",
          }}
        >
          {title}
        </h2>

        {subtitle && (
          <div
            className="scene-subtitle"
            style={{
              fontSize: 12,
              textAlign: "center",
              color: "var(--color-muted, #888)",
              marginBottom: 8,
            }}
          >
            {subtitle}
          </div>
        )}

        <div
          className={`narrative-text ${alt ? "alt-path" : ""}`}
          style={{
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: 14,
            lineHeight: 1.7,
            whiteSpace: "pre-line",
            background: alt
              ? "var(--color-alt-surface, rgba(192,57,43,0.08))"
              : "var(--color-surface, rgba(255,255,255,0.85))",
            borderRadius: 12,
            padding: "14px 16px",
            border: alt
              ? "1px solid rgba(192,57,43,0.2)"
              : "1px solid var(--color-border, rgba(0,0,0,0.08))",
            marginBottom: 10,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {text}
        </div>

        {quote && (
          <div
            className="scene-quote"
            style={{
              fontStyle: "italic",
              color: "var(--color-gold, #b8860b)",
              textAlign: "center",
              fontSize: 14,
              margin: "6px 0 12px",
              padding: "0 10px",
            }}
          >
            {quote}
          </div>
        )}

        {/* Scripture card (inline) */}
        {scripture && (
          <ScriptureCard scripture={scripture} onContinue={pendingNext ? closeScripture : null} />
        )}

        {/* Choices */}
        <div
          className="choices-container"
          ref={choicesRef}
          style={{
            width: "100%",
            maxWidth: 450,
          }}
        >
          {shuffledChoices.map((ch, i) => (
            <ChoiceButton
              key={ch.next}
              label={String.fromCharCode(65 + i)}
              text={ch.text}
              isBack={ch.text.includes("\uD83D\uDD04")}
              onClick={() => handlePick(ch)}
            />
          ))}
        </div>
      </main>

      <footer
        className="game-footer"
        style={{
          textAlign: "center",
          fontSize: 10,
          color: "rgba(0,0,0,0.25)",
          padding: "10px 0 14px",
        }}
      >
        Genesis 37&ndash;41 &middot; Come, Follow Me 2026
      </footer>
    </div>
  );
}
