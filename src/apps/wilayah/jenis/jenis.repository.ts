import { asc, sql } from 'drizzle-orm';

import { db } from 'src/db';
import { wilayahJenis } from 'src/db/schema';
import { JenisDto } from './jenis.dto';
import { JenisEntity } from './jenis.entity';

export class JenisRepository {
    async create(data: JenisDto): Promise<JenisEntity[]> {
        return db.insert(wilayahJenis).values(data).returning();
    }

    async findAll(): Promise<JenisEntity[]> {
        return db.query.wilayahJenis.findMany({
            orderBy: [asc(wilayahJenis.jenis)],
            limit: 25
        });
    }

    async findById(id: number): Promise<JenisEntity[]> {
        return db
            .select()
            .from(wilayahJenis)
            .where(sql`${wilayahJenis.id}=${id}`);
    }

    async findByJenis(jenis: string): Promise<JenisEntity[]> {
        return db
            .select()
            .from(wilayahJenis)
            .where(sql`${wilayahJenis.jenis} = ${jenis}`);
    }

    async update(id: number, data: JenisDto): Promise<JenisEntity[]> {
        return db
            .update(wilayahJenis)
            .set(data)
            .where(sql`${wilayahJenis.id}=${id}`)
            .returning();
    }

    async delete(id: number): Promise<JenisEntity[]> {
        return db
            .delete(wilayahJenis)
            .where(sql`${wilayahJenis.id}=${id}`)
            .returning();
    }
}
