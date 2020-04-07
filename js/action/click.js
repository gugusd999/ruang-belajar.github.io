define(['jquery', 'helper', 'select2'], function($, helper, select2){


  $('body .select2').select2();


  $("body").on("click", "#click", function() {
    alert("gugus");
  })

  $("body").on("click", "[bulan-transaksi]", function(){

    let data = $(this).attr("data-date");
    let bulan = $(this).attr("data-date-asli");
    let tahun = helper.sesiGet('tahun');
    let date = new Date(tahun, data);
    let tanggalAkhir = date.getUTCDate();

    let rangeTransaksi = {
        dateOne: tahun+'-'+bulan+'-01',
        dateTwo: tahun+'-'+bulan+'-'+tanggalAkhir
    }

    helper.sesiNew("tanggal-transaksi", tahun.substring(2, 4)+'-'+bulan);

    location.href = "#/transaksi-2";

  })

  $("body").on("click", "[crud-view-data-on-hide]", function(){
      let mydata = $(this).attr('data-keep');
      let go = $(this).attr('data-go');
      let goKey = $(this).attr('data-key');
      helper.sesiNew(goKey, mydata);
      location.href = go;
      location.reload();
  })

  $("body").on("click", "[menuju]", function(){

    let go = $(this).attr('data-go');
    location.href = go;
    location.reload();

  })


  $("body").on("click", "[print-data]", function(){

    let Div = $(this).attr('data-position');

    helper.printDiv(Div);

  })


  $("body").on('click', '[modal-open]', function(event){
    event.preventDefault();

    let target = $(this).attr('modal-target');

    $(`body #${target}`).css('display', 'block');

    $(`body [modal-close]`).attr('modal-target', target);

    let nameTable = $(this).attr('table-name');

    let dataLogin = helper.decryptG(helper.sesiGet('glearn-guru'));

    $('body [data-table]').attr('data-table', nameTable+dataLogin.username);
    $('body [get-data]').attr('get-data', nameTable+dataLogin.username);

  })

  $("body").on('click', '[modal-close]', function(event){
    event.preventDefault();

    let target = $(this).attr('modal-target');

    $(`body #${target}`).css('display', 'none');

  })



  // pilih Jenjang


  $("body").on("change", "[pilihan-jenjang]", function(event){
    event.preventDefault();

    let nilai = $(this).val();

    let option = `<option value=""> pilih </option>`;

    if (nilai === "SD") {
      for (var i = 1; i <= 6; i++) {
        option += `<option value="${i}"> ${i} </option>`;
      }
    }

    if (nilai === "SMP") {
      for (var i = 7; i <= 9; i++) {
        option += `<option value="${i}"> ${i} </option>`;
      }
    }

    if (nilai === "SMA-K") {
      for (var i = 10; i <= 12; i++) {
        option += `<option value="${i}"> ${i} </option>`;
      }
    }

    $(`body [pilihan-kelas]`).html(option);

  })

})
