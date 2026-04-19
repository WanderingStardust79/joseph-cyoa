import { useState, useCallback, useRef } from "react";

const EMOJI_REGEX =
  /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{27BF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/gu;

const SPECIAL_CHARS = /[✦✓⚠️🔄⚔️📖🙏🛡️👑🧥✨🏜️⚖️🍷👤]/g;

function cleanText(text) {
  return text
    .replace(EMOJI_REGEX, "")
    .replace(SPECIAL_CHARS, "")
    .replace(/\n/g, ". ")
    .replace(/—/g, ", ")
    .replace(/\.\.\./g, ".")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function pickVoice() {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  const english = voices.filter(
    (v) => v.lang.startsWith("en-") || v.lang === "en"
  );
  // Prefer a natural / enhanced voice, then any English, then first available
  const preferred = english.find(
    (v) =>
      v.name.toLowerCase().includes("natural") ||
      v.name.toLowerCase().includes("enhanced") ||
      v.name.toLowerCase().includes("google")
  );
  return preferred || english[0] || voices[0] || null;
}

export default function useNarration() {
  const [on, setOn] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const synthRef = useRef(
    typeof window !== "undefined" ? window.speechSynthesis : null
  );

  const speak = useCallback(
    (text) => {
      if (typeof window === "undefined" || !synthRef.current || !on) return;
      synthRef.current.cancel();
      const cleaned = cleanText(text);
      if (!cleaned) return;

      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.rate = 0.92;
      utterance.pitch = 1.05;

      const voice = pickVoice();
      if (voice) utterance.voice = voice;

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);

      synthRef.current.speak(utterance);
    },
    [on]
  );

  const stop = useCallback(() => {
    if (typeof window === "undefined" || !synthRef.current) return;
    synthRef.current.cancel();
    setSpeaking(false);
  }, []);

  const toggle = useCallback(() => {
    setOn((prev) => {
      if (prev) {
        // Turning off — stop any current speech
        if (synthRef.current) {
          synthRef.current.cancel();
        }
        setSpeaking(false);
      }
      return !prev;
    });
  }, []);

  return { on, speaking, speak, stop, toggle };
}
