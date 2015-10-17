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
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('all url in feeds are defined', function () {
          for(var feed in allFeeds) {
            expect(allFeeds[feed].url).toBeDefined();
            expect(allFeeds[feed].url).not.toBe("");
          }
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('all name in feeds are defined', function () {
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
        menu = $('.menu-hidden>.menu');
      });
      /* Write a test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */
      it('should be hidden by default', function () {
        expect(menu.css('transform')).toBe('matrix(1, 0, 0, 1, -192, 0)');
        expect(menu.css('transition')).toBe('transform 0.2s ease 0s');
      });
     /* Write a test that ensures the menu changes
      * visibility when the menu icon is clicked. This test
      * should have two expectations: does the menu display when
      * clicked and does it hide when clicked again.
      */
      describe('menu open and closes', function () {
        var timerCallback, menuLink;
        beforeEach(function () {
          menuLink = $('.menu-icon-link');
          timerCallback = jasmine.createSpy('timerCallback');
          jasmine.clock().install();
        });
        afterEach(function () {
          jasmine.clock().uninstall();
        });

        it('should display when clicked', function () {
          menuLink.trigger('click');
          timerCallback();
          jasmine.clock().tick(220);
          expect(timerCallback).toHaveBeenCalled();
          expect(menu.css('transform')).toBe('matrix(1, 0, 0, 1, -192, 0)');
        });
        it('should hide when clicked again', function () {
          menuLink.trigger('click');
          timerCallback();
          jasmine.clock().tick(220);
          expect(timerCallback).toHaveBeenCalled();
          expect(menu.css('transform')).not.toBeDefined();
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
      it('load feeds asynchronous', function () {
        expect($('.entry').length).not.toBe(0);
      });
    });
    /* Write a new test suite named "New Feed Selection*/
    describe('New Feed Selection', function () {
      beforeEach(function (done) {
        loadFeed(0, done);
      });

      /* Write a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
      it('feed is loaded with content', function () {
        var entries = $('.feed').find('.entry'), entryValue;
        entries.each(function (index, entry) {
          expect($(entry).find('h2').text()).toBeDefined();
          expect($(entry).find('h2').text()).not.toBe("");
          expect($(entry).find('p').text()).toBeDefined();
          expect($(entry).find('p').text()).not.toBe("");
        });
      });
    });
}());
