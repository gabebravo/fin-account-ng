import { ILocationProvider } from "angular";
import { UrlService } from "@uirouter/angularjs";

export const routeConfigFn = configFn;

configFn.$inject = ["$urlServiceProvider", "$locationProvider"];
function configFn($urlServiceProvider: UrlService, $locationProvider: ILocationProvider) {
    // Redirect to the home page if no other route matches.
    $urlServiceProvider.rules.otherwise("/home");

    // Redirect to the home page if the URL doesn't include a path segment.
    $urlServiceProvider.rules.when("/", "/home");
    $urlServiceProvider.rules.when("", "/home");

    $locationProvider.html5Mode({ enabled: true, requireBase: false });
}