// import {Suspense} from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  BandCode,
  BandCodes,
  DirectorMgt,
  ExchangeRates,
  FinPosition,
  ForeignExchangePosition,
  Home,
  Layout,
  Login,
  MobilePSP,
  OutletInfo,
  PSPCybersecurity,
  PSPIncidentFraud,
  PSPScheduleOfCustomerComplaints,
  PSPScheduleOfDirectors,
  PSPScheduleOfSeniorMgt,
  PSPScheduleOfShareholders,
  PSPScheduleOfSystemStabilityAndInterruption,
  PSPScheduleOfTrustees,
  RequireAuthLayout,
  ShareholdersInfo,
  Signup,
  TrustAccountDetails,
  TrustAccountPlacement,
  UserApprovals,
  VerificationNotification,
  SuspiciousTransactions,
  GeneralInformation,
  UNSanctionedList,
} from "./pages";
import {
  cybersecurityIncidentLoader,
  directorMgtLoader,
  exchangeRatesLoader,
  financialPositionLoader,
  foreignExchangePositionLoader,
  fraudIncidentsLoader,
  mobilePSPLoader,
  outletInfoLoader,
  pSPScheduleOfSystemStabilityAndInterruptionLoader,
  scheduleOfCustomerComplaintsLoader,
  scheduleOfDirectorsLoader,
  scheduleOfSeniorMgtLoader,
  scheduleOfShareholdersLoader,
  scheduleOfTrusteesLoader,
  shareholdersInfoLoader,
  trustAccDetailsLoader,
  trustAccPlacementsLoader,
} from "./lib/loaders";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/verification-notification",
          element: <VerificationNotification />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuthLayout />,
      children: [
        {
          path: "/user-approvals",
          element: <UserApprovals />,
        },
        {
          path: "/band-codes",
          element: <BandCodes />,
        },
        {
          path: "/band-codes/:id",
          element: <BandCode />,
        },
        {
          path: "/mobile-psp-counterfeit-currency-frauds",
          element: <MobilePSP />,
          loader: mobilePSPLoader,
        },
        {
          path: "/psp-cybersecurity-incident-record",
          element: <PSPCybersecurity />,
          loader: cybersecurityIncidentLoader,
        },
        {
          path: "/psp-incidents-of-fraud-theft-robbery",
          element: <PSPIncidentFraud />,
          loader: fraudIncidentsLoader,
        },
        {
          path: "/psp-schedule-of-directors",
          element: <PSPScheduleOfDirectors />,
          loader: scheduleOfDirectorsLoader,
        },
        {
          path: "/psp-schedule-of-senior-management",
          element: <PSPScheduleOfSeniorMgt />,
          loader: scheduleOfSeniorMgtLoader,
        },
        {
          path: "/psp-schedule-of-shareholders",
          element: <PSPScheduleOfShareholders />,
          loader: scheduleOfShareholdersLoader,
        },
        {
          path: "/psp-schedule-of-trustees",
          element: <PSPScheduleOfTrustees />,
          loader: scheduleOfTrusteesLoader,
        },
        {
          path: "/trust-account-details",
          element: <TrustAccountDetails />,
          loader: trustAccDetailsLoader,
        },
        {
          path: "/trust-account-placement",
          element: <TrustAccountPlacement />,
          loader: trustAccPlacementsLoader,
        },
        {
          path: "/particulars-of-directors-management-information",
          element: <DirectorMgt />,
          loader: directorMgtLoader,
        },
        {
          path: "/shareholder-information",
          element: <ShareholdersInfo />,
          loader: shareholdersInfoLoader,
        },
        {
          path: "/exchange-rates-information",
          element: <ExchangeRates />,
          loader: exchangeRatesLoader,
        },
        {
          path: "/foreign-exchange-position",
          element: <ForeignExchangePosition />,
          loader: foreignExchangePositionLoader,
        },
        {
          path: "/statements-of-financial-position-and-comprehensive-income",
          element: <FinPosition />,
          loader: financialPositionLoader,
        },
        {
          path: "/outlet-information",
          element: <OutletInfo />,
          loader: outletInfoLoader,
        },
        {
          path: "/psp-schedule-of-customer-complaints-&-remedial-actions",
          element: <PSPScheduleOfCustomerComplaints />,
          loader: scheduleOfCustomerComplaintsLoader,
        },
        {
          path: "/psp-schedule-of-system-stability-and-service-interruption",
          element: <PSPScheduleOfSystemStabilityAndInterruption />,
          loader: pSPScheduleOfSystemStabilityAndInterruptionLoader,
        },
        {
          path: "/suspicious-transactions",
          element: <SuspiciousTransactions />,
        },
        {
          path: "/general-information",
          element: <GeneralInformation />,
        },
        {
          path: "/un-sanctioned-list",
          element: <UNSanctionedList />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
