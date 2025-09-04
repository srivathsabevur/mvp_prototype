import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // 👈 allows access from network/public
    allowedHosts: [
      "69636f7dcdc1.ngrok-free.app", // 👈 your ngrok host
    ],
  },
});
