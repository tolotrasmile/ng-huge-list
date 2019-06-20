import _ from "lodash";

export default function($scope, $localStorage) {
  $scope.options = Object.freeze([
    { _id: "eventName", name: "Nom d'évènement" },
    { _id: "-eventName", name: "Nom d'évènement (inversé)" },
    { _id: "eventDate", name: "Date d'évènement" },
    { _id: "-eventDate", name: "Date d'évènement (inversé)" },
    { _id: "created", name: "Date de création" },
    { _id: "-created", name: "Date de création (inversé)" },
    { _id: "intelligent", name: "Intelligent" },
    { _id: "-intelligent", name: "Intelligent (inversé)" }
  ]);

  $scope.status = [
    { name: "Toutes", value: "all" },
    { name: "En cours", value: "inProgress" },
    { name: "Publiées", value: "published" },
    { name: "Archivées", value: "archived" }
  ];

  $scope.categories = [
    {
      name: "Toutes",
      _id: undefined
    },
    {
      name: "Categorie 1",
      _id: "5d08b95a4009b941f1b2c9c3"
    },
    {
      name: "Categorie 1",
      _id: "5d08e1449f308e09fae812cd"
    },
    {
      name: "Non classées",
      _id: null
    }
  ];

  $localStorage.$default({ galleryOptions: {} });

  function updateQuery(newValue) {
    $localStorage.galleryOptions = newValue;
  }

  $scope.$watch("query", _.throttle(updateQuery, 100), true);

  $scope.init = function() {
    const { limit } = $localStorage.galleryOptions || {};

    function getValue(path, key, index = 0) {
      const storageValue = $localStorage.galleryOptions[path];

      if (storageValue) {
        const result = _.find($scope[path], x => x[key] === storageValue[key]);
        return result;
      }

      return $scope[path][index];
    }

    $scope.query = {
      options: getValue("options", "_id"),
      categories: getValue("categories", "_id"),
      status: getValue("status", "value"),
      limit: limit || 30
    };
  };
}
