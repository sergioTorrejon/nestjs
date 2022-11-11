import { PaginateDto } from "../dtos"

export function paginateScript(dto:PaginateDto) {
    const query = ` LIMIT ${parseInt(dto.limit)} OFFSET ${(parseInt(dto.page)-1)*(parseInt(dto.limit))} `;
    return  query
  }