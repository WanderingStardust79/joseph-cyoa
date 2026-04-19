import chapter1 from "./chapters/chapter1";
import chapter2 from "./chapters/chapter2";
import chapter3 from "./chapters/chapter3";
import chapter4 from "./chapters/chapter4";
import chapter5 from "./chapters/chapter5";
import chapter6 from "./chapters/chapter6";
import chapter7 from "./chapters/chapter7";
import chapter8 from "./chapters/chapter8";
import chapter9 from "./chapters/chapter9";

const intro = {
  intro: {
    title: "The Lord Was with Joseph",
    subtitle: "A Choose Your Own Adventure · Genesis 37–41",
    text: "You're about to live one of the greatest stories ever told — as FIVE different characters.\n\nYour choices shape the story. Some follow what really happened. Others show what COULD have happened.",
    quote: "\"The Lord was with Joseph.\" — Genesis 39:2",
    choices: [{ text: "Begin the Journey", next: "c1" }],
    bg: "intro", ill: "stars", ch: 0,
    emotion: "hopeful",
    transition: "scroll",
    points: 0,
  },
};

const results = {
  results: {
    title: "Journey Complete",
    text: "RESULTS",
    choices: [],
    bg: "intro", ill: "stars", ch: 10,
    emotion: "happy",
    transition: "scroll",
    points: 0,
  },
};

const scenes = {
  ...intro,
  ...chapter1,
  ...chapter2,
  ...chapter3,
  ...chapter4,
  ...chapter5,
  ...chapter6,
  ...chapter7,
  ...chapter8,
  ...chapter9,
  ...results,
};

export { scenes as SCENES };
export default scenes;
