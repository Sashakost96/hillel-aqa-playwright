import { Locator, Page } from "@playwright/test";
import { UserData } from "../UserDataInterface";
export default class RestoreAccessForm {
    private readonly page: Page;
    readonly title: Locator;
    readonly email_label: Locator;
    readonly email_input: Locator;
    readonly close_btn: Locator;
    readonly send_btn: Locator;
    readonly email_validation: Locator;
    readonly regex_email: RegExp;
    readonly input_red: string;
    readonly border_blue: string;
    readonly border_default: string;
    readonly sentBtn_color: string;
    readonly sentBtnBg_color: string;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('//app-forgot-password-modal/div[1]/h4');
        this.email_label = page.locator('//app-forgot-password-modal/div[2]//label');
        this.email_input = page.locator('//app-forgot-password-modal/div[2]//input');
        this.send_btn = page.locator('//button[text()="Send"]');
        this.close_btn = page.locator('//app-forgot-password-modal/div[1]//button');
        this.email_validation = page.locator('//div[@class="invalid-feedback"]/p');

        this.regex_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this.input_red = 'rgb(220, 53, 69)';
        this.border_blue = 'rgb(92, 179, 253)';
        this.border_default = 'rgb(206, 212, 218)';
        this.sentBtn_color = 'rgb(255, 255, 255)';
        this.sentBtnBg_color = 'rgb(2, 117, 216)';
    }

    async enterEmail(email: string): Promise<void> {
        await this.email_input.fill(email);
    }

    async clickOnSendBtn(): Promise<void> {
        await this.send_btn.click();
    }

    async clickOnCloseBtn(): Promise<void> {
        await this.close_btn.click();
    }

    async FillFormWithEmail(data: UserData): Promise<void> {
        await this.enterEmail(data.email);
        // await this.clickOnRegistrationBtn();
    }
}
