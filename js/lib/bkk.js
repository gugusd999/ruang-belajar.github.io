define(['jquery', 'main', 'axios', 'crud', 'helper', 'select2', 'terbilang'], function($, main, axios, crud, helper, select2, angkaTerbilang) {
  let bkkP = null;
  let bkkP2 = null;
  let dataB = "";
  let obj2 = {
    bkk: async function(){
      await helper.createLocalData('transaksi_pengeluaran_umum', 'get-data');
      await helper.createLocalData('transaksi_pembelian_barang', 'get-data');
      await helper.createLocalData('metode_pembayaran', 'get-data');

      let data = await axios.get('html/bkk.html');
      await main.html(data.data);

      let selectN = helper.yearChoice(10, `tahun-action script-data="bkk.bkk()" style="width:200px;"`, 'select2');

      let bulanPilih = helper.monthChoice(`bulan-action script-data="bkk.bkk()" style="width:200px;"`, 'select2');

      $("body #tahun-choice").html(selectN+bulanPilih)

      let jurnal = {}

      jurnal.umum = async function(){

        let data = await helper.decryptG(helper.localGet('transaksi_pengeluaran_umum')).filter(function(item){
          let fill = helper.sesiGet('tahun')+'-'+helper.sesiGet('bulan');
          if (item.tanggal_transaksi != null) {
            let fill2 = helper.potongText(item.tanggal_transaksi, 0, 7);
            if (fill == fill2) {
              return item;
            }
          }
        });


        let data2 = await helper.decryptG(helper.localGet('transaksi_pembelian_barang')).filter(function(item){
          let fill = helper.sesiGet('tahun')+'-'+helper.sesiGet('bulan');
          let fill2 = helper.potongText(item.tanggal_transaksi, 0, 7);
          if (fill == fill2) {
            return item;
          }
        });

        bkkP = data;

        bkkP2 = data2;

        console.log(data);

        let dataA = [];

        data.forEach((item) => {

          dataB = item.no_bukti_pengeluaran;

          let cek = dataA.indexOf(item.no_transaksi);

          if (cek === -1) {
            dataA.push(item.no_transaksi);
          }

        })

        data2.forEach((item) => {

          dataB = item.no_bukti_pengeluaran;

          let cek = dataA.indexOf(item.no_transaksi);

          if (cek === -1) {
            dataA.push(item.no_transaksi);
          }

        })

        let html = ``;

        let table = ``;

        let number = 1;

        dataA.forEach((item) => {

            table += `
        <tr>
          <td>${number}</td>
          <td>${dataB}-${item}</td>
          <td><button data-no-transaksi="${item}" class="btn-custome" bkk-print script-data="bkk.view('bkk-view')" >View</button></td>
        </tr>
            `;
            // console.log();
            number++;

        })


        html += `
      <div class="">
        <h1>BKK</h1>
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
            <th>Bkk</th>
            <th>#</th>
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
    bkkView: function(){
      let data = bkkP.filter(function(res){
        if (res.no_transaksi === helper.sesiGet('no-transaksi')) {
          return res;
        }
      });

      let data2 = bkkP2.filter(function(res){
        if (res.no_transaksi === helper.sesiGet('no-transaksi')) {
          return res;
        }
      });

      console.log(data);

      let dataT = ``;

      let number = 1;


      let totalNominal = 0;

      let tanggalTransaksi = ``;



      data.forEach((item) => {

          tanggalTransaksi = item.tanggal_transaksi;

          totalNominal += Number(item.nominal);

          let noNota = "-";

          if (item.no_nota != null) {
            noNota = item.no_nota;
          }

          dataT += `
            <tr>
              <td>${number}</td>
              <td>${noNota}</td>
              <td>${helper.rowDataLocal('akun', item.debit, 'id', 'nama_akun')}</td>
              <td>${item.tanggal_nota}</td>
              <td>${item.keterangan}</td>
              <td style="text-align: right;">${helper.formatRupiah(item.nominal, "Rp ")}</td>
            </tr>
          `;
          number++;
      })

      console.log(data2);

      data2.forEach((item) => {

          tanggalTransaksi = item.tanggal_transaksi;


          totalNominal += Number(item.nominal);

          let noNota = "-";

          if (item.no_nota != null) {
            noNota = item.no_nota;
          }

          dataT += `
            <tr>
              <td>${number}</td>
              <td>${noNota}</td>
              <td>${item.tipe_barang}</td>
              <td>${item.tanggal_nota}</td>
              <td>${item.keterangan}</td>
              <td style="text-align: right;">${helper.formatRupiah(item.nominal, "Rp ")}</td>
            </tr>
          `;
          number++;
      })

      dataT += `
            <tr>
              <td colspan="5">Total : </td>
              <td style="text-align: right;">${helper.formatRupiah(totalNominal.toString(), "Rp. ")}</td>
            </tr>
            <tr>
              <td>Terbilang : </td>
              <td colspan="5">${angkaTerbilang(totalNominal.toString())} rupiah</td>
            </tr>
          `;


      let html = `

      <div class="border">

        <table class="table-no-border">
          <thead>
            <tr>
              <th rowspan="2">PT. SINARMED JAYA</th>
              <th>Tanggal</th>
              <th>:</th>
              <th>${tanggalTransaksi}</th>
            </tr>
            <tr>
              <th>No Bukti</th>
              <th>:</th>
              <th>${dataB}-${helper.sesiGet('no-transaksi')}</th>
            </tr>
            <tr>
              <th colspan="4">Kas Besar Keluar</th>
            </tr>
          </thead>
        </table>
        <table class="table-border">
          <thead>
            <tr>
              <th>No</th>
              <th>No Nota</th>
              <th>Akun</th>
              <th>Tanggal Nota</th>
              <th>Uraian</th>
              <th>Jumlah</th>
            </tr>
          </thead>
          <tbody>
            ${dataT}
          </tbody>
        </table>

        <table class="table-no-border">
          <thead>
            <tr>
              <th  style="text-align: center;">Dibukukan</th>
              <th  style="text-align: center;">Diketahui</th>
              <th  style="text-align: center;">Disetujui</th>
            </tr>
            <tr>
              <th  style="padding: 10px 0;"></th>
              <th  style="padding: 10px 0;"></th>
              <th  style="padding: 10px 0;"></th>
            </tr>
            <tr>
              <th  style="padding: 10px 0;"></th>
              <th  style="padding: 10px 0;"></th>
              <th  style="padding: 10px 0;"></th>
            </tr>
            <tr>
              <th  style="padding: 10px 0;"></th>
              <th  style="padding: 10px 0;"></th>
              <th  style="padding: 10px 0;"></th>
            </tr>
            <tr>
              <th  style="text-align: center;">(...........................)</th>
              <th  style="text-align: center;">(...........................)</th>
              <th  style="text-align: center;">(...........................)</th>
            </tr>
          </thead>
        </table>

      <div>

      `;


      $('body #jurnal').html(html);

    },
    view: async function(a) {
      if (a === "bkk-menu") {
        await this.bkk();
      }
      if (a === "bkk-view") {
        await this.bkkView();
      }
      $("body .select2").select2();
    }
  }

  return obj2;

})
