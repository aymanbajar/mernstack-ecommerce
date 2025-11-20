# 🛍️ MERN Stack E-Commerce Platform

[English](#english) | [العربية](#arabic) | [Türkçe](#turkish)

---

<a name="english"></a>
## 🇬🇧 English

### 📖 Overview
A full-stack e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js). This modern application provides a complete shopping experience with user authentication, product management, shopping cart, and order processing.

### ✨ Features

#### 🔐 User Management
- User registration and login
- JWT-based authentication
- Password encryption with bcrypt
- User profile management
- Order history tracking

#### 🛒 Shopping Features
- Product browsing and search
- Product categories and filtering
- Shopping cart functionality
- Add, update, and remove items from cart
- Real-time cart updates
- Checkout process with shipping information

#### 📦 Order Management
- Order creation and tracking
- Order history for users
- Order status updates (Processing, Shipped, Delivered)
- Shipping address management

#### 🎨 Modern UI/UX
- Responsive design for all devices
- Multi-language support (English, Arabic, Turkish)
- RTL support for Arabic
- Beautiful gradient designs (Purple to Pink theme)
- Smooth animations and transitions
- Interactive product cards
- Toast notifications for user feedback

### 🛠️ Technology Stack

#### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React i18next** - Internationalization
- **Axios** - HTTP client
- **React Icons** - Icon library

#### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

### 📁 Project Structure

```
MernStack-ecommerce/
├── backend/
│   ├── src/
│   │   ├── index.ts           # Entry point
│   │   ├── models/            # Database models
│   │   ├── routes/            # API routes
│   │   ├── controllers/       # Business logic
│   │   └── middleware/        # Auth & validation
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── components/        # Reusable components
    │   │   ├── Navbar.tsx
    │   │   ├── Footer.tsx
    │   │   └── ProductCard.tsx
    │   ├── pages/            # Page components
    │   │   ├── HomePage.tsx
    │   │   ├── ShopPage.tsx
    │   │   ├── CartPage.tsx
    │   │   ├── CheckoutPage.tsx
    │   │   ├── MyOrderPage.tsx
    │   │   ├── LoginPage.tsx
    │   │   └── RegisterPage.tsx
    │   ├── contexts/         # React Context
    │   │   ├── Auth/
    │   │   └── Cart/
    │   ├── types/            # TypeScript types
    │   └── i18/              # Translations
    ├── package.json
    └── vite.config.ts
```

### 🚀 Installation & Setup

#### Prerequisites
- Node.js (v22.20.0 or higher)
- MongoDB (local or Atlas)
- npm or yarn

#### Backend Setup
```bash
cd backend
npm install
npm run dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 🔧 Environment Variables

#### Backend (.env)
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

#### Frontend
```typescript
// src/constants/BASE_URL.ts
export const BASE_URL = "http://localhost:5000/api";
```

### 📱 Pages Overview

- **Home** - Landing page with featured products
- **Shop** - Browse all products with filters
- **Product Details** - Detailed product information
- **Cart** - Shopping cart management
- **Checkout** - Complete purchase with shipping info
- **Orders** - View order history
- **Login/Register** - User authentication
- **Settings** - User profile settings

### 🎯 API Endpoints

#### Authentication
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login
- `PUT /api/user/update` - Update profile

#### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

#### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items` - Update item quantity
- `DELETE /api/cart/items/:id` - Remove item from cart
- `DELETE /api/cart` - Clear cart

#### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders

### 🌐 Internationalization
The application supports three languages:
- English (en)
- Arabic (ar) with RTL support
- Turkish (tr)

### 🎨 Design Features
- Modern gradient color scheme (Purple to Pink)
- Glassmorphism effects
- Smooth hover animations
- Responsive grid layouts
- Beautiful card designs
- Interactive buttons with transform effects

### 👥 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

### 📄 License
This project is open source and available under the MIT License.

---

<a name="arabic"></a>
## 🇸🇦 العربية

### 📖 نظرة عامة
منصة تجارة إلكترونية متكاملة مبنية باستخدام MERN Stack (MongoDB, Express.js, React, Node.js). يوفر هذا التطبيق الحديث تجربة تسوق كاملة مع مصادقة المستخدم، إدارة المنتجات، عربة التسوق، ومعالجة الطلبات.

### ✨ المميزات

#### 🔐 إدارة المستخدمين
- تسجيل المستخدمين وتسجيل الدخول
- المصادقة بواسطة JWT
- تشفير كلمات المرور باستخدام bcrypt
- إدارة الملف الشخصي
- تتبع سجل الطلبات

#### 🛒 ميزات التسوق
- تصفح المنتجات والبحث
- فئات المنتجات والتصفية
- وظيفة عربة التسوق
- إضافة وتحديث وإزالة العناصر من العربة
- تحديثات فورية للعربة
- عملية الدفع مع معلومات الشحن

