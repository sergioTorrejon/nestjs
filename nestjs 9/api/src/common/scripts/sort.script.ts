import { SortDto } from "../dtos"
import { upper } from "../helpers/params"

export async function sortScript(dto:SortDto) {
    const query = ` ORDER BY ${dto.sort} ${await upper(dto.order)=="ASC"?"ASC":"DESC"} `
    return  query
  }