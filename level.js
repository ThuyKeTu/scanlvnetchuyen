const fs = require('fs/promises');
const fss = require('node:fs');

var link = "https://www.nettruyenvv.com"

var list_chapter = []

var list_users = []

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
  }

  

fss.readFile('./data/listuser.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }else{
        list_users = (JSON.parse(data))
        fss.readFile('./data/listchapter.txt', 'utf8', async (err, data) => {
            if (err) {
            console.error(err);
            return;
            }else{
                list_chapter = (JSON.parse(data))

                main()
            }
        });
    }
  });


async function main(){
    for(i=0;i<list_chapter.length;i++){
        for(j=0;j<list_users.length;j++){
            await read(j, list_chapter[i].chapterId, list_users[j].token, list_users[j].cookie)
        }
        await checkbd()
    }
    main()
  }



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
           console.log(body)
           resolve()
         });
    })
   }

   async function checkbd(){
    return new Promise( async(resolve) => {
        let newday = new Date()

        if(newday.getHours() == 17 && newday.getMinutes() ==5 ){
            for(i=0;i<list_users.length;i++){
                // await baodanh(list_users[i].cookie)
             }
             resolve()
        }else{
            console.log('-----------------------')
            console.log(newday.getHours()+":"+newday.getMinutes())
            setTimeout(resolve,30000)
        }
    })
   }


  async function read(name,chapter,user_token,cookie){
    return new Promise((resolve) => {
        fetch("https://f.nettruyenff.com/Comic/Services/ComicService.asmx/ChapterLoaded", {
        "headers": {
            "accept": "*/*",
            "accept-language": "vi,en-US;q=0.9,en;q=0.8",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Microsoft Edge\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "cookie": cookie,
        },
        "referrer": link+"/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `chapterId=${chapter}&comicToken=3767b01d-86e0-6a70-c3ce-d650ffcc099f&userToken=${user_token}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
        }).then((response) => response.text()).then((body) => {           
            try{
                if(JSON.parse(body).token !=null){
                    let tokens = JSON.parse(body).token
                    fetch("https://f.nettruyenff.com/Comic/Services/ComicService.asmx/Read", {
                    "headers": {
                        "accept": "*/*",
                        "accept-language": "vi,en-US;q=0.9,en;q=0.8",
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "sec-ch-ua": "\"Microsoft Edge\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": "\"Windows\"",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-site",
                        "cookie": cookie,
                        "Referer": link+"/",
                        "Referrer-Policy": "strict-origin-when-cross-origin"
                    },
                    "body": `chapterId=${chapter}&token=${tokens}`,
                    "method": "POST"
                }).then((response) => response.text()).then((body) => {
                    let success = JSON.parse(body)
                    console.log(name+"|"+success.success)
                    resolve()
                });
                }else{
                    console.log(name)
                    resolve()
                }
            }catch(e){
                console.log("----")
                console.log(e)
                resolve()
            }
        })
  })}



  