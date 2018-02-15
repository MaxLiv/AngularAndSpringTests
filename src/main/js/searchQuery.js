var inp = data.inp ? data.inp : "днепр газ";
var city = data.city ? data.city : "UA33533";
var ids = data.ids ? data.ids : [807592, 808088, 1003538];
inp = inp.trim();
var QueryBuilder = {
    /**
     * Подготовка запросов в формате для солра
     *
     * @param {type} q запрос
     * @returns {QueryBuilder.prepareInp.SolrSearchScriptBuilderAnonym$4}
     */
    prepareInp: function (q) {
        var regExp = /[1\+\-\\&|!()\[\]^"~*?:\/]/g;
        var retq = q.replace(regExp, "\\$&");
        var sort = q.replace(regExp, "\\\\\\$&");
        return {q: retq.split(/ +/), s: sort.split(/ +/)};
    },
    /**
     * Формирование запроса и сортировки
     * @param {type} words массивы слов в формате для q и для sort
     * @param {type} city город
     * @param {type} ids айдишники
     * @param {type} delFpFalse добавить флаг delFP:false
     * @param {type} juridical юридический признак
     * @param addStarAtBeggin - добавлять "*" в начало искомой строки
     * @returns {QueryBuilder.buildQueryWords.SolrSearchScriptBuilderAnonym$5}
     */
    buildQueryWords: function (words, city, ids, delFpFalse, juridical, addStarAtBeggin,category_group) {
        var pref = "magic3:";
        var v1 = pref + "(*" + words.q.join("Ъ") + "*)";
        var v2 = pref + "(*" + words.q.join("") + "*)";
        var v3 = pref + "(*" + words.q.join("*") + "*)";
        var v4 = pref + "(+*" + words.q.join("* +*") + "*)";
        var v5 = pref + "(*" + words.q.join("* *") + "*)";
        var vs1 = pref + "(*" + words.s.join("Ъ") + "*)";
        var vs2 = pref + "(*" + words.s.join("") + "*)";
        var vs3 = pref + "(*" + words.s.join("*") + "*)";
        var vs4 = pref + "(+*" + words.s.join("* +*") + "*)";
        var vs5 = pref + "(*" + words.s.join("* *") + "*)";
        var vtotal='';
        if (!addStarAtBeggin){
            var cnt=0;
            words.q.forEach(function(item){
                vtotal+='+(magic3:'+item+'*)';
                cnt++;
            });
        }

        var stat = false;
        for (var i = 0; i < words.q.length; i++) {
            if (words.q[i].length < 3) {
                stat = true;
            }
        }
        var s = !addStarAtBeggin ? vtotal : stat || words.q.length > 3 ? v3 : v5;
        var query = "+del:false +juridical:"+juridical+" +budg:false +"
            //+ v1 + " " + v2 + " " + v3 + " " + v4 + " "
            + s
            + this.getIds(ids);
        var sorting =
            (city ? 'if(query({!v="+cities:' + city + ' +' + vs1 + '"},0),pcity'+city+',0) desc,\n' : '')
            +(data.city_ids && data.city_ids.length ? 'if(query({!v="+('+this.getCityes()+') +' + vs1 + '"},0),pcity'+city+',0) desc,\n' : '')
            + 'if(query({!v="' + vs1 + '"},0),payments,0) desc,'
            + '\nif(query({!v="' + vs2 + '"},0),1,0) desc,'
            + '\nif(query({!v="' + vs3 + '"},0),1,0) desc,'
            //            + '\n' + 'if(query({!v="+cities:' + city + ' +' + vs4 + '"},0),1,0) desc,'
            //            + '\n' + 'if(query({!v="' + vs4 + '"},0),payments,0) desc,'
            //            + '\n' + 'if(query({!v="+cities:' + city + ' +' + vs5 + '"},0),1,0) desc,'
            //            + '\n' + 'if(query({!v="' + vs5 + '"},0),1,0) desc,'
            + '\nscore  desc';
        var fields = 'magic,cities2,id,budget_id,subordinate_id,acc_list,' +
            'company_name,altName,kind_id,key,score,' +
            'p1:if(query({!v="' + vs1 + '"},0),payments,0),' +
            'p2:if(query({!v="' + vs2 + '"},0),1,0),' +
            'p3:if(query({!v="' + vs3 + '"},0),payments,0),' +
            'p4:if(query({!v="' + vs4 + '"},0),1,0),' +
            'p5:query({!v="' + vs5 + '"})';
        fields = "magic,cities,id,budget_id,subordinate_id,acc_list,okpo";
        var fq = /*"&omitHeader=true"
         + */"&fq=" + ("+del:false")
            + "&fq=" + ("+juridical:"+juridical)
            + "&fq=" + ("+budg:false")
            + "&fq=" + (s)
            + "&fq=" + (delFpFalse?("+delFP:false"):"")
            + "&fq=%7B!collapse%20field%3Dparent_key%20sort%3D%27score%20desc%27%20nullPolicy%3D%27expand%27%7D"
            +(category_group ? '&fq=+kind_group_id:'+category_group: '')
            + this.getIdsFq(ids);
        return {query: query, sorting: sorting, fields: fields, fq: fq, queryFq: ("*:*")};
    },
    getIds: function (ids) {
        if (!ids)
            return "";
        else if (ids instanceof Array) {
            return (!ids.length ? "" : " -id2:" + ids.join(" -id2:"));
        } else {
            return ids;
        }
    },
    getIdsFq: function (ids) {
        var fq = "";
        if (ids && ids.length > 0) {
            for (var i = 0; i < ids.length; i++) {
                fq += "&fq=" + ("-id2:" + ids[i]);
            }
        }
        return fq;
    },
    getCityes:function(){
        var s='';
        data.city_ids.forEach(function(c){
            s+=(s==='' ? '' : ' ' )+'cities:'+c;
        });
        return s;
    },
    /**
     * Построение запросы и сортировки для цифровых запросов
     * @param {type} q тектс запроса
     * @param {type} city город
     * @param {type} ids айдишники
     * @param {type} delFpFalse добавить флаг delFP:false
     * @param {type} juridical юридический признак
     * @returns {QueryBuilder.buildQueryNumbers.SolrSearchScriptBuilderAnonym$6}
     */
    buildQueryNumbers: function (q, city, ids, delFpFalse, juridical, category_group) {




        var query = "+del:false +juridical:"+juridical+" +accs:" + q + " "
            + this.getIds(ids);
        var fields = 'magic,cities,id,budget_id,subordinate_id,acc_list,okpo';
        var sorting = 'budg asc,'
            + (city ? 'if(query({!v="+cities:' + city + '"},0),1,0) desc,' : '')
            + (data.city_ids && data.city_ids.length ? 'if(query({!v="+('+this.getCityes()+')"},0),1,0) desc,' : '')
            + 'score desc';
        var fq = /*"&omitHeader=true"
         + */"&fq=" + ("+del:false")
            + "&fq=" + ("+juridical:"+juridical)
            + "&fq=" + ("+accs:" + q)
            + "&fq=" + (delFpFalse?("+delFP:false"):"")
            +(category_group ? '&fq=+kind_group_id:'+category_group: '')
            + "&fq=%7B!collapse%20field%3Dparent_key%20sort%3D%27score%20desc%27%20nullPolicy%3D%27expand%27%7D"
            + this.getIdsFq(ids);
        return {query: query, sorting: sorting, fields: fields, queryFq: ("*:*"), fq: fq, isNumber: true};
    },
    /**
     * Ф-ция, которая разбирает числовой или текстовый ввод и строит все запросы и сортировки
     * (вызывается из интерфейса)
     * @param {type} inp ввод
     * @param {type} city город
     * @param {type} ids айдишники
     * @param {type} juridical юридический признак
     * @param addStarAtBegin - добавлять "*" в начало при поиске по словам
     * @returns {QueryBuilder.buildQueryWords.SolrSearchScriptBuilderAnonym$5|QueryBuilder.buildQueryNumbers.SolrSearchScriptBuilderAnonym$6}
     */
    buildQuery: function (inp, city, ids, delFpFalse, juridical, addStarAtBegin,category_group) {
        inp = inp.trim().toLowerCase();
        ids = !ids || ids == [] || ids == [""] ? null : ids;
        city = !city || city.trim() == "" ? null : city;
        juridical = juridical || "0";
        if (inp.match(/^\d+$/)) {
            return this.buildQueryNumbers(inp, city, ids, delFpFalse, juridical,category_group);
        } else {
            return this.buildQueryWords(this.prepareInp(inp), city, ids, delFpFalse, juridical,addStarAtBegin,category_group);
        }
    },
    /**
     * Функция для формирования запросов в конвейере.
     *
     * @param {type} d data
     * @param addStarAtBegin добавлять "*" в начало строки при поиске
     * @returns {undefined}
     */
    buildFromData: function () {
        var d = {
            q:"дикий",
            city_ids:""
        };
        var search_Option = document.getElementById("search_option").value;
        var city_id = document.getElementById("city_id").value;

        if (search_Option)
            return;
        var q = this.buildQuery(search_Option, city_id, d.list_id, false, false, true, d.category_group);
        d.q = (q.query);
        d.sort = (q.sorting);
        if (q.fq) {
            d.q = q.queryFq;
            d.fq = q.fq;
            //если поиск  по счету , окпо - то ен исключаю ничего
            if (q.isNumber){
                return;
            }
            //если город не передается, не отображаю в результатах получателей с флагом excl_kind
            if (!d.city_id){
                //d.fq+='&fq='+('+excl_kind:false');
            }else if (d.city_id){
                d.fq+= '&fq='+('cities:'+d.city_id+' OR (-excl_kind:[* TO *]) OR (excl_kind:false) OR  (-cities:[* TO *])');
            } else if (d.city_ids){
                var s='';
                d.city_ids.forEach(function(c){
                    s+=(s!=='' ? ' OR ' :'') +'cities:'+c;
                });
                d.fq+= '&fq='+('('+s+') OR (-excl_kind:[* TO *]) OR (excl_kind:false) OR  (-cities:[* TO *])');
            }
        }
    }
};
