define(['jquery', 'main', 'axios', 'crud', 'helper', 'select2'], function($, main, axios, crud, helper, select2) {
  let obj2 = {

    umum: async function(){
      await helper.createLocalData('transaksi_pengeluaran_umum', 'get-data');
      await helper.createLocalData('metode_pembayaran', 'get-data');

      let data = await axios.get('html/jurnal.html');
      await main.html(data.data);

      let selectN = helper.yearChoice(10, `tahun-action script-data="jurnal.view('umum')" style="max-width:200px;"`, 'form-control select2');

      let bulanPilih = helper.monthChoice(`bulan-action script-data="jurnal.view('umum')" style="max-width:200px;"`, 'form-control select2');

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

        let html = ``;

        let table = ``;

        let number = 1;

        data.forEach((item) => {

            table += `
        <tr>
          <td>${number}</td>
          <td>${item.tanggal_transaksi}</td>
          <td>${item.keterangan}</td>
          <td>${helper.rowDataLocal('akun', item.debit, 'id', 'nama_akun')}</td>
          <td style="border-right: none;  border-right: none;">Rp</td>
          <td style="border-left: none; text-align: right;" width="150px">${helper.formatRupiah(item.nominal, '')}</td>
          <td>${helper.rowDataLocal('akun', item.kredit, 'id', 'nama_akun')}</td>
          <td style="border-right: none; border-right: none;">Rp</td>
          <td style="border-left: none; text-align: right;" width="150px">${helper.formatRupiah(item.nominal, 'Rp ')}</td>
        </tr>
            `;
            number++;
        })

        let {awal, akhir} = helper.tanggal('gugus');

        html += `
      <div  style="text-align: center;">
        <h1>Jurnal Umum</h1>
        <h3>Periode ${awal} S/d ${akhir}</h3>
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

          th{
            text-align: center;
          }
      </style>

      <table class="table-border">
        <thead>
          <tr>
            <th rowspan="2">No</th>
            <th rowspan="2">Tanggal</th>
            <th rowspan="2">Transaksi</th>
            <th colspan="3">Debet</th>
            <th colspan="3">Kredit</th>
          </tr>
          <tr>
            <th>Akun</th>
            <th colspan="2">Nominal</th>
            <th>Akun</th>
            <th colspan="2">Nominal</th>
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

      let data = await axios.get('html/jurnal.html');
      await main.html(data.data);

      let selectN = helper.yearChoice(10, `tahun-action script-data="jurnal.view('pembelian')" style="max-width:200px;"`, 'form-control select2');

      let bulanPilih = helper.monthChoice(`bulan-action script-data="jurnal.view('pembelian')" style="max-width:200px;"`, 'form-control select2');

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

            table += `
        <tr>
          <td>${number}</td>
          <td>${item.tanggal_transaksi}</td>
          <td>${item.keterangan}</td>
          <td>${item.tipe_barang}</td>
          <td>${item.nominal}</td>
          <td>${item.pembayaran}</td>
          <td>${item.nominal}</td>
        </tr>
            `;
            // console.log();
            number++;

        })

        let {awal, akhir} = helper.tanggal('gugus');


        html += `
      <div style="text-align: center;">
        <h1>Jurnal Penjualan</h1>
        <h3>Periode ${awal} S/d ${akhir}</h3>
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

          th{
            text-align: center;
          }
      </style>

      <table class="table-border">
        <thead>
          <tr>
            <th rowspan="2">No</th>
            <th rowspan="2">Tanggal</th>
            <th rowspan="2">Transaksi</th>
            <th colspan="2">Debit</th>
            <th colspan="2">Kredit</th>
          </tr>
          <tr>
            <th>akun</th>
            <th>nominal</th>
            <th>akun</th>
            <th>nominal</th>
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
