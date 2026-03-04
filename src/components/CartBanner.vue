<script setup>
import { useCartStore } from '../stores/cart';
import { useDeadlineStore } from '../stores/deadline';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const deadlineStore = useDeadlineStore();
const router = useRouter();

const proceedToPreview = () => {
  router.push('/checkout');
};
</script>

<template>
  <div 
    v-show="cartStore.totalVotes > 0 && !deadlineStore.isExpired"
    class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1a1a1a] shadow-2xl rounded-full px-8 py-4 flex items-center justify-between gap-8 md:gap-16 w-[90%] max-w-2xl border border-white/10 backdrop-blur-md transition-all duration-300 transform translate-y-0"
  >
    <div class="flex items-center gap-8">
      <!-- Total Votes -->
      <div class="flex flex-col">
        <span class="text-[10px] font-bold tracking-widest text-white/50 uppercase">Total Votes</span>
        <span class="text-white font-bold text-xl">{{ cartStore.totalVotes }}</span>
      </div>
      
      <!-- Total Amount -->
      <div class="flex flex-col">
        <span class="text-[10px] font-bold tracking-widest text-white/50 uppercase">Total Amount</span>
        <span class="text-white font-bold text-xl">₦{{ cartStore.totalCost.toLocaleString() }}</span>
      </div>
    </div>

    <!-- action button -->
    <button 
      @click="proceedToPreview"
      class="bg-[#8a3800] hover:bg-[#5a2a03] text-white font-bold py-3 px-8 rounded-full transition-colors whitespace-nowrap shadow-lg whitespace-nowrap flex-shrink-0"
    >
      Proceed to Preview
    </button>
  </div>
</template>
