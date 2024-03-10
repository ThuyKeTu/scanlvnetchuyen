const { json } = require('express');
const fs = require('fs/promises');
const fss = require('node:fs');
var arrdata = []

// fs.writeFile("./data/test.txt", JSON.stringify(data), function(err) {
//     if(err) {
//         return console.log(err);
//     }
//     console.log("The file was saved!");
//   }); 

fss.readFile('./data/leve5.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }else{
        let arr = data.split('\n')
        arr.map((data)=>{
            if(parseInt(data.slice(8,15)) >0)
                arrdata.push(parseInt(data.slice(8,15)))
        })
       fs.writeFile("./data/arr5.txt", JSON.stringify(arrdata), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        }); 
    }
  });

