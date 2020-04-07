define(['jquery', 'main', 'axios', 'crud', 'helper', 'select2', 'terbilang'], function($, main, axios, crud, helper, select2, angkaTerbilang) {
  let obj2 = {

    umum: async function(){
      await helper.createLocalData('data_pembayaran_hutang_barang', 'get-data');
      await helper.createLocalData('data_pembayaran_hutang_umum', 'get-data');
      await helper.createLocalData('transaksi_pengeluaran_umum', 'get-data');
      await helper.createLocalData('metode_pembayaran', 'get-data');

      let data = await axios.get('html/hutang.html');
      await main.html(data.data);

      let selectN = helper.yearChoice(10, `tahun-action script-data="hutang.view('umum')" style="max-width:200px;"`, 'form-control select2');

      let bulanPilih = helper.monthChoice(`bulan-action script-data="hutang.view('umum')" style="max-width:200px;"`, 'form-control select2');

      $("body #tahun-choice").html(selectN+bulanPilih)

      let jurnal = {}

      jurnal.umum = async function(){

        let data = await helper.decryptG(helper.localGet('transaksi_pengeluaran_umum')).filter(function(item){
          let fill = helper.sesiGet('tahun')+'-'+helper.sesiGet('bulan');
          let fill2 = helper.potongText(item.tanggal_transaksi, 0, 7);
          if (fill == fill2) {
            if (item.pembayaran === 'hutang') {
              return item;
            }
          }
        });

        let html = ``;

        let table = ``;

        let number = 1;

        data.forEach((item) => {

          let pembayaran = 0;

          let hutangS = helper.decryptG(helper.localGet('data_pembayaran_hutang_umum')).filter(function(res){
            if (res.transaksi_pengeluaran_umum_id === item.id) {
              return res;
            }
          }).forEach((itemS) => {
              pembayaran += Number(itemS.nominal);
          })

        let status = 'belum lunas';

        if (pembayaran == item.nominal) {
          status = 'lunas';
        }



            table += `
        <tr>
          <td>${number}</td>
          <td>${item.tanggal_transaksi}</td>
          <td>${item.keterangan}</td>
          <td>${helper.formatRupiah(item.nominal.toString(), "Rp ")}</td>
          <td>${helper.formatRupiah(pembayaran.toString(), "Rp ")}</td>
          <td>${status}</td>
        </tr>
            `;
            // console.log();
            number++;

        })



        html += `
      <div style="text-align: center;">
        <h1>Data Hutang</h1>
      </div>

      <style>
          .table-border, .table-no-border{
            border-collapse: collapse;
            width: 100%;
          }

          .table-no-border th, .table-no-border td{
            padding: 5px;
          }

          .table-border th, .table-border td{
            padding: 5px;
            border: 1px solid #dfdfdf;
          }

          .border{
            border: 1px solid #dfdfdf;
          }
      </style>

      <table class="table-border">
        <thead>
          <tr>
            <th>No</th>
            <th>Tanggal</th>
            <th>Transaksi</th>
            <th>Hutang</th>
            <th>Pembayaran</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${table}
        </tbody>
      <table>
        `;


        $('body #jurnal').html(html);


      }
      jurnal.umum();
    },
    pembelian: async function(){
      await helper.createLocalData('transaksi_pembelian_barang', 'get-data');
      await helper.createLocalData('metode_pembayaran', 'get-data');

      let data = await axios.get('html/hutang.html');
      await main.html(data.data);

      let selectN = helper.yearChoice(10, `tahun-action script-data="hutang.view('pembelian')" style="max-width:200px;"`, 'form-control select2');

      let bulanPilih = helper.monthChoice(`bulan-action script-data="hutang.view('pembelian')" style="max-width:200px;"`, 'form-control select2');

      $("body #tahun-choice").html(selectN+bulanPilih)

      let jurnal = {}

      jurnal.umum = async function(){

        let data = await helper.decryptG(helper.localGet('transaksi_pembelian_barang')).filter(function(item){
          let fill = helper.sesiGet('tahun')+'-'+helper.sesiGet('bulan');
          let fill2 = helper.potongText(item.tanggal_transaksi, 0, 7);
          if (fill == fill2) {
            return item;
          }
        });

        console.log(data);

        let html = ``;

        let table = ``;

        let number = 1;

        data.forEach((item) => {

          let pembayaran = 0;

          let hutangS = helper.decryptG(helper.localGet('data_pembayaran_hutang_barang')).filter(function(res){
            if (res.transaksi_pembelian_barang_id === item.id) {
              return res;
            }
          }).forEach((itemS) => {
              pembayaran += Number(itemS.nominal);
          })

          let status = 'belum lunas';

          if (pembayaran == item.nominal) {
            status = 'lunas';
          }


            table += `
        <tr>
          <td>${number}</td>
          <td>${item.tanggal_transaksi}</td>
          <td>${item.keterangan}</td>
          <td>${helper.formatRupiah(item.nominal.toString(), "Rp ")}</td>
          <td>${helper.formatRupiah(pembayaran.toString(), "Rp ")}</td>
          <td>${status}</td>
        </tr>
            `;
            // console.log();
            number++;

        })


        html += `
      <div class="">
        <h1>Journal Umum</h1>
      </div>

      <table class="table-laporan">
        <thead>
          <tr>
            <th>No</th>
            <th>Tanggal</th>
            <th>Transaksi</th>
            <th>Hutang</th>
            <th>Pembayaran</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${table}
        </tbody>
      <table>
        `;


        $('body #jurnal').html(html);


      }
      jurnal.umum();
    },
    view: async function(a) {
      if (a === "umum") {
        await this.umum();
      }
      if (a === "pembelian") {
        await this.pembelian();
      }
      $("body .select2").select2();
    }
  }

  return obj2;
})
