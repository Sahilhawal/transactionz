export const descriptionBuilder = (transactionType: string, data: any) => {
  switch (transactionType) {
    case "DEPOSIT":
      return buildDepositDescription(data);
    case "INVESTMENT":
      return `Your investment in ${data["destination"]["description"]}`;
    case "REFUND":
      return `Refund from ${data["source"]["description"]}`;
    case "TRANSFER":
      return `Transferred to ${data["source"]["description"]}`;
    case "WITHDRAWAL":
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
