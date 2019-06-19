import _ from "lodash";

export default function($scope) {
  // This would be loaded by $http etc.
  const $ctrl = this;
  $ctrl.list = [];
  $scope.loading = true;

  // const delay = time => new Promise(resolve => setTimeout(resolve, time));
  $ctrl.init = function(url = "posts") {
    //alert("hey");
    fetch("https://jsonplaceholder.typicode.com/" + url)
      .then(res => res.json())
      .then(data => {
        $ctrl.list = data;
        $scope.loading = false;
        $scope.$digest();
      })
      .catch(error => console.error(error));
  };

  $scope.getList = function(newValue) {
    const url = newValue.status.value === "archived" ? "todos" : "posts";
    $ctrl.init(url);
    console.log();
  };

  $scope.$parent.$watch("query", $scope.getList, true);
}
