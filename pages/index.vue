<template>
<div class="fixed top-5 left-1/2 transform -translate-x-1/2 p-4 flex space-x-4 items-center justify-center">        <button @click="activeComponent = 'client'" :class="{ 'text-blue-500': activeComponent === 'client' }">Client Captcha</button>
        <button @click="activeComponent = 'server'" :class="{ 'text-blue-500': activeComponent === 'server' }">Server Captcha</button>
    </div>
  
    <ClientCaptcha v-if="activeComponent === 'client'" />
    <ServerCaptacha v-if="activeComponent === 'server'" />
</template>

<script setup>
    const activeComponent = ref('client');
</script>

