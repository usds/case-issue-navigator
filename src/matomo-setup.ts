import Piwik from "react-piwik";

const IS_TEST_ENV = process.env.NODE_ENV === "test";

const matomo =
  !IS_TEST_ENV &&
  new Piwik({
    url: process.env.REACT_APP_MATOMO_URL,
    siteId: process.env.REACT_APP_MATOMO_SITE_ID,
    trackErrors: true
  });

const ReactPiwik = IS_TEST_ENV ? [] : Piwik;

// Force Matomo to track a new visit on initial page view only
//   "new_visit — If set to 1, will force a new visit to be created for this action"
ReactPiwik.push(["appendToTrackingUrl", "new_visit=1"]);
ReactPiwik.push(["trackPageView"]);

// Immediately unset new_visit so subsequent actions/events continue in current visit
ReactPiwik.push(["appendToTrackingUrl", "new_visit=0"]);

// Enable periodic heartbeat requests to track time spent per page more precisely
ReactPiwik.push(["enableHeartBeatTimer"]);

// Enable JS error tracking
ReactPiwik.push(["enableJSErrorTracking"]);

const trackEvent: MatomoTrackEvent = (category, action, name, value) => {
  // Don't track events during tests since Matomo isn't initialized
  if (!IS_TEST_ENV) {
    ReactPiwik.push(["trackEvent", category, action, name, value]);
  }
};

const trackPageView = () => {
  ReactPiwik.push(["trackPageView"]);
};

const setDocumentTitle = (title: string) => {
  ReactPiwik.push(["setDocumentTitle", title]);
};

const forceNewVisit = () => {
  // Force Matomo to track a new visit on initial page view only
  //   "new_visit — If set to 1, will force a new visit to be created for this action"
  ReactPiwik.push(["appendToTrackingUrl", "new_visit=1"]);
  trackPageView();

  // Immediately unset new_visit so subsequent actions/events continue in current visit
  ReactPiwik.push(["appendToTrackingUrl", "new_visit=0"]);
};

export { forceNewVisit, matomo, setDocumentTitle, trackEvent, trackPageView };
