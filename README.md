# YouTube Thumbnail Downloader

A modern, fast, and user-friendly web application for downloading YouTube video thumbnails in multiple qualities. Built with React, TypeScript, and Vite.

## 🌟 Features

- **Multiple Quality Options** - Download thumbnails in resolutions from default (120×90) up to maximum (1280×720)
- **Live Preview** - View all available thumbnail sizes before downloading
- **One-Click Download** - Instantly save thumbnails directly to your device
- **Clean Interface** - Minimal, intuitive design with smooth animations
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **No Registration Required** - Free to use without any sign-ups

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Hooks
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Testing**: Vitest with Testing Library

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (buttons, cards, etc.)
│   ├── LinkInput.tsx   # URL input component with validation
│   ├── ThumbnailDownloader.tsx  # Main downloader component
│   ├── ThumbnailPreview.tsx     # Thumbnail preview and selection
│   ├── LoadingState.tsx         # Loading indicators
│   └── ErrorState.tsx           # Error handling component
├── hooks/              # Custom React hooks
│   └── useThumbnail.ts # Hook for thumbnail fetching logic
├── lib/                # Utility functions
│   └── url-utils.ts    # URL validation and parsing utilities
├── pages/              # Page components
│   ├── Index.tsx       # Main landing page
│   └── NotFound.tsx    # 404 error page
├── types/              # TypeScript type definitions
│   └── thumbnail.ts    # Thumbnail-related interfaces
├── test/               # Test files
└── App.tsx             # Root application component
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd thumbnail-fetcher-main
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run test` - Run tests
- `npm run lint` - Run ESLint for code quality checks

## 🔧 How It Works

### Core Logic

The application works by extracting the YouTube video ID from valid URLs and constructing thumbnail URLs using YouTube's public image API:

- **Default Quality**: `https://img.youtube.com/vi/{videoId}/default.jpg` (120×90)
- **Medium Quality**: `https://img.youtube.com/vi/{videoId}/mqdefault.jpg` (320×180)
- **High Quality**: `https://img.youtube.com/vi/{videoId}/hqdefault.jpg` (480×360)
- **Maximum Resolution**: `https://img.youtube.com/vi/{videoId}/maxresdefault.jpg` (1280×720)

### URL Validation

The application validates YouTube URLs using regex patterns for:
- Standard YouTube watch URLs (`youtube.com/watch?v=`)
- Shortened URLs (`youtu.be/`)
- Embedded videos (`youtube.com/embed/`)
- YouTube Shorts (`youtube.com/shorts/`)

## 🎨 UI Components

The project uses shadcn/ui components which are built on top of Radix UI primitives, providing accessible and customizable UI elements including:

- Buttons with multiple variants (primary, secondary, outline, ghost)
- Form inputs with validation
- Cards and containers
- Toast notifications
- Dialogs and modals
- Loading spinners

## 🧪 Testing

Run the test suite:
```bash
npm run test
```

Watch mode for development:
```bash
npm run test:watch
```

## 📱 Responsive Design

The application is fully responsive and adapts to different screen sizes:
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized spacing and typography

## 🔒 Security & Privacy

- **Client-side only** - No server-side processing
- **No data collection** - Your URLs are processed locally
- **No tracking** - No analytics or user monitoring
- **HTTPS ready** - Secure deployment support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for excellent UI components
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [Vite](https://vitejs.dev/) for lightning-fast development
- YouTube for providing public thumbnail APIs

## 🐛 Known Issues

- Some YouTube videos may not have maxres thumbnails available
- Very recent videos might have delayed thumbnail availability
- Some region-restricted content may not work as expected

## 🔄 Future Enhancements

- Support for other video platforms
- Batch downloading capabilities
- Custom thumbnail cropping
- Dark/light theme toggle
- Keyboard shortcuts
- Progressive Web App (PWA) support