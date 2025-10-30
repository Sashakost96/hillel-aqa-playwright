import { test, expect } from "@playwright/test";
import SignInForm from "../pom/forms/SignInForm"
import HomePage from "../pom/pages/HomePage";
import RestoreAccessForm from "../pom/forms/RestoreAccessForm";
import { registeredUserData, inValidUserData } from "../pom/UserDataInterface";

let signInForm: SignInForm;
let homePage: HomePage;
let restoreAccessForm: RestoreAccessForm;
let skipClosing: boolean;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signInForm = new SignInForm(page);
    restoreAccessForm = new RestoreAccessForm(page);

    await page.goto('/');
    await homePage.openSignInForm();
    await homePage.signInFormIslDisplay();
    await signInForm.NavigateToRestoreAccessForm();
});

test.afterEach(async () => {
    if (skipClosing) {
        skipClosing = false;
        return;
    }
    await restoreAccessForm.clickOnCloseBtn();
    await homePage.restoreAccessFormFormIsNotDisplay();
    console.log(`Finished ${test.info().title} with status ${test.info().status}`);
});

test.describe('Restore Access form positive tests', () => {

    test("Check Restore Access with valid data", async ({ page }) => {
        await expect(homePage.restoreAccess_model).toBeVisible();
        restoreAccessForm.FillFormWithEmail(registeredUserData);
        await expect(restoreAccessForm.send_btn).toBeEnabled();
        await restoreAccessForm.clickOnSendBtn();
        await homePage.restoreAccessFormFormIsNotDisplay();
        await expect(page).toHaveURL('https://qauto.forstudy.space/');
        skipClosing = true;
    });

    test("Check UI elements of Restore Access form", async () => {
        await expect(restoreAccessForm.title).toContainText('Restore access');
        await expect(restoreAccessForm.email_label).toContainText('Email');
        await expect(restoreAccessForm.email_input).toBeEmpty();
        await expect(restoreAccessForm.email_input).toHaveCSS('border-color', restoreAccessForm.border_default);
        await restoreAccessForm.email_input.click();
        await expect(restoreAccessForm.email_input).toHaveCSS('border-color', restoreAccessForm.border_blue);
        await expect(restoreAccessForm.send_btn).toBeDisabled();
        await expect(restoreAccessForm.send_btn).toHaveCSS('color', restoreAccessForm.sentBtn_color);
        await expect(restoreAccessForm.send_btn).toHaveCSS('background-color', restoreAccessForm.sentBtnBg_color);
        await expect(restoreAccessForm.close_btn).toBeEnabled();
    });
});

test.describe('Restore Access form negative tests', () => {
    test("[-] Check UI validation while sending Restore Access Form with Invalid data", async () => {
        await expect(homePage.restoreAccess_model).toBeVisible();
        await expect(restoreAccessForm.email_input).toHaveCSS('border-color', restoreAccessForm.border_default);
        await restoreAccessForm.email_input.click();
        await expect(restoreAccessForm.email_input).toHaveCSS('border-color', restoreAccessForm.border_blue);
        await restoreAccessForm.email_input.blur();
        await expect(restoreAccessForm.email_validation).toContainText('Email required');
        await expect(restoreAccessForm.email_input).toHaveCSS('border-color', restoreAccessForm.input_red);
        await expect(restoreAccessForm.send_btn).toBeDisabled();
        await restoreAccessForm.FillFormWithEmail(inValidUserData);
        await expect(restoreAccessForm.email_validation).toContainText('Email is incorrect');
        await expect(restoreAccessForm.email_input).toHaveCSS('border-color', restoreAccessForm.input_red);
        await expect(restoreAccessForm.send_btn).toBeDisabled();
        await restoreAccessForm.FillFormWithEmail(registeredUserData);
        await expect(restoreAccessForm.email_input).toHaveCSS('border-color', restoreAccessForm.border_blue);
        await expect(restoreAccessForm.email_validation).toBeHidden();
        await expect(restoreAccessForm.send_btn).toBeEnabled();
        await restoreAccessForm.clickOnCloseBtn();
        await homePage.restoreAccessFormFormIsNotDisplay();
        skipClosing = true;
    });
});