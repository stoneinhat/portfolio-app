# Mac-Style Portfolio Application

A beautiful, modern portfolio website built with Next.js 14, TypeScript, and Tailwind CSS, featuring a macOS-inspired window interface with a static sidebar navigation.

## Features

- **Mac Window Interface**: Authentic macOS-style window with functional traffic light buttons
- **Static Sidebar Navigation**: Left sidebar with categories and social links (inspired by [amiralirashidi.me](https://amiralirashidi.me/))
  - Full width (256px) with icons and labels on desktop
  - Compact width (64px) with icons-only on mobile
- **Smooth Scrolling**: Navigate between sections seamlessly
- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Clean, professional design with smooth animations and transitions
- **Fullscreen Mode**: Green traffic light button enables fullscreen viewing
- **Gradient Hero Card**: Eye-catching hero section with gradient background

## Components

- **MacWindow**: Main window container with traffic light controls
- **Sidebar**: Static left sidebar with categories (About, Skills, Jobs, Projects, Educations) and social links
- **Hero**: Prominent hero card with name, professional description, and download resume button
- **Skills**: Grid showcase of technical skills with icons
- **Experience**: Timeline of work experience
- **Projects**: Grid showcase of projects with tech stack and links
- **Education**: Educational background and certifications
- **Contact**: Contact information and message form

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

### Personal Information
Edit the following files to add your personal information:
- `components/Hero.tsx` - Name, professional description, and download resume button
- `components/Sidebar.tsx` - Profile initials, categories, and social links
- `components/Skills.tsx` - Your technical skills
- `components/Experience.tsx` - Your work experience
- `components/Projects.tsx` - Your projects
- `components/Education.tsx` - Your educational background
- `components/Contact.tsx` - Your contact information

### Styling
- `app/globals.css` - Global styles and background gradient
- Tailwind CSS classes throughout components for styling

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Package Manager**: npm

## Build for Production

```bash
npm run build
npm start
```

## License

MIT
