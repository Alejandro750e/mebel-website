// components/ImageWithFallback.tsx
import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string; // Путь к изображению (например, "/kithen/A1.jpg")
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  onClick?: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
}

export default function ImageWithFallback({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  decoding = 'async',
  onClick
}: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isWebp, setIsWebp] = useState(true);

  // При загрузке ошибки меняем на JPG
  const handleError = () => {
    if (isWebp) {
      // Меняем .webp на .jpg
      const jpgSrc = src.replace(/\.webp$/i, '.jpg');
      if (jpgSrc !== src) {
        setImageSrc(jpgSrc);
        setIsWebp(false);
      }
    }
  };

  // Формируем путь к WebP версии
  const webpSrc = encodeURIComponent(src.replace(/\.jpg$/i, '.webp'));

  return (
    <div className="w-full h-full">
      <picture>
        <source 
          srcSet={`${webpSrc} 1x`} 
          type="image/webp" 
        />
        <img
          src={imageSrc}
          alt={alt}
          className={className}
          loading={loading}
          decoding={decoding}
          onClick={onClick}
          onError={handleError}
        />
      </picture>
    </div>
  );
}