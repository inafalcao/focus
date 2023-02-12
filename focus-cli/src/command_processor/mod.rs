use crate::pomodoro::Pomodoro;

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
    fn process(args: &[&str]) -> Result<(), CommandError>;
}

struct ComandProcessor {
    pomodoro: Pomodoro,
}

struct PomodoroCommand {}
struct TimeEntryCommand {}
struct ReportCommand {}

impl Command for PomodoroCommand {
    fn process(args: &[&str]) -> Result<(), CommandError> {
        // 1st arg shoud be <start, stop, etc>
        let command: &str = args[0];

        // 2nd arg shoud be a number
        let arg: Option<&str> = if args.len() > 1 {
            Option::from(args[1])
        } else {
            None
        };

        let minutes = match arg {
            Some(x) => {
                let minutes = x.parse::<u32>();
                match minutes {
                    Ok(ok) => Option::from(ok),
                    Err(_) => None,
                }
            }
            None => None,
        };

        match command {
            "start" => Ok(()), // todo
            "pause" => Ok(()),
            &_ => Err(CommandError::PomodoroCommandNotFound),
        }
    }
}

// impl Command for TimeEntryCommand {
//     fn process(args: &[&str]) {
//         println!("{:?}", args)
//     }
// }

// impl Command for ReportCommand {
//     fn process(args: &[&str]) {
//         println!("{:?}", args)
//     }
// }

enum CommandError {
    PomodoroCommandNotFound,
}
