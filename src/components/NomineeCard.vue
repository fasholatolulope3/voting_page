<script setup>
import { ref } from 'vue';

defineProps({
  nomineeName: {
    type: String,
    required: true
  },
  categoryName: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    default: 0
  }
});
</script>

<template>
  <div class="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-chocolate/5 group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <!-- Image/Poster Area with gradient overlay -->
    <div class="relative w-full aspect-[4/3] bg-chocolate bg-gradient-to-br from-[#8a3800] to-[#3d1c02] flex items-center justify-center p-6 overflow-hidden">
      <!-- Placeholder decorative background elements -->
      <div class="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-300 via-transparent to-transparent"></div>
      
      <div class="relative z-10 text-center space-y-2 w-full border border-white/20 p-6 flex flex-col items-center justify-center h-full">
        <p class="text-white/80 text-xs font-semibold tracking-[0.2em] uppercase">Community Health</p>
        <h3 class="text-white text-3xl font-serif font-bold uppercase leading-none tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 pb-1">
          Departmental<br/>Award
        </h3>
        <div class="h-px w-2/3 bg-gradient-to-r from-transparent via-white/50 to-transparent my-2"></div>
        <p class="text-red-400 font-bold text-sm tracking-widest uppercase">Tagged: <span class="text-white/90 font-normal tracking-wide">Resilience Reimagined</span></p>
      </div>
    </div>

    <!-- Content Area -->
    <div class="p-8 space-y-4">
      <h2 class="text-2xl font-serif font-bold text-chocolate uppercase">{{ nomineeName }}</h2>
      <p class="text-chocolate/50 text-sm font-medium">{{ votes }} votes</p>
    </div>
  </div>
</template>
