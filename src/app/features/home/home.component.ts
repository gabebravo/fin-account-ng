import { IComponentController, IPromise, IComponentOptions } from 'angular';
import { AccountService } from '../../shared/services/account';
import template from './home.template.html';
import './home.style.scss';

export class HomeController implements IComponentController {
  static $inject = ['accountService', '$state'];
  accounts = [];
  searchTerm = '';
  sortField = 'accountName';
  sortDirection = 'asc';
  filteredAccounts = [];
  showAddAccountModal: boolean = false;
  newAccount: {
    accountName: string;
    ownerName: string;
    checkingAmount: number;
    savingsAmount: number;
  } = {
    accountName: '',
    ownerName: '',
    checkingAmount: 0,
    savingsAmount: 0,
  };

  constructor(private accountService: AccountService, private $state: any) {}

  $onInit(): void {
    this.loadAccounts();
  }

  private loadAccounts(): IPromise<void> {
    return this.accountService.getAllAccounts().then((accounts) => {
      this.accounts = accounts;
      this.filteredAccounts = accounts;
      this.applySort();
    });
  }

  filterAccounts(): void {
    if (!this.searchTerm) {
      this.filteredAccounts = this.accounts;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    const searchFields = [
      'accountName',
      'ownerName',
      'createdDate',
      'checkingAmount',
      'savingsAmount',
    ];

    this.filteredAccounts = this.accounts.filter((account) =>
      searchFields.some((field) =>
        String(account[field]).toLowerCase().includes(term)
      )
    );
  }

  onSort(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.applySort();
  }

  private applySort(): void {
    this.filteredAccounts.sort((a, b) => {
      const factor = this.sortDirection === 'asc' ? 1 : -1;
      return a[this.sortField] > b[this.sortField] ? factor : -factor;
    });
  }

  onDelete(accountId: number): void {
    this.accounts = this.accounts.filter((a) => a.accountId !== accountId);
    this.filterAccounts();
  }

  openAddAccountModal(): void {
    this.showAddAccountModal = true;
  }

  closeAddAccountModal(): void {
    this.showAddAccountModal = false;
    this.resetNewAccountForm();
  }

  resetNewAccountForm(): void {
    this.newAccount = {
      accountName: '',
      ownerName: '',
      checkingAmount: 0,
      savingsAmount: 0,
    };
  }

  addAccount(): void {
    const newAccountData = {
      ...this.newAccount,
      createdDate: new Date(),
      accountId: Date.now().toString(), // Temporary ID generation - replace with your actual ID generation method
    };

    // Add your API call here to save the account
    // this.accountService.createAccount(newAccountData).then(() => {
    //   this.loadAccounts(); // Refresh the accounts list
    //   this.closeAddAccountModal();
    // });

    // Temporary: directly add to accounts array (replace with actual API implementation)
    this.accounts.push(newAccountData);
    this.filterAccounts(); // Update filtered accounts
    this.closeAddAccountModal();
  }

  logAccountInfo(account): void {
    this.$state.go('account', { id: account.accountId });
  }
}

export const HomeComponent: IComponentOptions & {
  componentName: string;
  componentDefinition: IComponentOptions;
} = {
  template,
  controller: HomeController,
  controllerAs: '$ctrl',
  componentName: 'homeComponent',
  componentDefinition: {
    template,
    controller: HomeController,
    controllerAs: '$ctrl',
  },
};
