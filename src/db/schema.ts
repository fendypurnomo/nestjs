import { pgTable, uniqueIndex, check, serial, varchar, index, foreignKey, primaryKey, smallserial, char, numeric, text, date, pgView, bigint } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const wilayahJenis = pgTable("wilayah_jenis", {
	id: serial().primaryKey().notNull(),
	jenis: varchar({ length: 10 }),
}, (table) => [
	uniqueIndex("wil_jenis_id_idx").using("btree", table.id.asc().nullsLast().op("int4_ops")),
	check("wil_jenis_jenis_ck", sql`char_length((jenis)::text) <= 10`),
]);

export const wilayahGeografis = pgTable("wilayah_geografis", {
	id: serial().primaryKey().notNull(),
	geografis: varchar({ length: 15 }).notNull(),
}, (table) => [
	uniqueIndex("wil_geo_id_idx").using("btree", table.id.asc().nullsLast().op("int4_ops")),
	check("wil_geo_nama_ck", sql`char_length((geografis)::text) <= 15`),
]);

export const wilayahTingkat3 = pgTable("wilayah_tingkat_3", {
	id: smallserial().notNull(),
	kodeProvinsi: char("kode_provinsi", { length: 2 }).notNull(),
	kodeKabKota: char("kode_kab_kota", { length: 4 }).notNull(),
	kodeKecamatan: char("kode_kecamatan", { length: 6 }).notNull(),
	namaKecamatan: varchar("nama_kecamatan", { length: 50 }).notNull(),
	ibuKota: varchar("ibu_kota", { length: 30 }),
	luasWilayah: numeric("luas_wilayah", { precision: 8, scale:  2 }),
}, (table) => [
	index("wil_kec_ibu_kota_idx").using("btree", table.ibuKota.asc().nullsLast().op("text_ops")),
	uniqueIndex("wil_kec_id_idx").using("btree", table.id.asc().nullsLast().op("int2_ops")),
	index("wil_kec_kode_kab_kota_idx").using("btree", table.kodeKabKota.asc().nullsLast().op("bpchar_ops")),
	uniqueIndex("wil_kec_kode_kec_idx").using("btree", table.kodeKecamatan.asc().nullsLast().op("bpchar_ops")),
	index("wil_kec_kode_prov_idx").using("btree", table.kodeProvinsi.asc().nullsLast().op("bpchar_ops")),
	index("wil_kec_nama_idx").using("btree", table.namaKecamatan.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.kodeProvinsi],
			foreignColumns: [wilayahTingkat1.kodeAngka],
			name: "wil_kec_kode_prov_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.kodeKabKota],
			foreignColumns: [wilayahTingkat2.kodeKabKota],
			name: "wil_kec_kode_kab_kota_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	primaryKey({ columns: [table.id, table.kodeProvinsi, table.kodeKabKota, table.kodeKecamatan], name: "wilayah_tingkat_3_pkey"}),
	check("wil_kec_kode_kec_ck", sql`kode_kecamatan ~ '^\d{6}$'::text`),
]);

export const wilayahTingkat2 = pgTable("wilayah_tingkat_2", {
	id: serial().notNull(),
	kodeProvinsi: char("kode_provinsi", { length: 2 }).notNull(),
	kodeKabKota: char("kode_kab_kota", { length: 4 }).notNull(),
	jenis: varchar({ length: 10 }).notNull(),
	namaKabKota: varchar("nama_kab_kota", { length: 40 }).notNull(),
	ibuKota: varchar("ibu_kota", { length: 30 }),
	undangUndang: varchar("undang_undang", { length: 15 }),
	urlLambang: text("url_lambang"),
	luasWilayah: numeric("luas_wilayah", { precision: 10, scale:  3 }),
}, (table) => [
	index("wil_kab_kota_ibu_kota_idx").using("btree", table.ibuKota.asc().nullsLast().op("text_ops")),
	uniqueIndex("wil_kab_kota_id_idx").using("btree", table.id.asc().nullsLast().op("int4_ops")),
	index("wil_kab_kota_jenis_idx").using("btree", table.jenis.asc().nullsLast().op("text_ops")),
	index("wil_kab_kota_kode_prov_idx").using("btree", table.kodeProvinsi.asc().nullsLast().op("bpchar_ops")),
	index("wil_kab_kota_nama_idx").using("btree", table.namaKabKota.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.jenis],
			foreignColumns: [wilayahJenis.jenis],
			name: "wil_kab_kota_jenis_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.kodeProvinsi],
			foreignColumns: [wilayahTingkat1.kodeAngka],
			name: "wil_kab_kota_kode_prov_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	primaryKey({ columns: [table.id, table.kodeProvinsi, table.kodeKabKota], name: "wilayah_tingkat_2_pkey"}),
	check("wil_kab_kota_kode_prov_ck", sql`kode_provinsi ~ '^\d{2}$'::text`),
	check("wil_kab_kota_kode_ck", sql`kode_kab_kota ~ '^\d{4}$'::text`),
]);

