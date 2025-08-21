import { test, expect } from '@playwright/test';
import { quickDelete, quickSignup, done, studentForm, clickButton, updateInfo, checkBox, tutorForm } from './helper';
import { PATH, TEST } from '../../web/src/constants/constants'

test.describe.configure({ mode: 'parallel' });

test.describe('Test Case 3: Test Cases with Sign-ups', () => {

    test(`Test Case 3.1: Update Profile Page`, async ({ page }) => {
        await quickSignup(page, '3-1');
        await expect(page.getByTestId(TEST.form('tutor'))).toBeVisible();

        await clickButton(page, 'switch');
        await page.waitForLoadState();
        await expect(page.getByTestId(TEST.form('student'))).toBeVisible();

        await expect(page.getByTestId(TEST.button('create'))).toBeVisible();
        await expect(page.getByTestId(TEST.input('areas'))).toBeVisible();
        await expect(page.getByTestId(TEST.input('degree'))).toBeVisible();
        await expect(page.getByTestId(TEST.checkbox('consent'))).toBeVisible();

        await page.getByTestId(TEST.input('areas')).fill('test');

        await checkBox(page, 'consent');
        await clickButton(page, 'create');
        await page.waitForURL(`**${PATH.PROFILE.default}`);

        await quickDelete(page);

        done('3.1');
    })
    
    test(`Test Case 3.2: Select Page`, async ({ page }) => {
        await quickSignup(page, '3-2');
        await expect(page.getByTestId(TEST.form('tutor'))).toBeVisible();
        
        await clickButton(page, 'switch');

        await expect(page.getByTestId(TEST.form('student'))).toBeVisible();

        await page.getByTestId(TEST.input('areas')).fill('test');
        await checkBox(page, 'consent');
        await clickButton(page, 'create');
        await page.waitForURL(`**${PATH.PROFILE.default}`)

        await quickDelete(page);

        done('3.2')
    })

    test(`Test Case 3.3: Successful Sign-up`, async({ page }) => {
        await quickSignup(page, '3-3');
        
        await expect(page.getByTestId(TEST.page('select'))).toBeVisible();
        
        await clickButton(page, 'switch');
        await expect(page.getByTestId(TEST.form('student'))).toBeVisible();

        await studentForm(page, 'create');
        await expect(page.getByTestId(TEST.page('profile'))).toBeVisible();

        await quickDelete(page);
        
        done('3.3');
    })
    
    test(`Test Case 3.4: Successful Profile Edit`, async({ page }) => {
        await quickSignup(page, '3-4');
        
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
    
        await quickDelete(page);
            
        done('3.4');
    })

    test(`Test Case 3.5: Successful Student Account Creation`, async({ page }) => {
        await quickSignup(page, '3-5');
        
        await expect(page.getByTestId(TEST.page('select'))).toBeVisible();

        await clickButton(page, 'switch');
        await expect(page.getByTestId(TEST.form('student'))).toBeVisible();

        await studentForm(page, 'create');
        await expect(page.getByTestId(TEST.page('profile'))).toBeVisible();

        await quickDelete(page);

        done('3.5')
    })

    test('Test Case 3.6: Successful Tutor Account Creation', async({ page }) => {
        await quickSignup(page, '3-6');
        await expect(page.getByTestId(TEST.page('select'))).toBeVisible();

        await expect(page.getByTestId(TEST.form('tutor'))).toBeVisible();

        await tutorForm(page, 'create');
        await expect(page.getByTestId(TEST.profile('tutor'))).toBeVisible();

        await quickDelete(page);
        
        done('3.6');
    })
})