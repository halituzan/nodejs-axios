'use strict';

const mysql = require('mysql');
const axios = require('axios');


let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bboxpr'
});

connection.connect(function (err) {
  if (err) throw err;

  console.log('MySQL bağlantısı başarıyla gerçekleştirildi.');

});

// var jsonapisi = "https://www.binance.com/api/v3/ticker/bookTicker";
// var myJsonObject = JSON.parse(jsonapisi);

const getBreeds = async () => {
  try {
    return await axios.get('https://www.binance.com/api/v3/ticker/bookTicker')
  } catch (error) {
    console.error(error)
  }
};

const countBreeds = async () => {
  const turler = await getBreeds()

  if (turler.data) {
    // console.log(turler.data)
    var symbol = turler.data.symbol;
    var bidPrice = turler.data.bidPrice;
    var bidQty = turler.data.bidQty;
    var askPrice = turler.data.askPrice;
    var askQty = turler.data.askQty;



    let sqlSorgusu = 'INSERT INTO coins VALUES(NULL, ?, ?, ?, ?, ?);';
    let veri = ["symbol",'bidPrice','bidQty','askPrice','askQty'];

    connection.connect();
    (function (err) {
      if (err) throw err;
      connection.query(sqlSorgusu, veri, function (err, results) {
        if (err) throw err.message;
        console.log('Başarılı bir şekilde eklendi.');
      });
    });

  }
};



countBreeds()
