export async function countScript(queryBase:string) {
    const query = `select COUNT(*) from (${queryBase}) as table_count`
    return  query
  }