import { HomeComponent } from "./home.component";
import { Ng1StateDeclaration } from "@uirouter/angularjs";

export const homeState: Ng1StateDeclaration = {
    name: "home",
    url: "/home",
    component: `${HomeComponent.componentName}`
};