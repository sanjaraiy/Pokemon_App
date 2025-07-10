# Pokemon Explorer App

A responsive and visually appealing Pokémon Explorer web app built with **Next.js**, **TypeScript**, **Tailwind CSS**, and powered by the [PokeAPI](https://pokeapi.co/).

## ✨ Features
- 🧾 Home page listing first 151 Pokémon
- 🔍 Search functionality by name
- 📄 Detail page with dynamic routing
- 📊 Displays Pokémon image, abilities, type, stats, and moves
- 📖 Pagination (20 per page)
- ⚡ Built with App Router and Static Generation

## 🛠️ Tech Stack

- [Next.js 13+ (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PokeAPI](https://pokeapi.co/)


## 📦 Installation

### 1. Clone the repository
```bash
  git clone https://github.com/sanjaraiy/Pokemon_App.git
  cd Pokemon_App
```

### 2. Install dependencies
```bash
  npm install
```

### 3. Run the development server
```bash
  npm run dev
```
Then open http://localhost:3000 to view it in your browser.

## Enable External Image Domains
- Make sure to allow external images in next.config.js:
```bash
 module.exports = {
  images: {
    domains: ['raw.githubusercontent.com'],
  },
};
```