# Tota.dev: 3D portfolio

An interactive 3D portfolio built with **React**, **Three.js** and **React Three Fiber** (plus drei).
Scroll to fly through a floating-island world, one station per part of the CV.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run build:single   # one self-contained dist/index.html
```

Needs Node 18 or newer.

## What you can do in the world

- Move the mouse: the camera and islands tilt, the character and robot look at your cursor.
- Click the character to make it hop and say something new.
- **About:** knock on the door (click the house photo).
- **Projects:** click a building to open that project (links, stack, details).
- **Skills:** click a crystal to see how that technology is used.
- **Journey:** keep scrolling and the character walks the road, unlocking each milestone. The rocket launches at the end.
- **Contact:** click the mailbox to raise its flag.

## Change the content

Everything you read on the site is in `src/data.js` (profile, projects, skills, journey, links).
Your photos are in `src/assets/`. Replace a file with another image of any size to swap it in the 3D world:

| File | Where it appears |
| --- | --- |
| `hero-portrait.jpg` | Home, framed portrait |
| `about-house.jpg` | About, the house |
| `projects-island.jpg` | Project Gallery backdrop |
| `skills-lab.jpg` | Coding Lab backdrop |
| `journey-map.jpg` | Journey Road backdrop |

## Folder map

```
src/
  data.js            all text and links
  scrollMap.js       how scrolling maps to sections
  store.js           tiny shared state between the 3D scene and the page UI
  world/             the 3D scene (islands, avatar, robot, camera, stations)
    stations/        one file per section: Hero, About, Projects, Skills, Journey, Contact
  ui/                nav, text panels, project modal, loader
  styles.css
```

## Deploy

`npm run build`, then upload `dist/` to Vercel, Netlify or Render (static site).
To add a downloadable resume, put `Resume.pdf` in a `public/` folder and link to `/Resume.pdf`.

## Contact form

The Contact section has a working form. By default, sending opens the visitor's email app with the message filled in.
To receive messages directly, create a free form at formspree.io, copy `.env.example` to `.env`, and paste the URL into `VITE_FORM_ENDPOINT`.
