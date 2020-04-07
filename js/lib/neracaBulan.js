define(['jquery', 'main', 'axios', 'crud', 'helper', 'select2', 'terbilang'], function($, main, axios, crud, helper, select2, angkaTerbilang) {
  let obj2 = {
    neraca: async function(aw){
      await helper.createLocalData('akun', 'get-data');
      await helper.createLocalData('type_akun', 'get-data');
      await helper.createLocalData('transaksi_pengeluaran_umum', 'get-data');
      await helper.createLocalData('metode_pembayaran', 'get-data');

      let data = await axios.get('html/neracaBulan.html');
      await main.html(data.data);



      let selectN = helper.yearChoice(10, `tahun-action script-data="neracaBulan.view()" style="width:200px;"`, 'select2');

      let bulanPilih = helper.monthChoice(`bulan-action script-data="neracaBulan.view()" style="width:200px;"`, 'select2');

      $("body #tahun-choice").html(selectN+bulanPilih)


      let akunHtml = ``;

      let type_akunD = [];

      let totalNominalDebet = 0;
      let totalNominalKredit = 0;

      let umum = await helper.decryptG(helper.localGet('transaksi_pengeluaran_umum'));


      let akun = await helper.decryptG(helper.localGet('akun')).map(function(res, i) {

        let penambahDebet = 0;
        let pengurangDebet = 0;
        let penambahKredit = 0;
        let pengurangKredit = 0;

        umum.forEach(dataRes => {
          if (dataRes.tanggal_transaksi != null) {
            let fill1 = helper.sesiGet('tahun')+'-'+helper.sesiGet('bulan');
            let fill2 = helper.potongText(dataRes.tanggal_transaksi, 0, 7);
            if (fill1 === fill2) {
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
            }
          }
        });

        if (res.debit_kredit === "debit") {
          // console.log(res);
          // console.log(penambahDebet);
          // console.log(pengurangDebet);
          return {
            html: `
            <tr>
            <td style="border-right: none;"></td>
            <td style="padding-left: 20px;border-left: none;">${res.nama_akun}</td>
            <td width="20px" style="border-right: none;">Rp</td>
            <td style="border-left: none;text-align: right;" width="150px">${helper.formatRupiah(Math.ceil(0 + penambahDebet - pengurangDebet))}</td>
            <td width="20px" style="border-right: none;"></td>
            <td style="border-left: none;text-align: right;" width="150px"></td>
            </tr>
            `,
            nominal: 0 + penambahDebet - pengurangDebet,
            posisi: "debet",
            type: res.type_akun,
            laporan: res.laporan
          }

        }else{
          // console.log(res);
          // console.log(penambahKredit);
          // console.log(pengurangKredit);
          return {
            html: `
            <tr>
            <td style="border-right: none;"></td>
            <td style="padding-left: 20px;border-left: none;">${res.nama_akun}</td>
            <td width="20px" style="border-right: none;"></td>
            <td style="border-left: none;text-align: right;" width="150px"></td>
            <td style="border-right: none;" width="20px">Rp</td>
            <td style="border-left: none;text-align: right;" width="150px">${helper.formatRupiah(Math.ceil(0 + penambahKredit - pengurangKredit))}</td>
            </tr>
            `,
            nominal: 0 + penambahKredit - pengurangKredit,
            posisi: "kredit",
            type: res.type_akun,
            laporan: res.laporan
          }

        }

      });

      console.log(type_akunD);

      let sudahAda = [];

      let type = await helper.decryptG(helper.localGet('type_akun')).forEach(function(res, i) {
          if (aw === "Neraca") {
            akun.forEach((item, i) => {
              if (item.laporan === "Neraca") {
                if (res.id === item.type) {

                  let datay = sudahAda.filter(function(datax){
                    if (datax === res.id) {
                      return datax;
                    }
                  })[0];

                  if (datay === undefined) {
                    sudahAda.push(res.id);
                    akunHtml += `
                      <tr>
                        <td colspan="2">${res.type_akun.toUpperCase()}</td>
                        <td style="border-right: none;" width="20px"></td>
                        <td style="border-left: none;text-align: right;" width="150px"></td>
                        <td style="border-right: none;" width="20px"></td>
                        <td style="border-left: none;text-align: right;" width="150px"></td>
                      </tr>
                    `;

                  }




                  akunHtml += item.html;
                  if (item.posisi === "debet") {
                    totalNominalDebet += Number(item.nominal);
                  }else{
                    totalNominalKredit += Number(item.nominal);
                  }
                }
              }
            });
          }else{
            akun.forEach((item, i) => {
              if (item.laporan === "Laba Rugi") {
                if (res.id === item.type) {

                  let datay = sudahAda.filter(function(datax){
                    if (datax === res.id) {
                      return datax;
                    }
                  })[0];

                  if (datay === undefined) {
                    sudahAda.push(res.id);
                    akunHtml += `
                      <tr>
                        <td colspan="2">${res.type_akun.toUpperCase()}</td>
                        <td style="border-right: none;" width="20px"></td>
                        <td style="border-left: none;text-align: right;" width="150px"></td>
                        <td style="border-right: none;" width="20px"></td>
                        <td style="border-left: none;text-align: right;" width="150px"></td>
                      </tr>
                    `;

                  }

                  akunHtml += item.html;
                  if (item.posisi === "debet") {
                    totalNominalDebet += Number(item.nominal);
                  }else{
                    totalNominalKredit += Number(item.nominal);
                  }
                }
              }
            });
          }




      });


        let {awal, akhir} = helper.tanggal('gugus');

        if (aw === "Neraca") {
          let html = `
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
          <div style="width: 210mm;border: 1px solid #dddddd; padding: 10px;">
          <div style="text-align: center;">
          <span style="display: block; font-size: 18px; font-weight: 500; ">NERACA PT SINARMED JAYA</span>
          <span style="display: block; font-size: 18px; font-weight: 500; ">JL TAMAN BOROBUDUR INDAH B NO.16-C</span>
          <span style="display: block; font-size: 18px; font-weight: 500; ">MALANG</span>
          <span style="display: block; font-size: 18px; font-weight: 500; ">Periode ${awal} S/d ${akhir}</span>
          </div>

          <table class="table-border" style="border-collapse:collapse; width: 100%;">
          <tr>
          <th colspan="2">Perkiraan Akun</th>
          <th colspan="2">Debet</th>
          <th colspan="2">Kredit</th>
          </tr>
          <tbody>
          ${akunHtml}
          <tr>
          <td style="text-align:right;" colspan="2">Total :</td>
          <td style="border-right: none;" width="20px">Rp</td>
          <td style="border-left: none; text-align: right;" width="150px">${helper.formatRupiah(Math.ceil(totalNominalDebet))}</td>
          <td style="border-right: none;" width="20px">Rp</td>
          <td style="border-left: none; text-align: right;" width="150px">${helper.formatRupiah(Math.ceil(totalNominalKredit))}</td>
          </tr>
          </tbody>
          <table>
          </div>
          `;

          $('body #jurnal').html(html);
        }else{
          let html = `
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
          <div style="width: 210mm;border: 1px solid #dddddd; padding: 10px;">
          <div style="text-align: center;">
          <span style="display: block; font-size: 18px; font-weight: 500; ">RUGI LABA PT SINARMED JAYA</span>
          <span style="display: block; font-size: 18px; font-weight: 500; ">JL TAMAN BOROBUDUR INDAH B NO.16-C</span>
          <span style="display: block; font-size: 18px; font-weight: 500; ">MALANG</span>
          <span style="display: block; font-size: 18px; font-weight: 500; ">Periode ${awal} S/d ${akhir}</span>
          </div>

          <table class="table-border" style="border-collapse:collapse; width: 100%;">
          <tr>
          <th colspan="2">Perkiraan Akun</th>
          <th colspan="2">Debet</th>
          <th colspan="2">Kredit</th>
          </tr>
          <tbody>
          ${akunHtml}
          <tr>
          <td style="text-align:right;" colspan="2">Total :</td>
          <td style="border-right: none;" width="20px">Rp</td>
          <td style="border-left: none; text-align: right;" width="150px">${helper.formatRupiah(Math.ceil(totalNominalDebet))}</td>
          <td style="border-right: none;" width="20px">Rp</td>
          <td style="border-left: none; text-align: right;" width="150px">${helper.formatRupiah(Math.ceil(totalNominalKredit))}</td>
          </tr>
          </tbody>
          <table>
          </div>
          `;
          $('body #jurnal').html(html);
        }


    },
    rugilaba: async function(a){
      await this.neraca("LabaRugi");
      $("body .select2").select2();
    }
    ,
    view: async function(a) {
        await this.neraca("Neraca");
        $("body .select2").select2();
    }
  }

  return obj2;

})
