use lazy_static::lazy_static;
use std::{sync::Mutex, fs::File, io::Read};
use uuid::Uuid;
use serde_json;
use serde::{Deserialize, Serialize};
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

// Structured data for displaying player information in a table
#[derive(Serialize)]
pub struct PlayerTableData {
    key: String,
    name: String,
    average: u8,
    attack: u8,
    defense: u8,
    accuracy: u8,
    pass: u8,
    steal: u8,
    game_sense: u8,
    ego: u8
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
    new_team("Brooklyn Dead Presidents".to_string(),&name_list); //Jay-Z's Dead Presidents II
    new_team("Miami Black Balloons".to_string(),&name_list); //Denzel Curry's BLACK BALLOONS | 13LACK 13ALOONZ
    new_team("Derry Killer Clowns".to_string(),&name_list); //Steven King's It
    new_team("El Barrio Caciques".to_string(),&name_list); // El Barrio is an alt name for East Harlem, 2Pac is named after Tupac Amaru II who was
    // a cacique or chif of an andean rebellion against the spanish
    // USC North
    new_team("Cleavland Moonmen".to_string(),&name_list); // Kid Cudi's Man on the Moon
    new_team("Baltimore Feasting Crows".to_string(),&name_list); // GRR Martin's Feast of Crows
    new_team("West Reading Anti-Heros".to_string(),&name_list); // Taylor Swift's Anti-Hero
    new_team("Columbus Heathens".to_string(),&name_list); // 21 Pilots's Heathen
    // USC South
    new_team("Palm Beach Dangerous Rings".to_string(),&name_list); //Ariana Grande's Dangerous Woman and 7 Rings
    new_team("Nashville Flowers".to_string(),&name_list); // Mily Cyrus's Flowers
    new_team("Houston Astrobirds".to_string(),&name_list); // Travis Scott's Astroworld and Birds in the Trap Sing McKnight
    new_team("Gary Smooth Criminals".to_string(),&name_list); // Michael Jackson's Smooth Criminal
    // USC West
    new_team("Las Vegas Couriers".to_string(),&name_list); //New Vegas MC is called Courier
    new_team("St.Jospeh Toy Soldiers".to_string(),&name_list); //Eminem's Toy Soldiers
    new_team("Compton Steppers".to_string(),&name_list); //Kendrick Lamar's Big Steppers
    new_team("Colorado Springs Natives".to_string(),&name_list); // OneRepublic's album Native
    // American Patriot Conference
    // APC East
    new_team("Dallas Ice Ice Babies".to_string(),&name_list); //Vanilla Ice's Ice Ice Baby
    new_team("Seattle Songbirds".to_string(),&name_list); // Kenny G's Songbird
    new_team("Philadelphia Fresh Princes".to_string(),&name_list); // Will Smith Fresh Prince of Bel-Air
    new_team("Brownsville Sirens".to_string(),&name_list); // Ka's Orphereus vs the Sirens
    // APC North
    new_team("Milwaukee Chocolatiers".to_string(),&name_list); //Gene Wilder as Willy Wonka, a Chocolatier
    new_team("Grosse Pointe Jazz".to_string(),&name_list); // JK Simmon's role in Whiplash
    new_team("Minneapolis Purple Rain".to_string(),&name_list); //Prince's Purple Rain
    new_team("Chicago Monsters".to_string(),&name_list); // Kanye West's Monster
    // APC South
    new_team("Atlanta Rockets".to_string(),&name_list); // Migos's Takeoff
    new_team("Florida 305s".to_string(),&name_list); // Pitbull aka Mr.305
    new_team("New Orleans Millions".to_string(),&name_list); // Lil Wayne's A Milli
    new_team("Fayetteville Born Sinners".to_string(),&name_list); // J Cole's Born Sinners
    // APC West
    new_team("Los Angeles Red Hot Chili Peppers".to_string(),&name_list); // Red Hot Chili Peppers
    new_team("Long Beach Doggs".to_string(),&name_list); //Snoop Dogg
    new_team("Seattle Foo Fighters".to_string(),&name_list); //Foo Fighters
    new_team("Pheonix Society of Invisibles".to_string(),&name_list); //The Society of Invisibles

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

#[tauri::command]
pub fn get_players_display_data(team_id: usize) -> Vec<PlayerTableData>{
    let squad_info: Vec<PlayerData> = get_players_in_team(team_id);
    let mut squad_table_info: Vec<PlayerTableData> = vec![];
    for squadie in squad_info {
        squad_table_info.push(PlayerTableData { 
            key: squadie.player_id.clone(),
            name: squadie.name.clone(), 
            average: player::calculate_player_average(&squadie), 
            attack: squadie.attack, 
            defense: squadie.defense, 
            accuracy: squadie.accuracy, 
            pass: squadie.pass, 
            steal: squadie.steal, 
            game_sense: squadie.game_sense, 
            ego: squadie.ego
        })
    }
    return squad_table_info;
}