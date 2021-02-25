const localMessage = {};
localMessage.NETWORK_ERROR = '网络异常，请检查网络设置！';
localMessage.SYSTEM_ERROR = '非常抱歉，系统异常，请稍后再试！';
localMessage.UPLOAD_FAILED = '上传失败，请检查网络设置！';
localMessage.PASSWORD_EMPTY = '请输入登陆密码！';
localMessage.NO_ACCOUNT = '您输入的账号和密码不匹配';

localMessage.NO_SELECT_UNIVERSITY = '请选择就读高校';
localMessage.NO_SELECT_SCHOOL = '请选择所在二级学院';
localMessage.NO_SELECT_MAJOR = '请选择所学专业';
localMessage.STUDENT_NAME_EMPTY = '请输入姓名';
localMessage.CELLPHONE_EMPTY = '请输入手机号码';
localMessage.CELLPHONE_INVALID = '请输入的内容不是正确的手机号码';
localMessage.CELLPHONE_REGISTERED = '您输入的手机号码已注册';
localMessage.CELLPHONE_NOT_EXISTS = '您输入的手机号码不存在';
localMessage.VALID_CODE_EMPTY = '请输入验证码';
localMessage.PASSWORD_EMPTY = '请输入密码';
localMessage.CONFIRM_PASSWORD_EMPTY = '请再次输入密码';
localMessage.CONFIRM_PASSWORD_ERROR = '两次输入的密码不一致，请重新输入';

localMessage.OLD_PASSWORD_EMPTY = '请输入原始密码';
localMessage.OLD_PASSWORD_ERROR = '原始密码不正确';
localMessage.NEW_PASSWORD_EMPTY = '请输入新密码';
localMessage.CONFIRM_NEW_PASSWORD_EMPTY = '请再次输入新密码';

localMessage.UPLOAD_SUCCESS = '文件上传成功！';
localMessage.SAVE_SUCCESS = '数据保存成功！';
localMessage.DELETE_SUCCESS = '数据删除成功！';
localMessage.SET_SUCCESS = '设置成功！';
localMessage.NOT_FOUND_DATA = '为查询到满足条件的内容。';
localMessage.NO_USING_LEARNING_PHASE = '未查询到该技术的学习路径！';
localMessage.NO_USING_KNOWLEDGE = '未查询到该学习路径的知识点！';
localMessage.NO_TECHNOLOGY_DATA = '抱歉，暂时没有更多热门技术了, 后续会持续添加，敬请期待！';
localMessage.NO_TECHNOLOGY_INFO = '已将所有的技术加载完成啦！';
localMessage.LOADED_ALL_KNOWLEDGE = '已将所有的知识点加载完成！';

localMessage.EXERCISES_TYPE_SINGLE_INVALID = '单点练习只能选择一个技术的一个学习阶段的内容！';
localMessage.EXERCISES_TYPE_COMPREHENSIVE_INVALID = '综合练习只能选择一个技术的内容！';

localMessage.EXERCISES_CODE_SINGLE_FORMAT_INVALID = '单点练习的习题编码格式不正确！';
localMessage.EXERCISES_CODE_COMPREHENSIVE_FORMAT_INVALID = '综合练习的习题编码格式不正确！';
localMessage.EXERCISES_CODE_PROJECT_FORMAT_INVALID = '项目练习的习题编码格式不正确！';
localMessage.EXERCISES_CODE_INVALID = '您输入的习题编码已存在！';
localMessage.PARAMETER_ERROR = '未能取得必要的参数，无法继续操作！';
localMessage.PARAMETER_ERROR_TECHNOLOGY_ID = '未能读取到技术编号，无法继续操作！';

localMessage.ACCOUNT_WAITING = '您的账户正在等待所在院校的管理员审批，审批通过后方可登陆';
localMessage.ACCOUNT_NO_PASS = '您的账户审批未通过，请联系所在院校的管理员';
localMessage.ACCOUNT_DISABLED = '您的账户已被冻结，请联系所在院校的管理员或我公司客服';


localMessage.EMAIL_INVALID = '您输入的内容不是有效的电子邮件地址';
localMessage.EMAIL_REGISTERED = '您输入的电子邮箱已存在';

localMessage.PASSWORD_OLD_EMPTY = '请输入您的原始密码';
localMessage.PASSWORD_OLD_ERROR = '您输入的原始密码不正确';
localMessage.PASSWORD_NEW_EMPTY = '请输入您的新密码';
localMessage.PASSWORD_NEW_ERROR = '您输入的新密码不正确';

localMessage.PASSWORD_CHANGE_SUCCESS = '密码修改成功';

localMessage.CELLPHONE_NOT_FOUND = '您输入的手机号码不存在';
localMessage.COURSE_NOT_FOUND = '该课程已被删除';

localMessage.COURSE_PLAN_NOT_FOUND = '该课程计划已被删除';


localMessage.exception = function (code, msg) {
  return `<strong>抱歉，系统发生异常，请联系我们</strong> </br>状态码:&nbsp ${code} </br> 详细信息:&nbsp ${msg}`;
};