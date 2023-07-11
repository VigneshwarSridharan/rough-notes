import { atom } from "jotai";
import { THEME } from "../contacts";

const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

const appThemeAtom = atom(darkThemeMq.matches ? THEME.dark : THEME.light);

export default appThemeAtom;
