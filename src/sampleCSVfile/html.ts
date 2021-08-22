

export const RVreport = (data:any) =>{

	let html = `<!DOCTYPE html>
	<html xmlns:th="http://www.thymeleaf.org">
	<head>
		<title th:text="#{residence.cpv.report.header}">CREDIT CARDS - RESIDENCE CPV REPORT</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		
		<style type="text/css">
			table, th, td {
			  border: 1px solid black;
			  border-collapse: collapse;
			}
			table {
				margin-bottom: 5px;
			}
			.proofs-images {
				   flex-direction: row;
				box-sizing: border-box;
				display: flex;
				place-content: center flex-start;
				align-items: center;
				margin-top: 2%;
			}
			.proofs-images img {
				max-width: 250px;
				padding: 5px;
			}
			.info-captured {
				border-width: 1px;
				border-style: solid;
				border-color: rgb(169, 169, 169);
				border-image: initial;
				padding: 2px;
				width: 70%;
				overflow-wrap: break-word;
			}
			.pull-left {
				float: left;
			}
			.pull-right {
				float: right;
			}
			.assent {
				margin-top: 100px;
			}
			.agency-seal {
				margin-right: 30%;
			}
		</style>
	</head>
	<body>
	<h2 th:text="#{residence.cpv.report.header}">CREDIT CARDS - RESIDENCE CPV REPORT</h2>
	<table>
		<tr>
			<td th:text="#{report.residencecpv.field.applicationReferenceNumber}">Application Ref. No.</td>
			<td th:text>${data.fieldCaseDTO.referenceNumber}</td>
			
			<td th:text="#{report.residencecpv.field.agencyName}">Agency Name</td>
			<td th:text>Mahesh agency</td>
		</tr>
		
		<tr>
			<td th:text="#{report.residencecpv.field.applicantName}">Applicant Name</td>
			<td th:text>${data.fieldCaseDTO.applicantName}</td>
			
			<td th:text="#{report.residencecpv.field.reportDate}">Report Date</td>
			<td th:text>5/20/2021</td>
		</tr>
		
		<tr>
			<td th:text="#{report.residencecpv.field.residenceAddress}">Residence Address</td>
			<td th:text>H IYEUW FLAT NO 1004 H NO 1 2 608 TO 620 YYTY JHJSD JHJSD JNSJD
			OFFICE</td>
			
			<td th:text="#{report.residencecpv.field.mobileNumber}">Mobile Number</td>
			<td th:text>${data.fieldCaseDTO.phone}</td>
		</tr>
		
		<tr>
			<td ></td>
			<td ></td>
			
			<td th:text="#{report.residencecpv.field.addressConfirm}">Address Confirm</td>
			<td th:text></td>
		</tr>
	</table>
	
	
	
	<p>
		<h3 th:text="#{residence.cpv.report.infosource}">Information obtained form the person met at Residence address:</h3>
		<div th:text class="info-captured">
			Landmark = ${data.residenceVerificationDTOs[0].landMark}, Type Of Housing = ${data.residenceVerificationDTOs[0].housingType}, Person Met = ${data.residenceVerificationDTOs[0].personName}, Relationship = ${data.residenceVerificationDTOs[0].relationship}, Working Details = ${data.residenceVerificationDTOs[0].workDetails},
			Date Of Birth = ${data.residenceVerificationDTOs[0].applicantDob}, Remarks = ${data.residenceVerificationDTOs[0].remarks}, Locality = ${data.residenceVerificationDTOs[0].locality}, Rented/Owned = ${data.residenceVerificationDTOs[0].housingType}, Ownership Of Property = ${data.residenceVerificationDTOs[0].owned},
			Number Of Floors=${data.residenceVerificationDTOs[0].floorCount},Members Earning=${data.residenceVerificationDTOs[0].earningMembers},Family Members Count=${data.residenceVerificationDTOs[0].totalMembers},Address Matched=${data.residenceVerificationDTOs[0].addressMatch},Staying Since = ${data.residenceVerificationDTOs[0].since},
			Feedback=${data.residenceVerificationDTOs[0].neighbourFeedback}
		</div>
	</p>
	
	<div class="assent">
		<p class="pull-left">
			<span th:text="#{report.residencecpv.field.cpvstatus}">CPV Status / Result</span>
			<span th:text>${data.residenceVerificationDTOs[0].finalStatus}</span>
		</p>
		
		<p class="pull-right agency-seal">
			<span th:text="#{report.residencecpv.field.agencySealAndSign}">Agency Seal and Sign</span>
		</p>
	</div>
	</body>
	</html>`

	return html;
}




