import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MedicalController } from './Controllers/medical.controller';
import { PatientsController } from './controllers/patients.controller';

import { MedicalFacade } from './Facades/medical.facade';
import { PatientsFacade } from './Facades/patients.facade';

import { Web3Service } from './Services/web3.service';
import { MedicalService } from './Services/medical.service';
import { PatientsService } from './Services/patients.service';

import { Crypter } from './Functions/crypter';
import { RecordParser } from './Functions/recordParser';

import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
      load: [configuration],
    }),
  ],
  controllers: [MedicalController, PatientsController],
  providers: [
    MedicalFacade,
    PatientsFacade,
    Web3Service,
    MedicalService,
    PatientsService,
    RecordParser,
    Crypter,
  ],
})

export class AppModule {}
