import { client } from '.'

export async function getVersion() {
  return await client.query(['version'])
}
