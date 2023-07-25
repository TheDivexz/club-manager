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

// Sets the first characters as starters per team
fn set_starters() {
    let length: usize = ALL_TEAMS.lock().unwrap().len();
    for i in 0..length {
        for j in 0..5 {
            let player_id = ALL_TEAMS.lock().unwrap()[i].squad[j];
            let mut all_players = player::ALL_PLAYERS.lock().unwrap();
            // Check if the player_id exists in the HashMap
            if let Some(player_data) = all_players.get_mut(&player_id) {
                // Modify the entry with the new values
                player_data.starter = true;
                // Release the lock explicitly (it will be automatically released when 'all_players' goes out of scope)
                drop(all_players);
            } else {
                // Handle the case when the player_id is not found
                println!("Player not found!");
            }
        }
    }
}

pub fn generate_teams() {
    let file_path = Path::new("names/USA.json");
    let mut file = File::open(file_path).expect("File not found");
    let mut contents = String::new();
    file.read_to_string(&mut contents).expect("Failed to read file");

    let name_list: Names = serde_json::from_str(&contents).expect("Failed to deserialize JSON");

    
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Sacred Band of Thieves".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Albany Senators".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Santa Cruz Homeless".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Olgimsky United".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Skullcrushers FC".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Bluberry Time".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Simping Poets".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Lund Leftovers".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Lund Leftovers 2".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Maryland Mass Murderes".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Team 11".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Team 12".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Team 13".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Team 14".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Team 15".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Team 16".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Team 17".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Team 18".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Team 19".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Team 20".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Team 21".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Team 22".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Team 23".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Team 24".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Team 25".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Team 26".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Team 27".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Team 28".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Team 29".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Team 30".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Team 31".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });
    ALL_TEAMS.lock().unwrap().push(TeamInfo {
        name: "Team 32".to_string(),
        squad: vec![player::generate_new_player(get_name(&name_list))]
    });

    // Loops over all teams and adds additional 14 players
    let length: usize = ALL_TEAMS.lock().unwrap().len();
    for i in 0..length {
        for _j in 0..14 {
            ALL_TEAMS.lock().unwrap()[i].squad.push(player::generate_new_player(get_name(&name_list)));
        }
    }

    set_starters();

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