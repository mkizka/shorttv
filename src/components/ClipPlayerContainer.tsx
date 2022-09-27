import { useState, useEffect } from "react";
import {
  Swiper as SwiperClass,
  Keyboard,
  Mousewheel,
  Navigation,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { inferQueryOutput } from "../utils/trpc";

import { ClipPlayer } from "./ClipPlayer";

export type ClipPlayerContainerProps = {
  clipPages: inferQueryOutput<"main.getClips">[];
  updateClips: () => void;
};

export function ClipPlayerContainer({
  clipPages,
  updateClips,
}: ClipPlayerContainerProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // クリップを操作するとフォーカスがiframeに移り、
      // Swiperのキーボード操作が使えなくなるためフォーカスを気合でもとにもどす
      if (
        document.activeElement != null &&
        document.activeElement.tagName.toLowerCase() == "iframe"
      ) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.activeElement.blur();
      }
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Swiper
      modules={[Keyboard, Mousewheel, Navigation]}
      slidesPerView={1}
      keyboard
      mousewheel
      navigation
      direction="vertical"
      onSlideChangeTransitionStart={(swiper: SwiperClass) => {
        setIframeLoaded(false);
        if (swiper.activeIndex >= swiper.slides.length - 2) {
          updateClips();
        }
      }}
      className="w-full flex-1 bg-black player-container"
    >
      {clipPages.map((page) => {
        return page.clips.map((clip) => {
          return (
            <SwiperSlide key={clip.id}>
              <ClipPlayer
                clip={clip}
                canShowPlayer={iframeLoaded}
                onLoad={() => setIframeLoaded(true)}
              />
            </SwiperSlide>
          );
        });
      })}
    </Swiper>
  );
}
