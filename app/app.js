import angular from "angular";
import ngRoute from "angular-route";
import AppConfig from "./scripts/config/AppConfig.js";
import handleError from "./scripts/directives/handleError.js";
import ACtrl from "./scripts/controllers/ACtrl.js";
import QCtrl from "./scripts/controllers/QCtrl.js";
import dataService from "./scripts/services/dataService.js";
import "./scss/application.scss";

angular.module("qaApp", [ngRoute])
	.config(["$routeProvider", AppConfig])
	.service("dataService", ["$http", dataService])
	.directive("handleError", [handleError])
	.controller("ACtrl", ["$scope", "$routeParams", "dataService", ACtrl])
	.controller("QCtrl", ["$scope", "dataService", QCtrl]);

