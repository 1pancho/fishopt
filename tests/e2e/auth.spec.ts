import { test, expect } from "@playwright/test";

test.describe("Страница входа (/login)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("страница загружается", async ({ page }) => {
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByRole("heading")).toBeVisible();
  });

  test("присутствуют поля email и пароль", async ({ page }) => {
    await expect(page.locator("input[type='email'], input[name='email']")).toBeVisible();
    await expect(page.locator("input[type='password']")).toBeVisible();
  });

  test("кнопка отправки формы присутствует", async ({ page }) => {
    await expect(page.getByRole("button", { name: /войти|вход|sign in/i })).toBeVisible();
  });

  test("ссылка на регистрацию присутствует", async ({ page }) => {
    const registerLink = page.getByRole("link", { name: /регистрац|зарегистрир/i });
    await expect(registerLink).toBeVisible();
    await registerLink.click();
    await expect(page).toHaveURL(/\/register/);
  });

  test("пустая форма — ошибки валидации", async ({ page }) => {
    await page.getByRole("button", { name: /войти|вход/i }).click();
    // браузерная или JS валидация должна сработать
    const emailInput = page.locator("input[type='email'], input[name='email']");
    const validationMsg = await emailInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
    expect(validationMsg.length).toBeGreaterThan(0);
  });

  test("неверные данные — сообщение об ошибке", async ({ page }) => {
    await page.locator("input[type='email'], input[name='email']").fill("wrong@example.com");
    await page.locator("input[type='password']").fill("wrongpassword");
    await page.getByRole("button", { name: /войти|вход/i }).click();
    // ждем ошибку (API вернет 401)
    await expect(
      page.getByText(/неверн|ошибка|invalid|error|не найден/i)
    ).toBeVisible({ timeout: 8_000 });
  });
});

test.describe("Страница регистрации (/register)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/register");
  });

  test("страница загружается", async ({ page }) => {
    await expect(page).toHaveURL(/\/register/);
    await expect(page.getByRole("heading")).toBeVisible();
  });

  test("присутствуют обязательные поля", async ({ page }) => {
    await expect(page.locator("input[type='email'], input[name='email']")).toBeVisible();
    await expect(page.locator("input[type='password']")).toBeVisible();
  });

  test("ссылка на вход присутствует", async ({ page }) => {
    const loginLink = page.getByRole("link", { name: /войти|вход|sign in/i });
    await expect(loginLink).toBeVisible();
    await loginLink.click();
    await expect(page).toHaveURL(/\/login/);
  });
});
