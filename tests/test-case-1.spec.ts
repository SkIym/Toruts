import { test, expect } from '@playwright/test';
import { quickDelete, quickSignup, quickLogin, logout, done } from './helper';

test.describe.configure({ mode: 'parallel' });

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState();
});

test.describe('Test Case 1: Visibility', () => {
    test('Test Case 1.1: Home Page', async({ page }) => {
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

    test('Test Case 1.2: Login Page', async({ page }) => {
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

    test('Test Case 1.3: Signup Page', async ({ page }) => {
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
        await page.waitForLoadState();

        const heading = await page.getByRole('heading', { name: /Update/});
        const firstName = await page.getByTestId('first-name');
        const lastName = await page.getByTestId('last-name');
        const phoneNumber = await page.getByTestId('phone-number');
        const updateButton = await page.getByRole('button', { name: /Update/ })
        
        await expect(heading).toBeVisible();
        await expect(firstName).toBeVisible();
        await expect(lastName).toBeVisible();
        await expect(phoneNumber).toBeVisible();
        await expect(updateButton).toBeVisible();

        const toStudentButton = await page.getByRole('button', { name: /student/ });

        await expect(page.getByRole('heading', { name: /tutor/ })).toBeVisible();
        await expect(toStudentButton).toBeVisible();
        await expect(page.getByRole('button', { name: /Create/ })).toBeVisible();
        await expect(page.getByTestId('educ')).toBeVisible();
        await expect(page.getByTestId('venue')).toBeVisible();
        await expect(page.getByTestId('price')).toBeVisible();
        await expect(page.getByTestId('areaExp')).toBeVisible();
        await expect(page.getByTestId('tutorExp')).toBeVisible();
        await expect(page.getByTestId('avail')).toBeVisible();
        await expect(page.getByTestId('portrait')).toBeVisible();
        await expect(page.getByRole('radio', { name: /Online/} )).toBeVisible();
        await expect(page.getByRole('radio', { name: /F2F/} )).toBeVisible();
        await expect(page.getByRole('radio', { name: /Both/} )).toBeVisible();
        await expect(page.getByRole('radio', { name: /Active/} )).toBeVisible();
        await expect(page.getByRole('radio', { name: /Inactive/} )).toBeVisible();

        await toStudentButton.click();
        await page.waitForLoadState();

        await expect(page.getByRole('heading', { name: /student/ })).toBeVisible();
        await expect(page.getByRole('button', { name: /tutor/ })).toBeVisible();
        await expect(page.getByRole('button', { name: /student/ })).toBeVisible();
        await expect(page.getByTestId('areas')).toBeVisible();
        await expect(page.getByTestId('degree')).toBeVisible();

        await quickDelete(page);
        
        done('1.4');
    })

    test('Test Case 1.5: Profile Page', async ({ page }) => {
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