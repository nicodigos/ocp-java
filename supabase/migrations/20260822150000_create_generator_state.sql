create table if not exists public.generator_state (
  id smallint primary key check (id = 1),
  chapters integer[] not null default array[1],
  status text not null default 'idle'
    check (status in ('idle', 'generating', 'ready', 'error')),
  question jsonb,
  generation_id text,
  error text,
  updated_at timestamptz not null default now()
);

insert into public.generator_state (id)
values (1)
on conflict (id) do nothing;
