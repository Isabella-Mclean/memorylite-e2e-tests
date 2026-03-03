
describe('SignInPage Assertions', function() {
    
  beforeEach(function (browser) {

    browser.navigateTo('https://apps.zappdev.io/MemoryLite_906_isabellamftr/HomePage/Render');
  });

  it.skip('test login successful with valid credentials redirects to home page', function(browser) {
    //click sign in button
    browser.click('a[href*="SignInPage/Load"]');
    let usernameInput = 'input[type=text]';
    let passwordInput = 'input[type=password]';

    //enter valid credentials and submit
    browser.sendKeys(usernameInput, process.env.TESTUSERNAME);
    browser.sendKeys(passwordInput, process.env.TESTPASSWORD);

    browser.click('button[type=button]')[0];

    //assert redict to user home page after successful login
    browser.assert.urlContains('UserHome/Index');
  });

  it.skip('test login unsuccessful with invalid credentials', function(browser) {
    //click sign in button
    browser.click('a[href*="SignInPage/Load"]');
    let usernameInput = 'input[type=text]';
    let passwordInput = 'input[type=password]';

    //enter valid credentials and submit
    browser.sendKeys(usernameInput, 'test');
    browser.sendKeys(passwordInput, 'test');

    browser.click('button[type=button]')[0];

    //assert error message displayed
    browser.assert.textContains('body','Sign In failed. Please check your credentials.');
  });
  
  it.skip('test unauthorised users on the userhome page are redirected to the sign in page', function(browser) {
    //navigate straight to the user home
    browser.navigateTo('https://apps.zappdev.io/MemoryLite_906_isabellamftr/UserHome/Index');

    //assert we are redirected to the sign in page
    browser.assert.urlContains('SignInPage/Load');
  });

  it.skip('test unauthorised users on the add entry page are redirected to the sign in page', function(browser) {
    //navigate straight to the add entry page
    browser.navigateTo('https://apps.zappdev.io/MemoryLite_906_isabellamftr/AddEntry/Index');

    //assert we are redirected to the sign in page
    browser.assert.urlContains('SignInPage/Load');
  });

  it('test creating a new user account is successful and the new credentials are valid', async function(browser) {
    //click sign in and sign up buttons
    browser.click('a[href*="SignInPage/Load"]');
    browser.useXpath();
    browser.click("//button[.//text()[contains(.,'Sign Up')]]");

    //enter new user details and submit
    let newUsername = `testuser${Date.now()}`;
    let newEmail = "randomemail@email.com";
    let newPassword = `Testpassword./${Date.now()}`;
    await browser.setValue("//zapptextbox[@name='UserNameTextBox']//input", newUsername);
    await browser.setValue("//zapptextbox[@name='EmailTextBox']//input", newEmail);
    await browser.setValue("//zapppassword[@name='PasswordTextBox']//input", newPassword);
    browser.click("//button[.//text()[contains(.,'Sign Up')]]");

    browser.assert.urlContains('SignInPage/Load');
    //now sign in to test the credentials work
    await browser.setValue("//zapptextbox[@name='UserNameTextBox']//input", newUsername);
    await browser.setValue("//zapppassword[@name='PasswordTextBox']//input", newPassword);
    browser.click("//button[.//text()[contains(.,'Log In')]]");

    //assert redict to user home page after successful login
    browser.assert.urlContains('UserHome/Index');
  });

  afterEach(function (browser) {
    browser.end();
  });
});