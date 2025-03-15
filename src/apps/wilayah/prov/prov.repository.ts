import { asc, sql } from 'drizzle-orm';

import { db } from 'src/db';
import { viewWilProv as viewProv, wilayahTingkat1 as tableProv } from 'src/db/schema';
import { ProvinsiDto } from './prov.dto';
import { ProvinsiEntity, ViewProvinsiEntity } from './prov.entity';

export class ProvinsiRepository {
    // Tambah data baru ke database
    async create(data: ProvinsiDto): Promise<ProvinsiEntity[]> {
        return db.insert(tableProv).values(data).returning();
    }

    // Dapatkan semua data dengan batasan 25 data
    async findAll(page = 1, pageSize = 25): Promise<ViewProvinsiEntity[]> {
        const offset = (page - 1) * pageSize;

        return db
            .select()
            .from(viewProv)
            .orderBy(asc(viewProv.kodeProvinsiAngka))
            .limit(pageSize)
            .offset(offset);
    }

    // Dapatkan data berdasarkan kode angka tertentu
    async findOne(kodeAngka: string): Promise<ViewProvinsiEntity[]> {
        return db
            .select()
            .from(viewProv)
            .where(sql`${viewProv.kodeProvinsiAngka} = ${kodeAngka}`);
    }

    // Dapatkan data berdasarkan ID tertentu
    async findById(id: number): Promise<ProvinsiEntity[]> {
        return db
            .select()
            .from(tableProv)
            .where(sql`${tableProv.id} = ${id}`)
            .limit(1);
    }

    // Dapatkan data berdasarkan kode angka tertentu
    async findByKodeAngka(kodeAngka: string): Promise<ProvinsiEntity[]> {
        return db
            .select()
            .from(tableProv)
            .where(sql`${tableProv.kodeAngka} = ${kodeAngka}`);
    }

    // Dapatkan data berdasarkan kode huruf tertentu
    async findByKodeHuruf(kodeHuruf: string): Promise<ProvinsiEntity[]> {
        return db
            .select()
            .from(tableProv)
            .where(sql`${tableProv.kodeHuruf} = ${kodeHuruf}`);
    }

    // Dapatkan data berdasarkan kode huruf tertentu
    async findByNama(namaProvinsi: string): Promise<ProvinsiEntity[]> {
        return db
            .select()
            .from(tableProv)
            .where(sql`${tableProv.namaProvinsi} = ${namaProvinsi}`);
    }

    // Dapatkan data berdasarkan kode huruf tertentu
    async findByKependekan(kependekan: string | undefined): Promise<ProvinsiEntity[]> {
        return db
            .select()
            .from(tableProv)
            .where(sql`${tableProv.kependekan} = ${kependekan}`);
    }

    // Perbarui data berdasarkan ID
    async update(id: number, data: ProvinsiDto): Promise<ProvinsiEntity[]> {
        return db
            .update(tableProv)
            .set(data)
            .where(sql`${tableProv.id} = ${id}`)
            .returning();
    }

    // Hapus data berdasarkan ID
    async delete(id: number): Promise<ProvinsiEntity[]> {
        return db
            .delete(tableProv)
            .where(sql`${tableProv.id} = ${id}`)
            .returning();
    }
}
