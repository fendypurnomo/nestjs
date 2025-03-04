import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { db } from 'src/db';
import { provinsi } from 'src/db/schema';

@Injectable()
export class ProvinsiService {
    constructor() {}

    create() {}

    async findAll() {
        const data = await db.query.provinsi.findMany({});

        if (!data.length) {
            return { message: 'Data not found' };
        }

        return data;
    }

    async findOne(id: number) {
        const data = await db.select().from(provinsi).where(eq(provinsi.id, id));

        if (!data.length) {
            return { message: 'Data not found' };
        }

        return data;
    }

    update() {}

    async remove() {}
}
