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
    <>
      {swiperSlide.isActive && (
        <iframe
          src={`${clip.embedUrl}&${params}`}
          frameBorder="0"
          allowFullScreen
          scrolling="no"
          onLoad={onLoad}
          className="absolute bg-black player"
        />
      )}
      {(!swiperSlide.isActive || !canShowPlayer) && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={clip.thumbnailUrl}
          alt={clip.title}
          className=" absolute bg-black object-contain z-[1] player"
        />
      )}
      {/* TODO: ローディングアイコンに置き換える */}
      {swiperSlide.isActive && !canShowPlayer && (
        <div className=" absolute text-white opacity-30 z-[2] player">
          iframe loading...
        </div>
      )}
    </>
  );
}
