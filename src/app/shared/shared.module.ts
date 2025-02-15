import angular from "angular";
import { routeConfigFn } from "./routing/index";
import { AccountService } from "./services";

export {
    AccountActivity,
    AccountDetail,
    AccountService,
    AccountSummary
} from "./services/index"

export const sharedModule = angular
    .module("shared", [])
    .config(routeConfigFn)
    .service(AccountService.serviceName, AccountService);