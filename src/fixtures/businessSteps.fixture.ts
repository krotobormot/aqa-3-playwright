import { USER_LOGIN, USER_PASSWORD } from "config/evnironment";
import { test as base } from "./pages.fixture";

interface IBusinessSteps {
  loginAsLocalUser(): Promise<void>;
}

export const test = base.extend<IBusinessSteps>({
  loginAsLocalUser: async ({ homePage, signInPage }, use) => {
    await use(async () => {
      await signInPage.openPortal();
      await signInPage.fillCredentials({ email: USER_LOGIN, password: USER_PASSWORD });
      await signInPage.clickLogin();
      await homePage.waitForOpened();
    });
  },
});

export { expect } from "@playwright/test";
