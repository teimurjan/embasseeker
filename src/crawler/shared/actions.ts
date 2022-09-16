import { Page } from "puppeteer";

export const waitForPageToLoad = async (page: Page) =>
  await page.waitForNavigation({ waitUntil: "networkidle0" });

export const waitAfterSubmit = async (page: Page) =>
  await page.waitForNavigation({ waitUntil: "networkidle2" });
