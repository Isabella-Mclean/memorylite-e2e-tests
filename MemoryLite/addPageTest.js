const { assert } = require("nightwatch");

describe('AddPage Assertions', function() {
    
  beforeEach(function (browser) {

    browser.navigateTo('https://apps.zappdev.io/MemoryLite_906_isabellamftr/HomePage/Render');
    browser.click('a[href*="SignInPage/Load"]');
    let usernameInput = 'input[type=text]';
    let passwordInput = 'input[type=password]';
    browser.sendKeys(usernameInput, process.env.TESTUSERNAME);
    browser.sendKeys(passwordInput, process.env.TESTPASSWORD);
    browser.click('button[type=button]')[0];

  });

  //test may fail if repeatedly run within 30 seconds due to rate limiting on the API
  it('test clicking generate summary produces the summary within 10 seconds and can be edited, but a new summary cannot be generated before 30 seconds', async function(browser) {
    browser.useXpath();
    //click the add button leading to the add entry page
    browser.click("//button[.//text()[contains(.,'Add')]]");

    //enter text in the main text field
    browser.element.findByPlaceholderText('Title').sendKeys('Test Entry');
    let longText = "test".repeat(100);
    browser.element.findByPlaceholderText('Enter your text here...').sendKeys(longText);
    browser.click("//button[.//text()[contains(.,'Generate summary')]]");
    browser.useCss();

    await browser.waitUntil(async() => {
      const value = await browser.element.findByPlaceholderText('Your summary will be displayed here.').getValue()
      return value.length > 0;
    }, 10000, 'expected summary to be generated within 10 seconds');

    //Assert the summary box is populated
    const summaryValue = await browser.element.findByPlaceholderText('Your summary will be displayed here.').getValue();
    assert.equal(summaryValue.length > 0, true);

    //assert the user can edit the summary box after text is generated
    let summaryBox = await browser.element.findByPlaceholderText('Your summary will be displayed here.');
    browser.sendKeys(summaryBox, 'additional text');
    const updatedSummaryValue = await browser.element.findByPlaceholderText('Your summary will be displayed here.').getValue();
    assert.equal(updatedSummaryValue, summaryValue + 'additional text');

    //assert you must wait 30 seconds before generating a new summary
    browser.useXpath();
    browser.click("//button[.//text()[contains(.,'Generate summary')]]");
    browser.useCss();

    browser.assert.textContains('body', "You can only generate a summary once every 30 seconds. Please try again in");
  });


  it('test adding a new entry and saving increases the number of saved entries', async function(browser) {
    browser.useXpath();
    //calculate current rows
    const totalRows = await browser.element.findAll('tr[data-p-selectable-row="true"]').count();

    //click the add button leading to the add entry page
    browser.click("//button[.//text()[contains(.,'Add')]]");

    //enter text in the main text field and mock summary field
    browser.element.findByPlaceholderText('Title').sendKeys('Test Entry');
    let longText = "test".repeat(100);
    browser.element.findByPlaceholderText('Enter your text here...').sendKeys(longText);
    browser.element.findByPlaceholderText('Your summary will be displayed here.').sendKeys(longText);

    //click save
    browser.executeScript('window.scrollTo(0,document.body.scrollHeight);');
    browser.click("//button[.//text()[contains(.,'Save')]]");
    browser.useCss();

    //assert the number of rows has increased by 1
    await browser.waitForElementVisible(
        'tr[data-p-selectable-row="true"]',
        5000
    );
    let newRows = await browser.element.findAll('tr[data-p-selectable-row="true"]').count();
    assert.equal(totalRows + 1, newRows);
  });

  afterEach(function (browser) {
    browser.end();
  });
});