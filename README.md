# 🌞 SunCart – Summer Essentials Store

A modern summer-themed eCommerce web application built with **Next.js**, where users can explore and purchase seasonal products like sunglasses, summer outfits, skincare, beach accessories, and more.

## 🌐 Live URL

🔗 [https://sun-cart-8l8y.vercel.app](https://sun-cart-8l8y.vercel.app)

---

## 🎯 Purpose

SunCart is a summer eCommerce platform that allows users to browse seasonal products, view detailed product pages, and place orders — all after secure authentication. The platform features Google OAuth and email/password login powered by BetterAuth.

---

## ✨ Key Features

- 🔐 **User Authentication** — Email/password login & Google OAuth via `better-auth`
- 🛍️ **Product Listing** — Browse summer products with name, rating, price & image
- 🔒 **Protected Product Details** — Only accessible after login; redirects back after auth
- 🛒 **Shopping Cart** — Add and manage cart items
- 👤 **My Profile** — View logged-in user's name, email, and photo
- ✏️ **Update Profile** — Update display name and profile picture
- 🌅 **Hero Section** — Summer sale banner with offers and hot deals
- 💡 **Summer Care Tips** — Skincare and hydration tips section
- 🏷️ **Top Brands** — Static brand showcase section
- 📱 **Fully Responsive** — Mobile, tablet, and desktop support
- 🔒 **Environment Variables** — All sensitive keys secured via `.env.local`

---

## 🛠️ Tech Stack & NPM Packages

### Framework & Core
| Package | Purpose |
|---------|---------|
| `next` | React framework with App Router |
| `react` | UI library |
| `react-dom` | DOM rendering |

### Authentication
| Package | Purpose |
|---------|---------|
| `better-auth` | Full-stack auth (email + Google OAuth) |

### Database
| Package | Purpose |
|---------|---------|
| `mongodb` | MongoDB driver |

### Styling & UI
| Package | Purpose |
|---------|---------|
| `tailwindcss` | Utility-first CSS framework |
| `daisyui` | Tailwind component library |

### Animations (Bonus)
| Package | Purpose |
|---------|---------|
| `animate.css` | CSS animation library |

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

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGO_URI=your-mongodb-connection-string
BETTER_AUTH_URL=https://sun-cart-8l8y.vercel.app
BETTER_AUTH_SECRET=your-minimum-32-character-secret
Google_Client_Id=your-google-oauth-client-id
Google_Client_Secret=your-google-oauth-client-secret
NEXT_PUBLIC_APP_URL=https://sun-cart-8l8y.vercel.app
```

---

## 🚀 Getting Started

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

---

## 📦 Sample Product Data Format

```json
[
  {
    "id": 1,
    "name": "UV Protection Sunglasses",
    "brand": "SunShade",
    "price": 15,
    "rating": 4.7,
    "stock": 10,
    "description": "Stylish UV protection sunglasses perfect for summer outings.",
    "image": "https://i.postimg.cc/example1.png",
    "category": "Accessories"
  }
]
```

---

## 🚢 Deployment

Deployed on **Vercel**. To deploy your own:

1. Push code to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Add all environment variables in **Vercel Dashboard → Settings → Environment Variables**
4. Deploy!

> ⚠️ Make sure `BETTER_AUTH_URL` is set to your **production URL** on Vercel.

---

## 👨‍💻 Author

**Saikot** — [GitHub](https://github.com/saikot05)