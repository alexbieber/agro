"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { YOUTUBE_CHANNEL_URL } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink } from "lucide-react";

const YOUTUBE_UPLOADS_PLAYLIST_ID = "UUf5BtTEmy7osf-n4yP_LSrg";

type VideoItem = {
  id: string;
  title: string;
  thumbnailUrl: string;
  publishedAt: string;
  url: string;
};

export default function OurVideos() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/youtube/videos")
      .then((res) => res.json())
      .then((data: { videos: VideoItem[] }) => {
        setVideos(data.videos ?? []);
      })
      .catch(() => setVideos([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-heading font-normal text-foreground mb-2 text-center">
          Videos
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-6">
          Product demos and customer reviews from our YouTube channel.
        </p>
        <div className="flex justify-center mb-8">
          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
          >
            <Button variant="outline" className="gap-2 border-red-600 text-red-600 hover:bg-red-50">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Nandee Agrotech on YouTube
            </Button>
          </a>
        </div>

        <div className="relative rounded-xl overflow-hidden border border-border bg-card shadow-sm aspect-video max-w-4xl mx-auto mb-8 min-h-[200px] sm:min-h-[280px]">
          <iframe
            title="Nandee Agrotech YouTube channel – latest videos"
            src={`https://www.youtube.com/embed/videoseries?list=${YOUTUBE_UPLOADS_PLAYLIST_ID}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground py-8">Loading videos…</div>
        ) : videos.length > 0 ? (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
              Latest uploads
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="aspect-video relative bg-muted">
                    <Image
                      src={video.thumbnailUrl}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                      <span className="rounded-full bg-red-600 p-3 text-white">
                        <Play className="h-6 w-6" fill="currentColor" />
                      </span>
                    </span>
                    <ExternalLink className="absolute top-2 right-2 h-5 w-5 text-white drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-3">
                    <p className="font-medium text-foreground text-sm line-clamp-2">
                      {video.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {video.publishedAt ? new Date(video.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" }) : ""}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ) : null}

        <p className="text-center text-sm text-muted-foreground">
          Can&apos;t see the player?{" "}
          <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Open Nandee Agrotech on YouTube
          </a>
          {" "}to see all videos.
        </p>
      </div>
    </section>
  );
}
