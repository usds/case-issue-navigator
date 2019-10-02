declare module "react-piwik";

type MatomoEventCategory = "snooze";
type MatomoEventAction = "createSnooze" | "reSnooze" | "deSnooze";
type MatomoEventName = "snoozeReason";
type MatomoEventValue = string | number;

type MatomoTrackEvent = (
  category: MatomoEventCategory,
  action: MatomoEventAction,
  name: MatomoEventName,
  value: MatomoEventValue
) => void;
