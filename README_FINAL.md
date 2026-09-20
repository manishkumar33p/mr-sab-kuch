# Mr. Sab Kuch — NISS Technology

This build keeps the existing NISS Technology React routes/modules and adds a mobile-first Mr. Sab Kuch customer shell plus a protected online admin CMS.

## Run locally

```bash
npm install
npm start
```

Open http://localhost:3000

Admin: http://localhost:3000/mr-admin

## Firebase setup

1. Firebase Authentication -> enable Email/Password.
2. Create an admin user with email `technologiesniss@gmail.com` and your chosen password.
3. Firestore -> create database.
4. Publish `firestore.rules`.
5. If you want admin image uploads later, enable Storage and publish `storage.rules`.

The existing Firebase client configuration is in `src/firebase.js`.

## Online deployment

Deploy the folder to Vercel/Netlify or another React host. The public root URL is the link you can send to friends on WhatsApp. On a phone, users can also use the browser's Add to Home Screen option because the app includes a web manifest and service worker.

## Play Store

For Google Play, package this React app as an Android app (AAB) using a native wrapper such as Capacitor after the web deployment is tested. The Play Console developer account, app signing, testing and store listing are separate publishing steps.

## Share with your friend

After deployment, send the public URL (for example `https://your-domain.vercel.app`) on WhatsApp. They can open it on Android/iPhone without installing anything. Because this build has a web app manifest, supported browsers can also offer **Add to Home Screen / Install app**.

Do not send the `/mr-admin` URL to customers. Keep that route for the owner/admin.
