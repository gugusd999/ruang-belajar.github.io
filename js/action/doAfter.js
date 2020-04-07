define(['jquery', 'helper', 'select2', 'jurnal', 'bkk', 'hutang', 'neracaBulan', 'neraca'], function($, helper, select2, jurnal, bkk, hutang, neracaBulan, neraca){


	// set year
	let date = new Date();

	// year Know
	let year = date.getFullYear();

	helper.sesiNew('tahun', year);

	// get month
	let month = helper.formatId('00', date.getMonth()+1);

	helper.sesiNew('bulan', month);



	$("body").on("change", "[tahun-action]", function(){
		let tahun = $(this).val();
		helper.sesiNew('tahun', tahun);
		let getScrip = $(this).attr('script-data');
		eval(getScrip);
	})

	$("body").on("change", "[bulan-action]", function(){
		let tahun = $(this).val();
		helper.sesiNew('bulan', tahun);
		let getScrip = $(this).attr('script-data');
		eval(getScrip);
	})

	$("body").on("click", "[journal-menu]", function(){
		let getScrip = $(this).attr('script-data');
		eval(getScrip);
	})


	$("body").on("click", "[bkk-print]", function(){
		let getScrip = $(this).attr('script-data');
		let bkkView = $(this).attr('data-no-transaksi');
		helper.sesiNew('no-transaksi', bkkView);
		eval(getScrip);
	})

	$("body").on("click", "[master-data-button]", function(){
		let dataBack = $(this).attr('data-back');
		helper.sesiNew('sesi-back', dataBack);

		location.href = "#/master";

		// alert("ok");
	})

	$("body").on("click", "[back-last]", function(){
		let back = helper.sesiGet('sesi-back');

		location.href = back;

		location.reload();


	})


	$("body").on("keyup", "#set-tahun-transaksi", function(){

		let value = $(this).val();

		helper.sesiNew('tahun', value);

	})


	$("body").on("click", "[data-go]", function(){
		let data = $(this).attr("data-go-data");
		eval(data);
	})

});
