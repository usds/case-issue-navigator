export default {
  snoozeOptions: [
    {
      value: "test_data",
      snoozeReason: "Test Data - should be deleted",
      duration: 365
    },
    {
      value: "assigned_case",
      snoozeReason: "Case has been assigned - remind me later",
      duration: 5,
      followUp: "Who is the case being assigned to?"
    },
    {
      value: "in_proceedings",
      snoozeReason: "Case is pending removal proceedings - check back later",
      duration: 30
    },
    {
      value: "fo_refferal",
      snoozeReason: "Stuck at field office - awaiting response",
      followUp: "Enter Field Office location code:",
      duration: 5
    },
    {
      value: "technical_issue",
      snoozeReason: "Technical Issue - awaiting resolution through ServiceNow",
      followUp: "ServiceNow ticket ID:",
      duration: 14
    },
    {
      value: "bcu",
      snoozeReason: "Referral to BCU or CFDO",
      followUp: "Reason for referral",
      duration: 30
    }
  ]
};
