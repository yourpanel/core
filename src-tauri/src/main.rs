// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod router;

#[tokio::main]
async fn main() {
  let router = router::init_router();
  tauri::Builder::default()
    .plugin(rspc::integrations::tauri::plugin(router, || ()))
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
