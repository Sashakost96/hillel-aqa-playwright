import { test, expect } from "@playwright/test";

var randomChar = require('random-char');
const signUp_btn: string = '//button[@class="hero-descriptor_btn btn btn-primary"]';
const signUp_model: string = '//div[@class="modal-content"]'
const title: string = '//div[@class="modal-content"]//h4';
const name_label: string = '//div[@class="form-group"][1]/label';
const lname_label: string = '//div[@class="form-group"][2]/label';
const email_label: string = '//div[@class="form-group"][3]/label';;
const password_label: string = '//div[@class="form-group"][4]/label';
const repeatPassword_label: string = '//div[@class="form-group"][5]/label';
const name_input: string = '//div[@class="form-group"][1]/input';
const lname_input: string = '//div[@class="form-group"][2]/input';
const email_input: string = '//div[@class="form-group"][3]/input';
const password_input: string = '//div[@class="form-group"][4]/input';
const repeatPassword_input: string = '//div[@class="form-group"][5]/input';
const close_btn: string = '//div[@class="modal-header"]/button[@class="close"]';
const register_btn: string = '//div[@class="modal-footer"]/button[@class="btn btn-primary"]';
const registrationError1: string = '//form[@class="ng-dirty ng-touched ng-valid"]/p[@class="alert alert-danger"]';
const name_validation: string = '//input[@name="name"]/following-sibling::div[@class="invalid-feedback"]/p';
const lname_validation: string = '//input[@name="lastName"]/following-sibling::div[@class="invalid-feedback"]/p';
const email_validation: string = '//input[@name="email"]/following-sibling::div[@class="invalid-feedback"]/p';
const password_validation: string = '//input[@name="password"]/following-sibling::div[@class="invalid-feedback"]/p';
const repeatPassword_validation: string = '//input[@name="repeatPassword"]/following-sibling::div[@class="invalid-feedback"]/p';
const regex_email: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regex_name: RegExp = /^[A-Za-z]{2,20}$/;
const regex_password: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,15}$/;
let skipClosing: boolean;

interface UserData {
    name: string;
    lname: string;
    email: string;
    password: string;
};
const registeredUserData: UserData = {
    name: "Test",
    lname: "Auto",
    email: "ke@gmail.com",
    password: "test123KO!",
};
const validUserData: UserData = {
    name: "Test",
    lname: "Auto",
    email: `aqa_cat+${Date.now().toString().slice(-4)}@example.com`,
    password: "test123KO!",
};


test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator(signUp_btn).click();
    await expect(page.locator(signUp_model)).toBeVisible();
});

test.afterEach(async ({ page }) => {
    if (skipClosing) {
        skipClosing = false;
        return;
    }
    await page.locator(close_btn).click();
    await expect(page.locator(signUp_model)).toBeHidden();
    console.log(`Finished ${test.info().title} with status ${test.info().status}`);
});

test("Check UI of Sign Up form", async ({ page }) => {
    await expect(page.locator(title)).toContainText('Registration');
    await expect(page.locator(name_label)).toContainText('Name');
    await expect(page.locator(lname_label)).toContainText('Last name');
    await expect(page.locator(email_label)).toContainText('Email');
    await expect(page.locator(password_label)).toContainText('Password');
    await expect(page.locator(repeatPassword_label)).toContainText('Re-enter password');
    await expect(page.locator(name_input)).toBeEmpty();
    await expect(page.locator(lname_input)).toBeEmpty();
    await expect(page.locator(email_input)).toBeEmpty();
    await expect(page.locator(password_input)).toBeEmpty();
    await expect(page.locator(repeatPassword_input)).toBeEmpty();
    await expect(page.locator(close_btn)).toBeEnabled();
});

test("Check Successful registration with valid data", async ({ page }) => {
    await page.locator(name_input).fill(validUserData.name);
    await page.locator(lname_input).fill(validUserData.lname);
    await page.locator(email_input).fill(validUserData.email);
    await page.locator(password_input).fill(validUserData.password);
    await page.locator(repeatPassword_input).fill(validUserData.password);
    await expect(page.locator(register_btn)).toBeEnabled();
    await page.locator(register_btn).click();
    await expect(page.locator(signUp_model)).toBeHidden();
    await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    skipClosing = true;

});

test("Check Name field with Real-time validation", async ({ page }) => {
    await page.locator(name_input).pressSequentially(randomChar('1234567890!@#$%^&*()_-+='));
    await page.locator(name_input).blur();
    await expect.soft(page.locator('//div[@class="invalid-feedback"]/p[1]')).toContainText('Name is invalid');
    await expect.soft(page.locator('//div[@class="invalid-feedback"]/p[2]')).toContainText('Name has to be from 2 to 20 characters long');
    await page.locator(name_input).clear();
    await page.locator(name_input).pressSequentially(validUserData.name);
    await page.locator(name_input).blur();
    await expect.soft(page.locator('//div[@class="invalid-feedback"]/p[1]')).toBeHidden();
    await expect.soft(page.locator('//div[@class="invalid-feedback"]/p[2]')).toBeHidden();
});

