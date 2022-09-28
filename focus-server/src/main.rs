#[macro_use]
extern crate rocket;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![index])
}



// 🔸 focus/pomodoro/create
// {duration: x, description: x}

// 🔸 focus/pomodoro/start

// 🔸 focus/pomodoro/end

// 🔸 focus/config/work-days
//     {month: march, days: 22}
// or  {keys: [{'saturdays': true}, {'business-days': true}]}
// 
// Defaults:
// If nothing is specified: {'business-days': true}, the rest is false.





// Keep running a socket to warn when a pomodoro stops.
// could build a socket tester lib

