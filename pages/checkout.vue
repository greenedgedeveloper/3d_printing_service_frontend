<template>
  <AppLayout title="Checkout">
    <div class="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8 transition-colors duration-300">
      <div class="lg:col-span-2 space-y-6 lg:space-y-8">
        <!-- Order Details -->
        <section class="bg-white dark:bg-secondary-900 rounded-3xl border border-secondary-200 dark:border-secondary-800 p-6 lg:p-8 shadow-sm">
          <h3 class="text-lg font-bold mb-6 dark:text-white">1. Order Details</h3>
          <p class="text-sm text-secondary-50 dark:text-secondary-400 mb-6">Review your selected models and services.</p>
          <div class="p-4 lg:p-6 border border-secondary-100 dark:border-secondary-800 rounded-2xl flex flex-col sm:flex-row items-center gap-4 lg:gap-6">
            <div class="w-full sm:w-24 h-48 sm:h-24 bg-secondary-50 dark:bg-secondary-800 rounded-xl overflow-hidden">
              <img src="https://picsum.photos/seed/robot/100/100" class="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div class="flex-1 text-center sm:text-left">
              <h4 class="font-bold text-secondary-900 dark:text-white">Custom Robot Arm</h4>
              <p class="text-xs text-secondary-500 dark:text-secondary-400 mt-1">Material: PLA, Finish: Matte, Color: Blue</p>
            </div>
            <span class="font-bold text-secondary-900 dark:text-white">Free</span>
          </div>
        </section>

        <!-- Payment Information -->
        <section class="bg-white dark:bg-secondary-900 rounded-3xl border border-secondary-200 dark:border-secondary-800 p-6 lg:p-8 shadow-sm">
          <h3 class="text-lg font-bold mb-6 dark:text-white">2. Payment Information</h3>
          <div class="space-y-4">
            <div class="p-4 lg:p-6 border rounded-2xl transition-all" :class="paymentMethod === 'card' ? 'border-primary-500 bg-primary-50/30 dark:bg-primary-900/20' : 'border-secondary-100 dark:border-secondary-800'">
              <label class="flex items-start gap-4 cursor-pointer">
                <input type="radio" v-model="paymentMethod" value="card" class="mt-1 w-4 h-4 text-primary-600 focus:ring-primary-500" />
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-6">
                    <CreditCard class="w-5 h-5 text-secondary-400 dark:text-secondary-500" />
                    <span class="font-bold text-sm dark:text-secondary-200">Credit or Debit Card</span>
                  </div>
                  <div v-if="paymentMethod === 'card'" class="space-y-4">
                    <input type="text" placeholder="Card Number" class="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white" />
                    <div class="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="MM/YY" class="px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white" />
                      <input type="text" placeholder="CVC" class="px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white" />
                    </div>
                    <input type="text" placeholder="Name on Card" class="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white" />
                    <UButton 
                      block 
                      variant="outline" 
                      color="secondary" 
                      size="md" 
                      class="rounded-xl font-bold"
                    >
                      Save Card Details
                    </UButton>
                  </div>
                </div>
              </label>
            </div>
            <div class="p-4 lg:p-6 border rounded-2xl transition-all" :class="paymentMethod === 'paypal' ? 'border-primary-500 bg-primary-50/30 dark:bg-primary-900/20' : 'border-secondary-100 dark:border-secondary-800'">
              <label class="flex items-center gap-4 cursor-pointer">
                <input type="radio" v-model="paymentMethod" value="paypal" class="w-4 h-4 text-primary-600 focus:ring-primary-500" />
                <div class="flex items-center gap-2">
                  <CheckCircle2 class="w-5 h-5 text-secondary-400 dark:text-secondary-500" />
                  <span class="font-bold text-sm dark:text-secondary-200">PayPal</span>
                </div>
              </label>
            </div>
          </div>
        </section>

        <!-- Promo Code -->
        <section class="bg-white dark:bg-secondary-900 rounded-3xl border border-secondary-200 dark:border-secondary-800 p-6 lg:p-8 shadow-sm">
          <h3 class="text-lg font-bold mb-6 dark:text-white">3. Promo Code</h3>
          <div class="flex flex-col sm:flex-row gap-4">
            <input type="text" placeholder="Enter promo code" class="flex-1 px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:text-white" />
            <UButton 
              size="lg" 
              variant="soft" 
              class="w-full sm:w-auto px-8 rounded-xl font-bold"
            >
              Apply
            </UButton>
          </div>
        </section>

        <UButton 
          block 
          size="xl" 
          class="rounded-2xl font-bold shadow-xl shadow-primary-200 dark:shadow-none"
          @click="placeOrder"
        >
          Place Order
        </UButton>
      </div>

      <!-- Order Summary -->
      <div class="space-y-6">
        <div class="bg-white dark:bg-secondary-900 rounded-3xl border border-secondary-200 dark:border-secondary-800 p-6 lg:p-8 shadow-sm lg:sticky lg:top-24">
          <h3 class="text-lg font-bold mb-2 dark:text-white">Order Summary</h3>
          <p class="text-xs text-secondary-500 dark:text-secondary-400 mb-8 leading-relaxed">Detailed breakdown for your Custom Robot Arm print.</p>
          
          <div class="space-y-4 mb-8">
            <div class="flex justify-between text-sm">
              <span class="text-secondary-500 dark:text-secondary-400">Model: Custom Robot Arm</span>
              <span class="font-semibold dark:text-white">Free</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-secondary-500 dark:text-secondary-400">Material Cost</span>
              <span class="font-semibold dark:text-white">$150.00</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-secondary-500 dark:text-secondary-400">Labor & Print Time</span>
              <span class="font-semibold dark:text-white">$100.00</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-secondary-500 dark:text-secondary-400">Finishing Services</span>
              <span class="font-semibold dark:text-white">$50.00</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-secondary-500 dark:text-secondary-400">Estimated Shipping</span>
              <span class="font-semibold dark:text-white">$25.00</span>
            </div>
          </div>

          <div class="pt-6 border-t border-secondary-100 dark:border-secondary-800">
            <div class="flex justify-between items-end mb-2">
              <span class="text-lg font-bold dark:text-secondary-300">Total Amount</span>
              <span class="text-2xl font-bold text-primary-600 dark:text-primary-400">$325.00</span>
            </div>
            <p class="text-[10px] text-secondary-400 dark:text-secondary-500">Estimated delivery: <span class="font-bold text-secondary-600 dark:text-secondary-400">August 5, 2024</span></p>
          </div>

          <div class="mt-8 flex justify-center gap-4 grayscale opacity-50 dark:opacity-30">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" class="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" class="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" class="h-4" />
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { CreditCard, CheckCircle2 } from 'lucide-vue-next';

const paymentMethod = ref('card');

const placeOrder = () => {
  alert('Order placed successfully!');
  navigateTo('/order');
};
</script>
