export enum ApiAction {
  APPLY_LEAVE,
  CREATE_EMPLOYEE,
  GET_LEAVE_STATUS,
  ACCEPT_REJECT_LEAVE,
  ACCEPT_LEAVE,
  REJECT_LEAVE,
  CREATE_DEPARTMENT,
  GET_USER,
  GET_ACCEPTED_LEAVES,
  LOGOUT,
}

export enum LeaveStatusType {
  PENDING,
  ACCEPTED,
  REJECTED,
}

export enum UserActivityType {
  LOGIN,
  LOGOUT,
}
