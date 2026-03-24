<template>
  <AppLayout title="Settings" v-slot="slotProps">
    <div class="max-w-4xl mx-auto space-y-8 transition-colors duration-300">
      <!-- Profile Section -->
      <section class="bg-white dark:bg-secondary-900 rounded-3xl border border-secondary-200 dark:border-secondary-800 p-6 lg:p-8 shadow-sm">
        <div class="flex flex-col sm:flex-row items-center gap-6 mb-8">
          <div class="relative group">
            <div class="w-24 h-24 rounded-full bg-secondary-100 dark:bg-secondary-800 overflow-hidden border-4 border-white dark:border-secondary-900 shadow-md">
              <img src="https://picsum.photos/seed/user/96/96" alt="Profile" class="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <UButton
              color="primary"
              variant="solid"
              square
              class="absolute bottom-0 right-0 rounded-full shadow-lg"
            >
              <Camera class="w-4 h-4" />
            </UButton>
          </div>
          <div class="text-center sm:text-left">
            <h3 class="text-xl font-bold text-secondary-900 dark:text-white">{{ slotProps.user?.firstName }} {{ slotProps.user?.lastName }}</h3>
            <p class="text-sm text-secondary-500 dark:text-secondary-400">{{ slotProps.user?.email }}</p>
            <div class="mt-2 flex items-center justify-center sm:justify-start gap-2">
              <span class="px-2 py-0.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-[10px] font-bold uppercase tracking-wider rounded">User</span>
              <span class="text-[10px] text-secondary-400 dark:text-secondary-500 font-medium">Member since {{ slotProps.user?.createdAt }}</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">First Name</label>
            <input disabled type="text" :value="slotProps.user?.firstName" class="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm dark:text-white" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">Last Name</label>
            <input disabled type="text" :value="slotProps.user?.lastName" class="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm dark:text-white" />
          </div>
          <div class="sm:col-span-2">
            <label class="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">Email Address</label>
            <input disabled type="email" :value="slotProps.user?.email" class="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm dark:text-white" />
          </div>
        </div>
        <!-- <div class="mt-8 flex justify-end">
          <UButton 
            size="lg" 
            class="px-8 rounded-xl font-bold shadow-lg shadow-primary-200 dark:shadow-none"
          >
            Save Profile
          </UButton>
        </div> -->
      </section>

      <!-- Change Password Section -->
      <section class="bg-white dark:bg-secondary-900 rounded-3xl border border-secondary-200 dark:border-secondary-800 p-6 lg:p-8 shadow-sm">
        <div class="flex items-center gap-3 mb-6">
          <div class="p-2 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-lg">
            <Lock class="w-5 h-5" />
          </div>
          <h3 class="text-lg font-bold text-secondary-900 dark:text-white">Change Password</h3>
        </div>
        
        <form @submit.prevent="handleChangePassword" class="space-y-6">
          <div class="grid grid-cols-1 gap-6">
            <div>
              <label class="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">Current Password</label>
              <div class="relative">
                <input :type="showPasswords.current ? 'text' : 'password'" v-model="passwords.current" placeholder="••••••••" class="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm dark:text-white" />
                <button type="button" @click="showPasswords.current = !showPasswords.current" class="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-400 dark:text-secondary-500">
                  <Eye v-if="!showPasswords.current" class="w-5 h-5" />
                  <EyeOff v-else class="w-5 h-5" />
                </button>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">New Password</label>
                <div class="relative">
                  <input :type="showPasswords.new ? 'text' : 'password'" v-model="passwords.new" placeholder="••••••••" class="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm dark:text-white" />
                  <button type="button" @click="showPasswords.new = !showPasswords.new" class="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-400 dark:text-secondary-500">
                    <Eye v-if="!showPasswords.new" class="w-5 h-5" />
                    <EyeOff v-else class="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div>
                <label class="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">Confirm New Password</label>
                <div class="relative">
                  <input :type="showPasswords.confirm ? 'text' : 'password'" v-model="passwords.confirm" placeholder="••••••••" class="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm dark:text-white" />
                  <button type="button" @click="showPasswords.confirm = !showPasswords.confirm" class="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-400 dark:text-secondary-500">
                    <Eye v-if="!showPasswords.confirm" class="w-5 h-5" />
                    <EyeOff v-else class="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-between items-center pt-4">
            <p class="text-xs text-secondary-500 dark:text-secondary-400 max-w-xs">
              Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.
            </p>
            <UButton 
              type="submit" 
              size="lg" 
              class="px-8 rounded-xl font-bold shadow-lg shadow-primary-200 dark:shadow-none"
              :loading="changePasswordLoading"
              :disabled="changePasswordLoading"
            >
              Update Password
            </UButton>
          </div>
        </form>
      </section>

      <!-- Notifications Section -->
      <!-- <section class="bg-white dark:bg-secondary-900 rounded-3xl border border-secondary-200 dark:border-secondary-800 p-6 lg:p-8 shadow-sm">
        <h3 class="text-lg font-bold mb-6 dark:text-white">Notifications</h3>
        <div class="space-y-4">
          <div v-for="pref in notificationPrefs" :key="pref.id" class="flex items-center justify-between p-4 bg-secondary-50 dark:bg-secondary-800/50 rounded-2xl">
            <div>
              <p class="text-sm font-bold text-secondary-900 dark:text-white">{{ pref.name }}</p>
              <p class="text-xs text-secondary-500 dark:text-secondary-400">{{ pref.description }}</p>
            </div>
            <UToggle v-model="pref.enabled" />
          </div>
        </div>
      </section> -->

      <!-- Danger Zone -->
      <section class="bg-red-50 dark:bg-red-900/10 rounded-3xl border border-red-100 dark:border-red-900/30 p-6 lg:p-8">
        <h3 class="text-lg font-bold text-red-600 dark:text-red-400 mb-2">Danger Zone</h3>
        <p class="text-sm text-red-500 dark:text-red-400/70 mb-6">Once you delete your account, there is no going back. Please be certain.</p>
        <UButton 
          color="error" 
          size="lg" 
          class="px-6 rounded-xl font-bold shadow-lg shadow-red-200 dark:shadow-none"
        >
          Delete Account
        </UButton>
      </section>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { Camera, Lock, Eye, EyeOff } from 'lucide-vue-next';

