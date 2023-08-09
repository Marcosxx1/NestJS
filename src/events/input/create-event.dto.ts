import { IsDateString, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 255, { message: 'The name length is wrong' })
  name: string;

  @Length(5, 255, { message: 'The description length is wrong' })
  description: string;

  @IsDateString()
  when: string;

  @Length(5, 255, { message: 'The name length is wrong' })
  address: string;
}
