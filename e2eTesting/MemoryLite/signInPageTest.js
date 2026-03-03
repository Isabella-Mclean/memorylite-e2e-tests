
describe('HomePage Assertion', function() {
    
  beforeEach(function (browser) {

    browser.navigateTo('https://apps.zappdev.io/MemoryLite_906_isabellamftr/HomePage/Render');
  });

  it('test login successful with valid credentials redirects to home page', function(browser) {
    //click sign in button
    browser.click('a[href*="SignInPage/Load"]');

    //assert username and password input fields are present
    let usernameInput = 'input[type=text]';
    let passwordInput = 'input[type=password]';
    browser.assert.elementPresent(usernameInput);
    browser.assert.elementPresent(passwordInput);

    //enter valid credentials and submit
    browser.sendKeys(usernameInput, process.env.TESTUSERNAME);
    browser.sendKeys(passwordInput, process.env.TESTPASSWORD);

    browser.click('button[type=button]')[0];

    //assert redict to user home page after successful login
    browser.assert.urlContains('UserHome/Index');
  });

  it('test login unsuccessful with invalid credentials', function(browser) {
    //click sign in button
    browser.click('a[href*="SignInPage/Load"]');

    //assert username and password input fields are present
    let usernameInput = 'input[type=text]';
    let passwordInput = 'input[type=password]';
    browser.assert.elementPresent(usernameInput);
    browser.assert.elementPresent(passwordInput);

    //enter valid credentials and submit
    browser.sendKeys(usernameInput, 'test');
    browser.sendKeys(passwordInput, 'test');

    browser.click('button[type=button]')[0];

    //assert error message displayed
    browser.assert.textContains('body','Sign In failed. Please check your credentials.');
  });
  
  it('test unauthorised users on the userhome page are redirected to the sign in page', function(browser) {
    //navigate straight to the user home
    browser.navigateTo('https://apps.zappdev.io/MemoryLite_906_isabellamftr/UserHome/Index');

    //assert we are redirected to the sign in page
    browser.assert.urlContains('SignInPage/Load');
  });

  it('test unauthorised users on the add entry page are redirected to the sign in page', function(browser) {
    //navigate straight to the add entry page
    browser.navigateTo('https://apps.zappdev.io/MemoryLite_906_isabellamftr/AddEntry/Index');

    //assert we are redirected to the sign in page
    browser.assert.urlContains('SignInPage/Load');
  });

  afterEach(function (browser) {
    browser.end();
  });
});