const changePasswordLoading = ref(false);

useHead({
  title: 'PrintFlow 3D',
})

const passwords = reactive({
  current: '',
  new: '',
  confirm: ''
});

const showPasswords = reactive({
  current: false,
  new: false,
  confirm: false
});

const notificationPrefs = reactive([
  { id: 1, name: 'Email Notifications', description: 'Receive updates about your order via email.', enabled: true },
  { id: 2, name: 'Push Notifications', description: 'Get real-time alerts on your device.', enabled: false },
  { id: 3, name: 'Marketing Emails', description: 'Stay informed about new features and offers.', enabled: true }
]);

const toast = useToast();

const handleChangePassword = async () => {
  // alert('Password updated successfully!');

  if(passwords.new !== passwords.confirm) {
    toast.add({
      title: 'Error',
      description: 'New password and confirmation do not match.',
      color: 'error'
    });
    return;
  }

  try {
    changePasswordLoading.value = true;
    const response = await $fetch('/api/auth/change-password', {
      method: 'POST',
      body: {
        currentPassword: passwords.current,
        newPassword: passwords.new,
      }
    }) as any;

    if (response.isSuccessful) {
      toast.add({
        title: 'Success',
        description: 'Your password has been updated!',
        color: 'success'
      });
    } else {
      toast.add({
        title: 'Error',
        description: response.message || 'Failed to update password. Please try again.',
        color: 'error'
      });
    }
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Failed to update password. Please try again.',
      color: 'error'
    });
  } finally {
    changePasswordLoading.value = false;
  }
  passwords.current = '';
  passwords.new = '';
  passwords.confirm = '';
};
</script>
