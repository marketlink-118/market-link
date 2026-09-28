# MarketLink — Farmers Market Pre-Order Platform

MarketLink is an end-to-end full-stack web application designed and engineered for the **TechWiz 7** competition (**Category:** End-to-End Web Solutions, **Theme:** eGreen Basket).

The primary objective of MarketLink is to bridge local organic farmers directly with urban shoppers. By eliminating intermediary distributor markups and weekend market queue congestion, consumers can inspect scheduled weekend farmers markets, pre-order certified organic produce ahead of the weekly harvest, and collect their packed orders directly from the farmer's stall. All pre-orders are settled in cash upon stall collection (zero transaction gateway deductions for growers, 100% accessible to buyers).

---

## 🌐 24/7 Live Cloud Deployment

The entire full-stack platform is deployed, verified, and accessible live 24/7:

| Service | Hosting Infrastructure | Endpoint / Live URL |
| :--- | :--- | :--- |
| **Frontend Single Page App (SPA)** | Vercel Cloud Global Edge | [https://market-link-five.vercel.app](https://market-link-five.vercel.app) |
| **Backend RESTful API** | Alwaysdata Cloud (Linux / PHP 8.2) | [https://marketlink-api.alwaysdata.net/api](https://marketlink-api.alwaysdata.net/api) |
| **Production Database** | Alwaysdata MySQL Cloud Server | Host: `mysql-marketlink-api.alwaysdata.net` (DB: `marketlink-api_db`) |
| **Continuous Integration / CD** | GitHub Webhooks Auto-Deploy | Automated build & deploy pipeline triggered upon `git push origin main` |

---

## 🔑 Evaluation Test Accounts

Pre-configured accounts with populated historical orders, stall assignments, and product catalogs are available for evaluation:

| Role | Email | Password | Evaluation Scope & Capabilities |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `marketlink118@gmail.com` | `#marketlink118@` | Master KPIs, farmer stall approvals/suspensions, regional market scheduling, live blog & article CRUD |
| **Approved Farmer** | `tariq@punjabfarm.com` | `Password@123` | Inventory management, recurring stock templates, live order fulfillment, Haftawar Hisab ledger |
| **Pending Farmer** | `aslam@pendingfarm.com` | `Password@123` | Demonstrates pending verification state awaiting administrator credential review |
| **Customer** | `hamza@customer.com` | `Password@123` | Market discovery, catalog browsing, slot selection, digital QR pickup pass, re-order history |

---

## 🛠️ Technology Stack

### Frontend Architecture
- **Core Library:** React 18 with Vite for ultra-fast bundling and Hot Module Replacement (HMR)
- **Routing Engine:** React Router v6 with declarative role-based route guards (`/customer`, `/farmer`, `/admin`)
- **State Management:** Modular React Context API (`AuthContext`, `CartContext`, `OrderContext`, `LanguageContext`, `BlogContext`, `ThemeContext`)
- **Styling & Design System:** Bootstrap 5.3 + Custom CSS Architecture featuring modern floating cards (`border-radius: 18px`), frosted glass headers, and responsive media queries
- **Interactive Geospatial Maps:** Leaflet.js & OpenStreetMap with dynamic marker clustering and pan animations
- **Digital Token Passes:** `qrcode.react` for real-time QR code generation on pickup passes
- **Internationalization (i18n):** Native multi-language engine supporting English, Urdu (اردو), and Arabic (العربية) with dynamic LTR/RTL layout switching and web fonts (Cairo & Noto Nastaliq Urdu)

### Backend Architecture
- **Framework:** Laravel 11 running on PHP 8.2+
- **API Paradigm:** Pure RESTful JSON API with structured response wrappers (`success`, `data`, `message`, `errors`)
- **Authentication:** Laravel Sanctum token-based authentication + Google Identity Services (OAuth 2.0 via Socialite)
- **Email Dispatching:** Laravel Mail via TLS-encrypted SMTP for authentic 6-digit OTP delivery
- **Security & Integrity:** Bcrypt hashing (cost 12), math CAPTCHA challenge generator, parameterized SQL queries, CORS origin whitelisting

### Database Architecture
- **Engine:** MySQL 8.0+
- **ORM:** Eloquent ORM with defined foreign key constraints, polymorphic reviews, and cascade operations
- **Character Encoding:** `utf8mb4_unicode_ci` ensuring complete native rendering for Urdu, Arabic, and international emojis

---

## 📋 Comprehensive Functional Modules

### 1. Customer Pre-Order Workflow
* **Account Registration & Login:** Email/password credentials or 1-click Google OAuth 2.0 authentication.
* **Password Eye Toggle:** Interactive show/hide password buttons across login, registration, and reset views.
* **Weekly Market Discovery:** Filter physical open-air markets by scheduled operating day, city, and nearest distance.
* **Interactive Map Exploration:** OpenStreetMap visualization displaying verified market coordinates and participating growers.
* **Seasonal Produce Catalog:** Search items by category (Vegetables, Fruits, Dairy & Eggs, Honey & Herbs) and price range.
* **Product Detail Overviews:** Nutritional descriptions, stock counts, price per unit (kg, dozen, jar), and harvest timelines.
* **Pre-Order Slot Selection:** Customers specify their stall pickup window during checkout (e.g., `08:30 AM – 10:30 AM`).
* **Real-Time Cutoff Countdown:** Live ticker displaying hours, minutes, and seconds before pre-orders lock for field harvesting.
* **Digital QR Code Pickup Pass:** Instant QR token generated upon checkout, scannable by farmers for rapid in-stall verification.
* **Order Management & Cancellation:** Self-service order cancellation permitted prior to the farmer's harvesting cutoff.
* **One-Click Reorder:** Historical order records permit one-click re-ordering of past shopping baskets.
* **Market Help Desk:** Integrated floating assistant for instant guidance on stall pickup procedures and market timings.

### 2. Farmer Stall Management Workflow
* **Grower Stall Profile:** Configuration of farm name, assigned physical stall number, GPS coordinates, and market operating days.
* **Produce Inventory Management:** Complete CRUD controls for catalog items with images, units, pricing, and stock quotas.
* **Recurring Stock Templates:** One-click re-population of standard weekly harvest stock.
* **Quick Availability Toggle:** Instant toggle between "In Stock" and "Sold Out" states.
* **Order Queue & Fulfillment:** Step-by-step order processing (`placed` ➔ `accepted` ➔ `ready_for_pickup` ➔ `completed`).
* **Cutoff Window Settings:** Custom pre-order cutoff hours (e.g., 4 or 6 hours before market gates open).
* **Haftawar Hisab (Weekly Ledger):** Clean accounting view displaying completed orders and total cash collections with print and CSV export capabilities.
* **In-Stall Scale Adjustments:** Facility to amend final cash amounts if produce weights deviate slightly at the physical scale.

### 3. Administrator Master Control Portal
* **Platform KPIs:** Live metrics for total registered growers, pending applications, active markets, orders, and sales volume.
* **Farmer Moderation Workflow:** Inspect stall applications with the ability to Approve, Reject, or Suspend grower accounts.
* **Mandatory Removal Auditing:** Stall removal requires a recorded formal reason dispatched to the affected grower.
* **Regional Market Scheduling:** Create, update, and manage market hubs with coordinates, timings, and assigned stall capacities.
* **Live Article Counter:** Real-time indicator tracking active educational blog publications.

### 4. Role-Gated Blog & Article Management (Admin CRUD)
* **Role-Gated Security:** Read-only presentation for public visitors; automated management controls for authenticated administrators.
* **In-Place UI Controls:** Header button (`+ Publish New Article`) and card-level `Edit` / `Delete` triggers directly on the frontend.
* **Dedicated Management Table:** Integrated inside the Admin Portal with thumbnail previews, author badges, and publish dates.
* **Article Publishing Modal:** Title validation, excerpts, preset agricultural photos or custom image URLs, custom author naming, and date formatting.
* **Reactive Persistence:** Changes persist across sessions and browser refreshes via local storage integration.

### 5. Multi-Country Regional Hubs & Interactive Capital Maps
* **Regional Selector:** Dynamic switching across 5 international hubs: Pakistan, UAE, Saudi Arabia, UK, and USA.
* **Interactive Capital Mapping:** Leaflet map auto-pans to official capital city headquarters (Islamabad, Abu Dhabi, Riyadh, London, Washington, D.C.).
* **Footer Regional Badge:** Deep-linked headquarters badge in the footer routing directly to regional contact centers.

### 6. Essential Privacy & Cookie Consent Compliance
* **Compliance Dialog:** First-time authentication popup for Farmers and Customers requesting essential cookie consent.
* **Audit Logging:** Saves user consent status with an ISO timestamp both locally and to the backend database (`POST /api/cookie-consent`).

### 7. Cash on Stall Collection (Core SRS Rule)
* As mandated in the TechWiz specification (Page 8), all orders are finalized via cash payment directly at the market stall during collection. This avoids transaction fees for grassroots farmers and guarantees barrier-free checkout.

---

## 📂 Project Structure & Codebase Map

```text
market-link full stack/
│
├── frontend/                               # React 18 + Vite Frontend Application
│   ├── public/                             # Static public assets (logos, preset farm images, favicon)
│   │   ├── css/style.css                   # Custom global CSS styles and theme rules
│   │   └── img/                            # Bundled farm produce and blog media assets
│   │
│   ├── src/
│   │   ├── components/                     # Reusable UI Components
│   │   │   ├── Navbar.jsx                  # Main header with single-line controls, brand, and navigation
│   │   │   ├── Footer.jsx                  # Footer with regional headquarters badge & newsletter
│   │   │   ├── CutoffBanner.jsx            # Dynamic pre-order countdown ticker & basket CTA
│   │   │   ├── BlogSection.jsx             # Article cards with role-gated admin edit/delete controls
│   │   │   ├── BlogModal.jsx               # Modal dialog for creating and editing articles
│   │   │   ├── ProductCard.jsx             # Produce cards with floating design and freshness indicators
│   │   │   ├── ProductDetailModal.jsx      # Modal showing detailed item specs and harvest info
│   │   │   ├── CartDrawer.jsx              # Off-canvas sliding basket drawer for pre-orders
│   │   │   ├── PickupPassModal.jsx         # Digital QR code pickup pass generator
│   │   │   ├── MarketsMap.jsx              # Leaflet / OpenStreetMap interactive market hub viewer
│   │   │   ├── AuthModal.jsx               # Universal modal for Sign In, Registration & OTP Reset
│   │   │   ├── CookieConsentModal.jsx      # Privacy compliance modal for authenticated sessions
│   │   │   ├── MarketSupportDesk.jsx       # Floating chat concierge for customer support
│   │   │   ├── LanguageSelector.jsx        # 3-in-1 Country, Language, and Currency switcher
│   │   │   ├── ThemeToggle.jsx             # Light and Dark theme switch
│   │   │   └── PageHeader.jsx              # Universal page banner with breadcrumb navigation
│   │   │
│   │   ├── context/                        # Global State Management Providers
│   │   │   ├── AuthContext.jsx             # User authentication, Sanctum token, and role permissions
│   │   │   ├── CartContext.jsx             # Pre-order basket state, items count, and slot selection
│   │   │   ├── OrderContext.jsx            # Order lifecycle management and tracking
│   │   │   ├── LanguageContext.jsx         # i18n localization, currency formatting, and RTL/LTR state
│   │   │   ├── BlogContext.jsx             # Reactive state management and persistence for articles
│   │   │   ├── ThemeContext.jsx            # Light and Dark mode theme state
│   │   │   └── translations.js             # Dictionaries for English, Urdu, and Arabic
│   │   │
│   │   ├── pages/                          # Application Route Views
│   │   │   ├── HomePage.jsx                # Landing page with hero carousel, features, produce & blogs
│   │   │   ├── MarketsPage.jsx             # Weekend market hub directory and interactive map
│   │   │   ├── ProductsPage.jsx            # Full produce catalog with category and price filters
│   │   │   ├── CustomerDashboard.jsx       # Customer profile, active orders, and QR passes
│   │   │   ├── FarmerDashboard.jsx         # Farmer inventory, order fulfillment, and Haftawar Hisab
│   │   │   ├── AdminDashboard.jsx          # Admin master portal (KPIs, stalls, markets, blog CRUD)
│   │   │   ├── ContactPage.jsx             # Contact form and dynamic capital headquarters map
│   │   │   ├── BlogPage.jsx                # Full-width educational article grid
│   │   │   ├── AboutPage.jsx               # Mission statement, farming principles, and team details
│   │   │   ├── LoginPage.jsx               # Standalone login view with password visibility toggle
│   │   │   └── RegisterPage.jsx            # Standalone registration view with role selection
│   │   │
│   │   ├── services/                       # Network and External Services
│   │   │   ├── api.js                      # RESTful API client with automated production/dev switching
│   │   │   └── conciergeService.js         # FAQ logic for the Market Support Desk assistant
│   │   │
│   │   ├── data/                           # Mock datasets and configuration constants
│   │   │   ├── products.js                 # Default organic produce catalog
│   │   │   ├── marketsData.js              # Weekly farmers market schedules and GPS coordinates
│   │   │   ├── farmersData.js              # Registered grower profiles and stall information
│   │   │   ├── headquartersData.js         # Capital city office addresses and hotline configurations
│   │   │   └── ordersData.js               # Initial sample pre-orders for demonstration
│   │   │
│   │   ├── App.jsx                         # Top-level route switch and global layout wrapper
│   │   └── main.jsx                        # React DOM mounting entry point with context providers
│   │
│   ├── package.json                        # Frontend NPM dependencies and scripts
│   ├── vite.config.js                      # Vite build configuration
│   └── vercel.json                         # SPA routing rules for Vercel deployment
│
├── backend/                                # Laravel 11 REST API Application
│   ├── app/
│   │   ├── Http/Controllers/Api/           # API Endpoint Controllers
│   │   │   ├── AuthController.php          # Login, Register, Logout, and OTP Password Reset
│   │   │   ├── GoogleAuthController.php    # Google OAuth 2.0 social authentication
│   │   │   ├── MarketController.php        # Regional market listings and geolocation queries
│   │   │   ├── ProductController.php       # Produce catalog endpoints with category filters
│   │   │   ├── CaptchaController.php       # Dynamic anti-automation math challenge generator
│   │   │   ├── CookieConsentController.php # Essential cookie consent audit logging
│   │   │   ├── Admin/                      # Administrator Controllers
│   │   │   │   └── AdminController.php     # Master KPIs, farmer moderation, and market scheduling
│   │   │   ├── Farmer/                     # Farmer Controllers
│   │   │   │   ├── ProductController.php   # Grower product CRUD and stock toggles
│   │   │   │   ├── OrderController.php     # Order queue management and fulfillment updates
│   │   │   │   └── InsightsController.php  # Sales summaries and Haftawar Hisab reporting
│   │   │   └── Customer/                   # Customer Controllers
│   │   │       ├── CartController.php      # Persistent user cart synchronization
│   │   │       └── OrderController.php     # Order placement and cancellation handling
│   │   │
│   │   ├── Models/                         # Eloquent ORM Data Models
│   │   │   ├── User.php                    # User identity model with role discrimination
│   │   │   ├── FarmerProfile.php           # Farm identity, stall allocation, and operating days
│   │   │   ├── Market.php                  # Market venue, city, timings, and coordinates
│   │   │   ├── Product.php                 # Catalog item, stock count, and price per unit
│   │   │   ├── Order.php                   # Pre-order record with status and pickup slot
│   │   │   ├── OrderItem.php               # Order line item with snapshot quantity and price
│   │   │   └── Review.php                  # Farmer and product ratings with moderation status
│   │   │
│   │   └── Http/Middleware/
│   │       └── RoleMiddleware.php          # Strict role-based endpoint authorization guard
│   │
│   ├── database/
│   │   ├── migrations/                     # MySQL database schema migrations
│   │   └── seeders/                        # Database seeders with realistic demo records
│   │
│   ├── routes/api.php                      # Declarative REST API endpoint definitions
│   ├── public/deploy_hook.php              # Automated GitHub webhook synchronization script
│   ├── marketlink_database.sql             # Complete UTF-8 production database dump
│   └── composer.json                       # Backend PHP dependencies and scripts
│
├── RUN_MARKETLINK.bat                      # Windows 1-Click Launch Script (Local Dev)
├── .gitignore                              # Git exclusion rules protecting sensitive secrets
└── README.md                               # Project documentation and submission reference
```

---

## 🚀 Running the Project Locally (Windows)

### Prerequisites
* **PHP:** Version 8.2 or higher
* **Composer:** Installed and configured in PATH
* **Node.js:** Version 18 or higher (with npm)
* **MySQL Database:** Running locally on port `3306` (e.g., via XAMPP or native MySQL)

---

### Option 1: 1-Click Automated Launch (Recommended)
1. Ensure your local MySQL server is started on port `3306`.
2. Double-click the **`RUN_MARKETLINK.bat`** script in the project root directory.
3. The script will automatically launch:
   - Backend API server at `http://127.0.0.1:8000`
   - Frontend application at `http://localhost:3000`
4. Your default browser will navigate to `http://localhost:3000`.

---

### Option 2: Manual Step-by-Step Setup

#### Step 1: Database Setup
1. Open phpMyAdmin (`http://localhost/phpmyadmin`) or your MySQL client.
2. Create a new database named: `marketlink_db`.
3. Import the file located at: `backend/marketlink_database.sql`.

#### Step 2: Backend Configuration & Launch
```bash
cd backend
composer install
copy .env.example .env
php artisan key:generate
php artisan serve --port=8000
```
*The REST API will be running at `http://127.0.0.1:8000`.*

#### Step 3: Frontend Configuration & Launch
```bash
cd frontend
npm install
npm run dev
```
*The web application will be accessible at `http://localhost:3000`.*

---

## 🔒 Security & Quality Standards

* **Credential Protection:** All sensitive API keys, database credentials, and mail passwords are isolated in `.env` files and prevented from version control via `.gitignore`.
* **Cryptographic Standards:** User passwords are encrypted using Bcrypt hashing with a cost factor of 12.
* **OTP Confidentiality:** 6-digit password recovery tokens are dispatched via encrypted SMTP, expire after 15 minutes, and are never exposed in client-side responses.
* **Input Sanitization:** Parameterized SQL queries via Eloquent ORM prevent SQL injection vulnerabilities. Cross-Site Scripting (XSS) is mitigated through React's native JSX escaping.
* **Role Enforcement:** All sensitive administrative and farmer endpoints are gated by Sanctum bearer token verification and `RoleMiddleware` enforcement.

---

*Submitted for **TechWiz 7** — MarketLink: Connecting Communities to Fresh, Sustainable Agriculture.*
