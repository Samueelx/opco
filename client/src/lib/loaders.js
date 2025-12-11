import { defer } from "react-router-dom";

import apiRequest from "./apiRequest";

export const trustAccDetailsLoader = async () => {
  const trustAccDetailsPromise = apiRequest("/trust-accounts");

  return defer({
    trustAccDetailsResponse: trustAccDetailsPromise,
  });
};

export const trustAccPlacementsLoader = async () => {
  const trustAccPlacementsPromise = apiRequest("/trust-account-placements");

  return defer({
    trustAccPlacementsResponse: trustAccPlacementsPromise,
  });
};

export const fraudIncidentsLoader = async () => {
  const fraudIncidentsPromise = apiRequest(
    "/psp-incidents-of-fraud-theft-robbery"
  );

  return defer({
    fraudIncidentsResponse: fraudIncidentsPromise,
  });
};

export const mobilePSPLoader = async () => {
  const mobilePSPPromise = apiRequest(
    "/mobile-psp-counterfeit-currency-frauds"
  );

  return defer({
    mobilePSPResponse: mobilePSPPromise,
  });
};

export const cybersecurityIncidentLoader = async () => {
  const cybersecurityIncidentPromise = apiRequest(
    "/psp-cybersecurity-incident-record"
  );

  return defer({
    cybersecurityIncidentResponse: cybersecurityIncidentPromise,
  });
};

export const scheduleOfDirectorsLoader = async () => {
  const scheduleOfDirectorsPromise = apiRequest("/psp-schedule-of-directors");

  return defer({
    scheduleOfDirectorsResponse: scheduleOfDirectorsPromise,
  });
};

export const scheduleOfShareholdersLoader = async () => {
  const scheduleOfShareholdersPromise = apiRequest(
    "/psp-schedule-of-shareholders"
  );

  return defer({
    scheduleOfShareholdersResponse: scheduleOfShareholdersPromise,
  });
};

export const scheduleOfTrusteesLoader = async () => {
  const scheduleOfTrusteesPromise = apiRequest("/psp-schedule-of-trustees");

  return defer({
    scheduleOfTrusteesResponse: scheduleOfTrusteesPromise,
  });
};

export const scheduleOfSeniorMgtLoader = async () => {
  const scheduleOfSeniorMgtPromise = apiRequest(
    "/psp-schedule-of-senior-management"
  );

  return defer({
    scheduleOfSeniorMgtResponse: scheduleOfSeniorMgtPromise,
  });
};

export const directorMgtLoader = async () => {
  const directorMgtPromise = apiRequest("/director-management-info");

  return defer({
    directorMgtResponse: directorMgtPromise,
  });
};

export const exchangeRatesLoader = async () => {
  const exchangeRatesPromise = apiRequest("/exchange-rate-info");

  return defer({
    exchangeRatesResponse: exchangeRatesPromise,
  });
};

export const financialPositionLoader = async () => {
  const financialPositionPromise = apiRequest("/financial-position");

  return defer({
    financialPositionResponse: financialPositionPromise,
  });
};

export const foreignExchangePositionLoader = async () => {
  const foreignExchangePositionPromise = apiRequest("/exchange-rate-position");

  return defer({
    foreignExchangePositionResponse: foreignExchangePositionPromise,
  });
};

export const shareholdersInfoLoader = async () => {
  const shareholdersInfoPromise = apiRequest("/shareholder-info");

  return defer({
    shareholdersInfoResponse: shareholdersInfoPromise,
  });
};

export const outletInfoLoader = async () => {
  const outletInfoLoaderPromise = apiRequest("/outlet-information");

  return defer({
    outletInfoLoaderResponse: outletInfoLoaderPromise,
  });
};

export const scheduleOfCustomerComplaintsLoader = async () => {
  const scheduleOfCustomerComplaintsLoaderPromise = apiRequest(
    "/psp-schedule-of-customer-complaints-&-remedial-actions/"
  );

  return defer({
    scheduleOfCustomerComplaintsLoaderResponse:
      scheduleOfCustomerComplaintsLoaderPromise,
  });
};

export const pSPScheduleOfSystemStabilityAndInterruptionLoader = async () => {
  const pSPScheduleOfSystemStabilityAndInterruptionLoaderPromise = apiRequest(
    "/psp-schedule-of-system-stability-and-service-interruption"
  );

  return defer({
    pSPScheduleOfSystemStabilityAndInterruptionLoaderResponse:
      pSPScheduleOfSystemStabilityAndInterruptionLoaderPromise,
  });
};
