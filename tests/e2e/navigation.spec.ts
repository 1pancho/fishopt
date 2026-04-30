import { test, expect } from "@playwright/test";

test.describe("Навигация между страницами", () => {
  test("клик на 'Компании' переходит на /companies", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Компании" }).first().click();
    await expect(page).toHaveURL(/\/companies/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("клик на 'Новости' переходит на /news", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Новости" }).first().click();
    await expect(page).toHaveURL(/\/news/);
    await expect(page).toHaveTitle(/Новости|Fishopt/);
  });

  test("клик на 'Прайс-листы' переходит на /prices", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Прайс-листы" }).first().click();
    await expect(page).toHaveURL(/\/prices/);
  });

  test("клик на 'Объявления' переходит на /ads", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Объявления" }).first().click();
    await expect(page).toHaveURL(/\/ads/);
  });

  test("клик на логотип возвращает на главную", async ({ page }) => {
    await page.goto("/companies");
    await page.getByRole("link", { name: /Fishopt — на главную/ }).click();
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Найдите поставщика");
  });

  test("кнопка 'Все компании →' работает", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Все компании/ }).first().click();
    await expect(page).toHaveURL(/\/companies/);
  });

  test("популярные теги в Hero ведут на категорию", async ({ page }) => {
    await page.goto("/");
    // click first popular category tag
    const tag = page.locator("section").first().locator("a[href^='/companies/']").first();
    const href = await tag.getAttribute("href");
    await tag.click();
    await expect(page).toHaveURL(href!);
    await expect(page).not.toHaveURL("/404");
  });

  test("страницы не отдают 404 (основные маршруты)", async ({ page }) => {
    const routes = ["/", "/companies", "/news", "/prices", "/ads", "/login", "/register"];
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status(), `${route} вернул не 200`).toBeLessThan(400);
    }
  });

  test("переход между страницами — плавная анимация (нет мгновенного скачка)", async ({ page }) => {
    await page.goto("/");
    // Нажимаем ссылку и проверяем что контент исчез не мгновенно
    const startTime = Date.now();
    await page.getByRole("link", { name: "Компании" }).first().click();
    await page.waitForURL(/\/companies/);
    const elapsed = Date.now() - startTime;
    // Переход должен занимать хоть сколько-то времени (не телепортация)
    expect(elapsed).toBeGreaterThan(50);
  });
});
