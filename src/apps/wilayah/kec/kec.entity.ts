export interface KecamatanEntity {
    id: number;
    kodeProvinsi: string;
    kodeKabKota: string;
    kodeKecamatan: string;
    namaKecamatan: string;
    ibuKota: string | null;
    luasWilayah: string | null;
}
