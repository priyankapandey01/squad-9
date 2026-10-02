import { NextResponse } from "next/server";

const reviewFields = "id,name,rating,review,created_at";

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const anonKey = process.env.SUPABASE_ANON_KEY;
  return url && anonKey ? { endpoint: `${url}/rest/v1/club_reviews`, anonKey } : null;
}

function supabaseHeaders(anonKey: string) {
  return { apikey: anonKey, Authorization: `Bearer ${anonKey}` };
}

export async function GET() {
  const config = getSupabaseConfig();
  if (!config) return NextResponse.json({ error: "Reviews are not configured yet." }, { status: 503 });

  try {
    const response = await fetch(`${config.endpoint}?select=${reviewFields}&order=created_at.desc&limit=100`, {
      headers: supabaseHeaders(config.anonKey),
      cache: "no-store",
    });
    if (!response.ok) return NextResponse.json({ error: "Could not load reviews." }, { status: 502 });
    return NextResponse.json({ reviews: await response.json() });
  } catch {
    return NextResponse.json({ error: "Could not load reviews." }, { status: 502 });
  }
}

export async function POST(request: Request) {
  const config = getSupabaseConfig();
  if (!config) return NextResponse.json({ error: "Reviews are not configured yet." }, { status: 503 });

  let body: { name?: unknown; rating?: unknown; review?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send a valid review." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const review = typeof body.review === "string" ? body.review.trim() : "";
  const rating = body.rating;
  if (name.length < 2 || name.length > 60) {
    return NextResponse.json({ error: "Name must be between 2 and 60 characters." }, { status: 400 });
  }
  if (!Number.isInteger(rating) || Number(rating) < 1 || Number(rating) > 5) {
    return NextResponse.json({ error: "Choose a rating from 1 to 5 stars." }, { status: 400 });
  }
  if (review.length < 10 || review.length > 600) {
    return NextResponse.json({ error: "Review must be between 10 and 600 characters." }, { status: 400 });
  }

  try {
    const response = await fetch(`${config.endpoint}?select=${reviewFields}`, {
      method: "POST",
      headers: {
        ...supabaseHeaders(config.anonKey),
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({ name, rating: Number(rating), review }),
      cache: "no-store",
    });
    if (!response.ok) return NextResponse.json({ error: "Could not submit your review. Try again shortly." }, { status: 502 });

    const [savedReview] = await response.json();
    if (!savedReview) return NextResponse.json({ error: "Your review was not returned. Please try again." }, { status: 502 });
    return NextResponse.json({ review: savedReview }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not submit your review. Try again shortly." }, { status: 502 });
  }
}