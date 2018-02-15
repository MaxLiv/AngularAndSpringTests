var langOtherTempl = [];
langOtherTempl['ru'] = 'Другие шаблоны';
langOtherTempl['uk'] = 'Інші шаблони';
var defOtherTempl = 'Інші шаблони';

function run() {
    // search_Option = document.getElementById("search_option");
    doScript8(json);
}

function doScript8(data) {
    var resTemplArr = [];
    var resTemplArr2 = [];
    var templIrc = [];
    var addr = [];
    var listHOS = data.listHOS;
    var search_Option = document.getElementById("search_option").value;
    console.debug(search_Option);


    if (listHOS) {
        for (var cnt = 0; cnt < listHOS.length; cnt++) {
            var cityToCheck = '';
            if (listHOS[cnt].addressMessage && listHOS[cnt].addressMessage.listNodeAddress && ( listHOS[cnt].hos && listHOS[cnt].hos !== '')) {
                listHOS[cnt].addressMessage.listNodeAddress.forEach(function (nodeAddress) {
                    if (nodeAddress.nodeOrder === 4) {
                        cityToCheck = nodeAddress.code;
                    }
                });
            }
            processSrvList(listHOS[cnt].listProviderService.providerServices, resTemplArr, search_Option, listHOS[cnt].hos, cityToCheck);
            if (listHOS[cnt].hos && listHOS[cnt].hos !== '') {
                if (listHOS[cnt].hos !== "")
                    addr[listHOS[cnt].hos] = listHOS[cnt].addressMessage.listNodeAddress;
            }
        }

        // console.debug(addr);

        // console.debug("-----");
        //
        //
        // resTemplArr.forEach(function (t) {
        //    console.debug(t);
        // });
        //
        // console.debug("-------");

        //исключение шаблонов где в ид есть буквы, и шаблоны ирц помещаю в отдельный массив

        for (var cnt = 0; cnt < resTemplArr.length; cnt++) {

            if (resTemplArr[cnt].elem.templateId.match(/^\d+$/) !== null) {
                if (resTemplArr[cnt].elem.pkeyProviderKind !== 49 && resTemplArr[cnt].elem.pkeyProviderKind !== 147) {
                    resTemplArr[cnt].elem.addrId = addr[resTemplArr[cnt].hos] ? formAdress(addr[resTemplArr[cnt].hos], resTemplArr[cnt].elem) : langOtherTempl[lang] ? langOtherTempl[lang] : defOtherTempl;
                    resTemplArr2.push(resTemplArr[cnt].elem);
                    // console.debug(resTemplArr[cnt].hos + ": " + resTemplArr[cnt].elem.addrId);
                    // console.debug(formAdress(addr[resTemplArr[cnt].hos], resTemplArr[cnt].elem));
                } else {//если ирц
                    var e = resTemplArr[cnt].elem;
                    // console.debug(e)
                    var hos = resTemplArr[cnt].hos;
                    // console.debug("IRC");
                    // console.debug(e);

                    //для каждой уникальной комбинации sp_hash+provided формирую шаблон
                    if (!templIrc[hos + "-" + e.provideId + "-" + e.sp_hash]) {
                        templIrc[hos + "-" + e.provideId + "-" + e.sp_hash] = {
                            sp_hash: e.sp_hash,
                            idBp: e.idBP,
                            count: e.idBP,
                            templ: e,
                            tms: e.p_timestamp,
                            countSet: false,
                            hos: hos
                        };
                        console.debug(templIrc[hos + "-" + e.provideId + "-" + e.sp_hash])

                    } else {
                        var e1 = templIrc[hos + "-" + e.provideId + "-" + e.sp_hash];
                        if (!e1.countSet && (e1.sp_hash != e.sp_hash)) {
                            e1.count = null;
                            e1.countSet = true;
                        } else {
                            if (e1.totalPersonalAcc && e.totalPersonalAcc && e.totalPersonalAcc == e1.totalPersonalAcc) {
                                e1.count = e1.totalPersonalAcc;
                            } else if (e.idBp && e1.idBp && e.idBp == e1.idBp) {
                                e1.count = e1.idBp;
                            }
                        }
                        if (e1.tms < e.p_timestamp) {
                            e1.templ = e;
                            e1.tms = e.p_timestamp;
                        }
                        console.debug(templIrc[hos + "-" + e.provideId + "-" + e.sp_hash])

                    }
                }
            }
            // console.debug("----------------------");
        }

        templIrc.forEach(function (t) {
            console.debug(t);
        });

        //добавляю в результат ирц шаблоны
        for (var key in templIrc) {
            var el = templIrc[key].templ;
            el.comp_kinds_name = "ИРЦ";
            el.totalPersonalAcc = templIrc[key].count;
            if (addr[templIrc[key].hos]) {
                el.addrId = formAdress(addr[templIrc[key].hos]);
            } else {
                el.addrId = langOtherTempl[lang] ? langOtherTempl[lang] : defOtherTempl;
            }
            resTemplArr2.push(el);
            // console.debug(el);
        }
        res = resTemplArr2;
        // console.debug("---------------");
        // templIrc.forEach(function (t) {
        //     console.debug(t);
        // });

    }

    // var res = "";
    // res.forEach(function (t) {
    //     console.debug(t.serviceName)
    // });
    // document.getElementById('demo').innerHTML = res;
}

function formAdress(addr) {
    var ret = "";
    for (var cnt = 0; cnt < addr.length; cnt++) {
        if (addr[cnt].nodeOrder >= 3) {
            ret += addr[cnt].typeSName + ". " + addr[cnt].nodeName + (cnt === addr.length - 1 ? "" : ", ");
        }
    }
    return ret;
}

function checkByCity(elem, city_id) {
    if (!elem || elem === '') {
        return true;
    }
    return city_id && elem === city_id;
}

function checkByCitys(elem, city_ids) {
    if (!elem || elem === '') {
        return true;
    }

    if (city_ids && city_ids.length) {
        var ret = false;
        city_ids.forEach(function (c) {
            if (elem === c) {
                ret = true;
                return false;
            }
        });
        return ret;
    } else {
        return false;
    }
}

