import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss' // Make sure this is imported
import autoprefixer from 'autoprefixer' // Make sure this is imported

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer], // Make sure this line is here
    },
  },
  plugins: [react()],
})