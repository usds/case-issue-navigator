export default {
  snooze_options: [
    {
      value: "test_data",
      text: "Test Data - should be deleted",
      short_text: "Test Data",
      snooze_days: 365
    },
    {
      value: "assigned_case",
      text: "Case has been assigned - remind me later",
      short_text: "Assigned",
      snooze_days: 5,
      follow_up: "Who is the case being assigned to?"
    },
    {
      value: "in_proceedings",
      short_text: "In Proceedings",
      text: "Case is pending removal proceedings - check back later",
      snooze_days: 30
    },
    {
      value: "fo_refferal",
      text: "Stuck at field office - awaiting response",
      short_text: "Field Office",
      follow_up: "Enter Field Office location code:",
      snooze_days: 5
    },
    {
      value: "technical_issue",
      text: "Technical Issue - awaiting resolution through ServiceNow",
      short_text: "Technical Bug",
      follow_up: "ServiceNow ticket ID:",
      snooze_days: 14
    },
    {
      value: "bcu",
      text: "Referral to BCU or CFDO",
      short_text: "Referring to BCU/CFDO",
      follow_up: "Reason for referral",
      snooze_days: 30
    }
  ]
};
