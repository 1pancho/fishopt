import { test, expect } from "@playwright/test";

test.describe("Главная страница", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("загружается с правильным title", async ({ page }) => {
    await expect(page).toHaveTitle(/Fishopt/);
  });

  test("хедер — логотип присутствует", async ({ page }) => {
    await expect(page.locator("header img[alt='Fishopt']")).toBeVisible();
  });

  test("хедер — десктоп навигация (hidden md:flex)", async ({ page }) => {
    // Ждём гидрации клиентского Header
    await page.waitForLoadState("domcontentloaded");
    const nav = page.locator("nav[aria-label='Основная навигация']");
    await expect(nav).toBeAttached({ timeout: 10_000 });
    const count = await nav.locator("a").count();
    expect(count, "Десктоп nav должен содержать ссылки").toBeGreaterThan(0);
  });

  test("бегущая строка цен отображается", async ({ page }) => {
    const ticker = page.locator(".ticker-bar");
    await expect(ticker).toBeVisible();
    await expect(ticker).toContainText("₽/кг");
  });

  test("Hero — заголовок содержит 'Найдите поставщика'", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Найдите поставщика");
  });

  test("Hero — поисковая строка видна", async ({ page }) => {
    const hero = page.locator("section").first();
    await expect(hero.getByRole("button", { name: "Найти" })).toBeVisible();
    await expect(hero.locator("input[type='search']")).toBeVisible();
  });

  test("Hero — 4 блока статистики", async ({ page }) => {
    // Use exact: true to avoid matching substrings in other elements
    await expect(page.getByText("компаний", { exact: true })).toBeVisible({ timeout: 5_000 });
    await expect(page.getByText("регионов России", { exact: true })).toBeVisible({ timeout: 5_000 });
    await expect(page.getByText("видов продукции", { exact: true })).toBeVisible({ timeout: 5_000 });
    await expect(page.getByText("обновляем прайсы", { exact: true })).toBeVisible({ timeout: 5_000 });
  });

  test("Hero — популярные теги отображаются", async ({ page }) => {
    await expect(page.getByText("Популярно:")).toBeVisible();
    // At least one category tag link
    const tagLinks = page.locator("section").first().locator("a[href^='/companies/']");
    await expect(tagLinks.first()).toBeVisible();
  });

  test("секция категорий отображается с заголовком", async ({ page }) => {
    // CategoriesGrid heading
    await expect(page.getByText("Виды продукции")).toBeVisible();
  });

  test("секция 'Компании на Fishopt' отображается", async ({ page }) => {
    await expect(page.getByText("Компании на Fishopt")).toBeVisible();
  });

  test("секция 'Почему выбирают Fishopt' отображается", async ({ page }) => {
    await expect(page.getByText("Почему выбирают Fishopt")).toBeVisible();
  });

  test("футер присутствует с названием сайта", async ({ page }) => {
    await expect(page.locator("footer")).toBeVisible();
    await expect(page.locator("footer")).toContainText("Fishopt");
  });
});

test.describe("Мобильная версия — главная", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("гамбургер-кнопка видна на мобиле", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByLabel("Открыть меню")).toBeVisible();
  });

  test("мобильное меню открывается и содержит навигацию", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    const btn = page.getByLabel("Открыть меню");
    await expect(btn).toBeVisible({ timeout: 20_000 });
    await btn.click();
    const mobileNav = page.locator("nav[aria-label='Мобильная навигация']");
    await expect(mobileNav).toBeVisible({ timeout: 15_000 });
    await expect(mobileNav.getByRole("link", { name: "Компании" })).toBeVisible({ timeout: 10_000 });
  });

  test("заголовок Hero не обрезан на мобиле", async ({ page }) => {
    await page.goto("/");
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    const box = await h1.boundingBox();
    expect(box?.width).toBeGreaterThan(200);
  });

  test("поисковая строка видна на мобиле", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("input[type='search']").first()).toBeVisible({ timeout: 10_000 });
  });
});
