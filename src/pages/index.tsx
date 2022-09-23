import { NextPage } from "next";

import { ClipPlayerContainer } from "../components/ClipPlayerContainer";
import { trpc } from "../utils/trpc";

const Index: NextPage = () => {
  // ClipPlayerContainerのfocusをiframeから剥がす処理で、
  // なぜかtrpcの再読み込みが呼ばれるので二度以上通信しないようにする
  const clips = trpc.useQuery(["main.getClips"], { staleTime: Infinity });

  return (
    <main className="flex flex-col h-full bg-black">
      {!clips.data ? (
        <p className="text-white">first loading...</p>
      ) : (
        <ClipPlayerContainer
          clips={clips.data}
          updateClips={() => console.log("update")}
        />
      )}
    </main>
  );
};

export default Index;
