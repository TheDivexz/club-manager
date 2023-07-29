use crate ::player::{self, PlayerData};
use crate ::team::{self, TeamData};

// Calculate the winner of the match
// Returns true if team1 wins, false if team2 wins
fn calculate_winner(team1: &TeamData, team2: &TeamData) -> bool {
    let mut team1_score: i32 = 0;
    let mut team2_score: i32 = 0;
    // if true, team1's turn, else team2's turn
    let current_turn = false;
    while(team1_score < 21 && team2_score < 21) {
        //get random player from team1
        let mut rng = rand::thread_rng();
        let random_index = rng.gen_range(0..team1.squad.len());
        let player_id = team1.squad[random_index];
        let mut all_players = player::ALL_PLAYERS.lock().unwrap();
        team_one_player = all_players.get_mut(&player_id);
        // get random player from team2
        let random_index = rng.gen_range(0..team2.squad.len());
        let player_id = team2.squad[random_index];
        let mut all_players = player::ALL_PLAYERS.lock().unwrap();
        team_two_player = all_players.get_mut(&player_id);

        if current_turn {
            let total_roll = team_one_player.attack + team_two_player.defense;
            let random_number = rng.gen_range(0..total_roll);
            if random_number <= team_one_player.attack {
                // roll a random number between 0 and 255
                let score_chance = rng.gen_range(0..255);
                if score_chance <= team_one_player.accuracy {
                    team1_score += 1;
                }
            }
        } else {
            let total_roll = team_two_player.attack + team_one_player.defense;
            let random_number = rng.gen_range(0..total_roll);
            if random_number <= team_two_player.attack {
                // roll a random number between 0 and 255
                let score_chance = rng.gen_range(0..255);
                if score_chance <= team_two_player.accuracy {
                    team2_score += 1;
                }
            }
        }
    }
    if team1_score > team2_score {
        return true;
    } else {
        return false;
    }
}