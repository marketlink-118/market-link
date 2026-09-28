# MarketLink — Farmers Market Pre-Order Platform

MarketLink is a full-stack web application built for the **TechWiz 7** competition (**Category:** End-to-End Web Solutions, **Theme:** eGreen Basket).

The main idea of the project is to connect local farmers with nearby urban shoppers. Instead of buying through multiple layers of middlemen or standing in crowded queues at weekend farmers markets, customers can check market schedules, pre-order fresh organic produce before the weekly harvest, and pick up their packed orders directly at the farmer's stall. Pre-orders are settled in cash during stall collection, ensuring zero online gateway fees for small-scale growers and full accessibility for local buyers.

---

## 🌐 Live Cloud Deployment (24/7 Available)

The complete full-stack system is deployed and operational in production:

| Service | Hosting Provider | Live URL / Details |
| :--- | :--- | :--- |
| **Frontend SPA** | Vercel Cloud | [https://market-link-five.vercel.app](https://market-link-five.vercel.app) |
| **Backend REST API** | Alwaysdata Cloud | [https://marketlink-api.alwaysdata.net/api](https://marketlink-api.alwaysdata.net/api) |
| **Database** | Alwaysdata MySQL Cloud | `mysql-marketlink-api.alwaysdata.net` (`marketlink-api_db`) |
| **CI/CD Pipeline** | GitHub Webhooks | Instant auto-deploy to Vercel & Alwaysdata on `git push` |

---

## Tech Stack

### Frontend
- **Framework:** React 18 (with Vite)
- **Routing:** React Router v6 (with role-based protected routes for Customer, Farmer, and Admin)
- **State Management:** React Context API (`AuthContext`, `CartContext`, `OrderContext`, `LanguageContext`)
- **Styling:** Bootstrap 5.3 + Custom CSS (Fully responsive for desktop, tablet, and mobile)
- **Maps:** Leaflet.js & OpenStreetMap (Interactive map showing market locations and stall markers)
- **QR Code:** `qrcode.react` (Generates digital pickup pass tokens for stall collection)
- **Internationalization:** Multi-language engine supporting English, Urdu (اردو), and Arabic (العربية) with dynamic LTR / RTL layout switching

### Backend
- **Framework:** Laravel 11 (PHP 8.2+)
- **Architecture:** RESTful API (Structured JSON responses)
- **Authentication:** Laravel Sanctum (Token-based authentication) + Google OAuth 2.0 (Laravel Socialite)
- **Mailing:** Laravel Mail via Gmail SMTP (Sends real 6-digit OTP for secure password recovery)
- **Security:** Bcrypt password hashing, strong password validation rules, anti-automation captcha

### Database
- **Database:** MySQL
- **ORM:** Eloquent ORM
- **Collation:** `utf8mb4_unicode_ci` (Full native support for English, Urdu Nastaliq, and Arabic text)

---

## Core Features (SRS Requirements)

The application fulfills all the core requirements outlined in the TechWiz SRS:

### 1. Customer Module
- **Account Registration & Login:** Sign-up with name, email, phone number, address, and country selection.
- **Password Visibility Toggle (Eye 👁️):** One-click show/hide toggle across Login, Sign Up, and Password Reset forms.
- **Weekly Market Discovery:** Browse physical weekend markets by city and scheduled market day (Saturday, Sunday).
- **Interactive Map:** View market locations on an OpenStreetMap map with pins for attending farmers.
- **Product Catalog & Filters:** Search produce and filter by category (Vegetables, Fruits, Dairy, Herbs, Honey) and price.
- **Product Details:** Shows price per unit (kg, dozen, jar, bundle), available stock quantity, farm name, and harvest cutoff info.
- **Pre-Order & Pickup Window:** Add items to cart and select a convenient pickup time slot (e.g., 08:30 AM – 10:30 AM).
- **Harvest Cutoff Timer:** Live countdown showing time remaining before pre-orders close for harvesting.
- **Order Status Tracking:** Real-time tracking through stages: `placed` -> `accepted` -> `ready_for_pickup` -> `completed` / `cancelled`.
- **Cancel Pre-Orders:** Customers can cancel an order as long as it is before the farmer's cutoff deadline.
- **Order History & 1-Click Reorder:** View past purchases and reorder previous grocery baskets easily.
- **Favorites:** Save favorite farms and produce for quick access.
- **Ratings & Reviews:** Rate completed orders (1 to 5 stars) and write feedback.
- **Market Help Desk:** Built-in chat assistant to answer common questions about market timings, stall locations, and pickup rules.
- **About Us & Contact Us:** Team information, contact form, and office location.

### 2. Farmer Module
- **Farmer Profile & Stall Setup:** Register farm name, assigned stall number, location coordinates, operating days, and pickup hours.
- **Product Management:** Full add, edit, and delete controls for produce with title, category, price, unit, stock count, and images.
- **Recurring Stock Templates:** Save standard weekly inventory as a template and reload it each week with one click.
- **Stock Availability Toggle:** Quickly toggle items between "In Stock" and "Sold Out" without deleting them.
- **Order Queue & Fulfillment:** Manage incoming customer pre-orders with options to Accept, Mark Ready for Pickup, Complete, or Decline.
- **Custom Cutoff Window:** Configure cutoff time (e.g., 4 or 6 hours before market starts) to lock pre-orders in time for harvest.
- **Sales Overview:** Summary showing total orders, pending pickups, and revenue earned.
- **Review Replies:** Read customer reviews and reply directly.

### 3. Admin Module
- **Admin Dashboard:** Overview of total registered customers, verified farmers, active markets, and total orders placed.
- **Farmer Approval System:** Review new farmer registrations and Approve, Reject, or Suspend accounts.
- **Customer Management:** View customer list and manage account statuses.
- **Market Management:** Add new weekly markets with city, address, operating days, and map coordinates.
- **Category & Content Moderation:** Manage master produce categories and monitor reviews.

### 4. Cash on Pickup (SRS Rule)
- All pre-orders are paid in cash in person when collected at the stall (as specified on Page 8 of the TechWiz SRS). This eliminates online payment gateway deductions for small farmers and keeps checkout accessible to everyone.

---

## Extra Features (Beyond SRS)

To make the platform more practical for real-world usage, we also built several additional features:

1. **Multi-Country Support (Pakistan, Saudi Arabia, UAE):**  
   Users can switch between Pakistan, Saudi Arabia, and UAE. The platform dynamically filters the cities, markets, and vendors based on the selected country.

2. **Multi-Currency Display (PKR, SAR, AED):**  
   Prices automatically display in the local currency according to the selected country (PKR for Pakistan, SAR for Saudi Arabia, AED for UAE).

3. **Multi-Language Support with Full RTL Layout:**  
   The entire UI can be toggled between English, Urdu (اردو), and Arabic (العربية). When Urdu or Arabic is selected, the layout automatically switches to Right-to-Left (RTL) mode with Cairo and Noto Nastaliq Urdu typography.

4. **Password Visibility (Eye Toggle 👁️):**  
   Independent view/hide password buttons on Login, Registration (Password & Confirm Password), and Password Reset forms.

5. **Google Sign-In (OAuth 2.0):**  
   One-click authentication using real Google accounts via Google Identity Services and Laravel Socialite.

6. **Haftawar Hisab (Weekly Statement) with Print & Export:**  
   Farmers have a weekly ledger view of all their orders and cash collected, with buttons to print the receipt directly or export to CSV / Excel.

7. **In-Stall Cash Adjustment:**  
   During pickup, farmers can adjust and save the exact cash received if produce weight changes slightly at the scale.

8. **Email OTP for Password Reset:**  
   Forgot Password sends a real 6-digit OTP code to the user's email via Gmail SMTP. The code expires in 15 minutes and is never exposed in the browser.

9. **Digital QR Code Pickup Pass:**  
   Customers get a QR code pass for each order on their phone screen. Farmers can scan or check the token at the stall to confirm the pickup quickly.

10. **Dark Mode / Light Mode:**  
    Built-in dark mode toggle for comfortable night-time browsing.

---

## Project Structure

```text
market-link full stack/
├── frontend/                     # React 18 + Vite application
│   ├── public/                   # Static assets, bundled images, icons
│   ├── src/
│   │   ├── components/           # Navbar, Footer, AuthModal, MarketMap, QR Pass, ChatBot
│   │   ├── contexts/             # AuthContext, CartContext, LanguageContext, OrderContext
│   │   ├── pages/                # Home, Markets, Products, Cart, Orders, FarmerDashboard, AdminDashboard
│   │   ├── services/api.js       # Live REST API client with auto production / dev switching
│   │   ├── App.jsx               # Route definitions
│   │   └── main.jsx              # React entry point
│   ├── package.json
│   ├── vercel.json               # SPA routing configuration
│   └── vite.config.js
│
├── backend/                      # Laravel 11 REST API
│   ├── app/
│   │   ├── Http/Controllers/Api/ # Auth, Market, Product, Order, Farmer, Admin controllers
│   │   └── Models/               # User, FarmerProfile, Market, Product, Order, Review models
│   ├── database/
│   │   ├── migrations/           # MySQL table schemas
│   │   └── seeders/              # Seeders with realistic market data
│   ├── routes/api.php            # RESTful API endpoints
│   ├── public/deploy_hook.php    # Automated CI/CD Webhook deploy script
│   ├── marketlink_database.sql   # Clean UTF-8 MySQL database export
│   └── composer.json
│
├── RUN_MARKETLINK.bat            # Windows 1-click local launch script
├── .gitignore                    # Protects .env, node_modules, vendor
└── README.md
```

---

## Test Accounts

The system comes pre-configured with accounts ready for evaluation:

| Role | Email | Password | What You Can Test |
| :--- | :--- | :--- | :--- |
| **System Admin** | `marketlink118@gmail.com` | `#marketlink118@` | Admin Control Panel, review/approve farmer stalls, monitor platform revenue, manage markets |
| **Approved Farmer** | `tariq@punjabfarm.com` | `Password@123` | Managing produce inventory, recurring stock templates, incoming order queue, Haftawar Hisab |
| **Pending Farmer** | `aslam@pendingfarm.com` | `Password@123` | Demonstrates pending verification screen until approved by Admin |
| **Customer** | `hamza@customer.com` | `Password@123` | Browsing markets, adding produce to cart, selecting pickup slots, QR pickup pass, order history |

---

## How to Run Locally (Windows)

### Prerequisites
- PHP 8.2 or higher
- Composer
- Node.js 18 or higher & npm
- MySQL running on port 3306 (via XAMPP or native MySQL)

---

### Option 1: 1-Click Launch (Recommended)
1. Make sure MySQL is running in XAMPP (port 3306).
2. Double-click **`RUN_MARKETLINK.bat`** in the root folder.
3. This opens both the backend (`http://127.0.0.1:8000`) and the frontend (`http://localhost:3000`) automatically in separate command windows.
4. Open `http://localhost:3000` in your browser.

---

### Option 2: Manual Setup

#### 1. Setup MySQL Database:
- Open phpMyAdmin (`http://localhost/phpmyadmin`).
- Create a database named `marketlink_db`.
- Import the file `backend/marketlink_database.sql` into it.

#### 2. Start the Backend:
```bash
cd backend
composer install
copy .env.example .env
php artisan key:generate
php artisan serve --port=8000
```
Backend API will run at `http://127.0.0.1:8000`.

#### 3. Start the Frontend:
```bash
cd frontend
npm install
npm run dev
```
Frontend will run at `http://localhost:3000`.

---

## Security & Privacy
- Sensitive `.env` files containing database passwords and mail secrets are protected by `.gitignore` and never committed to version control.
- A standardized `.env.example` template is provided for clean environment provisioning.
- Passwords are encrypted using Bcrypt with 12 rounds.
- Real 6-digit OTP codes are dispatched directly to the user's verified mailbox via TLS-encrypted SMTP and expire after 15 minutes.
