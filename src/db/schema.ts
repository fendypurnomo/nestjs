import { pgTable, index, integer, char, varchar, date } from 'drizzle-orm/pg-core';

export const provinsi = pgTable(
	'provinsi',
	{
		id: integer().primaryKey().notNull(),
		kodeAngka: char('kode_angka', { length: 2 }).notNull(),
		kodeHuruf: char('kode_huruf', { length: 2 }).notNull(),
		namaProvinsi: varchar('nama_provinsi', { length: 40 }).notNull(),
		kependekan: char({ length: 10 }),
		ibuKota: varchar('ibu_kota', { length: 20 }),
		wilayahGeografis: varchar('wilayah_geografis', { length: 15 }).notNull(),
		tanggalHariJadi: date('tanggal_hari_jadi'),
		tanggalPembentukan: date('tanggal_pembentukan'),
		undangUndang: varchar('undang_undang', { length: 10 }),
		urlLambang: varchar('url_lambang', { length: 255 })
	},
	(table) => [
		index('prov_id_idx').using('btree', table.id.asc().nullsLast().op('int4_ops')),
		index('prov_kep_idx').using(
			'btree',
			table.kependekan.asc().nullsLast().op('bpchar_ops')
		),
		index('prov_kode_angka_idx').using(
			'btree',
			table.kodeAngka.asc().nullsLast().op('bpchar_ops')
		),
		index('prov_nama_idx').using(
			'btree',
			table.namaProvinsi.asc().nullsLast().op('text_ops')
		)
	]
);
