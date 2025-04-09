import { test, expect } from '@playwright/test';
import { updateInfo, logout, quickLogin, quickSignup, quickDelete, signupWith, done, clickButton, studentForm } from './helper';
import { PATH, TEST } from '../web/src/constants';

test.describe.configure({ mode: 'parallel' });

test.describe('Test Case 2: Functionality', () => {
    test('Test Case 2.1: Successful Log-In', async({ page }) => {
        await quickLogin(page, '2-1');
        await expect(page.getByTestId(TEST.page('home'))).toBeVisible();
        await logout(page);
        
        done('2.1');
    })
    
    test('Test Case 2.2: Successful Logout', async({ page }) => {
        await quickLogin(page, '2-2');
        await expect(page.getByTestId(TEST.page('home'))).toBeVisible();
        await logout(page);
        await expect(page.getByTestId(TEST.page('login'))).toBeVisible();
        
        done('2.2');
    })

    test('Test Case 2.3: Select Tutor Card', async({ page }) => {
        await page.goto(PATH.home);
        while (await page.getByTestId(TEST.form('tutor-result')).isVisible()) {}

        await page.getByTestId(TEST.card('tutor')).getByText(/Nico Ramos/).dispatchEvent('click');
        await page.waitForLoadState();

        await expect(page.getByTestId(TEST.card('selected-tutor'))).toHaveText(/Nico Ramos/);

        done('2.3')
    })
    
    test('Test Case 2.8: Successful Account Deletion', async({ page }) => {
        await quickLogin(page, '2-8');
        await expect(page.getByTestId(TEST.page('home'))).toBeVisible({timeout: 10000});

        await page.goto(PATH.PROFILE.default);
        await page.waitForURL(`**${PATH.PROFILE.default}`);
        await expect(page.getByTestId(TEST.page('profile'))).toBeVisible();

        await quickDelete(page);
        await expect(page.getByTestId(TEST.page('login'))).toBeVisible();
        
        await quickSignup(page, '2-8');
        await expect(page.getByTestId(TEST.page('select'))).toBeVisible();

        await clickButton(page, 'switch');
        await expect(page.getByTestId(TEST.form('student'))).toBeVisible();

        await studentForm(page, 'create');
        await logout(page);
        
        done('2.8');
    })
    
    test('Test Case 2.9: Successful Tutor Search', async ({ page }) => {
        await page.goto(PATH.login)
        await page.waitForURL(`**${PATH.login}`)

        await page.getByTestId(TEST.input('search')).fill('Jacky');
        await page.getByTestId(TEST.button('search')).click();
        await page.waitForLoadState();

        while (await page.getByTestId(TEST.form('tutor-result')).isVisible()) {}

        await expect(page.getByText(/Jacky/)).toBeVisible();
        
        done('2.9');
    })
    
    test('Test Case 2.10: Error Log-In', async({ page }) => {
        await quickLogin(page, '2-10');

        await page.goto(PATH.PROFILE.default);
        await expect(page.getByRole('heading', { name: /HELLO/ })).not.toBeVisible();
        
        done('2.10');
    })
    
    test('Test Case 2.11: Error Sign-up', async({ page }) => {
        await signupWith(page, '', '', '', '', '', '');
        await expect(page.getByTestId(TEST.page('select'))).not.toBeVisible();
        
        done('2.11');
    })
    
    test('Test Case 2.12: Error Profile Edit', async({ page }) => {
        await quickLogin(page, '2-12');
        await expect(page.getByTestId(TEST.page('home'))).toBeVisible();

        await page.goto(PATH.PROFILE.edit);
        await page.waitForURL(`**${PATH.PROFILE.edit}`)

        await updateInfo(page, '', '', '');

        await expect(page.getByTestId(TEST.page('profile-edit'))).toBeVisible();

        await logout(page);
        
        done('2.12');
    })
    
    test('Test Case 2.13: No Tutor Found', async({ page }) => {
        await page.goto(PATH.home);
        while (await page.getByTestId(TEST.form('tutor-result')).isVisible()) {}

        await page.getByTestId(TEST.input('search')).fill('ASKJDaFJKWakjDSD');
        await clickButton(page, 'search')
        await page.waitForLoadState();

        while (await page.getByTestId(TEST.form('tutor-result')).isVisible()) {}

        await clickButton(page, 'search')
        await page.waitForLoadState();

        while (await page.getByTestId(TEST.form('tutor-result')).isVisible()) {}

        await expect(page.getByText(/No tutors found/)).toBeVisible();
        
        done('2.13');
    })

    test('Test Case 2.14: Switch Accounts', async({ page }) => {
        await quickLogin(page, '2-14');
        await expect(page.getByTestId(TEST.page('home'))).toBeVisible({timeout: 10000});

        await page.goto(PATH.PROFILE.default);
        await page.waitForURL(`**${PATH.PROFILE.default}`)

        await expect(page.getByTestId(TEST.profile('tutor'))).toBeVisible({timeout: 10000});
        await clickButton(page, 'switch');

        await expect(page.getByTestId(TEST.profile('student'))).toBeVisible({timeout: 10000});
        await clickButton(page, 'switch');

        done('2.14')
    })
})