/* eslint-disable react/prop-types */
const PSPTariff = ({ row }) => {
  return (
    <tr className="even:bg-[#f2f2f2] hover:bg-[#ddd] odd:bg-white">
      <div className="sticky top-0 left-0 z-10 bg-inherit">
        {/* <td className="border py-2 px-4 ">{row.ROW_ID}</td> */}
        <td className="border py-2 px-4">{row.PSP_ID}</td>
        <td className="border py-2 px-4 w-[134px] bg-inherit">
          {row.BAND_CODE}
        </td>
        <td className="border py-2 px-4 w-44">{row.REPORTING_DATE}</td>
      </div>
      <td className="border py-2 px-4">{row.P2P_ON_NET_REGISTERED_WALLET}</td>
      <td className="border py-2 px-4">{row.P2P_ON_NET_NON_REG_WALLET}</td>
      <td className="border py-2 px-4 text-nowrap">
        {row.P2P_OFF_NET_REG_WALLET}
      </td>
      <td className="border py-2 px-4">{row.P2P_OFF_NET_NON_REG_WALLET}</td>
      <td className="border py-2 px-4">
        {row.CASH_WITHDRAWAL_MOB_MONEY_AGENT}
      </td>
      <td className="border py-2 px-4">{row.CASH_WITHDRAWALS_BANK_ATMS}</td>
      <td className="border py-2 px-4">{row.AGENT_COM_CASH_OUT_REG_CUST}</td>
      <td className="border py-2 px-4">{row.AGENT_COM_CASH_OUT_UNREG_CUST}</td>
      <td className="border py-2 px-4">{row.AGENTS_COMMISSION_FOR_CASH_IN}</td>
      <td className="border py-2 px-4">{row.ATM_COMMISSION_FOR_CASH_OUT}</td>
      <td className="border py-2 px-4">{row.ATM_COMMISSION_FOR_CASH_IN}</td>
      <td className="border py-2 px-4">{row.B2C_PAY_BILL_TYPE_1_CUSTOMER}</td>
      <td className="border py-2 px-4">{row.B2C_PAYMENT_PBILL_TYPE_2_CUST}</td>
      <td className="border py-2 px-4">{row.B2C_PAYMENT_PBILL_TYPE_2_BUS}</td>
      <td className="border py-2 px-4">{row.B2C_PAYMENT_PBILL_TYPE_3_BUS}</td>
      <td className="border py-2 px-4">{row.C2B_PAY_BILL_TYPE_1_CUSTOMER}</td>
      <td className="border py-2 px-4">{row.C2B_PAYMENT_PBILL_TYPE_2_CUST}</td>
      <td className="border py-2 px-4">{row.C2B_PAYMENT_PBILL_TYPE_2_BUS}</td>
      <td className="border py-2 px-4">{row.C2B_PAYMENT_PBILL_TYPE_3_BUS}</td>
      <td className="border py-2 px-4">{row.B2B_PAY_BILL_TYPE_1_CUSTOMER}</td>
      <td className="border py-2 px-4">{row.B2B_PAYMENT_PBILL_TYPE_2_CUST}</td>
      <td className="border py-2 px-4">{row.B2B_PAYMENT_P_BILL_TYPE_2_BUS}</td>
      <td className="border py-2 px-4">{row.B2B_PAYMENT_PAY_BILL_TYPE_3}</td>
      <td className="border py-2 px-4">{row.B2C_PAYMENT_BANK_AGGREG_CODE}</td>
      <td className="border py-2 px-4">{row.C2B_PAYMENT_BANK_AGGREG_CODE}</td>
      <td className="border py-2 px-4">{row.TILL_NUMBER_PAYMENTS}</td>
      <td className="border py-2 px-4">{row.CROSS_BORDER_INT_MNY_TRANS_OUT}</td>
      <td className="border py-2 px-4">{row.CROSS_BORDER_INT_MNY_TRANS_IN}</td>
      <td className="border py-2 px-4">{row.P2P_OUTGOING_REG_PARTNER_NET}</td>
    </tr>
  );
};

