const { assert } = require("nightwatch");

describe('HomePage Assertion', function() {
    
  beforeEach(function (browser) {

    browser.navigateTo('https://apps.zappdev.io/MemoryLite_906_isabellamftr/HomePage/Render');
    browser.click('a[href*="SignInPage/Load"]');
    let usernameInput = 'input[type=text]';
    let passwordInput = 'input[type=password]';
    browser.assert.elementPresent(usernameInput);
    browser.assert.elementPresent(passwordInput);
    browser.sendKeys(usernameInput, process.env.TESTUSERNAME);
    browser.sendKeys(passwordInput, process.env.TESTPASSWORD);
    browser.click('button[type=button]')[0];

  });

  it.skip('test clicking Add redirects users to create a new entry', function(browser) {
      browser.useXpath();
      //click the add button leading to the add entry page
      browser.click("//button[.//text()[contains(.,'Add')]]");
      //assert we are redirected to the add entry page
      browser.assert.urlContains('AddEntry/Index');
      browser.useCss();
  });

    it.skip('test clicking a presaved entry displays view or delete options', function(browser) {
      //click the first entry
      browser.click('tr[data-p-selectable-row="true"]:first-of-type');

      browser.useXpath();
      //assert the view/edit and delete buttons are visible
      browser.assert.visible("//button[.//text()[contains(.,'View/Edit')]]");
      browser.assert.visible("//button[.//text()[contains(.,'Delete')]]");
      browser.useCss();
  });

  it.skip('test clicking the view/edit button redirects to the edit entry (add) page', function(browser) {
      //click the first entry
      browser.click('tr[data-p-selectable-row="true"]:first-of-type');

      browser.useXpath();
      //assert the view/edit and delete buttons are visible
      let viewEditButton = "//button[.//text()[contains(.,'View/Edit')]]";
      browser.assert.visible(viewEditButton);
      //click the view/edit button
      browser.click(viewEditButton);
      browser.useCss();

      //assert redirect to the edit entry page
      browser.assert.urlContains('AddEntry/IndexWithData');
  });


  it('test clicking the delete button decrements the number of entries', async function(browser) {
      //create an entry to ensure there is at least one to delete
      browser.useXpath();
      browser.click("//button[.//text()[contains(.,'Add')]]");
      browser.element.findByPlaceholderText('Title').sendKeys('Test Entry');
      let longText = "test".repeat(100);
      browser.element.findByPlaceholderText('Enter your text here...').sendKeys(longText);
      browser.executeScript('window.scrollTo(0,document.body.scrollHeight);');
      browser.click("//button[.//text()[contains(.,'Save')]]");
      browser.useCss();


      //calculate current rows
      const totalRows = await browser.element.findAll('tr[data-p-selectable-row="true"]').count();

      //click the first entry
      browser.click('tr[data-p-selectable-row="true"]:first-of-type');

      browser.useXpath();
      //assert the view/edit and delete buttons are visible
      let deleteButton = "//button[.//text()[contains(.,'Delete')]]";
      browser.assert.visible(deleteButton);
      //click the delete button
      browser.click(deleteButton);
      //click the delete confirmation
      browser.click("//button[.//text()[contains(.,'Yes')]]");
      browser.useCss();

      const updatedTotalRows = await browser.element.findAll('tr[data-p-selectable-row="true"]').count();
      assert.equal(totalRows - 1, updatedTotalRows);
  });



  afterEach(function (browser) {
    browser.end();
  });
});