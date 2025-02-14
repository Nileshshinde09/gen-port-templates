import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type authPageType = "otp" | "login" | "register";
interface ThemeState {
  theme: string;
  storageKey: string;
  currentTheme: string;
  UIThemes: {
    globe: boolean;
    particles: boolean;
    astronaut: boolean;
  };
  scrollState: number;
  isNavBody: boolean;
  isNavVisible: boolean;
  currentAuthPage: authPageType;
}

const initialState: ThemeState = {
  theme: "dark",
  storageKey: "next-ui-theme",
  currentTheme: "",
  UIThemes: {
    globe: true,
    particles: true,
    astronaut: true,
  },
  scrollState: 0,
  isNavBody: false,
  isNavVisible: false,
  currentAuthPage: "login",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    initializeTheme: (state) => {
      if (typeof window !== "undefined") {
        const storedTheme = localStorage.getItem(state.storageKey) || "system";
        state.theme = storedTheme;

        const root = window.document.documentElement;
        root.classList.remove("light", "dark");

        if (storedTheme === "system") {
          const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "dark"
            : "light";
          state.currentTheme = systemTheme;
          root.classList.add(systemTheme);
        } else {
          root.classList.add(storedTheme);
        }
      }
    },
    setTheme: (state, action: PayloadAction<string | undefined>) => {
      if (typeof window !== "undefined") {
        state.theme =
          action.payload ||
          localStorage.getItem(state.storageKey) ||
          state.theme;

        const root = window.document.documentElement;
        root.classList.remove("light", "dark");

        if (state.theme === "system") {
          const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "dark"
            : "light";
          state.currentTheme = systemTheme;
          root.classList.add(systemTheme);
        } else {
          root.classList.add(state.theme);
        }

        localStorage.setItem(state.storageKey, state.theme);
      }
    },
    upUITheme: (state) => {
      state.UIThemes.globe = true;
      state.UIThemes.particles = true;
      state.UIThemes.astronaut = true;
    },
    downUITheme: (state) => {
      state.UIThemes.globe = false;
      state.UIThemes.particles = false;
      state.UIThemes.astronaut = false;
    },

    changeScrollState: (state, action: PayloadAction<number>) => {
      state.scrollState = action.payload;
      if (state.scrollState > 5) {
        state.isNavBody = true;
      } else {
        state.isNavBody = false;
      }
    },
    NavUp: (state) => {
      state.isNavVisible = true;
    },
    NavDown: (state) => {
      state.isNavVisible = false;
    },
    setAuthPage: (state, action: PayloadAction<authPageType>) => {
      state.currentAuthPage = action.payload;
    },
  },
});

export const {
  initializeTheme,
  setTheme,
  upUITheme,
  downUITheme,
  changeScrollState,
  NavUp,
  NavDown,
  setAuthPage
} = themeSlice.actions;

export default themeSlice.reducer;
