# Screen Share Test App

A frontend application that demonstrates **browser screen-sharing permissions**, **media stream lifecycle management**, **success/failure validation**, and **clean React state and resource handling** using only native Web APIs (no third-party screen-sharing libraries).

- **Stack:** React (Vite), TypeScript, Tailwind CSS
- **Routes:** `/` (Homepage), `/screen-test` (Screen Test)

---

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm (or pnpm/yarn/bun)

### Install and run

```bash
# Clone the repository
git clone <your-repo-url>
cd screen-share-test

# Install dependencies
bun install

# Start development server
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in a supported browser (Chrome or Edge recommended).

### Build for production

```bash
bun run build
bun run preview
```

### Live deployment

- **Live link:** [Add your deployment URL here, e.g. Vercel/Netlify]
- Ensure the app is served over **HTTPS** (or `localhost`) so `getDisplayMedia` is available in a secure context.

---

## Screen-Sharing Flow

1. **Homepage (`/`)**
   - Static page with title **Screen Share Test App** and a **Start Screen Test** button.
   - Before navigation, the app checks for `navigator.mediaDevices.getDisplayMedia` support.
   - If unsupported, an inline **browser-unsupported** message is shown and the button is disabled.

2. **Screen Test page (`/screen-test`)**
   - **Step 1 – Permission & capability check**  
     On **Start Screen Share**, the app calls:

     ```ts
     navigator.mediaDevices.getDisplayMedia({
       video: { frameRate: { ideal: 30 } },
       audio: false,
     });
     ```

     Distinct states are handled and shown in the UI:
     - **Requesting** – loading while the system picker is open
     - **Permission granted** – stream is active
     - **User cancelled** – user closed the picker without selecting
     - **Permission denied** – user or policy denied
     - **Unknown error** – other errors (e.g. NotReadableError, SecurityError)  
       The start button is disabled during the request; a loading indicator is shown.

   - **Step 2 – Live preview & metadata**  
     After permission is granted:
     - Live preview is shown in a `<video>` element (local only; no recording or backend streaming).
     - UI shows “Screen stream active”, **display type** (tab / window / entire screen from `track.getSettings().displaySurface`), and **resolution** from `track.getSettings()` (width × height).

   - **Step 3 – Stream lifecycle**  
     The app listens to **`track.onended`** to detect:
     - User stopping sharing from the browser UI
     - Browser ending the stream unexpectedly  
       On end: UI is updated immediately, all tracks are stopped, and the video element’s `srcObject` is cleared.

3. **End / Retry flow**  
   When sharing stops (user or browser):
   - Message: **Screen sharing stopped**.
   - Buttons: **Retry Screen Test** (starts a new `getDisplayMedia` request; does not reuse old streams or leak tracks) and **Back to Home**.

**Code structure:**

- Screen-sharing logic is isolated in the **`useScreenShare`** hook.
- UI components stay stateless where possible; a reusable **Button** component is used.
- Cleanup on unmount: `useEffect` with a cleanup function that stops all tracks and clears the video element (using a ref so the latest stream is always released).

---

## Screenshots

| #   | Description                                                      | Screenshot                                                               | Live link          |
| --- | ---------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------ |
| 1   | Homepage – Screen Share Test App                                 | ![Screenshot 1](https://res.cloudinary.com/db5d9twmj/image/upload/v1771652677/Screenshot_2026-02-21_114209_hlzuwg.png)
| 2   | Homepage – browser unsupported message                           | ![Screenshot 2](https://res.cloudinary.com/db5d9twmj/image/upload/v1771652674/Screenshot_2026-02-21_114219_ddi1dc.png)
| 3   | Screen Test – idle / before share                                | ![Screenshot 3](https://res.cloudinary.com/db5d9twmj/image/upload/v1771652670/Screenshot_2026-02-21_114253_m9lwbv.png)
| 4   | Screen Test – requesting permission (loading)                    | ![Screenshot 4](https://res.cloudinary.com/db5d9twmj/image/upload/v1771652669/Screenshot_2026-02-21_114309_rg1iks.png)
| 5   | Screen Test – live preview + metadata (resolution, display type) | ![Screenshot 5](https://res.cloudinary.com/db5d9twmj/image/upload/v1771652668/Screenshot_2026-02-21_114317_vfgcx9.png)
| 6   | Screen Test – stopped state (Retry + Back to Home)               | ![Screenshot 6](https://res.cloudinary.com/db5d9twmj/image/upload/v1771652819/Screenshot_2026-02-21_114650_evxwuk.png)

---

## Known Limitations and Browser Quirks

- **Secure context required:** `getDisplayMedia` only works on **HTTPS** or **localhost**. It will not work on plain HTTP.
- **Browser support:** Best tested on **Chrome** and **Edge** (desktop). Firefox and Safari may have different behavior or limited support; mobile browsers generally do not support screen capture.
- **Picker cancellation:** If the user closes the share picker without choosing a source, the promise rejects with `AbortError`; the app shows a dedicated “Screen selection cancelled” state.
- **Display surface and resolution:** `displaySurface` and resolution from `getSettings()` depend on the browser and OS; some environments may report “Unknown” or generic values.
- **No recording or streaming:** This app only shows a local preview. It does not record or send the stream to any backend.
- **Single tab/window:** Only one screen-share session is supported at a time; retry starts a completely new request and releases previous tracks.

---
