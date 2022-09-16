import { Page } from "puppeteer";
import { BARCODE_INPUT_SELECTOR, SUBMIT_BUTTON_SELECTOR } from "./constants";

export const fillBarcode = async (page: Page, barcode: string) => {
  await page.type(BARCODE_INPUT_SELECTOR, barcode);
};

export const submit = async (page: Page) =>
  await page.click(SUBMIT_BUTTON_SELECTOR);
