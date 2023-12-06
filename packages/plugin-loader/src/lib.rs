use tauri::{plugin::{Builder, TauriPlugin}, Runtime};

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new("plugin-loader").build()
}