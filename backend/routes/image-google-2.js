const express = require('express')
const router = express.Router()
const fs = require('fs').promises;
const fsp = require('fs');
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');
const multer = require('multer')

const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
      let ext = path.extname(file.originalname);
      if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        cb(new Error("Unsupported file type!"), false);
        return;
      }
      cb(null, true);
    },
  });

const SCOPES = ['https://www.googleapis.com/auth/drive'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 * 
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
    redirect_uris: key.redirect_uris
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
//   console.log(client)
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  console.log(1)
  if (client.credentials) {
    await saveCredentials(client);
    console.log(2)
  }
  console.log(3)
  return client;
}


async function listFiles(authClient) {
    const drive = google.drive({version: 'v3', auth: authClient});
    const res = await drive.files.list({
      fields: 'nextPageToken, files(id, name)',
    });
    const files = res.data.files;
    if (files.length === 0) {
      console.log('No files found.');
      return;
    }
    console.log(files)
    return files
    // console.log('Files:');
    // files.map((file) => {
    //   console.log(`${file.name} (${file.id})`);
    // });
}

router.get('/all-files', async(req, res) => {
    const fileList = await authorize().then(listFiles).catch(console.error);
    res.send(fileList)
})

async function uploadFile(authClient, file_path)  {
    console.log(file_path)
    // console.log(h)
    const drive = google.drive({version: 'v3', auth: authClient})
    // eslint-disable-next-line no-undef
    // const filePath = path.join(__dirname, 'hero.jpg');
    try{
      const response = await drive.files.create({
            requestBody: {
                name: 'hero.png', //file name
                mimeType: 'image/png',
            },
            media: {
                mimeType: 'image/png',
                body: await fsp.createReadStream(file_path),
            },
        });  
        // report the response from the request
        // console.log(response);
        return  response
    }catch (error) {
        //report the error message
        // console.log(error.message);
        return error.message
    }
}

router.post('/upload', upload.single("image"), async(req, res) => {
    const file_path = req.file.path
    console.log(typeof(file_path))
    const h = String("something")
    const upload = await authorize().then(uploadFile).catch(console.error)
    //  await authorize()
    res.send(upload)
})

module.exports = router