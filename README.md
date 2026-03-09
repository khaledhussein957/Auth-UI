# Advanced Authentication UI (React Native/Expo) 👋

A premium, full-featured authentication system built with Expo 55, featuring a modern UI, secure backend integration, and robust state management.

## ✨ Key Features

- **Full Auth Flow**: Login, Registration, Email Verification, Password Reset, and Account Deletion.
- **Modern UI/UX**: Built with React Native Reanimated, Expo Glass Effect, and custom smooth transitions.
- **Secure Backend**: Integrated with MongoDB via Mongoose, providing a REST API within Expo Router (+api routes).
- **State Management**: Powered by Zustand for global auth state and TanStack Query for data fetching.
- **Email System**: Automated email delivery for verification codes and reset links via Nodemailer.
- **Form Validation**: Type-safe forms using React Hook Form and Zod.

## 🚀 Tech Stack

- **Framework**: [Expo 55](https://expo.dev/) (SDK 55)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **Styling**: React Native StyleSheet + [Expo Glass Effect](https://github.com/expo/expo-glass-effect)
- **Animations**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- **Data Fetching**: [@tanstack/react-query](https://tanstack.com/query/latest)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Backend/Database**: [Mongoose](https://mongoosejs.com/) (MongoDB)
- **Communication**: [Nodemailer](https://nodemailer.com/) (SMTP)
- **Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Package Manager**: [Bun](https://bun.sh/) (Recommended)

## 🎨 Figma Design Link

[Design Link](https://www.figma.com/design/eRrz2XwVLw2sPkuTgLXfhZ/Auth-UI?node-id=0-1&t=3ogoCa3Nkhu0W26k-1)

## 🛠️ Getting Started

### 1. Prerequisites

Ensure you have [Bun](https://bun.sh/) installed (or use npm/yarn).

### 2. Clone and Install

```bash
git clone <repository-url>
cd Auth-UI
bun install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory (refer to `.env.example`):

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SMTP_USER=your_email
SMTP_PASS=your_email_password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

### 4. Run the Project

```bash
bun start
```

- Press **'a'** for Android
- Press **'i'** for iOS
- Press **'w'** for Web
- Press **'r'** to reload
- Press **'d'** to open the debugger
- Press **'m'** to open the menu
- Press **'q'** to quit

## 📂 Project Structure

- `assets/`: Assets and images and styles.
- `src/app/`: Expo Router pages and API routes.
  - `app/api/`: API routes.
  - `app/(auth)/`: Authentication pages.
  - `app/(tabs)/`: Tab pages.
  - `app/_layout.tsx`: Root layout.
- `src/config/`: Configuration files.
- `src/components/`: Reusable UI components.
- `src/constants/`: Constants and enums.
- `src/emails/`: Email templates and handler.
- `src/hooks/`: Custom hooks.
- `src/lib/`: Libraries and utilities.
- `src/models/`: Mongoose database schemas.
- `src/services/`: API integration and business logic.
- `src/store/`: Zustand state management.
- `src/types/`: TypeScript types.
- `src/utils/` : utilities and helpers.
- `src/validations/`: Zod schemas for form validation.

## 📡 API Endpoints

- `POST /api/auth/register`: Create a new user.
- `POST /api/auth/verify-email`: Verify email with OTP.
- `POST /api/auth/login`: Authenticate user.
- `POST /api/auth/forgot-password`: Send reset code.
- `POST /api/auth/reset-password`: Update password.
- `DELETE /api/auth/delete-account`: Remove user data.

---

Built with ❤️ by Khalid Hussein