#### 📦 إدارة الطلبات
- إنشاء الطلبات وتتبعها
- سجل الطلبات للمستخدمين
- تحديثات حالة الطلب (قيد المعالجة، تم الشحن، تم التسليم)
- إدارة عناوين الشحن

#### 🎨 واجهة مستخدم حديثة
- تصميم متجاوب لجميع الأجهزة
- دعم متعدد اللغات (الإنجليزية، العربية، التركية)
- دعم RTL للغة العربية
- تصاميم جميلة بألوان متدرجة (من البنفسجي إلى الوردي)
- حركات انتقالية سلسة
- بطاقات منتجات تفاعلية
- إشعارات للمستخدم

### 🛠️ التقنيات المستخدمة

#### الواجهة الأمامية
- **React 19** - مكتبة واجهة المستخدم
- **TypeScript** - أمان الأنواع
- **Vite** - أداة البناء وخادم التطوير
- **Tailwind CSS 4** - إطار عمل CSS
- **React Router** - التوجيه من جانب العميل
- **React i18next** - الترجمة
- **Axios** - عميل HTTP
- **React Icons** - مكتبة الأيقونات

#### الواجهة الخلفية
- **Node.js** - بيئة التشغيل
- **Express.js** - إطار عمل الويب
- **TypeScript** - أمان الأنواع
- **MongoDB** - قاعدة البيانات
- **Mongoose** - ODM لـ MongoDB
- **JWT** - رموز المصادقة
- **bcrypt** - تجزئة كلمات المرور

### 🚀 التثبيت والإعداد

#### المتطلبات الأساسية
- Node.js (الإصدار 22.20.0 أو أعلى)
- MongoDB (محلي أو Atlas)
- npm أو yarn

#### إعداد الواجهة الخلفية
```bash
cd backend
npm install
npm run dev
```

#### إعداد الواجهة الأمامية
```bash
cd frontend
npm install
npm run dev
```

### 📱 نظرة عامة على الصفحات

- **الرئيسية** - الصفحة الرئيسية مع المنتجات المميزة
- **المتجر** - تصفح جميع المنتجات مع الفلاتر
- **تفاصيل المنتج** - معلومات تفصيلية عن المنتج
- **العربة** - إدارة عربة التسوق
- **الدفع** - إكمال الشراء مع معلومات الشحن
- **الطلبات** - عرض سجل الطلبات
- **تسجيل الدخول/التسجيل** - مصادقة المستخدم
- **الإعدادات** - إعدادات الملف الشخصي

### 🎯 نقاط نهاية API

#### المصادقة
- `POST /api/user/register` - تسجيل مستخدم جديد
- `POST /api/user/login` - تسجيل دخول المستخدم
- `PUT /api/user/update` - تحديث الملف الشخصي

#### المنتجات
- `GET /api/products` - الحصول على جميع المنتجات
- `GET /api/products/:id` - الحصول على منتج واحد

#### العربة
- `GET /api/cart` - الحصول على عربة المستخدم
- `POST /api/cart/items` - إضافة عنصر إلى العربة
- `PUT /api/cart/items` - تحديث كمية العنصر
- `DELETE /api/cart/items/:id` - إزالة عنصر من العربة
- `DELETE /api/cart` - مسح العربة

#### الطلبات
- `POST /api/orders` - إنشاء طلب جديد
- `GET /api/orders` - الحصول على طلبات المستخدم

### 🌐 الترجمة
يدعم التطبيق ثلاث لغات:
- الإنجليزية (en)
- العربية (ar) مع دعم RTL
- التركية (tr)

### 🎨 ميزات التصميم
- نظام ألوان متدرج حديث (من البنفسجي إلى الوردي)
- تأثيرات Glassmorphism
- حركات hover سلسة
- تخطيطات شبكية متجاوبة
- تصاميم بطاقات جميلة
- أزرار تفاعلية مع تأثيرات التحويل

### 📄 الترخيص
هذا المشروع مفتوح المصدر ومتاح بموجب ترخيص MIT.

---

<a name="turkish"></a>
## 🇹🇷 Türkçe

### 📖 Genel Bakış
MERN Stack (MongoDB, Express.js, React, Node.js) ile oluşturulmuş tam kapsamlı bir e-ticaret platformu. Bu modern uygulama, kullanıcı kimlik doğrulama, ürün yönetimi, alışveriş sepeti ve sipariş işleme ile eksiksiz bir alışveriş deneyimi sunar.

### ✨ Özellikler

#### 🔐 Kullanıcı Yönetimi
- Kullanıcı kaydı ve girişi
- JWT tabanlı kimlik doğrulama
- bcrypt ile şifre şifreleme
- Kullanıcı profili yönetimi
- Sipariş geçmişi takibi

