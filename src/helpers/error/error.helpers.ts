import { ApiError } from '~/errors';
import { STATUS } from '~/helpers/http';

import type { Status } from '~/helpers/http';
import type { ErrorResponse } from '~/types';

type ErrorResponseAndCode = {
	status: Status;
	json: ErrorResponse;
};

export const getErrorMessage = (error: any) => {
	if (error instanceof Error) return error.message;
	return String(error);
};

export const getErrorResponse = (error: any): ErrorResponse => {
	if (error instanceof Error)
		return { message: error.message, type: error.name };

	return {
		message: typeof error === 'string' ? error : 'Something went wrong!',
		type: 'UnknownError',
	};
};

export const getErrorResponseAndCode = (
	error: any,
	defaultStatus: Status = STATUS.internalServerError,
): ErrorResponseAndCode => {
	const json = getErrorResponse(error);
	if (error instanceof ApiError) return { json, status: error.status };
	return { json, status: defaultStatus };
};
