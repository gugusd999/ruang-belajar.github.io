define(['jquery', 'main', 'helper', 'frb', 'ruangkelas', '@firebase/app', '@firebase/database'], function($, main, helper, frb, ruangkelas, firebase) {

  const dashboard = {}

    dashboard.view = async function(a) {
      if (helper.sesiGet('glearn-guru') === null) {
        location.href="#/guru/login";
      }else{
        await helper.template('html/guru/kelas.html');
          
        $('body #kelas-title').html(a);
      }
    }

  return dashboard;
})
