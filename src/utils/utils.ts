import { BadRequestException, ValidationError } from '@nestjs/common';

/*
 * Fungsi ini digunakan untuk menghandle error dari class-validator
 *
 * @param errors: ValidationError[]
 * @return BadRequestException
 */
export function handleException(errors: ValidationError[]): any {
    // Membuat object untuk menyimpan pesan error
    // yang akan dikirimkan ke client
    const errorMessages: Record<string, string> = {};

    // Looping setiap error yang terjadi
    // dan mengambil constraints pertama
    errors.forEach((error) => {
        const { constraints } = error;
        if (constraints) {
            const [firstConstraintKey] = Object.keys(constraints);
            errorMessages[error.property] = constraints[firstConstraintKey];
        }
    });

    // Mengembalikan error dalam bentuk BadRequestException
    // yang berisi pesan error yang akan dikirimkan ke client
    return new BadRequestException({
        success: false,
        statusCode: 400,
        statusError: 'invalidInput',
        message: errorMessages
    });
}

/*
 * Fungsi ini digunakan untuk menghandle error dari class-validator
 *
 */
export function handleEmptyToNull(input: string | null | undefined): string | null {
    return input && input.trim() !== '' ? input : null;
}

/*
 * Fungsi ini digunakan untuk menghandle error dari class-validator
 */
export function upperCase(input: string): string {
    return input.toUpperCase();
}

/*
 * Fungsi ini digunakan untuk menghandle error dari class-validator
 */
export function upperCaseFirst(input: string): string {
    return input
        .toLowerCase() // Mengubah semua huruf menjadi kecil
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Mengubah huruf pertama tiap kata menjadi kapital
}

/**/
export class ApiResponse<T = undefined> {
    success!: boolean;
    statusCode!: number;
    data?: T | unknown;
    message?: string | Record<string, string>;
}
