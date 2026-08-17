create table if not exists public.answers (
  chapter integer not null check (chapter between 1 and 14),
  question integer not null check (question > 0),
  selected text[] not null default '{}',
  correct boolean not null,
  updated_at timestamptz not null default now(),
  primary key (chapter, question)
);

alter table public.answers enable row level security;

revoke all on table public.answers from anon, authenticated;
grant all on table public.answers to service_role;

comment on table public.answers is
  'Persistent OCP Java review answers written only by the protected app server.';
