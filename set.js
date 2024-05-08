const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0RyOWY3NHVTZ0pGNzE3b2J5ZkhxTTRNN2J2VDZ2T3pOS0RCT2tCWUFHST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZGRrSjJUNVUwMnFQZE02b2ZtOE5UY1hzYlM5K2czNVhjZFNNQkpXb3JEdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRS2RSWFA1TzhUekY2UDM3VUlkZFRjN1hCd0psZUlDV1dNNHZsQ0ZuSDJjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyamhJRWhkakw0WU5PWUIrVll5WHVlZUhabmx1amRsaVdYWUl2bkpCTFRrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtEa3pRQ1RxSzFxNVI3ekJPV2l5a1liTWhkYmg4UEEvWVdKUG1zbnVzbjA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlYxdGF4Ni9NZXBvQy9NYmRHdEpqZmw0OTkwa3JiK3c2RFBZRnNKN0RvU2M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidVBvaEJIV0pMVTg2cmpkMk55clh6bDhTK2N3MjMxN1BsdlBWK252TmFHdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlFhMzY5aFR2b2ZFSVdvSlZ4MjRoSzI3dzYyQzh6UUdOYjVMRjlTd0pBND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhjNzRnTmsrSWpNY0NzMUt2RUdKejEyVmI1bG5QenAwMzF2c2FRbm9xcC8xd2l2VWY1bGdiMFNWSXA3eG96UEpOeXJjN1FMaTVnanRyaklZSUF4dWl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ1LCJhZHZTZWNyZXRLZXkiOiJyV3Z5bjVyc1lKTzRTM1M3bjU2c24zTmhPTDlxbnNsYW1BYWVIQjR0bEMwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDExMTQwMjAwM0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI4RjhCNEQxMTg3QzdDMzQxQ0U2MUMwNTNBMzgzMzg4QyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzE1MTcyNTY2fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQxMTE0MDIwMDNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQzdDMTY3NkJGNEYxNjUxREEwN0FGQkMyQkU5MzlBQkYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcxNTE3MjU2Nn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiSW80bml1cWJRZzYwNWxNY2liT1NXUSIsInBob25lSWQiOiJmOTMzZGUwNy1jNDRiLTQxZGMtYWU0Yi0zMDAxOTEzZDU3MTQiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia3Erd3ZEOUV4NzdPV2x1N1lGMkZvejc4L2ZNPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRnWUVRMWs4TlJqcXFvN1QrRUlRbkszbktETT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJaNVZOWkRFUCIsIm1lIjp7ImlkIjoiMjU0MTExNDAyMDAzOjhAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiU2htZWxsbyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSkRPbVAwSEVNZnA3YkVHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiRk5hdWdDZVJ5M2RQWHEySERQTjZqK1JtNTJuUjVKNXUyQ2tLMFF5T2RCUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiQXkvM3ZoOHNVZVUxdHU3em5mMGVjQndpU2lnbzlHbkIzQ3dlOUFiWUFpb29ScFRQc2NSY0dPZWJtRklvYTBBSzVDT0dQYUYzNzdKOTJPWWlEQ3VaQWc9PSIsImRldmljZVNpZ25hdHVyZSI6IkYyMEhINEd4TVBNd1ZpZUQ1U01oU0pIay9yblBjOVFBNDNUYXFhVHAxem1leGkxUnc0TWlGZ2tMYTFjT3o2TzZ3ZDkrSVJ5K1piTlBFY2pha0ZnU2pRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0MTExNDAyMDAzOjhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUlRXcm9BbmtjdDNUMTZ0aHd6emVvL2tadWRwMGVTZWJ0Z3BDdEVNam5RVSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxNTE3MjU2NCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFMbHAifQ==',
    PREFIXE: process.env.PREFIX || "👽",
    OWNER_NAME: process.env.OWNER_NAME || "kîngkong👽",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "0111402003",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'kingkong',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/071f797dda6aef5ae3877.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
