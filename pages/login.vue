<template>
  <div class="min-h-screen bg-secondary-50 dark:bg-secondary-950 flex flex-col items-center justify-center p-4 sm:p-6 transition-colors duration-300">
    <div class="max-w-5xl w-full bg-white dark:bg-secondary-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border dark:border-secondary-800">
      <!-- Left Side: Image/Quote -->
      <div class="md:w-1/2 relative bg-secondary-900 p-8 lg:p-12 flex flex-col justify-between text-white overflow-hidden">
        <div class="absolute inset-0 opacity-40">
          <img src="https://picsum.photos/seed/login-bg/800/1200" alt="Background" class="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div class="relative z-10">
          <div class="flex items-center gap-2 mb-8 lg:mb-12">
            <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
              <Box class="w-5 h-5" />
            </div>
            <span class="font-bold text-lg lg:text-xl tracking-tight">PrintFlow Pro</span>
          </div>
          <div class="mt-12 lg:mt-20">
            <h2 class="text-3xl lg:text-5xl font-bold leading-tight mb-8">
              Precision <span class="text-primary-400">Control</span> for Your Print Fleet
            </h2>
            <div class="space-y-6">
              <div class="flex items-center gap-4 p-4 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10">
                <div class="w-10 h-10 bg-primary-600/20 rounded-lg flex items-center justify-center text-primary-400">
                  <Zap class="w-6 h-6" />
                </div>
                <div>
                  <p class="font-bold">Instant Sync</p>
                  <p class="text-xs text-secondary-400">Real-time telemetry from every machine.</p>
                </div>
              </div>
              <div class="flex items-center gap-4 p-4 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10">
                <div class="w-10 h-10 bg-primary-600/20 rounded-lg flex items-center justify-center text-primary-400">
                  <ShieldCheck class="w-6 h-6" />
                </div>
                <div>
                  <p class="font-bold">Enterprise Security</p>
                  <p class="text-xs text-secondary-400">End-to-end encryption for your IP.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side: Form -->
      <div class="md:w-1/2 p-8 lg:p-12">
        <div class="mb-8 lg:mb-10">
          <h2 class="text-2xl lg:text-3xl font-bold text-secondary-900 dark:text-white mb-2">Sign In</h2>
          <p class="text-sm lg:text-base text-secondary-500 dark:text-secondary-400">Enter your credentials to access your 3D print dashboard</p>
        </div>

        <div class="mb-8">
          <UButton 
            block 
            size="lg" 
            variant="outline" 
            color="secondary" 
            class="rounded-xl font-medium"
          >
            <template #leading>
              <img src="https://www.google.com/favicon.ico" class="w-4 h-4" alt="Google" />
            </template>
            Continue with Google
          </UButton>
        </div>

        <div class="relative mb-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-secondary-100 dark:border-secondary-800"></div>
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-white dark:bg-secondary-900 px-2 text-secondary-400 dark:text-secondary-500">Or continue with email</span>
          </div>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">Email Address</label>
            <div class="relative">
              <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400 dark:text-secondary-500" />
              <input type="email" v-model="form.email" required placeholder="name@company.com" class="w-full pl-12 pr-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none dark:text-white transition-all" />
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="block text-sm font-semibold text-secondary-700 dark:text-secondary-300">Password</label>
              <a href="#" class="text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline">Forgot password?</a>
            </div>
            <div class="relative">
              <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400 dark:text-secondary-500" />
              <input type="password" v-model="form.password" required placeholder="••••••••" class="w-full pl-12 pr-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none dark:text-white transition-all" />
            </div>
          </div>
          <div class="flex items-center gap-2">
            <input type="checkbox" id="remember" class="w-4 h-4 rounded border-secondary-300 dark:border-secondary-700 text-primary-600 focus:ring-primary-500 bg-white dark:bg-secondary-800" />
            <label for="remember" class="text-sm text-secondary-600 dark:text-secondary-400">Remember me for 30 days</label>
          </div>
          <UButton 
            type="submit" 
            block 
            size="xl" 
            class="rounded-xl font-bold"
            trailing-icon="i-lucide-arrow-right"
            :loading="loginLoading"
          >
            Sign In
          </UButton>
        </form>

        <p class="mt-8 text-center text-sm text-secondary-500 dark:text-secondary-400">
          Don't have an account? <NuxtLink to="/register" class="font-bold text-primary-600 dark:text-primary-400 hover:underline">Sign up</NuxtLink>
        </p>
      </div>
    </div>
    <div class="mt-12 flex gap-6 text-xs text-secondary-400 dark:text-secondary-500">
      <a href="#" class="hover:text-secondary-600 dark:hover:text-secondary-300">Terms</a>
      <a href="#" class="hover:text-secondary-600 dark:hover:text-secondary-300">Privacy</a>
      <a href="#" class="hover:text-secondary-600 dark:hover:text-secondary-300">Cookies</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Box, Mail, Lock, ArrowRight, Zap, ShieldCheck } from 'lucide-vue-next';

const form = reactive({
  email: '',
  password: ''
});

const loginLoading = ref(false);

const handleLogin = async () => {
  try {
    loginLoading.value = true;
    const response = await useFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(form)
    });

    if (response && response.data && response.data.value) {
      const { token } = response.data.value;
      // Store the token (e.g., in localStorage or a cookie)
      localStorage.setItem('authToken', token);
    } else {
      console.error('Login failed: No token received');
    }

  } catch (error) {
    console.error('Login error:', error);
  } finally {
    loginLoading.value = false;
  }

  navigateTo('/dashboard');
};
</script>