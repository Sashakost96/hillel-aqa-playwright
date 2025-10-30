import { expect, Locator, Page } from "@playwright/test";

export default class HomePage {
    private readonly page: Page;

    private readonly signUp_btn: Locator;
    private readonly signIn_btn: Locator;
    private readonly signUp_model: Locator;
    private readonly signIn_model: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.signUp_btn = page.locator('//button[@class="hero-descriptor_btn btn btn-primary"]');
        this.signIn_btn = page.locator('//button[contains(text(), "Sign In")]');
        this.signUp_model = page.locator('//div[@class="modal-content"]');
        this.signIn_model = page.locator('//div[@class="modal-content"]');

    };

    async openSignUpForm(): Promise <void> {
        await this.signUp_btn.click();
    };

    async signUpFormIslDisplay(): Promise <void> {
         await expect(this.signUp_model).toBeVisible();
    };

    async signUpFormIsNotDisplay(): Promise <void> {
         await expect(this.signUp_model).not.toBeVisible();
    };

    async openSignInForm(): Promise <void> {
        await this.signIn_btn.click();
    };

    async signInFormIslDisplay(): Promise <void> {
         await expect(this.signIn_model).toBeVisible();
    };
    
    async signInFormIsNotDisplay(): Promise <void> {
         await expect(this.signIn_model).not.toBeVisible();
    };


}