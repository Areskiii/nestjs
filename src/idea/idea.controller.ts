import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeadDto } from './idea.dto';

@Controller('idea')
export class IdeaController {

    constructor(private ideaservice: IdeaService){}

    @Get()
    showAllIdeas() {
        return this.ideaservice.showAll();
    }

    @Post()
    createIdea(@Body() data: IdeadDto) {
        this.ideaservice.create(data);
    }

    @Get(':id')
    readIdea(@Param('id') id: string) {
        return this.ideaservice.read(id);
    }

    @Put(':id')
    updateIdea(@Param('id') id: string, data: IdeadDto) {
        this.ideaservice.update(id, data);
    }

    @Delete(':id')
    destoryIdea(@Param('id') id: string) {
        this.ideaservice.destroy(id);
    }
}
