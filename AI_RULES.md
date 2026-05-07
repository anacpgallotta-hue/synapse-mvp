# Synapse MVP - AI Rules & Tech Stack

## Tech Stack
- **React 18**: Core library for building the user interface.
- **Vite**: Fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for all styling and responsive design.
- **Lucide React**: Icon library for consistent and scalable UI icons.
- **React Context API**: Used for global state management (tasks, projects, clients, notifications).
- **JavaScript (ES6+)**: Primary programming language for logic and components.
- **Responsive Design**: Mobile-first approach using Tailwind's responsive utilities.

## Development Rules
- **Styling**: Always use Tailwind CSS classes. Do not create new CSS files; use `index.css` only for global base styles.
- **Icons**: Exclusively use Lucide React icons. If a specific icon is needed, use the existing `Icon` wrapper component.
- **State Management**: Use `AppContext` for any data that needs to be shared across views (e.g., tasks, user info). Use `useState` for local UI state.
- **Component Architecture**: Keep components small and focused. Reuse base UI components like `Card`, `Button`, and `Badge` to maintain visual consistency.
- **Naming Conventions**: 
  - Components: `PascalCase` (e.g., `ExecutorView`)
  - Functions/Variables: `camelCase` (e.g., `handleTaskClick`)
- **Notifications**: Use the `notify` function from `AppContext` to trigger system-wide alerts.
- **Data Flow**: Follow a unidirectional data flow. Pass callbacks down to child components for actions.