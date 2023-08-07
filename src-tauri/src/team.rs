use lazy_static::lazy_static;
use std::{sync::Mutex, fs::File, io::Read};
use uuid::Uuid;
use serde_json;
use serde::Deserialize;
use rand::Rng;
use std::path::Path;

use crate::player::{self, PlayerData};

#[derive(Clone)]
struct TeamInfo {
    name: String,
    squad: Vec<Uuid>,
    lineup: [Uuid; 5]
}

// Hashmap that stores all the players that exist
lazy_static! {
    static ref ALL_TEAMS: Mutex<Vec<TeamInfo>> = Mutex::new(Vec::new());
}

#[derive(Deserialize)]
struct Names {
    male: Vec<String>,
    female: Vec<String>,
    surname: Vec<String>
}

// Given a structure of names print out a first and last name
fn get_name(name_struct: &Names) -> String {
    let mut rng = rand::thread_rng();
    let first_name: &str;
    let last_name: &str;

    // 50 50 chance of male or female name
    if rng.gen_bool(1.0/2.0) {
        let random_index = rng.gen_range(0..name_struct.male.len());
        first_name = &name_struct.male[random_index];
    } else {
        let random_index = rng.gen_range(0..name_struct.female.len());
        first_name = &name_struct.female[random_index];
    }

    let random_index = rng.gen_range(0..name_struct.surname.len());
    last_name = &name_struct.surname[random_index];

    //print!("{} {} | ",first_name,last_name);
    return format!("{} {}",first_name,last_name);
}

fn new_team(new_name: String,name_list: &Names) {
    let mut squad: Vec<Uuid> = Vec::new();
    for _ in 0..15 {
        let player_name = get_name(name_list);
        squad.push(player::generate_new_player(player_name));
    }
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: new_name,
        squad: squad.clone(),
        lineup: [squad[0],squad[1],squad[2],squad[3],squad[4]]
    });
}


pub fn generate_teams() {
    let file_path = Path::new("names/USA.json");
    let mut file = File::open(file_path).expect("File not found");
    let mut contents = String::new();
    file.read_to_string(&mut contents).expect("Failed to read file");

    let name_list: Names = serde_json::from_str(&contents).expect("Failed to deserialize JSON");

    // United States Conference
    // USC East
    new_team("Hudson Harbor Hurricanes".to_string(),&name_list);
    new_team("Florida Flamingos".to_string(),&name_list);
    new_team("Lynn Lightning".to_string(),&name_list);
    new_team("Milford Minutemen".to_string(),&name_list);
    // USC North
    new_team("Pennsylvania Panthers".to_string(),&name_list);
    new_team("Ohio Outlaws".to_string(),&name_list);
    new_team("Detroit Dragons".to_string(),&name_list);
    new_team("Indianapolis Ironclads".to_string(),&name_list);
    // USC South
    new_team("Pasadena Phantoms".to_string(),&name_list);
    new_team("Savannah Storm".to_string(),&name_list);
    new_team("Memphis Moonwalkers".to_string(),&name_list);
    new_team("Kentucky Derby Daredevils".to_string(),&name_list);
    // USC West
    new_team("Golden Gate Griffins".to_string(),&name_list);
    new_team("Scottsdale Scorpions".to_string(),&name_list);
    new_team("Pikes Peak Pioneers".to_string(),&name_list);
    new_team("Oregon Thunderhawks".to_string(),&name_list);
    // American Patriot Conference
    // APC East
    new_team("Jersey City Jaguars".to_string(),&name_list);
    new_team("Roanoke Ravens".to_string(),&name_list);
    new_team("Maryland Monarchs".to_string(),&name_list);
    new_team("Seattle Stormchasers".to_string(),&name_list);
    // APC North
    new_team("Logan Square Locomotives".to_string(),&name_list);
    new_team("Waukesha Wolverines".to_string(),&name_list);
    new_team("St. Paul Spartans".to_string(),&name_list);
    new_team("Ankeny Arrows".to_string(),&name_list);
    // APC South
    new_team("Charlotte Crushers".to_string(),&name_list);
    new_team("Shreveport Swamp Sirens".to_string(),&name_list);
    new_team("Columbia Commanders".to_string(),&name_list);
    new_team("Fort Smith Firebirds".to_string(),&name_list);
    // APC West
    new_team("Mississippi Magnolias".to_string(),&name_list);
    new_team("Joplin Jets".to_string(),&name_list);
    new_team("Broken Arrow Blazers".to_string(),&name_list);
    new_team("Puerto Rico Piranhas".to_string(),&name_list);

}


#[tauri::command]
pub fn get_players_in_team(team_id: usize) -> Vec<PlayerData> {
    let mut squad: Vec<PlayerData> = vec![];
    let current_squad: &Vec<Uuid> = &ALL_TEAMS.lock().unwrap()[team_id].squad;
    let squad_size = current_squad.len();
    for i in 0..squad_size {
        let current_player_id: Uuid = current_squad[i];
        let current_player = player::ALL_PLAYERS.lock().unwrap().get(&current_player_id).expect("Player Not Found").clone();
        squad.push(current_player);
    }
    return squad;
}

#[tauri::command]
pub fn get_team_name(team_id: usize) -> String {
    let test: &String =  &ALL_TEAMS.lock().unwrap()[team_id].name;
    return test.to_string();
}

#[tauri::command]
pub fn get_all_team_names() -> Vec<String> {
    let mut team_names: Vec<String> = vec![];
    let length: usize = ALL_TEAMS.lock().unwrap().len();
    for i in 0..length {
        team_names.push(ALL_TEAMS.lock().unwrap()[i].name.clone());
    }
    return team_names;
}

#[tauri::command]
pub fn get_team_lineup(team_id: usize) -> Vec<PlayerData> {
    let mut lineup: Vec<PlayerData> = vec![];
    let current_lineup: &[Uuid; 5] = &ALL_TEAMS.lock().unwrap()[team_id].lineup;
    for i in 0..5 {
        let current_player_id: Uuid = current_lineup[i];
        let current_player = player::ALL_PLAYERS.lock().unwrap().get(&current_player_id).expect("Player Not Found").clone();
        lineup.push(current_player);
    }
    return lineup;
}