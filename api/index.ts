import { createClient } from "@rspc/client";
import { TauriTransport } from "@rspc/tauri";
import type { Procedures } from "../bindings"

export const client = createClient<Procedures>({
    transport: new TauriTransport(),
});