
const fs = require('fs/promises');
const fss = require('node:fs');
var link = "https://www.nettruyenvv.com"

fss.readFile('./data/listuser.txt', 'utf8', async(err, data) => {
    if (err) {
      console.error(err);
      return;
    }else{
        list_users = (JSON.parse(data))
        
        for(i=0;i<list_users.length;i++){
           await spinner(list_users[i].cookie)
        }
       
    }
  });



async function spinner(cookie){
 return new Promise((resolve) => {
    fetch(link+"/Comic/Services/UserService.asmx/SpinWheel", {
  "headers": {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "en",
    "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest",
    "cookie": cookie,
    "Referer": link+"/Secure/UserPoints.aspx",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "POST"
}).then((response) => response.text()).then((body) => {
  let value = JSON.parse(body)
        console.log(value.message)
        resolve()
      });
 })
}





