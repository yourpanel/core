use tauri::{plugin::{Builder, TauriPlugin}, Runtime};
use wasmtime::*;

/// Initializes the plugin.
pub fn init<R: Runtime>() -> Result<TauriPlugin<R>, wasmtime::Error> {
  let engine = Engine::default();
  let module = Module::from_file(&engine, "").unwrap();
  let mut store = Store::new(&engine, ());
  let instance = Instance::new(&mut store, &module, &[]).unwrap();
  let adder = instance.get_typed_func::<(i32, i32), i32>(&mut store, "adder")?;
  let result = adder.call(&mut store, (1,2))?;
  println!("result is {:?}", result);
  Ok(Builder::new("plugin-loader").build())
}