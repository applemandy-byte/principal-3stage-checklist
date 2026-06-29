-- Supabase 資料表設定
-- 請在 Supabase SQL Editor 執行本檔，讓每位登入使用者只能讀寫自己的檢核資料。

create table if not exists public.checklist_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.checklist_data enable row level security;

drop policy if exists "Users can read own checklist" on public.checklist_data;
create policy "Users can read own checklist"
  on public.checklist_data
  for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own checklist" on public.checklist_data;
create policy "Users can insert own checklist"
  on public.checklist_data
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own checklist" on public.checklist_data;
create policy "Users can update own checklist"
  on public.checklist_data
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own checklist" on public.checklist_data;
create policy "Users can delete own checklist"
  on public.checklist_data
  for delete
  using (auth.uid() = user_id);
