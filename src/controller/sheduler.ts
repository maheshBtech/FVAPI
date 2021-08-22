import corn from "node-cron";

export let sheduler = corn.schedule('* * 23 * *',()=>{
    console.log("sheduler triggered")
    // will implement soon!
})