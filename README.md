# TantraGenTech website

A responsive React, TypeScript and Vite site for TantraGenTech. The experience includes an animated hero, ten service entry points, three interactive illustrative project demos, an AI approach section, delivery process, studio overview, toolkit, and project enquiry form.

## Run locally

Requirements: Node.js 20 or newer.

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

Vite outputs the production site to `dist/`. Deploy the project to a static host such as Vercel or Netlify using `npm run build` and `dist` as the output directory. No environment variables are required for the current site.

## Project enquiries

The form validates the required name and project description in the browser, then prepares an email addressed to `tantragentech@gmail.com` using the visitor's configured mail application. It does not submit automatically or store data. If no mail application opens, visitors can email the address directly. To enable web-based delivery, add a server-side endpoint or reputable form provider, configure credentials only on the server, and add server-side validation and abuse protection. No provider or credentials are currently configured.

## Content accuracy

The SkillSprint, Framewise, and Careline views are illustrative product concepts, not claims about shipped client projects. They use synthetic UI data and contain no patient information. No testimonials, clients, phone number, social profiles, address, awards, or live production URL are asserted. Privacy and terms are noted as requiring business-specific review before publication.
