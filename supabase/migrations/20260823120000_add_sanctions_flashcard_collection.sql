alter table public.flashcard_progress
  drop constraint if exists flashcard_progress_collection_check;

alter table public.flashcard_progress
  add constraint flashcard_progress_collection_check
  check (collection in ('java', 'g1', 'sanctions'));
