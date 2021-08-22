export const  DataConfigDTO = (area:any)=>{
    let areas = area.area.split(",")
    return {areas:areas}
}