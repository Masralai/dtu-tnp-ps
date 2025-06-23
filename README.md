# DTU TNP Problem Statement - Student Data Sharing Platform

A secure Next.js application for sharing student information via controlled, shareable links. Built as a solution for the DTU Training & Placement department problem statement to securely distribute student data without requiring recipients to create accounts.

## Features

- **Admin Authentication**: Secure login system for authorized personnel
- **Link Generation**: Create unique, shareable links for student data access
- **No-Login Access**: Recipients can view data without creating accounts
- **Data Filtering**: Built-in email-based filtering for easy data navigation
- **Responsive Design**: Modern, mobile-friendly interface
- **Secure Sharing**: Time-controlled access with token-based authentication

## Tech Stack

- **Framework**: Next.js 15 (App Router with Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + tw-animate-css
- **UI Components**: Radix UI primitives + shadcn/ui
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge, class-variance-authority

## Development Strategy

This project was built using a **hybrid rapid prototyping and iterative development** approach, combining practical implementation patterns with modern web development best practices:

### Core Strategy Elements

1. **Problem-First Approach**

   - Started by clearly understanding the DTU TNP department's specific needs
   - Identified the core challenge: secure data sharing without account creation overhead
   - Designed the solution around two distinct user workflows (admin vs. recipient)

2. **Pragmatic Tech Stack Selection**

   - **Next.js 15 with App Router**: Leveraged built-in API routes for seamless full-stack development
   - **TypeScript**: Ensured type safety across client and server components
   - **Hybrid Styling Approach**: Combined Tailwind CSS utility classes with shadcn/ui components for rapid yet professional UI development
   - **React useState**: Simple, effective state management without over-engineering

3. **MVP-Focused Development with Real Integration**

   - Built core functionality first: authentication, external API integration, and data viewing
   - **External API Integration**: Connected to actual TNP recruitment API (<https://tnp-recruitment-challenge.manitvig.live>) with proper Bearer authentication
   - **Dual Data Strategy**: Used real API for link generation while implementing example data for immediate UI testing and demonstration
   - **Cookie-based Session Management**: Simple yet secure authentication using Next.js cookies API

4. **Security-by-Design Implementation**

   ```typescript
   // Session-based authentication with httpOnly cookies
   cookieStore.set("admin-session", "authenticated", {
     httpOnly: true,
     sameSite: "lax",
   });

   // Unique token generation for each share link
   const uniqueId = generateUniqueIdForDb();
   ```

   - Implemented proper session management from day one
   - Used Bearer token authentication for external API calls
   - Avoided direct database exposure through controlled API endpoints

5. **Iterative UI/UX Development**

   - **Multiple Design Iterations**: Continuously refined the interface based on usability testing
   - **Component-Based Architecture**: Used shadcn/ui for consistent, accessible components
   - **Real-time Filtering**: Implemented client-side email filtering for instant search results
   - **Responsive Design**: Mobile-first approach with Tailwind's utility classes

6. **Practical Development Patterns**
   - **Error Handling Strategy**: Comprehensive error handling with user-friendly messages

   ```typescript
   if (axios.isAxiosError(err)) {
     if (err.response) {
       setError(
         err.response.data.error || "Failed to generate share link from server."
       );
     } else if (err.request) {
       setError("Network error: Unable to connect to the backend API.");
     }
   }
   ```

   - **Loading States**: Proper loading indicators and user feedback
   - **Development-to-Production Bridge**: Used example data for UI development while maintaining real API integration

### Technical Implementation Highlights

- **Authentication Flow**: Simple but secure admin authentication with session persistence
- **Link Generation**: Integration with external TNP API to generate real shareable tokens
- **Data Presentation**: Clean table interface with search functionality and responsive design
- **State Management**: React useState for local component state, no global state complexity

### Development Methodology

- **Iterative UI Design**: Multiple rounds of interface refinement based on user experience testing
- **Hybrid Data Strategy**: Real API integration for core functionality, example data for UI development
- **Component-First Development**: Built reusable UI components before implementing business logic
- **Security-First Mindset**: Implemented authentication and secure token handling from the beginning

This pragmatic approach allowed for rapid development while maintaining production-ready code quality, real API integration, and a polished user experience through iterative design improvements.

## 📁 Project Structure

```md
app/
├── admin/page.tsx              # Admin dashboard for link management
├── login/page.tsx              # Admin authentication page
├── share/[link]/page.tsx       # Public data viewing page
├── api/
│   ├── auth/
│   │   ├── login/route.ts      # Login endpoint
│   │   ├── logout/route.ts     # Logout endpoint
│   │   └── verify/route.ts     # Session verification
│   ├── generate-link/route.ts  # Share link generation
│   └── resolve-link/[id]/route.ts # Link resolution & data fetch
├── globals.css                 # Global styles and theme
├── page.tsx                    # Landing page
└── layout.tsx                  # Root layout
```

## 🛠️ Setup & Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.x or higher) - [Download here](https://nodejs.org/)
- **npm**, **yarn**, or **pnpm** package manager
- **Git** for version control

### Step-by-Step Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/dtu-tnp-ps.git
cd dtu-tnp-ps
```

#### 2. Install Dependencies

Choose your preferred package manager:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm (recommended for faster installs)
pnpm install
```

#### 3. Environment Configuration

Create your environment file:

```bash
cp .env.example .env.local
```

Add the required environment variables to `.env.local`:

```env
# Required: API token for TNP recruitment challenge
SHARE_TOKEN=your_api_token_here

# Optional: Custom port (default: 3000)
PORT=3000

# Optional: Node environment
NODE_ENV=development
```

> **Important**: The `SHARE_TOKEN` is required for the external API integration. Contact the TNP department or check the recruitment challenge documentation for the token.

#### 4. Development Server

Start the development server with Turbopack:

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

The application will be available at **<http://localhost:3000>**

### 🚀 Quick Start Guide

#### First Time Setup (5 minutes)

1. **Access the Application**

   - Open <http://localhost:3000> in your browser
   - You'll see the landing page

2. **Admin Login**

   - Navigate to <http://localhost:3000/login>
   - Use demo credentials:
     - **Username**: `admin`
     - **Password**: `admin`

3. **Generate Share Link**

   - Click "Generate Share Link" in the admin dashboard
   - Copy the generated link
   - Test it by opening in a new browser tab (or incognito mode)

4. **View Shared Data**
   - The share link will display student data without requiring login
   - Test the email filtering functionality

### Application Structure

```md
http://localhost:3000/          # Landing page
http://localhost:3000/login     # Admin login
http://localhost:3000/admin     # Admin dashboard (requires auth)
http://localhost:3000/share/[link] # Public share pages (no auth required)
```

### 🔧 Development Commands

| Command              | Description                             |
| -------------------- | --------------------------------------- |
| `npm run dev`        | Start development server with Turbopack |
| `npm run build`      | Build for production                    |
| `npm run start`      | Start production server                 |
| `npm run lint`       | Run ESLint                              |
| `npm run type-check` | Run TypeScript compiler check           |

### Troubleshooting

#### Common Issues & Solutions

**1. Port Already in Use**

```bash
# Kill process on port 3000
sudo lsof -t -i tcp:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

**2. Missing Environment Variables**

```bash
Error: Server configuration error
```

**Solution**: Ensure `SHARE_TOKEN` is set in `.env.local`

**3. API Connection Issues**

```bash
Network error: Unable to connect to the backend API
```

**Solution**:

- Check your internet connection
- Verify the `SHARE_TOKEN` is valid
- Ensure the external API is accessible

**4. Authentication Issues**

```bash
# Clear cookies if login doesn't work
```

**Solution**: Clear browser cookies for localhost:3000 or use incognito mode

#### Development Tips

- **Hot Reload**: The app supports hot reloading - changes will reflect immediately
- **Console Logs**: Check browser console and terminal for debugging info
- **Network Tab**: Monitor API calls in browser DevTools
- **Component Inspection**: Use React DevTools extension for component debugging

### Security Notes for Development

- Demo credentials (`admin`/`admin`) are for development only
- Share tokens are stored in memory and reset on server restart
- In production, implement proper database storage and stronger authentication
- Always use HTTPS in production environments

### What to Test

1. **Admin Flow**:

   - Login/logout functionality
   - Share link generation
   - Copy to clipboard feature

2. **Public Share Flow**:

   - Access share links without authentication
   - Email filtering functionality
   - Responsive design on mobile

3. **Error Handling**:
   - Invalid login credentials
   - Network errors
   - Invalid share links

### Getting Help

If you encounter issues:

1. Check the troubleshooting section above
2. Review browser console for error messages
3. Ensure all prerequisites are installed
4. Verify environment variables are set correctly

**Ready to start developing!** 🎉

## 🔧 Configuration

### Environment Variables

| Variable      | Description                                 | Required |
| ------------- | ------------------------------------------- | -------- |
| `SHARE_TOKEN` | API token for external student data service | Yes      |

### Demo Credentials

For development and testing:

- **Username**: `admin`
- **Password**: `admin`

> **Note**: Change these credentials in production by modifying the authentication logic in `app/api/auth/login/route.ts`

## 🎯 Problem Statement

This project addresses the DTU TNP department's need for a secure, efficient way to share student data with recruiters and other authorized parties without requiring them to create accounts or access internal systems.

## 🎯 Usage

### Admin Workflow

1. **Login** - Access the admin panel at `/login`
2. **Generate Links** - Create shareable links from the admin dashboard
3. **Share** - Distribute generated links to authorized recipients
4. **Monitor** - View all generated links in the admin panel

### Recipient Workflow

1. **Access Link** - Click on the provided share link
2. **View Data** - Browse student information without login
3. **Filter** - Use email filtering to find specific students
4. **Export** - Copy or reference needed information

## 🔒 Security Features

- **Session-based Authentication**: Secure cookie management
- **Token-based Data Access**: Each share link uses unique tokens
- **No Direct Database Exposure**: Data accessed through controlled APIs
- **Automatic Session Management**: Secure login/logout functionality

## 🌐 API Endpoints

### Authentication

- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/verify` - Session verification

### Link Management

- `POST /api/generate-link` - Generate new share link
- `GET /api/resolve-link/[id]` - Resolve link and fetch data

## Development

### Key Components

- **Admin Dashboard**: Link generation and management
- **Public Share Pages**: No-auth data viewing
- **Authentication System**: Session management
- **API Integration**: External student data service

### Styling

The project uses Tailwind CSS with a custom theme:

- **Light/Dark Mode**: Automatic theme detection
- **Modern Design**: Glassmorphism and gradient effects
- **Responsive**: Mobile-first approach

## Known Issues

- **In-Memory Storage**: Link data is stored in memory and resets on server restart
- **Demo Data**: Share pages currently use example data for demonstration

## Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Lucide](https://lucide.dev/) for the icon library
