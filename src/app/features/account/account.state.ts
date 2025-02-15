import { Ng1StateDeclaration } from '@uirouter/angularjs';

export const accountState: Ng1StateDeclaration = {
  name: 'account',
  url: '/account/:id',
  component: 'accountComponent',
};
