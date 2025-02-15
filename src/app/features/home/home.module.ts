import angular from "angular";
import { homeState } from "./home.state";
import { HomeComponent } from "./home.component";
import { StateRegistry } from "@uirouter/angularjs";

configFn.$inject = ["$stateRegistryProvider"]
function configFn($stateRegistryProvider: StateRegistry) {
    $stateRegistryProvider.register(homeState);
}

export const homeModule = angular
    .module("home", ["ui.router"])
    .config(configFn)
    .component(HomeComponent.componentName, HomeComponent.componentDefinition);