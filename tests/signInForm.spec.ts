import { test, expect } from "@playwright/test";
import SignInForm from "../pom/forms/SignInForm"
import HomePage from "../pom/pages/HomePage";
import { validUserData, registeredUserData } from "../pom/UserDataInterface";


let signInForm: SignInForm;
let homePage: HomePage;

let randomChar = require('random-char');
let skipClosing: boolean;
// const validData = validUserData;
// const registeredData = registeredUserData;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signInForm = new SignInForm(page);

    await page.goto('/');
    await homePage.openSignInForm();
    await homePage.signInFormIslDisplay();
});

test.afterEach(async () => {
    if (skipClosing) {
        skipClosing = false;
        return;
    }
    await signInForm.clickOnCloseBtn();
    await homePage.signInFormIsNotDisplay();
    console.log(`Finished ${test.info().title} with status ${test.info().status}`);
});

test.describe('Sign In form positive tests', () => {

    test("Check Successful Sign In with valid data", async ({ page }) => {
        signInForm.SuccessfulSignIn(registeredUserData);
        await expect(signInForm.login_btn).toBeEnabled();
        await signInForm.clickOnLoginBtn();
        await homePage.signInFormIsNotDisplay();
        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
        skipClosing = true;
    });

        test("Check Sign In with 'Remember me' checkbox", async ({ page }) => {
        signInForm.SuccessfulSignIn(registeredUserData);
        await expect(signInForm.login_btn).toBeEnabled();
        signInForm.rememberMe_checkbox.check();
        await expect(signInForm.rememberMe_checkbox).toBeChecked();
        await expect(signInForm.rememberMe_label).toContainText('Remember me');
        await signInForm.clickOnLoginBtn();
        await homePage.signInFormIsNotDisplay();
        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
        skipClosing = true;
    });


    test("Check UI of Sign In form", async () => {
        await expect(signInForm.title).toContainText('Log in');
        await expect(signInForm.email_label).toContainText('Email');
        await expect(signInForm.password_label).toContainText('Password');
        await expect(signInForm.email_input).toBeEmpty();
        await expect(signInForm.password_input).toBeEmpty();
        await expect(signInForm.close_btn).toBeEnabled();
    });


    test("Check Email field with Real-time validation", async () => {
        await signInForm.email_input.click();
        await expect(signInForm.email_input).toHaveCSS('border-color', signInForm.border_blue);
        await signInForm.email_input.blur();
        await expect(signInForm.email_input).toHaveCSS('border-color', signInForm.input_red);
        await expect(signInForm.email_validation).toContainText('Email required');
        await expect(signInForm.email_validation).toHaveCSS('color', signInForm.input_red);
        await signInForm.email_input.pressSequentially(randomChar('1234567890!@#$%^&*()_-+='));
        await signInForm.email_input.blur();
        await expect(signInForm.email_validation).toContainText('Email is incorrect');
        await signInForm.email_input.clear();
        await signInForm.email_input.pressSequentially(registeredUserData.email);
        await signInForm.email_input.blur();
        await expect.soft(signInForm.email_validation).toBeHidden();
    });

    test("Check Password field with Real-time validation", async () => {
        await signInForm.password_input.click();
        await expect(signInForm.password_input).toHaveCSS('border-color', signInForm.border_blue);
        await signInForm.password_input.blur();
        await expect(signInForm.password_input).toHaveCSS('border-color', signInForm.input_red);
        await expect(signInForm.password_validation).toContainText('Password required');
        await expect(signInForm.password_validation).toHaveCSS('color', signInForm.input_red);
        await signInForm.password_input.click()
        await signInForm.password_input.pressSequentially(registeredUserData.password);
        await signInForm.password_input.blur();
        await expect.soft(signInForm.password_validation).toBeHidden();
    });
});

test.describe('Sign In form negative tests', () => {
    test("[-] Check Sign In flow using invalid data", async () => {
        signInForm.UnsuccessfulSignIn(validUserData);
        await expect(signInForm.login_btn).toBeEnabled();
        signInForm.clickOnLoginBtn();
        await expect(signInForm.loginError).toContainText('Wrong email or password');
        await expect(signInForm.loginError).toHaveCSS('color', signInForm.alert_red);
        await expect(signInForm.loginError).toHaveCSS('background-color', signInForm.alertBg_red);
        await expect(signInForm.loginError).toHaveCSS('border-color', signInForm.alertBorder_red);
    });
});
