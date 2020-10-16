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
        //return;
    } else {
        console.log('Connect');
        gsrun(client);
    }
});

async function gsrun(cl){
    const gsapi = google.sheets({version:'v4', auth: cl});
    const doc = {
        spreadsheetId: '1RcLADPxuonv-S5kK1551sqUfT4bfyXftRHe8UgTilX4',
        range: 'Class Data!A2:F31'
    }
    let req = await gsapi.spreadsheets.values.get(doc);
    //console.log(req.data.values);
    let reqArray = req.data.values;
    let newReqArray = reqArray.map(function(r){
        r.push(r[0]+'-'+r[1]);
        return r;
    });

    const docUpdate = {
        spreadsheetId: '1RcLADPxuonv-S5kK1551sqUfT4bfyXftRHe8UgTilX4',
        range: 'hot new sheet!!A2',
        valueInputOption: 'USER_ENTERED',
        resource: {values: newReqArray}
    }
    let res = await gsapi.spreadsheets.values.update(docUpdate);

    console.log(res);
}