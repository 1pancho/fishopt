import { createStore, createEvent, createEffect, sample } from "effector";
import { apiRegister } from "@/shared/lib/api";
import { $token } from "@/features/auth/model/auth";

export type RegistrationStep = 1 | 2 | 3;

export type RegistrationData = {
  // Step 1 — Company info
  name: string;
  inn: string;
  region: string;
  city: string;
  activityTypes: string[];
  categories: string[];
  // Step 2 — Contacts
  phone: string;
  email: string;
  website: string;
  description: string;
};

// Events
export const stepChanged = createEvent<RegistrationStep>();
export const fieldChanged = createEvent<{ field: keyof RegistrationData; value: string }>();
export const multiFieldToggled = createEvent<{ field: "activityTypes" | "categories"; value: string }>();
export const step1Submitted = createEvent();
export const step2Submitted = createEvent();
export const formReset = createEvent();

// Effects
export const submitRegistrationFx = createEffect(async (data: RegistrationData) => {
  const result = await apiRegister({
    name: data.name,
    email: data.email,
    password: data.phone, // временно используем phone как пароль — TODO: добавить поле пароля в форму
    region: data.region,
    inn: data.inn || undefined,
    city: data.city || undefined,
    activityTypes: data.activityTypes,
    categories: data.categories,
    phone: data.phone || undefined,
    website: data.website || undefined,
    description: data.description || undefined,
  });
  return { token: result.access_token };
});

// Stores
export const $step = createStore<RegistrationStep>(1)
  .on(stepChanged, (_, step) => step)
  .reset(formReset);

export const $data = createStore<RegistrationData>({
  name: "",
  inn: "",
  region: "",
  city: "",
  activityTypes: [],
  categories: [],
  phone: "",
  email: "",
  website: "",
  description: "",
})
  .on(fieldChanged, (state, { field, value }) => ({ ...state, [field]: value }))
  .on(multiFieldToggled, (state, { field, value }) => {
    const arr = state[field] as string[];
    return {
      ...state,
      [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
    };
  })
  .reset(formReset);

export const $isSubmitting = submitRegistrationFx.pending;

export const $step1Valid = $data.map(
  (d) => d.name.trim().length >= 2 && d.region.length > 0 && d.activityTypes.length > 0
);

export const $step2Valid = $data.map(
  (d) => d.email.includes("@") && d.phone.trim().length >= 10
);

// Logic: submit step 1 → go to step 2
sample({
  clock: step1Submitted,
  source: $step1Valid,
  filter: (valid) => valid,
  fn: () => 2 as RegistrationStep,
  target: stepChanged,
});

// Logic: submit step 2 → call API
sample({
  clock: step2Submitted,
  source: { valid: $step2Valid, data: $data },
  filter: ({ valid }) => valid,
  fn: ({ data }) => data,
  target: submitRegistrationFx,
});

// Logic: API success → step 3 + save token
sample({
  clock: submitRegistrationFx.doneData,
  fn: ({ token }) => token,
  target: $token,
});

sample({
  clock: submitRegistrationFx.done,
  fn: () => 3 as RegistrationStep,
  target: stepChanged,
});
