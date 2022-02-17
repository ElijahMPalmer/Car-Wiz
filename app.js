new fullpage('#fullpage', {
        autoScrolling: true,
        navigation: true,
        controlArrows: false,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',
        anchors: ['section1', 'section2']
    })
    // $.get("https://vpic.nhtsa.dot.gov/api//vehicles/GetVehicleVariableList?format=xml", (data) => {
    //     console.log(data);
    // })
const $make = $("#make");
let availableMakes = $.get("https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json", (data) => {
    console.log(data.Results);
    for (let i = 0; i < data.Results.length; i++) {
        const $manu = $("<option value='" + data.Results[i].Make_Name + "'>" + data.Results[i].Make_Name + "</options>");
        $manu.appendTo($make);
    }
});

$('#make').change(function() {
    const $modelSel = $('#model');
    const $currMake = $('#make').val();
    console.log($currMake);
    let availableModels = $.get("https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/" + $currMake + "?format=json", (data) => {
        console.log(data, 'avMods');
        $modelSel.empty();
        for (let i = 0; i < data.Results.length; i++) {
            const $model = $("<option value='" + data.Results[i].Model_Name + "'>" + data.Results[i].Model_Name + "</options>")
            $model.appendTo($modelSel);
        }
    })
})

const $yearSel = $('#year');
let baseYear = 1980;
for (let i = 0; i < 42; i++) {
    const $year = $("<option value='" + baseYear + "'>" + baseYear + "</options>")
    $year.appendTo($yearSel);
    baseYear++;
}

