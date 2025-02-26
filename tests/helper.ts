export const loginWith = async (page: any, username: string, password: string) => {
    await page.goto('/login');
    await page.waitForLoadState();
    await page.waitForTimeout(5000);

    await page.getByTestId('username').fill(username);
    await page.getByTestId('password').fill(password);
    await page.waitForTimeout(500);

    await page.getByRole('button', { name: /Login/ }).click();
    await page.waitForLoadState();
    await page.waitForTimeout(500);
}

export const signupWith = async (page: any, username: string, email: string, password: string) => {
    await page.goto('/signup');
    await page.waitForLoadState();
    await page.waitForTimeout(1000);

    await page.getByTestId('username').fill(username);
    await page.getByTestId('email').fill(email);
    await page.getByTestId('password').fill(password);
    await page.waitForTimeout(500);

    await page.getByRole('button', { name : /Sign up/ }).click();
    await page.waitForLoadState();
    await page.waitForTimeout(500);
}

export const deleteWith = async (page: any, username: string, password: string) => {
    await loginWith(page, username, password);
    await page.goto('/profile');
    await page.waitForLoadState();
    await page.waitForTimeout(3000);

    await page.getByRole('button', { name: /Delete/ }).click();
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
    await signupWith(page, username, email, 'Abc123!?')
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