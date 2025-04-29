export class DeviceChecker {
  /**
   * スマートフォンかどうかをチェックする
   * @returns {boolean} スマートフォンの場合はtrue、それ以外はfalse
   */
  static isSmartphone(): boolean {
    // UserAgentによるチェック
    const ua = navigator.userAgent.toLowerCase();
    const isSmartphone = (
      ua.indexOf('iphone') > -1 ||
      ua.indexOf('ipod') > -1 ||
      (ua.indexOf('android') > -1 && ua.indexOf('mobile') > -1) ||
      ua.indexOf('windows phone') > -1 ||
      ua.indexOf('blackberry') > -1
    );
    return isSmartphone;
  }

  /**
   * PCかどうかをチェックする
   * @returns {boolean} PCの場合はtrue、それ以外はfalse
   */
  static isPC(): boolean {
    return !this.isSmartphone();
  }
}
