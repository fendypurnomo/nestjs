export interface KabKotaEntity {
    id: number;
    kodeProvinsi: string;
    kodeKabKota: string;
    jenis: string;
    namaKabKota: string;
    ibuKota: string | null;
    undangUndang: string | null;
    urlLambang: string | null;
    luasWilayah: string | null;
}
