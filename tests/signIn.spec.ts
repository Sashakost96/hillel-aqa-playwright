import { test, expect } from '@playwright/test';

test('Open QAauto website', async ({page}) => {
    await page.goto('/');
})