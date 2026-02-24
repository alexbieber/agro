import { NextResponse } from "next/server";

/**
 * Lists videos from Nandi Agrotech YouTube channel (UCf5BtTEmy7osf-n4yP_LSrg).
 * Set YOUTUBE_API_KEY in .env.local (get one at https://console.cloud.google.com/apis/credentials)
 * to enable the video list. Without it, the section still shows the channel embed.
 */
const UPLOADS_PLAYLIST_ID = "UUf5BtTEmy7osf-n4yP_LSrg";

export type YouTubeVideoItem = {
  id: string;
  title: string;
  thumbnailUrl: string;
  publishedAt: string;
  url: string;
};

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ videos: [] });
  }

  try {
    const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("playlistId", UPLOADS_PLAYLIST_ID);
    url.searchParams.set("maxResults", "50");
    url.searchParams.set("key", apiKey);

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) {
      const err = await res.text();
      console.error("YouTube API error:", res.status, err);
      return NextResponse.json({ videos: [] });
    }

    const data = (await res.json()) as {
      items?: Array<{
        snippet?: {
          resourceId?: { videoId?: string };
          title?: string;
          thumbnails?: { high?: { url?: string }; medium?: { url?: string }; default?: { url?: string } };
          publishedAt?: string;
        };
      }>;
    };

    const videos: YouTubeVideoItem[] = (data.items ?? [])
      .map((item) => {
        const videoId = item.snippet?.resourceId?.videoId;
        const title = item.snippet?.title ?? "";
        const thumb = item.snippet?.thumbnails?.high?.url ?? item.snippet?.thumbnails?.medium?.url ?? item.snippet?.thumbnails?.default?.url ?? "";
        const publishedAt = item.snippet?.publishedAt ?? "";
        if (!videoId) return null;
        return {
          id: videoId,
          title,
          thumbnailUrl: thumb,
          publishedAt,
          url: `https://www.youtube.com/watch?v=${videoId}`,
        };
      })
      .filter((v): v is YouTubeVideoItem => v !== null);

    return NextResponse.json({ videos });
  } catch (e) {
    console.error("YouTube fetch error:", e);
    return NextResponse.json({ videos: [] });
  }
}
