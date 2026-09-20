# Mr. Sab Kuch + NISS Technology App

यह project आपके existing NISS Technology source code को preserve करके उसके ऊपर नया editable **Mr. Sab Kuch** home + admin panel जोड़ता है.

## Run
```bash
npm install
npm start
```

Open: `http://localhost:3000`

## Admin
Open: `http://localhost:3000/mr-admin`

Admin से बदल सकते हैं:
- Brand name / tagline
- Phone, email, WhatsApp, address
- Services: add/edit/delete/hide/show
- Package name and cost
- Custom sections add/edit/delete/hide/show
- JSON backup/export + restore/import

## Existing NISS homepage
Old homepage has been kept at:
`/niss-home`

बाकी existing routes (property, interior, CCTV, laundry, catering, events, customer/vendor/field staff etc.) App.js में preserved हैं.

## Important persistence note
अभी CMS changes browser `localStorage` में save होते हैं. यानी उसी browser/device पर तुरंत दिखेंगे. अगर एक admin से change करके सभी visitors/devices को live update कराना है, अगला step Firestore CMS sync है. Existing Firebase config project में है, इसलिए इसे बाद में जोड़ना आसान है.

## Production build
```bash
npm run build
```

## GitHub
```bash
git init
git add .
git commit -m "Mr Sab Kuch NISS app"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```
