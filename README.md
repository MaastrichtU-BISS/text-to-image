# Text to image

We use the OpenAI API to make calls to Dall-E and present the users with their creations.

This project is built using Nuxt v3, look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Setup

1. Copy the project to your local machine
2. Open the text-to-image folder in your IDE
3. Create a new .env file in the root of the project
4. Add the following line to the .env file:
```env
NUXT_API_KEY="your Dall-E2 api key here"
```

5. Install dependencies:

```bash
yarn install
```

## Development Server

Start the development server on http://localhost:3000

```bash
yarn dev
```

Or start the development server on http://localhost:XXXX

```bash
yarn dev --port XXXX
```

## Production

Build the application for production:

```bash
yarn build
```

Locally preview production build:

```bash
yarn preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.
