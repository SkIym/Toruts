import { test, expect } from '@playwright/test';
import { addInfo, addTutor, logout, quickAddInfo, quickAddTutor, quickDelete, quickLogin, quickSignup, signupWith, done } from './helper';

test.describe.configure({ mode: 'parallel' });

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState();
});

test.skip()

test.describe('Test Case 2: Functionality', () => {
    test.skip('Test Case 2.1: Successful Log-In', async({ page }) => {
        await quickLogin(page, '2-1');
        await page.waitForLoadState();

        await expect(page.getByRole('heading', { name: /Toruts/ })).toBeVisible();
        await logout(page);
        
        done('2.1');
    })
    
    test.skip('Test Case 2.2: Successful Logout', async({ page }) => {
        await quickLogin(page, '2-2');
        await page.waitForLoadState();

        await expect(page.getByRole('heading', { name: /Toruts/ })).toBeVisible();
        await logout(page);
        
        done('2.2');
    })

    test('Test Case 2.3: Successful Sign-up', async({ page }) => {
        await quickSignup(page, '2-3');

        await expect(page.getByRole('heading', { name: /Update/ })).toBeVisible();

        await quickAddInfo(page, 2);

        await page.goto('/profile');
        await page.waitForLoadState();
        await page.waitForTimeout(3000);

        await expect(page.getByRole('heading', { name: /HELLO/ })).toHaveText(/test-case-2/);
        await page.getByRole('button', { name: /Delete/ }).click();
        await page.waitForLoadState();
        
        done('2.3');
    })

    test('Test Case 2.4: Successful Profile Edit', async({ page }) => {
        await quickSignup(page, '2-4');

        await expect(page.getByRole('heading', { name: /Update/ })).toBeVisible();

        await quickAddInfo(page, 2);
        await logout(page);
        await quickLogin(page, '2-4')

        await page.goto('/profile');
        await page.waitForTimeout(5000);

        await expect(page.getByRole('heading', { name: /HELLO/ })).toHaveText(/test-case-2/);
        await expect(page.getByText(/First/)).toHaveText(/Test/);
        await expect(page.getByText(/Last/)).toHaveText(/Case/);
        await expect(page.getByText(/Phone/)).toHaveText(/2/);
    
        await page.getByRole('button', { name: /Delete/ }).click();
        await page.waitForLoadState();
        await expect(page.getByRole('heading', { name: /Toruts/ })).toBeVisible();
            
        done('2.4');
    })
    
    test('Test Case 2.5: Successful Tutor Account Creation', async({ page }) => {
        await quickSignup(page, '2-5');

        await expect(page.getByRole('heading', { name: /Update/ })).toBeVisible();

        await quickAddTutor(page, 2);
        await page.waitForTimeout(2000);

        await expect(page.getByRole('heading', { name: /Toruts/ })).toBeVisible();
        await addInfo(page, 'User', 'Test', '2');
        await page.waitForTimeout(2000);

        await expect(page.getByRole('heading', { name: /HELLO/ })).toBeVisible();
        
        await page.goto('/');
        await page.waitForTimeout(5000);
        await expect(page.getByText(/User/)).toBeVisible();

        await quickDelete(page);
        await page.waitForLoadState();
        
        done('2.5');
    })
    
    test('Test Case 2.6: Successful Tutor Account Edit', async({ page }) => {
        await quickLogin(page, '2-6');
        await page.goto('/profile');
        await page.waitForLoadState();
        await page.waitForTimeout(1000);
        await expect(page.getByText(/Educ/)).toBeVisible();

        await page.goto('/info')
        await page.waitForLoadState();
        await page.waitForTimeout(3000);
        await addTutor(page, 'Cude', 'Venue', 200);
        
        await logout(page);
        await page.waitForLoadState();
        await page.waitForTimeout(100);

        await quickLogin(page, '2-6');
        await page.goto('/profile');
        await page.waitForLoadState();
        await page.waitForTimeout(100);

        await page.goto('/profile')
        await page.waitForLoadState();
        await page.waitForTimeout(3000);
        await expect(page.getByText(/Cude/)).toBeVisible();

        await page.goto('/info')
        await page.waitForLoadState();
        await page.waitForTimeout(3000);
        await quickAddTutor(page, 2);
        
        await logout(page);
        await page.waitForLoadState();
        
        done('2.6');
    })
    
    // No way to test !! Skip for now
    // test('Test Case 2.7: Successful Student Account Creation', async({ page }) => {
        
    // })
    
    test('Test Case 2.8: Successful Account Deletion', async({ page }) => {
        await quickLogin(page, '2-8');

        await page.goto('/profile');
        await expect(page.getByRole('heading', { name: /HELLO/ })).toHaveText(/test-case-2/);

        await quickDelete(page);
        await expect(page.getByRole('heading', { name: /Toruts/ })).toBeVisible();
        
        await quickSignup(page, '2-8')
        
        done('2.8');
    })
    
    test.skip('Test Case 2.9: Successful Tutor Search', async({ page }) => {
        await page.waitForTimeout(5000);

        await page.getByTestId('search').fill('Jacky');
        await page.getByRole('button', { name: /Search/ }).click();
        await page.waitForLoadState();
        await page.waitForTimeout(3000);

        await expect(page.getByText(/Jacky/)).toBeVisible();
        
        done('2.9');
    })
    
    test.skip('Test Case 2.10: Error Log-In', async({ page }) => {
        await quickLogin(page, '2-10');

        await page.goto('/profile');
        await expect(page.getByRole('heading', { name: /HELLO/ })).not.toBeVisible();
        
        done('2.10');
    })
    
    test('Test Case 2.11: Error Sign-up', async({ page }) => {
        await signupWith(page, '', '', 0, '', '', '');
        await expect(page.getByRole('heading', { name: /Update/ })).not.toBeVisible();
        
        done('2.11');
    })
    
    test.skip('Test Case 2.12: Error Profile Edit', async({ page }) => {
        await quickLogin(page, '2-12');

        await addInfo(page, '', '', '');

        await expect(page.getByRole('heading', { name: /HELLO/ })).not.toBeVisible();

        await logout(page);
        
        done('2.12');
    })
    
    test.skip('Test Case 2.13: No Tutor Found', async({ page }) => {
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
})