
describe('HomePage Assertion', function() {
    
  beforeEach(function (browser) {

    browser.navigateTo('https://apps.zappdev.io/MemoryLite_906_isabellamftr/HomePage/Render');
  });


  it('tests title of the home page', function(browser) {
    browser.assert.titleEquals('Home Page | MemoryLite');
  });

  it('test sign in button redirects to sign in page', function(browser) {
    //click sign in button
    browser.click('a[href*="SignInPage/Load"]');

    //assert username and password input fields are present and url is sign in
    browser.assert.elementPresent('input[type=text]');
    browser.assert.elementPresent('input[type=password]');
    browser.assert.urlContains('SignInPage/Load');
  });

  afterEach(function (browser) {
    browser.end();
  });
});