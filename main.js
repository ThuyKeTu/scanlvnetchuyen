const fs = require('fs/promises');
const fss = require('node:fs');


async function writeIdban(id) {
  try {
    let content = id+'\n'
    await fs.appendFile('./data/banid.txt', content);
  } catch (err) {
    console.log(err);
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
      await fs.appendFile('./data/leve6.txt', content);
    } catch (err) {
      console.log(err);
    }
  }

var count5 = 1;
var count6 = 1;
var startid = 1
var endid = 1574287;

async function buff(index){
    return new Promise(resolve => {
        fetch('https://netchuyen.com/user/'+index,{
            method: "GET",
        }).then((response) => response.text()).then((body) => {
                let username = (body.match(/<strong>\n(.*?)\n</)||[])[1];
                if(username == undefined){
                    writeIdban(index)
                }else{
                  let levell = (body.match(/<span class="level level-current">Cấp(.*?)</)||[])[1];  
                  let level_curent = (body.match(/<span class="progress-bar" style="width:(.*?)">/)||[])[1];
                  if(levell ==5){
                      writelv5(count5,index,levell,level_curent,username)
                      count5++
                  }else if(levell ==6){
                      writelv6(count6,index,levell,level_curent,username)
                      count6++
                  }
                }
                resolve()
            })
    })
}


async function main(){

    for(i=startid;i<=endid;i++){
      if(i%222 ==0){
        let newcount = `${i}||${count5}||${count6}`
        fs.writeFile("./data/status.txt", newcount, function(err) {
          if(err) {
              return console.log(err);
          }
          console.log("The file was saved!");
        }); 
      }
      
        if(idbanner.includes(i.toString())){
          console.log("co")
        }else{
          await buff(i)
          console.log(i+"||"+count5+"||"+count6)
        }
    }
}

var idbanner = []

function getidbaner(){
  fss.readFile('./data/status.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }else{
      startid = data.split('||')[0]
      count5 = data.split('||')[1]
      count6 = data.split('||')[2]
      console.log(startid,count5,count6)
    }
  });
  

  fss.readFile('./data/banid.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }else{
      idbanner =data.split('\n')
      setTimeout(main,3000)
    }
  });
}


getidbaner()




