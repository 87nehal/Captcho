import { defineEventHandler, createError, sendError } from 'h3';
import { setCookie } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captchaText = '';
    for (let i = 0; i < 6; i++) {
      captchaText += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    setCookie(event, 'captchaText', captchaText, {
      maxAge: 120,
      httpOnly: true,
    });

    return { captchaText }; 

  } catch (error) {
    console.error('Error generating captcha:', error);
    sendError(event, createError({ statusCode: 500, statusMessage: 'Error generating captcha' }));
  }
});