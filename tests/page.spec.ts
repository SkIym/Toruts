import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.describe('Test Pages', () => {
    test('Login Page', async ({ page }) => {
        // Test if Login Page has the important elements

        const heading  = await page.getByRole('heading', { name: /Toruts/ });
        const username = await page.getByTestId('username');
        const password = await page.getByTestId('password');
        const loginButton = await page.getByRole('button', { name: /Login/ });
        const signupButton = await page.getByRole('button', { name: /Sign up/ });

        await expect(heading).toBeVisible();

        await expect(username).toHaveValue('');
        await expect(username).toHaveAttribute('type', 'text');

        await expect(password).toHaveValue('');
        await expect(password).toHaveAttribute('type', 'password');

        await expect(loginButton).toHaveText(/Login/);
        await expect(loginButton).toHaveAttribute('type', 'submit');
        
        await expect(signupButton).toHaveText(/Sign up/);
        await expect(signupButton).not.toHaveAttribute('type', 'submit');
    });

    test('Signup Page', async ({ page }) => {
        // Test if Signup Page has the important elements
        await page.getByRole('button', { name: /Sign up/ }).click();

        const heading = await page.getByRole('heading', { name: /Sign up/ });
        const username = await page.getByTestId('username');
        const password = await page.getByTestId('password');
        const loginButton = await page.getByRole('button', { name: /Login/ });
        const signupButton = await page.getByRole('button', { name: /Sign up/ });

        await expect(heading).toBeVisible();

        await expect(username).toHaveValue('');
        await expect(username).toHaveAttribute('type', 'text');

        await expect(password).toHaveValue('');
        await expect(password).toHaveAttribute('type', 'password');

        await expect(loginButton).toHaveText(/Login/);
        await expect(loginButton).not.toHaveAttribute('type', 'submit');
        
        await expect(signupButton).toHaveText(/Sign up/);
        await expect(signupButton).toHaveAttribute('type', 'submit');
    })

    test('Profile Page', async ({ page }) => {
        // Test if Profile Page can be accessed
        await page.getByTestId('username').fill('admin')
        await page.getByTestId('password').fill('Abc123!?')
        await page.getByRole('button', { name: 'Login' }).click()

        const heading = await 
        await expect(page.getByText('OMG HELLO')).toBeVisible();
    })

    test('Info Page', async ({ page }) => {
        // Test if Info Page can be accessed and has the important components
        
        await page.getByRole('button', { name: /Sign up/ }).click();

        await page.getByTestId('username').fill('new-user')
        await page.getByTestId('email').fill('new@user.com')
        await page.getByTestId('password').fill('Abc123!?')
        await page.getByRole('button', { name : /Sign up/}).click()

        const heading = await page.getByRole('heading', { name: /Update/ });
        const firstName = await page.getByTestId('first-name');
        const lastName  = await page.getByTestId('last-name');
        const button    = await page.getByRole('button', { name: 'Upload' });
        
        await expect(heading).toBeVisible()

        await expect(firstName).toHaveValue('');
        await expect(firstName).toHaveAttribute('type', 'text');

        await expect(lastName).toHaveValue('');
        await expect(lastName).toHaveAttribute('type', 'text');

        await expect(button).toHaveText(/Upload/);
        await expect(button).toHaveAttribute('type', 'submit');

        await page.goto('/');
        await page.getByRole('button', { name: /Delete/ }).click();
    })
});