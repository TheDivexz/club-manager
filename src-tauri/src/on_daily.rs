use crate::track_date::{self};

#[tauri::command]
pub fn on_daily() {
    track_date::increment_date();
}