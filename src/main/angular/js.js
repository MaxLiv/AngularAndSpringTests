var app = angular.module('myApp', []).controller('namesCtrl', function ($rootScope, $scope, $http) {
    $scope.names = [
        {name: 'Jani', country: 'Norway'},
        {name: 'Hege', country: 'Sweden'},
        {name: 'Kai', country: 'Denmark'}
    ];
    $scope.filterByName = function (x) {
        $rootScope.fname = x;
    };

    $scope.names = [
        {name: 'Jani', country: 'Norway', people: 10000},
        {name: 'Carl', country: 'Sweden', people: 10000},
        {name: 'Margareth', country: 'England', people: 10000},
        {name: 'Hege', country: 'Norway', people: 10000},
        {name: 'Joe', country: 'Denmark', people: 10000},
        {name: 'Gustav', country: 'Sweden', people: 10000},
        {name: 'Birgit', country: 'Denmark', people: 1000050},
        {name: 'Mary', country: 'England', people: 155984},
        {name: 'Kai', country: 'Norway', people: 105215}
    ];
    $scope.orderByMe = function (x) {
        $scope.myOrderBy = x;
    };
    $scope.tableValue = function (x, y, z) {
        $scope.nameFromTable = x;
        $scope.countryFromTable = y;
        $scope.peopleFromTable = z;
    };


    $scope.sendRequest = function () {


        var url = 'http://10.13.71.232:8181/mypays-api/search/all';

        var data = {
            // addressId: "1315WIS2IDZYQ0",
            // cityId: "UA21156",
            ekb: "1027377150",
            lang: "ru",
            outSource: "MP",
            searchOption: $scope.searchOption,
            templates: true,
            // neighbors: true,
            simpleSearch: true

        };

        var json =  angular.toJson(data);

        // var json = "{\n" +
        //     "\t\"searchOption\":\"дикий\"  ,\n" +
        //     "\t\"addressId\":\"1321R22KDQ8L50\",\n" +
        //     "\t\"cityId\":\"UA21156\",\n" +
        //     "\t\"ekb\":\"1013078223\",\n" +
        //     "\t\"templates\": true,\n" +
        //     "\t\"lang\":\"ru\",\n" +
        //     "\t\"outSource\":\"P24\"\n" +
        //     "}";

        console.debug(json);

        // var xhr = new XMLHttpRequest();
        // xhr.open("POST", url, true);
        //
        // xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        // // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //
        //
        // var response = xhr.send(json);
        //
        // console.debug(response);


        $http.post(url, data).then(function (response) {
            console.info("sending...");

            $scope.response = response.data;
            console.info($scope.response);
        }, function () {
            console.info("nope")
        });

        // $http({
        //     method: 'POST',
        //     url: url,
        //     data: data,
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin': url
        //     }
        // });
    };

    $scope.checkResponse = function () {
        return typeof $scope.response !== "undefined"
    }
});
app.filter("myFormat", function () {
    return function (x) {
        var arr = [];
        var param = "";
        x.forEach(function (o) {
            if (o.name.toLocaleLowerCase().indexOf(param) >= 0) arr.push(o);
        });
        return arr;
    };

});