const $submit = $('#submit');
const $vin = $('#vin');
const $vehInfo = $("#vehInfo")
const $resource = $("#specRes")
$submit.click(function() {
    $vehInfo.empty();
    $resource.empty();
    if ($vin.val().length !== 0) {
        console.log("worked")
        $.get('https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/' + $vin.val() + '?format=json', (data) => {
            console.log(data);
            const $vinMake = $('<h3>' + 'Make: ' + data.Results[0].Make + '</h3>');
            const $vinModel = $('<h3>' + 'Model: ' + data.Results[0].Model + '</h3>');
            const $vinYear = $('<h3>' + 'Year: ' + data.Results[0].ModelYear + '</h3>');
            const $vinEngineConf = $('<h3>' + 'Engine Configuration: ' + data.Results[0].EngineConfiguration + ' ' + data.Results[0].EngineCylinders + ' Cylinder' + '</h3>')
            const $vinEngineDes = $('<h3>' + 'Engine Designation: ' + data.Results[0].EngineModel + '</h3>')
            const $vinEngineHP = $('<h3>' + 'Engine HP: ' + data.Results[0].EngineHP + '</h3>')
            $vinMake.appendTo($vehInfo);
            $vinModel.appendTo($vehInfo);
            $vinYear.appendTo($vehInfo);
            $vinEngineConf.appendTo($vehInfo);
            $vinEngineDes.appendTo($vehInfo)
            $vinEngineHP.appendTo($vehInfo)

            let make = (data.Results[0].Make).toLowerCase();
            let $ownersMan;
            let $forum;
            let $noRes;
            console.log(make);
            switch (make) {
                case 'acura':
                    $ownersMan = $('<h3><a href="https://owners.acura.com/vehicles/warranty" target="_blank" > Owners Manuals </a></h3 > ');
                    $forum = $('<h3><a href="https://acurazine.com/forums/" target="_blank">Forums</a></h3>');
                    $ownersMan.appendTo($resource);
                    $forum.appendTo($resource);
                    break;
                case 'kia':
                    $ownersMan = $('<h3><a href="https://owners.kia.com/content/owners/en/manuals.html" target="_blank">Owners Manuals</a></h3>');
                    $forum = $('<h3><a href="https://www.kia-forums.com/" target="_blank">Forums</a></h3>');
                    $ownersMan.appendTo($resource);
                    $forum.appendTo($resource);
                    break;
                case 'ford':
                    $ownersMan = $('<h3><a href="https://www.ford.com/support/owner-manuals/" target="_blank">Owners Manuals</a></h3>');
                    $forum = $('<h3><a href="https://www.fordforums.com/" target="_blank">Forums</a></h3>');
                    $ownersMan.appendTo($resource);
                    $forum.appendTo($resource);
                    break;
                case 'chevrolet':
                    $ownersMan = $('<h3><a href="https://www.chevrolet.com/support/vehicle/manuals-guides" target="_blank">Owners Manuals</a></h3>');
                    $forum = $('<h3><a href="https://chevroletforum.com/forum/" target="_blank">Forums</a></h3>');
                    $ownersMan.appendTo($resource);
                    $forum.appendTo($resource);
                    break;
                case 'honda':
                    $ownersMan = $('<h3><a href="https://owners.honda.com/vehicle-information/manuals" target="_blank">Owners Manuals</a></h3>');
                    $forum = $('<h3><a href="https://honda-tech.com/forums/" target="_blank">Forums</a></h3>');
                    $ownersMan.appendTo($resource);
                    $forum.appendTo($resource);
                    break;
                case 'toyota':
                    $ownersMan = $('<h3><a href="https://www.toyota.com/owners/resources/warranty-owners-manuals" target="_blank">Owners Manuals</a></h3>');
                    $forum = $('<h3><a href="https://www.toyotanation.com/" target="_blank">Forums</a></h3>');
                    $ownersMan.appendTo($resource);
                    $forum.appendTo($resource);
                    break;
                case 'nissan':
                    $ownersMan = $('<h3><a href="https://www.nissanusa.com/owners/ownership/manuals-guides.html" target="_blank">Owners Manuals</a></h3>');
                    $forum = $('<h3><a href="https://forums.nicoclub.com/" target="_blank">Forums</a></h3>');
                    $ownersMan.appendTo($resource);
                    $forum.appendTo($resource);
                    break;
                case 'jeep':
                    $ownersMan = $('<h3><a href="https://www.mopar.com/en-us/my-vehicle/vehicle-information.html?redirect=om" target="_blank">Owners Manuals</a></h3>');
                    $forum = $('<h3><a href="https://www.jeepforum.com/forums/" target="_blank">Forums</a></h3>');
                    $ownersMan.appendTo($resource);
                    $forum.appendTo($resource);
                    break;
                case 'hyundai':
                    $ownersMan = $('<h3><a href="https://owners.hyundaiusa.com/us/en/resources/manuals-warranties.html" target="_blank">Owners Manuals</a></h3>');
                    $forum = $('<h3><a href="https://www.hyundai-forums.com/forums/" target="_blank">Forums</a></h3>');
                    $ownersMan.appendTo($resource);
                    $forum.appendTo($resource);
                    break;
                case 'dodge':
                    $ownersMan = $('<h3><a href="https://www.mopar.com/en-us/my-vehicle/vehicle-information.html?redirect=om" target="_blank">Owners Manuals</a></h3>');
                    $forum = $('<h3><a href="https://www.dodgetalk.com/forums/" target="_blank">Forums</a></h3>');
                    $ownersMan.appendTo($resource);
                    $forum.appendTo($resource);
                    break;
                case 'subaru':
                    $ownersMan = $('<h3><a href="https://www.subaru.com/owners/vehicle-resources.html" target="_blank">Owners Manuals</a></h3>');
                    $forum = $('<h3><a href="https://www.thesubaruforums.com/" target="_blank">Forums</a></h3>');
                    $ownersMan.appendTo($resource);
                    $forum.appendTo($resource);
                    break;
                case 'gmc':
                    $ownersMan = $('<h3><a href="https://www.gmc.com/support/vehicle/manuals-guides" target="_blank">Owners Manuals</a></h3>');
                    $forum = $('<h3><a href="https://www.gmtruckclub.com/" target="_blank">Forums</a></h3>');
                    $ownersMan.appendTo($resource);
                    $forum.appendTo($resource);
                    break;
                case 'volkswagen':
                    $ownersMan = $('<h3><a href="https://www.vwserviceandparts.com/digital-resources/online-owners-manual/" target="_blank">Owners Manuals</a></h3>');
                    $forum = $('<h3><a href="https://www.vwforum.com/" target="_blank">Forums</a></h3>');
                    $ownersMan.appendTo($resource);
                    $forum.appendTo($resource);
                    break;
                case 'bmw':
                    $ownersMan = $('<h3><a href="https://www.bmwusa.com/owners-manuals.html" target="_blank">Owners Manuals</a></h3>');
                    $forum = $('<h3><a href="https://www.bimmerpost.com/" target="_blank">Forums</a></h3>');
                    $ownersMan.appendTo($resource);
                    $forum.appendTo($resource);
                    break;
                case 'mercedes benz':
                    $ownersMan = $('<h3><a href="https://www.mbusa.com/en/owners/manuals" target="_blank">Owners Manuals</a></h3>');
                    $forum = $('<h3><a href="https://forums.mercedesclub.org.uk/index.php" target="_blank">Forums</a></h3>');
                    $ownersMan.appendTo($resource);
                    $forum.appendTo($resource);
                    break;
                case 'tesla':
                    $ownersMan = $('<h3><a href="https://www.tesla.com/ownersmanual" target="_blank">Owners Manuals</a></h3>');
                    $forum = $('<h3><a href="https://teslamotorsclub.com/tmc/" target="_blank">Forums</a></h3>');
                    $ownersMan.appendTo($resource);
                    $forum.appendTo($resource);
                    break;
                default:
                    $noRes = $('<h3>No Results for now! Manufacturer will be added soon!</h3>')
                    sendEmail();
            }
        })
    }
})