import * as puppeteer from "puppeteer";
import pino from "pino";
import {
  main,
  shared,
  preAppointment,
  appointment,
  calendar,
} from "../crawler";

const logger = pino();

const run = async (barcode: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await loadInitialURL(page);
  await fillAndSubmitLocationForm(page);
  await fillAndSubmitPreAppointmentForm(page);
  await fillAndSubmitAppontmentForm(page, barcode);
  const date = await findFirstDate(page);

  await browser.close();

  return date;
};

const loadInitialURL = async (page: puppeteer.Page) => {
  logger.info(`Go to ${main.constants.URL}`);
  await page.goto(main.constants.URL);
  await shared.actions.waitForPageToLoad(page);
};

const fillAndSubmitLocationForm = async (page: puppeteer.Page) => {
  logger.info("Select country");
  await main.actions.selectCountry(page);
  logger.info("Select city");
  await main.actions.selectCity(page);

  logger.info("Submit the form");
  await Promise.all([page.waitForNavigation(), main.actions.submit(page)]);
};

const fillAndSubmitPreAppointmentForm = async (page: puppeteer.Page) => {
  logger.info("Solve captcha");
  await preAppointment.actions.solveImageCaptcha(page);

  logger.info("Submit captcha");
  await Promise.all([
    page.waitForNavigation(),
    preAppointment.actions.submit(page),
  ]);
};

const fillAndSubmitAppontmentForm = async (
  page: puppeteer.Page,
  barcode: string
) => {
  logger.info("Insert barcode");
  await appointment.actions.fillBarcode(page, barcode);

  logger.info("Submit the form");
  await Promise.all([
    page.waitForNavigation(),
    appointment.actions.submit(page),
  ]);
};

const findFirstDate = async (page: puppeteer.Page) => {
  logger.info("Looking for the first available date");
  const date = await calendar.actions.findFirstDate(page);

  return date
};

export default run;
