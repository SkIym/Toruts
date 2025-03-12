export const load = async (page: any, toLoad: string | RegExp) => {
    let time = 0;
    let currentPage: string | null = await page.getByTestId('page').getAttribute('id');
    while (currentPage?.match(toLoad) && time < 1000) {
        time += 1;
        currentPage = await page.getByTestId('page').getAttribute('id');
    }
    if (time < 10000) {
        console.log(`Time to load ${toLoad}: ${time}`);
        return null
    } else {
        console.log(`Failed to load ${toLoad}`)
        return 'Error'
    }
}

export const loginWith = async (page: any, username: string, password: string) => {
    await page.goto('/login');
    await load(page, 'login');

    while (await load(page, 'home') != null) {
        await page.getByTestId('username').fill(username);
        await page.getByTestId('password').fill(password);
        await page.waitForTimeout(500);
    
        await page.getByTestId('login-button').click();
        console.log(`Logging in with ${username}...`)
    }
    console.log(`Successful logging in ${username}`)
}

export const signupWith = async (page: any, firstName: string, lastName: string, phoneNumber: string, username: string, email: string, password: string) => {
    await page.goto('/signup');
    await page.waitForLoadState();
    await load(page, 'signup');

    await page.getByTestId('first-name').fill(firstName);
    await page.getByTestId('last-name').fill(lastName);
    await page.getByTestId('phone-number').fill(phoneNumber);
    await page.getByTestId('username').fill(username);
    await page.getByTestId('email').fill(email);
    await page.getByTestId('password').fill(password);
    await page.waitForTimeout(500);

    await page.getByTestId('signup-button').click();
    console.log(`Signing up ${firstName} ${lastName} with ${username}...`)
    await page.waitForLoadState();
    await page.waitForTimeout(500);

}

export const deleteWith = async (page: any, username: string, password: string) => {
    await loginWith(page, username, password);
    await page.goto('/profile');
    if(await load(page, 'profile') != null && await load(page,'choose') == null) {
        await page.getByTestId('student-button').click();
        await page.waitForTimeout(500);
        await page.getByTestId('create').click();
        await page.goto('/profile');
        if(await load(page, 'profile')) console.log('Error');
    }

    await page.getByTestId('delete-button').click();
    console.log(`Deleting ${username}...`)
    await page.waitForLoadState();
    await page.waitForTimeout(500);
}

export const addInfo = async (page: any, firstName: string, lastName: string, phoneNumber: string) => {
    await page.goto('/info');
    await page.waitForLoadState();
    await page.waitForTimeout(3000);

    await page.getByTestId('first-name').fill(firstName);
    await page.getByTestId('last-name').fill(lastName);
    await page.getByTestId('phone-number').fill(phoneNumber);
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: /Update/ }).click();
    await page.waitForTimeout(1000);
}

export const addTutor = async (page: any, educ: string, venue: string, price: number) => {
    await page.getByTestId('educ').fill(educ);
    await page.getByTestId('venue').fill(venue);
    await page.getByTestId('price').fill(`${price}`);
    await page.waitForTimeout(1000);

    await page.getByRole('button', { name: /tutor/ }).click();
    await page.waitForLoadState();
    await page.waitForTimeout(1000);
}

export const quickLogin = async (page: any, testCase: string) => {
    const username = `test-case-${testCase}`;
    await loginWith(page, username, 'Abc123!?');
}

export const quickSignup = async (page: any, testCase: string) => {
    const username = `test-case-${testCase}`;
    const email = `test@case${testCase}.test`;
    await signupWith(page, 'Test', 'Case', '0', username, email, 'Abc123!?')
}

export const quickDelete = async (page: any) => {
    await page.goto('/profile');
    await page.waitForLoadState();
    await page.waitForTimeout(3000);

    await page.getByRole('button', { name: /Delete/ }).click();
    await page.waitForLoadState();
}

export const quickAddInfo = async (page: any, testCase: number) => {
    await addInfo(page, 'Test', 'Case', `${testCase}`);
}

export const quickAddTutor = async (page: any, testCase: number) => {
    await addTutor(page, 'Educ', 'Somehwere', testCase * 100);
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