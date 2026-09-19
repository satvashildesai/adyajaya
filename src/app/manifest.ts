import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Streak Tracker',
    short_name: 'Streak Tracker',
    description: 'A modern, mobile-first PWA for tracking your daily habits and streaks.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#4f46e5',
    icons: [
      {
        src: '/icon/small',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon/large',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
