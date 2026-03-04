import { defineStore } from 'pinia';
import { ref } from 'vue';
import { applyApprovedVotes } from './categories';

export const useAdminStore = defineStore('admin', () => {
  // Load initial data from localStorage if available
  const savedTransactions = localStorage.getItem('pending_transactions');
  const pendingTransactions = ref(savedTransactions ? JSON.parse(savedTransactions) : []);

  // Helper to save to local storage
  const syncStorage = () => {
    localStorage.setItem('pending_transactions', JSON.stringify(pendingTransactions.value));
  };

  const submitTransaction = (transactionData) => {
    const newTransaction = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      timestamp: new Date().toISOString(),
      status: 'pending',
      ...transactionData
    };
    
    pendingTransactions.value.unshift(newTransaction);
    syncStorage();
    return newTransaction.id;
  };

  const approveTransaction = (id) => {
    const transaction = pendingTransactions.value.find(t => t.id === id);
    if (transaction && transaction.status === 'pending') {
      transaction.status = 'approved';
      applyApprovedVotes(transaction.votes);
      syncStorage();
    }
  };

  const rejectTransaction = (id) => {
    const transaction = pendingTransactions.value.find(t => t.id === id);
    if (transaction && transaction.status === 'pending') {
      transaction.status = 'rejected';
      syncStorage();
    }
  };

  return {
    pendingTransactions,
    submitTransaction,
    approveTransaction,
    rejectTransaction
  };
});
