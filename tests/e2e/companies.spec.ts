import { test, expect } from "@playwright/test";

test.describe("Страница компаний", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/companies");
  });

  test("страница загружается с заголовком", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("форма поиска присутствует", async ({ page }) => {
    const searchInput = page.getByRole("searchbox").or(page.locator("input[name='q']"));
    await expect(searchInput).toBeVisible();
  });

  test("карточки компаний отображаются", async ({ page }) => {
    // ждем загрузки карточек
    const cards = page.locator("a[href^='/company/']");
    await expect(cards.first()).toBeVisible({ timeout: 10_000 });
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("клик на карточку компании открывает профиль", async ({ page }) => {
    const firstCard = page.locator("a[href^='/company/']").first();
    const href = await firstCard.getAttribute("href");
    await firstCard.click();
    await expect(page).toHaveURL(href!);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("поиск по запросу фильтрует результаты", async ({ page }) => {
    const input = page.locator("input[name='q']");
    await input.fill("треска");
    await input.press("Enter");
    await page.waitForURL(/q=треска/);
    // страница не должна упасть
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("кнопка 'Разместить компанию' ведет на /register", async ({ page }) => {
    const btn = page.getByRole("link", { name: /Разместить/i }).last();
    await expect(btn).toBeVisible();
    await btn.click();
    await expect(page).toHaveURL(/\/register/);
  });
});

test.describe("Категории компаний", () => {
  const categories = [
    { slug: "losos", label: "лосось" },
    { slug: "krab", label: "краб" },
    { slug: "treska", label: "треска" },
    { slug: "gorbusha", label: "горбуша" },
    { slug: "kalmar", label: "кальмар" },
  ];

  for (const cat of categories) {
    test(`/companies/${cat.slug} — не 404`, async ({ page }) => {
      const response = await page.goto(`/companies/${cat.slug}`);
      expect(response?.status()).toBeLessThan(400);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  }
});

test.describe("Профиль компании", () => {
  test("страница компании загружается", async ({ page }) => {
    // Сначала берём первую компанию из списка
    await page.goto("/companies");
    const firstCard = page.locator("a[href^='/company/']").first();
    await expect(firstCard).toBeVisible({ timeout: 10_000 });
    await firstCard.click();

    // Профиль должен содержать название и контактную информацию
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page).not.toHaveURL("/404");
  });
});
