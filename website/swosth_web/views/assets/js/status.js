$(document).ready(function () {

    $.getJSON('https://api.covid19india.org/v2/state_district_wise.json', function (data) {
        if (data) {
            //districtwise = data;
            var districtData = new Object()
            for (var i = 0; i < data.length; i++) {
                if (data[i].statecode == "OR") {
                    districtData = data[i].districtData;
                    break;
                }
            }
            var rec = '';
            for (var i = 0; i < districtData.length; i++) {
                if(districtData[i].district=="Ganjam")
                {
                    $('.about_fun_facts>.row>.col-lg-3>.fun_facts_box>#confirmed').text(districtData[i].confirmed);
                    $('.about_fun_facts>.row>.col-lg-3>.fun_facts_box>#active').text(districtData[i].active);
                    $('.about_fun_facts>.row>.col-lg-3>.fun_facts_box>#recovered').text(districtData[i].recovered);
                    $('.about_fun_facts>.row>.col-lg-3>.fun_facts_box>#death').text(districtData[i].deceased);
                    break;
                }
            }
        }
    });
});

