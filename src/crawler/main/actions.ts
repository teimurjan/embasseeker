import { Page } from "puppeteer";
import {
  COUNTRY_CODE_SELECT_SELECTOR,
  COUNTRY_CODE_OPTION_SELECTOR,
  CITY_SELECT_SELECTOR,
  CITY_OPTION_SELECTOR,
  SUBMIT_BUTTON_SELECTOR,
} from "./constants";

export const selectCountry = async (page: Page) => {
  const option = await page.$(COUNTRY_CODE_OPTION_SELECTOR);
  if (option) {
    const valueProperty = await option.getProperty("value");
    const value = (await valueProperty.jsonValue()) as string;

    await page.select(COUNTRY_CODE_SELECT_SELECTOR, value);
  }
};
export const selectCity = async (page: Page) => {
  const option = await page.$(CITY_OPTION_SELECTOR);
  if (option) {
    const valueProperty = await option.getProperty("value");
    const value = (await valueProperty.jsonValue()) as string;

    await page.select(CITY_SELECT_SELECTOR, value);
  }
};

export const submit = async (page: Page) =>
  await page.click(SUBMIT_BUTTON_SELECTOR);
