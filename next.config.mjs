import "./src/env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: [
              'localhost:3000', // localhost
              'opulent-umbrella-gpjx5qg4v9vh6vw-3000.app.github.dev', // Codespaces
            ],
          },
    }
    
}

export default nextConfig
