import { Body, Controller, Get, Put } from '@nestjs/common';

import { CatService } from '../domain/cat.service';
import { Cat } from '../domain/cat.model';
import { UpdateCatConfigDTO } from '../dtos/update-config.dto';
import { CatConfigDTO } from '../dtos/config.dto';

@Controller('/cats')
export class CatsController {
    constructor(private readonly service: CatService) {}

    @Get()
    async getCats(): Promise<Cat[]> {
        return this.service.getCats();
    }

    @Put('/config')
    async updateCatConfig(
        @Body() dto: UpdateCatConfigDTO,
    ): Promise<CatConfigDTO> {
        return this.service.updateCatConfig(dto);
    }
}
