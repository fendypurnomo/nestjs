import { sql } from 'drizzle-orm';

import { db } from 'src/db';
import { wilayahGeografis } from 'src/db/schema';
import { GeoDto } from './geo.dto';
import { GeoEntity } from './geo.entity';

export class GeoRepository {
    async create(data: GeoDto): Promise<GeoEntity[]> {
        return db.insert(wilayahGeografis).values(data).returning();
    }

    async findAll(): Promise<GeoEntity[]> {
        return db.select().from(wilayahGeografis);
    }

    async findById(id: number): Promise<GeoEntity[]> {
        return db
            .select()
            .from(wilayahGeografis)
            .where(sql`${wilayahGeografis.id} = ${id}`)
            .limit(1);
    }

    async findByName(nama: string): Promise<GeoEntity[]> {
        return db
            .select()
            .from(wilayahGeografis)
            .where(sql`${wilayahGeografis.geografis} = ${nama}`)
            .limit(1);
    }

    async update(id: number, data: GeoDto): Promise<GeoEntity[]> {
        return db
            .update(wilayahGeografis)
            .set(data)
            .where(sql`${wilayahGeografis.id}=${id}`)
            .returning();
    }

    async delete(id: number): Promise<GeoEntity[]> {
        return db
            .delete(wilayahGeografis)
            .where(sql`${wilayahGeografis.id}=${id}`)
            .returning();
    }
}
