const fs = require('fs/promises');
const fss = require('node:fs');
var list_user = []
var relist_user = []
var count6 =0
function remove_user(value){
    if (relist_user.indexOf(value) > -1) { 
      relist_user.splice(relist_user.indexOf(value), 1);
        fs.writeFile("./data/arr6.txt", JSON.stringify(relist_user), function() {
            console.log("The file was saved!");
        }); 
    }
}


async function writelv5(a,b,c,d,e) {
  try {
    if(a<10){
      a = "00000"+a
    }else if(a<100){
      a = "0000"+a
    }else if(a<1000){
      a = "000"+a
    }else if(a<10000){
      a = "00"+a
    }else if(a<100000){
      a = "0"+a
    }

    if(a<10){
      b = "000000"+b
    }else if(b<100){
      b = "00000"+b
    }else if(b<1000){
      b = "0000"+b
    }else if(b<10000){
      b = "000"+b
    }else if(b<100000){
      b = "00"+b
    }else if(b<1000000){
      b = "0"+b
    }

    if(d.length<3){
      d = "0"+d
    }
    let content = `${a}||${b}||${c}||${d}||${e} \n`;
    await fs.appendFile('./data/leve5.txt', content);
  } catch (err) {
    console.log(err);
  }
}

async function writelv6(a,b,c,d,e) {
    try {
      if(a<10){
        a = "00000"+a
      }else if(a<100){
        a = "0000"+a
      }else if(a<1000){
        a = "000"+a
      }else if(a<10000){
        a = "00"+a
      }else if(a<100000){
        a = "0"+a
      }
  
      if(b<10){
        b = "000000"+b
      }else if(b<100){
        b = "00000"+b
      }else if(b<1000){
        b = "0000"+b
      }else if(b<10000){
        b = "000"+b
      }else if(b<100000){
        b = "00"+b
      }else if(b<1000000){
        b = "0"+b
      }

      if(d.length<3){
        d = "0"+d
      }
      
      let content = `${a}||${b}||${c}||${d}||${e} \n`;
      await fs.appendFile('./data/leve6.txt', content);
    } catch (err) {
      console.log(err);
    }
  }


async function buff(index){
    return new Promise(resolve => {
        fetch('https://netchuyen.com/user/'+index,{
            method: "GET",
        }).then((response) => response.text()).then((body) => {
                let username = (body.match(/<strong>\n(.*?)\n</)||[])[1];
                if(username == undefined){
                    remove_user(index)
                }else{
                    let levell = (body.match(/<span class="level level-current">Cấp(.*?)</)||[])[1];  
                    let level_curent = (body.match(/<span class="progress-bar" style="width:(.*?)">/)||[])[1];
                    if(levell ==6){
                        writelv6(count6,index,levell,level_curent,username)
                        count6++
                    }else{
                        remove_user(index)
                    }
                }
                resolve()
            })
    })
}


async function main(){

    for(i=0;i<list_user.length;i++){
        await buff(list_user[i])
        console.log(i+"||"+count6)
    }
    console.log("scan lv success")
}


function getidbaner(){
  fss.readFile('./data/arr6.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }else{
      list_user = (JSON.parse(data))
      relist_user = list_user
      main()
    }
  });
}


getidbaner()




