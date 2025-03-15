import { asc, eq, sql } from 'drizzle-orm';

import { db } from 'src/db';
import { wilayahTingkat2 as tableKabKota } from 'src/db/schema';
import { KabKotaDto } from './kab_kota.dto';
import { KabKotaEntity } from './kab_kota.entity';

export class KabKotaRepository {
    async create(data: KabKotaDto): Promise<KabKotaEntity[]> {
        return db.insert(tableKabKota).values(data).returning();
    }

    async findAll(page: number = 1, pageSize: number = 25): Promise<KabKotaEntity[]> {
        return db.query.wilayahTingkat2.findMany({
            orderBy: [asc(tableKabKota.kodeKabKota)],
            limit: pageSize,
            offset: (page - 1) * pageSize
        });
    }

    async findById(id: number): Promise<KabKotaEntity[]> {
        return db.select().from(tableKabKota).where(eq(tableKabKota.id, id));
    }

    async findByKodeProvinsi(kodeProvinsi: string): Promise<KabKotaEntity[]> {
        return db
            .select()
            .from(tableKabKota)
            .where(sql`${tableKabKota.kodeProvinsi} = ${kodeProvinsi}`);
    }

    async findByKodeKabKota(kodeKabKota: string): Promise<KabKotaEntity[]> {
        return db
            .select()
            .from(tableKabKota)
            .where(sql`${tableKabKota.kodeKabKota} = ${kodeKabKota}`);
    }

    async findByNamaKabKota(namaKabKota: string): Promise<KabKotaEntity[]> {
        return db
            .select()
            .from(tableKabKota)
            .where(sql`${tableKabKota.namaKabKota} = ${namaKabKota}`);
    }

    async update(id: number, data: KabKotaDto): Promise<KabKotaEntity[]> {
        return db
            .update(tableKabKota)
            .set(data)
            .where(sql`${tableKabKota.id}=${id}`)
            .returning();
    }

    async delete(id: number): Promise<KabKotaEntity[]> {
        return db
            .delete(tableKabKota)
            .where(sql`${tableKabKota.id}=${id}`)
            .returning();
    }
}
