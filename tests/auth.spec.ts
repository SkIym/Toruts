const { test, describe, beforeEach, expect, afterAll, before } = require('@playwright/test')

const loginWith = async (page, username, password) => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'Login' }).click()
}


describe('Authentication measures', () => {

    beforeEach( async ({ page }) => {
        await page.goto('/')
    })

    test('front page can be opened', async ({ page }) => {
        const locator = await page.getByText('Welcome to Toruts, ka-peyups!')
        await expect(locator).toBeVisible()
    })

    test('user can not sign up with incomplete info', async ({ page }) => {
        await page.getByRole('button', { name: 'Sign up'}).click()
        await expect(page.getByText('Sign up')).toBeVisible()
        await page.getByTestId('username').fill('abram')
        await page.getByTestId('email').fill('acmarcelo2@up.edu.ph')
        await page.getByTestId('password').fill('')
        await page.getByRole('button', { name : 'Submit'}).click()
        await expect(page.getByText('Sign up')).toBeVisible()
    })
    
    test('user can sign up and add profile', async ({ page }) => {
        await page.getByRole('button', { name: 'Sign up'}).click()
        await expect(page.getByText('Sign up')).toBeVisible()
        await page.getByTestId('username').fill('abram')
        await page.getByTestId('email').fill('acmarcelo2@up.edu.ph')
        await page.getByTestId('password').fill('Hakdog2%')
        await page.getByRole('button', { name : 'Submit'}).click()
        await expect(page.getByText('Update your profile')).toBeVisible()

        await page.getByTestId('first-name').fill('ABRAM')
        await page.getByTestId('last-name').fill('MARCELO')
        await page.getByRole('button', { name: 'Upload' }).click()

        await expect(page.getByText('OMG HELLO')).toBeVisible()

        await page.getByRole('button', { name: 'Logout' }).click()
        await expect(page.getByText('Welcome to Toruts, ka-peyups!')).toBeVisible()

    })

    test('user fails to login with wrong password', async ({ page }) => {
        await loginWith(page, 'abram', 'blow-kesha')
        await expect(page.getByText('Welcome to Toruts, ka-peyups!')).toBeVisible()
    })

    test('user can log in', async ({ page }) => {
        await loginWith(page, 'abram', 'Hakdog2%')
        await expect(page.getByText('OMG HELLO')).toBeVisible()
        await page.getByRole('button', { name: 'Logout' }).click()
        await expect(page.getByText('Welcome to Toruts, ka-peyups!')).toBeVisible()
    })

    test('user can delete account', async ({ page }) => {
        await loginWith(page, 'abram', 'Hakdog2%')
        await page.getByRole('button', { name : 'Delete Profile'}).click()
        await expect(page.getByText('Welcome to Toruts, ka-peyups!')).toBeVisible()
    })

    test('user cannot login anymore after deleting account', async ({ page }) => {
        await loginWith(page, 'abram', 'Hakdog2%')
        await expect(page.getByText('Welcome to Toruts, ka-peyups!')).toBeVisible()
    }) 
})

