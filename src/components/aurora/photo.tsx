"use client";

import Image, { type ImageLoaderProps, type ImageProps } from "next/image";

// Burst photos are resized by their own CDN; everything else goes through next/image.
const burstLoader = ({ src, width }: ImageLoaderProps) => `${src}?width=${width}&format=pjpg&exif=0&iptc=0`;

export function Photo({ src, alt, ...rest }: Omit<ImageProps, "src"> & { src: string }) {
  const remote = src.startsWith("https://burst.shopifycdn.com/");
  return <Image src={src} alt={alt} loader={remote ? burstLoader : undefined} {...rest} />;
}
