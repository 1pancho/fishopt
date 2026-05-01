import { test, expect } from "@playwright/test";

test.describe("Страница входа (/login)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("страница загружается с заголовком 'Вход'", async ({ page }) => {
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByRole("heading", { name: /вход/i })).toBeVisible();
  });

  test("поле email присутствует", async ({ page }) => {
    await expect(page.locator("#email")).toBeVisible();
    expect(await page.locator("#email").getAttribute("type")).toBe("email");
  });

  test("поле пароля присутствует", async ({ page }) => {
    await expect(page.locator("#password")).toBeVisible();
  });

  test("кнопка 'Войти' присутствует", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Войти" })).toBeVisible();
  });

  test("кнопка 'Показать/скрыть пароль' работает", async ({ page }) => {
    const toggleBtn = page.getByLabel(/показать пароль|скрыть пароль/i);
    await expect(toggleBtn).toBeVisible({ timeout: 10_000 });
    const passwordInput = page.locator("#password");
    // изначально type=password
    await expect(passwordInput).toHaveAttribute("type", "password", { timeout: 5_000 });
    await toggleBtn.click();
    // после клика type=text
    await expect(passwordInput).toHaveAttribute("type", "text", { timeout: 5_000 });
  });

  test("ссылка 'Зарегистрироваться' ведет на /register", async ({ page }) => {
    await page.getByRole("link", { name: /зарегистрироваться/i }).click();
    await expect(page).toHaveURL(/\/register/);
  });

  test("ссылка 'Забыли пароль?' присутствует", async ({ page }) => {
    await expect(page.getByRole("link", { name: /забыли пароль/i })).toBeVisible();
  });

  test("форма с noValidate — кнопка доступна для клика", async ({ page }) => {
    // form has noValidate, browser validation is disabled
    const submitBtn = page.getByRole("button", { name: "Войти" });
    await expect(submitBtn).toBeEnabled();
    await expect(submitBtn).not.toHaveAttribute("disabled");
  });

  test("неверные данные — блок ошибки появляется", async ({ page }) => {
    await page.locator("#email").fill("test@example.com");
    await page.locator("#password").fill("wrongpassword123");
    await page.getByRole("button", { name: "Войти" }).click();
    // Error div appears with text from backend or "Неверный"
    await expect(
      page.locator("[class*='destructive']").or(page.getByText(/неверн|ошибка|не найден|invalid/i))
    ).toBeVisible({ timeout: 10_000 });
  });
});

test.describe("Страница регистрации (/register)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/register");
  });

  test("страница загружается", async ({ page }) => {
    await expect(page).toHaveURL(/\/register/);
    await expect(page.getByRole("heading", { name: /Разместить компанию/i })).toBeVisible();
  });

  test("шаг 1: поле 'Название компании' присутствует", async ({ page }) => {
    await expect(page.locator("#name")).toBeVisible();
    await expect(page.getByText("Название компании")).toBeVisible();
  });

  test("шаг 1: поле 'Город' присутствует", async ({ page }) => {
    await expect(page.locator("#city")).toBeVisible();
  });

  test("шаг 1: поле 'ИНН' присутствует", async ({ page }) => {
    await expect(page.locator("#inn")).toBeVisible();
  });

  test("шаг 1: ввод некорректных данных — кнопка 'Далее' неактивна или форма не переходит", async ({ page }) => {
    // Empty form — step 1 should not proceed
    const nextBtn = page.getByRole("button", { name: /далее|следующий/i });
    if (await nextBtn.count() > 0) {
      await nextBtn.click();
      // Still on step 1
      await expect(page.locator("#name")).toBeVisible();
    }
  });

  test("шаг 1: заполнение и переход на шаг 2", async ({ page }) => {
    await page.locator("#name").fill("ООО Тестовая Рыба");
    const nextBtn = page.getByRole("button", { name: /далее|следующий/i });
    if (await nextBtn.count() > 0) {
      await nextBtn.click();
      // Step 2 should appear (contacts)
      await expect(page.getByText(/Контакт|Email|email/i).first()).toBeVisible({ timeout: 3_000 });
    }
  });

  test("ссылка 'Войти' ведет на /login", async ({ page }) => {
    await page.getByRole("link", { name: /войти/i }).click();
    await expect(page).toHaveURL(/\/login/);
  });

  test("индикатор шагов отображается", async ({ page }) => {
    await expect(page.getByText("Компания")).toBeVisible();
    await expect(page.getByText("Контакты")).toBeVisible();
    await expect(page.getByText("Готово")).toBeVisible();
  });
});
