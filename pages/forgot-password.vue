<template>
  <div class="min-h-screen bg-secondary-50 dark:bg-secondary-950 flex flex-col items-center justify-center p-4 sm:p-6 transition-colors duration-300">
    <div class="max-w-md w-full bg-white dark:bg-secondary-900 rounded-3xl shadow-2xl overflow-hidden border dark:border-secondary-800 p-8 lg:p-12">
      <div class="mb-8 text-center">
        <div class="flex justify-center mb-6">
          <div class="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-200 dark:shadow-none">
            <KeyRound class="w-6 h-6" />
          </div>
        </div>
        <h2 class="text-2xl lg:text-3xl font-bold text-secondary-900 dark:text-white mb-2">
          {{ currentStep === 1 ? 'Forgot Password?' : 'Reset Password' }}
        </h2>
        <p class="text-sm text-secondary-500 dark:text-secondary-400">
          {{ currentStep === 1 
            ? "No worries, we'll send you reset instructions." 
            : "Enter the code we sent to your email and your new password." 
          }}
        </p>
      </div>

      <!-- Step 1: Email -->
      <form v-if="currentStep === 1" @submit.prevent="handleSendCode" class="space-y-6">
        <div>
          <label class="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">Email Address</label>
          <div class="relative">
            <Mail class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400 dark:text-secondary-500" />
            <input 
              type="email" 
              v-model="form.email" 
              required 
              placeholder="name@company.com" 
              class="w-full pl-12 pr-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none dark:text-white transition-all text-sm" 
            />
          </div>
        </div>
        <UButton 
          type="submit" 
          block 
          size="xl" 
          class="rounded-xl font-bold"
          :loading="loading"
        >
          Send Reset Code
        </UButton>
      </form>

      <!-- Step 2: OTP & New Password -->
      <form v-else @submit.prevent="handleResetPassword" class="space-y-6">
        <div>
          <label class="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">Verification Code</label>
          <div class="flex gap-2">
            <input 
              v-for="(n, index) in 6" 
              :key="n" 
              :ref="(el) => { if (el) otpInputs[index] = el as HTMLInputElement }"
              v-model="otp[index]"
              type="text" 
              maxlength="1" 
              @input="handleOtpInput(index, $event)"
              @keydown="handleOtpKeydown(index, $event)"
              class="w-full h-12 text-center text-xl font-bold rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white" 
            />
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">New Password</label>
            <div class="relative">
              <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400 dark:text-secondary-500" />
              <input 
                :type="showPassword ? 'text' : 'password'" 
                v-model="form.password" 
                required 
                placeholder="••••••••" 
                class="w-full pl-12 pr-12 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none dark:text-white transition-all text-sm" 
              />
              <UButton
                type="button"
                variant="ghost"
                color="secondary"
                square
                size="sm"
                class="absolute right-2 top-1/2 -translate-y-1/2"
                @click="showPassword = !showPassword"
              >
                <Eye v-if="!showPassword" class="w-5 h-5" />
                <EyeOff v-else class="w-5 h-5" />
              </UButton>
            </div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">Confirm New Password</label>
            <div class="relative">
              <Lock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400 dark:text-secondary-500" />
              <input 
                :type="showConfirmPassword ? 'text' : 'password'" 
                v-model="form.confirmPassword" 
                required 
                placeholder="••••••••" 
                class="w-full pl-12 pr-12 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none dark:text-white transition-all text-sm" 
              />
              <UButton
                type="button"
                variant="ghost"
                color="secondary"
                square
                size="sm"
                class="absolute right-2 top-1/2 -translate-y-1/2"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <Eye v-if="!showConfirmPassword" class="w-5 h-5" />
                <EyeOff v-else class="w-5 h-5" />
              </UButton>
            </div>
          </div>
        </div>

        <UButton 
          type="submit" 
          block 
          size="xl" 
          class="rounded-xl font-bold"
          :loading="loading"
        >
          Reset Password
        </UButton>

        <UButton 
          variant="ghost" 
          color="secondary" 
          block 
          class="font-semibold"
          @click="currentStep = 1"
        >
          Back to Step 1
        </UButton>
      </form>

      <div class="mt-8 text-center">
        <NuxtLink to="/login" class="inline-flex items-center gap-2 text-sm font-bold text-secondary-500 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
          <ArrowLeft class="w-4 h-4" />
          Back to Login
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { KeyRound, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-vue-next';

const currentStep = ref(1);
const loading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const otp = ref(['', '', '', '', '', '']);
const otpInputs = ref<HTMLInputElement[]>([]);

const form = reactive({
  email: '',
  password: '',
  confirmPassword: ''
});

const handleOtpInput = (index: number, event: Event) => {
  const input = event.target as HTMLInputElement;
  const value = input.value;
  if (value && index < 5) {
    otpInputs.value[index + 1]?.focus();
  }
};

const handleOtpKeydown = (index: number, event: KeyboardEvent) => {
  if (event.key === 'Backspace' && !otp.value[index] && index > 0) {
    otpInputs.value[index - 1]?.focus();
  }
};

const toast = useToast();

const handleSendCode = async () => {
  
  try {
    loading.value = true;
    const response = await $fetch('/api/auth/send-forgot-password-code', {
      method: 'POST',
      body: JSON.stringify({ email: form.email })
    }) as any;
    console.log('Send code response:', response);

    if (response.isSuccessful) {
      toast.add({
        title: 'Success',
        description: 'Reset code sent to your email!',
        color: 'success'
      });
      currentStep.value = 2;
    } else {
      toast.add({
        title: 'Error',
        description: response.message || 'Failed to send reset code. Please try again later.',
        color: 'error'
      });
    }
  } catch (error) {
    console.error('Error sending reset code:', error);
    toast.add({
      title: 'Error',
      description: 'Failed to send reset code. Please try again later.',
      color: 'error'
    } );
  } finally {
    loading.value = false;
  }
};

const handleResetPassword = async () => {
  if (form.password !== form.confirmPassword) {
    alert('Passwords do not match');
    return;
  }
  
  const code = otp.value.join('');
  if (code.length < 6) {
    alert('Please enter the full 6-digit code');
    return;
  }

  try {
    loading.value = true;
    const response = await $fetch('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email: form.email, code, newPassword: form.password })
    }) as any;
    console.log('Reset password response:', response);

    if (response.isSuccessful) {
      toast.add({
        title: 'Success',
        description: 'Your password has been reset! You can now log in with your new password.',
        color: 'success'
      });
      navigateTo('/login');
    } else {
      toast.add({
        title: 'Error',
        description: response.message || 'Failed to reset password. Please try again later.',
        color: 'error'
      });
    }
  } catch (error) {
    console.error('Error resetting password:', error);
    toast.add({
      title: 'Error',
      description: 'Failed to reset password. Please try again later.',
      color: 'error'
    });
  } finally {
    loading.value = false;
  }
};
</script>
