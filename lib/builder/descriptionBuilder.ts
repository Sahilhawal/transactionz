import { TransactionType } from "@/interfaces";

export const descriptionBuilder = (
  transactionType: TransactionType,
  data: any
) => {
  switch (transactionType) {
    case TransactionType.DEPOSIT:
      return buildDepositDescription(data);
    case TransactionType.INVESTMENT:
      return `Your investment in ${data["destination"]["description"]}`;
    case TransactionType.REFUND:
      return `Refund from ${data["source"]["description"]}`;
    case TransactionType.TRANSFER:
      return `Transferred to ${data["source"]["description"]}`;
    case TransactionType.WITHDRAWAL:
      return `Withdrawed from ${data["destination"]["description"]}`;
    default:
      break;
  }
};

const buildDepositDescription = (data: any) => {
  let descriptionString = `Deposit of ${data["amount"]}`;

  if (data["source"]["description"]) {
    descriptionString += ` from ${data["source"]["description"]}`;
  }

  if (data["method"]) {
    descriptionString += ` by ${data["method"]}`;
  }

  return descriptionString;
};
