import { Locator, Page } from "@playwright/test";
import { UserData } from "../UserDataInterface";
export default class SignInForm {
    private readonly page: Page;
    readonly title: Locator;
    readonly email_label: Locator;
    readonly password_label: Locator;
    readonly email_input: Locator;
    readonly password_input: Locator;
    readonly close_btn: Locator;
    readonly login_btn: Locator;
    readonly registration_btn: Locator;
    readonly forgotPass_btn: Locator;
    readonly rememberMe_checkbox: Locator;
    readonly rememberMe_label: Locator;
    readonly email_validation: Locator;
    readonly password_validation: Locator;
    readonly loginError: Locator;
    readonly regex_email: RegExp;
    readonly regex_password: RegExp;
    readonly alert_red: string;
    readonly alertBg_red: string;
    readonly alertBorder_red: string;

    readonly input_red: string;
    readonly border_blue: string;
    // readonly border_default: string;
    // readonly regBtn_color: string;
    // readonly regBtnBg_color: string;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('//h4[@class="modal-title"]');
        this.email_label = page.locator('//label[@for="signinEmail"]');
        this.password_label = page.locator('//label[@for="signinPassword"]');
        this.email_input = page.locator('//input[@id="signinEmail"]');
        this.password_input = page.locator('//input[@id="signinPassword"]');
        this.close_btn = page.locator('//button[@class="close"]');
        this.login_btn = page.locator('//button[text()="Login"]');
        this.registration_btn = page.locator('//button[text()="Registration"]');
        this.forgotPass_btn = page.locator('//button[text()="Forgot password"]');
        this.rememberMe_checkbox = page.locator('//input[@id="remember"]');
        this.rememberMe_label = page.locator('//label[@class="form-check-label"]');
        this.email_validation = page.locator('//p[contains(text(), "Email")]');
        this.password_validation = page.locator('//p[contains(text(), "Password")]');
        this.loginError = page.locator('//p[@class="alert alert-danger"]');
        this.regex_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this.regex_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,15}$/;
        this.alert_red = 'rgb(114, 28, 36)';
        this.alertBg_red = 'rgb(248, 215, 218)';
        this.alertBorder_red = 'rgb(245, 198, 203)';
        this.input_red = 'rgb(220, 53, 69)';
        this.border_blue = 'rgb(92, 179, 253)';
        // this.border_default = 'rgb(206, 212, 218)';
        // this.regBtn_color = 'rgb(255, 255, 255)';
        // this.regBtnBg_color = 'rgb(2, 117, 216)';
    }

    async enterEmail(email: string): Promise<void> {
        await this.email_input.fill(email);
    }

    async enterPassword(password: string): Promise<void> {
        await this.password_input.fill(password);
    }

    async clickOnLoginBtn(): Promise<void> {
        await this.login_btn.click();
    }

    async clickOnRegistrationBtn(): Promise<void> {
        await this.registration_btn.click();
    }

    async clickOnCloseBtn(): Promise<void> {
        await this.close_btn.click();
    }

    async SuccessfulSignIn(data: UserData): Promise<void> {
        await this.enterEmail(data.email);
        await this.enterPassword(data.password);
        // await this.clickOnRegistrationBtn();
    }

    async UnsuccessfulSignIn(data: UserData): Promise<void> {
        await this.enterEmail(data.email);
        await this.enterPassword(data.password);
        //await this.clickOnRegistrationBtn();
    }

    async SwitchToSignUpForm(): Promise <void> {
        await this.registration_btn.click();
    }

    async NavigateToRestoreAccessForm(): Promise<void> {
        await this.forgotPass_btn.click();
        
    }
}
