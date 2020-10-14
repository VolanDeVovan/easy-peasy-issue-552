const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron')
const path = require('path')

const isDev = process.env.NODE_ENV === 'development';

let mainWindow;

function createWindow() {
    console.log(`app path: ${app.getPath('appData')}`)

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            allowRunningInsecureContent: true,
            enableRemoteModule: true
        }
    })

    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`,
        {
            userAgent: 'ReactiveLauncher'
        }
    );

    if (isDev) {
        globalShortcut.register('CommandOrControl+R', () => {
            mainWindow.reload();
        });

        globalShortcut.register('F5', () => {
            mainWindow.reload();
        });

        mainWindow.webContents.openDevTools();
    }
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
