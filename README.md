# Birthday Celebration Website

A beautiful and interactive website to celebrate your loved one's birthday. This website includes various features to make the celebration special and memorable.

## Features

- Countdown timer to the birthday
- Interactive photo gallery
- Love map showing special locations
- Gift wishlist
- Secret messages
- Love quiz game

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- React Map GL
- React Icons

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory and add your Mapbox token:
   ```
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

1. Update the birthday date in `src/app/page.tsx`
2. Add your photos in the `public/images` directory
3. Update the data in `src/data/siteData.ts` with your own content:
   - Photos
   - Locations
   - Wishes
   - Secret messages
   - Quiz questions

## Deployment

The website can be easily deployed to Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add your environment variables
4. Deploy!

## License

MIT
