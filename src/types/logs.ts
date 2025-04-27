// full name
// idNumber
// email
// position
// role
// 
// action
// date


export interface ActivityLogs {
    _id: string
    action: string
    userId: {
      _id: string
      firstName: string
      middleName: string
      lastName: string
      suffix: string
      idNumber: string
      number: string
      email: string
      username: string
      position: string
      role: string
      department: string
      createdAt: string
    }
    createdAt: string
}