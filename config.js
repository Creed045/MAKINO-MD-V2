const fs = require("fs");
const chalk = require("chalk");

//to enable function - true
//to disable function - false
//
global.available = false;
global.autoReadGc = false;
global.autoReadAll = false;
global.antitags = false;


//auto functioner
global.autoTyping = false;                //make true to enable auto typing
global.autoRecord = true;                //make true to enable auto recording
global.groupevent = true;                //This is the new variable for controlling group event handling.
global.statusseen = false;                 //make true to view statuses 
global.ANTI_BOT = false;
global.PM_BLOCKER = false;
global.CHATBOT = false;

global.SESSION_ID = process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkVqajZ1ZUo2NStBT002SkMrODdyckVQTGs4RHhOcWNYMEZvS1V1SkRXcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRS8ydVRDUGFrTDNnVGpuczFGTWV3NkFQS292QlU0bVJvdkZsTGVTRjVnST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJSDkxQU14MXJVelJRSVZJQmZlb3FKSk51bXNZcEU3bm5WNEs2ZTN4M0ZJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvY3FqMGhHaU1qTjhWRzdPVVhKMmlnNHdzU0ZEV0ljY1VwZHEreGc3ZWxjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllHa3lqWFdOZnZGMG1lYklicXpqVDI2dW4xbWZlM1RsazlmaGJNVDlrM0U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNHN3BpWGtLV0FsQU5tdEdZaWY2OUx5VmkwanFFa1Raa3dNOGVodDRiemM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUpQWjZaU3ZDQ1AvaXQ5aVlPbE5ITGVUelZ1WU1PakZwWUx5WnhGb21FWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiclhpNUtmS0Q2RnM2YklmZEMwSnB4ZlA1Tkd3SkI1U29pZjVyS2ZQK2JEcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZEaEh0VG9XbHdDTis5dDFtbXRyakxLa0ZBdU1uQW4zUXpwN2VIdUFMUzh2dElVZ21Dbld2UXZhYUYyb3BXNlUvb0VhSHQxOTMzWThiQnZBMTZYbUR3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjMxLCJhZHZTZWNyZXRLZXkiOiJSUDF4TnYzK3I0SGRxYWFjeTJSakprdWNrc2RPNU9WV1krVTYwQ3RRUUV3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgxNjMyNTIxMzFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQ0MxRTM4MDk1QTdFNDRFMTYyQzY5QzZGMDc0QjVGN0MifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNTU0Mzk4M30seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODE2MzI1MjEzMUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzMzg5NjQ4ODQ0MDEyQkZDRUJFRjY0NjgxRTAxNzc5MSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI1NTQzOTg0fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJMNWRWcUJ2clRfR1A0VHY4X29Ga3RnIiwicGhvbmVJZCI6ImNhMTFiYjRhLWI5MGYtNDIxNy05NDFiLTg4NzYzYTEyNDdkMCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTUThuekhjVXpXQ3JTTENxSThPRFNRdkgzOGs9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0xJTk1yZlpCKzZNdHBkVjR5c0tQa3U2SGowPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlpGSkJFRzQ2IiwibWUiOnsiaWQiOiIyMzQ4MTYzMjUyMTMxOjIzQHMud2hhdHNhcHAubmV0IiwibmFtZSI6ImV6ZWFndWVtbWFudWVsNzkxIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJdnhqTzBHRUozczVyWUdHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIwd3Y5bGlkQjQ2ajc4d0tVa3JYdm9oRGg3MVppSGNqY3BoOFhjTzlqc3cwPSIsImFjY291bnRTaWduYXR1cmUiOiIzc2diQllRSmo2ZFlkancyalQzZHR1RVpyTE1UTXdqUkNuM3lLVlFFQnZib2JEdVd1T3l5NGR3c0tqaHo3NWhvaU55TGoyYVVudGg5cXU0WXRzb2REUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiUndUc2RRSG5uMU1JNTZ1WVhCVmlhanNRaHdKbFRmUnVzWEdobkR4Ky9WeUVrN1BvbEp0OGRwR3ZMQmZMc3FWNlM3b2NWQnhyV3Jla1Jhb1hUMDFERGc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTYzMjUyMTMxOjIzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmRNTC9aWW5RZU9vKy9NQ2xKSzE3NklRNGU5V1loM0kzS1lmRjNEdlk3TU4ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjU1NDM5NzksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSUNrIn0="
global.Owner = ["2348138686232"]; //like 2347080968564 
global.OwnerName =  "Tᴀɪʀᴀ Mᴀᴋɪɴᴏ";
global.BotName = "♱MAKINO-MD-V2♱♡⃤";
global.packname = "♱MAKINO-MD-V2♱♡⃤";                             //Do not change.
global.author = "TAIRA MAKINO";                               //Do not change.
global.BotSourceCode = "https://github.com/anonphoenix007/MAKINO-MD-V2"; //Do not change.
global.SupportGroupLink = "https://chat.whatsapp.com/DOVRqF006VHHZhiSNwJRce"; 
global.SupportGroupLink = "https://chat.whatsapp.com/DOVRqF006VHHZhiSNwJRce"; //Do not change!
global.menutype = "v3"

global.prefa = ['','!','.',','] 

//
global.BotLogo = fs.readFileSync("./Assets/pic1.jpg");
global.Thumb = fs.readFileSync("./Assets/pic7.jpg");
global.Thumb1 = fs.readFileSync("./Assets/pic5.jpg");
global.ErrorPic = fs.readFileSync("./Assets/pic7.jpg");
global.OwnerNumber = [""] //Ignore,Unused

//
global.ntilinkytvid = []
global.ntilinkytch = []
global.ntilinkig = []
global.ntilinkfb = []
global.ntilinktg = []
global.ntilinktt = []
global.ntilinktwt = []
global.ntilinkall = []
global.nticall = []
global.ntwame = []
global.nttoxic = []
global.ntnsfw = []
global.ntvirtex = []
global.rkyt = []
global.wlcm = []
global.gcrevoke = []
global.autorep = []
global.ntilink = []


//
global.mess = {
    jobdone: 'Here you go...',
    useradmin: 'Only group Admin can use the command 😂 ',
    botadmin: 'Make me Admin first 😌📍.',
    botowner: 'Only my *Owner* can use this command!',
    grouponly: 'This command is only made for *Groups*',
    privateonly: 'This command is only made for *Private Chat*',
    botonly: 'Only the *Bot itself* can use this command!',
    waiting: 'Wait a lil bit (¬_¬)ﾉ...',
    nolink: ' provide me *link*',
    error: 'An error occurd!',
    banned: 'You cant use the commands because you Are *Banned*',
    bangc: 'This Group is *Banned* from using Commands!',
    nonsfw: 'Dont be a pervert,idiot! This is not a NSFW enabled group!'
    
}