test("Check Last Name field with Real-time validation", async ({ page }) => {
    await page.locator(lname_input).pressSequentially(randomChar('1234567890!@#$%^&*()_-+='));
    await page.locator(lname_input).blur();
    await expect.soft(page.locator('//div[@class="invalid-feedback"]/p[1]')).toContainText('Last name is invalid');
    await expect.soft(page.locator('//div[@class="invalid-feedback"]/p[2]')).toContainText('Last name has to be from 2 to 20 characters long');
    await page.locator(lname_input).clear();
    await page.locator(lname_input).pressSequentially(validUserData.lname);
    await page.locator(lname_input).blur();
    await expect.soft(page.locator('//div[@class="invalid-feedback"]/p[1]')).toBeHidden();
    await expect.soft(page.locator('//div[@class="invalid-feedback"]/p[2]')).toBeHidden();
});

test("Check Email field with Real-time validation", async ({ page }) => {
    await page.locator(email_input).pressSequentially(randomChar('1234567890!@#$%^&*()_-+='));
    await page.locator(email_input).blur();
    await expect.soft(page.locator(email_validation)).toContainText('Email is incorrect');
    await page.locator(email_input).clear();
    await page.locator(email_input).pressSequentially(validUserData.email);
    await page.locator(email_input).blur();
    await expect.soft(page.locator(email_validation)).toBeHidden();
});

test("Check Password field with Real-time validation", async ({ page }) => {
    await page.locator(password_input).pressSequentially(randomChar('1234567890!@#$%^&*()_-+='));
    await page.locator(password_input).blur();
    await expect.soft(page.locator(password_validation)).toContainText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await page.locator(password_input).clear();
    await page.locator(password_input).pressSequentially(validUserData.password);
    await page.locator(password_input).blur();
    await expect.soft(page.locator(password_validation)).toBeHidden();
});

test("Check Re-entered Password field with Real-time validation", async ({ page }) => {
    await page.locator(repeatPassword_input).pressSequentially(randomChar('1234567890!@#$%^&*()_-+='));
    await page.locator(repeatPassword_input).blur();
    await expect.soft(page.locator(repeatPassword_validation)).toContainText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    await page.locator(repeatPassword_input).clear();
    await page.locator(repeatPassword_input).pressSequentially(validUserData.password);
    await page.locator(repeatPassword_input).blur();
    await expect.soft(page.locator(repeatPassword_validation)).toContainText('Passwords do not match');
    await page.locator(password_input).pressSequentially(validUserData.password);
    await expect.soft(page.locator(repeatPassword_validation)).toBeHidden();
});

