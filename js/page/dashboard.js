define(['jquery', 'main', 'helper', 'frb', '@firebase/app','@firebase/auth', '@firebase/database'], function($, main, helper, frb, firebase) {
  const dashboard = {
    view: async function() {
      await helper.template('html/dashboard.html');


      // firebase.initializeApp(frb.config);
      //
      // // update
      // var userId = firebase.auth().uid;
      //
      // firebase.database().ref('hallo').child('toko amana').set({
      //   nama: 'good people',
      //   umur: 23
      // })
      //
      // // hapus domoro
      // // firebase.database().ref('hallo').child('domoro').remove();
      //
      // // read data
      // firebase.database().ref('hallo').child('akasi').once('value').then(res => {
      //   console.log(res.val());
      // })


    }
  }

  return dashboard;
})
