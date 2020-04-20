// snackbar
export const TIME_OUT_SNACKBAR = 3000;  // 以微秒为单位

// refreshToken
export const TIME_TO_UPDATE_TOKEN = 60;  // 以秒为单位

// 基础设置
export const BASE_URL = 'http://192.168.122.1:8888'

// 人员角色
export const ADMIN_ROLE_NAME = 'chief_procurator';  // 管理员角色名
export const GOV_ROLE_NAME = 'administrative_personnel';  // 行政单位角色名
export const SUPER_ADMIN_ROLE_NAME = 'super_admin'; // 超级管理员

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
export const CASE_FINISHED = 4;
export const CASE_PROSECUTE = 5;

// 检察建议相关状态
export const SUGGESTION_ISSUED = 1;  // 等待回复
export const SUGGESTION_REPLIED = 2;  // 已回复，等待评价
export const SUGGESTION_NEED_NEW_REPLY = 3; // 整改情况：等待新一轮
export const SUGGESTION_FINISHED = 4; // 整改完成
export const SUGGESTION_TO_PROSECUTE = 5; // 准备起诉

// 整改报告相关状态
export const REPORT_NOT_JUDGE = 1;
export const REPORT_JUDGED = 2;
// 情况严重性判断
export const SITUATION_FINISHED = 1;  // 完成
export const SITUATION_SERIOUS = 2;  // 起诉
export const SITUATION_RECTIFY = 3;  // 等待新一轮报告

// 本地存储名称
export const LS_CASE_NEW = "caseNew";  // 案件新建
