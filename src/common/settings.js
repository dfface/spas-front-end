// snackbar
export const TIME_OUT_SNACKBAR = 3000;  // 以微秒为单位

// refreshToken
export const TIME_TO_UPDATE_TOKEN = 60;  // 以秒为单位

// 基础设置
export const BASE_URL = 'http://192.168.122.1:8888'

// 人员角色
export const ADMIN_ROLE_NAME = 'chief_procurator';  // 管理员角色名
export const GOV_ROLE_NAME = 'administrative_personnel';  // 行政单位角色名

// 用户相关状态
export const USER_REGISTERED = 1;
export const USER_REGISTER_NOT_PASSED = 2;
export const USER_REGISTER_PASSED = 3;

// 用户角色相关状态
export const USER_ROLE_ASSIGNED = 1;
export const USER_ROLE_NOT_PASSED = 2;
export const USER_ROLE_PASSED = 3;

// 案件相关状态
export const CASE_UNAUDITED = 1;
export const CASE_AUDIT_NOT_PASSED = 2;
export const CASE_AUDIT_PASSED = 3;

// 检察建议相关状态
export const SUGGESTION_ISSUED = 1;
export const SUGGESTION_REPLIED = 2;

// 本地存储名称
export const LS_CASE_NEW = "caseNew";  // 案件新建
