<template>
  <div class="flex h-screen bg-secondary-50 dark:bg-secondary-950 overflow-hidden relative transition-colors duration-300">
    <!-- Mobile Sidebar Overlay -->
    <div 
      v-if="isMobileMenuOpen" 
      @click="isMobileMenuOpen = false"
      class="fixed inset-0 bg-secondary-900/50 backdrop-blur-sm z-40 lg:hidden"
    ></div>

    <!-- Sidebar -->
    <aside 
      class="fixed inset-y-0 left-0 w-64 bg-white dark:bg-secondary-900 border-r border-secondary-200 dark:border-secondary-800 flex flex-col z-50 transition-transform duration-300 lg:relative lg:translate-x-0"
      :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="p-6 flex items-center justify-between lg:justify-start gap-2">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
            <Box class="w-5 h-5" />
          </div>
          <span class="font-bold text-xl tracking-tight dark:text-white">PrintFlow 3D</span>
        </div>
        <UButton
          color="secondary"
          variant="ghost"
          square
          @click="isMobileMenuOpen = false"
          class="lg:hidden"
        >
          <X class="w-6 h-6" />
        </UButton>
      </div>

      <nav class="flex-1 px-4 space-y-1">
        <NuxtLink to="/dashboard" @click="isMobileMenuOpen = false" class="flex items-center gap-3 px-3 py-2 text-secondary-600 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-lg transition-colors" active-class="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
          <LayoutGrid class="w-5 h-5" />
          <span>Place Order</span>
        </NuxtLink>
        <NuxtLink to="/chat" @click="isMobileMenuOpen = false" class="flex items-center gap-3 px-3 py-2 text-secondary-600 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-lg transition-colors" active-class="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
          <MessageSquare class="w-5 h-5" />
          <span>Chat</span>
        </NuxtLink>
        <NuxtLink to="/orders" @click="isMobileMenuOpen = false" class="flex items-center gap-3 px-3 py-2 text-secondary-600 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-lg transition-colors" active-class="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
          <ClipboardList class="w-5 h-5" />
          <span>Orders</span>
        </NuxtLink>
        <NuxtLink to="/settings" @click="isMobileMenuOpen = false" class="flex items-center gap-3 px-3 py-2 text-secondary-600 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-lg transition-colors" active-class="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
          <Settings class="w-5 h-5" />
          <span>Settings</span>
        </NuxtLink>
      </nav>

      <div class="p-4 border-t border-secondary-200 dark:border-secondary-800">
        <UButton 
          block 
          variant="ghost" 
          color="secondary" 
          class="justify-start gap-3 px-3 py-2 rounded-lg"
          @click="logout"
        >
          <LogOut class="w-5 h-5" />
          <span>Log Out</span>
        </UButton>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto w-full pb-16 lg:pb-0">
      <header class="h-16 bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-800 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30 transition-colors duration-300">
        <div class="flex items-center gap-4">
          <UButton
            color="secondary"
            variant="ghost"
            square
            class="lg:hidden"
            @click="isMobileMenuOpen = true"
          >
            <Menu class="w-6 h-6" />
          </UButton>
          <h1 class="text-lg lg:text-xl font-semibold truncate dark:text-white">{{ title }}</h1>
        </div>
        <div class="flex items-center gap-4">
          <ColorModePicker class="hidden sm:flex" />
          <div class="w-8 h-8 rounded-full bg-secondary-200 dark:bg-secondary-700 overflow-hidden shrink-0">
            <img src="https://picsum.photos/seed/user/32/32" alt="Avatar" referrerPolicy="no-referrer" />
          </div>
        </div>
      </header>
      <div class="p-4 lg:p-8">
        <slot :user="user"></slot>
      </div>
    </main>

    <!-- Bottom Navigation (Mobile Only) -->
    <nav class="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-800 flex items-center justify-around h-16 z-40 px-2 transition-colors duration-300">
      <NuxtLink to="/dashboard" class="flex flex-col items-center gap-1 text-secondary-500 dark:text-secondary-400 py-1 px-3 rounded-lg" active-class="text-primary-600 dark:text-primary-400">
        <LayoutGrid class="w-5 h-5" />
        <span class="text-[10px] font-bold uppercase tracking-wider">Place Order</span>
      </NuxtLink>
      <NuxtLink to="/chat" class="flex flex-col items-center gap-1 text-secondary-500 dark:text-secondary-400 py-1 px-3 rounded-lg" active-class="text-primary-600 dark:text-primary-400">
        <MessageSquare class="w-5 h-5" />
        <span class="text-[10px] font-bold uppercase tracking-wider">Chat</span>
      </NuxtLink>
      <NuxtLink to="/orders" class="flex flex-col items-center gap-1 text-secondary-500 dark:text-secondary-400 py-1 px-3 rounded-lg" active-class="text-primary-600 dark:text-primary-400">
        <ClipboardList class="w-5 h-5" />
        <span class="text-[10px] font-bold uppercase tracking-wider">Orders</span>
      </NuxtLink>
      <NuxtLink to="/checkout" class="flex flex-col items-center gap-1 text-secondary-500 dark:text-secondary-400 py-1 px-3 rounded-lg" active-class="text-primary-600 dark:text-primary-400">
        <ShoppingCart class="w-5 h-5" />
        <span class="text-[10px] font-bold uppercase tracking-wider">Cart</span>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { Box, LayoutGrid, MessageSquare, ClipboardList, Settings, LogOut, Menu, X, ShoppingCart } from 'lucide-vue-next';

defineProps<{
  title: string;
}>();

const userCookie = useCookie('auth_user');
if (!userCookie.value) {
  navigateTo('/login');
}

console.log('User cookie value:', userCookie.value);
const user = userCookie.value as any;
console.log('Logged in user:', user);

const isMobileMenuOpen = ref(false);

const logout = async () => {
  try {
    await $fetch('/api/auth/logout', {
      method: 'POST'
    });
    // Clear the user cookie
    const userCookie = useCookie('auth_user');
    userCookie.value = null;
    // Redirect to login page
    navigateTo('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script>
