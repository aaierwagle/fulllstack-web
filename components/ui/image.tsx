import NextImage, { type ImageProps as NextImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface ImageProps extends NextImageProps {
  className?: string
}

export function Image({ className, alt, ...props }: ImageProps) {
  return (
    <NextImage
      className={cn("transition-all", className)}
      alt={alt}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      quality={90}
      {...props}
    />
  )
}

