import { test, expect } from "@playwright/test";

test.describe("Главная страница", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("загружается с правильным title", async ({ page }) => {
    await expect(page).toHaveTitle(/Fishopt/);
  });

  test("хедер содержит логотип и навигацию", async ({ page }) => {
    const header = page.locator("header");
    await expect(header).toBeVisible();
    await expect(header.locator("img[alt='Fishopt']")).toBeVisible();
    await expect(header.getByRole("link", { name: "Компании" })).toBeVisible();
    await expect(header.getByRole("link", { name: "Прайс-листы" })).toBeVisible();
    await expect(header.getByRole("link", { name: "Новости" })).toBeVisible();
  });

  test("бегущая строка цен отображается", async ({ page }) => {
    // ticker bar is the first element after header
    const ticker = page.locator(".ticker-bar");
    await expect(ticker).toBeVisible();
    await expect(ticker).toContainText("₽/кг");
  });

  test("Hero секция содержит заголовок и поиск", async ({ page }) => {
    const hero = page.locator("section").first();
    await expect(hero).toBeVisible();
    await expect(hero.getByRole("heading", { level: 1 })).toContainText("Найдите поставщика");
    await expect(hero.getByRole("searchbox")).toBeVisible();
    await expect(hero.getByRole("button", { name: "Найти" })).toBeVisible();
  });

  test("Hero содержит статистику (4 блока)", async ({ page }) => {
    const stats = page.locator("section").first().locator(".backdrop-blur-sm.rounded-xl");
    await expect(stats).toHaveCount(4);
  });

  test("сетка категорий отображается", async ({ page }) => {
    await expect(page.getByText("Лосось и лососёвые")).toBeVisible();
  });

  test("секция последних компаний отображается", async ({ page }) => {
    await expect(page.getByText("Компании на Fishopt")).toBeVisible();
  });

  test("футер присутствует", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(footer).toContainText("Fishopt");
  });
});

test.describe("Мобильная версия — главная", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("мобильное меню открывается", async ({ page }) => {
    await page.goto("/");
    const burgerBtn = page.getByLabel("Открыть меню");
    await expect(burgerBtn).toBeVisible();
    await burgerBtn.click();
    await expect(page.getByRole("link", { name: "Компании" }).last()).toBeVisible();
  });

  test("Hero отображается корректно на мобиле", async ({ page }) => {
    await page.goto("/");
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    // проверяем что заголовок не обрезан
    const box = await h1.boundingBox();
    expect(box?.width).toBeGreaterThan(100);
  });
});