test("Check required fields in Registering form", async ({ page }) => {
    await page.locator(name_input).click();
    await expect(page.locator(name_input)).toHaveCSS('border-color', 'rgb(92, 179, 253)');
    await page.locator(name_input).blur();
    await expect(page.locator(name_input)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator(name_validation)).toContainText('Name required');
    await expect(page.locator(name_validation)).toHaveCSS('color', 'rgb(220, 53, 69)');
    await page.locator(lname_input).click();
    await expect(page.locator(lname_input)).toHaveCSS('border-color', 'rgb(92, 179, 253)');
    await page.locator(lname_input).blur();
    await expect(page.locator(lname_input)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator(lname_validation)).toContainText('Last name required');
    await expect(page.locator(lname_validation)).toHaveCSS('color', 'rgb(220, 53, 69)');
    await page.locator(email_input).click();
    await expect(page.locator(email_input)).toHaveCSS('border-color', 'rgb(92, 179, 253)');
    await page.locator(email_input).blur();
    await expect(page.locator(email_input)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator(email_validation)).toContainText('Email required');
    await expect(page.locator(email_validation)).toHaveCSS('color', 'rgb(220, 53, 69)');
    await page.locator(password_input).click();
    await expect(page.locator(password_input)).toHaveCSS('border-color', 'rgb(92, 179, 253)');
    await page.locator(password_input).blur();
    await expect(page.locator(password_input)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator(password_validation)).toContainText('Password required');
    await expect(page.locator(password_validation)).toHaveCSS('color', 'rgb(220, 53, 69)');
    await page.locator(repeatPassword_input).click();
    await expect(page.locator(repeatPassword_input)).toHaveCSS('border-color', 'rgb(92, 179, 253)');
    await page.locator(repeatPassword_input).blur();
    await expect(page.locator(repeatPassword_input)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(page.locator(repeatPassword_validation)).toContainText('Re-enter password required');
    await expect(page.locator(repeatPassword_validation)).toHaveCSS('color', 'rgb(220, 53, 69)');
    await expect(page.locator(register_btn)).toBeDisabled();
    await expect(page.locator(register_btn)).toHaveCSS('color', 'rgb(255, 255, 255)');
    await expect(page.locator(register_btn)).toHaveCSS('background-color', 'rgb(2, 117, 216)');
    await expect(page.locator(register_btn)).toHaveCSS('border-color', 'rgb(2, 117, 216)');

});

test("Check registration flow using already registered data", async ({ page }) => {
    await page.locator(name_input).fill(registeredUserData.name);
    await page.locator(lname_input).fill(registeredUserData.lname);
    await page.locator(email_input).fill(registeredUserData.email);
    await page.locator(password_input).fill(registeredUserData.password);
    await page.locator(repeatPassword_input).fill(registeredUserData.password)
    await expect(page.locator(register_btn)).toBeEnabled();
    await page.locator(register_btn).click();
    await expect(page.locator(registrationError1)).toContainText('User already exists');
    await expect(page.locator(registrationError1)).toHaveCSS('color', 'rgb(114, 28, 36)');
    await expect(page.locator(registrationError1)).toHaveCSS('background-color', 'rgb(248, 215, 218)');
    await expect(page.locator(registrationError1)).toHaveCSS('border-color', 'rgb(245, 198, 203)');
});

test("Check validation when Name has leading/trailing spaces", async ({ page }) => {
    await page.locator(name_input).fill(` ${validUserData.name} `);
    await page.locator(name_input).blur();
    await expect.soft(page.locator(name_validation)).not.toContainText('Name is invalid');
    await expect(page.locator(name_input)).toHaveCSS('border-color', 'rgb(206, 212, 218)');
});

test("Check validation when Last Name has leading/trailing spaces", async ({ page }) => {
    await page.locator(lname_input).fill(` ${validUserData.lname} `);
    await page.locator(lname_input).blur();
    await expect.soft(page.locator(lname_validation)).not.toContainText('Last name is invalid');
    await expect(page.locator(lname_input)).toHaveCSS('border-color', 'rgb(206, 212, 218)');
});

test("Check min Name length (2 characters)", async ({ page }) => {
    await page.locator(name_input).fill(`${validUserData.name.slice(-2)}`);
    await page.locator(name_input).blur();
    let validationElement = page.locator(name_input);
    let actualText = await validationElement.innerText();
    expect(actualText.length).toBeLessThanOrEqual(2);
    expect(validationElement).toHaveValue(regex_name);
});

test("Check min. Last Name length (2 characters)", async ({ page }) => {
    await page.locator(lname_input).fill(`${validUserData.lname.slice(-2)}`);
    await page.locator(lname_input).blur();
    let validationElement = page.locator(lname_input);
    let actualText = await validationElement.innerText();
    expect(actualText.length).toBeLessThanOrEqual(2);
    expect(validationElement).toHaveValue(regex_name);
});

test("Check max. Name length (20 characters)", async ({ page }) => {
    await page.locator(name_input).fill(`${validUserData.name.padEnd(20, 'z')}`);
    await page.locator(name_input).blur();
    let validationElement = page.locator(name_input);
    let actualText = await validationElement.innerText();
    expect(actualText.length).toBeLessThanOrEqual(20);
    expect(validationElement).toHaveValue(regex_name);
});

test("Check max. Last Name length (20 characters)", async ({ page }) => {
    await page.locator(lname_input).fill(`${validUserData.lname.padEnd(20, 'z')}`);
    await page.locator(lname_input).blur();
    let validationElement = page.locator(lname_input);
    let actualText = await validationElement.innerText();
    expect(actualText.length).toBeLessThanOrEqual(20);
    expect(validationElement).toHaveValue(regex_name);
});

test("Check email with valid format", async ({ page }) => {
    await page.locator(email_input).fill(`${validUserData.email}`);
    await page.locator(email_input).blur();
    expect(page.locator(email_input)).toHaveValue(regex_email);
});

test("Check min. Password length (8 char: min 1 int 1 caplet, 1 small)", async ({ page }) => {
    await page.locator(password_input).fill(`${validUserData.password.slice(-8)}`);
    await page.locator(password_input).blur();
    let validationElement = page.locator(password_input);
    let actualText = await validationElement.innerText();
    expect(actualText.length).toBeLessThanOrEqual(8);
    expect(validationElement).toHaveValue(regex_password);
});

test("Check max. Password length (15 char: min 1 int 1 caplet, 1 small)", async ({ page }) => {
    await page.locator(password_input).fill(`${validUserData.password.padEnd(15, 'z')}`);
    await page.locator(password_input).blur();
    let validationElement = page.locator(password_input);
    let actualText = await validationElement.innerText();
    expect(actualText.length).toBeLessThanOrEqual(15);
    expect(validationElement).toHaveValue(regex_password);
});

//-------------------------------------------------------------NEGATIVE--------------------------------------------------------------------------------------------

test("[-] Check validation when Name has invalid format", async ({ page }) => {
    await page.locator(name_input).fill(`${validUserData.name}.`);
    await page.locator(name_input).blur();
    await expect(page.locator(name_validation)).toContainText('Name is invalid');
    await expect(page.locator(name_validation)).toHaveCSS('color', 'rgb(220, 53, 69)');
    await expect(page.locator(name_input)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
});

test("[-] Check validation when Name is too short(< 2)", async ({ page }) => {
    await page.locator(name_input).fill(`${validUserData.name.slice(-1)}`);
    await page.locator(name_input).blur();
    await expect(page.locator(name_validation)).toContainText('Name has to be from 2 to 20 characters long');
    await expect(page.locator(name_validation)).toHaveCSS('color', 'rgb(220, 53, 69)');
    await expect(page.locator(name_input)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
});

test("[-] Check validation when Name is too long(> 20)", async ({ page }) => {
    await page.locator(name_input).fill(`${validUserData.name.padEnd(21, 'z')}`);
    await page.locator(name_input).blur();
    await expect(page.locator(name_validation)).toContainText('Name has to be from 2 to 20 characters long');
    await expect(page.locator(name_validation)).toHaveCSS('color', 'rgb(220, 53, 69)');
    await expect(page.locator(name_input)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
});

test("[-] Check validation when Last Name has invalid format", async ({ page }) => {
    await page.locator(lname_input).fill(`${validUserData.lname}.`);
    await page.locator(lname_input).blur();
    await expect(page.locator(lname_validation)).toContainText('Last name is invalid');
    await expect(page.locator(lname_validation)).toHaveCSS('color', 'rgb(220, 53, 69)');
    await expect(page.locator(lname_input)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
});

test("[-] Check validation when Last Name is too short(< 2)", async ({ page }) => {
    await page.locator(lname_input).fill(`${validUserData.lname.slice(-1)}`);
    await page.locator(lname_input).blur();
    await expect(page.locator(lname_validation)).toContainText('Last name has to be from 2 to 20 characters long');
    await expect(page.locator(lname_validation)).toHaveCSS('color', 'rgb(220, 53, 69)');
    await expect(page.locator(lname_input)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
});

test("[-] Check validation when Last Name is too long(> 20)", async ({ page }) => {
    await page.locator(lname_input).fill(`${validUserData.lname.padEnd(21, 'z')}`);
    await page.locator(lname_input).blur();
    await expect(page.locator(lname_validation)).toContainText('Last name has to be from 2 to 20 characters long');
    await expect(page.locator(lname_validation)).toHaveCSS('color', 'rgb(220, 53, 69)');
    await expect(page.locator(lname_input)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
});

test("[-] Check validation when Email has invalid format", async ({ page }) => {
    await page.locator(email_input).fill(` ${validUserData.email} `);
    await page.locator(email_input).blur();
    expect(page.locator(email_input)).not.toHaveValue(regex_email);
    await expect(page.locator(email_validation)).toContainText('Email is incorrect');
    await expect(page.locator(email_validation)).toHaveCSS('color', 'rgb(220, 53, 69)');
    await expect(page.locator(email_input)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
});

test("[-] Check validation when Password is too long(< 8)", async ({ page }) => {
    await page.locator(password_input).fill(`${validUserData.password.slice(-7)}`);
    await page.locator(password_input).blur();
    await expect(page.locator(password_validation)).toContainText('Password has to be from 8 to 15 characters long');
    await expect(page.locator(password_validation)).toHaveCSS('color', 'rgb(220, 53, 69)');
    await expect(page.locator(password_input)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
});

test("[-] Check validation when Password is too long(> 15)", async ({ page }) => {
    await page.locator(password_input).fill(`${validUserData.password.padEnd(16, randomChar())}`);
    await page.locator(password_input).blur();
    await expect(page.locator(password_validation)).toContainText('Password has to be from 8 to 15 characters long');
    await expect(page.locator(password_validation)).toHaveCSS('color', 'rgb(220, 53, 69)');
    await expect(page.locator(password_input)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
});

test("[-] Check validation when password and re-enter password do not match", async ({ page }) => {
    await page.locator(password_input).fill(`${validUserData.password}`);
    await page.locator(repeatPassword_input).fill(` ${validUserData.password} `);
    await page.locator(repeatPassword_input).blur();
    await expect(page.locator(repeatPassword_validation)).toContainText('Passwords do not match');
    await expect(page.locator(repeatPassword_validation)).toHaveCSS('color', 'rgb(220, 53, 69)');
    await expect(page.locator(repeatPassword_input)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
});