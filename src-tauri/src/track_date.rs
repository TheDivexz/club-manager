// tracks the in game date
use lazy_static::lazy_static;
use std::sync::Mutex;

pub struct GameDate {
    pub year: u32,
    pub month: u32,
    pub day: u32,
    pub day_of_week: u32,
}

lazy_static! {
    pub static ref GAME_DATE: Mutex<GameDate> = Mutex::new(GameDate::new());
}

impl GameDate {
    fn new() -> GameDate {
        GameDate {
            year: 2023,
            month: 8,
            day: 7,
            day_of_week: 1,
        }
    }
}

pub fn increment_date() {
    // increment day for all months with 31 days
    match GAME_DATE.lock().unwrap().month {
        1 | 3 | 5 | 7 | 8 | 10 | 12 => {
            // Handles December 31st
            if GAME_DATE.lock().unwrap().day == 31 {
                GAME_DATE.lock().unwrap().day = 1;
                if GAME_DATE.lock().unwrap().month == 12 {
                    GAME_DATE.lock().unwrap().month = 1;
                    GAME_DATE.lock().unwrap().year += 1;
                } else {
                    GAME_DATE.lock().unwrap().month += 1;
                }
            } else {
                GAME_DATE.lock().unwrap().day += 1;
            }
        },
        // Handles months with 30 days
        4 | 6 | 9 | 11 => {
            if GAME_DATE.lock().unwrap().day == 30 {
                GAME_DATE.lock().unwrap().day = 1;
                GAME_DATE.lock().unwrap().month += 1;
            } else {
                GAME_DATE.lock().unwrap().day += 1;
            }
        },
        // Handles February
        2 => {
            if GAME_DATE.lock().unwrap().day == 28 {
                GAME_DATE.lock().unwrap().day = 1;
                GAME_DATE.lock().unwrap().month += 1;
            } else {
                GAME_DATE.lock().unwrap().day += 1;
            }
        },
        _ => panic!("Invalid month"),
    }
    // increment day of week
    GAME_DATE.lock().unwrap().day_of_week = (GAME_DATE.lock().unwrap().day_of_week + 1) % 7;
}

// returns a string of the date
fn get_date_string() -> String {
    let mut date_string = String::new();
    date_string.push_str(&GAME_DATE.lock().unwrap().month.to_string());
    date_string.push_str("/");
    date_string.push_str(&GAME_DATE.lock().unwrap().day.to_string());
    date_string.push_str("/");
    date_string.push_str(&GAME_DATE.lock().unwrap().year.to_string());
    return date_string;
}

// returns a string of the day of the week
fn get_day_of_week_string() -> String {
    match GAME_DATE.lock().unwrap().day_of_week {
        0 => return String::from("Sunday"),
        1 => return String::from("Monday"),
        2 => return String::from("Tuesday"),
        3 => return String::from("Wednesday"),
        4 => return String::from("Thursday"),
        5 => return String::from("Friday"),
        6 => return String::from("Saturday"),
        _ => panic!("Invalid day of week"),
    }
}

// returns a string of the date and day of the week
#[tauri::command]
pub fn get_date_and_day_of_week_string() -> String {
    let mut date_string = String::new();
    date_string.push_str(&get_day_of_week_string());
    date_string.push_str(" ");
    date_string.push_str(&get_date_string());
    return date_string;
}