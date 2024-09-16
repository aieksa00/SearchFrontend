// eslint-disable-next-line @nx/enforce-module-boundaries
export const PSPRoutes = {
  Home: '/',
  Login: '/login',
  Register: '/register',

  ChangePaymentOptions: '/paymentOptions/change',
  SelectPaymentOption: '/paymentOptions/select',

  PaymentCrypto: '/payment/crypto',

  TransactionSuccess: '/transaction/outcome/success',
  TransactionFailed: '/transaction/outcome/failed',
  TransactionError: '/transaction/outcome/error',

  PayPalTransactionSuccess: '/paypal/outcome/success',
  PayPalTransactionCancle: '/paypal/outcome/cancel',

  Transactions: '/transactions',
};

export const SearchRoutes = {
  Home: '/',
  Login: '/login',
  Register: '/register',
  Contracts: '/contracts',
  Laws: '/laws',
  UploadContract: '/upload/contract',
  UploadLaw: '/upload/law',
};

export const SearchURL = {
  BaseURL: 'http://localhost:8080/api',
  UserController: 'http://localhost:8080/api/user',
  IndexController: 'http://localhost:8080/api/index',
  ContractController: 'http://localhost:8080/api/contract',
  LawController: 'http://localhost:8080/api/law',
};
