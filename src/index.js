import angular from "angular";
import "ngstorage";
import "restangular";
import GalleryController from "./gallery.controller";
import GalleryListController from "./gallery.list.controller";

const module = angular.module("app", ["ngStorage", "restangular"]);

// configuration de Restangular
module.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl(process.env.API_BASE_URL);
  RestangularProvider.setRestangularFields({
    id: "_id"
  });
});

module.component("galleryList", {
  controller: GalleryListController,
  templateUrl: "gallery.list.view.html",
  bindings: {
    query: "<",
    name: "<"
  }
});

module.component("galleryDetails", {
  controller($scope) {
    let ctrl = this;
    console.log(ctrl, $scope);
  },
  templateUrl: "gallery-details.view.html",
  bindings: {
    galleryItem: "<"
  }
});

module.component("gallery", {
  controller: ["$scope", "$localStorage", GalleryController],
  templateUrl: "gallery.view.html"
});

module.controller("AppController", function() {});

// Manually bootstrap your angular application
angular.bootstrap(document.getElementById("root"), ["app"]);
