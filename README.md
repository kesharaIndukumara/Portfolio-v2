# Keshara Indukumara — Portfolio

A single-page personal portfolio site. Plain **HTML + CSS + JavaScript**, no
framework and no build step. Styling uses the [Tailwind Play CDN]
(https://tailwindcss.com/docs/installation/play-cdn) plus a small hand-written
`styles.css`.

## Run it

Just open `index.html` in a browser. For clean relative-path loading you can
serve the folder instead:

## Structure

```
porfolio-site/
├── index.html            # all markup + inline Tailwind config
├── assets/
│   ├── css/styles.css     # base styles, components, animations
│   ├── js/main.js         # menu, scroll-spy, reveal-on-scroll, year
│   ├── img/
│   │   ├── keshara.jpg        # hero portrait (960×1200)
│   │   ├── keshara-avatar.jpg # square avatar for schema.org
│   │   └── og-image.jpg       # 1200×630 social preview
│   └── resume.pdf           # linked by every "Download Résumé" button
└── dp-image.jpeg            # original photo (source for assets/img/*)
```

## Editing content

All content lives in `index.html`. Sections: About, Skills, Experience,
Current Work, Projects, Education & Certifications, Contact.

- **Colours / fonts** — edit the `tailwind.config` block in `<head>` and the
  `:root` custom properties in `assets/css/styles.css`.
- **Résumé download** — replace `assets/resume.pdf` with your file (keep the name).

## Before you deploy

1. **`assets/resume.pdf`** is currently a copy of `Keshara_Resume.pdf`. Swap in
   the cleaned version you wanted (no home address / DOB).
2. **Set your domain.** Find & Replace every `https://kesharaindukumara.github.io`
   in `index.html`, `sitemap.xml` and `robots.txt` with your final URL
   (e.g. `https://your-name.com`, or your GitHub Pages URL). This fixes the
   `canonical`, `og:url`, `twitter` and JSON-LD entries.
3. **Submit to Google.** After deploying, add the site in
   [Google Search Console](https://search.google.com/search-console), paste the
   verification `<meta>` (a commented placeholder is in `<head>`), then submit
   `sitemap.xml`. Do the same in [Bing Webmaster Tools](https://www.bing.com/webmasters).
4. Update `<lastmod>` in `sitemap.xml` whenever you change the page.
5. Verify the **Docker certification** link. Three KodeKloud certificate URLs
   were found in the resume; Kubernetes and Linux are confirmed, and the Docker
   one (`7300da94-...`) is inferred by elimination -- open it once to confirm.
6. The **"Current Work" section names the internal project "Pnyx Survey
   Platform"**. If your internship agreement restricts naming unreleased
   products, change the heading/first line in that section to something generic
   like "a survey platform product".
7. The Tailwind Play CDN prints a console note that it's not for production. It
   works fine, but for the smallest possible payload you can later switch to the
   Tailwind CLI to compile `styles`.

### SEO checklist (already done in the code)

- Descriptive, keyword-rich `<title>` and `<meta name="description">` with your
  name, role, stack and location
- `<meta name="robots">` allowing indexing + large image previews
- `<link rel="canonical">` and `rel="me"` links to GitHub / LinkedIn
- Open Graph + Twitter card tags with a 1200x630 preview image
- JSON-LD structured data: `WebSite` + `ProfilePage` + `Person` (job title,
  skills, education, certifications, social profiles) -- this is what powers
  rich results when someone searches your name
- `sitemap.xml` and `robots.txt`
- Semantic HTML landmarks, one `<h1>`, alt text on images

> **Editing note:** this project's `index.html` must stay **plain ASCII**. An
> editor/format-on-save step on this machine silently strips non-ASCII
> punctuation (em dashes, accented letters), which once broke several sentences.
> Use `-`, `,`, `:` or the HTML entities already in the file
> (`&middot;` `&ndash;` `&rsquo;`), not `—` or `é`.

## Deploy

It's a static site — drag the folder into Netlify, push to GitHub Pages, or
upload to any static host. No configuration required.
