# 🚀 INITBOT Wake Up You Sleepy Servers

Cold Start Solver is a web application that helps mitigate the cold start problem for applications by optimizing caching, pre-warming infrastructure, and providing real-time alerts when the server is down.

## ✨ Features
- **Cold Start Mitigation**: Reduces latency by preloading required resources.
- **Turborepo Monorepo**: Efficient build system for faster development.
- **Next.js & TypeScript**: Modern frontend framework with static and server-side rendering.
- **Redis Caching**: Optimizes response time and data retrieval.
- **Tailwind CSS**: Utility-first styling for rapid UI development.
- **Email & Discord Notifications**: Sends alerts when the server is down.

## 🛠️ Tech Stack
- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Queue Management**: Redis
- **Notifications**: Resend (Email), Discord Webhooks
- **Monorepo Tooling**: Turborepo
- **Database**: Prisma

## 🚀 Getting Started
### Prerequisites
Ensure you have the following installed:
- Node.js (>= 18.x)
- Redis (running instance)
- Prisma Database (running instance)
- A valid SMTP server for emails
- A Discord webhook URL for notifications

### Installation
```bash
git clone https://github.com/Official-Krish/Wake-up-you-sleepy-servers
cd InitBot-wake-up-you-sleepy-servers
pnpm install
```

### Environment Variables
Create a `.env` file in the root directory and configure the following:
```Worker env
REDIS_URL=
REDIS_HOST=
BACKEND_URL=
```

```BACKEND env
REDIS_URL=
REDIS_HOST=
RESEND_API_KEY=
```

```Frontend env
NEXTAUTH_SECRET=
NEXT_PUBLIC_BACKEND_URL=
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=
```

### Running the Project
```bash
pnpm dev
```
The frontend will be available at http://localhost:3000
The backend will be available at http://localhost:8000  

### Deployment
To deploy the application, use Vercel or any cloud provider that supports Next.js.
```bash
pnpm build
pnpm start
```

## 📧 Notifications Setup
- **Email Alerts**: Uses Nodemailer to send notifications when the server is down.
- **Discord Alerts**: Utilizes Discord webhooks for instant alerts.

# Contributors
We welcome contributions from the community! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/[feature-title]`).
3. Make your changes and commit them (`git commit -am 'Add brief meaningful commit message'`).
4. Push to the branch (`git push origin feature/[feature-title]`).
5. Create a new Pull Request.


## 📜 License
This project is licensed under the MIT License.

---
Made with ❤️ by Krish Anand
