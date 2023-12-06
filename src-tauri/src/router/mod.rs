use std::{path::PathBuf, sync::Arc};

use rspc::{Config, Router};

pub fn init_router() -> Arc<Router>  {
    let router = <Router>::new()
        .config(
            Config::new()
                .set_ts_bindings_header("/* eslint-disable */")
                .export_ts_bindings(
                    PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("../bindings.d.ts"),
                ),
        )
        .query("version", |t| {
            t(|_, _: ()| async move { env!("CARGO_PKG_VERSION") })
        });

    router.build().arced()
}
