const { GoogleSpreadsheet } = require('google-spreadsheet');
const { promisify } = require('util');

const creds = require('./BISC-0cf16656003a.json');
const doc = new GoogleSpreadsheet('1RcLADPxuonv-S5kK1551sqUfT4bfyXftRHe8UgTilX4');

async function accessSpreadsheet(){
    // const doc = new GoogleSpreadsheet('17VaFhQAjdGkXPsPJVcRbo8C2au9A3n9n7q27VOMp3Sw');
    // await promisify(doc.useServiceAccountAuth)(creds);
    // const info = await promisify(doc.getInfo);
    // const sheet = info.worksheets[0];
    // console.log(`Title: ${sheet.title}, Rows: ${sheet.rowCount}`);
    await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key,
      });
//     // OR load directly from json file if not in secure environment
// await doc.useServiceAccountAuth(require(creds));
// // OR use service account to impersonate a user (see https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority)
// await doc.useServiceAccountAuth(require(creds), creds.client_email);
// // OR use API key -- only for read-only access to public sheets
// doc.useApiKey(creds.private_key);

      await doc.loadInfo(); // loads document properties and worksheets
      console.log(doc.title);
    
      const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
      console.log(sheet.title);
      console.log(sheet.rowCount);
      

      // const row = {
      //   studentname: 'test',
      //   gender: 'wer',
      //   classlevel: 'zxc',
      //   homestate: 'asd',
      //   major: 'qwe',
      //   extracurricularactivity: 'ert'
      // }

      //await promisify(sheet.addRows)(row);
    
      //   await promisify(sheet.addRows(2,{
    //     studentname: 'test',
    //     gender: 'wer',
    //     classlevel: 'zxc',
    //     homestate: 'asd',
    //     major: 'qwe',
    //     extracurricularactivity: 'ert'
    //   }));
    
    // function addProduct() {
    //   var sheet = SpreadsheetApp.getActiveSheet();
    //   sheet.appendRow(['studentname', 'css004']);
    // }

    //await promisify(addProduct);
    //await doc.addSheet({ title: 'hot new sheet!' });
    //await doc.addRow(row);
    
    //const sheet = await doc.addSheet({ headerValues: ['studentname','gender','classlevel','homestate','major','extracurricularactivity'] });
    //const rows = await sheet.getRows();
    //console.log(rows[0].name); 

      
}

accessSpreadsheet();