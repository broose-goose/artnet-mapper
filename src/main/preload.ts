import {contextBridge} from 'electron';
import * as dgram from "dgram";

contextBridge.exposeInMainWorld('electronAPI', {
    createSocket: dgram.createSocket
})
