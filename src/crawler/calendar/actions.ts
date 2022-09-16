import { Page } from "puppeteer";
import {
  AVAILABLE_DATE_SELECTOR,
  SELECTED_MONTH_OPTION_SELECTOR,
  NEXT_MONTH_BUTTON_SELECTOR,
} from "./constants";

const monthToIndex = (month: string) =>
  [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].findIndex((month_) => month_ === month);

export const findFirstDate = async (
  page: Page
): Promise<Date | undefined> => {
  const availableDate = await page.$(AVAILABLE_DATE_SELECTOR);
  const isNextMonth = !!(await page.$(NEXT_MONTH_BUTTON_SELECTOR));
  if (availableDate) {
    const dayTextProperty = await availableDate.getProperty("textContent");
    const dayText = (await dayTextProperty.jsonValue()) as string;
    const day = parseInt(dayText, 10);

    const selectedMonth = await page.$(SELECTED_MONTH_OPTION_SELECTOR);
    if (selectedMonth) {
      const monthTextProperty = await selectedMonth.getProperty("textContent");
      const monthText = (await monthTextProperty.jsonValue()) as string;
      const [monthStr, yearStr] = monthText.split(/\s{1,}/g);
      const month = monthToIndex(monthStr);
      const year = parseInt(yearStr, 10);
      const date = new Date(year, month, day);

      return date;
    }
  } else if (isNextMonth) {
    await Promise.all([
      page.waitForNavigation(),
      // https://stackoverflow.com/a/48897450/7127524
      page.$eval(NEXT_MONTH_BUTTON_SELECTOR, (element) =>
        (element as HTMLAnchorElement).click()
      ),
    ]);

    return await findFirstDate(page);
  }

  return undefined;
};
