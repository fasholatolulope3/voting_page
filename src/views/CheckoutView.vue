<script setup>
import { ref, onMounted } from 'vue';
import { useCartStore } from '../stores/cart';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const router = useRouter();

const isProcessing = ref(false);

const handlePayment = () => {
  isProcessing.value = true;
  
  // Simulate processing time for better UX
  setTimeout(() => {
    isProcessing.value = false;
    alert('Payment confirmed! Thank you for your votes.');
    
    // Clear the cart
    cartStore.$patch({ votes: [] });
    
    // Redirect to home
    router.push('/');
  }, 1500);
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  // If cart is empty, redirect back to home
  if (cartStore.totalVotes === 0) {
    router.push('/');
  }
});
</script>

<template>
  <main class="max-w-3xl mx-auto px-6 py-12 pb-32">
    <!-- Header -->
    <div class="mb-8 flex items-center gap-4">
      <button @click="goBack" class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-chocolate hover:bg-cream border border-chocolate/10 transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>
      <h1 class="text-3xl font-serif font-black text-chocolate uppercase tracking-wide">
        Checkout Summary
      </h1>
    </div>

    <div class="bg-white rounded-[2rem] p-8 shadow-sm border border-chocolate/5 space-y-8">
      
      <!-- Votes Summary Section -->
      <section>
        <h2 class="text-xl font-bold text-chocolate mb-4 border-b border-chocolate/10 pb-2">Your Votes</h2>
        <div class="space-y-4">
          <div v-for="(vote, index) in cartStore.votes" :key="index" class="flex justify-between items-center py-2 border-b border-chocolate/5 last:border-0">
            <div>
              <p class="font-bold text-chocolate">{{ vote.nomineeName }}</p>
              <p class="text-sm text-chocolate/50">{{ vote.categoryName }}</p>
            </div>
            <div class="text-right">
              <p class="font-bold text-chocolate bg-cream px-3 py-1 rounded-full">{{ vote.quantity }} votes</p>
              <p class="text-sm text-chocolate/50 mt-1">₦{{ (vote.quantity * 100).toLocaleString() }}</p>
            </div>
          </div>
        </div>

        <!-- Total Row -->
        <div class="mt-6 pt-4 border-t-2 border-chocolate/10 flex justify-between items-center text-xl font-black text-chocolate uppercase tracking-wide">
          <span>Total</span>
          <span>₦{{ cartStore.totalCost.toLocaleString() }}</span>
        </div>
      </section>

      <!-- Bank Transfer Payment Instructions -->
      <section class="bg-cream-dark p-6 rounded-2xl">
        <h2 class="text-xl font-bold text-chocolate mb-4">Payment Instructions</h2>
        <p class="text-chocolate/80 mb-6">
          To complete your voting, please make a transfer of <span class="font-bold">₦{{ cartStore.totalCost.toLocaleString() }}</span> to the bank account below.
        </p>
        
        <div class="bg-white border border-chocolate/10 rounded-xl p-6 mb-6">
          <div class="space-y-4">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <span class="text-sm font-medium text-chocolate/50 uppercase tracking-wider">Bank Name</span>
              <span class="text-lg font-bold text-chocolate">OPAY</span>
            </div>
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <span class="text-sm font-medium text-chocolate/50 uppercase tracking-wider">Account Number</span>
              <span class="text-xl font-black text-[#09A588]">9043036911</span>
            </div>
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <span class="text-sm font-medium text-chocolate/50 uppercase tracking-wider">Account Name</span>
              <span class="text-md font-bold text-chocolate text-right">FASHOLA TOLULOPE OLADAPO</span>
            </div>
          </div>
        </div>

        <form @submit.prevent="handlePayment" class="space-y-4">
          <button 
            type="submit" 
            :disabled="isProcessing"
            class="w-full bg-[#09A588] hover:bg-[#07856d] text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <svg v-if="!isProcessing" class="w-5 h-5 bg-white rounded-full text-[#09A588] p-[2px]" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="animate-spin w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isProcessing ? 'Confirming...' : 'I Have Made The Transfer' }}
          </button>
          
          <p class="text-xs text-center text-chocolate/50 mt-4">
            By clicking this button, you confirm that you have made the transfer to the above account.
          </p>
        </form>
      </section>
      
    </div>
  </main>
</template>