#### 🛒 Alışveriş Özellikleri
- Ürün göz atma ve arama
- Ürün kategorileri ve filtreleme
- Alışveriş sepeti işlevselliği
- Sepete ürün ekleme, güncelleme ve çıkarma
- Gerçek zamanlı sepet güncellemeleri
- Kargo bilgileriyle ödeme süreci

#### 📦 Sipariş Yönetimi
- Sipariş oluşturma ve takip
- Kullanıcılar için sipariş geçmişi
- Sipariş durumu güncellemeleri (İşleniyor, Gönderildi, Teslim Edildi)
- Kargo adresi yönetimi

#### 🎨 Modern Kullanıcı Arayüzü
- Tüm cihazlar için duyarlı tasarım
- Çok dilli destek (İngilizce, Arapça, Türkçe)
- Arapça için RTL desteği
- Güzel gradyan tasarımlar (Mor'dan Pembe'ye tema)
- Akıcı animasyonlar ve geçişler
- Etkileşimli ürün kartları
- Kullanıcı geri bildirimi için bildirimler

### 🛠️ Teknoloji Yığını

#### Frontend
- **React 19** - Kullanıcı arayüzü kütüphanesi
- **TypeScript** - Tip güvenliği
- **Vite** - Yapı aracı ve geliştirme sunucusu
- **Tailwind CSS 4** - CSS çerçevesi
- **React Router** - İstemci tarafı yönlendirme
- **React i18next** - Uluslararasılaştırma
- **Axios** - HTTP istemcisi
- **React Icons** - İkon kütüphanesi

#### Backend
- **Node.js** - Çalışma ortamı
- **Express.js** - Web çerçevesi
- **TypeScript** - Tip güvenliği
- **MongoDB** - Veritabanı
- **Mongoose** - MongoDB için ODM
- **JWT** - Kimlik doğrulama token'ları
- **bcrypt** - Şifre hashleme

### 🚀 Kurulum ve Ayarlama

#### Ön Gereksinimler
- Node.js (v22.20.0 veya üzeri)
- MongoDB (yerel veya Atlas)
- npm veya yarn

#### Backend Kurulumu
```bash
cd backend
npm install
npm run dev
```

#### Frontend Kurulumu
```bash
cd frontend
npm install
npm run dev
```

### 📱 Sayfalar Genel Bakış

- **Ana Sayfa** - Öne çıkan ürünlerle açılış sayfası
- **Mağaza** - Filtrelerle tüm ürünlere göz atın
- **Ürün Detayları** - Detaylı ürün bilgileri
- **Sepet** - Alışveriş sepeti yönetimi
- **Ödeme** - Kargo bilgileriyle satın alma işlemini tamamlayın
- **Siparişler** - Sipariş geçmişini görüntüleyin
- **Giriş/Kayıt** - Kullanıcı kimlik doğrulama
- **Ayarlar** - Kullanıcı profil ayarları

### 🎯 API Uç Noktaları

#### Kimlik Doğrulama
- `POST /api/user/register` - Yeni kullanıcı kaydı
- `POST /api/user/login` - Kullanıcı girişi
- `PUT /api/user/update` - Profil güncelleme

#### Ürünler
- `GET /api/products` - Tüm ürünleri getir
- `GET /api/products/:id` - Tek ürün getir

#### Sepet
- `GET /api/cart` - Kullanıcı sepetini getir
- `POST /api/cart/items` - Sepete ürün ekle
- `PUT /api/cart/items` - Ürün miktarını güncelle
- `DELETE /api/cart/items/:id` - Sepetten ürün çıkar
- `DELETE /api/cart` - Sepeti temizle

#### Siparişler
- `POST /api/orders` - Yeni sipariş oluştur
- `GET /api/orders` - Kullanıcının siparişlerini getir

### 🌐 Uluslararasılaştırma
Uygulama üç dili destekler:
- İngilizce (en)
- Arapça (ar) RTL desteği ile
- Türkçe (tr)

### 🎨 Tasarım Özellikleri
- Modern gradyan renk şeması (Mor'dan Pembe'ye)
- Glassmorphism efektleri
- Akıcı hover animasyonları
- Duyarlı ızgara düzenleri
- Güzel kart tasarımları
- Dönüşüm efektli etkileşimli düğmeler

### 📄 Lisans
Bu proje açık kaynaklıdır ve MIT Lisansı altında mevcuttur.

---

## 🤝 İletişim / Contact / اتصل بنا

For questions and support, please contact:
- GitHub: [@aymanbajar](https://github.com/aymanbajar)
- Repository: [mernstack-ecommerce](https://github.com/aymanbajar/mernstack-ecommerce)

---

**Made with ❤️ using MERN Stack**