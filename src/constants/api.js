// Global
export const HOST = 'http://localhost:3000'
export const DEFAULT_TIMEOUT = 20000

// Unkata API settings
export const API_HOST = process.env.API_HOST
export const API_ROOT = 'api'
export const API_VERSION = 'v1'
export const API_URL = `http://${API_HOST}/${API_ROOT}/${API_VERSION}`

// Facebook API settings
export const FACEBOOK_API_APP_ID = '493655844320914'
export const FACEBOOK_API_VERSION = 'v2.8'
export const FACEBOOK_API_REDIRECT_URL = `${HOST}/sign-in`

// Google API settings
export const GOOGLE_API_CLIENT_ID = '410474073760-tesf4mvq0po0d395m9fc8sa4d4r5nhu8.apps.googleusercontent.com'
export const GOOGLE_API_REDIRECT_URL = `${HOST}/sign-in`
