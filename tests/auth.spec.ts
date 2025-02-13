const { test, describe, beforeEach, expect, afterAll, before } = require('@playwright/test')

const loginWith = async (page, username, password) => {
    await page.getByTestId('username').fill(username);
    await page.getByTestId('password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
}

describe('Authentication measures', () => {

    beforeEach( async ({ page }) => {
        await page.goto('/')
    })

    test('front page can be opened', async ({ page }) => {
        const locator = await page.getByRole('heading', { name: /Toruts/ });
        await expect(locator).toBeVisible()
    })

    test('user can not sign up with incomplete info', async ({ page }) => {
        await page.getByRole('button', { name: 'Sign up'}).click()
        await expect(page.getByRole('heading', { name: /Sign up/})).toBeVisible()
        await page.getByTestId('username').fill('abram')
        await page.getByTestId('email').fill('acmarcelo2@up.edu.ph')
        await page.getByTestId('password').fill('')
        await page.getByRole('button', { name : 'Sign up'}).click()
        await expect(page.getByRole('heading', { name: /Sign up/})).toBeVisible()
    })
    
    test('user can sign up and add profile', async ({ page }) => {
        await page.getByRole('button', { name: 'Sign up'}).click()
        await expect(page.getByRole('heading', { name: /Sign up/})).toBeVisible()
        await page.getByTestId('username').fill('abram')
        await page.getByTestId('email').fill('acmarcelo2@up.edu.ph')
        await page.getByTestId('password').fill('Abc123!?')
        await page.getByRole('button', { name : 'Sign up'}).click()
        await expect(page.getByRole('heading', { name: /Update/ })).toBeVisible()

        await page.getByTestId('first-name').fill('ABRAM')
        await page.getByTestId('last-name').fill('MARCELO')
        await page.getByRole('button', { name: 'Upload' }).click()

        await expect(page.getByRole('heading', { name: /HELLO/ })).toBeVisible()

        await page.getByRole('button', { name: 'Logout' }).click()
        await expect(page.getByRole('heading', { name: /Toruts/ })).toBeVisible()

    })  

    test('user fails to login with wrong password', async ({ page }) => {
        // await loginWith(page, 'abram', 'blow-kesha')
        
        await page.getByTestId('username').fill('abram');
        await page.getByTestId('password').fill('blow-kesha');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page.getByRole('heading', { name: /Toruts/ })).toBeVisible()
    })

    test('user can log in', async ({ page }) => {
        // await loginWith(page, 'abram', 'Abc123!?')
        
        await page.getByTestId('username').fill('abram');
        await page.getByTestId('password').fill('Abc123!?');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page.getByRole('heading', { name: /HELLO/})).toBeVisible()
        await page.getByRole('button', { name: 'Logout' }).click()
        await expect(page.getByRole('heading', { name: /Toruts/ })).toBeVisible()
    })

    test('user can delete account', async ({ page }) => {
        // await loginWith(page, 'abram', 'Abc123!?')
        
        await page.getByTestId('username').fill('deleted-user');
        await page.getByTestId('password').fill('Deleted123!?');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page.getByRole('heading', { name: /HELLO/})).toBeVisible()
        await page.getByRole('button', { name : /Delete/}).click();
        await expect(page.getByRole('heading', { name: /Toruts/ })).toBeVisible()

        await page.getByRole('button', { name : /Sign up/}).click()
        await page.getByTestId('username').fill('deleted-user');
        await page.getByTestId('email').fill('deleted@user.com');
        await page.getByTestId('password').fill('Deleted123!?');

        await page.getByRole('button', { name: /Sign up/ }).click();
    })

    test('user cannot login anymore after deleting account', async ({ page }) => {
        // await loginWith(page, 'abram', 'Abc123!?')
        
        await page.getByTestId('username').fill('abram');
        await page.getByTestId('password').fill('Abc123!?');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByRole('button', { name: /Delete/ }).click();
        await page.getByTestId('username').fill('abram');
        await page.getByTestId('password').fill('Abc123!?');
        await page.getByRole('button', { name: 'Login' }).click();
        
        await expect(page.getByRole('heading', { name: /Toruts/ })).toBeVisible()
    }) 
})

