const fs = require('fs/promises');
const fss = require('node:fs');
const link = "https://www.nettruyenvv.com"

fss.readFile('./data/listuser.txt', 'utf8', async(err, data) => {
    if (err) {
      console.error(err);
      return;
    }else{
        list_users = (JSON.parse(data))
        
        console.log(list_users.length)
        for(i=0;i<list_users.length;i++){
           await baodanh(list_users[i].cookie)
        }
       
    }
  });



async function baodanh(cookie){
 return new Promise((resolve) => {
    fetch(link+"/Comic/Services/UserService.asmx/Attend", {
        "headers": {
          "accept": "application/json, text/javascript, */*; q=0.01",
          "accept-language": "vi,en-US;q=0.9,en;q=0.8",
          "sec-ch-ua": "\"Microsoft Edge\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
          "sec-ch-ua-arch": "\"x86\"",
          "sec-ch-ua-bitness": "\"64\"",
          "sec-ch-ua-full-version": "\"123.0.2420.53\"",
          "sec-ch-ua-full-version-list": "\"Microsoft Edge\";v=\"123.0.2420.53\", \"Not:A-Brand\";v=\"8.0.0.0\", \"Chromium\";v=\"123.0.6312.59\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-model": "\"\"",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-ch-ua-platform-version": "\"15.0.0\"",
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