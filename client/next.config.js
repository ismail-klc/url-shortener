/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    GOOGLE_AUTH_CLIENT_ID: process.env.GOOGLE_AUTH_CLIENT_ID,
    APP_API_URL: process.env.APP_API_URL
  }
}