import { NextFunction } from 'express';
import { logging } from '../utils/logging';

export const MethodDecorator = {
  CatchError,
};

type CatchErrorLogOptions = {
  namespace: string,
  message: string,
};

function CatchError (opt?: CatchErrorLogOptions) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const orginalFunc = descriptor.value;
    if (typeof (orginalFunc) === 'function') {
      descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
        try {
          await orginalFunc.call(this, req, res, next);
        } catch (error) {
          if (opt)
            logging.error(opt.namespace, opt.message, error);
          next(error);
        }
      };
    }
  };
}