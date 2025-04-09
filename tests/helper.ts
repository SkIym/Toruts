import { PATH, TEST } from "../web/src/constants";

export const clickButton = async(page: any, name: string) => {
    const button = page.getByTestId(TEST.button(name));
    if (await button.isVisible()) {
        await button.dispatchEvent('click');
    } else {
        console.log(`[${TEST.button(name)}] Button not found`);
    }
}

export const fillInput = async(page: any, name: string, value: string) => {
    const input = page.getByTestId(TEST.input(name));
    if (await input.isVisible()) {
        await input.fill(value);
    } else {
        console.log(`[${TEST.input(name)}] Input not found`);
    }
}

export const checkBox = async(page: any, name: string) => {
    const _checkBox = page.getByTestId(TEST.checkbox(name));
    if (await _checkBox.isVisible()) {
        await _checkBox.dispatchEvent('click');
    } else {
        console.log(`[${TEST.checkbox(name)}] Checkbox not found`);
    }
}

export const selectOption = async(page: any, name: string, option: string) => {
    const select = page.getByTestId(TEST.select(name));
    if (await select.isVisible()) {
        await select.dispatchEvent('click');
        await page.waitForLoadState();

        const _option = page.getByTestId(TEST.select(option));
        if (await _option.isVisible())  {
            await _option.dispatchEvent('click');
        } else {
            console.log(`[${TEST.select(name)}: \'${option}\'] Option not found`)
        }
    } else {
        console.log(`[${TEST.select(name)}] Select not found`);
    }
}

export const loginWith = async (page: any, username: string, password: string) => {
    await page.goto(PATH.login);
    await page.waitForURL(`**${PATH.login}`)

    await fillInput(page, 'username', username);
    await fillInput(page, 'password', password);

    await clickButton(page, 'login');
}

export const signupWith = async (page: any, firstName: string, lastName: string, phoneNumber: string, username: string, email: string, password: string) => {
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

export const studentForm = async(page: any, type: 'create' | 'update', areas = 'test') => {
    await fillInput(page, 'areas', areas);
    await checkBox(page, 'consent');

    await clickButton(page, type);
    await page.waitForURL(`**${PATH.PROFILE.default}`)
}

export const tutorForm = async (page: any, type: 'create' | 'update'
        , educ = 'Educ', price = '123', venue = 'venue', availability = 'Availability'
        , experience = 'Experience', mode = 'online', status = 'active') => {
    await fillInput(page, 'educ-attainment', educ);
    await fillInput(page, 'price', price);
    await fillInput(page, 'venue', venue);
    await fillInput(page, 'availability', availability);
    await fillInput(page, 'experience', experience);
    await selectOption(page, 'mode', mode);
    await selectOption(page, 'status', status);

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
    await page.waitForURL(`**${PATH.select}`);
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