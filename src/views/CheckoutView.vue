<script setup>
import { ref, onMounted } from 'vue';
import { useCartStore } from '../stores/cart';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const router = useRouter();

const email = ref('');
const fullName = ref('');
const isProcessing = ref(false);

// We use a placeholder for the Paystack public key.
// The user should replace this before going to production.
const paystackPublicKey = 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

const handlePayment = () => {
  if (!email.value) {
    alert("Please enter your email address.");
    return;
  }

  isProcessing.value = true;

  const handler = PaystackPop.setup({
    key: paystackPublicKey, 
    email: email.value,
    amount: cartStore.totalCost * 100, // Paystack amount is in kobo, so * 100
    currency: 'NGN',
    metadata: {
      custom_fields: [
        {
          display_name: "Full Name",
          variable_name: "full_name",
          value: fullName.value
        },
        {
          display_name: "Votes Summary",
          variable_name: "votes_summary",
          value: JSON.stringify(cartStore.votes)
        }
      ]
    },
    callback: function(response){
      isProcessing.value = false;
      // Payment successful
      alert(`Payment complete! Reference: ${response.reference}`);
      
      // Clear the cart
      cartStore.$patch({ votes: [] });
      
      // Redirect to home
      router.push('/');
    },
    onClose: function(){
      isProcessing.value = false;
      alert('Transaction was not completed, window closed.');
    }
  });

  handler.openIframe();
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

      <!-- Paystack Payment Form -->
      <section class="bg-cream-dark p-6 rounded-2xl">
        <h2 class="text-lg font-bold text-chocolate mb-4">Payment Details</h2>
        <form @submit.prevent="handlePayment" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-chocolate/80 mb-1">Email Address *</label>
            <input 
              v-model="email" 
              type="email" 
              required 
              placeholder="voter@example.com"
              class="w-full px-4 py-3 bg-white border border-chocolate/10 rounded-xl focus:ring-2 focus:ring-chocolate/20 focus:outline-none transition-all placeholder:text-chocolate/30"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-chocolate/80 mb-1">Full Name (Optional)</label>
            <input 
              v-model="fullName" 
              type="text" 
              placeholder="John Doe"
              class="w-full px-4 py-3 bg-white border border-chocolate/10 rounded-xl focus:ring-2 focus:ring-chocolate/20 focus:outline-none transition-all placeholder:text-chocolate/30"
            />
          </div>

          <button 
            type="submit" 
            :disabled="isProcessing"
            class="w-full mt-4 bg-[#09A588] hover:bg-[#07856d] text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <svg v-if="!isProcessing" class="w-5 h-5 bg-white rounded-full text-[#09A588] p-[2px]" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="animate-spin w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isProcessing ? 'Processing...' : 'Pay with Paystack' }}
          </button>
          
          <p class="text-xs text-center text-chocolate/50 mt-4 flex items-center justify-center gap-1">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
            Secured by Paystack
          </p>
        </form>
      </section>
      
    </div>
  </main>
</template>
