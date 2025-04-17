import test, { expect } from "@playwright/test";

test.describe("[SMOKE] [Login-form] Register form", () => {
  const BASE_URL = "https://anatoly-karpovich.github.io";
  const LOGIN_URL = "/demo-login-form";

  const selectors = {
    username: "#userNameOnRegister",
    password: "#passwordOnRegister",
    registerBtn: "#register",
    registerTab: "#registerOnLogin",
    message: "#errorMessageOnRegister",
  };

  const validData = {
    username: "ValidUser",
    password: "Password123!",
    minUser: "Usr",
    minPass: "Passw0rd",
    maxUser: "ThisIsAValidUsernameWith40Characters",
    maxPass: "ThisIsAValidPasswordWith20CharacteR1",
  };

  const invalidData = {
    shortUser: "Us",
    spacesOnly: "     ",
  };

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL + LOGIN_URL);
    await page.locator(selectors.registerTab).click();
  });

  //Позитивные кейсы
  test.describe("Positive cases", () => {
    const successText =
      "Successfully registered! Please, click Back to return on login page";
    test("Register with valid data", async ({ page }) => {
      await page.locator(selectors.username).fill(validData.username);
      await page.locator(selectors.password).fill(validData.password);
      await page.locator(selectors.registerBtn).click();

      await expect(page.locator(selectors.message)).toHaveText(successText);
    });

    test("Register with min allowed length", async ({ page }) => {
      await page.locator(selectors.username).fill(validData.minUser);
      await page.locator(selectors.password).fill(validData.minPass);
      await page.locator(selectors.registerBtn).click();

      await expect(page.locator(selectors.message)).toHaveText(successText);
    });

    test("Register with max allowed length", async ({ page }) => {
      await page.locator(selectors.username).fill(validData.maxUser);
      await page.locator(selectors.password).fill(validData.maxPass);
      await page.locator(selectors.registerBtn).click();

      await expect(page.locator(selectors.message)).toHaveText(successText);
    });
  });

  // Негативные кейсы
  test.describe("Negative cases", () => {
    test("Empty username", async ({ page }) => {
      await page.locator(selectors.password).fill(validData.password);
      await page.locator(selectors.registerBtn).click();

      await expect(page.locator(selectors.message)).toContainText(
        "Username is required"
      );
    });

    test("Empty password", async ({ page }) => {
      await page.locator(selectors.username).fill(validData.username);
      await page.locator(selectors.registerBtn).click();

      await expect(page.locator(selectors.message)).toContainText(
        "Password is required"
      );
    });

    test("Username too short", async ({ page }) => {
      await page.locator(selectors.username).fill(invalidData.shortUser);
      await page.locator(selectors.password).fill(validData.password);
      await page.locator(selectors.registerBtn).click();

      await expect(page.locator(selectors.message)).toContainText(
        "Username should contain at least 3 characters"
      );
    });

    test("Password with only spaces", async ({ page }) => {
      await page.locator(selectors.username).fill(validData.username);
      await page.locator(selectors.password).fill(invalidData.spacesOnly);
      await page.locator(selectors.registerBtn).click();

      await expect(page.locator(selectors.message)).toContainText(
        "Password is required"
      );
    });
  });
});