export const BVreport = (data:any) =>{

	let html = `<!DOCTYPE html>
	<html xmlns:th="http://www.thymeleaf.org">
	<head>
		<title th:text="#{residence.cpv.report.header}">CREDIT CARDS - BUSINESS CPV REPORT</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		
		<style type="text/css">
			table, th, td {
			  border: 1px solid black;
			  border-collapse: collapse;
			}
			table {
				margin-bottom: 5px;
			}
			.proofs-images {
				   flex-direction: row;
				box-sizing: border-box;
				display: flex;
				place-content: center flex-start;
				align-items: center;
				margin-top: 2%;
			}
			.proofs-images img {
				max-width: 250px;
				padding: 5px;
			}
			.info-captured {
				border-width: 1px;
				border-style: solid;
				border-color: rgb(169, 169, 169);
				border-image: initial;
				padding: 2px;
				width: 70%;
				overflow-wrap: break-word;
			}
			.pull-left {
				float: left;
			}
			.pull-right {
				float: right;
			}
			.assent {
				margin-top: 100px;
			}
			.agency-seal {
				margin-right: 30%;
			}
		</style>
	</head>
	<body>
	<h2 th:text="#{residence.cpv.report.header}">CREDIT CARDS - BUSINESS CPV REPORT</h2>
	<table>
		<tr>
			<td th:text="#{report.residencecpv.field.applicationReferenceNumber}">Application Ref. No.</td>
			<td th:text>${data.fieldCaseDTO.referenceNumber}</td>
			
			<td th:text="#{report.residencecpv.field.agencyName}">Agency Name</td>
			<td th:text>Mahesh agency</td>
		</tr>
		
		<tr>
			<td th:text="#{report.residencecpv.field.applicantName}">Applicant Name</td>
			<td th:text>${data.fieldCaseDTO.applicantName}</td>
			
			<td th:text="#{report.residencecpv.field.reportDate}">Report Date</td>
			<td th:text>5/20/2021</td>
		</tr>
		
		<tr>
			<td th:text="#{report.residencecpv.field.residenceAddress}">Residence Address</td>
			<td th:text>H IYEUW FLAT NO 1004 H NO 1 2 608 TO 620 YYTY JHJSD JHJSD JNSJD
			OFFICE</td>
			
			<td th:text="#{report.residencecpv.field.mobileNumber}">Mobile Number</td>
			<td th:text>${data.fieldCaseDTO.phone}</td>
		</tr>
		
		<tr>
			<td ></td>
			<td ></td>
			
			<td th:text="#{report.residencecpv.field.addressConfirm}">Address Confirm</td>
			<td th:text></td>
		</tr>
	</table>
	
	
	
	<p>
		<h3 th:text="#{residence.cpv.report.infosource}">Information obtained form the person met at Residence address:</h3>
		<div th:text class="info-captured">
		Employee Id = ${data.businessVerificationDTOs[0].empId},
		Person Met = ${data.businessVerificationDTOs[0].personName}, Person Designation = ${data.businessVerificationDTOs[0].personDesignation},
		Address = ${data.businessVerificationDTOs[0].address}, Applicant Income = ${data.businessVerificationDTOs[0].applicantIncome},
		Applicant Qualification = ${data.businessVerificationDTOs[0].applicantQualification}, Applicant Designation = ${data.businessVerificationDTOs[0].applicantDesignation},
		Building Type = ${data.businessVerificationDTOs[0].buildingType}, Business Activity = ${data.businessVerificationDTOs[0].businessActivity},
		Branch Count = ${data.businessVerificationDTOs[0].branchCount}, Business Type = ${data.businessVerificationDTOs[0].businessType},
		Employment Type = ${data.businessVerificationDTOs[0].employmentType}, Head Office = ${data.businessVerificationDTOs[0].headOffice},
		Since = ${data.businessVerificationDTOs[0].since}, Total Employees = ${data.businessVerificationDTOs[0].totalEmp}, sign Board = ${data.businessVerificationDTOs[0].signBoard}, Neighour Feedback = ${data.businessVerificationDTOs[0].neighbourFeedback},



	
		</div>
	</p>
	
	<div class="assent">
		<p class="pull-left">
			<span th:text="#{report.residencecpv.field.cpvstatus}">CPV Status / Result</span>
			<span th:text>${data.businessVerificationDTOs[0].finalStatus}</span>
		</p>
		
		<p class="pull-right agency-seal">
			<span th:text="#{report.residencecpv.field.agencySealAndSign}">Agency Seal and Sign</span>
		</p>
	</div>
	</body>
	</html>`

	return html;
}
