<template>
  <div class="min-h-screen bg-white dark:bg-secondary-950 transition-colors duration-300">
    <!-- Navbar -->
    <nav class="flex items-center justify-between px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
          <Box class="w-5 h-5" />
        </div>
        <span class="font-bold text-xl tracking-tight dark:text-white">PrintFlow 3D</span>
      </div>
      <div class="hidden md:flex items-center gap-8 text-sm font-medium text-secondary-600 dark:text-secondary-400">
        <a href="#" class="hover:text-primary-600 dark:hover:text-primary-400">Features</a>
        <a href="#" class="hover:text-primary-600 dark:hover:text-primary-400">Pricing</a>
        <NuxtLink to="/login" class="hover:text-primary-600 dark:hover:text-primary-400">Login</NuxtLink>
        <ColorModePicker />
        <UButton to="/register" color="success" variant="solid" size="md" class="rounded-lg px-5">Sign Up</UButton>
      </div>
      <div class="md:hidden flex items-center gap-4">
        <ColorModePicker />
        <UButton
          color="secondary"
          variant="ghost"
          square
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </UButton>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden bg-white dark:bg-secondary-900 border-b border-secondary-100 dark:border-secondary-800 px-6 py-8 space-y-6">
      <a href="#" class="block text-lg font-medium text-secondary-900 dark:text-white">Features</a>
      <a href="#" class="block text-lg font-medium text-secondary-900 dark:text-white">Pricing</a>
      <NuxtLink to="/login" class="block text-lg font-medium text-secondary-900 dark:text-white">Login</NuxtLink>
      <UButton to="/register" block size="xl" class="rounded-xl font-bold">Sign Up</UButton>
    </div>

    <!-- Hero -->
    <header class="relative py-12 lg:py-20 overflow-hidden">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div class="text-center md:text-left">
          <h1 class="text-4xl lg:text-6xl font-bold leading-tight tracking-tight text-secondary-900 dark:text-white mb-6">
            Revolutionize Your <span class="text-primary-600 dark:text-primary-400">3D Printing</span> Workflow
          </h1>
          <p class="text-lg lg:text-xl text-secondary-600 dark:text-secondary-400 mb-10 leading-relaxed max-w-xl mx-auto md:mx-0">
            PrintFlow 3D provides a seamless, end-to-end solution for uploading, previewing, and ordering high-quality 3D prints. From concept to creation, we make bringing your designs to life effortless.
          </p>
          <div class="flex flex-wrap justify-center md:justify-start gap-4">
            <UButton 
              to="/register" 
              size="xl" 
              class="w-full sm:w-auto rounded-xl font-semibold shadow-lg shadow-primary-200 dark:shadow-none"
              trailing-icon="i-lucide-arrow-right"
            >
              Upload or Get Started
            </UButton>
          </div>
        </div>
        <div class="relative mt-8 md:mt-0">
          <div class="rounded-3xl overflow-hidden shadow-2xl border border-secondary-200 dark:border-secondary-800">
            <img src="https://picsum.photos/seed/3dprint/800/600" alt="3D Printing" class="w-full h-auto" referrerPolicy="no-referrer" />
          </div>
          <div class="absolute -bottom-6 -left-4 lg:-left-6 bg-white dark:bg-secondary-900 p-4 lg:p-6 rounded-2xl shadow-xl border border-secondary-100 dark:border-secondary-800 max-w-[240px] lg:max-w-xs">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span class="text-sm font-semibold text-secondary-900 dark:text-white">Live Print Status</span>
            </div>
            <p class="text-xs text-secondary-500 dark:text-secondary-400">Custom Gear Assembly v2 is currently 85% complete.</p>
          </div>
        </div>
      </div>
    </header>

    <!-- Features -->
    <section class="py-16 lg:py-24 bg-secondary-50 dark:bg-secondary-900/50">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-12 lg:mb-16">
          <h2 class="text-2xl lg:text-3xl font-bold text-secondary-900 dark:text-white mb-4">Core Capabilities of PrintFlow 3D</h2>
          <p class="text-secondary-600 dark:text-secondary-400">Discover how PrintFlow 3D streamlines your 3D printing projects from start to finish.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div v-for="feature in features" :key="feature.title" class="bg-white dark:bg-secondary-900 p-6 lg:p-8 rounded-2xl border border-secondary-200 dark:border-secondary-800 hover:shadow-xl transition-shadow">
            <div class="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-xl flex items-center justify-center mb-6">
              <component :is="feature.icon" class="w-6 h-6" />
            </div>
            <h3 class="font-bold text-lg mb-3 dark:text-white">{{ feature.title }}</h3>
            <p class="text-sm text-secondary-600 dark:text-secondary-400 leading-relaxed">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Calculator -->
    <section class="py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div class="bg-white dark:bg-secondary-900 p-6 lg:p-10 rounded-3xl border border-secondary-200 dark:border-secondary-800 shadow-sm">
          <h2 class="text-xl lg:text-2xl font-bold mb-8 dark:text-white">Per-Order Pricing Calculator</h2>
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">Material</label>
              <select v-model="calc.material" class="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none dark:text-white">
                <option value="pla">PLA (Polylactic Acid)</option>
                <option value="abs">ABS (Acrylonitrile Butadiene Styrene)</option>
                <option value="petg">PETG (Polyethylene Terephthalate Glycol)</option>
                <option value="resin">Resin (SLA/DLP)</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">Volume (cm³)</label>
              <input type="number" v-model="calc.volume" placeholder="Enter volume" class="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none dark:text-white" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-2">Finish</label>
              <select v-model="calc.finish" class="w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 focus:ring-2 focus:ring-primary-500 outline-none dark:text-white">
                <option value="raw">Raw (Support Removed)</option>
                <option value="polished">Polished</option>
                <option value="painted">Painted</option>
              </select>
            </div>
            <UButton 
              block 
              size="lg" 
              class="rounded-xl font-bold"
              @click="estimatePrice"
            >
              Estimate Price
            </UButton>
          </div>
        </div>
        <div class="mt-8 md:mt-0">
          <h2 class="text-xl lg:text-2xl font-bold mb-8 dark:text-white">Example Pricing</h2>
          <div class="space-y-4">
            <div v-for="example in examples" :key="example.name" class="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-secondary-100 dark:border-secondary-800 gap-2">
              <div>
                <p class="font-semibold text-secondary-900 dark:text-white">{{ example.name }}</p>
                <p class="text-xs text-secondary-500 dark:text-secondary-400">{{ example.desc }}</p>
              </div>
              <span class="font-bold text-primary-600 dark:text-primary-400">{{ example.price }}</span>
            </div>
            <div class="pt-6">
              <UButton 
                to="/register" 
                block 
                size="lg" 
                variant="soft"
                class="rounded-xl font-bold"
              >
                Order Now
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-secondary-50 dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-800 py-12 lg:py-20">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 grid sm:grid-cols-2 md:grid-cols-4 gap-12">
        <div class="col-span-1 sm:col-span-2 md:col-span-1">
          <div class="flex items-center gap-2 mb-6">
            <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
              <Box class="w-5 h-5" />
            </div>
            <span class="font-bold text-xl tracking-tight dark:text-white">PrintFlow 3D</span>
          </div>
          <p class="text-sm text-secondary-500 dark:text-secondary-400 mb-6">Your seamless solution for 3D printing services.</p>
          <div class="flex gap-4">
            <a href="#" class="text-secondary-400 dark:text-secondary-500 hover:text-primary-600 dark:hover:text-primary-400"><Twitter class="w-5 h-5" /></a>
            <a href="#" class="text-secondary-400 dark:text-secondary-500 hover:text-primary-600 dark:hover:text-primary-400"><Instagram class="w-5 h-5" /></a>
            <a href="#" class="text-secondary-400 dark:text-secondary-500 hover:text-primary-600 dark:hover:text-primary-400"><Linkedin class="w-5 h-5" /></a>
          </div>
        </div>
        <div>
          <h4 class="font-bold mb-6 dark:text-white">Company</h4>
          <ul class="space-y-4 text-sm text-secondary-500 dark:text-secondary-400">
            <li><a href="#" class="hover:text-primary-600 dark:hover:text-primary-400">About Us</a></li>
            <li><a href="#" class="hover:text-primary-600 dark:hover:text-primary-400">Careers</a></li>
            <li><a href="#" class="hover:text-primary-600 dark:hover:text-primary-400">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-6 dark:text-white">Support</h4>
          <ul class="space-y-4 text-sm text-secondary-500 dark:text-secondary-400">
            <li><a href="#" class="hover:text-primary-600 dark:hover:text-primary-400">Contact Us</a></li>
            <li><a href="#" class="hover:text-primary-600 dark:hover:text-primary-400">FAQ</a></li>
            <li><a href="#" class="hover:text-primary-600 dark:hover:text-primary-400">Shipping</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-6 dark:text-white">Services</h4>
          <ul class="space-y-4 text-sm text-secondary-500 dark:text-secondary-400">
            <li><a href="#" class="hover:text-primary-600 dark:hover:text-primary-400">Pricing</a></li>
            <li><a href="#" class="hover:text-primary-600 dark:hover:text-primary-400">Custom Quotes</a></li>
            <li><a href="#" class="hover:text-primary-600 dark:hover:text-primary-400">Materials</a></li>
          </ul>
        </div>
      </div>
      <div class="max-w-7xl mx-auto px-6 lg:px-8 mt-16 lg:mt-20 pt-8 border-t border-secondary-200 dark:border-secondary-800 text-center text-xs text-secondary-400 dark:text-secondary-500">
        © 2026 PrintFlow 3D. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Box, ArrowRight, UploadCloud, Eye, ShieldCheck, Zap, Twitter, Instagram, Linkedin, Menu, X } from 'lucide-vue-next';

