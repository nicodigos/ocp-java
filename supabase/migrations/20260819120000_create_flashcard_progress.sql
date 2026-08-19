create table if not exists public.flashcard_progress (
  collection text not null check (collection in ('java', 'g1')),
  deck text not null,
  card_id text not null,
  mastery integer not null default 0 check (mastery between 0 and 5),
  seen_count integer not null default 0 check (seen_count >= 0),
  due_order bigint not null default 0,
  updated_at timestamptz not null default now(),
  primary key (collection, deck, card_id)
);

alter table public.flashcard_progress enable row level security;
revoke all on table public.flashcard_progress from anon, authenticated;
grant all on table public.flashcard_progress to service_role;
