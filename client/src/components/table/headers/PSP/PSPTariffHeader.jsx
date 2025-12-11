const PSPTariffHeader = () => {
  return (
    <thead className="">
      <tr className="text-white">
        <div className="sticky top-0 left-0 z-10">
          {/* <th className="border p-4 bg-red-400">ROW_ID</th> */}
          <th className="border p-4 bg-red-400">PSP_ID</th>
          <th className="border p-4 bg-red-400">BAND_CODE</th>
          <th className="border p-4 bg-red-400">REPORTING_DATE</th>
        </div>

        <th className="border p-4 bg-red-400">P2P_ON_NET_REGISTERED_WALLET</th>
        <th className="border p-4 bg-red-400">P2P_ON_NET_NON_REG_WALLET</th>
        <th className="border p-4 bg-red-400">P2P_OFF_NET_REG_WALLET</th>
        <th className="border p-4 bg-red-400">P2P_OFF_NET_NON_REG_WALLET</th>
        <th className="border p-4 bg-red-400">
          CASH_WITHDRAWAL_MOB_MONEY_AGENT
        </th>
        <th className="border p-4 bg-red-400">CASH_WITHDRAWALS_BANK_ATMS</th>
        <th className="border p-4 bg-red-400">AGENT_COM_CASH_OUT_REG_CUST</th>
        <th className="border p-4 bg-red-400">AGENT_COM_CASH_OUT_UNREG_CUST</th>
        <th className="border p-4 bg-red-400">AGENTS_COMMISSION_FOR_CASH_IN</th>
        <th className="border p-4 bg-red-400">ATM_COMMISSION_FOR_CASH_OUT</th>
        <th className="border p-4 bg-red-400">ATM_COMMISSION_FOR_CASH_IN</th>
        <th className="border p-4 bg-red-400">B2C_PAY_BILL_TYPE_1_CUSTOMER</th>
        <th className="border p-4 bg-red-400">B2C_PAYMENT_PBILL_TYPE_2_CUST</th>
        <th className="border p-4 bg-red-400">B2C_PAYMENT_PBILL_TYPE_2_BUS</th>
        <th className="border p-4 bg-red-400">B2C_PAYMENT_PBILL_TYPE_3_BUS</th>
        <th className="border p-4 bg-red-400">C2B_PAY_BILL_TYPE_1_CUSTOMER</th>
        <th className="border p-4 bg-red-400">C2B_PAYMENT_PBILL_TYPE_2_CUST</th>
        <th className="border p-4 bg-red-400">C2B_PAYMENT_PBILL_TYPE_2_BUS</th>
        <th className="border p-4 bg-red-400">C2B_PAYMENT_PBILL_TYPE_3_BUS</th>
        <th className="border p-4 bg-red-400">B2B_PAY_BILL_TYPE_1_CUSTOMER</th>
        <th className="border p-4 bg-red-400">B2B_PAYMENT_PBILL_TYPE_2_CUST</th>
        <th className="border p-4 bg-red-400">B2B_PAYMENT_P_BILL_TYPE_2_BUS</th>
        <th className="border p-4 bg-red-400">B2B_PAYMENT_PAY_BILL_TYPE_3</th>
        <th className="border p-4 bg-red-400">B2C_PAYMENT_BANK_AGGREG_CODE</th>
        <th className="border p-4 bg-red-400">C2B_PAYMENT_BANK_AGGREG_CODE</th>
        <th className="border p-4 bg-red-400">TILL_NUMBER_PAYMENTS</th>
        <th className="border p-4 bg-red-400">
          CROSS_BORDER_INT_MNY_TRANS_OUT
        </th>
        <th className="border p-4 bg-red-400">CROSS_BORDER_INT_MNY_TRANS_IN</th>
        <th className="border p-4 bg-red-400">P2P_OUTGOING_REG_PARTNER_NET</th>
      </tr>
    </thead>
  );
};

export default PSPTariffHeader;
