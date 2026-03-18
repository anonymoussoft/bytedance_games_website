"use client";

/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import { useMemo, useState } from "react";

function isRemoteUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}

export function SafeImage({
  src,
  alt,
  className,
  fill,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
}) {
  const remote = useMemo(() => isRemoteUrl(src), [src]);
  const [broken, setBroken] = useState(false);

  if (broken) return null;

  // For remote URLs, avoid Next image optimizer proxy fetch (dev noise + timeouts).
  if (remote) {
    return (
      <img
        alt={alt}
        src={src}
        className={className}
        loading={priority ? "eager" : "lazy"}
        referrerPolicy="no-referrer"
        onError={() => setBroken(true)}
      />
    );
  }

  return (
    <Image alt={alt} src={src} fill={fill} sizes={sizes} priority={priority} className={className} />
  );
}

