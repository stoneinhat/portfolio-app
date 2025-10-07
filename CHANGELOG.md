# Changelog

## Sidebar Update - Based on Reference Design

### Added Components
- **Sidebar.tsx** - Static left navigation with Categories and Social Links sections
- **Skills.tsx** - Grid display of technical skills with colored icon badges
- **Education.tsx** - Educational background section with timeline cards

### Updated Components
- **MacWindow.tsx** - Modified layout to support sidebar + main content flex layout
- **Hero.tsx** - Redesigned as a prominent gradient card with:
  - Professional description (5+ years experience content)
  - Download Resume button
  - Decorative illustration placeholder
  - Gradient background with blur effects
- **About.tsx** - Simplified (now returns null as content moved to Hero)
- **page.tsx** - Updated to use Sidebar instead of Header component

### Layout Changes
- Removed top sticky header navigation
- Added static left sidebar (hidden on mobile, visible on md+ screens)
- Sidebar includes:
  - Profile picture/initials in top-right
  - Categories: About, Skills, Jobs, Projects, Educations
  - Social Links: LinkedIn, GitHub, Telegram, Phone, Email
- Main content area scrolls independently with custom scrollbar

### Design Features
- Sidebar has backdrop blur and semi-transparent background
- Smooth hover effects on navigation items
- Icon scaling animations
- Responsive sidebar design:
  - Mobile (< 768px): 64px wide, icons-only with tooltips
  - Desktop (≥ 768px): 256px wide, icons + labels
- Maintained Mac window interface with traffic lights

### Reference
Design inspired by: https://amiralirashidi.me/

