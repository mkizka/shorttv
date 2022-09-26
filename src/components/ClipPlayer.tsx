import { Clip } from "@prisma/client";
import { ReactEventHandler } from "react";
import { useSwiperSlide } from "swiper/react";

export type ClipPlayerProps = {
  clip: Pick<Clip, "title" | "embedUrl" | "thumbnailUrl">;
  canShowPlayer: boolean;
  onLoad: ReactEventHandler<HTMLIFrameElement>;
};

export function ClipPlayer({ clip, canShowPlayer, onLoad }: ClipPlayerProps) {
  const swiperSlide = useSwiperSlide();

  const url = new URL(clip.embedUrl);
  url.searchParams.append("parent", location.hostname);
  url.searchParams.append("autoplay", "true");

  return (
    <div className="flex justify-center items-center w-full h-full">
      {swiperSlide.isActive && (
        <iframe
          src={url.toString()}
          frameBorder="0"
          allowFullScreen
          scrolling="no"
          onLoad={onLoad}
          className="player absolute"
        />
      )}
      {(!swiperSlide.isActive || !canShowPlayer) && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={clip.thumbnailUrl}
          alt={clip.title}
          className="player absolute bg-black object-contain z-[1] "
        />
      )}
      {swiperSlide.isActive && !canShowPlayer && (
        <div className="loading-icon absolute z-[2]"></div>
      )}
    </div>
  );
}
