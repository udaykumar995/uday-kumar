# ViralReels AI — AI Viral Reels & YouTube Clips Generator

ViralReels AI transforms long-form videos (podcasts, webinars, interviews, YouTube streams) into vertical (9:16) viral clips with Whisper AI transcription, frame-accurate animated karaoke captions, intelligent speaker reframing, and automated silence removal.

---

## 📱 Mobile-First Architecture (Android Friendly)

This project is built from the ground up for creators managing their workflow directly on an **Android smartphone**:
- **Touch-optimized controls**: 48px minimum hit targets, swipeable layouts, no tiny hover-dependent elements.
- **1-Click Demo Login**: Test all creator flows instantly on mobile without tedious typing.
- **In-App Firebase Configurator**: Paste your Firebase credentials directly into the web UI without needing a desktop terminal.
- **Dual-Engine Authentication**:
  - **Live Firebase Auth**: Direct integration with Google Firebase Authentication (Email/Password, Email Verification, Password Reset).
  - **Local Secure Mode**: Client-isolated cryptographic session store enabled out-of-the-box so you can develop and test offline or before linking Firebase.

---

## 🚀 Stage 1 Implemented Features

1. **High-Converting Responsive Landing Page**:
   - Hero section with viral metrics and call-to-actions.
   - Interactive 9:16 Reel Player simulator with word-by-word synced karaoke captions and sound toggle.
   - Showcase of all 7 trending reels styles (Viral Podcast, Fast-Paced Viral, Cinematic Storytelling, Educational / Facts, Motivational, Minimal Clean, Gaming / High-Energy).
   - Technical pipeline breakdown (Whisper, FFmpeg, Gemini hook detector).

2. **Complete Authentication Flow**:
   - **Sign Up**: Full name, email, password strength indicator (dynamic length, complexity, numbers, special characters), confirm password matching, terms & privacy consent checkbox, and error validation.
   - **Login**: Email and password, show/hide password toggle, remember-me session persistence, forgot password link, error states, and 1-Click Demo Login.
   - **Forgot Password Workflow**: Privacy-preserving reset link request, secure 15-minute time-limited reset token generation, and reset-password page with password strength validation.
   - **Email Verification**: Verification banner, resend email action, and instant simulation for development testing.
   - **User Isolation**: Protected user session with unique creator ID and private project library view.

---

## 🛠️ Android & GitHub Setup Guide

### 1. GitHub Setup from Android Browser
1. Open [github.com](https://github.com) on your mobile browser (Chrome / Firefox).
2. Tap the **+** icon in the top right ➔ **New repository**.
3. Name it `viralreels-ai` and set it to **Public** or **Private**.
4. In your terminal (e.g., Termux or your cloud environment):
   ```bash
   git init
   git add .
   git commit -m "feat: Stage 1 - responsive landing page and authentication system"
   git branch -M main
   git remote add origin https://github.com/<your-username>/viralreels-ai.git
   git push -u origin main
   ```

### 2. Free Firebase Authentication Setup
1. Open [console.firebase.google.com](https://console.firebase.google.com) on your phone.
2. Tap **Add project** (e.g. `viralreels-app`) and follow the quick prompts.
3. In the sidebar under **Build**, tap **Authentication** ➔ **Get Started**.
4. Under **Sign-in method**, tap **Email/Password** and toggle **Enable**, then tap **Save**.
5. Tap the gear icon ⚙️ (Project settings) ➔ In "Your apps", tap the **Web** icon (`</>`).
6. Register app (e.g. `ViralReels Web`) and copy the config object:
   ```json
   {
     "apiKey": "AIzaSy...",
     "authDomain": "viralreels-app.firebaseapp.com",
     "projectId": "viralreels-app",
     "appId": "1:..."
   }
   ```
7. Either paste these keys into your `.env` file or click **Android & Firebase Guide** in the app navbar to paste them directly inside the app!

---

## 🧪 How to Test on Android Phone

1. **Open the App**:
   - Access the development URL in Chrome or your Android browser.
2. **Test Sign Up & Password Strength**:
   - Tap **Get Started Free** or **Create Free Account**.
   - Type a short password like `abc` (observe red "Weak" badge).
   - Type `Alpha99!Strong` (observe green "Very Strong" badge with 100% progress).
   - Check the terms box and tap **Create Creator Account**.
3. **Test Email Verification**:
   - Notice the verification screen showing your email address.
   - Tap **Simulate "Email Verified"** or continue to dashboard.
4. **Test Protected Dashboard**:
   - Verify your name, Account ID, and "Verified Creator" badge are displayed.
   - Tap **Log Out** to return to the landing page.
5. **Test Password Reset**:
   - Tap **Log In** ➔ **Forgot Password?**.
   - Enter your email and tap **Send Password Reset Link**.
   - Tap **Proceed to Reset Password Page**, enter your new password, and save.
6. **Test 1-Click Mobile Demo**:
   - Tap **Demo** in the mobile header to instantly log in as Alex Rivera.
