define(['jquery', 'main', 'axios', 'crud', 'helper', 'select2', 'terbilang'], function($, main, axios, crud, helper, select2, angkaTerbilang) {
  let obj2 = {
    neraca: async function(aw){
      await helper.createLocalData('akun', 'get-data');
      await helper.createLocalData('transaksi_pengeluaran_umum', 'get-data');
      await helper.createLocalData('metode_pembayaran', 'get-data');

      let data = await axios.get('html/neraca.html');
      await main.html(data.data);

      let akunHtml = ``;

      let totalNominalDebet = 0;
      let totalNominalKredit = 0;

      let umum = await helper.decryptG(helper.localGet('transaksi_pengeluaran_umum'));


      let akun = await helper.decryptG(helper.localGet('akun')).map(function(res, i) {

        let penambahDebet = 0;
        let pengurangDebet = 0;
        let penambahKredit = 0;
        let pengurangKredit = 0;

        umum.forEach(dataRes => {
          if (res.id === dataRes.debit) {
            if (res.debit_kredit === "debit") {
              if (dataRes.nominal != null) {
                penambahDebet += Number(dataRes.nominal.replace(/\,/g, "."));
              }else{
                penambahDebet += 0;
              }
            }else{
              if (dataRes.nominal != null) {
                pengurangKredit += Number(dataRes.nominal.replace(/\,/g, "."));
              }else{
                pengurangKredit += 0;
              }
            }
          }

          if (res.id === dataRes.kredit) {
            if (res.debit_kredit === "debit") {
              if (dataRes.nominal != null) {
              pengurangDebet += Number(dataRes.nominal.replace(/\,/g, "."));
              }else{
              pengurangDebet += 0;
              }
            }else{
              if (dataRes.nominal != null) {
                penambahKredit += Number(dataRes.nominal.replace(/\,/g, "."));
              }else{
                penambahKredit += 0;
              }
            }
          }
        });

        console.log(penambahDebet);
        console.log(pengurangDebet);
        if (aw === "saldo") {
          if (res.debit_kredit === "debit") {
            return {
              html: `
              <tr>
              <td>${i + 1}</td>
              <td>${res.nama_akun}</td>
              <td width="20px" style="border-right: none;">Rp</td>
              <td  style="border-left: none;text-align: right;" width="150px">${helper.formatRupiah(Math.ceil(Number(res.nominal) + penambahDebet - pengurangDebet))}</td>
              <td  width="20px"  style="border-right: none;"></td>
              <td  style="border-left: none;" width="150px"></td>
              </tr>
              `,
              nominal: Number(res.nominal) + penambahDebet - pengurangDebet,
              posisi: "debet"
            }
          }else{
            return {
              html: `
              <tr>
              <td>${i + 1}</td>
              <td>${res.nama_akun}</td>
              <td style="border-right: none;"></td>
              <td style="border-left: none;" width="150px"></td>
              <td style="border-right: none;" width="20px">Rp</td>
              <td style="border-left: none; text-align: right;" width="150px">${helper.formatRupiah(Math.ceil(Number(res.nominal) + penambahKredit - pengurangKredit))}</td>
              </tr>
              `,
              nominal: Number(res.nominal) + penambahKredit - pengurangKredit,
              posisi: "kredit"
            }
          }
        }else{
          if (res.debit_kredit === "debit") {
            return {
              html: `
              <tr>
              <td>${i + 1}</td>
              <td>${res.nama_akun}</td>
              <td width="20px" style="border-right: none;">Rp</td>
              <td  style="border-left: none;text-align: right;" width="150px">${helper.formatRupiah(Math.ceil(Number(res.nominal)))}</td>
              <td  width="20px"  style="border-right: none;"></td>
              <td  style="border-left: none;" width="150px"></td>
              </tr>
              `,
              nominal: Number(res.nominal),
              posisi: "debet"
            }
          }else{
            return {
              html: `
              <tr>
              <td>${i + 1}</td>
              <td>${res.nama_akun}</td>
              <td style="border-right: none;"></td>
              <td style="border-left: none;" width="150px"></td>
              <td style="border-right: none;" width="20px">Rp</td>
              <td style="border-left: none; text-align: right;" width="150px">${helper.formatRupiah(Math.ceil(Number(res.nominal)))}</td>
              </tr>
              `,
              nominal: Number(res.nominal),
              posisi: "kredit"
            }
          }
        }

      }).forEach((item) => {
        if (item.posisi === "debet") {
          akunHtml += item.html;
          totalNominalDebet += item.nominal;
        }else{
          akunHtml += item.html;
          totalNominalKredit += item.nominal;
        }
      });


      let {awal, akhir} = helper.tanggal();

      if (aw === "saldo") {
        let html = `
        <div style="width: 210mm;">
        <div  style="text-align: center;">
        <h1>Neraca Saldo</h1>
        <h3>Periode ${awal} S/d ${akhir}</h3>
        </div>
        <style>
        .table-border, .table-no-border{
          border-collapse: collapse;
          width: 100%;
        }

        .table-border th,
        .table-no-border th
        {
          text-align: center;
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
        <th>Nama Akun</th>
        <th colspan="2">Debet</th>
        <th colspan="2">Kredit</th>
        </tr>
        </thead>
        <tbody>
        ${akunHtml}
        <tr>
        <td style="text-align:right;" colspan="2">Total :</td>
        <td  style="border-right: none;">Rp</td>
        <td style="border-left: none;text-align: right;">${helper.formatRupiah(Math.ceil(totalNominalDebet))}</td>
        <td  style="border-right: none;">Rp</td>
        <td  style="border-left: none;text-align: right;" style="text-align:right;">${helper.formatRupiah(Math.ceil(totalNominalKredit))}</td>
        </tr>
        </tbody>
        <table>
        <div>
        `;

        $('body #jurnal').html(html);
      }else{
        let html = `
        <div style="width: 210mm;">
        <div  style="text-align: center;">
        <h1>Neraca Saldo Awal</h1>
        <h3>Periode ${awal} S/d ${akhir}</h3>
        </div>
        <style>
        .table-border, .table-no-border{
          border-collapse: collapse;
          width: 100%;
        }

        .table-border th,
        .table-no-border th
        {
          text-align: center;
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
        <th>Nama Akun</th>
        <th colspan="2">Debet</th>
        <th colspan="2">Kredit</th>
        </tr>
        </thead>
        <tbody>
        ${akunHtml}
        <tr>
        <td style="text-align:right;" colspan="2">Total :</td>
        <td  style="border-right: none;">Rp</td>
        <td style="border-left: none;text-align: right;">${helper.formatRupiah(Math.ceil(totalNominalDebet))}</td>
        <td  style="border-right: none;">Rp</td>
        <td  style="border-left: none;text-align: right;" style="text-align:right;">${helper.formatRupiah(Math.ceil(totalNominalKredit))}</td>
        </tr>
        </tbody>
        <table>
        <div>
        `;

        $('body #jurnal').html(html);

      }

    },
    view: async function(a) {
        await this.neraca(a);
    }
  }

  return obj2;

})
