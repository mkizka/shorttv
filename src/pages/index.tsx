import { NextPage } from "next";

import { ClipPlayerContainer } from "../components/ClipPlayerContainer";
import { trpc } from "../utils/trpc";

const Index: NextPage = () => {
  const clips = trpc.useQuery(["main.getClips"]);

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
