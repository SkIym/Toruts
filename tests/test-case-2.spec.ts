import { test, expect } from '@playwright/test';
import { updateInfo, logout, quickDelete, quickLogin, quickSignup, signupWith, done, loadPage, studentForm, clickButton, tutorForm } from './helper';
import { PATH, TEST } from '../web/src/constants';

test.describe.configure({ mode: 'parallel' });

test.beforeEach(async ({ page }) => {
    await page.goto(PATH.home);
    await page.waitForLoadState();
});


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

    test('Test Case 2.3: Successful Sign-up', async({ page }) => {
        await quickSignup(page, '2-3');
        await page.waitForURL(`**${PATH.select}`)
        await expect(page.getByTestId(TEST.page('select'))).toBeVisible();
        
        await clickButton(page, 'switch');
        await expect(page.getByTestId(TEST.form('student'))).toBeVisible();

        await studentForm(page, 'create');
        await expect(page.getByTestId(TEST.page('profile'))).toBeVisible();

        await logout(page);
        await expect(page.getByTestId(TEST.page('login'))).toBeVisible();
        
        done('2.3');
    })

    test('Test Case 2.4: Successful Profile Edit', async({ page }) => {
        await quickSignup(page, '2-4');
        await page.waitForURL(`**${PATH.select}`)
        await expect(page.getByTestId(TEST.page('select'))).toBeVisible();

        await clickButton(page, 'switch');
        await expect(page.getByTestId(TEST.form('student'))).toBeVisible();

        await studentForm(page, 'create');
        await expect(page.getByTestId(TEST.page('profile'))).toBeVisible();

        await expect(page.getByTestId(TEST.input('first-name'))).toHaveValue(/Test/);
        await expect(page.getByTestId(TEST.input('last-name'))).toHaveValue(/Case/);
        await expect(page.getByTestId(TEST.input('phone-number'))).toHaveValue(/0/);

        await updateInfo(page, 'Change', 'Account', '1');
        await expect(page.getByTestId(TEST.page('profile'))).toBeVisible();

        await expect(page.getByTestId(TEST.input('first-name'))).toHaveValue(/Change/);
        await expect(page.getByTestId(TEST.input('last-name'))).toHaveValue(/Account/);
        await expect(page.getByTestId(TEST.input('phone-number'))).toHaveValue(/1/);
    
            
        done('2.4');
    })
    
    // test('Test Case 2.5: Successful Tutor Account Creation', async({ page }) => {
    //     await quickSignup(page, '2-5');
    //     await tutorForm(page, 'create');

    //     await expect(page.getByTestId(TEST.profile('tutor'))).toBeVisible();
        
    //     done('2.5');
    // })
    
    // test('Test Case 2.6: Successful Tutor Account Edit', async({ page }) => {
    //     await quickLogin(page, '2-6');

    //     await page.goto(PATH.PROFILE.edit)
    //     await loadPage(page, 'edit');
    //     await tutorForm(page, 'update');
        
    //     await page.goto(PATH.PROFILE.default)
    //     await loadPage(page, 'profile');
    //     await expect(page.getByText(/Cude/)).toBeVisible();

    //     await page.goto(PATH.PROFILE.edit)
    //     await loadPage(page, 'edit');
        
    //     await logout(page);
        
    //     done('2.6');
    // })
    
    test('Test Case 2.7: Successful Student Account Creation', async({ page }) => {
        await quickSignup(page, '2-7');
        await page.waitForURL(`**${PATH.select}`)
        await expect(page.getByTestId(TEST.page('select'))).toBeVisible();

        await clickButton(page, 'switch');
        await expect(page.getByTestId(TEST.form('student'))).toBeVisible();

        await studentForm(page, 'create');
        await expect(page.getByTestId(TEST.page('profile'))).toBeVisible();

        await logout(page);

        done('2.7')
    })
    
    // test('Test Case 2.8: Successful Account Deletion', async({ page }) => {
    //     await quickLogin(page, '2-8');

    //     await page.goto(PATH.PROFILE.default);
    //     await loadPage(page, 'profile');
    //     await expect(page.getByTestId('page')).toHaveAttribute('id', 'choose');

    //     await quickDelete(page);
    //     await loadPage(page, 'login');
    //     await expect(page.getByTestId('page')).toHaveAttribute('id', 'login');
        
    //     await quickSignup(page, '2-8');
    //     await studentForm(page, 'create'2-8');
        
    //     done('2.8');
    // })
    
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
        while (await page.getByTestId(TEST.form('tutor-result')).isVisible()) {}

        await page.getByTestId(TEST.input('search')).fill('ASKJDaFJKWakjDSD');
        await page.getByTestId(TEST.button('search')).click();
        await page.waitForLoadState();

        while (await page.getByTestId(TEST.form('tutor-result')).isVisible()) {}

        await page.getByTestId(TEST.button('search')).click();
        await page.waitForLoadState();

        while (await page.getByTestId(TEST.form('tutor-result')).isVisible()) {}

        await expect(page.getByText(/No tutors found/)).toBeVisible();
        
        done('2.13');
    })

    test('Test Case 2.14: Switch Accounts', async({ page }) => {
        await quickLogin(page, '2-14');
        await expect(page.getByTestId(TEST.page('home'))).toBeVisible();

        await page.goto(PATH.PROFILE.default);
        await page.waitForURL(`**${PATH.PROFILE.default}`)

        await expect(page.getByTestId(TEST.profile('tutor'))).toBeVisible();
        await clickButton(page, 'switch');

        await expect(page.getByTestId(TEST.profile('student'))).toBeVisible();
        await clickButton(page, 'switch');

        done('2.14')
    })
})