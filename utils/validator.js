/**
 * @description 数据校验
 */

let valida = {
  // 验证是否为合理的金额
  isMoney(value, errMsg) {
    if (!(/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(value))) {
      return errMsg
    }
  },
  // 验证正整数
  isInteger(value, errMsg) {
    if (!(/^\+?[1-9][0-9]*$/.test(value))) {
      return errMsg
    }
  },
  // 验证字段中是否含有空格
  hasSpace(value, errMsg) {
    if (value.indexOf(' ') > -1) {
      return errMsg
    }
  },
  // 验证是否为空
  isNull(value, errMsg) {
    if (!value || /^\s+$/.test(value)) {
      return errMsg
    }
  },
  // 验证是否为正确的手机号码
  isPhone(value, errMsg) {
    if (!/(^1[0-9][0-9]{9}$)/.test(value)) {
      return errMsg
    }
  },
  // 验证是否两次的值一致
  isSame(value, errMsg) {
    let v1 = value.split(' ')[0]
    let v2 = value.split(' ')[1]
    if (!(v1 === v2)) {
      return errMsg
    }
  },
  // 验证是否合法用户名， 用户名只能由字母或者数字组成，长度至少为4
  isUsername(value, errMsg) {
    if (!/([a-zA-Z0-9]{4,}$)/.test(value)) {
      return errMsg;
    }
  }
}


//验证表单辅助类
export class Validator {
  constructor() {
    this.cache = []
  }
  add(value, rules) {
    for (var i = 0; i < rules.length; i++) {
      this.cache.push({
        value,
        validaName: rules[i].validaName,
        errMsg: rules[i].errMsg
      })
    }
  }
  start() {
    for (var i = 0; i < this.cache.length; i++) {
      var errMsg = valida[this.cache[i].validaName](this.cache[i].value, this.cache[i].errMsg)
      if (typeof errMsg !== undefined) {
        return errMsg || '未能通过校验'
      }
    }
    return false
  }
}