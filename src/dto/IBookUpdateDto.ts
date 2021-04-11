import IBookCreateDto from "./IBookCreateDto";

interface IBookUpdateDto extends IBookCreateDto {
    uuid: string;
}

export default IBookUpdateDto;