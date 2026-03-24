<template>
  <div
    class="min-h-screen bg-secondary-50 dark:bg-secondary-950 flex flex-col items-center justify-center p-4 sm:p-6 transition-colors duration-300">
    <div
      class="max-w-5xl w-full bg-white dark:bg-secondary-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border dark:border-secondary-800">
      <!-- Left Side: Image/Quote -->
      <div
        class="md:w-1/2 relative bg-secondary-900 p-8 lg:p-12 flex flex-col justify-between text-white overflow-hidden">
        <div class="absolute inset-0 opacity-40">
          <img src="https://picsum.photos/seed/register-bg/800/1200" alt="Background" class="w-full h-full object-cover"
            referrerPolicy="no-referrer" />
        </div>
        <div class="relative z-10">
          <NuxtLink to="/" class="flex items-center gap-2 mb-8 lg:mb-12">
            <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
              <Box class="w-5 h-5" />
            </div>
            <span class="font-bold text-lg lg:text-xl tracking-tight">PrintFlow 3D</span>
          </NuxtLink>
          <div class="mt-12 lg:mt-20">
            <h2 class="text-3xl lg:text-5xl font-bold leading-tight mb-8">
              The Future of <span class="text-primary-400">Additive</span> Manufacturing
            </h2>
            <div class="grid grid-cols-2 gap-6">
              <div class="p-4 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10">
                <p class="text-2xl lg:text-3xl font-bold text-primary-400">99.9%</p>
                <p class="text-[10px] lg:text-xs uppercase tracking-widest text-secondary-400 mt-1">Print Success Rate
                </p>
              </div>
              <div class="p-4 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10">
                <p class="text-2xl lg:text-3xl font-bold text-primary-400">24/7</p>
                <p class="text-[10px] lg:text-xs uppercase tracking-widest text-secondary-400 mt-1">Fleet Monitoring</p>
              </div>
              <div class="p-4 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10">
                <p class="text-2xl lg:text-3xl font-bold text-primary-400">15m</p>
                <p class="text-[10px] lg:text-xs uppercase tracking-widest text-secondary-400 mt-1">Avg. Setup Time</p>
              </div>
              <div class="p-4 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10">
                <p class="text-2xl lg:text-3xl font-bold text-primary-400">Global</p>
                <p class="text-[10px] lg:text-xs uppercase tracking-widest text-secondary-400 mt-1">Production Network
                </p>
              </div>
            </div>
          </div>
          <div class="mt-8 lg:mt-12 flex flex-wrap gap-2 lg:gap-4">
            <div
              class="flex items-center gap-2 bg-white/10 px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-[10px] lg:text-xs backdrop-blur-sm">
              <Zap class="w-3 h-3 lg:w-4 lg:h-4 text-primary-400" /> Real-time Monitoring
            </div>
            <div
              class="flex items-center gap-2 bg-white/10 px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-[10px] lg:text-xs backdrop-blur-sm">
              <ShieldCheck class="w-3 h-3 lg:w-4 lg:h-4 text-primary-400" /> Automated QC
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side: Form -->
      <div class="md:w-1/2 p-8 lg:p-12">
        <div class="mb-8 lg:mb-10">
          <h2 class="text-2xl lg:text-3xl font-bold text-secondary-900 dark:text-white mb-2">
            {{ currentStep === 1 ? 'Verify your email' : currentStep === 2 ? 'Enter OTP' : 'Personal information' }}
          </h2>
          <p class="text-sm lg:text-base text-secondary-500 dark:text-secondary-400">
            {{ currentStep === 1 ? 'Enter your email to receive a 6-digit verification code.' : currentStep === 2 ? 'We sent a code to your email.Please enter it below.' : 'Tell us a bit more about yourself to get started.' }}
          </p>
        </div>

        <!-- Step Indicator -->
        <div class="flex items-center gap-2 mb-8">
          <div v-for="step in 3" :key="step" class="flex-1 h-1.5 rounded-full transition-all duration-300"
            :class="step <= currentStep ? 'bg-primary-600' : 'bg-secondary-100 dark:bg-secondary-800'"></div>
        </div>

        <!-- Step 1: Email -->
        <form v-if="currentStep === 1" @submit.prevent="sendEmailVerificationCode" class="space-y-6">
<!--          <div class="mb-8">-->
<!--            <UButton block size="lg" variant="outline" color="secondary" class="rounded-xl font-medium">-->
<!--              <template #leading>-->
<!--                <img src="https://www.google.com/favicon.ico" class="w-4 h-4" alt="Google" />-->
<!--              </template>-->
<!--              Continue with Google-->
<!--            </UButton>-->
<!--          </div>-->

