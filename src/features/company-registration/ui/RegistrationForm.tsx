"use client";

import { useUnit } from "effector-react";
import { FISH_CATEGORIES, REGIONS } from "@/shared/config/site";
import {
  $step,
  $data,
  $step1Valid,
  $step2Valid,
  $isSubmitting,
  fieldChanged,
  multiFieldToggled,
  step1Submitted,
  step2Submitted,
  stepChanged,
} from "../model/registration";

const ACTIVITY_OPTIONS = [
  { value: "wholesale", label: "Оптовая торговля" },
  { value: "processing", label: "Переработка рыбы" },
  { value: "fishing", label: "Промышленное рыболовство" },
  { value: "aquaculture", label: "Аквакультура / рыбоводство" },
  { value: "logistics", label: "Логистика / хранение" },
  { value: "retail", label: "Розничная торговля" },
];

function StepIndicator({ current }: { current: number }) {
  const steps = [
    { n: 1, label: "Компания" },
    { n: 2, label: "Контакты" },
    { n: 3, label: "Готово" },
  ];
  return (
    <div className="flex items-center justify-center gap-0 mb-8 px-8 pt-8">
      {steps.map((step, i) => (
        <div key={step.n} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                step.n < current
                  ? "bg-primary text-white"
                  : step.n === current
                  ? "bg-primary text-white ring-4 ring-primary/20"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {step.n < current ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                step.n
              )}
            </div>
            <span className={`text-xs mt-1 font-medium ${step.n === current ? "text-primary" : "text-muted-foreground"}`}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-16 h-0.5 mx-2 mb-4 transition-colors ${step.n < current ? "bg-primary" : "bg-border"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function Step1() {
  const [data, isValid] = useUnit([$data, $step1Valid]);

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); step1Submitted(); }}
      className="px-8 pb-8 flex flex-col gap-5"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
          Название компании <span className="text-destructive">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={data.name}
          onChange={(e) => fieldChanged({ field: "name", value: e.target.value })}
          placeholder="ООО «Рыбпром»"
          className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-colors"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="inn" className="block text-sm font-medium text-foreground mb-1.5">
            ИНН
          </label>
          <input
            id="inn"
            type="text"
            value={data.inn}
            onChange={(e) => fieldChanged({ field: "inn", value: e.target.value.replace(/\D/g, "").slice(0, 12) })}
            placeholder="1234567890"
            className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-colors font-mono"
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-foreground mb-1.5">
            Город
          </label>
          <input
            id="city"
            type="text"
            value={data.city}
            onChange={(e) => fieldChanged({ field: "city", value: e.target.value })}
            placeholder="Владивосток"
            className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="region" className="block text-sm font-medium text-foreground mb-1.5">
          Регион <span className="text-destructive">*</span>
        </label>
        <select
          id="region"
          value={data.region}
          onChange={(e) => fieldChanged({ field: "region", value: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm bg-white transition-colors"
          required
        >
          <option value="">Выберите регион</option>
          {REGIONS.map((r) => (
            <option key={r.slug} value={r.slug}>{r.label}</option>
          ))}
          <option value="other">Другой регион</option>
        </select>
      </div>

      <div>
        <p className="text-sm font-medium text-foreground mb-2">
          Вид деятельности <span className="text-destructive">*</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ACTIVITY_OPTIONS.map((opt) => {
            const checked = data.activityTypes.includes(opt.value);
            return (
              <label
                key={opt.value}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${
                  checked ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => multiFieldToggled({ field: "activityTypes", value: opt.value })}
                  className="accent-primary w-4 h-4"
                />
                <span className="text-sm font-medium text-foreground">{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-foreground mb-2">Виды продукции</p>
        <div className="flex flex-wrap gap-2">
          {FISH_CATEGORIES.map((cat) => {
            const checked = data.categories.includes(cat.label);
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => multiFieldToggled({ field: "categories", value: cat.label })}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
                  checked
                    ? "border-primary bg-primary text-white"
                    : "border-border hover:border-primary/40 text-foreground/70"
                }`}
              >
                <span aria-hidden="true">{cat.icon}</span>
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="w-full py-3.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors mt-2"
      >
        Продолжить →
      </button>
    </form>
  );
}

function Step2() {
  const [data, isValid, isSubmitting] = useUnit([$data, $step2Valid, $isSubmitting]);

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); step2Submitted(); }}
      className="px-8 pb-8 flex flex-col gap-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
            Телефон <span className="text-destructive">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => fieldChanged({ field: "phone", value: e.target.value })}
            placeholder="+7 (xxx) xxx-xx-xx"
            autoComplete="tel"
            className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-colors"
            required
          />
        </div>
        <div>
          <label htmlFor="reg-email" className="block text-sm font-medium text-foreground mb-1.5">
            Email <span className="text-destructive">*</span>
          </label>
          <input
            id="reg-email"
            type="email"
            value={data.email}
            onChange={(e) => fieldChanged({ field: "email", value: e.target.value })}
            placeholder="company@example.ru"
            autoComplete="email"
            className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-colors"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="website" className="block text-sm font-medium text-foreground mb-1.5">
          Сайт компании
        </label>
        <input
          id="website"
          type="url"
          value={data.website}
          onChange={(e) => fieldChanged({ field: "website", value: e.target.value })}
          placeholder="https://example.ru"
          className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-colors"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1.5">
          Описание компании
        </label>
        <textarea
          id="description"
          value={data.description}
          onChange={(e) => fieldChanged({ field: "description", value: e.target.value })}
          placeholder="Чем занимается ваша компания, какую продукцию предлагаете..."
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm resize-none transition-colors"
        />
        <p className="text-xs text-muted-foreground mt-1">
          {data.description.length}/500 символов
        </p>
      </div>

      <div className="rounded-xl bg-muted/50 border border-border p-4 text-sm text-muted-foreground">
        Нажимая «Зарегистрироваться», вы соглашаетесь с{" "}
        <a href="/terms" className="text-primary hover:text-primary/80">Условиями использования</a>{" "}
        и{" "}
        <a href="/privacy" className="text-primary hover:text-primary/80">Политикой конфиденциальности</a>.
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => stepChanged(1)}
          className="px-5 py-3 rounded-xl border border-border text-sm font-medium hover:bg-secondary transition-colors"
        >
          ← Назад
        </button>
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="flex-1 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Регистрация...
            </>
          ) : (
            "Зарегистрироваться"
          )}
        </button>
      </div>
    </form>
  );
}

function Step3() {
  const data = useUnit($data);
  return (
    <div className="px-8 pb-10 text-center flex flex-col items-center">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">
        Добро пожаловать, {data.name}!
      </h2>
      <p className="text-muted-foreground mb-2">
        Ваша заявка принята. Ссылка для входа отправлена на{" "}
        <span className="font-medium text-foreground">{data.email}</span>
      </p>
      <p className="text-sm text-muted-foreground mb-8 max-w-sm">
        Пока проверяете почту — изучите как загружать прайс-листы и добавлять объявления.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
        <a
          href="/dashboard"
          className="flex-1 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors text-center"
        >
          Личный кабинет
        </a>
        <a
          href="/"
          className="flex-1 py-3 rounded-xl border border-border font-medium hover:bg-secondary transition-colors text-center"
        >
          На главную
        </a>
      </div>
    </div>
  );
}

export function RegistrationForm() {
  const step = useUnit($step);

  return (
    <div>
      <StepIndicator current={step} />
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
    </div>
  );
}