export const wilayahTingkat1 = pgTable("wilayah_tingkat_1", {
	id: serial().notNull(),
	kodeAngka: char("kode_angka", { length: 2 }).notNull(),
	kodeHuruf: char("kode_huruf", { length: 2 }).notNull(),
	namaProvinsi: varchar("nama_provinsi", { length: 35 }).notNull(),
	kependekan: char({ length: 10 }),
	ibuKota: varchar("ibu_kota", { length: 15 }),
	wilayahGeografis: varchar("wilayah_geografis", { length: 15 }).notNull(),
	tanggalHariJadi: date("tanggal_hari_jadi"),
	tanggalPembentukan: date("tanggal_pembentukan"),
	undangUndang: varchar("undang_undang", { length: 8 }),
	urlLambang: text("url_lambang"),
}, (table) => [
	index("wil_prov_ibu_kota_idx").using("btree", table.ibuKota.asc().nullsLast().op("text_ops")),
	uniqueIndex("wil_prov_id_idx").using("btree", table.id.asc().nullsLast().op("int4_ops")),
	index("wil_prov_kep_idx").using("btree", table.kependekan.asc().nullsLast().op("bpchar_ops")),
	uniqueIndex("wil_prov_kode_huruf_idx").using("btree", table.kodeHuruf.asc().nullsLast().op("bpchar_ops")),
	index("wil_prov_nama_idx").using("btree", table.namaProvinsi.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.wilayahGeografis],
			foreignColumns: [wilayahGeografis.geografis],
			name: "wil_prov_geo_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	primaryKey({ columns: [table.id, table.kodeAngka, table.kodeHuruf], name: "wilayah_tingkat_1_pkey"}),
	check("wil_prov_kode_angka_ck", sql`kode_angka ~ '^\d{2}$'::text`),
	check("wil_prov_kode_huruf_ck", sql`kode_huruf ~ '[A-Za-z]{2}$'::text`),
]);
export const viewWilProv = pgView("view_wil_prov", {	kodeProvinsiAngka: char("kode_provinsi_angka", { length: 2 }),
	kodeProvinsiHuruf: char("kode_provinsi_huruf", { length: 2 }),
	namaProvinsi: varchar("nama_provinsi", { length: 35 }),
	ibuKota: varchar("ibu_kota", { length: 15 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	jumlahKabupatenKota: bigint("jumlah_kabupaten_kota", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	jumlahKabupaten: bigint("jumlah_kabupaten", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	jumlahKota: bigint("jumlah_kota", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	jumlahKecamatan: bigint("jumlah_kecamatan", { mode: "number" }),
	luasWilayah: numeric("luas_wilayah"),
}).as(sql`SELECT w1.kode_angka AS kode_provinsi_angka, w1.kode_huruf AS kode_provinsi_huruf, w1.nama_provinsi, w1.ibu_kota, count(DISTINCT w2.kode_kab_kota) AS jumlah_kabupaten_kota, count(DISTINCT CASE WHEN w2.jenis::text = 'Kabupaten'::text THEN w2.kode_kab_kota ELSE NULL::bpchar END) AS jumlah_kabupaten, count(DISTINCT CASE WHEN w2.jenis::text = 'Kota'::text THEN w2.kode_kab_kota ELSE NULL::bpchar END) AS jumlah_kota, count(DISTINCT w3.kode_kecamatan) AS jumlah_kecamatan, COALESCE(sum(DISTINCT w2.luas_wilayah), 0::numeric) AS luas_wilayah FROM wilayah_tingkat_1 w1 LEFT JOIN wilayah_tingkat_2 w2 ON w1.kode_angka = w2.kode_provinsi LEFT JOIN wilayah_tingkat_3 w3 ON w2.kode_provinsi = w3.kode_provinsi AND w2.kode_kab_kota = w3.kode_kab_kota GROUP BY w1.kode_angka, w1.kode_huruf, w1.nama_provinsi, w1.ibu_kota ORDER BY w1.kode_angka`);

export const viewWilKabKota = pgView("view_wil_kab_kota", {	kodeProvinsi: char("kode_provinsi", { length: 2 }),
	kodeKabKota: char("kode_kab_kota", { length: 4 }),
	jenisWilayah: varchar("jenis_wilayah", { length: 10 }),
	namaKabKota: varchar("nama_kab_kota", { length: 40 }),
	ibuKota: varchar("ibu_kota", { length: 30 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	jumlahKecamatan: bigint("jumlah_kecamatan", { mode: "number" }),
}).as(sql`SELECT w2.kode_provinsi, w2.kode_kab_kota, w2.jenis AS jenis_wilayah, w2.nama_kab_kota, w2.ibu_kota, count(DISTINCT w3.kode_kecamatan) AS jumlah_kecamatan FROM wilayah_tingkat_2 w2 LEFT JOIN wilayah_tingkat_3 w3 ON w2.kode_kab_kota = w3.kode_kab_kota GROUP BY w2.kode_provinsi, w2.kode_kab_kota, w2.jenis, w2.nama_kab_kota, w2.ibu_kota ORDER BY w2.kode_provinsi, w2.kode_kab_kota`);

export const viewWilKec = pgView("view_wil_kec", {	kodeProvinsi: char("kode_provinsi", { length: 2 }),
	kodeKabKota: char("kode_kab_kota", { length: 4 }),
	kodeKecamatan: char("kode_kecamatan", { length: 6 }),
	namaKecamatan: varchar("nama_kecamatan", { length: 50 }),
	ibuKota: varchar("ibu_kota", { length: 30 }),
	luasWilayah: numeric("luas_wilayah", { precision: 8, scale:  2 }),
}).as(sql`SELECT kode_provinsi, kode_kab_kota, kode_kecamatan, nama_kecamatan, ibu_kota, luas_wilayah FROM wilayah_tingkat_3 w3 ORDER BY kode_provinsi, kode_kab_kota, kode_kecamatan`);