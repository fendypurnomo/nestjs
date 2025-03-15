export interface ProvinsiEntity {
    id: number;
    kodeAngka: string;
    kodeHuruf: string;
    namaProvinsi: string;
    kependekan: string | null;
    ibuKota: string | null;
    wilayahGeografis: string;
    tanggalHariJadi: string | null;
    tanggalPembentukan: string | null;
    undangUndang: string | null;
    urlLambang: string | null;
}

export interface ViewProvinsiEntity {
    kodeProvinsiAngka: string | null;
    kodeProvinsiHuruf: string | null;
    namaProvinsi: string | null;
    ibuKota: string | null;
    jumlahKabupatenKota: number | null;
    jumlahKabupaten: number | null;
    jumlahKota: number | null;
    jumlahKecamatan: number | null;
    luasWilayah: string | null;
}
