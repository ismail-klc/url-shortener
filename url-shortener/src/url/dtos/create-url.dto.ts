import { IsDate, IsHexadecimal, IsOptional, IsUrl, MaxLength, MinLength } from "class-validator";

export class CreateUrlDto {
    @IsUrl()
    originalUrl: string;

    @IsOptional()
    @MaxLength(9)
    @MinLength(6)
    shortUrl: string;

    @IsOptional()
    @IsDate()
    expirationDate: Date;
}