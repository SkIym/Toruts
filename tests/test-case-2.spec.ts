import { test, expect } from '@playwright/test';
import { addInfo, logout, quickDelete, quickLogin, quickSignup, signupWith, done, loadPage, createStudent, clickButton, tutorProfile } from './helper';

test.describe.configure({ mode: 'parallel' });

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState();
});

test.skip()

test.describe('Test Case 2: Functionality', () => {
    test('Test Case 2.1: Successful Log-In', async({ page }) => {
        await quickLogin(page, '2-1');
        await page.waitForLoadState();

        await expect(page.getByRole('heading', { name: /Toruts/ })).toBeVisible();
        await logout(page);
        
        done('2.1');
    })
    
    test('Test Case 2.2: Successful Logout', async({ page }) => {
        await quickLogin(page, '2-2');
        await page.waitForLoadState();

        await expect(page.getByRole('heading', { name: /Toruts/ })).toBeVisible();
        await logout(page);
        
        done('2.2');
    })

    test('Test Case 2.3: Successful Sign-up', async({ page }) => {
        await quickSignup(page, '2-3');
        await loadPage(page, 'choose');
        await expect(page.getByTestId('page')).toHaveAttribute('id', 'choose');
        
        await createStudent(page, '2-3')
        
        await loadPage(page, 'profile');
        await expect(page.getByTestId('page')).toHaveAttribute('id', 'profile');
        await clickButton(page, 'delete-button');
        
        done('2.3');
    })

    test('Test Case 2.4: Successful Profile Edit', async({ page }) => {
        await quickSignup(page, '2-4');
        await createStudent(page, '2-4');
        await loadPage(page, 'profile');
        await expect(page.getByText(/First/)).toHaveText(/Test/);
        await expect(page.getByText(/Last/)).toHaveText(/Case/);
        await expect(page.getByText(/Phone/)).toHaveText(/0/);

        await addInfo(page, 'Change', 'Account', '1');
        await loadPage(page, 'profile');

        await expect(page.getByText(/First/)).toHaveText(/Change/);
        await expect(page.getByText(/Last/)).toHaveText(/Account/);
        await expect(page.getByText(/Phone/)).toHaveText(/1/);
    
        await clickButton(page, 'delete-button');
        await loadPage(page, 'login');
            
        done('2.4');
    })
    
    test('Test Case 2.5: Successful Tutor Account Creation', async({ page }) => {
        await quickSignup(page, '2-5');
        await tutorProfile(page, 'create', 'Educ', 'Venue', '20');
        await page.goto('/profile');
        await loadPage(page, 'profile');

        await expect(page.getByTestId('tutor-profile')).toBeVisible();
        
        done('2.5');
    })
    
    test('Test Case 2.6: Successful Tutor Account Edit', async({ page }) => {
        await quickLogin(page, '2-6');

        await page.goto('/info')
        await loadPage(page, 'edit');
        await tutorProfile(page, 'update', 'Cude', 'Venue', '200');
        
        await page.goto('/profile')
        await loadPage(page, 'profile');
        await expect(page.getByText(/Cude/)).toBeVisible();

        await page.goto('/info')
        await loadPage(page, 'edit');
        
        await logout(page);
        
        done('2.6');
    })
    
    test('Test Case 2.7: Successful Student Account Creation', async({ page }) => {
        await quickSignup(page, '2-7');
        await createStudent(page, 'test-case-2-7');
        await loadPage(page, 'info');

        await expect(page.getByTestId('student-profile')).toBeVisible();

        done('2.7')
    })
    
    // test('Test Case 2.8: Successful Account Deletion', async({ page }) => {
    //     await quickLogin(page, '2-8');

    //     await page.goto('/profile');
    //     await loadPage(page, 'profile');
    //     await expect(page.getByTestId('page')).toHaveAttribute('id', 'choose');

    //     await quickDelete(page);
    //     await loadPage(page, 'login');
    //     await expect(page.getByTestId('page')).toHaveAttribute('id', 'login');
        
    //     await quickSignup(page, '2-8');
    //     await createStudent(page, 'test-case-2-8');
        
    //     done('2.8');
    // })
    
    test('Test Case 2.9: Successful Tutor Search', async ({ page }) => {
        await page.waitForTimeout(5000);

        await page.getByTestId('search').fill('Jacky');
        await page.getByRole('button', { name: /Search/ }).click();
        await page.waitForLoadState();
        await page.waitForTimeout(3000);

        await expect(page.getByText(/Jacky/)).toBeVisible();
        
        done('2.9');
    })
    
    test('Test Case 2.10: Error Log-In', async({ page }) => {
        await quickLogin(page, '2-10');

        await page.goto('/profile');
        await expect(page.getByRole('heading', { name: /HELLO/ })).not.toBeVisible();
        
        done('2.10');
    })
    
    test('Test Case 2.11: Error Sign-up', async({ page }) => {
        await signupWith(page, '', '', '', '', '', '');
        await expect(page.getByTestId('page')).not.toHaveAttribute('id', 'choose');
        
        done('2.11');
    })
    
    test('Test Case 2.12: Error Profile Edit', async({ page }) => {
        await quickLogin(page, '2-12');

        await page.goto('/info');
        await loadPage(page, 'edit');
        await addInfo(page, '', '', '');

        await expect(page.getByTestId('page')).toHaveAttribute('id', 'edit');
        
        done('2.12');
    })
    
    test('Test Case 2.13: No Tutor Found', async({ page }) => {
        await page.waitForTimeout(5000);

        await page.getByTestId('search').fill('ASKJDaFJKWakjDSD');
        await page.getByTestId('search-button').click();
        await page.waitForLoadState();
        await page.waitForTimeout(5000);

        await page.getByTestId('search-button').click();
        await page.waitForLoadState();
        await page.waitForTimeout(5000);

        await expect(page.getByText(/No tutors found/)).toBeVisible();
        
        done('2.13');
    })

    // test('Test Case 2.14: Switch Accounts', async({ page }) => {
    //     await quickLogin(page, '2-14');
    //     await page.goto('/profile');
    //     await loadPage(page, 'profile');

    //     await expect(page.getByTestId('tutor-profile')).toBeVisible();
    //     await clickButton(page, 'switch-button');

    //     await page.waitForTimeout(200);

    //     await expect(page.getByTestId('student-profile')).toBeVisible();
    //     await clickButton(page, 'switch-button');

    //     await page.waitForTimeout(200);

    //     done('2.14')
    // })
})