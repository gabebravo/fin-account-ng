export class AccountComponent {
  static componentName = 'accountComponent';
  static $inject = ['$stateParams', 'accountService', '$state'];

  accountDetails: any = null;
  accountDetailsExtra: any = null;
  isLoading: boolean = true;

  constructor(
    private $stateParams: any,
    private accountService: any,
    private $state: any
  ) {}

  $onInit() {
    this.accountService
      .getAllAccounts()
      .then((accounts) => {
        this.accountDetails = accounts.find(
          (account) => account.accountId === parseInt(this.$stateParams.id)
        );

        if (this.accountDetails) {
          return this.accountService
            .getAccountDetails(this.accountDetails.ownerId)
            .then((detailedAccounts) => {
              const matchingAccount = detailedAccounts.find(
                (account) => account.accountId === this.accountDetails.accountId
              );
              this.accountDetailsExtra = matchingAccount || detailedAccounts[0];
            });
        }
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  goBack() {
    this.$state.go('home');
  }

  static componentDefinition = {
    template: `
      <div class="p-8 max-w-4xl mx-auto">
        <!-- Loading State -->
        <div ng-if="$ctrl.isLoading" class="flex justify-center items-center h-64">
          <p class="text-xl text-gray-600">Loading...</p>
        </div>

        <!-- Content (only shown when not loading) -->
        <div ng-if="!$ctrl.isLoading">
          <!-- Back Button -->
          <button 
            ng-click="$ctrl.goBack()"
            class="mb-6 flex items-center text-blue-600 hover:text-blue-800"
          >
            <span class="mr-2">←</span> Back
          </button>

          <h1 class="text-2xl font-bold mb-6">Account Details</h1>
          
          <div class="bg-white shadow rounded-lg p-6 mb-6">
            <h2 class="text-xl font-semibold mb-4">Owner Information</h2>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-gray-600">Owner Name</p>
                <p class="font-medium">{{ $ctrl.accountDetailsExtra.ownerName }}</p>
              </div>
              <div>
                <p class="text-gray-600">FICO Score</p>
                <p class="font-medium">{{ $ctrl.accountDetailsExtra.ficoScore }}</p>
              </div>
              <div>
                <p class="text-gray-600">Birth Date</p>
                <p class="font-medium">{{ $ctrl.accountDetailsExtra.ownerBirthdate | date:'MM/dd/yyyy' }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white shadow rounded-lg p-6 mb-6">
            <h2 class="text-xl font-semibold mb-4">Account Balances</h2>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-gray-600">Checking Amount</p>
                <p class="font-medium">{{ $ctrl.accountDetailsExtra.checkingAmount | currency }}</p>
              </div>
              <div>
                <p class="text-gray-600">Savings Amount</p>
                <p class="font-medium">{{ $ctrl.accountDetailsExtra.savingsAmount | currency }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white shadow rounded-lg p-6">
            <h2 class="text-xl font-semibold mb-4">Account Activity</h2>
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr ng-repeat="activity in $ctrl.accountDetailsExtra.activityTimeline" class="border-b">
                    <td class="px-6 py-4">{{ activity.date | date:'MM/dd/yyyy' }}</td>
                    <td class="px-6 py-4 capitalize">{{ activity.type }}</td>
                    <td class="px-6 py-4">{{ activity.amount | currency }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `,
    controller: AccountComponent,
  };
}
