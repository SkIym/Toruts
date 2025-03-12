import { test, expect } from '@playwright/test';
import { quickDelete, quickSignup, quickLogin, logout, done, deleteWith } from './helper';

test.describe.configure({ mode: 'parallel' });

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState();
});

test.describe('Test Case 1: Visibility', () => {
    test.skip('Test Case 1.1: Home Page', async({ page }) => {
        const heading = await page.getByRole('heading', { name: /Toruts/ });
        const search = await page.getByTestId('search');
        const minPrice = await page.getByTestId('minPrice');
        const maxPrice = await page.getByTestId('maxPrice');
        const searchButton = await page.getByRole('button', { name: /Search/ });

        await expect(heading).toBeVisible();
        await page.waitForTimeout(5000);

        await expect(search).toBeVisible();
        await expect(search).toHaveAttribute('type', 'text');
        
        await expect(minPrice).toBeVisible();
        await expect(minPrice).toHaveAttribute('type', 'number');
        
        await expect(maxPrice).toBeVisible();
        await expect(maxPrice).toHaveAttribute('type', 'number');

        await expect(searchButton).toBeVisible();

        done('1.1');
    })

    test.skip('Test Case 1.2: Login Page', async({ page }) => {
        await page.goto('/login');
        await page.waitForLoadState();

        const heading = await page.getByRole('heading', { name: /Toruts/ });
        const username = await page.getByTestId('username');
        const password = await page.getByTestId('password');
        const loginButton = await page.getByRole('button', { name: /Login/ });
        const signupButton = await page.getByRole('button', { name: /Sign up/ });

        await expect(heading).toBeVisible();
        await expect(username).toBeVisible();
        await expect(password).toBeVisible();
        await expect(loginButton).toBeVisible();
        await expect(signupButton).toBeVisible();

        await expect(username).toHaveValue('');
        await expect(username).toHaveAttribute('type', 'text');
        
        await expect(password).toHaveValue('');
        await expect(password).toHaveAttribute('type', 'password');
        
        done('1.2');
    })

    test.skip('Test Case 1.3: Signup Page', async ({ page }) => {
        await page.goto('/signup');
        await page.waitForLoadState();

        const heading = await page.getByRole('heading', { name: /Sign up/ });
        const username = await page.getByTestId('username');
        const email = await page.getByTestId('email');
        const password = await page.getByTestId('password');
        const loginButton = await page.getByRole('button', { name: /Login/ });
        const signupButton = await page.getByRole('button', { name: /Sign up/ });
        
        await expect(heading).toBeVisible();
        await expect(username).toBeVisible();
        await expect(email).toBeVisible();
        await expect(password).toBeVisible();
        await expect(loginButton).toBeVisible();
        await expect(signupButton).toBeVisible();

        await expect(username).toHaveValue('');
        await expect(username).toHaveAttribute('type', 'text');
        
        await expect(email).toHaveValue('');
        await expect(email).toHaveAttribute('type', 'text');

        await expect(password).toHaveValue('');
        await expect(password).toHaveAttribute('type', 'password');

        done('1.3');
    })

    test('Test Case 1.4: Update Profile Page', async ({ page }) => {
        await quickSignup(page, '1-4');

        const test = await page.getByTestId('heading').innerText();
        
        console.log(`Test: ${test}`)
        if (test == 'Sign up') {
            await deleteWith(page, 'test-case-1-4', 'Abc123!?');
            await page.waitForLoadState();
            await quickSignup(page, '1-4');
        }
        
        await expect(page.getByTestId('heading')).toHaveText(/Who/);
        await expect(page.getByTestId('student-button')).toBeVisible();
        
        const test2 = await page.getByTestId('heading').innerText();
        console.log(`Test: ${test2}`)

        await expect(page.getByTestId('heading-tutor')).toBeVisible();
        await expect(page.getByTestId('create')).toBeVisible();
        await expect(page.getByTestId('educ')).toBeVisible();
        await expect(page.getByTestId('venue')).toBeVisible();
        await expect(page.getByTestId('price')).toBeVisible();
        await expect(page.getByTestId('areaExp')).toBeVisible();
        await expect(page.getByTestId('tutorExp')).toBeVisible();
        await expect(page.getByTestId('avail')).toBeVisible();
        await expect(page.getByTestId('portrait')).toBeVisible();
        await expect(page.getByTestId('mode-online')).toBeVisible();
        await expect(page.getByTestId('mode-f2f')).toBeVisible();
        await expect(page.getByTestId('mode-both')).toBeVisible();
        await expect(page.getByTestId('status-active')).toBeVisible();
        await expect(page.getByTestId('status-inactive')).toBeVisible();

        await page.getByTestId('student-button').click();
        await page.waitForLoadState();
        await page.waitForTimeout(1000);
        
        await expect(page.getByTestId('tutor-button')).toBeVisible();
        await expect(page.getByTestId('heading-student')).toBeVisible();
        await expect(page.getByTestId('create')).toBeVisible();
        await expect(page.getByTestId('areas')).toBeVisible();
        await expect(page.getByTestId('degree')).toBeVisible();

        await page.getByTestId('create').click();
        await page.waitForLoadState();
        await page.waitForTimeout(1000);

        await quickDelete(page);
        
        done('1.4');
    })

    test.skip('Test Case 1.5: Profile Page', async ({ page }) => {
        await quickLogin(page, '1-5');
        await page.goto('/profile');
        await page.waitForLoadState();
        await page.waitForTimeout(500);

        await expect(page.getByRole('heading', { name: /HELLO/ })).toHaveText(/test-case-1/);
        await expect(page.getByText(/First/)).toHaveText(/Test/);
        await expect(page.getByText(/Last/)).toHaveText(/Case/);
        await expect(page.getByText(/Phone/)).toHaveText(/1/);

        await logout(page);
        
        done('1.5');
    })
})