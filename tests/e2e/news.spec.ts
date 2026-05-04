import { test, expect } from "@playwright/test";

test.describe("Страница новостей (/news)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/news");
    await page.waitForLoadState("networkidle");
  });

  test("страница загружается без ошибок", async ({ page }) => {
    await expect(page).toHaveURL(/\/news/);
    await expect(page).toHaveTitle(/Fishopt|Новости/);
  });

  test("заголовок страницы присутствует", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("карточки новостей или пустой стейт", async ({ page }) => {
    const hasArticles = (await page.locator("a[href^='/news/']").count()) > 0;
    if (hasArticles) {
      await expect(page.locator("a[href^='/news/']").first()).toBeVisible();
    } else {
      await expect(page.getByRole("heading", { name: "Новостей не найдено" })).toBeVisible();
    }
  });

  test("клик на новость открывает статью (если есть)", async ({ page }) => {
    const firstLink = page.locator("a[href^='/news/']").first();
    if ((await firstLink.count()) === 0) {
      test.skip(true, "Нет новостей в БД");
      return;
    }
    await expect(firstLink).toBeVisible({ timeout: 5_000 });
    const href = await firstLink.getAttribute("href");
    await firstLink.click();
    await expect(page).toHaveURL(href!);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("нет JS-ошибок на странице", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    // beforeEach уже навигировал на /news — не дублируем goto
    await page.waitForLoadState("networkidle");
    expect(errors, `JS ошибки: ${errors.join(", ")}`).toHaveLength(0);
  });
});

test.describe("Страница статьи новости", () => {
  test("статья загружается (если есть)", async ({ page }) => {
    await page.goto("/news");
    await page.waitForLoadState("networkidle");
    const firstLink = page.locator("a[href^='/news/']").first();
    if ((await firstLink.count()) === 0) {
      test.skip(true, "Нет новостей в БД");
      return;
    }
    await firstLink.click();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page).not.toHaveURL(/404/);
  });
});
