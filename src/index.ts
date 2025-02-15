import angular from "angular";
import app from "./app/app.module";
import "./index.css";

angular.element(document).ready(() => {
    angular.bootstrap(document, [app]);
});