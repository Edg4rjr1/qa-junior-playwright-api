// @ts-check
import { defineConfig } from '@playwright/test';
import 'dotenv/config'
/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',


  
  use: {
  baseURL: 'https://gorest.co.in/public/v2/',
  extraHTTPHeaders: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
      'Content-Type': 'application/json',
  },
  trace: 'on-first-retry',
} 
});