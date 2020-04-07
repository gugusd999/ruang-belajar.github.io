define(['jquery', 'crud', 'crud2', 'axios', 'helper'], function($, crud, crud2, axios, helper){

  $("body").on("click", "button[go-crud-edit]", function(){

    let namaTable = $(this).attr("table-name");
    crud.edit(namaTable);

  })

  $("body").on("click", "button[go-back-crud-view]", function(){

    let namaTable = $(this).attr("table-name");
    crud.view(namaTable);

  })

  $("body").on("click", "button[go-back-crud-view-2]", function(){

    let namaTable = $(this).attr("table-name");
    crud2.view(namaTable);

  })

  $("body").on("click", "button[tambah-data-baru-crud]", function(){


    var params = new URLSearchParams();


    let namaTable = $(this).attr("table-name");

    let dataSend =  $(this).attr("data-send");

    if (dataSend != "") {
      params.append('data', JSON.stringify(helper.decryptG(dataSend)));
    }

    params.append('table', namaTable);
    let dataAkun = axios.post(helper.baseurl+`new-record-2`, params)
    .then(res =>{
      console.log(res.data);
      let tableD = helper.decryptG(helper.localGet(namaTable));
      tableD.push(res.data);
      helper.localNew(namaTable, helper.encryptG(tableD));

      crud.edit(namaTable);

    });

  })

  $("body").on("click", "button[crud-data-hapus]", function(){

    let namaTable = $(this).attr("table-name");

    let hapus = {
      key: $(this).attr("data-key"),
      id: $(this).attr("data-id")
    }

    let hapusData = JSON.stringify(hapus);

    var params = new URLSearchParams();
    params.append('table', namaTable);
    params.append('hapus', hapusData);
    let dataAkun = axios.post(helper.baseurl+`delete-master-axios`, params)
    .then(res =>{
      console.log(res.data);
      let tableD = helper.decryptG(helper.localGet(namaTable)).filter(function(res){
        if (eval(`res.${hapus.key}`) != hapus.id) {
          return res;
        }
      });

      console.log(tableD);

      helper.localNew(namaTable, helper.encryptG(tableD));

      crud.edit(namaTable);
    });
  })

  function delay(callback, ms) {
    var timer = 0;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback.apply(context, args);
      }, ms || 0);
    };
  }

  $("body").on("keyup", "input[crud-table-update-data]", delay(function(){

    let namaTable = $(this).attr("table-name");

    let data  = {
      row: $(this).attr("data-row"),
      value: $(this).val()
    }

    let hapus = {

      key: $(this).attr("data-key"),
      id: $(this).attr("data-id")

    }

    let nilaiData = JSON.stringify(data);

    let hapusData = JSON.stringify(hapus);

    var params = new URLSearchParams();
    params.append('table', namaTable);
    params.append('data', nilaiData);
    params.append('hapus', hapusData);
    let dataAkun = axios.post(helper.baseurl+`axios-update-data-crud`, params)
    .then(res => {
      console.log(res.data);
      let tableD = helper.decryptG(helper.localGet(namaTable)).filter(function(res){
        if (eval(`res.${hapus.key}`) != hapus.id) {
          return res;
        }
      });

      console.log(tableD);

      tableD.push(res.data);

      helper.localNew(namaTable, helper.encryptG(tableD));

    })

  },300));

  $("body").on("change", "select[crud-table-update-data]", delay(function(){

    let namaTable = $(this).attr("table-name");

    let data  = {
      row: $(this).attr("data-row"),
      value: $(this).val()
    }

    let hapus = {

      key: $(this).attr("data-key"),
      id: $(this).attr("data-id")

    }

    let nilaiData = JSON.stringify(data);

    let hapusData = JSON.stringify(hapus);

    var params = new URLSearchParams();
    params.append('table', namaTable);
    params.append('data', nilaiData);
    params.append('hapus', hapusData);
    let dataAkun = axios.post(helper.baseurl+`axios-update-data-crud`, params)
    .then(res => {
      console.log(res.data);
      let tableD = helper.decryptG(helper.localGet(namaTable)).filter(function(res){
        if (eval(`res.${hapus.key}`) != hapus.id) {
          return res;
        }
      });

      console.log(tableD);

      tableD.push(res.data);

      helper.localNew(namaTable, helper.encryptG(tableD));

    })

  },300));

  $("body").on("keyup", `input[data-row="harga_total"]`, function() {

    let namaTable = "transaksi_pembelian_barang";

    let table = $(this).attr('table-name');
    console.log(table);
    let number = 0;
    if (table === "data_pembelian_barang") {
      $(`body input[data-row="harga_total"]`).each(function(){
         number += Number($(this).val());
      })
    }
    let dataTypeTransaksi = helper.decryptG(helper.sesiGet('data-type-transaksi-umum'));

    let data  = {
      row: "nominal",
      value: number
    }

    let hapus = {

      key: "id",
      id: dataTypeTransaksi.id

    }

    let nilaiData = JSON.stringify(data);

    let hapusData = JSON.stringify(hapus);

    var params = new URLSearchParams();
    params.append('table', namaTable);
    params.append('data', nilaiData);
    params.append('hapus', hapusData);
    let dataAkun = axios.post(helper.baseurl+`axios-update-data-crud`, params)
    .then(res => {
      console.log(res.data);
      let tableD = helper.decryptG(helper.localGet(namaTable)).filter(function(res){
        if (eval(`res.${hapus.key}`) != hapus.id) {
          return res;
        }
      });

      console.log(tableD);

      tableD.push(res.data);

      helper.localNew(namaTable, helper.encryptG(tableD));

    })

  })


  $("body").on("change", "[master-open-data]", function(){

    let nilai = $(this).val();

    crud.view(nilai);


  })

})
