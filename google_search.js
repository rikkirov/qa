var helpers = require('./helpers.js');
helpers.init(element, browser, protractor);

describe('User can view Google search page', function () {
    browser.manage().window().setSize(1000, 1224);
  //  browser.getSession().then(function (sessionData) {
  //  process.stdout.write('SauceOnDemandSessionID=' + sessionData.getId() + ' Invoice credit card pay' + '\n');
  //  });
    browser.ignoreSynchronization = true;

    it('Should display the Google search page', function (done) {
        browser.get('http://www.google.com.au')
            .then(helpers.waitForSomethingWithNoReload('Google', 60))
            .then(function () {
                element(by.id('q')).sendKeys('Search for this');
            // .then(browser.driver.switchTo().frame("credit-card-payment-frame"))
            // .then(function () {
            //     element(by.id('cardHolderName')).sendKeys('Test Card Name');
            //     element(by.id('cardNo')).sendKeys('4111111111111111');
            //     element(by.id('cardSecureId')).sendKeys('1');
            //     element(by.id('cardExpiry')).sendKeys('10/17');
            })
            .then(done);
    }, 75000);
});