useHead({
  title: 'PrintFlow 3D',
})

const isMobileMenuOpen = ref(false);

const features = [
  { icon: UploadCloud, title: 'Effortless Model Uploads', desc: 'Securely upload your 3D models (STL, OBJ, 3MF) with intuitive drag-and-drop functionality.' },
  { icon: Eye, title: 'Interactive 3D Preview', desc: 'Inspect your models in real-time, check printability, and identify potential issues before printing.' },
  { icon: ShieldCheck, title: 'Professional Finishing', desc: 'Access a range of materials and expert finishing options for optimal print quality and aesthetics.' },
  { icon: Zap, title: 'Fast & Accurate Quotes', desc: 'Get instant cost and time estimates, or chat directly with our staff for custom project quotes.' },
];

const calc = reactive({
  material: 'pla',
  volume: 10,
  finish: 'raw'
});

const examples = [
  { name: 'Small PLA Print (10cm³)', desc: 'Standard resolution, raw finish', price: '$10.00' },
  { name: 'Medium ABS Print (50cm³) + Polished', desc: 'High resolution, smooth finish', price: '$50.00' },
  { name: 'Large Resin Print (100cm³) + Painted', desc: 'Ultra-high detail, custom color', price: '$160.00' },
  { name: 'Custom Project (Quote Required)', desc: 'Complex assembly or special materials', price: 'Varies' },
];

const estimatePrice = () => {
  alert(`Estimated price for ${calc.volume}cm³ of ${calc.material}: $${(calc.volume * 0.5).toFixed(2)}`);
};
</script>
