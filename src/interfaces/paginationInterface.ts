export interface IPagination<DATA>{
    data: DATA[],
    meta:{
        limit:number,
        offset:number,
        total:number,
    }
}
