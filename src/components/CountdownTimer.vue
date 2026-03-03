<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 19);
targetDate.setHours(targetDate.getHours() + 9);
targetDate.setMinutes(targetDate.getMinutes() + 31);
targetDate.setSeconds(targetDate.getSeconds() + 20);

const timeLeft = ref('');

const updateCountdown = () => {
  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;

  if (distance < 0) {
    timeLeft.value = 'EXPIRED';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  timeLeft.value = `${days}d ${hours}h ${minutes}m ${seconds}s remaining`;
};

let timer;
onMounted(() => {
  updateCountdown();
  timer = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <div class="bg-chocolate text-cream px-4 py-2 rounded-full text-sm font-medium tracking-tight">
    {{ timeLeft }}
  </div>
</template>
