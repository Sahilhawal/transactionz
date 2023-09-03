import { ITransaction, TransactionType } from "@/interfaces";
import { descriptionBuilder } from "../builder/descriptionBuilder";

export default class TransactionCollection {
  constructor() {}

  static removeDuplicateEntries(transactions: ITransaction[]): ITransaction[] {
    const uniqueIds = new Set();
    return transactions.filter((transaction: any) => {
      if (!uniqueIds.has(transaction.activity_id)) {
        uniqueIds.add(transaction.activity_id);
        return true;
      }
      return false;
    });
  }

  static orderByDate(transactions: ITransaction[]): ITransaction[] {
    return (
      transactions
        .slice()
        //@ts-ignore
        .sort((a: any, b: any) => new Date(a.date) - new Date(b.date))
    );
  }

  static dataWithDescription(transactions: ITransaction[]): ITransaction[] {
    return transactions.map((transaction: ITransaction) => ({
      ...transaction,
      description: descriptionBuilder(
        transaction.type as TransactionType,
        transaction
      ),
    }));
  }

  static dataWithCorrectOrder(transactions: ITransaction[]): ITransaction[] {
    const orderedData: ITransaction[] = [];
    const bufferData: ITransaction[] = [];

    if (transactions.length > 0) orderedData.push(transactions[0]);

    for (let index = 1; index < transactions.length; index++) {
      const transaction = transactions[index];
      if (
        orderedData[orderedData.length - 1].balance + transaction.amount ===
        transaction.balance
      ) {
        orderedData.push(transaction);
      } else if (bufferData.length > 0) {
        const correctTransactionIndex = bufferData.findIndex((bfdata) => {
          return (
            transactions[index - 1].balance + bfdata.amount === bfdata.balance
          );
        });

        if (correctTransactionIndex !== -1) {
          const correctTransaction = bufferData.splice(
            correctTransactionIndex,
            1
          );
          orderedData.push(correctTransaction[0]);
        }
        bufferData.push(transaction);
      } else {
        bufferData.push(transaction);
      }
    }

    if (bufferData.length > 0) {
      for (let index = 0; index < bufferData.length; index++) {
        const bfTransaction = bufferData[index];
        if (
          orderedData[orderedData.length - 1].balance + bfTransaction.amount ===
          bfTransaction.balance
        ) {
          orderedData.push(bfTransaction);
          bufferData.splice(index, 1);
        }
      }
    }

    return orderedData;
  }
}
