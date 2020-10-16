const {google} = require('googleapis');
const creds = require('./BISC-0cf16656003a.json');

const client = new google.auth.JWT(
    creds.client_email,
    null,
    creds.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function(err,tokens){
    if(err){
        console.log(err);
        return;
    } else {
        console.log('Connect');
        gsrun(client);
    }
});

async function gsrun(cl){
    const gsapi = google.sheets({version:'v4', auth: cl});
    const doc = {
        spreadsheetId: '1RcLADPxuonv-S5kK1551sqUfT4bfyXftRHe8UgTilX4',
        range: 'Class Data!A2:F2'
    }
    let req = await gsapi.spreadsheets.values.get(doc);
    console.log(req.data);
}