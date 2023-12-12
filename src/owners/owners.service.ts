import { Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OwnersService {

  constructor(@InjectRepository(Owner) private ownersRepository: Repository<Owner>) {}

  create(createOwnerInput: CreateOwnerInput) {
    const newOwner = this.ownersRepository.create(createOwnerInput)

    return this.ownersRepository.save(newOwner)
  }

  findAll() {
    return this.ownersRepository.find()
  }

  findOne(id: number) {
    return this.ownersRepository.findOneByOrFail({id: id})
  }

}
