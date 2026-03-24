<template>
  <div class="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300 overflow-x-hidden">

    <!-- Navbar -->
    <nav class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-10 py-4 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
          <Box class="w-4.5 h-4.5" />
        </div>
        <span class="font-black text-lg tracking-tighter text-zinc-900 dark:text-white">PrintFlow<span class="text-blue-600">3D</span></span>
      </div>
      <div class="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500 dark:text-zinc-400">
        <a href="#features" class="hover:text-zinc-900 dark:hover:text-white transition-colors">Features</a>
        <a href="#materials" class="hover:text-zinc-900 dark:hover:text-white transition-colors">Materials</a>
<!--        <a href="#pricing" class="hover:text-zinc-900 dark:hover:text-white transition-colors">Pricing</a>-->
        <NuxtLink to="/login" class="hover:text-zinc-900 dark:hover:text-white transition-colors">Login</NuxtLink>
        <ColorModePicker />
        <UButton to="/register" color="primary" variant="solid" size="sm" class="rounded-lg px-5 font-semibold bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20">
          Get Started
        </UButton>
      </div>
      <div class="md:hidden flex items-center gap-3">
        <ColorModePicker />
        <UButton color="secondary" variant="ghost" square @click="isMobileMenuOpen = !isMobileMenuOpen">
          <Menu v-if="!isMobileMenuOpen" class="w-5 h-5" />
          <X v-else class="w-5 h-5" />
        </UButton>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden fixed top-[65px] left-0 right-0 z-40 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-6 py-8 space-y-5">
      <a href="#features" class="block text-base font-semibold text-zinc-700 dark:text-zinc-300">Features</a>
      <a href="#materials" class="block text-base font-semibold text-zinc-700 dark:text-zinc-300">Materials</a>
