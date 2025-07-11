# METAR Viewer

A desktop application for VATSIM controllers to visualize real-time METAR weather data with interactive runway wind compass displays and comprehensive weather dashboards.

![Status](https://img.shields.io/badge/status-in%20development-orange)
![License](https://img.shields.io/badge/license-MIT-blue)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)

## 🎯 Project Aim

METAR Viewer is designed specifically for **VATSIM virtual air traffic controllers** who need quick, visual access to current weather conditions at multiple airports simultaneously. The application provides:

- **Real-time METAR data** from the VATSIM METAR API
- **Interactive runway wind compass** showing wind direction relative to runway headings
- **Comprehensive weather dashboard** with temperature, QNH, visibility, ceiling, and cloud information
- **Multi-airport monitoring** (up to 4 airports simultaneously)
- **Visual weather indicators** with color-coded VFR/IFR status

Perfect for controllers managing multiple airports or monitoring weather conditions across their sector.

### ✨ Latest Updates (v0.2.0)

**Responsive Design System** - The application now features a comprehensive responsive design that adapts seamlessly to different airport counts:
- **1 Airport**: Full-width centered layout with maximum detail and all visual elements
- **2 Airports**: Side-by-side layout with comfortable spacing and full features
- **3 Airports**: Compact single-row layout with intelligent status card grid
- **4 Airports**: Balanced 2x2 grid layout ensuring optimal readability

**Professional Weather Dashboard** - Each airport now displays in a comprehensive MetarPanel featuring:
- Status cards for VFR/IFR, temperature, wind, visibility, ceiling, and QNH
- Interactive SVG wind compass showing wind direction relative to runway headings
- Scalable design elements that maintain readability across all layout sizes
- Professional aviation-themed blue-to-purple gradient design

## 🚧 Development Status

**This application is currently in active development and is NOT ready for production use.**

## 🛠️ Tech Stack

### Core Framework
- **[Electron](https://electronjs.org/)** - Cross-platform desktop app framework
- **[React 18](https://react.dev/)** - UI library with hooks
- **[TypeScript](https://typescriptlang.org/)** - Type-safe JavaScript

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Icons](https://react-icons.github.io/react-icons/)** - Weather and UI icons
- **PostCSS** - CSS processing

### Weather Data & Parsing
- **[VATSIM METAR API](https://metar.vatsim.net/)** - Real-time aviation weather data
- **[metar-taf-parser](https://www.npmjs.com/package/metar-taf-parser)** - METAR/TAF parsing library

### Development Tools
- **[Vite](https://vitejs.dev/)** - Fast build tool and dev server
- **[Concurrently](https://www.npmjs.com/package/concurrently)** - Run multiple commands simultaneously

## ⭐ Features

### Current Implementation
- ✅ **Airport Selection Dialog** - Choose up to 4 airports from predefined list
- ✅ **VATSIM METAR Integration** - Live weather data fetching and real-time parsing
- ✅ **Comprehensive Weather Dashboard** - Professional aviation-themed UI with status cards
- ✅ **Interactive Runway Wind Compass** - SVG-based compass with scalable wind direction display
- ✅ **Responsive Multi-Airport Layout** - Dynamic grid system adapting to 1-4 airports
- ✅ **Status Card System** - VFR/IFR status, temperature, wind, visibility, ceiling, QNH
- ✅ **Raw METAR Display** - Full METAR string for reference with responsive formatting
- ✅ **Professional Aviation UI** - Blue-to-purple gradient theme with weather icons

### Planned Features
- 🔄 **Advanced Weather Visualizations**
  - Ceiling/visibility bar charts (placeholder implemented)
  - Cloud layer visualization
  - Enhanced wind visualizations
- 🔄 **Enhanced UI/UX**
  - Auto-refresh capabilities
  - Improved VFR/IFR status detection
  - Weather condition animations
- 🔄 **Data Export** - Save weather snapshots
- 🔄 **Custom Airport Lists** - User-defined airport collections
- 🔄 **Mobile Responsiveness** - Touch-friendly interface for tablets

## 🚀 Development Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jonohanekom/metar-view.git
   cd metar-view
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development environment**
   ```bash
   npm run dev
   ```
   This runs both the Vite dev server and Electron concurrently.

### Available Scripts

- `npm run dev` - Start development with hot reload
- `npm run build` - Build for production
- `npm run start` - Run the built application
- `npm run preview` - Preview the built application

### Project Structure

```
src/
├── components/
│   ├── AirportSelector.tsx     # Airport selection dialog
│   ├── MetarPanel.tsx          # Main weather dashboard component
│   └── RunwayWindCompass.tsx   # SVG wind compass with runways
├── utils/
│   ├── fetchMetar.ts           # VATSIM API integration
│   └── parseMetar.ts           # METAR parsing utilities
├── data/
│   └── airports.json           # Airport database with runway info
├── styles/
│   └── index.css              # Global styles and Tailwind imports
└── App.tsx                    # Main application component
```

## 🌐 API Integration

The application fetches real-time METAR data from the **VATSIM METAR API**:
- **Endpoint**: `https://metar.vatsim.net/metar.php?id={ICAO_CODES}`
- **Format**: Plain text, one METAR per line
- **Update Frequency**: Real-time VATSIM network data

## 🤝 Contributing

We welcome contributions from the VATSIM community! This project is in active development and there are many opportunities to help.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Test thoroughly**
5. **Commit your changes** (`git commit -m 'Add amazing feature'`)
6. **Push to the branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### Development Guidelines

- Follow existing TypeScript and React patterns
- Use Tailwind CSS for styling
- Ensure components are responsive and accessible
- Test with multiple airports and weather conditions
- Document any new features or API changes

### Areas for Contribution

- **Weather Visualizations** - Enhanced charts and graphs
- **UI/UX Improvements** - Better visual design and user experience
- **Performance Optimization** - Faster rendering and data processing
- **Additional Features** - Export functionality, custom airport lists
- **Testing** - Unit tests and integration tests
- **Documentation** - Improved setup guides and API documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **VATSIM Network** - For providing free access to real-time aviation weather data
- **metar-taf-parser** - For robust METAR parsing capabilities
- **VATSIM Community** - For inspiration and feedback

---

**Built for the VATSIM community by virtual controllers, for virtual controllers.**