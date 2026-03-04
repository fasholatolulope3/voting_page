<script setup>
import { useAdminStore } from '../stores/admin';
import { useRouter } from 'vue-router';

const adminStore = useAdminStore();
const router = useRouter();

const approve = (id) => {
  if (confirm('Are you sure you want to approve these votes?')) {
    adminStore.approveTransaction(id);
  }
};

const reject = (id) => {
  if (confirm('Are you sure you want to reject these votes?')) {
    adminStore.rejectTransaction(id);
  }
};

const goBack = () => {
  router.push('/');
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString();
};
</script>

<template>
  <main class="max-w-6xl mx-auto px-6 py-12 pb-32">
    <div class="mb-8 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button @click="goBack" class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-chocolate hover:bg-cream border border-chocolate/10 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 class="text-3xl font-serif font-black text-chocolate uppercase tracking-wide">
          Admin Dashboard
        </h1>
      </div>
      <div class="text-chocolate/50 font-medium">
        {{ adminStore.pendingTransactions.length }} Pending Transactions
      </div>
    </div>

    <div v-if="adminStore.pendingTransactions.length === 0" class="bg-white rounded-[2rem] p-12 text-center border border-chocolate/5 shadow-sm">
      <div class="w-20 h-20 bg-cream rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-chocolate/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 class="text-2xl font-serif font-bold text-chocolate mb-2">No pending transactions</h2>
      <p class="text-chocolate/50">All votes have been processed.</p>
    </div>

    <div v-else class="space-y-6">
      <div v-for="tx in adminStore.pendingTransactions" :key="tx.id" 
           class="bg-white rounded-[2rem] overflow-hidden border border-chocolate/5 shadow-sm hover:shadow-md transition-shadow">
        <div class="p-8">
          <div class="flex flex-col lg:flex-row gap-8">
            <!-- Left Side: User Info & Votes -->
            <div class="flex-1 space-y-6">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-xl font-bold text-chocolate">{{ tx.fullName }}</h3>
                  <p class="text-chocolate/50">{{ tx.email }}</p>
                  <p class="text-xs text-chocolate/30 mt-1 uppercase tracking-widest font-bold">{{ formatDate(tx.timestamp) }}</p>
                </div>
                <div :class="[
                  'px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest border',
                  tx.status === 'pending' ? 'bg-yellow-50 text-yellow-600 border-yellow-200' : 
                  tx.status === 'approved' ? 'bg-green-50 text-green-600 border-green-200' : 
                  'bg-red-50 text-red-600 border-red-200'
                ]">
                  {{ tx.status }}
                </div>
              </div>

              <div class="bg-cream/30 rounded-2xl p-6 border border-chocolate/5">
                <h4 class="text-sm font-black text-chocolate uppercase tracking-widest mb-4 border-b border-chocolate/10 pb-2">Votes Summary</h4>
                <div class="space-y-3">
                  <div v-for="(vote, idx) in tx.votes" :key="idx" class="flex justify-between items-center text-sm">
                    <div>
                      <span class="font-bold text-chocolate">{{ vote.nomineeName }}</span>
                      <span class="text-chocolate/50 ml-2">({{ vote.categoryName }})</span>
                    </div>
                    <span class="bg-white px-2 py-0.5 rounded-full border border-chocolate/10 font-bold text-chocolate">{{ vote.quantity }}</span>
                  </div>
                  <div class="pt-3 mt-3 border-t border-chocolate/10 flex justify-between items-center font-black text-chocolate">
                    <span>TOTAL PAYMENT</span>
                    <span class="text-lg">₦{{ tx.totalCost.toLocaleString() }}</span>
                  </div>
                </div>
              </div>

              <div v-if="tx.status === 'pending'" class="flex flex-col sm:flex-row gap-4">
                <button @click="approve(tx.id)" class="flex-1 bg-[#09A588] hover:bg-[#07856d] text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Approve Votes
                </button>
                <button @click="reject(tx.id)" class="bg-white border border-red-200 text-red-500 hover:bg-red-50 font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div v-else-if="tx.status === 'approved'" class="space-y-4">
                <div class="text-center p-4 rounded-xl bg-green-50 text-green-600 font-bold border border-green-100 flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  Payment Confirmed & Votes Counted
                </div>
                <a 
                  :href="`mailto:${tx.email}?subject=Votes Confirmed - Departmental Awards&body=Hello ${tx.fullName},%0D%0A%0D%0AYour payment for the departmental awards has been confirmed and your votes have been successfully counted. Thank you for participating!%0D%0A%0D%0ABest regards,%0D%0AAwards Admin`"
                  class="w-full flex items-center justify-center gap-2 py-3 bg-white border border-chocolate/10 rounded-xl text-chocolate font-bold hover:bg-cream transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Confirmation to Voter
                </a>
              </div>
              <div v-else class="text-center p-4 rounded-xl bg-red-50 text-red-500 font-bold border border-red-100">
                Transaction Rejected
              </div>
            </div>

            <!-- Right Side: Receipt Image -->
            <div class="lg:w-80 shrink-0">
              <p class="text-xs font-black text-chocolate uppercase tracking-widest mb-2 px-2">Payment Receipt</p>
              <div class="bg-chocolate/5 rounded-2xl overflow-hidden border border-chocolate/10 aspect-[3/4] group relative cursor-zoom-in">
                <img :src="tx.receiptImage" class="w-full h-full object-contain" />
                <a :href="tx.receiptImage" target="_blank" class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span class="bg-white px-4 py-2 rounded-full font-bold text-chocolate shadow-xl text-sm">View Full Image</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
