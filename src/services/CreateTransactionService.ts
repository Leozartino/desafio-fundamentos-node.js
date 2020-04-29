import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Type must be a valid value to type: income or outcome');
    }
    const result = this.transactionsRepository.getBalance().total;
    if (type === 'outcome' && value > result) {
      throw Error('The outcome operation must not exceed your balance.');
    }
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
