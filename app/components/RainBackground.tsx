"use client";

import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function RainBackground() {
  async function particlesInit(engine: unknown) {
    await loadSlim(engine);
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        background: {
          color: {
            value: "#050816",
          },
        },
        particles: {
          color: {
            value: "#6ee7ff",
          },
          move: {
            direction: "bottom",
            enable: true,
            speed: 8,
            straight: true,
          },
          number: {
            value: 120,
          },
          opacity: {
            value: 0.25,
          },
          shape: {
            type: "line",
          },
          size: {
            value: { min: 8, max: 20 },
          },
        },
      }}
    />
  );
}