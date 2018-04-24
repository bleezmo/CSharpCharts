(function () {
    'use strict';
    angular.module("app", []);
})();
(function () {
    'use strict';
    angular.module("app").controller("mainController", mainController);
    mainController.$inject = ['$http'];
    function mainController($http) {
        var vm = this;
        activate();
        function activate() {
            $http.get("/main/data").then(function (result) {
                loadPlot(result.data);
            }, function (err) {
                console.error(err);
            });
        }
        function loadPlot(data) {
            vm.data = data;
        }
    }
})();
(function () {
    'use strict';
    angular.module("app").directive("chart", chart);
    chart.$inject = [];
    function chart() {
        return {
            template: "<canvas id=\"{{::chartVm.chartName}}\"></canvas>",
            restrict: 'A',
            controller: chartController,
            controllerAs: "chartVm",
            bindToController: true,
            scope: {
                data: "<"
            },
            link: function (scope, elem, attrs, controller) {
                controller.chartName = attrs.chart;
                elem.css("height", "400px");
                elem.css("width", "400px");
            }
        };
        chartController.$inject = ["$scope"]
        function chartController($scope) {
            var chartVm = this;
            chartVm.$onInit = activate;
            function activate() {
                $scope.$watch("chartVm.data", function (chartData) {
                    if (chartData) {
                        console.log(chartData);
                        if (chartVm.chart) {
                            chartVm.chart.destroy();
                        }
                        var ctx = document.getElementById(chartVm.chartName);
                        chartVm.chart = new Chart(ctx, {
                            type: "line",
                            data: {
                                datasets: [{
                                    label: chartData.label,
                                    data: chartData.data
                                }]
                            },
                            options: {
                                scales: {
                                    xAxes: [{
                                        type: 'linear',
                                        position: 'bottom'
                                    }]
                                }
                            }
                        });
                    }
                });
            }
        }
    }
})();