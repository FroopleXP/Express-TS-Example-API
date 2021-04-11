import IBookUpdateDto from "./IBookUpdateDto";

interface IBookPatchDto extends Partial<IBookUpdateDto> { }