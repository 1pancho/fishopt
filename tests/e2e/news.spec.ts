import { test, expect } from "@playwright/test";

test.describe("Страница новостей (/news)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/news");
  });

  test("страница загружается без ошибок", async ({ page }) => {
    await expect(page).toHaveURL(/\/news/);
    await expect(page).toHaveTitle(/Fishopt|Новости/);
  });

  test("заголовок страницы присутствует", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("карточки новостей отображаются", async ({ page }) => {
    const articles = page.locator("article, [class*='news'], a[href^='/news/']");
    await expect(articles.first()).toBeVisible({ timeout: 8_000 });
  });

  test("клик на новость открывает статью", async ({ page }) => {
    const firstLink = page.locator("a[href^='/news/']").first();
    await expect(firstLink).toBeVisible({ timeout: 8_000 });
    const href = await firstLink.getAttribute("href");
    await firstLink.click();
    await expect(page).toHaveURL(href!);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("нет JS-ошибок на странице", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/news");
    await page.waitForLoadState("networkidle");
    expect(errors, `JS ошибки: ${errors.join(", ")}`).toHaveLength(0);
  });
});

test.describe("Страница статьи новости", () => {
  test("статья загружается", async ({ page }) => {
    await page.goto("/news");
    const firstLink = page.locator("a[href^='/news/']").first();
    await expect(firstLink).toBeVisible({ timeout: 8_000 });
    await firstLink.click();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page).not.toHaveURL(/404/);
  });
});
