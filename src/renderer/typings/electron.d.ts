import {Socket} from "node:dgram";

/**
 * Should match main/preload.ts for typescript support in renderer
 */
export default interface ElectronApi {
    createSocket: (type: 'udp4' | 'udp6', callback?: Function) => Socket
}

declare global {
    interface Window {
        electronAPI: ElectronApi,
    }
}
