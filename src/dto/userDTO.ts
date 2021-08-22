export const userDTO = (users: any) => {
    let data: any = [];
    users.map((i: any) => {
        data.push({
            "id": i.id,
            "phoneNumber": i.phoneNumber,
            "areas": i.areas.split(","),
            "status": i.status,
            "userId": i.userId,
            "userLogin": i.userLogin,
            "userDTO": {
                "id": i.userDTO.id,
                "login": i.userDTO.login,
                "firstName": i.userDTO.firstName,
                "lastName": i.userDTO.lastName,
                "email": i.userDTO.email,
                "activated": i.userDTO.activated,
                "resetKey": i.userDTO.resetKey,
                "langKey": i.userDTO.langKey,
                "createdBy": i.userDTO.createdBy,
                "createdDate": i.userDTO.createdDate,
                "resetDate": i.userDTO.resetDate,
                "lastModifiedBy": i.userDTO.lastModifiedBy,
                "lastModifiedDate": i.userDTO.lastModifiedDate,
                "authorities": [i.userDTO.authorityName]
            }
        })
    })
    return data
}

export const userAccountDTO = (user: any) => {

    return {
        "id": user.id,
        "login": user.login,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "email": user.email,
        "activated": user.activated,
        "resetKey": user.resetKey,
        "langKey": user.langKey,
        "createdBy": user.createdBy,
        "createdDate": user.createdDate,
        "resetDate": user.resetDate,
        "lastModifiedBy": user.lastModifiedBy,
        "lastModifiedDate": user.lastModifiedDate,
        "authorities": [user.authorityName]

    }
}