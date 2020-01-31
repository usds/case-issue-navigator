import { API_BASE_URL } from "../../controller/config";
import nock from "nock";
import { activeCases } from "./fakeData";
import { RESULTS_PER_PAGE } from "../../api/URLs";

const caseManagementSystem = process.env.REACT_APP_CASE_MANAGEMENT_SYSTEM;
const caseType = process.env.REACT_APP_CASE_TYPE;

export const successfulLoadAPIMock = () => {
  const apiMock = nock(API_BASE_URL).defaultReplyHeaders({
    "access-control-allow-origin": "*",
    "access-control-allow-credentials": "true"
  });

  apiMock.get("/api/users").reply(200, {
    name: "John Doe",
    ID: "fake_user_uuid"
  });

  apiMock.get("/csrf").reply(200, {
    headerName: "X-CSRF-TOKEN",
    parameterName: "_csrf",
    token: "fake_csrf_token"
  });

  apiMock
    .get(`/api/cases/${caseManagementSystem}/${caseType}/summary`)
    .reply(200, {
      CURRENTLY_SNOOZED: 14,
      PREVIOUSLY_SNOOZED: 3,
      NEVER_SNOOZED: 283
    })
    .persist();

  apiMock
    .get(
      `/api/cases/${caseManagementSystem}/${caseType}?mainFilter=ALL&size=${RESULTS_PER_PAGE +
        1}`
    )
    .reply(200, activeCases);

  return apiMock;
};

export const unsuccessfulLoadAPIMock = () => {
  const apiMock = nock(API_BASE_URL).defaultReplyHeaders({
    "access-control-allow-origin": "*",
    "access-control-allow-credentials": "true"
  });

  apiMock.get("/api/users").reply(401, {});

  apiMock.get("/csrf").reply(401, {});

  apiMock
    .get(`/api/cases/${caseManagementSystem}/${caseType}/summary`)
    .reply(401, {});

  apiMock
    .get(
      `/api/cases/${caseManagementSystem}/${caseType}?mainFilter=ALL&size=20`
    )
    .reply(401, []);

  return apiMock;
};

export const snoozeMock = (receiptNumber: string) => {
  const url = `/api/caseDetails/${caseManagementSystem}/${receiptNumber}/activeSnooze`;

  const apiMock = nock(API_BASE_URL).defaultReplyHeaders({
    "access-control-allow-origin": "*",
    "access-control-allow-credentials": "true"
  });

  apiMock.options(url).reply(200);

  apiMock.put(url).reply(201);

  return apiMock;
};
