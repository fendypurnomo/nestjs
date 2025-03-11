import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { db } from 'src/db';
import { wilayahTingkat1 } from 'src/db/schema';

@Injectable()
export class ProvinsiService {
    constructor() {}

    create() {}

    async findAll() {
        const data = await db.query.wilayahTingkat1.findMany({});

        if (!data.length) {
            return { message: 'Data not found' };
        }

        return data;
    }

    async findOne(id: number) {
        const data = await db.select().from(wilayahTingkat1).where(eq(wilayahTingkat1.id, id));

        if (!data.length) {
            return { message: 'Data not found' };
        }

        return data;
    }

    update() {}

    async remove() {}
}
