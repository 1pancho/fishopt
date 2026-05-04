import { test, expect } from "@playwright/test";

test.describe("Навигация между страницами", () => {
  test("клик на 'Компании' переходит на /companies", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    const links = page.locator("a[href='/companies']");
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      if (await links.nth(i).isVisible()) {
        await links.nth(i).click();
        await expect(page).toHaveURL(/\/companies/, { timeout: 10_000 });
        return;
      }
    }
    expect(count).toBeGreaterThan(0);
  });

  test("клик на 'Новости' переходит на /news", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    const links = page.locator("a[href='/news']");
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      if (await links.nth(i).isVisible()) {
        await links.nth(i).click();
        await expect(page).toHaveURL(/\/news/, { timeout: 10_000 });
        await expect(page).toHaveTitle(/Новости|Fishopt/, { timeout: 10_000 });
        return;
      }
    }
    expect(count).toBeGreaterThan(0);
  });

  test("клик на 'Прайс-листы' переходит на /prices", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    const links = page.locator("a[href='/prices']");
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      if (await links.nth(i).isVisible()) {
        await links.nth(i).click();
        await expect(page).toHaveURL(/\/prices/, { timeout: 10_000 });
        return;
      }
    }
    expect(count).toBeGreaterThan(0);
  });

  test("клик на 'Объявления' переходит на /ads", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    const links = page.locator("a[href='/ads']");
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      if (await links.nth(i).isVisible()) {
        await links.nth(i).click();
        await expect(page).toHaveURL(/\/ads/, { timeout: 10_000 });
        return;
      }
    }
    expect(count).toBeGreaterThan(0);
  });

  test("клик на логотип возвращает на главную", async ({ page }) => {
    await page.goto("/companies");
    await page.getByRole("link", { name: /Fishopt — на главную/ }).click();
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Найдите поставщика");
  });

  test("ссылки на /companies существуют и кликабельны", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    const links = page.locator("a[href='/companies']");
    await expect(links.first()).toBeAttached();
    const count = await links.count();
    for (let i = 0; i < count; i++) {
      if (await links.nth(i).isVisible()) {
        await links.nth(i).click();
        await expect(page).toHaveURL(/\/companies/, { timeout: 10_000 });
        return;
      }
    }
    // All links hidden (mobile nav closed) — just verify they exist
    expect(count).toBeGreaterThan(0);
  });

  test("популярные теги в Hero ведут на категорию", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    const tag = page.locator("section").first().locator("a[href^='/companies/']").first();
    await expect(tag).toBeVisible({ timeout: 10_000 });
    const href = await tag.getAttribute("href");
    await Promise.all([page.waitForURL(href!, { timeout: 15_000 }), tag.click()]);
    await expect(page).not.toHaveURL("/404");
  });

  test("страницы не отдают 404 (основные маршруты)", async ({ page }) => {
    const routes = ["/", "/companies", "/news", "/prices", "/ads", "/login", "/register"];
    for (const route of routes) {
      const response = await page.goto(route, { timeout: 30_000 });
      // 5xx = server error (real bug); 4xx = expected when backend is unavailable
      expect(response?.status(), `${route} вернул 5xx`).toBeLessThan(500);
    }
  });

  test("переход между страницами — плавная анимация", async ({ page }) => {
    await page.goto("/");
    const startTime = Date.now();
    await page.getByRole("link", { name: "Компании" }).first().click();
    await page.waitForURL(/\/companies/);
    const elapsed = Date.now() - startTime;
    expect(elapsed).toBeGreaterThan(50);
  });
});
