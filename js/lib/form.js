define(['jquery', 'main', 'axios', 'helper'], function($, main, axios, helper){

  let form = {};

  form.no = function(a, b = null, c = null, d = null, e = null, f = null, g = null, h = null){
    return a;
  }

  form.text = function(a, b = null, c = null, d = null, e = null, f = null, g = null, h = null){
    let value = a;
    if (value === null) {
      value = "";
    }
    return `
      <input data-id="${g}" type="text" class="form-control" data-key="${h}" crud-table-update-data table-name="${c}" data-row="${b}" value="${value}" />
    `;
  }

  form.number = function(a, b = null, c = null, d = null, e = null, f = null, g = null, h = null){
    let value = a;
    if (value === null) {
      value = "";
    }
    return `
      <input data-id="${g}" type="number" class="form-control" data-key="${h}" crud-table-update-data table-name="${c}" data-row="${b}" value="${value}" />
    `;
  }

  form.tanggal = function(a, b = null, c = null, d = null, e = null, f = null, g = null, h = null){
    let value = a;
    if (value === null) {
      value = "";
    }
    return `
      <input data-id="${g}" type="text" class="form-control tanggal" data-key="${h}" crud-table-update-data table-name="${c}" placeholder="yyyy-mm-dd" data-row="${b}" value="${value}" />
    `;
  }

  form.select = function(a, b = null, c = null, d = null, e = null, f = null, g = null, h = null){
    let data = {
      id: d,
      nama: e
    }
    return `
      <select data-id="${g}" type="number" data-key="${h}" crud-table-update-data table-name="${c}" data-row="${b}" class="form-control select2">
        ${helper.option(f, a, data)}
      </select>
    `;
  }

  form.select2 = function(a, b = null, c = null, d = null, e = null, f = null, g = null, h = null){
    let data = {
      id: d,
      nama: e
    }
    return `
      <select data-id="${g}" type="number" data-key="${h}" crud-table-update-data table-name="${c}" data-row="${b}" class="form-control select2">
        ${helper.option(f, a, data)}
      </select>
    `;
  }

  return form;

})
