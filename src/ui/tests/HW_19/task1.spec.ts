import test, { expect } from "@playwright/test";

const selectors = {
  dynamicControlsBtn: 'a[href="/dynamic_controls"]',
  password: "#passwordOnRegister",
  removeBtn: "#checkbox-example button",
  dynamicControlsTitle: ".example h4",
  checkbox: "#checkbox",
  addBtn: "//button[contains(text(),'Add')]",
  messageText: "#message",
};

test.describe("[UI] [Heroku] Dynamic Controls", () => {
  test("Should authenticate with valid credentials", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/");
    await page.click(selectors.dynamicControlsBtn);
    await page.waitForSelector(selectors.removeBtn);

    expect(page.locator(selectors.dynamicControlsTitle).first()).toHaveText(
      "Dynamic Controls"
    );

    await page.locator(selectors.checkbox).click();
    await page.locator(selectors.removeBtn).click();
    await page.locator(selectors.checkbox).waitFor({ state: "hidden" });

    expect(page.locator(selectors.addBtn)).toBeVisible();

    expect(page.locator(selectors.messageText)).toHaveText("It's gone!");

    await page.click(selectors.addBtn);
    await page.locator(selectors.checkbox).waitFor({ state: "visible" });

    expect(page.locator(selectors.messageText)).toHaveText("It's back!");
  });
});
