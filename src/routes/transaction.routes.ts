import { Router } from 'express';

// import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transaction = transactionsRepository.all();
    const balance = transactionsRepository.balance();
    return response.json({ transaction, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // TODO
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
