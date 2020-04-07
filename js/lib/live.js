define(['jquery', 'helper', 'axios'], function($, helper, axios){


async function live(tableName){

    var params = new URLSearchParams();
    params.append('table', tableName);
    let dataAkun = await axios.post(helper.baseurl+"get-data", params);
 

    if (JSON.stringify(dataAkun.data) != JSON.stringify(helper.decryptG(helper.localGet(tableName)))) {

    	helper.localNew(tableName, helper.encryptG(dataAkun.data));

    }

}

return live;


})