-- Create bookings table
create table if not exists public.bookings (
    id uuid default gen_random_uuid() primary key,
    created_at timestamptz default timezone('utc'::text, now()) not null,
    user_name text not null,
    room_id text not null,
    start_time timestamptz not null,
    end_time timestamptz not null,
    constraint valid_booking_times check (end_time > start_time)
);

-- Enable RLS
alter table public.bookings enable row level security;

-- Create policies
create policy "Anyone can create bookings"
    on public.bookings for insert
    to anon
    with check (true);

create policy "Anyone can view bookings"
    on public.bookings for select
    to anon
    using (true);