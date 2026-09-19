import { ImageResponse } from 'next/og';
 
export function generateImageMetadata() {
  return [
    {
      id: 'small',
      size: { width: 192, height: 192 },
      alt: 'Streak Tracker Icon 192x192',
      contentType: 'image/png',
    },
    {
      id: 'large',
      size: { width: 512, height: 512 },
      alt: 'Streak Tracker Icon 512x512',
      contentType: 'image/png',
    },
  ];
}

export default function Icon({ id }: { id: string }) {
  const isLarge = id === 'large';
  const size = isLarge ? 512 : 192;
  const fontSize = isLarge ? 340 : 120;

  return new ImageResponse(
    (
      <div
        style={{
          fontSize,
          background: '#4f46e5', // Primary Indigo
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '22%',
        }}
      >
        S
      </div>
    ),
    { width: size, height: size }
  );
}
