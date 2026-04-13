<template>
  <div class="flex items-center">
      <UButton @click="paymentAction" >Pay <b>{{order.currency}}{{order.totalAmount}}</b> Now</UButton>
  </div>
</template>

<script setup lang="ts">

const props = defineProps(['order'])
const emits = defineEmits(['completed'])

const userCookie = useCookie('auth_user');
const user = userCookie.value as any;

const runtimeConfig = useRuntimeConfig();
const flutterwavePublicKey = runtimeConfig.public.flutterwavePublicKey;

const paymentAction = ()=>{
  const modal = FlutterwaveCheckout({
    public_key: flutterwavePublicKey,
    tx_ref: `trx_${props.order.id}`,
    amount: props.order.totalAmount,
    currency: props.order.currency,
    payment_options: 'card',
    // redirect_url: 'https://glaciers.titanic.com/handle-flutterwave-payment',
    meta: {
      consumer_id: 23,
      consumer_mac: '92a3-912ba-1192a',
    },
    customer: {
      email: user.email,
      phone_number: user.phoneNumber,
      name: `${props.firstName} ${props.lastName}`,
    },
    customizations: {
      title: 'Green Edge Printflow',
      description: '',
      // logo: 'https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg',
    },
    callback: (payment) => {
      if (payment) {
        console.log(payment);
        emits("completed", payment);
        modal.close();
      }
    }
  });
}

</script>

<style scoped>

</style>