function processSrvList(providerServices, resTemplArr, search_option, hos, cityToCheck) {
    var address = document.getElementById("address").value;
    var city_id = document.getElementById("city_id").value;
    console.debug("city_id: " + city_id);
    var city_ids = [];

    // var address = "";
    for (var cnt = 0; cnt < providerServices.length; cnt++) {
        var elem = providerServices[cnt];
        if ((cont(elem.name, search_option)
                || cont(elem.company, search_option)
                || cont(elem.personalAcc, search_option)
                || cont(elem.organizationOkpo, search_option)
                || cont(elem.serviceName, search_option))
            && (
                ((!address || address === '') && ((checkByCity(cityToCheck, city_id) || checkByCitys(cityToCheck, city_ids))) || ((!city_ids || !city_ids.length) && !city_id))
                || (
                    address
                    && address !== ''
                    && (!elem.hosId || elem.hosId === address)
                )
            )
        ) {
            resTemplArr.push({elem: elem, hos: hos});
        }
    }
}

function cont(string1, string2) {
    if (!string1) {
        return false;
    }
    var reg = '';
    for (var cnt = 0; cnt < string2.split(' ').length; cnt++) {
        var regPart = doEscape(string2.split(' ')[cnt].toLowerCase());
        reg += ".*" + regPart + ".*";
    }
    console.debug("reg: " + reg);

        var string11 = string1.toLowerCase();
    return string11.match(new RegExp(reg)) !== null;
}

