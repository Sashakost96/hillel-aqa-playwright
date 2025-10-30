import { Locator, Page } from "@playwright/test";
import { UserData } from "../UserDataInterface";
export default class SignUpForm {
    private readonly page: Page;

    readonly title: Locator;
    readonly name_label: Locator;
    readonly lname_label: Locator;
    readonly email_label: Locator;
    readonly password_label: Locator;
    readonly repeatPassword_label: Locator;

    readonly name_input: Locator;
    readonly lname_input: Locator;
    readonly email_input: Locator;
    readonly password_input: Locator;
    readonly repeatPassword_input: Locator;
    readonly close_btn: Locator;
    readonly register_btn: Locator;

    readonly registrationError1: Locator;
    readonly name_validation: Locator;
    readonly name_hasBe: Locator;
    readonly name_required: Locator;
    readonly lname_validation: Locator;
    readonly lname_hasBe: Locator;
    readonly lname_required: Locator;
    readonly email_validation: Locator;
    readonly password_validation: Locator;
    readonly repeatPassword_validation: Locator;

    readonly regex_email: RegExp;
    readonly regex_name: RegExp;
    readonly regex_password: RegExp;
    readonly alert_red: string;
    readonly alertBg_red: string;
    readonly alertBorder_red: string;
    readonly input_red: string;
    readonly border_blue: string;
    readonly border_default: string;
    readonly regBtn_color: string;
    readonly regBtnBg_color: string;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('//div[@class="modal-content"]//h4');
        this.name_label = page.locator('//div[@class="form-group"][1]/label');
        this.lname_label = page.locator('//div[@class="form-group"][2]/label');
        this.email_label = page.locator('//div[@class="form-group"][3]/label');
        this.password_label = page.locator('//div[@class="form-group"][4]/label');
        this.repeatPassword_label = page.locator('//div[@class="form-group"][5]/label');
        this.name_input = page.locator('//div[@class="form-group"][1]/input');
        this.lname_input = page.locator('//div[@class="form-group"][2]/input');
        this.email_input = page.locator('//div[@class="form-group"][3]/input');
        this.password_input = page.locator('//div[@class="form-group"][4]/input');
        this.repeatPassword_input = page.locator('//div[@class="form-group"][5]/input');
        this.close_btn = page.locator('//div[@class="modal-header"]/button[@class="close"]');
        this.register_btn = page.locator('//div[@class="modal-footer"]/button[@class="btn btn-primary"]');

        this.registrationError1 = page.locator('//form[@class="ng-dirty ng-touched ng-valid"]/p[@class="alert alert-danger"]');
        this.name_required = page.locator('//input[@name="name"]/following-sibling::div[@class="invalid-feedback"]/p');
        this.name_validation = page.locator('//div[@class="invalid-feedback"]/p[1]');
        this.name_hasBe = page.locator('//div[@class="invalid-feedback"]/p[2]');

        this.lname_required = page.locator('//input[@name="lastName"]/following-sibling::div[@class="invalid-feedback"]/p');
        this.lname_validation = page.locator('//div[@class="invalid-feedback"]/p[1]');
        this.lname_hasBe = page.locator('//div[@class="invalid-feedback"]/p[2]');
        this.email_validation = page.locator('//input[@name="email"]/following-sibling::div[@class="invalid-feedback"]/p');
        this.password_validation = page.locator('//input[@name="password"]/following-sibling::div[@class="invalid-feedback"]/p');
        this.repeatPassword_validation = page.locator('//input[@name="repeatPassword"]/following-sibling::div[@class="invalid-feedback"]/p');

        this.regex_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this.regex_name = /^[A-Za-z]{2,20}$/;
        this.regex_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,15}$/;
        this.alert_red = 'rgb(114, 28, 36)';
        this.alertBg_red = 'rgb(248, 215, 218)';
        this.alertBorder_red = 'rgb(245, 198, 203)';
        this.input_red = 'rgb(220, 53, 69)';
        this.border_blue = 'rgb(92, 179, 253)';
        this.border_default = 'rgb(206, 212, 218)';
        this.regBtn_color = 'rgb(255, 255, 255)';
        this.regBtnBg_color = 'rgb(2, 117, 216)';
    }

    async enterName(name: string): Promise<void> {
        await this.name_input.fill(name);

    }
    async enterLName(lname: string): Promise<void> {
        await this.lname_input.fill(lname);

    }
    async enterEmail(email: string): Promise<void> {
        await this.email_input.fill(email);

    }
    async enterPassword(password: string): Promise<void> {
        await this.password_input.fill(password);

    }
    async enterRepeatPassword(password: string): Promise<void> {
        await this.repeatPassword_input.fill(password);

    }

    async clickOnRegistrationBtn(): Promise<void> {
        await this.register_btn.click();

    }
    async clickOnCloseBtn(): Promise<void> {
        await this.close_btn.click();
    }
    async SuccessfulSignUp(data: UserData): Promise<void> {
        await this.enterName(data.name);
        await this.enterLName(data.lname);
        await this.enterEmail(data.email);
        await this.enterPassword(data.password);
        await this.enterRepeatPassword(data.password)
        // await this.clickOnRegistrationBtn();
    }
    async UnsuccessfulSignUp(data: UserData): Promise<void> {
        await this.enterName(data.name);
        await this.enterLName(data.lname);
        await this.enterEmail(data.email);
        await this.enterPassword(data.password);
        await this.enterRepeatPassword(data.password)
        //await this.clickOnRegistrationBtn();
    }
}
