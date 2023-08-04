use crate::player::PlayerData;
use rand::Rng;

fn try_to_pass(passing_player: &PlayerData, pass_blocking_player: &PlayerData, receiving_player: &PlayerData, receive_blocking_player: &PlayerData) -> (bool, String) {
    let mut comment = passing_player.name.clone() + " passes to " + &receiving_player.name;
    let mut rng = rand::thread_rng();

    let pass_total_roll = (passing_player.pass as u16) + (pass_blocking_player.steal as u16);
    let receive_total_roll = (receiving_player.defense as u16) + (receive_blocking_player.steal as u16);

    let pass_random_number = rng.gen_range(0..pass_total_roll);
    let receive_random_number = rng.gen_range(0..receive_total_roll);

    if pass_random_number <= passing_player.pass as u16 {
        if receive_random_number <= receiving_player.defense as u16 {
            return (true, comment);
        }
        comment += "and gets stolen by ";
        comment += &receive_blocking_player.name;
        return (false, comment);
    }
    comment += "and gets stolen by ";
    comment += &pass_blocking_player.name;
    return (false, comment);
}

fn try_to_score(offensive_player: &PlayerData, defensive_player: &PlayerData) -> (bool, String) {
    let mut comment = offensive_player.name.clone() + " shoots ";
    let mut rng = rand::thread_rng();
    let total_roll = (offensive_player.attack as u16) + (defensive_player.defense as u16);
    let random_number = rng.gen_range(0..total_roll);
    if random_number <= offensive_player.attack as u16 {
        // roll a random number between 0 and 255
        let score_chance = rng.gen_range(0..255);
        if score_chance <= offensive_player.accuracy {
            comment += "and scores!";
            return (true, comment);
        }
        comment += "and misses!";
        return (false, comment);
    }
    comment += "and gets blocked by ";
    comment += &defensive_player.name;
    return (false, comment);
}

fn shoot_or_pass_weight(offensive_player: &PlayerData, defensive_player: &PlayerData, offensive_teammate: &PlayerData, defensive_teammate: &PlayerData) -> i16 {
    let shooting_weight = (offensive_player.attack as i16) - (defensive_player.defense as i16);
    let passing_weight = (offensive_player.pass as i16) - (defensive_player.steal as i16);
    let teammate_weight = (offensive_teammate.defense as i16) - (defensive_teammate.steal as i16);

    return shooting_weight + ((passing_weight + teammate_weight) / 2);
}

// True means shoot, false means pass
fn shoot_or_pass(offensive_player: &PlayerData, defensive_player: &PlayerData, offensive_teammate: &PlayerData, defensive_teammate: &PlayerData) -> bool {
    let shooting_weight = (offensive_player.attack as i16) - (defensive_player.defense as i16);
    let passing_weight = (offensive_player.pass as i16) - (defensive_player.steal as i16);
    let teammate_weight = (offensive_teammate.defense as i16) - (defensive_teammate.steal as i16);

    let mut rng = rand::thread_rng();
    let total_weight = shooting_weight + ((passing_weight + teammate_weight) / 2);
    if total_weight <= 0 {
        let do_whatever = rng.gen_range(0..=1);
        if do_whatever == 0 {
            return true;
        }
        return false;
    }
    let random_number = rng.gen_range(0..total_weight);
    if random_number <= shooting_weight {
        return true;
    }
    return false;
}


#[tauri::command]
pub fn simulate_turn(offense_team: [PlayerData; 5], defense_team: [PlayerData; 5]) -> (bool, Vec<String>) {
    let mut commentary: Vec<String> = Vec::new();
    let mut ongoing_turn = true;
    let mut did_score = false;
    // determines which row is being used
    let mut random_row = rand::thread_rng().gen_range(0..=4);
    let mut offense_player = &offense_team[random_row];
    let mut defense_player = &defense_team[random_row];

    while ongoing_turn {
        // determines if the player will make a smart decision or be a ball hog
        let ego_game_sense_total = (offense_player.ego as u16) + (offense_player.game_sense as u16);
        let random_number = rand::thread_rng().gen_range(0..=ego_game_sense_total);
        let will_make_smart_decision = random_number <= ego_game_sense_total;

        if will_make_smart_decision {
            // determine which teamates to potentially pass to
            let decision: bool;
            let neighbor: usize;
            // if the player is in the top row, only pass to the row below
            if random_row == 0 {
                decision = shoot_or_pass(offense_player, defense_player, &offense_team[1], &defense_team[1]);
                neighbor = 1;
            }
            // if the player is in the bottom row, only pass to the row above
            else if random_row == 4 {
                decision = shoot_or_pass(offense_player, defense_player, &offense_team[3], &defense_team[3]);
                neighbor = 3;
            }
            else {
                // determine which neighbor to pass to
                let weight_above = shoot_or_pass_weight(offense_player, defense_player, &offense_team[random_row - 1], &defense_team[random_row - 1]);
                let weight_below = shoot_or_pass_weight(offense_player, defense_player, &offense_team[random_row + 1], &defense_team[random_row + 1]);
                if weight_above > weight_below {
                    decision = shoot_or_pass(offense_player, defense_player, &offense_team[random_row - 1], &defense_team[random_row - 1]);
                    neighbor = random_row - 1;
                }
                else {
                    decision = shoot_or_pass(offense_player, defense_player, &offense_team[random_row + 1], &defense_team[random_row + 1]);
                    neighbor = random_row + 1;
                }
            }

            if decision {
                let results: (bool, String) = try_to_score(offense_player, defense_player);
                commentary.push(results.1);
                did_score = results.0;
                ongoing_turn = false;
            }
            else {
                let results: (bool, String) = try_to_pass(offense_player, defense_player, &offense_team[neighbor], &defense_team[neighbor]);
                commentary.push(results.1);
                if !results.0 {
                    ongoing_turn = false;
                }
                else {
                    // determines which row is being used
                    random_row = neighbor;
                    offense_player = &offense_team[random_row];
                    defense_player = &defense_team[random_row];
                }
            }

        }
        // "Screw passing the ball, I'm him" - The Player who is assuradly not him
        else {
            let results = try_to_score(offense_player, defense_player);
            commentary.push(results.1);
            did_score = results.0;
            ongoing_turn = false;
        }
    }
    return (did_score, commentary);
}