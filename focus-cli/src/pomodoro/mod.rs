use std::time::Duration;
// This is used to compute month reports
struct TimeEntry {
    duration: Duration,
    description: String,
    date: String, // don't know how to manipulate dates yet.
}

// This is the running instance. There should be only one at a time
pub struct Pomodoro {
    // This duration limit can be outside the struct. It looks like it doesn't belong here.
    durationLimitMinutes: Duration, // ex: 60 minutes
    start: Instant,                 // should be imutable
    end: Instant,                   // can be mutable
}

pub trait Pomodoro {
    fn start(&self, durationLimitMinutes: Option<&str>);

    // [1] Compute start instante and set to Pomodoro.start
    // [2] It should trigger an end() action after durationLimit pass
    fn pause();

    fn end();
}

impl Pomodoro for Pomodoro {
    fn start(&self, durationLimitMinutes: Option<&str>) {
        // self::durationLimit = durationLimitMinutes match {
        //     Some(x) => x,
        //     None => 60
        // };
        self.start
    }
}
