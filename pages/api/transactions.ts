// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { transactions } from "@/transactionData";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let data: any = {};
  const transactionData = prcoessTransactions(transactions);
  data.transactions = prcoessTransactions(transactions);
  data.balance = transactionData[transactionData.length - 1]["balance"];

  res.status(200).json(data);
}

const prcoessTransactions = (transactions: any) => {
  let data = removeDuplicateEntries(transactions);
  data = orderByDate(data);
  data = dataWithDescription(data);
  data = dataWithCorrectOrder(data);
  return data;
};

const removeDuplicateEntries = (transactions: any) => {
  const data = structuredClone(transactions);
  const uniqueIds: number[] = [];
  return data.filter((transaction: any) => {
    if (uniqueIds.indexOf(transaction.activity_id) == -1) {
      uniqueIds.push(transaction.activity_id);
      return true;
    }
    return false;
  });
};

const orderByDate = (transactions: any) => {
  const data = structuredClone(transactions);
  return data.sort((a: any, b: any) => {
    return new Date(a.date) - new Date(b.date);
  });
};

const dataWithDescription = (transactions: any) => {
  return transactions.map((transaction: any) => {
    transaction.description = descriptionBuilder(transaction.type, transaction);
    return transaction;
  });
};

const dataWithCorrectOrder = (transactions: any) => {
  // console.log("transactions", transactions);
  const data = structuredClone(transactions);
  const bufferData: any[] = [];
  const orderedData = [];
  if (data.length > 0) orderedData.push(data[0]);
  console.log("-------");
  for (let index = 1; index < data.length; index++) {
    const transaction = data[index];
    // if (!transaction) return;
    console.log("TRANSACTION ID: ", transaction.activity_id);
    console.log("BUFFER DATA", bufferData);
    if (
      orderedData[orderedData.length - 1]["balance"] + transaction["amount"] ===
      transaction["balance"]
    ) {
      console.log("Correct Transaction");
      orderedData.push(transaction);
    } else if (bufferData.length > 0) {
      const correctTransaction = bufferData.find(
        (bfdata: any, bfIndex: number) => {
          if (
            data[index - 1]["balance"] + bfdata["amount"] ===
            bfdata["balance"]
          ) {
            bufferData.splice(bfIndex, 1);
            return true;
          }
        }
      );

      correctTransaction && orderedData.push(correctTransaction);
      bufferData.push(transaction);
      console.log("data from buffer data", correctTransaction);
    } else {
      console.log("InCorrect Transaction");
      bufferData.push(transaction);
    }
  }
  if (bufferData.length > 0) {
    for (let index = 0; index < bufferData.length; index++) {
      const bfTransaction = bufferData[index];
      if (
        orderedData[orderedData.length - 1]["balance"] +
          bfTransaction["amount"] ===
        bfTransaction["balance"]
      ) {
        orderedData.push(bfTransaction);
        bufferData.splice(index, 1);
      }
    }
  }
  return orderedData;
};

const descriptionBuilder = (transactionType: string, data: any) => {
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
