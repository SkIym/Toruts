import { PATH, TEST } from "../web/src/constants";

export const loadPage = async (page: any, toLoad: string) => {
    let time = 0;
    let locator = page.getByTestId(TEST.page(toLoad))
    if(locator){
        console.log(`${locator}`)
    }
    let currentPage = await locator.getAttribute('data-testid', {timeout: 200})
    
    while (currentPage?.match(TEST.page(toLoad)) == null && time < 200 && currentPage != null) {
        currentPage = await page.getByTestId(TEST.page(toLoad)).getAttribute('data-testid');
        time += 1;
    }
    if (time < 200 && currentPage != null) {
        console.log(`[${currentPage}] Successful loading page`);
        return null
    } else {
        console.log(`[${currentPage}] Failed to load ${toLoad}`);
        return 'Error'
    }
}

export const loadForm = async (page: any, toLoad: string) => {
    let time = 0;
    let form: string | null = await page.getByTestId(TEST.form(toLoad)).getAttribute('data-testid');
    while(form?.match(toLoad) == null && time < 200) {
        form = await page.getByTestId(TEST.form(toLoad)).getAttribute('data-testid');
        time += 1;
    }
    if (time < 200) {
        console.log(`[${toLoad}] Successful loading form`);
        return null
    } else {
        console.log(`[${toLoad}] Failed to load form`);
        return 'Error'
    }
}

export const clickButton = async(page: any, name: string) => {
    const button = page.getByTestId(TEST.button(name));
    if (await button.isVisible()) {
        await button.click();
        console.log(`[${TEST.button(name)}] Clicked`);
    } else {
        console.log(`[${TEST.button(name)}] Button not found`);
    }
}

export const fillInput = async(page: any, name: string, value: string) => {
    const input = page.getByTestId(TEST.input(name));
    if (await input.isVisible()) {
        await input.fill(value);
        console.log(`[${TEST.input(name)}] Filled with '${value}'`);
    } else {
        console.log(`[${TEST.input(name)}] Input not found`);
    }
}

export const loginWith = async (page: any, username: string, password: string) => {
    console.log(`[${username}] Logging in`);
    await page.goto(PATH.login);
    await page.waitForURL(`**${PATH.login}`)

    await fillInput(page, 'username', username);
    await fillInput(page, 'password', password);

    await clickButton(page, 'login');
    console.log(`Logging in with ${username}...`)
}

export const signupWith = async (page: any, firstName: string, lastName: string, phoneNumber: string, username: string, email: string, password: string) => {
    console.log(`[${username}] Signing up`);
    await page.goto(PATH.SIGNUP.default);
    await page.waitForURL(`**${PATH.SIGNUP.default}`)

    await fillInput(page, 'first-name', firstName);
    await fillInput(page, 'last-name', lastName);
    await fillInput(page, 'phone-number', phoneNumber);
    await fillInput(page, 'username', username);
    await fillInput(page, 'email', email);
    await fillInput(page, 'password', password);
    await fillInput(page, 'confirm-password', password);

    await clickButton(page, 'signup');
    console.log(`Signing up ${firstName} ${lastName} with ${username}...`);
}

export const deleteWith = async (page: any, username: string, password: string) => {
    
}

export const updateInfo = async (page: any, firstName: string, lastName: string, phoneNumber: string) => {
    await page.goto(PATH.PROFILE.edit);
    await page.waitForURL(`**${PATH.PROFILE.edit}`)

    await fillInput(page, 'first-name', firstName);
    await fillInput(page, 'last-name', lastName);
    await fillInput(page, 'phone-number', phoneNumber);

    await clickButton(page, 'update-profile');
}

export const studentForm = async(page: any, type: 'create' | 'update') => {
    await fillInput(page, 'areas', 'test');

    await clickButton(page, type);
    await page.waitForURL(`**${PATH.PROFILE.default}`)
}

export const tutorForm = async (page: any, type: 'create' | 'update') => {
    await fillInput(page, 'educ-attainment', 'Educ');
    await fillInput(page, 'price', '123');
    await fillInput(page, 'venue', 'Venue');
    await fillInput(page, 'availability', 'Availability');
    await fillInput(page, 'experience', 'Experience');
    await page.getByRole('option', { name: 'Online', selected: false }).click()
    await page.getByRole('option', { name: 'Active' }).click()

    await clickButton(page, type);
    await page.waitForURL(`**${PATH.PROFILE.default}`)
}

export const quickLogin = async (page: any, testCase: string) => {
    const username = `test-case-${testCase}`;
    await loginWith(page, username, 'Abc123!?');
}

export const quickSignup = async (page: any, testCase: string) => {
    const username = `test-case-${testCase}`;
    const email = `test@case${testCase}.test`;
    await signupWith(page, 'Test', 'Case', '0', username, email, 'Abc123!?');
}

export const quickDelete = async (page: any) => {
    await page.goto(PATH.PROFILE.default)
    await page.waitForURL(`**${PATH.PROFILE.default}`)
    await clickButton(page, 'delete-trigger');
    await clickButton(page, 'delete');
    await page.waitForURL(`**${PATH.login}`)
}

export const logout = async(page: any) => {
    await page.goto(PATH.PROFILE.default)
    await page.waitForURL(`**${PATH.PROFILE.default}`)
    await clickButton(page, 'logout');
    await page.waitForURL(`**${PATH.login}`)
}

export const done = (testCase: string) => {
    console.log(`[TC ${testCase}] Done`)
}