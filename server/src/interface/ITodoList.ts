import { ApiError } from '../lib/ApiError';
import { eHTTP_CODE } from '../lib/enum';
import { BaseInterfaceService } from './BaseInterface';
import { ConstraintBuilder, ValidaxSchema } from 'validax';

@ValidaxSchema()
export class IInputTodoItem {
  @ConstraintBuilder.CustomError(ConstraintBuilder.String(), new ApiError(eHTTP_CODE.BAD_REQUEST, 'invalid title')).Decorator()
  title!: string;
  @ConstraintBuilder.CustomError(ConstraintBuilder.String(), new ApiError(eHTTP_CODE.BAD_REQUEST, 'invalid message')).Decorator()
  message!: string;
  @ConstraintBuilder.CustomError(ConstraintBuilder.Boolean({ allowUndefined: true }), new ApiError(eHTTP_CODE.BAD_REQUEST, 'invalid checked')).Decorator()
  checked?: boolean;
}

@ValidaxSchema()
export class ITodoItem extends IInputTodoItem {
  @ConstraintBuilder.Number().Decorator()
  id!: number;
}

export type ITodoListService = BaseInterfaceService<ITodoItem, IInputTodoItem>