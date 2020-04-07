define(['jquery', 'helper', 'select2', 'frb'
, 'ruangkelas'
, '@firebase/app', '@firebase/auth', '@firebase/database'], function($, helper, select2, frb
, ruangkelas
, firebase){


let formdata = [];


// parametr pertama judul
// parametr kedua object
function getData(a){
  let getData = formdata.filter((item) => {
    if (item.nama === a) {
      return item;
    }
  })[0];

  return getData
}


function formIsi(a, b){
  let getData = formdata.filter((item) => {
    if (item.nama === a) {
      return item;
    }
  })[0];

  let keys = Object.keys(b);

  if (getData === undefined) {
    formdata.push({
      nama: a,
      data: {}
    })

    formdata.map((item, i) => {
      if (item.nama === a) {
        keys.forEach((res, i) => {
          eval(`item.data.${res} = b.${res};`);
        });

      }
    })


  }else{

    formdata.map((item, i) => {
      if (item.nama === a) {
        keys.forEach((res, i) => {
            eval(`item.data.${res} = b.${res};`);
        });

      }
    })

  }

}

function makeObj(a, b){
  let data = {}

  eval(`data.${a} = b;`);

  return data;

}

firebase.initializeApp(frb.config);


function login(obj, key, tableName, auth){
  obj.forEach((res) => {
    formIsi(
      res.getAttribute('data-table'),
      makeObj(
        res.getAttribute('name'),
        res.value
      )
    );
  })

  let {nama, data} = getData(tableName);

  let uid = eval(`data.${key}`);

  let authData = eval(`data.${auth}`);

  let path = nama+'/'+uid;

  // cek data exist

  firebase.database().ref(path).once('value').then(res => {
    if (res.val() != null) {
      if (eval(`res.val().${auth}`) === authData) {
        helper.sesiNew('glearn-guru', helper.encryptG(res.val()));
        location.href = '#/ruang-guru';
      }
    }
  })
}


function create(obj, key, tableName, action){
  obj.forEach((res) => {
    formIsi(
      res.getAttribute('data-table'),
      makeObj(
        res.getAttribute('name'),
        res.value
      )
    );
  })

  let {nama, data} = getData(tableName);

  let uid = eval(`data.${key}`);

  let path = nama+'/'+uid;

  // cek data exist

  console.log(path);

  firebase.database().ref(path).once('value').then(res => {
    if (res.val() === null) {
      firebase.database().ref(path).set(data).then(function(){
          eval(action);
      });
    }else{
      alert('maaf username sudah digunakan');
    }
  })
}

$("body").on('click', '[guru-log-out]', function(event){
  event.preventDefault();

  helper.sesiRemove('glearn-guru');

  location.href = '#/guru/login';

})

$("body").on('click', '[data-login]', function(event){
  event.preventDefault();

  let dataO = document.querySelectorAll('[data-table]');

  let tableName = $(this).attr('get-data');

  let key = $(this).attr('data-key');

  let auth = $(this).attr('data-auth');

  let validate = Array.from(dataO).filter((item) => {
    if (item.value === "") {
      return item;
    }
  });

  if (validate.length === 0) {
      login(dataO, key, tableName, auth);
  }else{
      validate[0].focus();
  }

})

  $("body").on('click', '[data-simpan]', function(event){
    event.preventDefault();

    let dataO = document.querySelectorAll('[data-table]');

    let tableName = $(this).attr('get-data');

    let key = $(this).attr('data-key');

    let action = $(this).attr('action-script');

    let validate = Array.from(dataO).filter((item) => {
      if (item.value === "") {
        return item;
      }
    });

    if (validate.length === 0) {
        create(dataO, key, tableName, action);
    }else{
        validate[0].focus();
    }

  })




});
