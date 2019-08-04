import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeadDto } from './idea.dto';
import { ValidationPipe } from 'src/shared/validation.pipe';

@Controller('idea')
export class IdeaController {

    constructor(private ideaservice: IdeaService){}

    @Get()
    showAllIdeas() {
        return this.ideaservice.showAll();
    }

    @Post()
    @UsePipes(new ValidationPipe())
    createIdea(@Body() data: IdeadDto) {
        this.ideaservice.create(data);
    }

    @Get(':id')
    readIdea(@Param('id') id: string) {
        return this.ideaservice.read(id);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    updateIdea(@Param('id') id: string, data: IdeadDto) {
        this.ideaservice.update(id, data);
    }

    @Delete(':id')
    @UsePipes(new ValidationPipe())
    destoryIdea(@Param('id') id: string) {
        this.ideaservice.destroy(id);
    }
}
