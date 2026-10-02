create table if not exists public.club_reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 2 and 60),
  rating smallint not null check (rating between 1 and 5),
  review text not null check (char_length(btrim(review)) between 10 and 600),
  created_at timestamptz not null default now()
);

alter table public.club_reviews enable row level security;

revoke all on public.club_reviews from anon, authenticated;
grant select (id, name, rating, review, created_at) on public.club_reviews to anon, authenticated;
grant insert (name, rating, review) on public.club_reviews to anon, authenticated;

drop policy if exists "Anyone can read club reviews" on public.club_reviews;
create policy "Anyone can read club reviews"
  on public.club_reviews for select
  to anon, authenticated
  using (true);

drop policy if exists "Anyone can submit a club review" on public.club_reviews;
create policy "Anyone can submit a club review"
  on public.club_reviews for insert
  to anon, authenticated
  with check (
    char_length(btrim(name)) between 2 and 60
    and rating between 1 and 5
    and char_length(btrim(review)) between 10 and 600
  );