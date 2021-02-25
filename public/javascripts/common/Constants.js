const Constants = {};
Constants.PAGE_SIZE = {
    PAGE_SIZE_1: 1,
    PAGE_SIZE_10: 10,
    PAGE_SIZE_16: 16,
};
Constants.PROVINCE_LEVEL_MUNICIPALITY = ['北京', '天津', '上海', '重庆'];
Constants.CHECK_INVALID = {
    DEFAULT: -1,
    VALID: 0,
    INVALID: 1
};
Constants.DATA_STATUS = {
    ACTIVE: 'A',
    DISABLED: 'D'
};
Constants.ACCOUNT_STATUS = {
    WAITING: 'P',
    ACTIVE: 'A',
    NO_PASS: 'N',
    DISABLED: 'D',
};
Constants.COOKIE_LOGIN_USER = 'shs.student.user';
Constants.UPLOAD_SERVICE_URI = 'http://localhost:8000/upload';

const REVIEW_RESULT = {
    INIT: -1,
    PASS: 1,
    NOT_PASS: 0
};