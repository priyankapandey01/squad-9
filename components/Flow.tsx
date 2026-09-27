"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

const posts = [
  "https://www.instagram.com/reel/DdgBhBISbA5/",
  "https://www.instagram.com/reel/DdZDJb4yMKY/",
];

export default function InstagramComments() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Instagram's embed script once, then process embeds.
    const existing = document.getElementById("instagram-embed-script");

    const process = () => {
      window.instgrm?.Embeds.process();
    };

    if (existing) {
      process();
    } else {
      const script = document.createElement("script");
      script.id = "instagram-embed-script";
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = process;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section id="comments" className="mx-auto max-w-5xl px-6 py-4">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">What people are saying</h2>
        <p className="max-w-xs text-sm text-ink-dim">
          Straight off Instagram — swipe through.
        </p>
      </div>

      <div
        ref={containerRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {posts.map((url) => (
          <div key={url} className="w-[326px] flex-shrink-0 snap-start sm:w-[360px]">
            <blockquote
              className="instagram-media"
              data-instgrm-captioned
              data-instgrm-permalink={`${url}?utm_source=ig_embed&utm_campaign=loading`}
              data-instgrm-version="14"
              style={{
                background: "#FFF",
                border: 0,
                borderRadius: "3px",
                boxShadow:
                  "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
                margin: "1px",
                maxWidth: "540px",
                minWidth: "326px",
                padding: 0,
                width: "100%",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}