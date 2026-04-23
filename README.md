# Alex Dev — Personal Portfolio

A modern, dark-themed developer portfolio built with pure HTML, CSS, and JavaScript. No frameworks, no build tools — just clean, production-grade frontend code.

## Live Demo

> Replace this with your GitHub Pages / Netlify / Vercel URL after deploying.

## Features

- **Custom cursor** with smooth follower animation
- **Scroll reveal** animations on all sections
- **Animated skill bars** triggered on scroll
- **Counter animation** on hero stats
- **Tilt effect** on project cards
- **Typing effect** on hero text
- **Mobile-responsive** with hamburger menu
- **Active nav highlight** based on scroll position
- **Contact form** with validation (ready to hook up to Formspree / EmailJS)
- **Smooth scroll** navigation

## Folder Structure

```
portfolio/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # All JavaScript
├── assets/
│   └── resume.pdf      # Your resume (add your own)
└── README.md
```

## How to Customize

1. **Replace personal info** — Open `index.html` and update:
   - Name (`Alex Dev` → your name)
   - Location, bio text, social links
   - Project titles, descriptions, and links
   - Skills and percentages

2. **Change the accent color** — In `css/style.css`, edit:
   ```css
   --accent: #c8f04d;   /* change to any color you like */
   ```

3. **Add your photo** — Replace the `.about-avatar` div in `index.html` with an `<img>` tag pointing to your photo.

4. **Add your resume** — Drop your `resume.pdf` into the `assets/` folder.

5. **Connect the contact form** — Sign up at [Formspree.io](https://formspree.io) and replace the form's submit handler in `js/main.js` with your Formspree endpoint.

## Deployment (GitHub Pages)

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to **main branch / root**
4. Your site will be live at `https://yourusername.github.io/portfolio`

## Tech Stack

- HTML5 (semantic)
- CSS3 (custom properties, grid, flexbox, animations)
- Vanilla JavaScript (ES6+, IntersectionObserver API)
- Google Fonts (Syne + DM Mono)

## License

MIT — feel free to use and modify for your own portfolio.
