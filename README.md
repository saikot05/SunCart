<div align="center">

# 🌞 SunCart — Summer Essentials Store

### Modern summer-themed eCommerce platform with secure authentication

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-SunCart-FF6B35?style=for-the-badge)](https://sun-cart-8l8y.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/saikot05/sun-cart)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=flat-square&logo=daisyui&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

</div>

---

## 📖 About

SunCart is a modern summer-themed eCommerce web application built with **Next.js (App Router)**, where users can explore and purchase seasonal products like sunglasses, summer outfits, skincare, beach accessories, and more.

The platform features secure authentication (Google OAuth + Email/Password via BetterAuth), protected product routes, shopping cart management, and a fully responsive glassmorphic UI.

---

## 🌐 Live Demo

🔗 **[https://sun-cart-8l8y.vercel.app](https://sun-cart-8l8y.vercel.app)**

---



## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🔐 **Secure Authentication** | Email/password login & Google OAuth via `better-auth` |
| 🛍️ **Product Listing** | Browse summer products with name, rating, price & image |
| 🔒 **Protected Routes** | Product details only accessible after login; auto-redirect after auth |
| 🛒 **Shopping Cart** | Add, update, and manage cart items |
| 👤 **User Profile** | View logged-in user's name, email, and avatar |
| ✏️ **Update Profile** | Update display name and profile picture |
| 🌅 **Hero Section** | Summer sale banner with offers and hot deals |
| 💡 **Summer Care Tips** | Skincare and hydration tips section |
| 🏷️ **Top Brands** | Brand showcase section |
| 📱 **Fully Responsive** | Mobile, tablet, and desktop optimized |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js** (App Router) | Core React framework |
| **React.js** | UI component library |
| **Tailwind CSS** | Utility-first styling |
| **DaisyUI** | Component library |
| **Animate.css** | CSS animations |

### Backend & Database
| Technology | Purpose |
|------------|---------|
| **MongoDB** | Product & user data storage |
| **Better Auth** | Full-stack auth (Email + Google OAuth) |

### Deployment
| Technology | Purpose |
|------------|---------|
| **Vercel** | Production deployment & hosting |

---

## 🚀 Local Setup

### Prerequisites
- Node.js `v18+`
- MongoDB Atlas URI
- Google OAuth 2.0 credentials

### Installation

```bash
# Clone the repository
git clone https://github.com/saikot05/sun-cart.git
cd sun-cart

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGO_URI=your-mongodb-connection-string
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-minimum-32-character-secret
Google_Client_Id=your-google-oauth-client-id
Google_Client_Secret=your-google-oauth-client-secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> ⚠️ For production, set `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to your Vercel deployment URL.

---

## 📁 Project Structure

```
sun-cart/
├── app/
│   ├── api/
│   │   └── auth/              # BetterAuth API routes
│   ├── (auth)/
│   │   ├── login/             # Login page
│   │   └── register/          # Register page
│   ├── products/
│   │   └── [id]/              # Protected product details page
│   ├── my-profile/            # User profile page
│   │   └── update/            # Update profile form
│   ├── layout.js              # Root layout (Navbar + Footer)
│   └── page.js                # Home page
├── lib/
│   ├── auth.js                # BetterAuth server config
│   └── authClient.js          # BetterAuth client config
├── data/
│   └── products.json          # Static summer products data
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── ProductCard.jsx
├── .env.local
└── README.md
```

---

## 📦 Sample Product Data Format

```json
{
  "id": 1,
  "name": "UV Protection Sunglasses",
  "brand": "SunShade",
  "price": 15,
  "rating": 4.7,
  "stock": 10,
  "description": "Stylish UV protection sunglasses perfect for summer outings.",
  "image": "https://i.postimg.cc/example.png",
  "category": "Accessories"
}
```

---

## ✅ Feature Checklist

```
✅ Google OAuth 2.0 + Email/Password Authentication
✅ BetterAuth full-stack auth integration
✅ Protected product detail routes
✅ Auto-redirect to product after login
✅ Shopping cart management
✅ User profile view & update
✅ MongoDB data persistence
✅ Fully responsive — mobile, tablet, desktop
✅ Environment variable security
✅ Deployed on Vercel
```

---

## 🚢 Deployment Guide

1. Push code to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Add all environment variables in **Vercel Dashboard → Settings → Environment Variables**
4. Set `BETTER_AUTH_URL` to your **production Vercel URL**
5. Deploy! 🚀

---

## 👤 Author

**Saikot** — Full Stack Developer

[![GitHub](https://img.shields.io/badge/GitHub-saikot05-181717?style=flat-square&logo=github)](https://github.com/saikot05)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/yourprofile)

---

<div align="center">

⭐ **Star this repo if you found it useful!** ⭐

*Built with ☀️ for summer lovers everywhere*

</div>
