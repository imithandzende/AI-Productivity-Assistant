# AI Workplace Productivity Assistant

## Project Overview

The AI Workplace Productivity Assistant is a modern, responsive web application designed to help professionals automate everyday workplace tasks using AI. It provides an intuitive dashboard with specialized AI-powered tools for email writing, meeting summarization, task planning, research, and general assistance through an AI chatbot.

The application helps users save time, stay organized, and communicate more effectively by offering structured AI prompts and editable outputs in a clean, professional SaaS-style interface.

## Features

- **Smart Email Generator** — Draft professional emails with adjustable tone and length controls. Supports formal, friendly, persuasive, and urgent tones.
- **Meeting Notes Summarizer** — Paste raw meeting notes and receive structured summaries with key decisions, action items, and follow-ups formatted in Markdown.
- **AI Task Planner** — Enter a goal or project and receive a prioritized breakdown of milestones and tasks with timeline estimates.
- **AI Research Assistant** — Generate structured professional briefings on any topic with key insights, sources, and recommendations.
- **AI Chatbot Interface** — A conversational AI assistant for general workplace questions, brainstorming, and quick help.
- **Modern Dashboard UI** — Clean, professional dashboard with feature cards, quick navigation, and a responsive layout.
- **Sidebar Navigation** — Collapsible sidebar for easy access to all tools.
- **Responsive Design** — Fully responsive layout that works smoothly on desktop, tablet, and mobile devices.
- **Editable AI Outputs** — All AI-generated content is presented in editable text areas so you can refine results before using them.
- **Responsible AI Disclaimer** — A persistent disclaimer about AI-generated content accuracy and the importance of human review.
- **Light & Dark Mode** — Full support for both light and dark themes.

## Tools Used

### Frontend
- React 19
- TypeScript
- Tailwind CSS 4
- Radix UI (accessible UI primitives)
- Framer Motion (animations)
- Lucide React (icons)
- Recharts (charts & data visualization)

### Backend & Framework
- TanStack Start v1 (full-stack React framework with SSR/SSG)
- TanStack Router (file-based routing)
- TanStack Query (server state management)
- Vite 7 (build tool)

### AI Integration
- Lovable AI Gateway (Google Gemini 3 Flash Preview)

### Database & Auth
- Lovable Cloud (Supabase)
- Supabase Auth
- Supabase Realtime (optional)

### Other Tools
- Zod (schema validation)
- React Hook Form (form management)
- ESLint & Prettier (code quality)
- Git & GitHub (version control)

## Setup Instructions

### Prerequisites

Make sure you have installed:

- Git
- Node.js 18+ and npm (or Bun)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ai-productivity-assistant.git
   ```

2. Navigate to the project directory:
   ```bash
   cd ai-productivity-assistant
   ```

3. Install dependencies:
   ```bash
   bun install
   ```

4. Configure environment variables:

   Create a `.env` file in the root directory and add the required variables:

   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   ```

### Running the Application

Start the development server:

```bash
bun run dev
```

Open your browser and navigate to:

```
http://localhost:3000
```

### Building for Production

```bash
bun run build
```

### Preview Production Build

```bash
bun run preview
```

## Project Structure

```
ai-productivity-assistant/
│
├── src/
│   ├── components/          # Reusable UI components
│   ├── routes/              # TanStack file-based routes
│   ├── lib/                 # Utilities, AI functions, helpers
│   ├── integrations/        # Supabase client & auth
│   ├── hooks/               # Custom React hooks
│   └── styles.css           # Global styles & design tokens
├── supabase/                # Supabase configuration
├── public/                  # Static assets
├── .env                     # Environment variables
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Contributing

Contributions are welcome. Please fork the repository, create a feature branch, and submit a pull request.

## License

This project is licensed under the MIT License.

---

Developed by: **Khanyiswa Owethu Ndzende**

GitHub: [@imithandzende](https://github.com/imithandzende)
