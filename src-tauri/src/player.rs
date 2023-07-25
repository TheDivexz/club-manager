use std::{collections::HashMap, u8};
use lazy_static::lazy_static;
use serde::{Serialize, Deserialize};
use std::sync::Mutex;
use rand::Rng;
use uuid::Uuid;
use std::clone::Clone;

// Allows for the Player Data to be cloned and the compiler ignores unused code 
#[derive(Clone,Debug, Serialize, Deserialize)]
#[allow(dead_code)]
pub struct PlayerData {
    pub name: String,
    player_id: String,
    speed: u8,
    max_speed: u8,
    accuracy: u8,
    max_accuracy: u8,
    attack: u8,
    max_attack: u8,
    defense: u8,
    max_defense: u8,
    stamina: u8,
    max_stamina: u8,
    pub starter: bool
}

// Hashmap that stores all the players that exist
lazy_static! {
    pub static ref ALL_PLAYERS: Mutex<HashMap<Uuid, PlayerData>> = Mutex::new(HashMap::new());
}

// Generates a new Player with random charactersitics and returns the Uuid associated with that player
pub fn generate_new_player(name: String) -> Uuid {
    let mut rng = rand::thread_rng();
    let speed:u8 = rng.gen();
    let max_speed:u8 = rng.gen_range(speed..=u8::MAX);
    let accuracy:u8 = rng.gen();
    let max_accuracy:u8 = rng.gen_range(accuracy..=u8::MAX);
    let attack:u8 = rng.gen();
    let max_attack:u8 = rng.gen_range(attack..=u8::MAX);
    let defense:u8 = rng.gen();
    let max_defense:u8 = rng.gen_range(defense..=u8::MAX);
    let stamina:u8 = rng.gen();
    let max_stamina:u8 = rng.gen_range(stamina..=u8::MAX);
    let player_id: Uuid = Uuid::new_v4();

    ALL_PLAYERS.lock().unwrap().insert(player_id, PlayerData {
        name: name,
        player_id: player_id.to_string(),
        speed,
        max_speed,
        accuracy,
        max_accuracy,
        attack,
        max_attack,
        defense,
        max_defense,
        stamina,
        max_stamina,
        starter: false
    });

    return player_id;

}


// // Access and mutate the static HashMap
// MY_MAP.lock().unwrap().insert(1, "Hello".to_string());
// MY_MAP.lock().unwrap().insert(2, "World".to_string());

// // Access the values in the HashMap
// println!("{:?}", MY_MAP.lock().unwrap().get(&1));
// println!("{:?}", MY_MAP.lock().unwrap().get(&2));