export default PSPTariff;


// import { useMemo } from 'react';

// const PSPTariff = ({ row }) => {
//   // Define column configurations with sticky and non-sticky columns
//   const stickyColumns = useMemo(() => [
//     { key: 'PSP_ID', width: 'auto' },
//     { key: 'BAND_CODE', width: 'w-[134px]' },
//     { key: 'REPORTING_DATE', width: 'w-44' }
//   ], []);

//   const regularColumns = useMemo(() => [
//     { key: 'P2P_ON_NET_REGISTERED_WALLET' },
//     { key: 'P2P_ON_NET_NON_REG_WALLET' },
//     { key: 'P2P_OFF_NET_REG_WALLET', className: 'text-nowrap' },
//     { key: 'P2P_OFF_NET_NON_REG_WALLET' },
//     { key: 'CASH_WITHDRAWAL_MOB_MONEY_AGENT' },
//     { key: 'CASH_WITHDRAWALS_BANK_ATMS' },
//     { key: 'AGENT_COM_CASH_OUT_REG_CUST' },
//     { key: 'AGENT_COM_CASH_OUT_UNREG_CUST' },
//     { key: 'AGENTS_COMMISSION_FOR_CASH_IN' },
//     { key: 'ATM_COMMISSION_FOR_CASH_OUT' },
//     { key: 'ATM_COMMISSION_FOR_CASH_IN' },
//     { key: 'B2C_PAY_BILL_TYPE_1_CUSTOMER' },
//     { key: 'B2C_PAYMENT_PBILL_TYPE_2_CUST' },
//     { key: 'B2C_PAYMENT_PBILL_TYPE_2_BUS' },
//     { key: 'B2C_PAYMENT_PBILL_TYPE_3_BUS' },
//     { key: 'C2B_PAY_BILL_TYPE_1_CUSTOMER' },
//     { key: 'C2B_PAYMENT_PBILL_TYPE_2_CUST' },
//     { key: 'C2B_PAYMENT_PBILL_TYPE_2_BUS' },
//     { key: 'C2B_PAYMENT_PBILL_TYPE_3_BUS' },
//     { key: 'B2B_PAY_BILL_TYPE_1_CUSTOMER' },
//     { key: 'B2B_PAYMENT_PBILL_TYPE_2_CUST' },
//     { key: 'B2B_PAYMENT_P_BILL_TYPE_2_BUS' },
//     { key: 'B2B_PAYMENT_PAY_BILL_TYPE_3' },
//     { key: 'B2C_PAYMENT_BANK_AGGREG_CODE' },
//     { key: 'C2B_PAYMENT_BANK_AGGREG_CODE' },
//     { key: 'TILL_NUMBER_PAYMENTS' },
//     { key: 'CROSS_BORDER_INT_MNY_TRANS_OUT' },
//     { key: 'CROSS_BORDER_INT_MNY_TRANS_IN' },
//     { key: 'P2P_OUTGOING_REG_PARTNER_NET' }
//   ], []);

//   const baseColumnClasses = "border py-2 px-4";

//   return (
//     <tr className="even:bg-[#f2f2f2] hover:bg-[#ddd] odd:bg-white">
//       {/* Sticky Columns */}
//       <td className="sticky left-0 z-10" colSpan={stickyColumns.length}>
//         <div className="flex">
//           {stickyColumns.map(({ key, width }) => (
//             <div
//               key={key}
//               className={`${baseColumnClasses} ${width} bg-inherit border-r`}
//             >
//               {row[key]}
//             </div>
//           ))}
//         </div>
//       </td>

//       {/* Regular Columns */}
//       {regularColumns.map(({ key, className = '' }) => (
//         <td key={key} className={`${baseColumnClasses} ${className}`}>
//           {row[key]}
//         </td>
//       ))}
//     </tr>
//   );
// };

// export default PSPTariff;