<!--          <div class="relative mb-8">-->
<!--            <div class="absolute inset-0 flex items-center">-->
<!--              <div class="w-full border-t border-secondary-100 dark:border-secondary-800"></div>-->
<!--            </div>-->
<!--            <div class="relative flex justify-center text-xs uppercase">-->
<!--              <span class="bg-white dark:bg-secondary-900 px-2 text-secondary-400 dark:text-secondary-500">Or use-->
<!--                email</span>-->
<!--            </div>-->
<!--          </div>-->

          <div>
            <label class="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">Email Address</label>
            <input type="email" v-model="form.email" required placeholder="name@company.com"
              class="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm dark:text-white" />
          </div>
          <UButton :loading="loading" :disabled="loading || !form.email" type="submit" block size="xl" class="rounded-xl font-bold" trailing-icon="i-lucide-arrow-right"
            color="primary">
            Send OTP
          </UButton>
        </form>

        <!-- Step 2: OTP -->
        <form v-else-if="currentStep === 2" @submit.prevent="verifyCode" class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">Verification
              Code</label>
            <div class="flex gap-2 sm:gap-4">
              <input v-for="(n, index) in 6" :key="n"
                :ref="(el) => { if (el) otpInputs[index] = el as HTMLInputElement }" v-model="otp[index]" type="text"
                maxlength="1" @input="handleOtpInput(index, $event)" @keydown="handleOtpKeydown(index, $event)"
                class="w-full h-12 sm:h-14 text-center text-xl font-bold rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:text-white" />
            </div>
            <p class="mt-4 text-xs text-secondary-500 dark:text-secondary-400">
              Didn't receive the code? <UButton variant="link" color="primary" :padded="false" class="font-bold">Resend
              </UButton>
            </p>
          </div>
          <div class="flex gap-4">
            <UButton variant="outline" color="secondary" size="xl" class="flex-1 rounded-xl font-bold"
              @click="currentStep = 1">
              Back
            </UButton>
            <UButton :loading="loading" :disabled="loading || !otp.every(digit => digit !== '')" type="submit" size="xl" class="flex-[2] rounded-xl font-bold">
              Verify OTP
            </UButton>
          </div>
        </form>

        <!-- Step 3: Personal Info -->
        <form v-else @submit.prevent="handleRegister" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">First
                Name</label>
              <input type="text" v-model="form.firstName" required placeholder="John"
                class="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm dark:text-white" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">Last
                Name</label>
              <input type="text" v-model="form.lastName" required placeholder="Doe"
                class="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm dark:text-white" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">Phone
              Number</label>
            <input type="tel" v-model="form.phone" required placeholder="+1 (555) 000-0000"
              class="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm dark:text-white" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">Date of Birth
              (optional)</label>
            <input type="date" v-model="form.dateOfBirth"
              class="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm dark:text-white" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">Password</label>
            <div class="relative">
              <input :type="showPassword ? 'text' : 'password'" v-model="form.password" required placeholder="••••••••"
                class="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm dark:text-white" />
              <UButton type="button" variant="ghost" color="secondary" square size="sm"
                class="absolute right-2 top-1/2 -translate-y-1/2" @click="showPassword = !showPassword">
                <template #default>
                  <Eye v-if="!showPassword" class="w-5 h-5" />
                  <EyeOff v-else class="w-5 h-5" />
                </template>
              </UButton>
            </div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">Confirm
              Password</label>
            <div class="relative">
              <input :type="showConfirmPassword ? 'text' : 'password'" v-model="form.confirmPassword" required
                placeholder="••••••••"
                class="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm dark:text-white" />
              <UButton type="button" variant="ghost" color="secondary" square size="sm"
                class="absolute right-2 top-1/2 -translate-y-1/2" @click="showConfirmPassword = !showConfirmPassword">
                <template #default>
                  <Eye v-if="!showConfirmPassword" class="w-5 h-5" />
                  <EyeOff v-else class="w-5 h-5" />
                </template>
              </UButton>
            </div>
          </div>
          <div class="flex items-start gap-2 py-2">
            <input type="checkbox" id="terms" required
              class="mt-1 w-4 h-4 rounded border-secondary-300 dark:border-secondary-700 text-primary-600 focus:ring-primary-500 bg-white dark:bg-secondary-800" />
            <label for="terms" class="text-xs text-secondary-500 dark:text-secondary-400 leading-relaxed">
              I agree to the <a href="#" class="text-primary-600 dark:text-primary-400 font-semibold">Terms of
                Service</a> and
              <a href="#" class="text-primary-600 dark:text-primary-400 font-semibold">Privacy Policy</a>.
            </label>
          </div>
          <div class="flex gap-4">
            <UButton variant="outline" color="secondary" size="xl" class="flex-1 rounded-xl font-bold"
              @click="currentStep = 2">
              Back
            </UButton>
            <UButton :loading="loading" :disabled="loading || !form.email || !form.password || !form.confirmPassword" type="submit" size="xl" class="flex-[2] rounded-xl font-bold">
              Complete Registration
            </UButton>
          </div>
        </form>

        <p class="mt-8 text-center text-sm text-secondary-500 dark:text-secondary-400">
          Already have an account? <NuxtLink to="/login"
            class="font-bold text-primary-600 dark:text-primary-400 hover:underline">Log in</NuxtLink>
        </p>

        <div
          class="mt-10 flex justify-center gap-8 text-[10px] font-bold text-secondary-400 dark:text-secondary-500 uppercase tracking-widest">
          <div class="flex items-center gap-2">
            <Lock class="w-3 h-3" /> Secure SSO
          </div>
          <div class="flex items-center gap-2">
            <Globe class="w-3 h-3" /> Global Fleet
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Box, Eye, EyeOff, Lock, Globe, Zap, ShieldCheck, ArrowRight } from 'lucide-vue-next';

