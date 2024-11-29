import 'reflect-metadata';
import { BadRequestError } from 'routing-controllers';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

// Кешування декораторів для зменшення overhead
const metadataCache = new WeakMap<any, Map<string, any>>();

function getOrCreateMetadataMap(target: any) {
  if (!metadataCache.has(target)) {
    metadataCache.set(target, new Map());
  }
  return metadataCache.get(target)!;
}

export function IsString() {
  return function (target: any, propertyKey: string) {
    const metadataMap = getOrCreateMetadataMap(target.constructor);
    metadataMap.set(`${propertyKey}:isString`, true);
  };
}

export function IsEmail() {
  return function (target: any, propertyKey: string) {
    const metadataMap = getOrCreateMetadataMap(target.constructor);
    metadataMap.set(`${propertyKey}:isEmail`, true);
  };
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validate(obj: any, targetClass: any) {
  const errors: string[] = [];
  const metadataMap = getOrCreateMetadataMap(targetClass.prototype);

  for (const key of Object.keys(obj)) {
    const value = obj[key];
    const isString = metadataMap.get(`${key}:isString`);
    const isEmail = metadataMap.get(`${key}:isEmail`);

    if (isString && typeof value !== 'string') {
      errors.push(`${key} must be a string`);
    }

    if (isEmail && (typeof value !== 'string' || !EMAIL_REGEX.test(value))) {
      errors.push(`${key} must be a valid email`);
    }
  }

  if (errors.length > 0) {
    throw new BadRequestError(errors.join(', '));
  }
}

export function ValidateArgs(targetClass: any) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const [requestBody] = args;
      const targetInstance = plainToClass(targetClass, requestBody);

      const validFields = Object.keys(targetInstance);

      const validFieldsSet = new Set(validFields);

      const extraFields = Object.keys(requestBody).filter(
        (key) => !validFieldsSet.has(key)
      );

      if (extraFields.length > 0) {
        throw new BadRequestError(`Invalid fields: ${extraFields.join(', ')}`);
      }

      const validationErrors = validateSync(targetInstance);
      if (validationErrors.length > 0) {
        throw new BadRequestError(`Validation failed: ${validationErrors.join(', ')}`);
      }

      return originalMethod.apply(this, args);
    };
  };
}