# FAM Online Shop (dk-gadgets-hub)

A full-stack e-commerce web application built with **Next.js**, **Express.js**, and **MongoDB**, designed for both users and admins. The platform offers a clean shopping experience with WhatsApp-based ordering, along with an admin dashboard for product and banner management.

---

## 🌐 Live Features : https://dk-server.vercel.app

### 🛍️ User (Frontend)
- View **homepage** with:
  - Carousel/banner
  - All products
  - Combo products
- Click on any product to see **View Details**:
  - Name, price, model, discount, discounted price, description
- Click **Order Now** to redirect to WhatsApp with pre-filled product info
- Responsive **navbar** and **footer** on all pages

### 🔐 Admin (Backend)
- Admin login and authentication
- Admin dashboard features:
  - Add product
  - Add banner/carousel
  - Add combo product
  - **Edit/Delete** product
  - **Edit/Delete** combo product
  - **Edit/Delete** banner

---

## 🧱 Tech Stack

### Frontend (`fam-client`)
- **Next.js** 15
- **Tailwind CSS** 4
- **Axios**
- **Framer Motion**
- **Geist UI**
- **JWT for client auth**

### Backend (`fam-server`)
- **Express.js** 5
- **MongoDB & Mongoose**
- **JWT** for admin authentication
- **Multer** for image uploads
- **Joi** for validation
- **Dotenv, CORS**

---

## 📁 Project Structure

fam-project/
├── fam-client/ # Next.js frontend
│ ├── components/
│ ├── pages/
│ └── styles/
├── fam-server/ # Express.js backend
│ ├── routes/
│ ├── controllers/
│ └── models/
└── README.md


---

## 🚀 Installation

### Clone the repository:
```bash
git clone https://github.com/Ancishan/dk-gadget
cd fam-project
Run dk-Client
cd fam-client
npm install
npm run dev
Run Server
cd fam-server
npm install
npm start
📩 Order Process
User browses homepage

Clicks "View Details" of product

Clicks "Order Now" → redirects to WhatsApp with product data

🔐 Admin Routes (Protected)
/admin/login

/admin/add-product

/admin/edit-product/:id

/admin/delete-product/:id

/admin/add-carousel

/admin/add-combo

📌 Notes
No payment gateway, ordering is done via WhatsApp

Admin key is required to protect admin routes