# ClassMods - Homeschooling Platform

A modern, React-based homeschooling platform designed to facilitate collaborative learning, group management, and educational content delivery.

## 🌟 Features

- **Group Management**: Create and manage learning groups by subject and grade level
- **Interactive Chat**: Real-time messaging within study groups
- **Discussion Forums**: Structured discussions with threading and moderation
- **Quiz System**: Create and take educational quizzes
- **Study Sessions**: Schedule and join collaborative study sessions
- **Subscription Management**: Tiered access control with premium features
- **Responsive Design**: Modern UI built with Tailwind CSS

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context API
- **Build Tool**: Vite
- **Deployment**: AWS S3 + CloudFront

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── HomePage.tsx    # Landing page
│   ├── GroupsPage.tsx  # Group listing and management
│   ├── GroupDetailPage.tsx # Individual group view
│   ├── LessonPage.tsx  # Lesson content
│   ├── QuizPage.tsx    # Quiz interface
│   ├── ExamPage.tsx    # Exam interface
│   ├── PricingPage.tsx # Subscription plans
│   └── ...
├── contexts/           # React contexts
│   └── SubscriptionContext.tsx
├── data/              # Sample data and mock APIs
├── types/             # TypeScript type definitions
└── assets/            # Static assets
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/cryptogramllc/classmods.git
cd classmods

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

### AWS S3 + CloudFront Setup
The project is configured for deployment on AWS S3 with CloudFront CDN:

1. **S3 Bucket**: `classmods-website`
2. **CloudFront Distribution**: `ELDPO7FU4X9UC`
3. **Domain**: `www.classmods.com`

### Deployment Script
Use the included deployment script for easy updates:
```bash
./deploy.sh
```

### Manual Deployment
```bash
# Build the project
npm run build

# Sync with S3
aws s3 sync dist/ s3://classmods-website --delete
```

## 🌐 Live Demo

- **Production URL**: [https://www.classmods.com](https://www.classmods.com)
- **CloudFront URL**: [https://d1v865xyzwcgyr.cloudfront.net](https://d1v865xyzwcgyr.cloudfront.net)

## 📱 Screenshots

### Homepage
![Homepage](screenshots/homepage.png)

### Groups Management
![Groups](screenshots/groups.png)

### Group Detail
![Group Detail](screenshots/group-detail.png)

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_URL=your_api_url_here
VITE_STRIPE_PUBLIC_KEY=your_stripe_key_here
```

### AWS Configuration
Ensure you have AWS CLI configured with appropriate permissions:
```bash
aws configure
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: Jibran
- **Organization**: Cryptogram LLC

## 🆘 Support

For support and questions:
- Create an issue in this repository
- Contact: admin@classmods.com

## 🗺️ Roadmap

- [ ] User authentication and profiles
- [ ] Real-time notifications
- [ ] File upload and sharing
- [ ] Video conferencing integration
- [ ] Mobile app (React Native)
- [ ] Advanced analytics and reporting
- [ ] Integration with educational APIs
- [ ] Multi-language support

---

**ClassMods** - Empowering collaborative homeschooling through technology.
