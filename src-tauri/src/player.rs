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
    // What is the chance that the player will make a shot
    accuracy: u8,
    max_accuracy: u8,
    // higher the attack the higher chance to break through defense
    attack: u8,
    max_attack: u8,
    // higher the defense the higher chance to block a shot
    defense: u8,
    max_defense: u8,
    // higher the pass the higher che chance to successfully pass the ball
    pass: u8,
    max_pass: u8,
    // higher the steal the higher chance to steal the ball during a pass
    steal: u8,
    max_steal: u8,
    // higher the game sense the higher chance to make a good decision
    game_sense: u8,
    max_game_sense: u8,
    // higher the ego the higher chance to make a bad decision despite game sense
    ego: u8,
    pub starter: bool
}

// Hashmap that stores all the players that exist
lazy_static! {
    pub static ref ALL_PLAYERS: Mutex<HashMap<Uuid, PlayerData>> = Mutex::new(HashMap::new());
}

// Generates a new Player with random charactersitics and returns the Uuid associated with that player
pub fn generate_new_player(name: String) -> Uuid {
    let mut rng = rand::thread_rng();
    let accuracy:u8 = rng.gen();
    let max_accuracy:u8 = rng.gen_range(accuracy..=u8::MAX);
    let attack:u8 = rng.gen();
    let max_attack:u8 = rng.gen_range(attack..=u8::MAX);
    let defense:u8 = rng.gen();
    let max_defense:u8 = rng.gen_range(defense..=u8::MAX);
    let pass:u8 = rng.gen();
    let max_pass:u8 = rng.gen_range(pass..=u8::MAX);
    let steal:u8 = rng.gen();
    let max_steal:u8 = rng.gen_range(steal..=u8::MAX);
    let game_sense:u8 = rng.gen();
    let max_game_sense:u8 = rng.gen_range(game_sense..=u8::MAX);
    let ego:u8 = rng.gen();
    let player_id: Uuid = Uuid::new_v4();

    ALL_PLAYERS.lock().unwrap().insert(player_id, PlayerData {
        name: name,
        player_id: player_id.to_string(),
        accuracy,
        max_accuracy,
        attack,
        max_attack,
        defense,
        max_defense,
        pass,
        max_pass,
        steal,
        max_steal,
        game_sense,
        max_game_sense,
        ego,
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