function doEscape(text) {
    console.debug("doEscape: " + text.replace(/[\+\-\\&|!()\[\]^"~*?:\/]/g, "\\$&"));
    return text.replace(/[\+\-\\&|!()\[\]^"~*?:\/]/g, "\\$&");
}


var json = {
    "listHOS": [{
        "hos": "3403ZCQITE3510",
        "listProviderService": {
            "providerServices": [{
                "provideId": "null",
                "templateId": "264147080",
                "templateStatus": "1",
                "categoryId": 31,
                "organizationOkpo": "40569203",
                "organizationMFO": "328704",
                "personalAcc": "26000054348697",
                "organizationId": "2963087",
                "baseId": 0,
                "hosId": "3403ZCQITE3510",
                "addrId": "м. Дніпро, вул. Центральна, буд. 1",
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceId": "2963090",
                "serviceName": "Вивіз сміття",
                "city_id": 4249,
                "fio": "ДРОЗД АНАСТАСІЯ ЮРІЇВНА",
                "comp_kinds_name": "ЖЭКи (квартплата)",
                "p_timestamp": "2017-12-14 11:38:32.260",
                "company": "Чорноморська-2А, ОСББ",
                "name": "Чорноморська-2А, ОСББ"
            }, {
                "provideId": "null",
                "templateId": "264147130",
                "templateStatus": "1",
                "categoryId": 31,
                "organizationOkpo": "40569203",
                "organizationMFO": "328704",
                "personalAcc": "26000054348697",
                "organizationId": "2963087",
                "baseId": 0,
                "hosId": "3403ZCQITE3510",
                "addrId": "м. Дніпро, вул. Центральна, буд. 1",
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceId": "2963092",
                "serviceName": "Внески за утримання будинку та будинк. терит.",
                "city_id": 4249,
                "fio": "ДРОЗД АНАСТАСІЯ ЮРІЇВНА",
                "comp_kinds_name": "ЖЭКи (квартплата)",
                "p_timestamp": "2017-12-14 11:38:46.393",
                "company": "Чорноморська-2А, ОСББ",
                "name": "Чорноморська-2А, ОСББ"
            }]
        },
        "listClients": {
            "listClient": [{
                "hosId": "3403ZCQITE3510",
                "ekbId": "1013078223",
                "catclId": 1,
                "billingStatus": "Y",
                "modifyDate": "2017-12-05 14:32:25.386+0200"
            }],
            "flagOwner": false
        },
        "addressMessage": {
            "zip": "49000",
            "fullNameAddress": "1",
            "listNodeAddress": [{
                "nodeName": "Украина",
                "typeName": "страна",
                "nodeOrder": 1,
                "typeSName": "стр",
                "code": "UA40773"
            }, {
                "nodeName": "Днепропетровская",
                "typeName": "область",
                "nodeOrder": 2,
                "typeSName": "обл",
                "code": "UA4973"
            }, {
                "nodeName": "Днепр",
                "typeName": "город",
                "nodeOrder": 4,
                "typeSName": "г",
                "code": "UA4974"
            }, {
                "nodeName": "Центральная",
                "typeName": "улица",
                "nodeOrder": 8,
                "typeSName": "ул",
                "code": "2X44VZ8LBG5I00"
            }, {
                "nodeName": "1",
                "typeName": "дом",
                "nodeOrder": 9,
                "typeSName": "д",
                "code": "3403ZCQITE3510"
            }],
            "outherId": "3403ZCQITE3510",
            "sourceAddr": "HOS"
        }
    }, {
        "hos": "1321R22KDQ8L50",
        "listProviderService": {
            "providerServices": [{
                "provideId": "2027683",
                "templateId": "251342254",
                "templateStatus": "1",
                "categoryId": 39,
                "organizationOkpo": "3336810350",
                "organizationMFO": "305299",
                "totalPersonalAcc": "2378343",
                "personalAcc": "26008050291433",
                "organizationId": "2027683",
                "baseId": 0,
                "idBP": "2378343",
                "hosId": "1321R22KDQ8L50",
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceId": "2027687",
                "serviceName": "Триолан.НЕТ - 2378343",
                "city_id": 4249,
                "division_okpo": "3336810350",
                "comp_kinds_name": "Интернет",
                "sp_hash": "9d9387fb953af02aac1c6c68de2eb0b8",
                "p_timestamp": "2017-08-09 09:38:01.330",
                "pkeyProviderKind": 39,
                "company": "ФО-П Петренко Александр",
                "name": "Тріолан (Triolan)"
            }, {
                "provideId": "899677",
                "templateId": "251645428",
                "templateStatus": "1",
                "categoryId": 147,
                "organizationOkpo": "30231686",
                "organizationMFO": "305750",
                "totalPersonalAcc": "0330047448",
                "personalAcc": "29025827003103",
                "organizationId": "899677",
                "baseId": 0,
                "hosId": "1321R22KDQ8L50",
                "addrId": "м.Кривий Ріг, вул. 5-й Зарічний (Пк), буд. 74, кв. 20",
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceId": "901294",
                "serviceName": "газопостач. (ТОВ Дніпропетровськгаз збу)",
                "city_id": 4249,
                "fio": "ДРОЗД АНАСТАСІЯ ЮРІЇВНА",
                "comp_kinds_name": "Нова-Ком",
                "sp_hash": "4269491d6f25eef9eae902c58b001714",
                "p_timestamp": "2017-10-25 15:54:02.406",
                "pkeyProviderKind": 147,
                "company": "ТОВ \"Нова Ком\"",
                "name": "ТОВ \"Нова Ком\""
            }, {
                "provideId": "899677",
                "templateId": "251645429",
                "templateStatus": "1",
                "categoryId": 147,
                "organizationOkpo": "30231686",
                "organizationMFO": "305750",
                "totalPersonalAcc": "4414020",
                "personalAcc": "29025827003103",
                "organizationId": "899677",
                "baseId": 0,
                "hosId": "1321R22KDQ8L50",
                "addrId": "м.Кривий Ріг, вул. 5-й Зарічний (Пк), буд. 74, кв. 20",
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceId": "901294",
                "serviceName": "електроенергія (ПАТ \"ДТЕК Дніпрообленерго\")",
                "city_id": 4249,
                "fio": "ДРОЗД АНАСТАСІЯ ЮРІЇВНА",
                "comp_kinds_name": "Нова-Ком",
                "sp_hash": "4269491d6f25eef9eae902c58b001714",
                "p_timestamp": "2017-10-25 15:54:02.406",
                "pkeyProviderKind": 147,
                "company": "ТОВ \"Нова Ком\"",
                "name": "ТОВ \"Нова Ком\""
            }, {
                "provideId": "899677",
                "templateId": "251650952",
                "templateStatus": "1",
                "categoryId": 147,
                "organizationOkpo": "30231686",
                "organizationMFO": "305750",
                "totalPersonalAcc": "80323016",
                "personalAcc": "29025827003103",
                "organizationId": "899677",
                "baseId": 0,
                "hosId": "1321R22KDQ8L50",
                "addrId": "м.Кривий Ріг, вул. 5-й Зарічний (Пк), буд. 74, кв. 20",
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceId": "901294",
                "serviceName": "телеком.послуги (ТОВ \"Воля-Кабель\")",
                "city_id": 4249,
                "fio": "ДРОЗД АНАСТАСІЯ ЮРІЇВНА",
                "comp_kinds_name": "Нова-Ком",
                "sp_hash": "4269491d6f25eef9eae902c58b001714",
                "p_timestamp": "2017-10-25 15:54:02.406",
                "pkeyProviderKind": 147,
                "company": "ТОВ \"Нова Ком\"",
                "name": "ТОВ \"Нова Ком\""
            }, {
                "provideId": "879926",
                "templateId": "257186751",
                "templateStatus": "1",
                "categoryId": 28,
                "organizationOkpo": "00131587",
                "organizationMFO": "325796",
                "totalPersonalAcc": "2800018841",
                "personalAcc": "26030300104030",
                "organizationId": "879926",
                "baseId": 0,
                "idBP": "2800018841",
                "hosId": "1321R22KDQ8L50",
                "addrId": "ЛИБОХОРА УРЗВІР 0кв0",
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceId": "879928",
                "serviceName": "За електричну енергію",
                "city_id": 4249,
                "fio": "КОЗАКОВ ЛЕВ ВІКТОРОВИЧ",
                "division_okpo": "00131587",
                "comp_kinds_name": "Облэнерго",
                "sp_hash": "6b350c85a1ecd020b7b477ef8dd73a8b",
                "p_timestamp": "2017-10-04 16:49:21.163",
                "pkeyProviderKind": 28,
                "company": "ПрАТ Львівобленерго Сколівський РЕМ",
                "name": "Львівобленерго ПрАТ"
            }, {
                "provideId": "2991588",
                "templateId": "259155365",
                "templateStatus": "1",
                "categoryId": 30,
                "organizationOkpo": "03327090",
                "organizationMFO": "313399",
                "totalPersonalAcc": "6801797",
                "personalAcc": "26004055727995",
                "organizationId": "2991588",
                "baseId": 0,
                "idBP": "6801797",
                "hosId": "1321R22KDQ8L50",
                "addrId": "г. Николаев, ул. Потемкинская, д. 63",
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceId": "2991604",
                "serviceName": "За услуги водоснабжения и водоотведения",
                "city_id": 4249,
                "fio": "ДРОЗД АНАСТАСІЯ ЮРІЇВНА",
                "comp_kinds_name": "Водоканал и канализация",
                "sp_hash": "ff52829867ecf0adfbd87618185b549f",
                "p_timestamp": "2017-10-24 15:32:11.490",
                "pkeyProviderKind": 30,
                "company": "Водоканал Мелитопольского горсовета",
                "name": "За услуги водоснабжения и водоотведения"
            }, {
                "provideId": "2058899",
                "templateId": "259279806",
                "templateStatus": "1",
                "categoryId": 49,
                "organizationOkpo": "14360570",
                "organizationMFO": "303440",
                "personalAcc": "29028790800032",
                "organizationId": "2058899",
                "baseId": 0,
                "idBP": "383-11-88",
                "hosId": "1321R22KDQ8L50",
                "addrId": "пpоспект МОЛОДI 11 кв 88",
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceId": "2058903",
                "serviceName": "УТРИМ.БУДИHКУ;383-11-88",
                "city_id": 4249,
                "fio": "ДРОЗД АНАСТАСІЯ ЮРІЇВНА",
                "comp_kinds_name": "ИРЦ",
                "sp_hash": "3775264d76ed28c1d06f58f3d21c9950",
                "p_timestamp": "2017-10-26 13:26:30.256",
                "pkeyProviderKind": 49,
                "company": "Городской вычислительный центр ООО",
                "name": "Місцевий обчислювальний центр ТзОВ"
            }, {
                "provideId": "2058899",
                "templateId": "259279809",
                "templateStatus": "1",
                "categoryId": 49,
                "organizationOkpo": "14360570",
                "organizationMFO": "303440",
                "personalAcc": "29028790800032",
                "organizationId": "2058899",
                "baseId": 0,
                "idBP": "383-11-88",
                "hosId": "1321R22KDQ8L50",
                "addrId": "пpоспект МОЛОДI 11 кв 88",
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceId": "2058909",
                "serviceName": "ГАРЯЧА ВОДА;383-11-88",
                "city_id": 4249,
                "fio": "ДРОЗД АНАСТАСІЯ ЮРІЇВНА",
                "comp_kinds_name": "ИРЦ",
                "sp_hash": "3775264d76ed28c1d06f58f3d21c9950",
                "p_timestamp": "2017-10-26 13:26:30.253",
                "pkeyProviderKind": 49,
                "company": "Городской вычислительный центр ООО",
                "name": "Місцевий обчислювальний центр ТзОВ"
            }, {
                "provideId": "2058899",
                "templateId": "259279811",
                "templateStatus": "1",
                "categoryId": 49,
                "organizationOkpo": "14360570",
                "organizationMFO": "303440",
                "personalAcc": "29028790800032",
                "organizationId": "2058899",
                "baseId": 0,
                "idBP": "383-11-88",
                "hosId": "1321R22KDQ8L50",
                "addrId": "пpоспект МОЛОДI 11 кв 88",
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceId": "2058913",
                "serviceName": "АВАHС на опал.;383-11-88",
                "city_id": 4249,
                "fio": "ДРОЗД АНАСТАСІЯ ЮРІЇВНА",
                "comp_kinds_name": "ИРЦ",
                "sp_hash": "3775264d76ed28c1d06f58f3d21c9950",
                "p_timestamp": "2017-10-26 13:26:30.256",
                "pkeyProviderKind": 49,
                "company": "Городской вычислительный центр ООО",
                "name": "Місцевий обчислювальний центр ТзОВ"
            }, {
                "provideId": "2058899",
                "templateId": "259279815",
                "templateStatus": "1",
                "categoryId": 49,
                "organizationOkpo": "14360570",
                "organizationMFO": "303440",
                "personalAcc": "29028790800032",
                "organizationId": "2058899",
                "baseId": 0,
                "idBP": "383-11-88",
                "hosId": "1321R22KDQ8L50",
                "addrId": "пpоспект МОЛОДI 11 кв 88",
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceId": "2058995",
                "serviceName": "ЕЛЕКТР.ПО ЛIЧИЛ;383-11-88",
                "city_id": 4249,
                "fio": "ДРОЗД АНАСТАСІЯ ЮРІЇВНА",
                "comp_kinds_name": "ИРЦ",
                "sp_hash": "3775264d76ed28c1d06f58f3d21c9950",
                "p_timestamp": "2017-10-26 13:26:30.253",
                "pkeyProviderKind": 49,
                "company": "Городской вычислительный центр ООО",
                "name": "Місцевий обчислювальний центр ТзОВ"
            }, {
                "provideId": "2058899",
                "templateId": "259279818",
                "templateStatus": "1",
                "categoryId": 49,
                "organizationOkpo": "14360570",
                "organizationMFO": "303440",
                "personalAcc": "29028790800032",
                "organizationId": "2058899",
                "baseId": 0,
                "idBP": "383-11-88",
                "hosId": "1321R22KDQ8L50",
                "addrId": "пpоспект МОЛОДI 11 кв 88",
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceId": "2059001",
                "serviceName": "СТОКИ ГАР.ВОДИ;383-11-88",
                "city_id": 4249,
                "fio": "ДРОЗД АНАСТАСІЯ ЮРІЇВНА",
                "comp_kinds_name": "ИРЦ",
                "sp_hash": "3775264d76ed28c1d06f58f3d21c9950",
                "p_timestamp": "2017-10-26 13:26:30.253",
                "pkeyProviderKind": 49,
                "company": "Городской вычислительный центр ООО",
                "name": "Місцевий обчислювальний центр ТзОВ"
            }, {
                "provideId": "1302987",
                "templateId": "260302486",
                "templateStatus": "1",
                "categoryId": 26,
                "organizationOkpo": "39595350",
                "organizationMFO": "336503",
                "totalPersonalAcc": "0710322432",
                "personalAcc": "26030301955003",
                "organizationId": "1303565",
                "baseId": 0,
                "idBP": "51c3200e406c6886e1ad55840a7207a8",
                "hosId": "1321R22KDQ8L50",
                "addrId": "г. Николаев, ул. Потемкинская, дом. 63",
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceId": "1303583",
                "serviceName": "Оплата за газ",
                "city_id": 4249,
                "fio": "Кiчан Тамара Григорiвна",
                "comp_kinds_name": "Газ",
                "sp_hash": "bce4dfaa09dbb4de7fb0291f35d47fc6",
                "p_timestamp": "2017-12-06 14:42:28.780",
                "pkeyProviderKind": 49,
                "company": "ООО Ивано-Франковскгаз Сбыт (г. Ивано -Франковск)",
                "name": "Комунальні платежі м.Івано-Франківськ/ЄК Івано-Франківськ"
            }, {
                "provideId": "899677",
                "templateId": "261887851",
                "templateStatus": "1",
                "categoryId": 147,
                "organizationOkpo": "30231686",
                "organizationMFO": "305750",
                "totalPersonalAcc": "101202597",
                "personalAcc": "29025827003103",
                "organizationId": "899677",
                "baseId": 0,
                "hosId": "1321R22KDQ8L50",
                "addrId": "м.Кривий Ріг, вул. 5-й Зарічний (Пк), буд. 74, кв. 20",
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceId": "901294",
                "serviceName": "послуги.зв’язку (ПАТ \"Укртелеком\")",
                "city_id": 4249,
                "fio": "ДРОЗД АНАСТАСІЯ ЮРІЇВНА",
                "comp_kinds_name": "Нова-Ком",
                "sp_hash": "4269491d6f25eef9eae902c58b001714",
                "p_timestamp": "2017-11-21 11:00:27.116",
                "pkeyProviderKind": 147,
                "company": "ТОВ \"Нова Ком\"",
                "name": "ТОВ \"Нова Ком\""
            }, {
                "provideId": "1302987",
                "templateId": "262805892",
                "templateStatus": "1",
                "categoryId": 27,
                "organizationOkpo": "03345863",
                "organizationMFO": "336677",
                "totalPersonalAcc": "110837",
                "personalAcc": "26008052506975",
                "organizationId": "1303756",
                "baseId": 0,
                "idBP": "51c3200e406c6886e1ad55840a7207a8",
                "hosId": "1321R22KDQ8L50",
                "addrId": "г. Николаев, ул. Потемкинская, дом. 63",
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceId": "1303759",
                "serviceName": "За вывоз мусора",
                "city_id": 4249,
                "fio": "Кiчан Тамара Григорiвна",
                "comp_kinds_name": "Мусор, экология",
                "sp_hash": "bce4dfaa09dbb4de7fb0291f35d47fc6",
                "p_timestamp": "2017-12-06 14:42:28.780",
                "pkeyProviderKind": 49,
                "company": "Автотранспортное предприятие 0928 ОАО",
                "name": "Комунальні платежі м.Івано-Франківськ/ЄК Івано-Франківськ"
            }, {
                "provideId": "1302987",
                "templateId": "263414446",
                "templateStatus": "1",
                "categoryId": 28,
                "organizationOkpo": "25683081",
                "organizationMFO": "336503",
                "totalPersonalAcc": "24053343",
                "personalAcc": "26036300018398",
                "organizationId": "1303649",
                "baseId": 0,
                "idBP": "51c3200e406c6886e1ad55840a7207a8",
                "hosId": "1321R22KDQ8L50",
                "addrId": "г. Николаев, ул. Потемкинская, дом. 63",
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceId": "1303656",
                "serviceName": "Электроэнергия",
                "city_id": 4249,
                "fio": "Кiчан Тамара Григорiвна",
                "comp_kinds_name": "Облэнерго",
                "sp_hash": "bce4dfaa09dbb4de7fb0291f35d47fc6",
                "p_timestamp": "2017-12-06 14:42:28.780",
                "pkeyProviderKind": 49,
                "company": "Ивано-Франковский РЭС",
                "name": "Комунальні платежі м.Івано-Франківськ/ЄК Івано-Франківськ"
            }]
        },
        "listClients": {
            "listClient": [{
                "hosId": "1321R22KDQ8L50",
                "ekbId": "1013078223",
                "catclId": 1,
                "billingStatus": "Y",
                "modifyDate": "2017-06-01 14:37:52.063+0300"
            }],
            "flagOwner": false
        },
        "addressMessage": {
            "zip": "54000",
            "fullNameAddress": "63",
            "listNodeAddress": [{
                "nodeName": "Украина",
                "typeName": "страна",
                "nodeOrder": 1,
                "typeSName": "стр",
                "code": "UA40773"
            }, {
                "nodeName": "Николаевская",
                "typeName": "область",
                "nodeOrder": 2,
                "typeSName": "обл",
                "code": "UA21155"
            }, {
                "nodeName": "Николаев",
                "typeName": "город",
                "nodeOrder": 4,
                "typeSName": "г",
                "code": "UA21156"
            }, {
                "nodeName": "Потемкинская",
                "typeName": "улица",
                "nodeOrder": 8,
                "typeSName": "ул",
                "code": "2X3WYISMZ57B00"
            }, {
                "nodeName": "63",
                "typeName": "дом",
                "nodeOrder": 9,
                "typeSName": "д",
                "code": "35389NGUB3LEYC"
            }],
            "outherId": "35389NGUB3LEYC",
            "sourceAddr": "Biplan"
        }
    }, {
        "hos": "13IAQZHPBR5Z00",
        "listProviderService": {
            "providerServices": [{
                "provideId": "2058899",
                "templateId": "259279808",
                "templateStatus": "1",
                "categoryId": 49,
                "organizationOkpo": "14360570",
                "organizationMFO": "303440",
                "personalAcc": "29028790800032",
                "organizationId": "2058899",
                "baseId": 0,
                "idBP": "383-11-88",
                "hosId": "13IAQZHPBR5Z00",
                "addrId": "пpоспект МОЛОДI 11 кв 88",
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceId": "2058907",
                "serviceName": "ВОДА ПО ЛIЧИЛЬH;383-11-88",
                "city_id": 4249,
                "fio": "ДРОЗД АНАСТАСІЯ ЮРІЇВНА",
                "comp_kinds_name": "ИРЦ",
                "sp_hash": "3775264d76ed28c1d06f58f3d21c9950",
                "p_timestamp": "2017-10-26 13:28:16.893",
                "pkeyProviderKind": 49,
                "company": "Городской вычислительный центр ООО",
                "name": "Місцевий обчислювальний центр ТзОВ"
            }, {
                "provideId": "2058899",
                "templateId": "259279810",
                "templateStatus": "1",
                "categoryId": 49,
                "organizationOkpo": "14360570",
                "organizationMFO": "303440",
                "personalAcc": "29028790800032",
                "organizationId": "2058899",
                "baseId": 0,
                "idBP": "383-11-88",
                "hosId": "13IAQZHPBR5Z00",
                "addrId": "пpоспект МОЛОДI 11 кв 88",
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceId": "2058913",
                "serviceName": "ОПАЛЕHHЯ;383-11-88",
                "city_id": 4249,
                "fio": "ДРОЗД АНАСТАСІЯ ЮРІЇВНА",
                "comp_kinds_name": "ИРЦ",
                "sp_hash": "3775264d76ed28c1d06f58f3d21c9950",
                "p_timestamp": "2017-11-27 14:01:44.143",
                "pkeyProviderKind": 49,
                "company": "Місцевий обчислювальний центр ТзОВ",
                "name": "Місцевий обчислювальний центр ТзОВ"
            }, {
                "provideId": "2058899",
                "templateId": "259279812",
                "templateStatus": "1",
                "categoryId": 49,
                "organizationOkpo": "14360570",
                "organizationMFO": "303440",
                "personalAcc": "29028790800032",
                "organizationId": "2058899",
                "baseId": 0,
                "idBP": "383-11-88",
                "hosId": "13IAQZHPBR5Z00",
                "addrId": "пpоспект МОЛОДI 11 кв 88",
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceId": "2058917",
                "serviceName": "ПЛАТА ЗА ЗЕМЛЮ;383-11-88",
                "city_id": 4249,
                "fio": "ДРОЗД АНАСТАСІЯ ЮРІЇВНА",
                "comp_kinds_name": "ИРЦ",
                "sp_hash": "3775264d76ed28c1d06f58f3d21c9950",
                "p_timestamp": "2017-11-27 14:01:44.143",
                "pkeyProviderKind": 49,
                "company": "Місцевий обчислювальний центр ТзОВ",
                "name": "Місцевий обчислювальний центр ТзОВ"
            }, {
                "provideId": "2058899",
                "templateId": "259279813",
                "templateStatus": "1",
                "categoryId": 49,
                "organizationOkpo": "14360570",
                "organizationMFO": "303440",
                "personalAcc": "29028790800032",
                "organizationId": "2058899",
                "baseId": 0,
                "idBP": "383-11-88",
                "hosId": "13IAQZHPBR5Z00",
                "addrId": "пpоспект МОЛОДI 11 кв 88",
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceId": "2058927",
                "serviceName": "ВИВIЗ СМIТТЯ;383-11-88",
                "city_id": 4249,
                "fio": "ДРОЗД АНАСТАСІЯ ЮРІЇВНА",
                "comp_kinds_name": "ИРЦ",
                "sp_hash": "3775264d76ed28c1d06f58f3d21c9950",
                "p_timestamp": "2017-11-27 14:01:44.143",
                "pkeyProviderKind": 49,
                "company": "Місцевий обчислювальний центр ТзОВ",
                "name": "Місцевий обчислювальний центр ТзОВ"
            }, {
                "provideId": "2058899",
                "templateId": "259279814",
                "templateStatus": "1",
                "categoryId": 49,
                "organizationOkpo": "14360570",
                "organizationMFO": "303440",
                "personalAcc": "29028790800032",
                "organizationId": "2058899",
                "baseId": 0,
                "idBP": "383-11-88",
                "hosId": "13IAQZHPBR5Z00",
                "addrId": "пpоспект МОЛОДI 11 кв 88",
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceId": "2058951",
                "serviceName": "СТОКИ Г.В. ЛIЧ.;383-11-88",
                "city_id": 4249,
                "fio": "ДРОЗД АНАСТАСІЯ ЮРІЇВНА",
                "comp_kinds_name": "ИРЦ",
                "sp_hash": "3775264d76ed28c1d06f58f3d21c9950",
                "p_timestamp": "2017-10-26 13:28:16.896",
                "pkeyProviderKind": 49,
                "company": "Городской вычислительный центр ООО",
                "name": "Місцевий обчислювальний центр ТзОВ"
            }, {
                "provideId": "2058899",
                "templateId": "259279816",
                "templateStatus": "1",
                "categoryId": 49,
                "organizationOkpo": "14360570",
                "organizationMFO": "303440",
                "personalAcc": "29028790800032",
                "organizationId": "2058899",
                "baseId": 0,
                "idBP": "383-11-88",
                "hosId": "13IAQZHPBR5Z00",
                "addrId": "пpоспект МОЛОДI 11 кв 88",
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceId": "2058997",
                "serviceName": "ГАРЯЧ.ВОДА ЛIЧ.;383-11-88",
                "city_id": 4249,
                "fio": "ДРОЗД АНАСТАСІЯ ЮРІЇВНА",
                "comp_kinds_name": "ИРЦ",
                "sp_hash": "3775264d76ed28c1d06f58f3d21c9950",
                "p_timestamp": "2017-10-26 13:28:16.896",
                "pkeyProviderKind": 49,
                "company": "Городской вычислительный центр ООО",
                "name": "Місцевий обчислювальний центр ТзОВ"
            }, {
                "provideId": "2058899",
                "templateId": "259279819",
                "templateStatus": "1",
                "categoryId": 49,
                "organizationOkpo": "14360570",
                "organizationMFO": "303440",
                "personalAcc": "29028790800032",
                "organizationId": "2058899",
                "baseId": 0,
                "idBP": "383-11-88",
                "hosId": "13IAQZHPBR5Z00",
                "addrId": "пpоспект МОЛОДI 11 кв 88",
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceId": "2925555",
                "serviceName": "ДОМОФОHт788055;383-11-88",
                "city_id": 4249,
                "fio": "ДРОЗД АНАСТАСІЯ ЮРІЇВНА",
                "comp_kinds_name": "ИРЦ",
                "sp_hash": "3775264d76ed28c1d06f58f3d21c9950",
                "p_timestamp": "2017-11-27 14:01:44.143",
                "pkeyProviderKind": 49,
                "company": "Місцевий обчислювальний центр ТзОВ",
                "name": "Місцевий обчислювальний центр ТзОВ"
            }, {
                "provideId": "797523",
                "templateId": "262881817",
                "templateStatus": "1",
                "categoryId": 39,
                "organizationOkpo": "22426550",
                "organizationMFO": "326610",
                "personalAcc": "26008054200539",
                "organizationId": "797523",
                "baseId": 0,
                "hosId": "13IAQZHPBR5Z00",
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceId": "797574",
                "serviceName": "Интернет",
                "city_id": 4249,
                "fio": "ДРОЗД АНАСТАСІЯ ЮРІЇВНА",
                "comp_kinds_name": "Интернет",
                "sp_hash": "07d8a3f68af6f517947619b0125f268c",
                "p_timestamp": "2017-11-30 11:02:43.923",
                "pkeyProviderKind": 39,
                "company": "Дикий Сад",
                "name": "Дикий Сад"
            }, {
                "provideId": "2118328",
                "templateId": "263349139",
                "templateStatus": "1",
                "categoryId": 30,
                "organizationOkpo": "31448144",
                "organizationMFO": "380805",
                "totalPersonalAcc": "90613062",
                "personalAcc": "26009412783",
                "organizationId": "2118328",
                "baseId": 0,
                "idBP": "2190613062",
                "hosId": "13IAQZHPBR5Z00",
                "addrId": "ВУЛ. ПОТЬОМКІНСЬКА 61, кв. 13",
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceId": "2119516",
                "serviceName": "Холодная вода",
                "city_id": 4249,
                "fio": "ДРОЗД АНАСТАСІЯ ЮРІЇВНА",
                "comp_kinds_name": "Водоканал и канализация",
                "sp_hash": "2d40962eff74fd01a239b678eed27a8e",
                "p_timestamp": "2017-12-05 19:59:54.256",
                "pkeyProviderKind": 30,
                "company": "Николаевводоканал, ГКП",
                "name": "Николаевводоканал, ГКП"
            }]
        },
        "listClients": {
            "listClient": [{
                "hosId": "13IAQZHPBR5Z00",
                "ekbId": "1013078223",
                "catclId": 1,
                "billingStatus": "Y",
                "modifyDate": "2017-05-15 16:44:51.680+0300"
            }],
            "flagOwner": false
        },
        "addressMessage": {
            "zip": "54000",
            "fullNameAddress": "13",
            "listNodeAddress": [{
                "nodeName": "Украина",
                "typeName": "страна",
                "nodeOrder": 1,
                "typeSName": "стр",
                "code": "UA40773"
            }, {
                "nodeName": "Николаевская",
                "typeName": "область",
                "nodeOrder": 2,
                "typeSName": "обл",
                "code": "UA21155"
            }, {
                "nodeName": "Николаев",
                "typeName": "город",
                "nodeOrder": 4,
                "typeSName": "г",
                "code": "UA21156"
            }, {
                "nodeName": "Потемкинская",
                "typeName": "улица",
                "nodeOrder": 8,
                "typeSName": "ул",
                "code": "2X3WYISMZ57B00"
            }, {
                "nodeName": "61",
                "typeName": "дом",
                "nodeOrder": 9,
                "typeSName": "д",
                "code": "1312Q5LGC5LCX0"
            }, {
                "nodeName": "13",
                "typeName": "квартира",
                "nodeOrder": 11,
                "typeSName": "кв",
                "code": "13IAQZHPBR5Z00"
            }],
            "outherId": "13IAQZHPBR5Z00",
            "sourceAddr": "EKB"
        }
    }, {
        "hos": "3E19XZ57CVIB00",
        "listProviderService": {
            "providerServices": []
        },
        "listClients": {
            "listClient": [{
                "hosId": "3E19XZ57CVIB00",
                "ekbId": "1013078223",
                "catclId": 1,
                "billingStatus": "Y",
                "modifyDate": "2017-08-01 14:11:23.950+0300"
            }],
            "flagOwner": false
        },
        "addressMessage": {
            "zip": "54003",
            "fullNameAddress": "137",
            "listNodeAddress": [{
                "nodeName": "Украина",
                "typeName": "страна",
                "nodeOrder": 1,
                "typeSName": "стр",
                "code": "UA40773"
            }, {
                "nodeName": "Николаевская",
                "typeName": "область",
                "nodeOrder": 2,
                "typeSName": "обл",
                "code": "UA21155"
            }, {
                "nodeName": "Николаев",
                "typeName": "город",
                "nodeOrder": 4,
                "typeSName": "г",
                "code": "UA21156"
            }, {
                "nodeName": "Колодезная",
                "typeName": "улица",
                "nodeOrder": 8,
                "typeSName": "ул",
                "code": "2X3YIE3GRC1H00"
            }, {
                "nodeName": "4",
                "typeName": "дом",
                "nodeOrder": 9,
                "typeSName": "д",
                "code": "131K1YINI5Z000"
            }, {
                "nodeName": "137",
                "typeName": "квартира",
                "nodeOrder": 11,
                "typeSName": "кв",
                "code": "3E19XZ57CVIB00"
            }],
            "outherId": "3E19XZ57CVIB00",
            "sourceAddr": "HOS"
        }
    }, {
        "hos": "13W33JOD2MPZR0",
        "listProviderService": {
            "providerServices": []
        },
        "listClients": {
            "listClient": [],
            "flagOwner": false
        },
        "addressMessage": {
            "zip": "54000",
            "fullNameAddress": "2",
            "listNodeAddress": [{
                "nodeName": "Украина",
                "typeName": "страна",
                "nodeOrder": 1,
                "typeSName": "стр",
                "code": "UA40773"
            }, {
                "nodeName": "Николаевская",
                "typeName": "область",
                "nodeOrder": 2,
                "typeSName": "обл",
                "code": "UA21155"
            }, {
                "nodeName": "Николаев",
                "typeName": "город",
                "nodeOrder": 4,
                "typeSName": "г",
                "code": "UA21156"
            }, {
                "nodeName": "Потемкинская",
                "typeName": "улица",
                "nodeOrder": 8,
                "typeSName": "ул",
                "code": "2X3WYISMZ57B00"
            }, {
                "nodeName": "3",
                "typeName": "дом",
                "nodeOrder": 9,
                "typeSName": "д",
                "code": "1314LJTOCYFX20"
            }, {
                "nodeName": "2",
                "typeName": "квартира",
                "nodeOrder": 11,
                "typeSName": "кв",
                "code": "13W33JOD2MPZR0"
            }],
            "outherId": "13W33JOD2MPZR0",
            "sourceAddr": "HOS"
        }
    }, {
        "hos": "1329FHQ3DBF2Q0",
        "listProviderService": {
            "providerServices": []
        },
        "listClients": {
            "listClient": [{
                "hosId": "1329FHQ3DBF2Q0",
                "ekbId": "1013078223",
                "catclId": 1,
                "billingStatus": "Y",
                "modifyDate": "2017-12-14 12:00:14.190+0200"
            }],
            "flagOwner": false
        },
        "addressMessage": {
            "zip": "54000",
            "fullNameAddress": "1",
            "listNodeAddress": [{
                "nodeName": "Украина",
                "typeName": "страна",
                "nodeOrder": 1,
                "typeSName": "стр",
                "code": "UA40773"
            }, {
                "nodeName": "Николаевская",
                "typeName": "область",
                "nodeOrder": 2,
                "typeSName": "обл",
                "code": "UA21155"
            }, {
                "nodeName": "Николаев",
                "typeName": "город",
                "nodeOrder": 4,
                "typeSName": "г",
                "code": "UA21156"
            }, {
                "nodeName": "Центральный",
                "typeName": "проспект",
                "nodeOrder": 8,
                "typeSName": "просп",
                "code": "2X3XGSJS65GW00"
            }, {
                "nodeName": "1",
                "typeName": "дом",
                "nodeOrder": 9,
                "typeSName": "д",
                "code": "1318VL7SWXELJ0"
            }, {
                "nodeName": "1",
                "typeName": "квартира",
                "nodeOrder": 11,
                "typeSName": "кв",
                "code": "1329FHQ3DBF2Q0"
            }],
            "outherId": "1329FHQ3DBF2Q0",
            "sourceAddr": "HOS"
        }
    }, {
        "hos": "",
        "listProviderService": {
            "providerServices": [{
                "provideId": "null",
                "templateId": "250750986",
                "templateStatus": "1",
                "categoryId": 12,
                "organizationOkpo": "38253953",
                "organizationMFO": "302689",
                "personalAcc": "26001055310424",
                "organizationId": "2287227",
                "baseId": 0,
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceId": "2287230",
                "serviceName": "За изготовление ювелирных изделий",
                "city_id": 4249,
                "fio": "ДРОЗД АНАСТАСІЯ ЮРІЇВНА",
                "comp_kinds_name": "Коммерческие платежи",
                "p_timestamp": "2017-08-01 14:01:37.286",
                "company": "24 КАРАТА, ООО",
                "name": "За изготовление ювелирных изделий"
            }, {
                "templateId": "a223603363",
                "categoryId": 0,
                "baseId": 0,
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceName": "ОПЛАТА ЗА МОБИЛЬНУЮ СВЯЗЬ № ТЕЛ. [+380930162256]",
                "city_id": 0,
                "name": "ТОВ ?АСТЕЛ?Т?"
            }, {
                "templateId": "a483964067",
                "categoryId": 0,
                "baseId": 0,
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceName": "ПЕРЕВОД НА КАРТУ ПРИВАТБАНКА. ПЛ-ЩИК: ДРОЗД АНАСТАСИЯ ЮРЬЕВНА{{DAS=P24A316513028A37499}}{{DAI=10386958}}{{DA20=2}}",
                "city_id": 0,
                "name": "МАСЛЕНИКОВА СВЕТЛАНА ЮРЬЕВНА"
            }, {
                "templateId": "a421446783",
                "categoryId": 0,
                "baseId": 0,
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceName": "ОПЛАТА ЗА МОБИЛЬНУЮ СВЯЗЬ № ТЕЛ. [+380974795903]",
                "city_id": 0,
                "name": "ПРАТ ?КИЇВСТАР?"
            }, {
                "templateId": "a477513457",
                "categoryId": 0,
                "baseId": 0,
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceName": "ОПЛАТА ЗА МОБИЛЬНУЮ СВЯЗЬ № ТЕЛ. [+380636722921]",
                "city_id": 0,
                "name": "ТОВ ?АСТЕЛ?Т?"
            }, {
                "templateId": "a477519155",
                "categoryId": 0,
                "baseId": 0,
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceName": "ОПЛАТА ЗА МОБИЛЬНУЮ СВЯЗЬ № ТЕЛ. [+380932470012]",
                "city_id": 0,
                "name": "ТОВ ?АСТЕЛ?Т?"
            }, {
                "templateId": "a471427295",
                "categoryId": 0,
                "baseId": 0,
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceName": "ОПЛАТА ЗА МОБИЛЬНУЮ СВЯЗЬ № ТЕЛ. [+380930215546]",
                "city_id": 0,
                "name": "ТОВ ?АСТЕЛ?Т?"
            }, {
                "templateId": "a470806951",
                "categoryId": 0,
                "baseId": 0,
                "clientEKB": "1013078223",
                "clientCategory": 0,
                "serviceName": "ПЕРЕВОД НА КАРТУ ПРИВАТБАНКА. ПЛ-ЩИК: ДРОЗД АНАСТАСИЯ ЮРЬЕВНА{{DAS=P24A301641231A82797}}{{DAI=10386958}}{{DA20=2}}",
                "city_id": 0,
                "name": "ТКАЧЕНКО АННА ВЛАДИМИРОВНА"
            }]
        },
        "listClients": {
            "listClient": [],
            "flagOwner": false
        }
    }],
    "listInvoises": {
        "listInvoises": []
    },
    "ekb": "1013078223"
};


// doScript8();


var result = [
    {
        id: "138890"
    },
    {
        id: "1096774"
    },
    {
        id: "1281067"
    },
    {
        id: "1282596"
    },
    {
        id: "1283706"
    },
    {
        id: "1285928"
    },
    {
        id: "1035841"
    },
    {
        id: "797523"
    },
    {
        id: "1467749"
    },
    {
        id: "2118328"
    },
    {
        id: "2126442"
    },
    {
        id: "2010762"
    },
    {
        id: "2296761"
    },
    {
        id: "374387"
    },
    {
        id: "2509942"
    },
    {
        id: "2471194"
    },
    {
        id: "2591862"
    },
    {
        id: "2702852"
    },
    {
        id: "2884462"
    }
];

function query() {
    var search_Option = document.getElementById("search_option").value;
    console.debug(search_Option);
    if (search_Option) {
        var fq = "&fq=" + '+del:false' +
            "&fq=" + '+juridical:0' +
            "&fq=" + '+kind_id:(17 26 27 28 29 30 31 32 39 40 41 42 49 123 139 147)' +
            "&fq=" + getString4SearchOtion(search_Option);
        console.debug("fq " + fq);
        var query = '';
        //query+='+del:false +juridical:0 ';
        var str = '';
        for (var cnt = 0; cnt < result.length; cnt++) {
            var wight = (result.length - cnt);
            str += 'id2:' + result[cnt].id + '^' + wight + (cnt != result.length - 1 ? ' ' : '');
        }
        if (str != "")
            query += ' +(*' + str + '*)';
        var q = encodeURIComponent(query);
    }

    query = '';
    // query += '+del:false +juridical:0 ';
    str = '';
    for (var cnt = 0; cnt < result.length; cnt++) {
        wight = (result.length - cnt);
        str += 'id2:' + result[cnt].id + '^' + wight + (cnt != result.length - 1 ? ' ' : '');
    }
    if (str != "")
        query += ' +(' + str + ')';

    // query += ' +(kind_id:17 kind_id:26 kind_id:27 kind_id:28 kind_id:29 kind_id:30 kind_id:31 kind_id:32 kind_id:39 kind_id:40 kind_id:41 kind_id:42 kind_id:49 kind_id:123 kind_id:139 kind_id:147)-parent_cnt:[0 TO *]';
    q = encodeURIComponent(query);
    console.debug(query)
    console.debug("-------------------")
    console.debug(q);
}

function prepareInp(q) {
    console.debug("q before " + q);
    var regExp = /[1\+\-\\&|!()\[\]^"~*?:\/]/g;
    var retq = q.replace(regExp, "\\$&");
    var sort = q.replace(regExp, "\\\\\\$&");
    console.debug("retq " + retq);
    console.debug("sort " + sort);
    return {q: retq, s: sort};
}

function getString4SearchOtion(opt_) {
    var opt = opt_;
    opt = prepareInp(opt).q;
    var opt1 = '*' + opt.replace(/\s/g, 'Ъ') + '*';
    var opt2 = '*' + opt.replace(/\s/g, "") + '*';//replace all whitespace

    var optService = opt.replace(/\s/g, "|");//replace all whitespace
    var arr = optService.split("|");
    var opt3 = '';
    var opt5 = '';
    for (var cnt = 0; cnt < arr.length; cnt++) {

        opt3 += (cnt == 0 ? '' : ' ') + '+' + '*' + arr[cnt] + '*';
        opt5 += (cnt < arr.length - 1 ? '' : " ") + '*' + arr[cnt] + '*';
    }
    console.debug("magic3:(" + opt5 + ")");
    return "magic3:(" + opt5 + ")";
//    opt3='('+opt3+')';//every word write single *word*
//    var opt4='(*'+opt.replace(/\s/g, "*")+'*)';//replace all whitespace by *
//    opt5='('+opt5+')';//every word write single *word1* *word2*
//    return "+("+opt1+" "+opt2+" "+opt3+" "+opt4+" "+opt5+")";
}

