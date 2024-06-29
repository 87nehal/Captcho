import { defineEventHandler, getCookie, readBody } from 'h3'; 

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const userCaptchaInput = body.captchaInput; 
    const storedCaptchaText = getCookie(event, 'captchaText');

    if (!storedCaptchaText) {
      return { success: false, message: 'Captcha expired or not found.' };
    }

    if (userCaptchaInput && userCaptchaInput.toLowerCase() === storedCaptchaText.toLowerCase()) {
      return { success: true, message: 'Captcha verified!' };
    } else {
      return { success: false, message: 'Incorrect captcha.' };
    }

  } catch (error) {
    console.error('Error validating captcha:', error);
    return { success: false, message: 'An error occurred.' };
  }
});