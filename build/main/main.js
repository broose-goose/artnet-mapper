"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = require("path");
function createWindow() {
    const mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: (0, path_1.join)(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        }
    });
    if (process.env.NODE_ENV === 'development') {
        const rendererPort = process.argv[2];
        mainWindow.loadURL(`http://localhost:${rendererPort}`);
    }
    else {
        mainWindow.loadFile((0, path_1.join)(electron_1.app.getAppPath(), 'renderer', 'index.html'));
    }
}
electron_1.app.whenReady().then(() => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.NODE_ENV === 'development') {
        try {
            const { installExt } = yield Promise.resolve().then(() => __importStar(require("./installDevTool")));
            yield installExt();
        }
        catch (e) {
            console.log("Could not install extension");
        }
    }
    createWindow();
    electron_1.session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: Object.assign(Object.assign({}, details.responseHeaders), { 'Content-Security-Policy': ['script-src \'self\''] })
        });
    });
    electron_1.app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
}));
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
electron_1.ipcMain.on('message', (event, message) => {
    console.log(message);
});
