# 🚀 AL - PMT Frontend



# 📦 Tech Stack

| Technology | Description |
|-------------|-------------|
| **React 18+** | Frontend UI Library |
| **Vite** | Fast build tool and dev server |
| **Tailwind CSS** | Utility-first CSS framework |
| **MSAL** | Microsoft Authentication Library for OAuth login |

---

# 🛠️ Getting Started

Follow the steps below to run the project locally.

## 1️⃣ Install Dependencies

```bash
npm install
```

---

## 2️⃣ Run Development Server

```bash
npm run dev
```

The application will start on:

```
http://localhost:5173
```

---

# 🔐 Microsoft OAuth Setup

This project uses **Microsoft Authentication (MSAL)** for secure login.

---

## 1️⃣ Install MSAL Packages

```bash
npm install @azure/msal-browser @azure/msal-react
```

---

## 2️⃣ Configure Environment Variables

Create a `.env` file in the **root directory** and add the following:

```env
VITE_AZURE_CLIENT_ID=your-azure-client-id
VITE_AZURE_TENANT_ID=common
```

---



