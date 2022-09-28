// This is used to compute month reports
struct TimeEntry {
    duration: Duration,
    description: String,
    date: String, // don't know how to manipulate dates yet.
}

// This is the running instance. There should be only one at a time
struct Pomodoro {
    // This duration limit can be outside the struct. It looks like it doesn't belong here.
    durationLimit: Duration, // ex: 60 minutes
    start: Instant,          // should be imutable
    end: Instant,            // can be mutable
}

fn start() /* receives durationLimit */
{
    // Should I receive a pomodoro as param or control a global one?

    // [1] Compute start instante and set to Pomodoro.start
    // [2] It should trigger an end() action after durationLimit pass
}

fn pause() {}

// Should take the current pomodoro and transform into a TimeEntry
fn end() {
    // [1] Compute the elapsed duration and set to Pomodoro.end
    // [2]
}

// Create a module just to store it like a database (mock)
