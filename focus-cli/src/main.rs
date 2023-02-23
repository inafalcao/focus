use std::time::Instant;
mod command_processor;
mod pomodoro;

fn main() {
    let start = Instant::now();
    println!("Hello, world!");
    let end = start.elapsed();

    // read line
    command_processor::process("pomodoro start 60");

    // What I want:

    // start not always create a new instance of Pomodoro, but rather resumes an existent one,
    // so it shoud be passed as param

    // let p = Pomodoro()
    // pomodoro::start();
    // pomodoro::pause()
    // pomodoro::resume()
    // pomodoro::end(p)

    // or shoud I call it timer?
    // it can have a Duration limit and end itself at the end of the limit.
    // or it shoud be required for it to always have a duration limit

    // or p.start(), p.end() ?

    // Example usage:

    // $ pomodoro start 60 -> starts a pomodoro with 60min limit
    // $ pomodoro pause    -> gets the current pomodoro instance and take a snapshot of the elapsed time
    // $ pomodoro start 60 -> If there is a pomodoro instance, should end it and start a new one

    println!("Elapsed {:?}", end);
}
