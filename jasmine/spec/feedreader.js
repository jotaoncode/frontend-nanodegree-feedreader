/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('Are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('All url in feeds are defined', function () {
          for(var feed in allFeeds) {
            expect(allFeeds[feed].url).toBeDefined();
            expect(allFeeds[feed].url).not.toBe("");
          }
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('All name in feeds are defined', function () {
          for(var feed in allFeeds) {
            expect(allFeeds[feed].name).toBeDefined();
            expect(allFeeds[feed].name).not.toBe("");
          }
        });

    });

    /* Write a new test suite named "The menu" */
    describe('The Menu', function () {
      var menu;
      beforeEach(function () {
        body = $('body');
        menu = $('body>.menu');
      });
      /* Write a test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */
      it('Should be hidden by default', function () {
        expect(body.hasClass('menu-hidden')).toBe(true);
      });
     /* Write a test that ensures the menu changes
      * visibility when the menu icon is clicked. This test
      * should have two expectations: does the menu display when
      * clicked and does it hide when clicked again.
      */
      describe('Menu open and closes', function () {
        var timerCallback, menuLink;
        beforeEach(function () {
          menuLink = $('.menu-icon-link');
          timerCallback = jasmine.createSpy('timerCallback');
          jasmine.clock().install();
        });
        afterEach(function () {
          jasmine.clock().uninstall();
        });

        it('Should display when clicked', function () {
          menuLink.trigger('click'); //Triggered a click event on the menu
          timerCallback();//Runned timerCallback to defer the transformation
          jasmine.clock().tick(220);//When it finishes
          expect(body.hasClass('menu-hidden')).toBe(false); //Transformation should have taken effect
        });
        it('Should hide when clicked again', function () {
          menuLink.trigger('click');
          timerCallback();
          jasmine.clock().tick(220);
          expect(timerCallback).toHaveBeenCalled();
          expect(body.hasClass('menu-hidden')).toBe(true); //Transformation should have taken effect
        });
      });
    });
    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {
      beforeEach(function (done) {
        loadFeed(0, done);
      });
        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
      it('Load feeds asynchronous', function (done) {
        expect($('.entry').length).not.toBe(0);
        done();
      });
    });
    /* Write a new test suite named "New Feed Selection*/
    describe('New Feed Selection', function () {
      var contentBefore;
      /* Write a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
      it('Feed is loaded with content for first feed', function (done) {
        loadFeed(0, function () {
          var entries = $('.feed').find('.entry'), entryValue;
          entries.each(function (index, entry) {
            expect($(entry).find('h2').text()).toBeDefined();
            expect($(entry).find('h2').text()).not.toBe("");
            expect($(entry).find('p').text()).toBeDefined();
            expect($(entry).find('p').text()).not.toBe("");
            contentBefore = $(entry).find('h2').text();
          });
          done();
        });
      });
      /**
       * Feed test to check second feed is loaded
       */
      it('Feed is loaded with content for second feed', function (done) {
        loadFeed(1, function () {
          var entries = $('.feed').find('.entry'), entryValue;
          entries.each(function (index, entry) {
            expect($(entry).find('h2').text()).toBeDefined();
            expect($(entry).find('h2').text()).not.toBe("");
            expect($(entry).find('h2').text()).not.toBe(contentBefore);
            expect($(entry).find('p').text()).toBeDefined();
            expect($(entry).find('p').text()).not.toBe("");
            contentBefore = $(entry).find('h2').text();
          });
          done();
        });
      });
      /**
       * Feed test to check third feed is loaded
       */
      it('Feed is loaded with content for third feed', function (done) {
        loadFeed(2, function () {
          var entries = $('.feed').find('.entry'), entryValue;
          entries.each(function (index, entry) {
            expect($(entry).find('h2').text()).toBeDefined();
            expect($(entry).find('h2').text()).not.toBe("");
            expect($(entry).find('h2').text()).not.toBe(contentBefore);
            expect($(entry).find('p').text()).toBeDefined();
            expect($(entry).find('p').text()).not.toBe("");
            contentBefore = $(entry).find('h2').text();
          });
          done();
        });
      });
      /**
       * Feed test to check fourth feed is loaded
       */
      it('Feed is loaded with content for fourth feed', function (done) {
        loadFeed(3, function () {
          var entries = $('.feed').find('.entry'), entryValue;
          entries.each(function (index, entry) {
            expect($(entry).find('h2').text()).toBeDefined();
            expect($(entry).find('h2').text()).not.toBe("");
            expect($(entry).find('h2').text()).not.toBe(contentBefore);
            expect($(entry).find('p').text()).toBeDefined();
            expect($(entry).find('p').text()).not.toBe("");
            contentBefore = $(entry).find('h2').text();
          });
          done();
        });
      });
      /**
       * There should be 4 entries, the same as the length of allFeeds object
       */
      it('There should be as many entries as the ones in the list feed we require', function (done) {
        var entries = $('.feed').find('.entry');
        expect(entries.length).toBe(allFeeds.length);
        done();
      });
    });
}());
