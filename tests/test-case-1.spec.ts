import { test, expect } from '@playwright/test';
import { quickDelete, quickSignup, quickLogin, logout, done, deleteWith, loadPage, clickButton, loadForm } from './helper';
import { PATH, TEST } from '../web/src/constants'

test.describe.configure({ mode: 'parallel' });

// test.beforeEach(async ({ page }) => {
//     await page.goto('/');
//     await page.waitForLoadState();
// });

test.describe('Test Case 1: Visibility', () => {
    test('Test Case 1.1: Home Page', async({ page }) => {
        await page.goto(PATH.home);
        await page.waitForLoadState();

        await expect(page.getByTestId(TEST.input('search'))).toBeVisible();
        await expect(page.getByTestId(TEST.input('search'))).toHaveAttribute('type', 'text');
        
        await expect(page.getByTestId(TEST.input('min-price'))).toBeVisible();
        await expect(page.getByTestId(TEST.input('min-price'))).toHaveAttribute('type', 'number');
        
        await expect(page.getByTestId(TEST.input('max-price'))).toBeVisible();
        await expect(page.getByTestId(TEST.input('max-price'))).toHaveAttribute('type', 'number');

        await expect(page.getByTestId(TEST.button('search'))).toBeVisible();

        done('1.1');
    })

    test('Test Case 1.2: Login Page', async({ page }) => {
        await page.goto(PATH.login);
        await page.waitForLoadState()

        await expect(page.getByTestId(TEST.input('username'))).toBeVisible();
        await expect(page.getByTestId(TEST.input('password'))).toBeVisible();
        await expect(page.getByTestId(TEST.button('login'))).toBeVisible();
        await expect(page.getByTestId(TEST.button('signup'))).toBeVisible();
        
        done('1.2');
    })

    test('Test Case 1.3: Signup Page', async ({ page }) => {
        await page.goto(PATH.SIGNUP.default);
        await page.waitForLoadState();
        
        await expect(page.getByTestId(TEST.input('username'))).toBeVisible();
        await expect(page.getByTestId(TEST.input('email'))).toBeVisible();
        await expect(page.getByTestId(TEST.input('password'))).toBeVisible();
        await expect(page.getByTestId(TEST.button('login'))).toBeVisible();
        await expect(page.getByTestId(TEST.button('signup'))).toBeVisible();

        await expect(page.getByTestId(TEST.input('password'))).toHaveAttribute('type', 'password');

        done('1.3');
    })

    test('Test Case 1.4: Update Profile Page', async ({ page }) => {
        await quickSignup(page, '1-4');
        await page.waitForURL(`**${PATH.select}`);
        await expect(page.getByTestId(TEST.form('tutor'))).toBeVisible();

        await clickButton(page, 'switch');
        await page.waitForLoadState();
        await expect(page.getByTestId(TEST.form('student'))).toBeVisible();

        await expect(page.getByTestId(TEST.button('create'))).toBeVisible();
        await expect(page.getByTestId(TEST.input('areas'))).toBeVisible();
        await expect(page.getByTestId(TEST.input('degree'))).toBeVisible();

        await page.getByTestId(TEST.input('areas')).fill('test');

        await clickButton(page, 'create');
        await page.waitForURL(`**${PATH.PROFILE.default}`);

        await quickDelete(page);

        done('1.4');
    })

    test('Test Case 1.5: Profile Page', async ({ page }) => {
        await quickLogin(page, '1-5');
        await expect(page.getByTestId(TEST.page('home'))).toBeVisible();
        await page.goto(PATH.PROFILE.default);
        await page.waitForURL(`**${PATH.PROFILE.default}`)

        await expect(page.getByTestId(TEST.page('profile'))).toBeVisible();

        await logout(page);
        
        done('1.5');
    })

    test('Test Case 1.6: Tutor Profile Page', async ({ page }) => {
        await quickLogin(page, '1-6');
        await expect(page.getByTestId(TEST.page('home'))).toBeVisible();
        await page.goto(PATH.PROFILE.default);
        await page.waitForURL(`**${PATH.PROFILE.default}`)

        await expect(page.getByTestId(TEST.profile('tutor'))).toBeVisible();

        await logout(page);

        done('1.6');
    })

    test('Test Case 1.7: Student Profile Page', async ({ page }) => {
        await quickLogin(page, '1-7');
        await expect(page.getByTestId(TEST.page('home'))).toBeVisible();
        await page.goto(PATH.PROFILE.default);
        await page.waitForURL(`**${PATH.PROFILE.default}`)

        await expect(page.getByTestId(TEST.profile('student'))).toBeVisible();

        await logout(page);

        done('1.7');
    })

    test('Test Case 1.8: Select Page', async ({ page }) => {
        await quickSignup(page, '1-8');
        await page.waitForURL(`**${PATH.select}`);

        await expect(page.getByTestId(TEST.form('tutor'))).toBeVisible();
        
        await clickButton(page, 'switch');

        await expect(page.getByTestId(TEST.form('student'))).toBeVisible();

        await page.getByTestId(TEST.input('areas')).fill('test');
        await clickButton(page, 'create');
        await page.waitForURL(`**${PATH.PROFILE.default}`)

        await quickDelete(page);

        done('1.8')
    })
    
    test('Test Case 1.9: Signup Student Page', async ({ page }) => {
        await page.goto(PATH.SIGNUP.student);
        await page.waitForURL(`**${PATH.SIGNUP.student}`)
        
        await expect(page.getByTestId(TEST.form('student'))).toBeVisible();

        done('1.9');
    })
    
    test('Test Case 1.10: Signup Tutor Page', async ({ page }) => {
        await page.goto(PATH.SIGNUP.tutor);
        await page.waitForURL(`**${PATH.SIGNUP.tutor}`)
        
        await expect(page.getByTestId(TEST.form('tutor'))).toBeVisible();

        done('1.10');
    })
})