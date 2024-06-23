const { app, BrowserWindow, ipcMain } = require('electron/main');
const { platform } = require('node:process');
const path = require('node:path');

// const {
//   default: installExtension,
//   REDUX_DEVTOOLS,
//   REACT_DEVELOPER_TOOLS,
// } = require('electron-devtools-installer');

console.log(`This platform is ${platform}`);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');
};

app.whenReady().then(() => {
  // installExtension(REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS)
  //   .then((name) => console.log(`Added Extension:  ${name}`))
  //   .catch((err) => console.log('An error occurred: ', err));

  ipcMain.handle('ping', () => 'pong');

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
