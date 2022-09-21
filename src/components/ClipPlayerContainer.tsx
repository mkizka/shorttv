import { Clip } from "@prisma/client";
import { useState, useEffect } from "react";
import {
  Swiper as SwiperClass,
  Keyboard,
  Mousewheel,
  Navigation,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { ClipPlayer } from "./ClipPlayer";

export type ClipPlayerContainerProps = {
  clips: Clip[];
  updateClips: () => void;
};

export function ClipPlayerContainer({
  clips,
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
        if (swiper.activeIndex >= clips.length - 2) {
          console.log("update", clips);
          updateClips();
        }
      }}
      className="w-full flex-1 bg-black player-container"
    >
      {clips.map((clip) => {
        return (
          <SwiperSlide key={clip.id}>
            <ClipPlayer
              clip={clip}
              canShowPlayer={iframeLoaded}
              onLoad={() => setIframeLoaded(true)}
            />
          </SwiperSlide>
        );
      })}
      <div className="w-full h-[100px] bottom-0 md:w-[100px] md:h-full md:right-0 absolute bg-black z-[1] pointer-events-none" />
    </Swiper>
  );
}
