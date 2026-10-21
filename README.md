# Madara Lazdāne — mājaslapa

Statiska lapa (HTML/CSS/JS) bez būvēšanas soļa. Publicējama jebkurā hostingā (Netlify, Vercel, GitHub Pages, cPanel) — vienkārši augšupielādē visu mapi.

## Struktūra

| Lapa | Fails | Mērķis |
|---|---|---|
| Sākums | `index.html` | Vizītkarte: portrets, vārds, viena doma, pogas uz katru piedāvājumu |
| 36 dienu ceļš | `journey.html` | Pārdošanas lapa: foto + punkti + poga → "pazīstami?" → ieguvumi 01–04 → kā notiek → cena/apmaksa → par mani → BUJ → noslēgums |
| Kārtis | `cards.html` | Tā pati pārdošanas lapas veidne |
| Koučings | `coaching.html` | Tāda pati struktūra: foto + punkti → "pazīstami?" → jomas → formāti → process → par mani → atsauksmes |
| Darbnīcas | `workshops.html` | Foto + punkti → tēmas → formāti → pasākumi → par mani → pieteikuma forma |
| Par mani | `about.html` | Stāsts, vērtības, kvalifikācija |
| Kontakti | `contact.html` | Forma + privātuma politika + noteikumi |

Visas pārdošanas lapas produktiem tiek veidotas no `data.js` — teksti, punkti, ieguvumi, BUJ, cena.

```
assets/css/styles.css   dizaina sistēma — krāsas, fonti, atstarpes ir :root mainīgajos faila sākumā
assets/js/config.js     e-pasts, formu adrese, rezervāciju saite, sociālie tīkli
assets/js/data.js       produkti, pakalpojumi, darbnīcu tēmas, pasākumi, atsauksmes (EN + LV)
assets/js/lv.js         latviešu teksti lapām (angļu teksts ir pašā HTML)
assets/js/main.js       komponenti: navigācija, kājene, valodas slēdzis, produktu kartītes, produkta lapa, formas
```

## Biežākās izmaiņas

- **Cena:** `data.js` → produkts → `price.amount` (piem. `39`).
- **Apmaksa:** `data.js` → `editions[].checkoutUrl` — ielīmē Stripe Payment Link / Lemon Squeezy / Shopify saiti katrai valodas versijai.
- **Formas:** `config.js` → `formEndpoint` (piem. Formspree saite).
- **Rezervācijas:** `config.js` → `bookingUrl` (Calendly / Cal.com). Ja tukšs, pogas ved uz kontaktformu.
- **Foto:** ieliec failus `assets/img/` un aizstāj `<figure class="ph">…</figure>` ar
  `<figure class="media"><img src="assets/img/fails.jpg" alt="…" width="800" height="1000" loading="lazy"></figure>`.
  Produkta galvenais foto — `data.js` → `heroImage: { src: "assets/img/…", alt: { en, lv } }`.
- **Atsauksmes:** `data.js` → `testimonials`, iestati `placeholder: false`.
- **Pasākumi:** `data.js` → `events` (paraugs komentārā).
- **Jauns produkts:** pievieno ierakstu `data.js` → `products`, nokopē `cards.html`, nomaini `data-product="…"`, un pievieno pogu `index.html`.
- **Krāsas/fonti:** `styles.css` → `:root`.
- **Domēns:** aizstāj `https://www.example.com` visos HTML failos, `sitemap.xml`, `robots.txt`.

Vietas, kas apzīmētas ar `[…]` vai `TODO`, ir jāaizpilda pirms publicēšanas.

## Lokāla apskate

Atver `index.html` pārlūkā (dubultklikšķis) vai palaid `.claude/serve.ps1` un atver http://localhost:5510.

## Nākotnei

Valodas šobrīd pārslēdzas pārlūkā (`?lang=lv`). Ja latviešu versijai vajadzēs atsevišķas, Google indeksējamas adreses (`/lv/…`), lapu var pārnest uz Astro vai Eleventy — saturs `data.js` un `lv.js` ir jau sagatavots tam.
