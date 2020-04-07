define(['jquery', 'main', 'helper', 'frb'], function($, main, helper, frb, firebase) {

  const dashboard = {
    view: async function() {
      await helper.template('html/loginguru.html');
    }
  }

  return dashboard;
})
