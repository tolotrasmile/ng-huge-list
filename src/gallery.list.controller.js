export default function($scope) {
  // This would be loaded by $http etc.
  $scope.list = [
    {
      name: "Superman",
      location: ""
    },
    {
      name: "Batman",
      location: "Wayne Manor"
    }
  ];

  console.log($scope);
}
