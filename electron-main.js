const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  // Load the local web build if present, otherwise load dev localhost
  const indexPath = path.join(__dirname, 'web-build', 'index.html');
  win.loadFile(indexPath).catch(() => {
    win.loadURL('http://localhost:19006'); // expo web dev server
  });
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
