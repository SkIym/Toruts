import { test, expect } from '@playwright/test';
import { quickDelete, quickSignup, quickLogin, logout, done, deleteWith, loadPage, clickButton, loadForm } from './helper';
import { TEST } from '../web/src/constants'

test.describe.configure({ mode: 'parallel' });

// test.beforeEach(async ({ page }) => {
//     await page.goto('/');
//     await page.waitForLoadState();
// });

test.describe('Test Case 1: Visibility', () => {
    test('Test Case 1.1: Home Page', async({ page }) => {
        await page.goto('/');
        await page.waitForLoadState();

        await expect(page.getByTestId(TEST.input('search'))).toBeVisible();
        await expect(page.getByTestId(TEST.input('search'))).toHaveAttribute('type', 'text');
        
        await expect(page.getByTestId(TEST.input('min-price'))).toBeVisible();
        await expect(page.getByTestId(TEST.input('min-price'))).toHaveAttribute('type', 'number');
        
        await expect(page.getByTestId(TEST.input('max-price'))).toBeVisible();
        await expect(page.getByTestId(TEST.input('max-price'))).toHaveAttribute('type', 'number');

        await expect(page.getByTestId(TEST.button('search'))).toBeVisible();

        await page.getByTestId(TEST.button('search')).click();

        const responsePromise = page.waitForResponse('**/api/tutors/search/?query=')
        console.log(`ResponsePromise: ${responsePromise}`)
        const response = await responsePromise
        console.log(response)

        done('1.1');
    })

    test('Test Case 1.2: Login Page', async({ page }) => {
        await page.goto('/login');
        await page.waitForLoadState()

        await expect(page.getByTestId(TEST.input('username'))).toBeVisible();
        await expect(page.getByTestId(TEST.input('password'))).toBeVisible();
        await expect(page.getByTestId(TEST.button('login'))).toBeVisible();
        await expect(page.getByTestId(TEST.button('signup'))).toBeVisible();

        const response = await responsePromise
        console.log(`Response: ${response}`)
        
        done('1.2');
    })

    test('Test Case 1.3: Signup Page', async ({ page }) => {
        await page.goto('/signup');
        await page.waitForLoadState();
        
        await expect(page.getByTestId(TEST.input('username'))).toBeVisible();
        await expect(page.getByTestId(TEST.input('email'))).toBeVisible();
        await expect(page.getByTestId(TEST.input('password'))).toBeVisible();
        await expect(page.getByTestId(TEST.button('login'))).toBeVisible();
        await expect(page.getByTestId(TEST.button('signup'))).toBeVisible();

        await expect(page.getByTestId(TEST.input('password'))).toHaveValue('');
        await expect(page.getByTestId(TEST.input('password'))).toHaveAttribute('type', 'password');

        done('1.3');
    })

    test('Test Case 1.4: Update Profile Page', async ({ page }) => {
        await quickSignup(page, '1-4');
        
        await expect(page.getByTestId(TEST.form('select')));

        await clickButton(page, 'student-button');
        await page.waitForLoadState();
        await loadForm(page, 'student-form');
        
        await expect(page.getByTestId('tutor-button')).toBeVisible();
        await expect(page.getByTestId('heading-student')).toBeVisible();
        await expect(page.getByTestId('create')).toBeVisible();
        await expect(page.getByTestId('areas')).toBeVisible();
        await expect(page.getByTestId('degree')).toBeVisible();

        await clickButton(page, 'create');
        await page.waitForLoadState();
        await page.waitForTimeout(1000);

        await quickDelete(page);
        
        done('1.4');
    })

    test('Test Case 1.5: Profile Page', async ({ page }) => {
        await quickLogin(page, '1-5');
        await page.goto('/profile');
        await loadPage(page, 'profile')

        await expect(page.getByTestId('heading')).toHaveText(/Test/);
        await expect(page.getByText(/First/)).toHaveText(/Test/);
        await expect(page.getByText(/Last/)).toHaveText(/Case/);
        await expect(page.getByText(/Phone/)).toHaveText(/1/);

        await logout(page);
        
        done('1.5');
    })

    test('Test Case 1.6: Tutor Profile Page', async ({ page }) => {
        await quickLogin(page, '1-6');
        await page.goto('/profile');
        await loadPage(page, 'profile');

        await expect(page.getByTestId('heading')).toHaveText(/Test/);
        await expect(page.getByTestId('tutor-profile')).toBeVisible();

        await logout(page);

        done('1.6');
    })

    test('Test Case 1.7: Student Profile Page', async ({ page }) => {
        await quickLogin(page, '1-7');
        await page.goto('/profile');
        await loadPage(page, 'profile');

        await expect(page.getByTestId('heading')).toHaveText(/Test/);
        await expect(page.getByTestId('student-profile')).toBeVisible();

        await logout(page);

        done('1.7');
    })
})