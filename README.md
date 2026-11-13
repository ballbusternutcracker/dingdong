# 🍌 Soumabho dihhhh status 🍆

A retro 8-bit arcade style real-time status tracker for **Soumabho**, featuring animated bananas and brinjals, authentic pixel styling, 8-bit sound effects, and a dynamic backend that automatically updates the "dihhhh status" with every page refresh.

---

## 🎮 How to Configure Your 3 States

Open the file [`app/config/statusConfig.ts`](file:///home/abhrajit/Desktop/soumabhodih/app/config/statusConfig.ts):

```typescript
// 🟢 STATE 1: Type your first state here
export const STATE_1: string = "DIHHHH STATE 1: Feeling completely Bananas & fully ERECT! 🍌⚡";

// 🟣 STATE 2: Type your second state here
export const STATE_2: string = "DIHHHH STATE 2: Softieee and mushyy 🍆🕶️";

// 🟡 STATE 3: Type your third state here
export const STATE_3: string = "DIHHHH STATE 3: Critical level about to activate 👾🚀";
```

Simply replace the text inside the quotes with whatever states you want!

---

## ⚡ How the Backend Updates on Every Refresh

1. When the page is loaded or refreshed (**F5** or browser reload), Next.js executes server-side code on demand (`dynamic = 'force-dynamic'`).
2. The backend rotates to the next state (or returns dynamic stats like Dihhhh Overdrive %, Banana Level, and Brinjal Power), setting a cookie so that consecutive refreshes cycle through your 3 states.
3. An interactive **[🎲 RE-ROLL STATUS]** button is also available on the website to roll the backend state in real-time without reloading the entire page, accompanied by 8-bit synthesizer sound effects.
4. An in-browser **[⚙️ MY 3 STATES]** config tool allows you to preview different status messages live in the browser.

---

## 🚀 How to Deploy to Vercel

### Option 1: Vercel CLI (Fastest)
From the project folder, run:
```bash
npx vercel
```
Follow the prompts to link your Vercel account and deploy in under 60 seconds!

### Option 2: GitHub + Vercel Dashboard
1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "Soumabho dihhhh status site ready"
   git remote add origin https://github.com/<your-username>/soumabhodih.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository. Vercel automatically detects Next.js.
4. *(Optional)* In the Vercel dashboard under **Settings > Environment Variables**, you can also set:
   - `STATE_1`
   - `STATE_2`
   - `STATE_3`
   This allows you to change states anytime directly from the Vercel dashboard without touching the code!
5. Click **Deploy**!

---

## 🛠️ Local Development

```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
