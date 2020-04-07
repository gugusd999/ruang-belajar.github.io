define(['jquery', 'main', 'axios', 'crud', 'helper'], function($, main, axios, crud, 'helper') {

  let akun = [
    {id: 1, nama: "kas"},
    {id: 2, nama: "bank"}
  ];

  let option = {};

  option.create = function(a, b, c){

      let data = eval(`a`);
      let datab = b;
      let html = ``;

        data.forEach((item) => {
          if (eval(`item.${c.id}`) === datab) {
            html += `<option selected value="${eval(`item.${c.id}`)}">${eval(`item.${c.nama}`)}</option>`;
          }else{
            html += `<option value="${eval(`item.${c.id}`)}">${eval(`item.${c.nama}`)}</option>`;
          }
        });

        return html;
    }

  return option;

})
