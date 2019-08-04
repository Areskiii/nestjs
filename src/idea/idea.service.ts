import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IdeaEntity } from './idea.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeadDto } from './idea.dto';

@Injectable()
export class IdeaService {
    constructor(@InjectRepository(IdeaEntity) private ideaRepository: Repository<IdeaEntity>) {}

    async showAll() {
        return await this.ideaRepository.find();
    }

    async create(data: IdeadDto) {
        const idea = await this.ideaRepository.create(data);
        await this.ideaRepository.save(idea);
        return idea;
    }

    async read(id: string) {
        return await this.ideaRepository.findOne({where: { id }});
    }

    async update(id: string, data: Partial<IdeadDto>) {
        await this.ideaRepository.update({ id }, data);
        return this.ideaRepository.findOne({ id });
    }
    
    async destroy(id: string) {
        await this.ideaRepository.delete({ id });
        return {deleted: true};
    }
}
