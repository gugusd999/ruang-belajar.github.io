define(['jquery', 'axios', 'form', 'helper', 'live', 'select2'], function($, axios, form, helper,  live, select2){

  let crud = {};

  crud.prop = [];

  crud.set = function(name, data){
    crud.prop.push({
      nama: name,
      data: data
    });
  }

  crud.getData = function(a){
      return crud.prop.filter(function(res){
        if (res.nama === a) {
          return res;
        }
      })[0].data;
  }

  crud.view = async function(a = null, b = "view"){

    let html = ``;

    html +=  `<button table-name="${a}" go-crud-edit class="btn btn-primary btn-sm mb-3">Ubah</button>`;

    html +=  `<table id="${a}" class="table" style="min-width: 100%;">`;
    html +=  `<thead>`;
    html +=  `<tr class="bg-danger text-white">`; 

    crud.getData(a).headname.forEach((res) => {
      html +=  `<th>`;
        html +=  res;
      html +=  `</th>`;
    });

    html +=  `</tr>`;
    html +=  `</thead>`;
    html +=  `<tbody>`;
    html +=  `</tbody>`;
    html +=  `</table>`;


    document.querySelector(`#${crud.getData(a).domp}`)
    .innerHTML = html;


    var tableku = null;

    $(document).ready(function(){
        tableku = $(`body #${a}`).DataTable({

            scrollX: true,
            scrollY: true,
            processing: false,
            serverSide: true,
            ajax: {
                "url"       : helper.baseurl+`get-table-data`,
                "type"      : "POST",
                "data"      : {
                  table_type: b,
                  table_name: "type_akun",
                  table_row: crud.getData(a).table
                },
            },
            deferRender: true,
            columnDefs:[
                {
                    targets:[],
                    orderable: false
                }
            ]
        })


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
    html +=  `<tr>`;
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
        html +=  `<td style="min-width:${crudData.width[number]}; width:${crudData.width[number]};">`;
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

    // $(`#${a}`).DataTable({
    //     "order": [[ 0, "desc" ]],
    //     "scrollX": true
    // });

    $("body .select2").select2();

  }

  return crud;

})
