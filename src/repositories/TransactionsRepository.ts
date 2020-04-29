import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const Balance = this.transactions.reduce(
      (balance, { value, type }) => {
        if (type === 'income') {
          balance.income += value;
        } else {
          balance.outcome += value;
        }
        balance.total = balance.income - balance.outcome;
        return balance;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    return Balance;
  }

  public create({ type, value, title }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ type, value, title });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
