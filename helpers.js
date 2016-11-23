var element, browser, protractor, config;
var helpers = {};
var Promise = require('promise');
var URL = require('url');
var tracker = 0;

var currentMyMyobUser;
var currentArlTestFile;
var currentPaypalSeller;

if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match
                ;
        });
    };
}

helpers.init = function(_element, _browser, _protractor)
{
    element = _element;
    browser = _browser;
    protractor = _protractor;
};

helpers.isTextPresent = function (text)
{
//    console.log('Searching body for ' + text);
    return new Promise(function(resolve, reject)
    {
        browser.getPageSource()
            .then(function (source) {
                var thisRegex = new RegExp(text);
                if (thisRegex.test(source)){
                    console.log('Text found successfully');
                    resolve();
                } else {
                    reject("'" + text + "' was not present in the body");
                }
            });
    });
};

helpers.isTextNotPresent = function (text)
{
//    console.log('Searching body for ' + text);
    return new Promise(function(resolve, reject)
    {
        browser.getPageSource()
            .then(function (source) {
                var thisRegex = new RegExp(text);
                if (!thisRegex.test(source)){
                    console.log('Text found successfully');
                    resolve();
                } else {
                    reject("'" + text + "' was not present in the body");
                }
            });
    });
};

helpers.waitForSomethingWithNoReload = function(text, timeout)
{
    return new Promise(function(resolve, reject)
    {
        console.log('Waiting for "' + text + '" to be present on the page');
        var isFound = false;
        browser.wait(function()
        {
            if (isFound) return isFound;
            helpers.isTextPresent(text)
                .then(function()
                {
                    console.log('I found the text (' + text + ') on the page!');
                    isFound = true;
                }, function(e)
                {
//                    console.log('I could not find it :(');
//                    console.log(e);
                });
            return isFound;
        }, timeout * 1000, "Could not find '" + text + "' on the page after " + timeout + " seconds")
            .then(resolve, reject);
    });
};


helpers.waitForSomethingWithReload = function(text, timeout)
{
    return new Promise(function(resolve, reject)
    {

    });
};

helpers.waitForGooglePage = function()
{
    browser.get('http://www.google.com.au');
    console.log('Waiting for Google search page');
    return helpers.waitForSomethingWithNoReload('Google', 60);
};

module.exports = helpers;
