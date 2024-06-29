<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="max-w-[400px] bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-4">Verify You Are Human</h2>
      <div class="captcha-container flex flex-col items-center">
        <div class="relative">
          <div
            class="z-10 cursor-default absolute top-0 left-0 w-full h-full overflow-hidden"
          ></div>
          <div
            style="font-family: 'CaptchoFont', sans-serif; user-select: none;"
            class="captcha-text text-2xl font-bold tracking-widest mb-4 text-blue-500"
          >
            <span v-for="(char, index) in captchaText.split('')" :key="index">
              {{ char }}
              <span v-if="index < captchaText.length - 1" class="captcha-noise">
                {{ generateNoise() }}
              </span>
            </span>
          </div>
        </div>
        <form @submit.prevent="checkCaptcha" class="flex space-x-4">
          <input
            type="text"
            v-model="userInput"
            placeholder="Enter CAPTCHA"
            class="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Verify
          </button>
        </form>
        <p
          v-if="showResult"
          :class="{ 'text-green-500': isSuccess, 'text-red-500': !isSuccess }"
          class="mt-2"
        >
          {{ resultMessage }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import "./assets/fonts/fonts.css"; // Import your custom font

const captchaText = ref("");
const userInput = ref("");
const showResult = ref(false);
const resultMessage = ref("");
const isSuccess = ref(false);

const generateCaptcha = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  captchaText.value = result;
};

const checkCaptcha = () => {
  showResult.value = true;
  if (userInput.value.toLowerCase() === captchaText.value.toLowerCase()) {
    resultMessage.value = "CAPTCHA verified!";
    isSuccess.value = true;
    // Further actions on successful verification
  } else {
    resultMessage.value = "Incorrect CAPTCHA. Try again.";
    isSuccess.value = false;
    generateCaptcha();
    userInput.value = "";
  }
};

const generateNoise = () => {
  const noiseChars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let noiseLength = Math.floor(Math.random() * 3) + 1;
  let noise = "";
  for (let i = 0; i < noiseLength; i++) {
    noise += noiseChars.charAt(Math.floor(Math.random() * noiseChars.length));
  }
  return noise;
};

onMounted(() => {
  generateCaptcha();
});
</script>

<style scoped>

.captcha-noise {
  font-size: 0.0rem;
  opacity: 0.0;
}
</style>