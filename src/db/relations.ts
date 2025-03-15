import { relations } from "drizzle-orm/relations";
import { wilayahGeografis, wilayahTingkat1, wilayahTingkat3, wilayahTingkat2, wilayahJenis } from "./schema";

export const wilayahTingkat1Relations = relations(wilayahTingkat1, ({one, many}) => ({
	wilayahGeografi: one(wilayahGeografis, {
		fields: [wilayahTingkat1.wilayahGeografis],
		references: [wilayahGeografis.geografis]
	}),
	wilayahTingkat3s: many(wilayahTingkat3),
	wilayahTingkat2s: many(wilayahTingkat2),
}));

export const wilayahGeografisRelations = relations(wilayahGeografis, ({many}) => ({
	wilayahTingkat1s: many(wilayahTingkat1),
}));

export const wilayahTingkat3Relations = relations(wilayahTingkat3, ({one}) => ({
	wilayahTingkat1: one(wilayahTingkat1, {
		fields: [wilayahTingkat3.kodeProvinsi],
		references: [wilayahTingkat1.kodeAngka]
	}),
	wilayahTingkat2: one(wilayahTingkat2, {
		fields: [wilayahTingkat3.kodeKabKota],
		references: [wilayahTingkat2.kodeKabKota]
	}),
}));

export const wilayahTingkat2Relations = relations(wilayahTingkat2, ({one, many}) => ({
	wilayahTingkat3s: many(wilayahTingkat3),
	wilayahJeni: one(wilayahJenis, {
		fields: [wilayahTingkat2.jenis],
		references: [wilayahJenis.jenis]
	}),
	wilayahTingkat1: one(wilayahTingkat1, {
		fields: [wilayahTingkat2.kodeProvinsi],
		references: [wilayahTingkat1.kodeAngka]
	}),
}));

export const wilayahJenisRelations = relations(wilayahJenis, ({many}) => ({
	wilayahTingkat2s: many(wilayahTingkat2),
}));