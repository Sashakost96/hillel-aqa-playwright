import { test, expect } from "@playwright/test";
import SignUpForm from "../pom/forms/SignUpForm"
import HomePage from "../pom/pages/HomePage";
import { validUserData, registeredUserData } from "../pom/UserDataInterface";

let signUpForm: SignUpForm;
let homePage: HomePage;

let randomChar = require('random-char');
let skipClosing: boolean;
const validData = validUserData;
const registeredData = registeredUserData;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signUpForm = new SignUpForm(page);

    await page.goto('/');
    await homePage.openSignUpForm();
    await homePage.signUpFormIslDisplay();
});

test.afterEach(async () => {
    if (skipClosing) {
        skipClosing = false;
        return;
    }
    await signUpForm.clickOnCloseBtn();
    await homePage.signUpFormIsNotDisplay();
    console.log(`Finished ${test.info().title} with status ${test.info().status}`);
});

test.describe('Sign up form positive tests', () => {

    test("Check UI of Sign Up form", async () => {
        await expect(signUpForm.title).toContainText('Registration');
        await expect(signUpForm.name_label).toContainText('Name');
        await expect(signUpForm.lname_label).toContainText('Last name');
        await expect(signUpForm.email_label).toContainText('Email');
        await expect(signUpForm.password_label).toContainText('Password');
        await expect(signUpForm.repeatPassword_label).toContainText('Re-enter password');
        await expect(signUpForm.name_input).toBeEmpty();
        await expect(signUpForm.lname_input).toBeEmpty();
        await expect(signUpForm.email_input).toBeEmpty();
        await expect(signUpForm.password_input).toBeEmpty();
        await expect(signUpForm.repeatPassword_input).toBeEmpty();
        await expect(signUpForm.close_btn).toBeEnabled();
    });

    test("Check Successful registration with valid data", async ({ page }) => {
        signUpForm.SuccessfulSignUp(validData);
        await expect(signUpForm.register_btn).toBeEnabled();
        await signUpForm.clickOnRegistrationBtn();
        await homePage.signUpFormIsNotDisplay();
        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
        skipClosing = true;
    });

    test("Check registration flow using already registered data", async () => {
        signUpForm.UnsuccessfulSignUp(registeredData);
        await expect(signUpForm.register_btn).toBeEnabled();
        signUpForm.clickOnRegistrationBtn();
        await expect(signUpForm.registrationError1).toContainText('User already exists');
        await expect(signUpForm.registrationError1).toHaveCSS('color', signUpForm.alert_red);
        await expect(signUpForm.registrationError1).toHaveCSS('background-color', signUpForm.alertBg_red);
        await expect(signUpForm.registrationError1).toHaveCSS('border-color', signUpForm.alertBorder_red);
    });

    test("Check Name field with Real-time validation", async () => {
        await signUpForm.name_input.pressSequentially(randomChar('1234567890!@#$%^&*()_-+='));
        await signUpForm.name_input.blur();
        await expect.soft(signUpForm.name_validation).toContainText('Name is invalid');
        await expect.soft(signUpForm.name_hasBe).toContainText('Name has to be from 2 to 20 characters long');
        await signUpForm.name_input.clear();
        await signUpForm.name_input.pressSequentially(validData.name);
        await signUpForm.name_input.blur();
        await expect.soft(signUpForm.name_validation).toBeHidden();
        await expect.soft(signUpForm.name_hasBe).toBeHidden();
    });

    test("Check Last Name field with Real-time validation", async () => {
        await signUpForm.lname_input.pressSequentially(randomChar('1234567890!@#$%^&*()_-+='));
        await signUpForm.lname_input.blur();
        await expect.soft(signUpForm.lname_validation).toContainText('Last name is invalid');
        await expect.soft(signUpForm.lname_hasBe).toContainText('Last name has to be from 2 to 20 characters long');
        await signUpForm.lname_input.clear();
        await signUpForm.lname_input.pressSequentially(validData.lname);
        await signUpForm.lname_input.blur();
        await expect.soft(signUpForm.lname_validation).toBeHidden();
        await expect.soft(signUpForm.lname_hasBe).toBeHidden();
    });

    test("Check Email field with Real-time validation", async () => {
        await signUpForm.email_input.pressSequentially(randomChar('1234567890!@#$%^&*()_-+='));
        await signUpForm.email_input.blur();
        await expect.soft(signUpForm.email_validation).toContainText('Email is incorrect');
        await signUpForm.email_input.clear();
        await signUpForm.email_input.pressSequentially(validData.email);
        await signUpForm.email_input.blur();
        await expect.soft(signUpForm.email_validation).toBeHidden();
    });

    test("Check Password field with Real-time validation", async () => {
        await signUpForm.password_input.pressSequentially(randomChar('1234567890!@#$%^&*()_-+='));
        await signUpForm.password_input.blur();
        await expect.soft(signUpForm.password_validation).toContainText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await signUpForm.password_input.clear();
        await signUpForm.password_input.pressSequentially(validData.password);
        await signUpForm.password_input.blur();
        await expect.soft(signUpForm.password_validation).toBeHidden();
    });

    test("Check Re-entered Password field with Real-time validation", async () => {
        await signUpForm.repeatPassword_input.pressSequentially(randomChar('1234567890!@#$%^&*()_-+='));
        await signUpForm.repeatPassword_input.blur();
        await expect.soft(signUpForm.repeatPassword_validation).toContainText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await signUpForm.repeatPassword_input.clear();
        await signUpForm.repeatPassword_input.pressSequentially(validData.password);
        await signUpForm.repeatPassword_input.blur();
        await expect.soft(signUpForm.repeatPassword_validation).toContainText('Passwords do not match');
        await signUpForm.password_input.pressSequentially(validData.password);
        await expect.soft(signUpForm.repeatPassword_validation).toBeHidden();
    });

    test("Check required fields in Registering form", async () => {
        await signUpForm.name_input.click();
        await expect(signUpForm.name_input).toHaveCSS('border-color', signUpForm.border_blue);
        await signUpForm.name_input.blur();
        await expect(signUpForm.name_input).toHaveCSS('border-color', signUpForm.input_red);
        await expect(signUpForm.name_required).toContainText('Name required');
        await expect(signUpForm.name_required).toHaveCSS('color', signUpForm.input_red);
        await signUpForm.lname_input.click();
        await expect(signUpForm.lname_input).toHaveCSS('border-color', signUpForm.border_blue);
        await signUpForm.lname_input.blur();
        await expect(signUpForm.lname_input).toHaveCSS('border-color', signUpForm.input_red);
        await expect(signUpForm.lname_required).toContainText('Last name required');
        await expect(signUpForm.lname_required).toHaveCSS('color', signUpForm.input_red);
        await signUpForm.email_input.click();
        await expect(signUpForm.email_input).toHaveCSS('border-color', signUpForm.border_blue);
        await signUpForm.email_input.blur();
        await expect(signUpForm.email_input).toHaveCSS('border-color', signUpForm.input_red);
        await expect(signUpForm.email_validation).toContainText('Email required');
        await expect(signUpForm.email_validation).toHaveCSS('color', signUpForm.input_red);
        await signUpForm.password_input.click();
        await expect(signUpForm.password_input).toHaveCSS('border-color', signUpForm.border_blue);
        await signUpForm.password_input.blur();
        await expect(signUpForm.password_input).toHaveCSS('border-color', signUpForm.input_red);
        await expect(signUpForm.password_validation).toContainText('Password required');
        await expect(signUpForm.password_validation).toHaveCSS('color', signUpForm.input_red);
        await signUpForm.repeatPassword_input.click();
        await expect(signUpForm.repeatPassword_input).toHaveCSS('border-color', signUpForm.border_blue);
        await signUpForm.repeatPassword_input.blur();
        await expect(signUpForm.repeatPassword_input).toHaveCSS('border-color', signUpForm.input_red);
        await expect(signUpForm.repeatPassword_validation).toContainText('Re-enter password required');
        await expect(signUpForm.repeatPassword_validation).toHaveCSS('color', signUpForm.input_red);
        await expect(signUpForm.register_btn).toBeDisabled();
        await expect(signUpForm.register_btn).toHaveCSS('color', signUpForm.regBtn_color);
        await expect(signUpForm.register_btn).toHaveCSS('background-color', signUpForm.regBtnBg_color);
        await expect(signUpForm.register_btn).toHaveCSS('border-color', signUpForm.regBtnBg_color);
    });

    test("Check validation when Name has leading/trailing spaces", async () => {
        await signUpForm.name_input.fill(` ${validUserData.name} `);
        await signUpForm.name_input.blur();
        await expect.soft(signUpForm.name_validation).not.toContainText('Name is invalid');
        await expect(signUpForm.name_input).toHaveCSS('border-color', signUpForm.border_default);
    });

    test("Check validation when Last Name has leading/trailing spaces", async () => {
        await signUpForm.lname_input.fill(` ${validUserData.lname} `);
        await signUpForm.lname_input.blur();
        await expect.soft(signUpForm.lname_validation).not.toContainText('Last name is invalid');
        await expect(signUpForm.lname_input).toHaveCSS('border-color', signUpForm.border_default);
    });

    test("Check min Name length (2 characters)", async () => {
        await signUpForm.name_input.fill(`${validUserData.name.slice(-2)}`);
        await signUpForm.name_input.blur();
        let validationElement = signUpForm.name_input;
        let actualText = await validationElement.innerText();
        expect(actualText.length).toBeLessThanOrEqual(2);
        expect(validationElement).toHaveValue(signUpForm.regex_name);
    });

    test("Check min. Last Name length (2 characters)", async () => {
        await signUpForm.lname_input.fill(`${validUserData.lname.slice(-2)}`);
        await signUpForm.lname_input.blur();
        let validationElement = signUpForm.lname_input;
        let actualText = await validationElement.innerText();
        expect(actualText.length).toBeLessThanOrEqual(2);
        expect(validationElement).toHaveValue(signUpForm.regex_name);
    });

    test("Check max. Name length (20 characters)", async () => {
        await signUpForm.name_input.fill(`${validUserData.name.padEnd(20, 'z')}`);
        await signUpForm.name_input.blur();
        let validationElement = signUpForm.name_input;
        let actualText = await validationElement.innerText();
        expect(actualText.length).toBeLessThanOrEqual(20);
        expect(validationElement).toHaveValue(signUpForm.regex_name);
    });

    test("Check max. Last Name length (20 characters)", async () => {
        await signUpForm.lname_input.fill(`${validUserData.lname.padEnd(20, 'z')}`);
        await signUpForm.lname_input.blur();
        let validationElement = signUpForm.lname_input;
        let actualText = await validationElement.innerText();
        expect(actualText.length).toBeLessThanOrEqual(20);
        expect(validationElement).toHaveValue(signUpForm.regex_name);
    });

    test("Check email with valid format", async () => {
        await signUpForm.email_input.fill(`${validUserData.email}`);
        await signUpForm.email_input.blur();
        expect(signUpForm.email_input).toHaveValue(signUpForm.regex_email);
    });

    test("Check min. Password length (8 char: min 1 int 1 caplet, 1 small)", async () => {
        await signUpForm.password_input.fill(`${validUserData.password.slice(-8)}`);
        await signUpForm.password_input.blur();
        let validationElement = signUpForm.password_input;
        let actualText = await validationElement.innerText();
        expect(actualText.length).toBeLessThanOrEqual(8);
        expect(validationElement).toHaveValue(signUpForm.regex_password);
    });

    test("Check max. Password length (15 char: min 1 int 1 caplet, 1 small)", async () => {
        await signUpForm.password_input.fill(`${validUserData.password.padEnd(15, 'z')}`);
        await signUpForm.password_input.blur();
        let validationElement = signUpForm.password_input;
        let actualText = await validationElement.innerText();
        expect(actualText.length).toBeLessThanOrEqual(15);
        expect(validationElement).toHaveValue(signUpForm.regex_password);
    });
});
//-------------------------------------------------------------NEGATIVE--------------------------------------------------------------------------------------------
test.describe('Sign up form negative tests', () => {
    test("[-] Check validation when Name has invalid format", async () => {
        await signUpForm.name_input.fill(`${validUserData.name}.`);
        await signUpForm.name_input.blur();
        await expect(signUpForm.name_validation).toContainText('Name is invalid');
        await expect(signUpForm.name_validation).toHaveCSS('color', signUpForm.input_red);
        await expect(signUpForm.name_input).toHaveCSS('border-color', signUpForm.input_red);
    });

    test("[-] Check validation when Name is too short(< 2)", async () => {
        await signUpForm.name_input.fill(`${validUserData.name.slice(-1)}`);
        await signUpForm.name_input.blur();
        await expect(signUpForm.name_validation).toContainText('Name has to be from 2 to 20 characters long');
        await expect(signUpForm.name_validation).toHaveCSS('color', signUpForm.input_red);
        await expect(signUpForm.name_input).toHaveCSS('border-color', signUpForm.input_red);
    });

    test("[-] Check validation when Name is too long(> 20)", async () => {
        await signUpForm.name_input.fill(`${validUserData.name.padEnd(21, 'z')}`);
        await signUpForm.name_input.blur();
        await expect(signUpForm.name_validation).toContainText('Name has to be from 2 to 20 characters long');
        await expect(signUpForm.name_validation).toHaveCSS('color', signUpForm.input_red);
        await expect(signUpForm.name_input).toHaveCSS('border-color', signUpForm.input_red);
    });

    test("[-] Check validation when Last Name has invalid format", async () => {
        await signUpForm.lname_input.fill(`${validUserData.lname}.`);
        await signUpForm.lname_input.blur();
        await expect(signUpForm.lname_validation).toContainText('Last name is invalid');
        await expect(signUpForm.lname_validation).toHaveCSS('color', signUpForm.input_red);
        await expect(signUpForm.lname_input).toHaveCSS('border-color', signUpForm.input_red);
    });

    test("[-] Check validation when Last Name is too short(< 2)", async () => {
        await signUpForm.lname_input.fill(`${validUserData.lname.slice(-1)}`);
        await signUpForm.lname_input.blur();
        await expect(signUpForm.lname_validation).toContainText('Last name has to be from 2 to 20 characters long');
        await expect(signUpForm.lname_validation).toHaveCSS('color', signUpForm.input_red);
        await expect(signUpForm.lname_input).toHaveCSS('border-color', signUpForm.input_red);
    });

    test("[-] Check validation when Last Name is too long(> 20)", async () => {
        await signUpForm.lname_input.fill(`${validUserData.lname.padEnd(21, 'z')}`);
        await signUpForm.lname_input.blur();
        await expect(signUpForm.lname_validation).toContainText('Last name has to be from 2 to 20 characters long');
        await expect(signUpForm.lname_validation).toHaveCSS('color', signUpForm.input_red);
        await expect(signUpForm.lname_input).toHaveCSS('border-color', signUpForm.input_red);
    });

    test("[-] Check validation when Email has invalid format", async () => {
        await signUpForm.email_input.fill(` ${validUserData.email} `);
        await signUpForm.email_input.blur();
        expect(signUpForm.email_input).not.toHaveValue(signUpForm.regex_email);
        await expect(signUpForm.email_validation).toContainText('Email is incorrect');
        await expect(signUpForm.email_validation).toHaveCSS('color', signUpForm.input_red);
        await expect(signUpForm.email_input).toHaveCSS('border-color', signUpForm.input_red);
    });

    test("[-] Check validation when Password is too long(< 8)", async () => {
        await signUpForm.password_input.fill(`${validUserData.password.slice(-7)}`);
        await signUpForm.password_input.blur();
        await expect(signUpForm.password_validation).toContainText('Password has to be from 8 to 15 characters long');
        await expect(signUpForm.password_validation).toHaveCSS('color', signUpForm.input_red);
        await expect(signUpForm.password_input).toHaveCSS('border-color', signUpForm.input_red);
    });

    test("[-] Check validation when Password is too long(> 15)", async () => {
        await signUpForm.password_input.fill(`${validUserData.password.padEnd(16, randomChar())}`);
        await signUpForm.password_input.blur();
        await expect(signUpForm.password_validation).toContainText('Password has to be from 8 to 15 characters long');
        await expect(signUpForm.password_validation).toHaveCSS('color', signUpForm.input_red);
        await expect(signUpForm.password_input).toHaveCSS('border-color', signUpForm.input_red);
    });

    test("[-] Check validation when password and re-enter password do not match", async () => {
        await signUpForm.password_input.fill(`${validUserData.password}`);
        await signUpForm.repeatPassword_input.fill(` ${validUserData.password} `);
        await signUpForm.repeatPassword_input.blur();
        await expect(signUpForm.repeatPassword_validation).toContainText('Passwords do not match');
        await expect(signUpForm.repeatPassword_validation).toHaveCSS('color', signUpForm.input_red);
        await expect(signUpForm.repeatPassword_input).toHaveCSS('border-color', signUpForm.input_red);
    });
});