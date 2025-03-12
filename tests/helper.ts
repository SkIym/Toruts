export const loadPage = async (page: any, toLoad: string | RegExp) => {
    let time = 0;
    let currentPage: string | null = await page.getByTestId('page').getAttribute('id');
    if (!currentPage) {
        console.log(`[${currentPage}] Not Found`)
        return 'Error'
    }
    while (currentPage?.match(toLoad) == null && time < 200) {
        currentPage = await page.getByTestId('page').getAttribute('id');
        time += 1;
    }
    if (time < 200) {
        console.log(`[${currentPage}] Successful loading page`);
        return null
    } else {
        console.log(`[${currentPage}] Failed to load ${toLoad}`);
        return 'Error'
    }
}

export const loadForm = async (page: any, toLoad: string | RegExp) => {
    let time = 0;
    let form: string | null = await page.getByTestId('form').getAttribute('id');
    if (!form) {
        console.log(`[${form}] Not Found`)
        return 'Error'
    }
    while(form?.match(toLoad) == null && time < 200) {
        form = await page.getByTestId('form').getAttribute('id');
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
    const button = page.getByTestId(name);
    if (await button.isVisible()) {
        await button.click();
        console.log(`[${name}] Clicked`);
    } else {
        console.log(`[${name}] Button not found`);
    }
}

export const fillInput = async(page: any, name: string, value: string) => {
    const input = page.getByTestId(name);
    if (await input.isVisible()) {
        await input.fill(value);
        console.log(`[${name}] Filled with '${value}'`);
    } else {
        console.log(`[${name}] Input not found`);
    }
}

export const loginWith = async (page: any, username: string, password: string) => {
    console.log(`[${username}] Logging in`);
    await page.goto('/login');
    await loadPage(page, 'login');
    const retries = 3

    let time = 0;
    while (await loadPage(page, 'home') != null && time < retries) {
        await page.getByTestId('username').fill(username);
        await page.getByTestId('password').fill(password);
    
        await clickButton(page, 'login-button');
        console.log(`Logging in with ${username}...`)
        time += 1;
    }
    if (time < retries) {
        console.log(`[${username}] Logged in successful`);
    } else {
        console.log(`[${username}] Log in failed`);
    }
}

export const signupWith = async (page: any, firstName: string, lastName: string, phoneNumber: string, username: string, email: string, password: string) => {
    console.log(`[${username}] Signing up`);
    await page.goto('/signup');
    await loadPage(page, 'signup');
    const retries = 3;

    let attempt = 0;
    while (await loadPage(page, 'choose') != null && attempt < retries) {
        await fillInput(page, 'first-name', firstName);
        await fillInput(page, 'last-name', lastName);
        await fillInput(page, 'phone-number', phoneNumber);
        await fillInput(page, 'username', username);
        await fillInput(page, 'email', email);
        await fillInput(page, 'password', password);

        await clickButton(page, 'signup-button');
        console.log(`Signing up ${firstName} ${lastName} with ${username}...`);
        
        attempt += 1;
    }
    if (attempt < retries) {
        console.log(`[${username}] Signing up successful`);
    } else {
        console.log(`[${username}] Signing up failed`);
    }
}

export const deleteWith = async (page: any, username: string, password: string) => {
    console.log(`[${username}] Deleting Account`);
    await loginWith(page, username, password);
    await page.goto('/profile');

    await createStudent(page, username);

    const retries = 3
    let t0 = 0;
    while (await loadPage(page, 'login') && t0 < retries) {
        await clickButton(page, 'delete-button');
        console.log(`Deleting ${username}...`)
        t0 += 1
    }
    if (!(await loadPage(page, 'login')) && t0 < retries) {
        console.log(`[${username}] Account deleted successfully`);
    } else {
        console.log(`[${username}] Account deletion failed`);
    }
}

export const addInfo = async (page: any, firstName: string, lastName: string, phoneNumber: string) => {
    await page.goto('/info');
    await loadPage(page, 'edit');

    await fillInput(page, 'first-name', firstName);
    await fillInput(page, 'last-name', lastName);
    await fillInput(page, 'phone-number', phoneNumber);

    await page.getByTestId('update-button').click();
    await loadPage(page, 'profile');
}

export const createStudent = async(page: any, username: string) => {
    const retries = 3
    let t0 = 0;
    let choose = false
    while (await loadPage(page, 'profile') != null && t0 < retries) {
        let t1 = 0;
        choose = true
        while (await loadForm(page, 'student-form') != null && t1 < retries) {
            await clickButton(page, 'student-button');
            t1 += 1;
        }
        if (t1 < retries) {
            await clickButton(page, 'create');
            t0 += 1;
        } else {
            console.log(`[${username}] Failed to load student-form`)
            t0 += 1;
        }
    }
    if (t0 < retries && choose) {
        console.log(`[${username}] Sucessful creating student account`);
    } else if (choose) {
        console.log(`[${username}] Failed to create student account`);
    }
}

export const tutorProfile = async (page: any, type: 'create' | 'update', educ: string, venue: string, price: string) => {
    const retries = 3;
    let t0 = 0;
    while (t0 < retries) {
        await fillInput(page, 'educ', educ);
        await fillInput(page, 'venue', venue);
        await fillInput(page, 'price', price);

        await clickButton(page, type);

        if (type == 'create' && await loadPage(page, 'home') == null) {
            break;
        } else if (type == 'update' && await loadPage(page, 'profile') == null) {
            break;
        }
    }
}

export const quickLogin = async (page: any, testCase: string) => {
    const username = `test-case-${testCase}`;
    await loginWith(page, username, 'Abc123!?');
}

export const quickSignup = async (page: any, testCase: string) => {
    const username = `test-case-${testCase}`;
    const email = `test@case${testCase}.test`;
    await signupWith(page, 'Test', 'Case', '0', username, email, 'Abc123!?');
    if (await loadPage(page, 'choose')) {
        await deleteWith(page, username, 'Abc123!?');
        await page.waitForLoadState();
        await signupWith(page, 'Test', 'Case', '0', username, email, 'Abc123!?')
    }
}

export const quickDelete = async (page: any) => {
    await page.goto('/profile');
    while (await loadPage(page, 'login')) {
        await clickButton(page, 'delete-button');
    }
}

export const logout = async(page: any) => {
    await page.goto('/profile')
    await page.waitForLoadState();
    await page.getByRole('button', { name: /Logout/})
    await page.waitForLoadState();
}

export const done = (testCase: string) => {
    console.log(`[TC ${testCase}] Done`)
}