# LinkUp Marketplace

A comprehensive student marketplace platform built for Covenant University students to buy and sell services, products, and skills.

## Features

- 🔐 **Authentication**: Secure login/signup system
- 🛒 **Service Marketplace**: Browse, buy, and sell student services
- ⭐ **Rating System**: Rate and review services
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS
- 🖼️ **Image Upload**: Cloudinary integration for service images
- 📊 **Dashboard**: Manage your services and account
- 🔍 **SEO Optimized**: Meta tags and structured content

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Airtable
- **Authentication**: NextAuth.js
- **Image Storage**: Cloudinary
- **State Management**: Zustand

## Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Airtable account with Personal Access Token
- Cloudinary account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/IjehJoel987/linkupmarket.git
cd linkupmarket
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your actual values:
```env
# Airtable
AIRTABLE_PAT=your_airtable_personal_access_token
AIRTABLE_BASE_ID=your_airtable_base_id
AIRTABLE_TABLE_NAME=User table
AIRTABLE_SERVICES_TABLE=Talent

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # User dashboard
│   ├── login/            # Login page
│   ├── signup/           # Signup page
│   └── services/         # Service detail pages
├── components/           # Reusable components
├── lib/                  # Utility functions
└── public/              # Static assets
```

## API Routes

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/services` - Get all services
- `POST /api/services/create` - Create new service
- `GET /api/services/[id]` - Get service details
- `PUT /api/services/[id]` - Update service
- `DELETE /api/services/[id]` - Delete service

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please open an issue on GitHub.
