-- Insert sample calendars (these will only work after a user signs up)
-- This is just an example structure - actual data will be inserted via the app

-- Example calendar data structure:
-- INSERT INTO calendars (title, description, color, user_id) VALUES
-- ('Personal', 'My personal calendar', '#3B82F6', 'user-uuid-here'),
-- ('Work', 'Work-related events', '#EF4444', 'user-uuid-here'),
-- ('Projects', 'Project deadlines and milestones', '#10B981', 'user-uuid-here');

-- Example event data structure:
-- INSERT INTO events (title, description, start_time, end_time, calendar_id, user_id) VALUES
-- ('Team Meeting', 'Weekly team sync', '2024-01-15 10:00:00+00', '2024-01-15 11:00:00+00', 'calendar-uuid', 'user-uuid'),
-- ('Project Deadline', 'Final submission due', '2024-01-20 23:59:00+00', '2024-01-20 23:59:00+00', 'calendar-uuid', 'user-uuid');

-- Example task data structure:
-- INSERT INTO tasks (title, description, due_date, priority, calendar_id, user_id) VALUES
-- ('Review documentation', 'Review and update project docs', '2024-01-18 17:00:00+00', 'high', 'calendar-uuid', 'user-uuid'),
-- ('Prepare presentation', 'Create slides for client meeting', '2024-01-22 09:00:00+00', 'medium', 'calendar-uuid', 'user-uuid');

-- Note: Replace 'user-uuid-here' and 'calendar-uuid' with actual UUIDs from your application
-- These inserts should be done through the application after user authentication
