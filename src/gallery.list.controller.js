import _ from "lodash";
export default function($scope) {
  // This would be loaded by $http etc.
  const $ctrl = this;
  $scope.list = [];
  $scope.loading = true;
  $scope.page = 0;
  $scope.hasMorePage = false;

  function getList(url = "posts") {
    $scope.loading = true;
    fetch("https://jsonplaceholder.typicode.com/" + url)
      .then(res => res.json())
      .then(data => {
        $scope.hasMorePage = $scope.page > 5;
        $scope.list = data.slice(0, 1);
        $scope.loading = false;
        console.log(JSON.stringify($scope.getNormalizedQuery($ctrl.query)));

        // Force rerender
        $scope.$digest();
      })
      .catch(error => console.error(error));
  }

  $scope.getSortingValue = function({ _id: sortKey = "intelligent" }) {
    const sign = sortKey.startsWith("-") ? -1 : 1;
    let key = sign > 0 ? sortKey : sortKey.substr(1);

    if (key === "intelligent") {
      const intelligentFilters = {
        inProgress: "created",
        published: "publicationDate",
        archived: "archivingDate"
      };
      key = intelligentFilters[$ctrl.filter];
    }

    return { [key]: sign };
  };

  $scope.getNormalizedQuery = function(query) {
    return {
      limit: query.limit,
      sort: $scope.getSortingValue(query.options),
      categories: query.categories._id,
      status: query.status.value,
      page: $scope.page
    };
  };

  // Utiliser debounce juste pour grouper le nombre de requêtes par 100ms
  $scope.getList = _.debounce(getList, 200);

  $scope.setPage = function(page) {
    if (page >= 0) {
      $scope.page = page;
      $scope.getList($ctrl.filter === "archived" ? "todos" : "posts");
    }
  };

  $scope.canShow = function(status) {
    return status.value === "all" || status.value === $ctrl.filter;
  };

  // Watch la valeur de query dans $parent
  $scope.onQueryChanged = function(newValue) {
    if ($scope.canShow(newValue.status)) {
      $scope.setPage(0);
    }
  };

  $scope.$parent.$watch("query", $scope.onQueryChanged, true);
}
