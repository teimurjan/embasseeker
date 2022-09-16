import { Page } from "puppeteer";
import * as Captcha from "2captcha";
import {
  CAPTCHA_IMAGE_SELECTOR,
  CAPTCHA_INPUT_SELECTOR,
  SUBMIT_BUTTON_SELECTOR,
} from "./constants";

export const solveImageCaptcha = async (page: Page) => {
  if (process.env.CAPTCHA_API_KEY) {
    const solver = new Captcha.Solver(process.env.CAPTCHA_API_KEY);

    const image = await page.$(CAPTCHA_IMAGE_SELECTOR);

    if (image) {
      const base64 = await image.screenshot({ encoding: "base64" });
      const response = await solver.imageCaptcha(base64 as string);

      await page.type(CAPTCHA_INPUT_SELECTOR, response.data);
    }
  }
};

export const submit = async (page: Page) =>
  await page.click(SUBMIT_BUTTON_SELECTOR);
