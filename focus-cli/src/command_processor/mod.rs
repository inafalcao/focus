pub fn process(command_line: &str) {
    let args: Vec<&str> = command_line.split(" ").collect();

    // todo: command line validation
    let main_command: &str = args[0];

    match main_command {
        "pomodoro" => PomodoroCommand::process(&args[1..]),
        "time-entry" => TimeEntryCommand::process(&args[1..]),
        "report" => ReportCommand::process(&args[1..]),
        &_ => print!("Command not found."),
    };
}

trait Command {
    fn process(args: &[&str]);
}

struct PomodoroCommand {}
struct TimeEntryCommand {}
struct ReportCommand {}

impl Command for PomodoroCommand {
    fn process(args: &[&str]) {
        println!("{:?}", args)
    }
}

impl Command for TimeEntryCommand {
    fn process(args: &[&str]) {
        println!("{:?}", args)
    }
}

impl Command for ReportCommand {
    fn process(args: &[&str]) {
        println!("{:?}", args)
    }
}
