import { IconProps } from "./types";

export const LoaderIcon = ({}: IconProps) => {
  return (
    // <svg
    //   viewBox="0 0 128 128"
    //   width="128"
    //   height="128"
    //   className="bg-black rounded-lg"
    // >
    //   <style>{`
    //     @keyframes ball-x {
    //       0%, 100% { transform: translateX(0); }
    //       50% { transform: translateX(48px); }
    //     }
    //     @keyframes ball-y {
    //       0%, 50%, 100% { transform: translateY(0); }
    //       25%, 75% { transform: translateY(-68px); }
    //     }
    //     @keyframes paddle-x {
    //       0%, 100% { transform: translateX(0); }
    //       50% { transform: translateX(56px); }
    //     }
    //     @keyframes paddle-rotate {
    //       0%, 100% { transform: rotate(6deg); }
    //       50% { transform: rotate(-6deg); }
    //     }
    //   `}</style>
    //   <g>
    //     <circle
    //       id="ball"
    //       cx="40"
    //       cy="80"
    //       r="10"
    //       fill="#fff"
    //       className="animate-ball-x animate-ball-y"
    //       style={{
    //         animationDuration: "1.5s",
    //         animationIterationCount: "infinite",
    //         animationTimingFunction: "ease-in-out",
    //         animationName: "ball-x, ball-y",
    //         animationDirection: "alternate",
    //       }}
    //     />
    //     <rect
    //       id="paddle"
    //       x="36"
    //       y="92"
    //       rx="1"
    //       ry="1"
    //       width="60"
    //       height="4"
    //       fill="#0fa"
    //       className="animate-paddle-x animate-paddle-rotate"
    //       style={{
    //         animationDuration: "1.5s",
    //         animationIterationCount: "infinite",
    //         animationTimingFunction: "ease-in-out",
    //         animationName: "paddle-x, paddle-rotate",
    //         animationDirection: "alternate",
    //       }}
    //     />
    //   </g>
    // </svg>
    <svg width="60" height="40" viewBox="0 0 60 40" className="flex">
      <circle
        cx="10"
        cy="30"
        r="8"
        fill="#3b82f6"
        style={{
          animation: "bounce 0.6s infinite alternate",
        }}
      />
      <circle
        cx="30"
        cy="30"
        r="8"
        fill="#3b82f6"
        style={{
          animation: "bounce 0.6s 0.2s infinite alternate",
        }}
      />
      <circle
        cx="50"
        cy="30"
        r="8"
        fill="#3b82f6"
        style={{
          animation: "bounce 0.6s 0.4s infinite alternate",
        }}
      />
      <style>{`
      @keyframes bounce {
        to {
          transform: translateY(-16px);
        }
      }
    `}</style>
    </svg>
  );
};
