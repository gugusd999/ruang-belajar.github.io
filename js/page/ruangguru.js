define(['jquery', 'main', 'helper', 'frb'], function($, main, helper, frb, firebase) {
  const dashboard = {
    view: async function() {
      if (helper.sesiGet('glearn-guru') === null) {
        location.href="#/guru/login";
      }else{
        await helper.template('html/ruangguru.html');

        // tampilkan nama Guru

        let dataLogin = helper.decryptG(helper.sesiGet('glearn-guru'));

        document.querySelector("#nama-guru").innerHTML = dataLogin.nama;

      }
    }
  }

  return dashboard;
})
