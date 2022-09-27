import { NextPage } from "next";
import { useRef } from "react";

import { ClipPlayerContainer } from "../components/ClipPlayerContainer";
import { trpc } from "../utils/trpc";

const Index: NextPage = () => {
  const seedRef = useRef(Math.random().toString());
  // ClipPlayerContainerのfocusをiframeから剥がす処理で、
  // なぜかtrpcの再読み込みが呼ばれるので二度以上通信しないようにする
  const query = trpc.useInfiniteQuery(
    ["main.getClips", { seed: seedRef.current }],
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      staleTime: Infinity,
    }
  );

  return (
    <main className="flex flex-col h-full bg-black">
      {!query.data ? (
        <p className="text-white">first loading...</p>
      ) : (
        <ClipPlayerContainer
          clipPages={query.data.pages}
          updateClips={() => query.fetchNextPage()}
        />
      )}
    </main>
  );
};

export default Index;
