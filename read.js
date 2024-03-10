const { json } = require('express');
const fs = require('fs/promises');
const fss = require('node:fs');
var arrdata = []

fss.readFile('./data/arr5.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }else{
        console.log(JSON.parse(data))
    }
  });

