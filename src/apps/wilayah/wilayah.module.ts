import { Module } from '@nestjs/common';

import { GeoRepository } from './geo/geo.repository';
import { JenisRepository } from './jenis/jenis.repository';
import { ProvinsiController } from './prov/prov.controller';
import { ProvinsiRepository } from './prov/prov.repository';
import { ProvinsiService } from './prov/prov.service';
import { KabKotaController } from './kab_kota/kab_kota.controller';
import { KabKotaRepository } from './kab_kota/kab_kota.repository';
import { KabKotaService } from './kab_kota/kab_kota.service';
import { KecamatanController } from './kec/kec.controller';
import { KecamatanRepository } from './kec/kec.repository';
import { KecamatanService } from './kec/kec.service';

@Module({
    controllers: [ProvinsiController, KabKotaController, KecamatanController],
    providers: [
        GeoRepository,
        JenisRepository,
        ProvinsiRepository,
        ProvinsiService,
        KabKotaRepository,
        KabKotaService,
        KecamatanRepository,
        KecamatanService
    ]
})
export class WilayahModule {}
