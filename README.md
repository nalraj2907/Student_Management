# Student Management System

A modern React application for managing student information with full CRUD (Create, Read, Update, Delete) operations.

## Features

- ✅ **Create**: Add new students with form validation
- ✅ **Read**: Display all students in a responsive grid layout
- ✅ **Update**: Edit existing student information
- ✅ **Delete**: Remove students with confirmation
- ✅ **Search**: Search students by name or student ID
- ✅ **Filter**: Filter students by course
- ✅ **Data Persistence**: Automatically saves to localStorage

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **localStorage** - Data persistence

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

This will start a local server to preview the production build.

## Deployment

The application is ready to deploy to various hosting platforms. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy Options

#### Vercel (Recommended - Easiest)
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod
```

#### Firebase
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

**Note**: Configuration files (`vercel.json`, `netlify.toml`) are already included in the project.

## Student Data Model

Each student has the following fields:
- **Name**: Student's full name
- **Student ID**: Unique identifier
- **Email**: Email address
- **Age**: Age in years
- **Course**: Course name

## Project Structure

```
src/
├── App.jsx              # Main application component
├── main.jsx             # Application entry point
├── index.css            # Global styles with Tailwind
├── components/
│   ├── StudentList.jsx  # List of all students
│   ├── StudentCard.jsx  # Individual student card
│   ├── StudentForm.jsx  # Form for add/edit
│   └── Modal.jsx        # Modal dialog component
└── utils/
    └── storage.js       # localStorage utilities
```

## Usage

1. **Add a Student**: Click the "Add Student" button and fill in the form
2. **Edit a Student**: Click the edit icon on any student card
3. **Delete a Student**: Click the delete icon and confirm
4. **Search**: Type in the search box to filter by name or student ID
5. **Filter by Course**: Select a course from the dropdown to filter students

## License

MIT

