new fullpage('#fullpage', {
    autoScrolling: true,
    navigation: false,
    controlArrows: true,
    slidesNavigation: true,
    slidesNavPosition: 'bottom',
    anchors: ['section1', 'section2']
})

const carMakes = [
    { make: 'acura', manual: 'https://owners.acura.com/vehicles/warranty', forum: 'https://acurazine.com/forums/' },
    { make: 'kia', manual: 'https://owners.kia.com/content/owners/en/manuals.html', forum: 'https://www.kia-forums.com/' },
    { make: 'ford', manual: 'https://www.ford.com/support/owner-manuals/', forum: 'https://www.fordforums.com/' },
    { make: 'chevrolet', manual: 'https://www.chevrolet.com/support/vehicle/manuals-guides', forum: 'https://chevroletforum.com/forum/' },
    { make: 'honda', manual: 'https://owners.honda.com/vehicle-information/manuals', forum: 'https://honda-tech.com/forums/' },
    { make: 'toyota', manual: 'https://www.toyota.com/owners/resources/warranty-owners-manuals', forum: 'https://www.toyotanation.com/' },
    { make: 'nissan', manual: 'https://www.nissanusa.com/owners/ownership/manuals-guides.html', forum: 'https://forums.nicoclub.com/' },
    { make: 'jeep', manual: 'https://www.mopar.com/en-us/my-vehicle/vehicle-information.html?redirect=om', forum: 'https://www.jeepforum.com/forums/' },
    { make: 'hyundai', manual: 'https://owners.hyundaiusa.com/us/en/resources/manuals-warranties.html', forum: 'https://www.hyundai-forums.com/forums/' },
    { make: 'dodge', manual: 'https://www.mopar.com/en-us/my-vehicle/vehicle-information.html?redirect=om', forum: 'https://www.dodgetalk.com/forums/' },
    { make: 'subaru', manual: 'https://www.subaru.com/owners/vehicle-resources.html', forum: 'https://www.thesubaruforums.com/' },
    { make: 'gmc', manual: 'https://www.gmc.com/support/vehicle/manuals-guides', forum: 'https://www.gmtruckclub.com/' },
    { make: 'volkswagen', manual: 'https://www.vwserviceandparts.com/digital-resources/online-owners-manual/', forum: 'https://www.vwforum.com/' },
    { make: 'bmw', manual: 'https://www.bmwusa.com/owners-manuals.html', forum: 'https://www.bimmerpost.com/' },
    { make: 'mercedes benz', manual: 'https://www.mbusa.com/en/owners/manuals', forum: 'https://forums.mercedesclub.org.uk/index.php' },
    { make: 'tesla', manual: 'https://www.tesla.com/ownersmanual', forum: 'https://teslamotorsclub.com/tmc/' },
];

const $vin = $('#entry');
const $submit = $('#submit');
$submit.click(function() {
    const $vehInfo = $("#vehInfo")
    const $resource = $("#specRes")
    $vehInfo.empty();
    $resource.empty();
    if ($vin.val().length !== 0) {
        $.get('https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/' + $vin.val() + '?format=json', (data) => {
            const $vinSpecs = $('<h2>Specs</h2>')
            const $vinMake = $('<h3>' + 'Make: ' + data.Results[0].Make + '</h3>');
            const $vinModel = $('<h3>' + 'Model: ' + data.Results[0].Model + '</h3>');
            const $vinYear = $('<h3>' + 'Year: ' + data.Results[0].ModelYear + '</h3>');
            const $vinEngineConf = $('<h3>' + 'Engine Config: ' + data.Results[0].EngineConfiguration + ' ' + data.Results[0].EngineCylinders + ' Cylinder' + '</h3>')
            const $vinEngineDes = $('<h3>' + 'Engine Desig: ' + data.Results[0].EngineModel + '</h3>')
            const $vinEngineHP = $('<h3>' + 'Engine HP: ' + data.Results[0].EngineHP + '</h3>')
            $vinSpecs.appendTo($vehInfo);
            $vinMake.appendTo($vehInfo);
            $vinModel.appendTo($vehInfo);
            $vinYear.appendTo($vehInfo);
            $vinEngineConf.appendTo($vehInfo);
            $vinEngineDes.appendTo($vehInfo)
            $vinEngineHP.appendTo($vehInfo)

            let make = (data.Results[0].Make).toLowerCase();
            let foundMake = carMakes.find(car => car.make === make);
            let $ownersMan;
            let $forum;
            let $noRes;
            const $resources = $('<h2>Resources</h2>')

            if (foundMake) {
                console.log(foundMake, " found make")
                $ownersMan = $('<h3><a href="' + foundMake.manual + '" target="_blank">Owners Manuals</a></h3>');
                $forum = $('<h3><a href="' + foundMake.forum + '" target="_blank">Forums</a></h3>');
                $resources.appendTo($resource);
                $ownersMan.appendTo($resource);
                $forum.appendTo($resource);
            } else {
                $noRes = $('<h3>No Results for now! Manufacturer will be added soon!</h3>')
                $noRes.appendTo($resource);
            }
        })
    }
})

$vin.on('click', function(event) {
    if (event.keycode === 13) {
        $submit.click();
    }
})