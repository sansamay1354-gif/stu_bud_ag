StudyBuddy Agent - MVP Implementation Plan
Core Files to Create/Modify
1. Main Layout & Navigation
src/components/Layout.tsx - Main layout with navbar and navigation
src/components/Navbar.tsx - Top navigation bar with tabs
2. Pages (5 main sections)
src/pages/Dashboard.tsx - Home dashboard with overview cards
src/pages/PeerFinder.tsx - Search and match with peers
src/pages/Sessions.tsx - Calendar view and session management
src/pages/Resources.tsx - Learning resources and study tools
src/pages/Profile.tsx - User profile and preferences
3. Components
src/components/PeerCard.tsx - Individual peer display card
src/components/SessionCard.tsx - Study session display card
src/components/Calendar.tsx - Calendar component for scheduling
src/components/StudyTools.tsx - Flashcards and quiz components
4. Data & Logic
src/lib/mockData.ts - Mock data for peers, sessions, resources
src/lib/matching.ts - Peer matching algorithm logic
src/hooks/useStudyBuddy.ts - Custom hooks for state management
5. Styling
Update index.html - Change title and meta tags
Update src/App.tsx - Add routing for all pages
Custom CSS for color scheme integration
Color Scheme Implementation
Primary: Deep Blue (#1E3A5F)
Secondary: Slate Gray (#3E4C59)
Accent: Teal Green (#2BBBAD)
Background: Light Gray (#F5F7FA)
Text: Charcoal Black (#222222)
MVP Features Priority
Dashboard with overview cards ✓
Peer finder with search and filters ✓
Basic session calendar ✓
Simple study tools (flashcards) ✓
Profile management ✓
Implementation Strategy
Use shadcn/ui components for consistent design
Implement mock data first, then add real functionality
Focus on clean, professional UI as specified
Add subtle animations and interactions
