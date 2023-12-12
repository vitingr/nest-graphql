import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet-input';
import { OwnersService } from 'src/owners/owners.service';
import { Owner } from 'src/owners/entities/owner.entity';

@Injectable()
export class PetsService {

  constructor (@InjectRepository(Pet) private petsRepository: Repository<Pet>, private ownersService: OwnersService) {}

  // CreatePetInput = DTO
  createPet(CreatePetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(CreatePetInput) // newPet = new Pet(); new.name = input.name
  
    return this.petsRepository.save(newPet) // Insert
  }

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find() // SELECT * FROM pet
  }
 
  findOne(id: number): Promise<Pet> {
    return this.petsRepository.findOneByOrFail({id: id})
  }

  getOwner(ownerId: number): Promise<Owner> {
    return this.ownersService.findOne(ownerId)
  }

}
