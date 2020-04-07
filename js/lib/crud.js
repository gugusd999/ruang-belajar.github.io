define(['jquery', 'axios', 'form', 'helper', 'live', 'select2', 'jQueryInputmask'], function($, axios, form, helper,  live, select2){

  let crud = {};

  crud.tableData = [];

  crud.set = function(name, data){
    crud.tableData.push({
      nama: name,
      data:data
    });
  }

  crud.view = async function(a = null){

    live(a);

    let crudAct = await crud.tableData.filter(function(res){

      if (res.nama === a) {
        return res;
      }

    })[0];

    let crudData = await crudAct.data;

    crudData.tablename = a;

    let html = ``;

    html +=  `<button table-name="${a}" go-crud-edit class="btn btn-primary btn-sm mb-3">Ubah</button>`;

    html +=  `<table id="${a}" class="table" style="min-width: 100%;">`;
    html +=  `<thead>`;
    html +=  `<tr class="text-white" style="background-color: #DA251C;">`;
    crudData.headname.forEach((res) => {
      html +=  `<th>`;
        html +=  res;
      html +=  `</th>`;
    });
    if(crudData.customeButtonDataView === true){
      html +=  `<th>`;
        html +=  `#`;
      html +=  `</th>`;
    }
    html +=  `</tr>`;
    html +=  `</thead>`;
    html +=  `<tbody>`;

    let dataIsiTable = await helper.getDataTable(a, crudData.filter);

    let numero = 1;
    dataIsiTable.forEach((item) => {
      html +=  `<tr>`;
      let number = 0;
      crudData.table.forEach((res) => {
        if (number === 0) {
          html +=  `<td style="min-width:${crudData.width[number]}; max-width:${crudData.width[number]}; width:${crudData.width[number]};">`;
          html +=  numero;
          html +=  `</td>`;
        }else{
          if (crudData.form[number] === "select") {
            html +=  `<td  style="min-width:${crudData.width[number]}; max-width:${crudData.width[number]}; width:${crudData.width[number]};">`;
            html +=  helper.optionName(eval(`item.${res}`), crudData.listData[number]);
            html +=  `</td>`;
          }else{

            let nilaiNull = eval(`item.${res}`);
            if (nilaiNull === null) {
              nilaiNull = '-';
            }

            html +=  `<td  style="min-width:${crudData.width[number]}; max-width:${crudData.width[number]}; width:${crudData.width[number]};">`;
            html +=  nilaiNull;
            html +=  `</td>`;
          }
        }
        number++;
      });

      if(crudData.customeButtonDataView === true){
        html +=  `<td>`;
          html +=  `<button crud-view-data-on-hide data-key="${crudData.customeButtonViewData}" data-go="${crudData.customeButtonViewGo}" data-keep="${helper.encryptG(item)}" class="btn" style="background-color: #0066D5; color: white;">view</button>`;
        html +=  `</td>`;
      }

      html +=  `</tr>`;
      numero++;
    });

    html +=  `</tbody>`;
    html +=  `</table>`;


    document.querySelector(`#${crudData.domp}`)
    .innerHTML = html;

    $(`#${a}`).DataTable({
        "scrollX": true
    });


  }

  crud.edit = async function(a = null){

    let crudAct = crud.tableData.filter(function(res){
      if (res.nama === a) {
        return res;
      }
    })[0];

    let crudData = crudAct.data;

    let dataIsiTable = await helper.getDataTable(a, crudData.filter);

    let dataSend = "";

    if (crudData.dataSend != undefined) {
      dataSend = helper.encryptG(crudData.dataSend);
    }

    crudData.tablename = a;

    let html = ``;

    html +=  `<button table-name="${a}" go-back-crud-view class="btn btn-default btn-sm mb-3 mr-3">Kembali</button>`;
    html +=  `<button table-name="${a}" data-send="${dataSend}" tambah-data-baru-crud class="btn btn-primary btn-sm mb-3">Tambah</button>`;

    html +=  `<table id="${a}" class="table" style="min-width: 100%;">`;
    html +=  `<thead>`;
    html +=  `<tr  class="text-white" style="background-color: #DA251C;">`;
    crudData.headname.forEach((res) => {
      if (res === 'No') {
        html +=  `<th>`;
        html +=  'Id';
        html +=  `</th>`;
      }else{
        html +=  `<th>`;
        html +=  res;
        html +=  `</th>`;
      }
    });
    html +=  `<th>#</th>`;
    html +=  `</tr>`;
    html +=  `</thead>`;
    html +=  `<tbody>`;


    let numero = 1;

    dataIsiTable.forEach((item) => {
      html +=  `<tr>`;
      let number = 0;
      crudData.table.forEach((res) => {
        let dataO = crudData.listData[number];
        let id = null;
        let nama = null;
        let table = null;
        if (dataO != null) {
          id = dataO.id;
          nama = dataO.nama;
          table = dataO.table;
        }
        console.log(dataO);
        html +=  `<td style="min-width:${crudData.width[number]}; max-width:${crudData.width[number]}; width:${crudData.width[number]};">`;
        html +=  eval(`
          form.${crudData.form[number]}(item.${res}, "${res}", "${crudData.tablename}"
          , "${id}", "${nama}", "${table}", "${eval(`item.${crudData.key}`)}", "${crudData.key}")
        `);
        html +=  `</td>`;
        number++;
      });

      html +=  `<td width="80px"><button table-name="${crudData.tablename}" data-key="${crudData.key}" crud-data-hapus data-id="${eval(`item.${crudData.key}`)}" class="btn btn-danger">Hapus</button></td>`;

      html +=  `</tr>`;
    });

    html +=  `</tbody>`;
    html +=  `</table>`;


    document.querySelector(`#${crudData.domp}`)
    .innerHTML = html;

    $(`#${a}`).DataTable({
        "order": [[ 0, "desc" ]],
        "scrollX": true
    });

    $("body .tanggal").inputmask({mask: "9999-99-99"});


    $("body .select2").select2();

  }

  return crud;

})
