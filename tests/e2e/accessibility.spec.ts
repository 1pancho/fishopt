import { test, expect } from "@playwright/test";

const PAGES = ["/", "/companies", "/news", "/login", "/register"];

test.describe("Доступность (a11y)", () => {
  for (const url of PAGES) {
    test(`${url} — изображения имеют alt-текст`, async ({ page }) => {
      await page.goto(url);
      const images = page.locator("img:not([role='presentation'])");
      const count = await images.count();
      for (let i = 0; i < count; i++) {
        const alt = await images.nth(i).getAttribute("alt");
        expect(alt, `img #${i} на ${url} не имеет alt`).not.toBeNull();
      }
    });

    test(`${url} — кнопки имеют доступное имя`, async ({ page }) => {
      await page.goto(url);
      const buttons = page.locator("button:not([aria-hidden='true'])");
      const count = await buttons.count();
      for (let i = 0; i < count; i++) {
        const btn = buttons.nth(i);
        const text = await btn.innerText();
        const ariaLabel = await btn.getAttribute("aria-label");
        expect(
          text.trim().length > 0 || (ariaLabel && ariaLabel.length > 0),
          `Кнопка #${i} на ${url} не имеет текста или aria-label`
        ).toBe(true);
      }
    });
  }

  test("главная — lang='ru' на html", async ({ page }) => {
    await page.goto("/");
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe("ru");
  });

  test("главная — h1 ровно один", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);
  });

  test("главная — нет JS-ошибок при загрузке", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors, `JS ошибки: ${errors.join(", ")}`).toHaveLength(0);
  });

  test("мета-description присутствует на главной", async ({ page }) => {
    await page.goto("/");
    const desc = page.locator("meta[name='description']");
    const content = await desc.getAttribute("content");
    expect(content?.length).toBeGreaterThan(10);
  });
});

test.describe("Производительность и стабильность", () => {
  test("главная загружается за < 5 секунд", async ({ page }) => {
    const start = Date.now();
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    const elapsed = Date.now() - start;
    expect(elapsed, `Загрузка заняла ${elapsed}ms`).toBeLessThan(5_000);
  });

  test("страница компаний не падает при пустом поиске", async ({ page }) => {
    await page.goto("/companies?q=");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("несуществующая компания — нет 500 ошибки", async ({ page }) => {
    const response = await page.goto("/company/not-existing-slug-xyz");
    expect(response?.status()).not.toBe(500);
  });
});
