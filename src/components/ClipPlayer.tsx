import { Clip } from "@prisma/client";
import { ReactEventHandler } from "react";
import { useSwiper, useSwiperSlide } from "swiper/react";

export type ClipPlayerProps = {
  clip: Pick<Clip, "title" | "embedUrl" | "thumbnailUrl">;
  canShowPlayer: boolean;
  onLoad: ReactEventHandler<HTMLIFrameElement>;
};

export function ClipPlayer({ clip, canShowPlayer, onLoad }: ClipPlayerProps) {
  const swiper = useSwiper();
  const swiperSlide = useSwiperSlide();

  const params = new URLSearchParams({
    parent: typeof location != "undefined" ? location.hostname : "",
    // https://github.com/nolimits4web/swiper/blob/5465b6c3b7223bd34b031c10042ef86431b9c7d6/src/shared/get-device.js
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    autoplay: `${!(swiper.device.android || swiper.device.ios)}`,
  });

  return (
    <div className="flex justify-center items-center w-full h-full">
      {swiperSlide.isActive && (
        <iframe
          src={`${clip.embedUrl}&${params}`}
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
