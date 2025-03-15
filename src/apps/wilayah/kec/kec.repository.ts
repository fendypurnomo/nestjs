import { asc, sql } from 'drizzle-orm';

import { db } from 'src/db';
import { wilayahTingkat3 as tableKec } from 'src/db/schema';
import { KecamatanDto } from './kec.dto';
import { KecamatanEntity } from './kec.entity';

export class KecamatanRepository {
    async create(data: KecamatanDto): Promise<KecamatanEntity[]> {
        return db.insert(tableKec).values(data).returning();
    }

    async findAll(page: number = 1, pageSize: number = 25): Promise<KecamatanEntity[]> {
        return db
            .select()
            .from(tableKec)
            .orderBy(asc(tableKec.kodeKecamatan))
            .limit(pageSize)
            .offset((page - 1) * pageSize);
    }

    async findById(id: number): Promise<KecamatanEntity[]> {
        return db
            .select()
            .from(tableKec)
            .where(sql`${tableKec.id} = ${id}`)
            .limit(1);
    }

    async findByKodeProv(kodeProvinsi: string): Promise<KecamatanEntity[]> {
        return db
            .select()
            .from(tableKec)
            .where(sql`${tableKec.kodeProvinsi} = ${kodeProvinsi}`);
    }

    async findByKodeKabKota(kodeKabKota: string): Promise<KecamatanEntity[]> {
        return db
            .select()
            .from(tableKec)
            .where(sql`${tableKec.kodeKabKota} = ${kodeKabKota}`);
    }

    async findByKodeKec(kodeKecamatan: string): Promise<KecamatanEntity[]> {
        return db
            .select()
            .from(tableKec)
            .where(sql`${tableKec.kodeKecamatan} = ${kodeKecamatan}`)
            .limit(1);
    }

    async findByName(namaKecamatan: string): Promise<KecamatanEntity[]> {
        return db
            .select()
            .from(tableKec)
            .where(sql`${tableKec.namaKecamatan} = ${namaKecamatan}`)
            .limit(1);
    }

    async update(id: number, data: KecamatanDto): Promise<KecamatanEntity[]> {
        return db
            .update(tableKec)
            .set(data)
            .where(sql`${tableKec.id} = ${id}`)
            .returning();
    }

    async delete(id: number): Promise<KecamatanEntity[]> {
        return db
            .delete(tableKec)
            .where(sql`${tableKec.id} = ${id}`)
            .returning();
    }
}
