import { Composition } from "remotion";
import { NLNVideo } from "./videos/001-pumpfun-sniping/Video";
import { Shorts001 } from "./videos/shorts-001-what-is-pumpfun/Video";
import { Video002 } from "./videos/002-yellowstone-grpc/Video";
import { Video003 } from "./videos/003-websocket-subscriptions/Video";
import { Video004 } from "./videos/004-solana-rpc-methods/Video";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ── Landscape (16:9) ── */}
      <Composition
        id="001-pumpfun-sniping"
        component={NLNVideo}
        durationInFrames={4800}
        fps={30}
        width={3840}
        height={2160}
      />

      {/* ── Landscape: Yellowstone gRPC (16:9) ── */}
      <Composition
        id="002-yellowstone-grpc"
        component={Video002}
        durationInFrames={34373}
        fps={30}
        width={3840}
        height={2160}
      />

      {/* ── Landscape: WebSocket Subscriptions (16:9) ── */}
      <Composition
        id="003-websocket-subscriptions"
        component={Video003}
        durationInFrames={25428}
        fps={30}
        width={3840}
        height={2160}
      />

      {/* ── Landscape: Solana RPC Methods (16:9) ── */}
      <Composition
        id="004-solana-rpc-methods"
        component={Video004}
        durationInFrames={21239}
        fps={30}
        width={3840}
        height={2160}
      />

      {/* ── Shorts (9:16) ── */}
      <Composition
        id="shorts-001-what-is-pumpfun"
        component={Shorts001}
        durationInFrames={1080}
        fps={30}
        width={2160}
        height={3840}
      />
    </>
  );
};
