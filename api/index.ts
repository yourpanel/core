import { NoOpTransport, RSPCError, createClient, randomId } from '@rspc/client'
import type { Client, OperationType } from '@rspc/client'
import type { UnlistenFn } from '@tauri-apps/api/event'
import type { Procedures } from '../bindings'

/**
 * Workaround for https://github.com/tauri-apps/tauri/issues/6226. Since NextJS
 * executes all code on the server, simply importing the Tauri API will cause
 * an error.
 */
export class ClientTauriTransport extends NoOpTransport {
  private requestMap = new Map<string, (data: any) => void>()
  private listener?: Promise<UnlistenFn | null>
  clientSubscriptionCallback?: (id: string, value: any) => void

  constructor() {
    super()

    import('@tauri-apps/api').then((tauri) => {
      this.listener = tauri.event
        .listen('plugin:rspc:transport:resp', (event) => {
          const { id, result } = event.payload as any
          if (result.type === 'event') {
            if (this.clientSubscriptionCallback)
              this.clientSubscriptionCallback(id, result.data)
          }
          else if (result.type === 'response') {
            if (this.requestMap.has(id)) {
              this.requestMap.get(id)?.({
                type: 'response',
                result: result.data,
              })
              this.requestMap.delete(id)
            }
          }
          else if (result.type === 'error') {
            const { message, code } = result.data
            if (this.requestMap.has(id)) {
              this.requestMap.get(id)?.({ type: 'error', message, code })
              this.requestMap.delete(id)
            }
          }
          else {
            console.error(`Received event of unknown method '${result.type}'`)
          }
        })
        .catch((err) => {
          console.warn(
            'Error while creating Tauri transport listener. If we aren\'t running in a Tauri webview, you can ignore this.',
            err,
          )
          return null
        })
    })
  }

  async doRequest(
    operation: OperationType,
    key: string,
    input: string,
  ): Promise<any> {
    if (this.listener)
      await this.listener

    const id = randomId()
    let resolve: (data: any) => void
    const promise = new Promise((res) => {
      resolve = res
    })

    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    this.requestMap.set(id, resolve)

    const appWindow = await import('@tauri-apps/api').then(
      tauri => tauri.window.appWindow,
    )

    await appWindow.emit('plugin:rspc:transport', {
      id,
      method: operation,
      params: {
        path: key,
        input,
      },
    })

    const body = (await promise) as any
    if (body.type === 'error') {
      const { code, message } = body
      throw new RSPCError(code, message)
    }
    else if (body.type === 'response') {
      return body.result
    }
    else {
      throw new Error(`RSPC Tauri doRequest received invalid body type '${body?.type}'`)
    }
  }
}

// eslint-disable-next-line import/no-mutable-exports
export let client: Client<Procedures>

export function initClient() {
  client = createClient<Procedures>({
    transport: new ClientTauriTransport(),
  })
}
