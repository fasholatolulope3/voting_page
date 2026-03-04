import { defineStore } from 'pinia';
import { ref } from 'vue';
import { applyApprovedVotes } from './categories';

export const useAdminStore = defineStore('admin', () => {
  const pendingTransactions = ref([]);

  const submitTransaction = (transactionData) => {
    // Generate a simple unique ID and add timestamp
    const newTransaction = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      timestamp: new Date().toISOString(),
      status: 'pending',
      ...transactionData
    };
    
    // In a real app this would go to a database
    pendingTransactions.value.unshift(newTransaction);
    return newTransaction.id;
  };

  const approveTransaction = (id) => {
    const transaction = pendingTransactions.value.find(t => t.id === id);
    if (transaction && transaction.status === 'pending') {
      transaction.status = 'approved';
      // Apply the votes to the main categories store
      applyApprovedVotes(transaction.votes);
      
      // Move from pending to history/clean up if needed later, but for now we just change status.
    }
  };

  const rejectTransaction = (id) => {
    const transaction = pendingTransactions.value.find(t => t.id === id);
    if (transaction && transaction.status === 'pending') {
      transaction.status = 'rejected';
    }
  };

  return {
    pendingTransactions,
    submitTransaction,
    approveTransaction,
    rejectTransaction
  };
});
