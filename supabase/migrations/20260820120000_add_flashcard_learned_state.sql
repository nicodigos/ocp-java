alter table public.flashcard_progress
  add column if not exists learned boolean not null default false;

update public.flashcard_progress
set learned = true
where mastery >= 3;
