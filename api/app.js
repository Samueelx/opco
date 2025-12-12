import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import {
  authRouter,
  bandCodesRouter,
  counterfeitCurrencyFraudRouter,
  cybersecurityIncidentRouter,
  directorManagementRouter,
  directorsRouter,
  exchangeRateInfoRouter,
  exchangeRatePositionRouter,
  financialPositionRouter,
  fraudIncidentRouter,
  outletInformationRouter,
  scheduleOfCustomerComplaintRouter,
  scheduleOfSystemInterruptionRouter,
  seniorMgtRouter,
  shareholderInfoRouter,
  shareholdersRouter,
  trustAccPlacementRouter,
  trustAccountRouter,
  trusteesRouter,
  userRouter,
  suspiciousTransactionsRouter,
} from "./routes/index.js";

const app = express();

dotenv.config();
app.use(cookieParser());
app.use(express.json());

const corOptions = {
  origin: ["http://172.23.23.53:5173", "http://localhost:5173"],
  credentials: true,
};

app.use(cors(corOptions));
// app.use(cors({ origin: "https://opco.vercel.app", credentials: true }));
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

// Payment Services Providers(PSP)
app.use("/api/trust-accounts", trustAccountRouter);
app.use("/api/trust-account-placements", trustAccPlacementRouter);
app.use("/api/psp-incidents-of-fraud-theft-robbery", fraudIncidentRouter);
app.use(
  "/api/mobile-psp-counterfeit-currency-frauds",
  counterfeitCurrencyFraudRouter
);
app.use("/api/psp-cybersecurity-incident-record", cybersecurityIncidentRouter);
app.use("/api/psp-schedule-of-shareholders", shareholdersRouter);
app.use("/api/psp-schedule-of-directors", directorsRouter);
app.use("/api/psp-schedule-of-trustees", trusteesRouter);
app.use("/api/psp-schedule-of-senior-management", seniorMgtRouter);

// Banking Supervision Department(BSD)
app.use("/api/exchange-rate-info", exchangeRateInfoRouter);
app.use("/api/exchange-rate-position", exchangeRatePositionRouter);
app.use("/api/director-management-info", directorManagementRouter);
app.use("/api/shareholder-info", shareholderInfoRouter);
app.use("/api/financial-position", financialPositionRouter);
app.use("/api/outlet-information", outletInformationRouter);
app.use(
  "/api/psp-schedule-of-customer-complaints-&-remedial-actions",
  scheduleOfCustomerComplaintRouter
);

app.use(
  "/api/psp-schedule-of-system-stability-and-service-interruption",
  scheduleOfSystemInterruptionRouter
);

app.use("/api/band-codes", bandCodesRouter);

// Suspicious Transactions
app.use("/api/suspicious-transactions", suspiciousTransactionsRouter);

const PORT = 8800 || 8801

app.listen(PORT,"0.0.0.0", () => {
  console.log(`Server running on PORT: ${PORT}`);
});
