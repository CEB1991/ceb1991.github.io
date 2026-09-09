# ceb1991.github.io

Personal portfolio of Carlos Eduardo Beleche, focused on countywide program coordination, professional learning, and responsible AI adoption in K-12 public education.

Live site: https://ceb1991.github.io

## What is here

| File | What it is |
| --- | --- |
| `index.html` | Home. Who I am, what I actually do, my 2026 AI coursework, and links to the four pieces of work. |
| `es.html` | Spanish home page, written in Spanish rather than translated. |
| `first-90-days.html` | A proposed first 90 days for a countywide AI coordination role, including what I would deliberately not rush. |
| `responsible-ai.html` | Five commitments for responsible adoption, an honest accounting of the environmental cost with sources, a chart putting data centre growth in proportion, an interactive footprint estimator, a student risk table, and where this sits in California policy. |
| `professional-learning.html` | How I design professional learning for mixed rooms, a full 60 minute session plan, and an interactive district AI readiness self check that returns a prioritised summary. |
| `familias.html` | A bilingual family guide to AI in schools, with an English and Spanish toggle. |
| `colophon.html` | Disclosure of how the site was built, including AI use, plus the accessibility statement. |
| `assets/style.css` | The whole stylesheet. No framework. |

## How it is built

Static HTML and CSS. No build step, no framework, no dependencies, no tracking, no analytics, no cookies, and no third party scripts beyond the two web fonts.

There are three small vanilla JavaScript blocks, each inline in the page it belongs to and each written to degrade gracefully when scripting is unavailable:

- `familias.html` switches between English and Spanish, and shows both if scripting is off.
- `responsible-ai.html` estimates the energy and water footprint of a hypothetical rollout from published per prompt figures.
- `professional-learning.html` runs the readiness self check and returns a prioritised summary.

Nothing is stored or transmitted. All three run entirely in the browser.

Charts and diagrams are hand written inline SVG with `title` and `desc` elements, so there is no charting library and no image that a screen reader cannot read.

Public Sans carries display and body text; Source Serif 4 is reserved for figures and numerals. The site follows the system light or dark preference, and every page has a print stylesheet.

## Running it locally

No build required. Clone and open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Publishing on GitHub Pages

1. Put these files at the root of the `ceb1991.github.io` repository.
2. In the repository, go to Settings, then Pages, and set the source to the `main` branch, root folder.
3. The site publishes at https://ceb1991.github.io within a minute or two.

## Editing

Each page is a single self contained HTML file. To change wording, edit the file directly. To change the look, edit the custom properties at the top of `assets/style.css`, which control every color and the text measure.

## Accessibility

Semantic headings, a skip link, visible focus outlines, language attributes on Spanish passages, contrast checked color pairs, a layout that reflows to one column on a phone, and no motion. Details are on the colophon page. If something does not work with your assistive technology, email cebeleche@gmail.com.

## Disclosure

I used a generative AI assistant to help draft and structure this site, working from my own outline and my own positions, and I verified every factual claim against the linked primary source. The colophon page states exactly what was AI assisted and what I did by hand.

## A note on affiliation

This is a personal site. It is not affiliated with, endorsed by, or published on behalf of the San Diego County Office of Education or any other agency, and it contains no confidential or non public information.
