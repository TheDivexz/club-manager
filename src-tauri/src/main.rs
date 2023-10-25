// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::env;

mod player;
mod team;
mod simulate_turn;
mod track_date;
mod on_daily;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    team::generate_teams();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            team::get_players_in_team,
            team::get_team_name,
            team::get_all_team_names,
            team::get_players_display_data,
            team::get_team_lineup,
            on_daily::on_daily,
            track_date::get_date_and_day_of_week_string,
            simulate_turn::simulate_turn,
            player::get_player
            ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
