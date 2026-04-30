import { createStore, createEvent, createEffect, sample } from "effector";
import { apiLogin } from "@/shared/lib/api";

export type AuthUser = {
  id: string;
  email: string;
  companyName: string;
  companySlug: string;
};

export type LoginData = {
  email: string;
  password: string;
};

// Events
export const emailChanged = createEvent<string>();
export const passwordChanged = createEvent<string>();
export const loginSubmitted = createEvent();
export const loggedOut = createEvent();
export const tokenRestored = createEvent<string>();

// Effects
export const loginFx = createEffect(async (data: LoginData): Promise<{ token: string }> => {
  const result = await apiLogin(data.email, data.password);
  return { token: result.access_token };
});

// Stores
export const $email = createStore("").on(emailChanged, (_, v) => v);
export const $password = createStore("").on(passwordChanged, (_, v) => v);

export const $token = createStore<string | null>(null)
  .on(loginFx.doneData, (_, { token }) => token)
  .on(tokenRestored, (_, token) => token)
  .on(loggedOut, () => null);

export const $loginError = createStore<string | null>(null)
  .on(loginFx.failData, (_, err) => err.message)
  .on(loginSubmitted, () => null);

export const $isLoading = loginFx.pending;
export const $isLoggedIn = $token.map((t) => t !== null);

// Persist token in localStorage (client-side only)
if (typeof window !== "undefined") {
  $token.watch((token) => {
    if (token) localStorage.setItem("fishopt_token", token);
    else localStorage.removeItem("fishopt_token");
  });
}

// Login on submit
sample({
  clock: loginSubmitted,
  source: { email: $email, password: $password },
  target: loginFx,
});
