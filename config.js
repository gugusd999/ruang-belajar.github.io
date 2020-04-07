(function () {
      "use strict";
      require.config({
      baseUrl: 'js',
      paths: {
        jquery: "jquery-3.4.1.min",
        sammy: "sammy-latest.min",
        axios: "lib/axios.min",
        crud: "lib/crud",
        crud2: "lib/crud2",
        form: "lib/form",
        select2: "lib/select2.min",
        helper: "lib/helper",
        live: "lib/live",
        aes: "lib/aes",
        jurnal: "lib/jurnal",
        hutang: "lib/hutang",
        bkk: "lib/bkk",
        neraca: "lib/neraca",
        frb: "lib/frb",
        neracaBulan: "lib/neracaBulan",
        terbilang: "lib/terbilang.min",
        main: "page/config/main",
        baseurl: "page/config/baseurl",
        ruangkelas: 'page/guru/ruangkelas_lib',
        "datatables.net": 'lib/jquery.dataTables.min',
        "datatables": 'lib/dataTables.bootstrap4.min',
        inputmask: "lib/dist/inputmask",
        dependencyLib: "lib/dist/dependencyLib",
        jQueryInputmask: "lib/dist/jquery.inputmask",
        '@firebase/app': 'firebase/firebase-app',
        '@firebase/auth': 'firebase/firebase-auth',
        '@firebase/database': 'firebase/firebase-database'
      },
      shim: {
        // we get an error that "jQuery is not defined" error without this
        // shim for sammy
        sammy: {
          deps: ["jquery"],
          exports: "sammy"
        },
        jQueryInputmask: {
            deps: ["jquery", "inputmask"],
            exports: "$"
        }
    }
  });

})();
