const { json } = require('express');
const fs = require('fs/promises');
const fss = require('node:fs');
var arrdata1 = []

fss.readFile('./data/test.txt', 'utf8', (err, data) => {
    arrdata1 = JSON.parse(data)

    console.log(arrdata1)
    if (arrdata1.indexOf(80085) > -1) { // only splice array when item is found
      arrdata1.splice(arrdata1.indexOf(80085), 1); // 2nd parameter means remove one item only
    }
    console.log(arrdata1)
  });

      

