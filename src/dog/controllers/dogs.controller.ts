import { Body, Controller, Get, Put } from '@nestjs/common';
import { DogService } from '../domain/dog.service';
import { Dog } from '../domain/dog.model';
import { ConfigType } from '@nestjs/config';
import dogConfig from '../dog.config';

@Controller('/dogs')
export class DogsController {
    constructor(private readonly service: DogService) {}

    @Get()
    async getDogs(): Promise<Dog[]> {
        return this.service.getDogs();
    }

    @Put('/config')
    async updateDogConfig(
        @Body() dto: ConfigType<typeof dogConfig>,
    ): Promise<ConfigType<typeof dogConfig>> {
        return this.service.updateDogConfig(dto);
    }
}