<!--      <a href="#pricing" class="block text-base font-semibold text-zinc-700 dark:text-zinc-300">Pricing</a>-->
      <NuxtLink to="/login" class="block text-base font-semibold text-zinc-700 dark:text-zinc-300">Login</NuxtLink>
      <UButton to="/register" block size="lg" class="rounded-xl font-bold bg-blue-600">Get Started</UButton>
    </div>

    <!-- Hero -->
    <header class="relative pt-32 pb-16 lg:pt-40 lg:pb-28 overflow-hidden">
      <!-- Background decorations -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        <!-- Dotted grid pattern -->
        <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]" style="background-image: radial-gradient(circle, #3b82f6 1px, transparent 1px); background-size: 40px 40px;"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-6 lg:px-10">
        <!-- Tag line -->
<!--        <div class="flex justify-center md:justify-start mb-8">-->
<!--          <div class="inline-flex items-center gap-2.5 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-blue-200 dark:border-blue-800">-->
<!--            <span class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>-->
<!--            Now with Live Print Tracking-->
<!--          </div>-->
<!--        </div>-->

        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div class="text-center lg:text-left">
            <h1 class="text-5xl lg:text-7xl font-black leading-[0.95] tracking-tighter text-zinc-900 dark:text-white mb-8">
              Your Designs,<br />
              <span class="text-blue-600">Printed</span><br />
              <span class="text-zinc-400 dark:text-zinc-600">Perfectly.</span>
            </h1>
            <p class="text-lg text-zinc-500 dark:text-zinc-400 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Upload. Preview. Order. PrintFlow 3D handles the entire journey from your digital model to a finished, professional-grade print — delivered to your door.
            </p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <UButton
                  to="/register"
                  size="xl"
                  class="rounded-xl font-bold bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/25 px-8"
                  trailing-icon="i-lucide-arrow-right"
              >
                Start Your First Print
              </UButton>
              <UButton
                  to="#features"
                  size="xl"
                  variant="ghost"
                  class="rounded-xl font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 px-8"
              >
                See How It Works
              </UButton>
            </div>

            <!-- Stats Row -->
            <div class="mt-14 flex flex-wrap justify-center lg:justify-start gap-x-10 gap-y-4">
              <div v-for="stat in stats" :key="stat.label" class="text-center lg:text-left">
                <div class="text-2xl font-black text-zinc-900 dark:text-white">{{ stat.value }}</div>
                <div class="text-xs font-medium text-zinc-400 dark:text-zinc-500 tracking-wide uppercase mt-0.5">{{ stat.label }}</div>
              </div>
            </div>
          </div>

          <!-- Hero Visual -->
          <div class="relative mt-6 lg:mt-0">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl shadow-zinc-900/20 dark:shadow-black/50 ring-1 ring-zinc-200 dark:ring-zinc-800">
              <img src="https://picsum.photos/seed/3dprint99/900/650" alt="3D Printing" class="w-full h-auto block" referrerPolicy="no-referrer" />
              <!-- Overlay gradient -->
              <div class="absolute inset-0 bg-gradient-to-t from-zinc-900/30 to-transparent pointer-events-none"></div>
            </div>
            <!-- Status card -->
<!--            <div class="absolute -bottom-5 -left-5 bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-2xl ring-1 ring-zinc-200 dark:ring-zinc-800 max-w-[220px]">-->
<!--              <div class="flex items-center gap-2.5 mb-2">-->
<!--                <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shrink-0"></div>-->
<!--                <span class="text-xs font-bold text-zinc-700 dark:text-zinc-200 leading-tight">Live Print Status</span>-->
<!--              </div>-->
<!--              <p class="text-[11px] text-zinc-400 dark:text-zinc-500 leading-snug">Gear Assembly v2 — <span class="font-bold text-emerald-500">85% complete</span></p>-->
<!--              <div class="mt-2.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5">-->
<!--                <div class="h-1.5 bg-emerald-500 rounded-full" style="width:85%"></div>-->
<!--              </div>-->
<!--            </div>-->
            <!-- File format badge -->
            <div class="absolute -top-4 -right-4 bg-blue-600 text-white text-xs font-black px-3 py-2 rounded-xl shadow-lg shadow-blue-600/30 tracking-wider uppercase">
              STL · OBJ · 3MF
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- How It Works -->
    <section class="py-16 lg:py-24 bg-zinc-50 dark:bg-zinc-900/40 border-y border-zinc-200 dark:border-zinc-800">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <div class="text-center mb-12">
          <p class="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">The Process</p>
          <h2 class="text-3xl lg:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">Three steps to your print</h2>
        </div>
        <div class="grid md:grid-cols-3 gap-6 lg:gap-8 relative">
          <!-- Connector line -->
          <div class="hidden md:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent"></div>
          <div v-for="(step, i) in steps" :key="step.title" class="relative bg-white dark:bg-zinc-900 rounded-2xl p-7 ring-1 ring-zinc-200 dark:ring-zinc-800 text-center hover:shadow-xl hover:shadow-zinc-100 dark:hover:shadow-black/30 transition-all hover:-translate-y-1 duration-300">
            <div class="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center text-white shadow-lg" :class="step.color">
              <component :is="step.icon" class="w-6 h-6" />
            </div>
            <div class="absolute top-7 left-7 text-4xl font-black text-zinc-100 dark:text-zinc-800 leading-none select-none">0{{ i + 1 }}</div>
            <h3 class="font-black text-zinc-900 dark:text-white text-lg mb-2 relative">{{ step.title }}</h3>
            <p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed relative">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="py-16 lg:py-28">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <div class="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
          <div class="lg:sticky lg:top-32">
            <p class="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">Capabilities</p>
            <h2 class="text-3xl lg:text-5xl font-black tracking-tight leading-tight text-zinc-900 dark:text-white mb-6">
              Built for precision at every step.
            </h2>
            <p class="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-8">
              PrintFlow 3D is engineered around the entire 3D printing workflow — from the first file upload to final delivery.
            </p>
            <UButton to="/register" size="lg" class="rounded-xl font-bold bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/20" trailing-icon="i-lucide-arrow-right">
              Start Free Today
            </UButton>
          </div>
          <div class="grid sm:grid-cols-2 gap-4 lg:gap-5">
            <div v-for="(feat, i) in features" :key="feat.title"
                 class="group bg-zinc-50 dark:bg-zinc-900 hover:bg-white dark:hover:bg-zinc-800 p-7 rounded-2xl ring-1 ring-zinc-200 dark:ring-zinc-800 hover:ring-blue-200 dark:hover:ring-blue-800 hover:shadow-lg hover:shadow-zinc-100 dark:hover:shadow-black/30 transition-all duration-300 hover:-translate-y-0.5"
                 :class="i === 0 ? 'sm:col-span-2' : ''"
            >
              <div class="w-11 h-11 bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <component :is="feat.icon" class="w-5 h-5" />
              </div>
              <h3 class="font-black text-zinc-900 dark:text-white text-base mb-2">{{ feat.title }}</h3>
              <p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{{ feat.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Materials -->
    <section id="materials" class="py-16 lg:py-24 bg-zinc-900 dark:bg-zinc-950 text-white overflow-hidden relative">
      <div class="absolute inset-0 opacity-5 pointer-events-none" style="background-image: radial-gradient(circle, #60a5fa 1px, transparent 1px); background-size: 32px 32px;"></div>
      <div class="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div class="text-center mb-12 lg:mb-16">
          <p class="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">Materials</p>
          <h2 class="text-3xl lg:text-4xl font-black tracking-tight text-white mb-4">Every material for every application.</h2>
          <p class="text-zinc-400 text-base max-w-xl mx-auto">From rapid prototypes to structural end-use parts, we have the right material for your project.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="mat in materials" :key="mat.name" class="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 group cursor-default">
            <div class="text-3xl mb-4">{{ mat.emoji }}</div>
            <h3 class="font-black text-white text-base mb-1">{{ mat.name }}</h3>
            <p class="text-xs text-zinc-500 font-mono mb-3">{{ mat.abbr }}</p>
            <p class="text-sm text-zinc-400 leading-relaxed mb-4">{{ mat.desc }}</p>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="tag in mat.tags" :key="tag" class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing -->
<!--    <section id="pricing" class="py-16 lg:py-28">-->
<!--      <div class="max-w-7xl mx-auto px-6 lg:px-10">-->
<!--        <div class="text-center mb-12 lg:mb-16">-->
<!--          <p class="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Pricing</p>-->
<!--          <h2 class="text-3xl lg:text-4xl font-black tracking-tight text-zinc-900 dark:text-white mb-4">Transparent pricing, no surprises.</h2>-->
<!--          <p class="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">Pay only for what you print. Instant quotes for standard jobs, custom quotes for complex projects.</p>-->
<!--        </div>-->
<!--        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">-->
<!--          <div v-for="(example, i) in examples" :key="example.name"-->
<!--               class="relative bg-white dark:bg-zinc-900 rounded-2xl p-7 ring-1 ring-zinc-200 dark:ring-zinc-800 hover:shadow-xl dark:hover:shadow-black/30 transition-all hover:-translate-y-1 duration-300"-->
<!--               :class="i === 2 ? 'ring-2 ring-blue-500 shadow-xl shadow-blue-600/10' : ''"-->
<!--          >-->
<!--            <div v-if="i === 2" class="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Most Popular</div>-->
<!--            <div class="text-2xl font-black text-zinc-900 dark:text-white mb-1">{{ example.price }}</div>-->
<!--            <div class="font-bold text-sm text-zinc-700 dark:text-zinc-300 mb-2">{{ example.name }}</div>-->
<!--            <p class="text-xs text-zinc-400 dark:text-zinc-500 leading-snug">{{ example.desc }}</p>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="mt-10 text-center">-->
<!--          <UButton to="/register" size="xl" class="rounded-xl font-bold bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/20 px-10" trailing-icon="i-lucide-arrow-right">-->
<!--            Get an Instant Quote-->
<!--          </UButton>-->
<!--        </div>-->
<!--      </div>-->
<!--    </section>-->

<!--    &lt;!&ndash; Social Proof &ndash;&gt;-->
<!--    <section class="py-16 lg:py-20 bg-zinc-50 dark:bg-zinc-900/40 border-y border-zinc-200 dark:border-zinc-800">-->
<!--      <div class="max-w-7xl mx-auto px-6 lg:px-10">-->
<!--        <p class="text-center text-xs font-bold uppercase tracking-widest text-zinc-400 mb-10">Trusted by engineers, designers & makers worldwide</p>-->
<!--        <div class="grid md:grid-cols-3 gap-5 lg:gap-8">-->
<!--          <div v-for="review in reviews" :key="review.name" class="bg-white dark:bg-zinc-900 p-7 rounded-2xl ring-1 ring-zinc-200 dark:ring-zinc-800">-->
<!--            <div class="flex gap-0.5 mb-4">-->
<!--              <span v-for="n in 5" :key="n" class="text-yellow-400 text-sm">★</span>-->
<!--            </div>-->
<!--            <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">"{{ review.text }}"</p>-->
<!--            <div class="flex items-center gap-3">-->
<!--              <div class="w-9 h-9 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-sm font-black" :class="review.color">{{ review.name[0] }}</div>-->
<!--              <div>-->
<!--                <div class="text-sm font-bold text-zinc-900 dark:text-white">{{ review.name }}</div>-->
<!--                <div class="text-xs text-zinc-400">{{ review.role }}</div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </section>-->

    <!-- CTA Banner -->
    <section class="py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-6 lg:px-10">
        <div class="bg-blue-600 rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden">
          <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 28px 28px;"></div>
          <div class="relative">
            <h2 class="text-3xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              Ready to bring your<br class="hidden lg:block" /> designs to life?
            </h2>
            <p class="text-blue-100 text-lg mb-10 max-w-xl mx-auto">Upload your first model in under a minute. No subscription, no setup fees.</p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <UButton to="/register" size="xl" class="rounded-xl font-bold bg-white text-blue-600 hover:bg-blue-50 shadow-2xl px-10" trailing-icon="i-lucide-arrow-right">
                Upload Your Model
              </UButton>
              <UButton to="/login" size="xl" variant="ghost" class="rounded-xl font-semibold text-white hover:bg-white/10 border border-white/30 px-10">
                Sign In
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-zinc-900 dark:bg-zinc-950 text-white border-t border-zinc-800 py-14 lg:py-20">
      <div class="max-w-7xl mx-auto px-6 lg:px-10 grid sm:grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
        <div class="col-span-1 sm:col-span-2 md:col-span-1">
          <div class="flex items-center gap-2.5 mb-5">
            <div class="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
              <Box class="w-4.5 h-4.5" />
            </div>
            <span class="font-black text-lg tracking-tighter">PrintFlow<span class="text-blue-500">3D</span></span>
          </div>
          <p class="text-sm text-zinc-500 mb-6 leading-relaxed">High-precision 3D printing services for engineers, designers, and creators.</p>
          <div class="flex gap-3">
            <a href="#" class="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
              <Twitter class="w-4 h-4" />
            </a>
            <a href="#" class="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
              <Instagram class="w-4 h-4" />
            </a>
            <a href="#" class="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
              <Linkedin class="w-4 h-4" />
            </a>
          </div>
        </div>
        <div>
          <h4 class="font-black text-xs uppercase tracking-widest text-zinc-400 mb-5">Company</h4>
          <ul class="space-y-3.5 text-sm text-zinc-500">
            <li><a href="#" class="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-black text-xs uppercase tracking-widest text-zinc-400 mb-5">Support</h4>
          <ul class="space-y-3.5 text-sm text-zinc-500">
            <li><a href="#" class="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" class="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Shipping Info</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-black text-xs uppercase tracking-widest text-zinc-400 mb-5">Services</h4>
          <ul class="space-y-3.5 text-sm text-zinc-500">
            <li><a href="#" class="hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Custom Quotes</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Materials Guide</a></li>
          </ul>
        </div>
      </div>
      <div class="max-w-7xl mx-auto px-6 lg:px-10 mt-14 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-600">
        <span>© 2026 PrintFlow 3D. All rights reserved.</span>
        <div class="flex gap-6">
          <a href="#" class="hover:text-zinc-400 transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-zinc-400 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Box, UploadCloud, Eye, ShieldCheck, Zap, Twitter, Instagram, Linkedin, Menu, X, Layers, Truck, MessageSquare } from 'lucide-vue-next';

useHead({ title: 'PrintFlow 3D — Precision Printing, Delivered' });

const isMobileMenuOpen = ref(false);

const stats = [
  { value: '50K+', label: 'Models Printed' },
  { value: '98%', label: 'On-Time Delivery' },
  { value: '4.9★', label: 'Customer Rating' },
  { value: '72h', label: 'Avg. Turnaround' },
];

const steps = [
  { icon: UploadCloud, title: 'Upload Your Model', desc: 'Drag and drop your STL, OBJ, or 3MF file. Our system auto-checks for printability.', color: 'bg-blue-600 shadow-blue-600/30' },
  { icon: Eye, title: 'Preview & Configure', desc: 'Inspect your 3D model in an interactive viewer. Select material, finish, and quantity.', color: 'bg-violet-600 shadow-violet-600/30' },
  { icon: Truck, title: 'We Print & Deliver', desc: 'We handle manufacturing and quality control. Your finished part ships to your door.', color: 'bg-emerald-600 shadow-emerald-600/30' },
];

const features = [
  { icon: UploadCloud, title: 'Effortless Multi-Format Uploads', desc: 'Securely upload STL, OBJ, and 3MF files with drag-and-drop. Batch uploads supported for production workflows. Automatic geometry validation catches issues before they become expensive mistakes.' },
  { icon: Eye, title: 'Interactive 3D Preview', desc: 'Real-time WebGL viewer lets you inspect models from every angle, check wall thicknesses, and identify overhangs before committing to a print.' },
  { icon: Zap, title: 'Instant Quote Engine', desc: 'Get accurate pricing the moment you upload — no waiting for a human estimate on standard parts.' },
  { icon: ShieldCheck, title: 'Professional Finishing', desc: 'Raw, polished, or fully painted — every finish option is handled in-house by specialists.' },
  { icon: Layers, title: 'Multi-Material Orders', desc: 'Mix PLA, ABS, PETG, and resin across a single order. Each part gets the ideal material for its application.' },
  { icon: MessageSquare, title: 'Direct Expert Support', desc: 'Chat with a print engineer for complex projects, custom tolerances, or large production runs.' },
];

const materials = [
  { name: 'PLA', abbr: 'Polylactic Acid', emoji: '🟢', desc: 'The go-to for prototypes, models, and visual mockups. Easy to print, great surface detail.', tags: ['Prototyping', 'Display', 'Eco-friendly'] },
  { name: 'ABS', abbr: 'Acrylonitrile Butadiene', emoji: '🔵', desc: 'Heat-resistant and tough. Ideal for functional parts that endure mechanical stress.', tags: ['Functional', 'Heat-resistant', 'Durable'] },
  { name: 'PETG', abbr: 'Polyethylene Terephthalate Glycol', emoji: '⚪', desc: 'Combines the ease of PLA with the strength of ABS. Excellent chemical resistance.', tags: ['Flexible', 'Food-safe', 'Outdoor'] },
  // { name: 'Resin', abbr: 'SLA / DLP', emoji: '🟣', desc: 'Ultra-high resolution for jewelry, dental models, and intricate detail work.', tags: ['High-detail', 'Smooth', 'Miniatures'] },
  { name: 'TPU', abbr: 'FDM', emoji: '🟣', desc: 'Flexible and rubber-like material ideal for shock absorption, wearables, gaskets, and impact-resistant functional parts.', tags: ['Flexible', 'Durable', 'Impact-resistant'] },
];

const examples = [
  { name: 'Small PLA Print', desc: '10cm³, standard resolution, raw finish', price: '$10' },
  { name: 'Medium ABS Print', desc: '50cm³, high resolution, polished finish', price: '$50' },
  { name: 'Large Resin Print', desc: '100cm³, ultra-high detail, painted', price: '$160' },
  { name: 'Custom Project', desc: 'Complex assembly or special materials', price: 'Quote' },
];

const reviews = [
  { name: 'Sarah K.', role: 'Product Designer', text: 'The 3D preview alone saved me two failed prints. I could see the wall thickness issues immediately and fix them before ordering.', color: 'from-blue-500 to-violet-600' },
  { name: 'Marcus T.', role: 'Mechanical Engineer', text: "Turnaround is genuinely 72 hours. I've ordered 12 times now and every single part has been dimensionally accurate within tolerance.", color: 'from-emerald-500 to-teal-600' },
  { name: 'Lena O.', role: 'Industrial Designer', text: 'The finishing options are a game-changer. Getting a painted, presentation-ready prototype this fast and this affordable is unprecedented.', color: 'from-orange-500 to-rose-500' },
];
</script>