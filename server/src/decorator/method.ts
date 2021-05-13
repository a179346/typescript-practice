import { NextFunction } from 'express';

export const MethodDecorator = {
  CatchError,
};

function CatchError (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const orginalFunc = descriptor.value;
  if (typeof (orginalFunc) === 'function') {
    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      try {
        await orginalFunc.call(this, req, res, next);
      } catch (error) {
        next(error);
      }
    };
  }
}