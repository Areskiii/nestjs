import { IsString } from "class-validator";
export class IdeadDto {
    @IsString()
    idea: string;

    @IsString()
    descrption: string;
}