useHead({
  title: 'PrintFlow 3D',
})

const currentStep = ref(1);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const otp = ref(['', '', '', '', '', '']);
const otpInputs = ref<HTMLInputElement[]>([]);

const loading = ref(false);

const handleOtpInput = (index: number, event: Event) => {
  const input = event.target as HTMLInputElement;
  const value = input.value;

  // Move to next input if value is entered
  if (value && index < 5) {
    otpInputs.value[index + 1]?.focus();
  }
};

const handleOtpKeydown = (index: number, event: KeyboardEvent) => {
  // Move to previous input on backspace if current input is empty
  if (event.key === 'Backspace' && !otp.value[index] && index > 0) {
    otpInputs.value[index - 1]?.focus();
  }
};

const form = reactive({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  dateOfBirth: ''
});

const toast = useToast();

const sendEmailVerificationCode = async () => {

  try {
    loading.value = true;
    const response = await $fetch('/api/auth/send-email-verification-code', {
      method: 'POST',
      body: JSON.stringify({ email: form.email })
    }) as any;

    if (response && response.isSuccessful) {
      // Code sent successfully
      currentStep.value = 2;
    } else {
      // Handle error (e.g., show toast)

      toast.add({
        title: 'Error',
        description: response.message || 'Failed to send verification code. Please try again.',
        color: 'error'
      });
    }
  } catch (error) {
    console.error('Error sending verification code:', error);
    toast.add({
      title: 'Error',
      description: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.',
      color: 'error'
    });
  } finally {
    loading.value = false;
  }
}

const verifyCode = async () => {
  try {
    loading.value = true;
    const response = await $fetch('/api/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ email: form.email, code: otp.value.join('') })
    }) as any;

    if (response && response.isSuccessful) {
      // Code verified successfully
      currentStep.value = 3;
    } else {
      // Handle error (e.g., show toast)
      toast.add({
        title: 'Error',
        description: response.message || 'Invalid verification code. Please try again.',
        color: 'error'
      });
    }
  } catch (error) {
    console.error('Error verifying code:', error);
    toast.add({
      title: 'Error',
      description: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.',
      color: 'error'
    });
  } finally {
    loading.value = false;
  }
}

const handleRegister = async () => {
  // Basic client-side validation
  if (form.password !== form.confirmPassword) {
    toast.add({
      title: 'Error',
      description: 'Passwords do not match. Please try again.',
      color: 'error'
    });
    return;
  }

  const registrationData = {
    firstName: form.firstName,
    lastName: form.lastName,
    otherNames: '',
    phoneNumber: form.phone,
    email: form.email,
    password: form.password,
    emailVerificationCode: otp.value.join(''),
    dateOfBirth: new Date(form.dateOfBirth || new Date()).toISOString()
  };

  try {
    loading.value = true;
    const response = await $fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(registrationData)
    }) as any;

    if (response && response.isSuccessful) {
      // Registration successful, redirect to login or dashboard
      navigateTo('/dashboard');
    } else {
      // Handle registration error (e.g., show toast)
      toast.add({
        title: 'Error',
        description: response.message || 'Registration failed. Please try again.',
        color: 'error'
      });
    }
  } catch (error) {
    console.error('Error during registration:', error);
    toast.add({
      title: 'Error',
      description: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.',
      color: 'error'
    });
  } finally {
    loading.value = false;
  }
};
</script>
