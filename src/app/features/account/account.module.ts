import angular from 'angular';
import { AccountComponent } from './account.component';
import { accountState } from './account.state';

export const accountModule = angular
  .module('account', ['ui.router'])
  .config([
    '$stateProvider',
    ($stateProvider) => {
      $stateProvider.state(accountState);
    },
  ])
  .component(
    AccountComponent.componentName,
    AccountComponent.componentDefinition
  );
