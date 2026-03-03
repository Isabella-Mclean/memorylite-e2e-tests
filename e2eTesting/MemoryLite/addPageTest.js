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

  //HAVEN'T TESTED YET SINCE THE API IS NOT WORKING
  //test may fail if run within 30 seconds of the previous test due to rate limiting on the API
    it.skip('test clicking generate summary calls the API and produces the summary', function(browser) {
        browser.useXpath();
        //click the add button leading to the add entry page
        browser.click("//button[.//text()[contains(.,'Add')]]");

        //enter text in the main text field
        browser.element.findByPlaceholderText('Title').sendKeys('Test Entry');
        let longText = "test".repeat(100);
        browser.element.findByPlaceholderText('Enter your text here...').sendKeys(longText);
        browser.click("//button[.//text()[contains(.,'Generate summary')]]");
        browser.useCss();
        let summaryBox =  browser.element.findByPlaceholderText('Your summary will be displayed here.')
        browser.waitUntil(() => {
            return summaryBox.getValue().then((value) => {
            return value.length > 0;
            });
        }, 10000, 'expected summary to be generated within 15 seconds');
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