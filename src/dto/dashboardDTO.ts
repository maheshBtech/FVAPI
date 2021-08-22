
export const dashboardDTO = async(data:any)=>{
     let createdCaseCount  = 0;
     let submittedCaseCount = 0;
     let pendingCaseCount = 0;

     data.map((i:any)=>{
         if(i.caseStatus === "ASSIGNED")
         {
             createdCaseCount = (createdCaseCount) + parseInt(i.count);
         }
         else if(i.caseStatus === "SUBMITTED")
         {
             submittedCaseCount = (submittedCaseCount) + parseInt(i.count)
         }
         else if(i.caseStatus === "IN-PROGRESS")
         {
             pendingCaseCount = (pendingCaseCount) + parseInt(i.count)
         }
     })
    
     return {
        createdCaseCount,
        submittedCaseCount,
        pendingCaseCount,
     }
}