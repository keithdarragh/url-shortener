interface ErrorObj {
  message: string;
  code: string;
}

const unproccessableError = (message: string): [ErrorObj, number] => ([{
  message,
  code: '0001',
}, 422]);

const cantCreateError = (message: string): [ErrorObj, number] => ([{
  message,
  code: '0002',
}, 400]);

export {
  ErrorObj,
  unproccessableError,
  cantCreateError,
};
