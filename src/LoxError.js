'use strict';

const TokenType = require('./TokenType');

let _hadError = false;
let _hadRuntimeError = false;

/**
 * Error reporting mechanism for the interpreter.
 */
class LoxError {

  /**
   * Whether or not an error occurred.
   *
   * @static
   * @return {boolean}  True if an error occurred; otherwise false.
   */
  static get hadError() {
    return _hadError;
  }

  static get hadRuntimeError() {
    return _hadRuntimeError;
  }

  /**
   * Resets the error state.
   * @static
   */
  static reset() {
    _hadError = false;
    _hadRuntimeError = false;
  }

  static _report(line, where, message) {
    console.error(`[line ${line}] Error ${where}: ${message}`);
    _hadError = true;
  }

  /**
   * Error reporting method for the {@link Scanner}.
   *
   * @static
   * @param  {number} line    Line the error occurred on.
   * @param  {string} message Error message.
   */
  static scanError(line, message) {
    this._report(line, '', message);
  }

  /**
   * Error reporting method for the {@link Parser}.
   *
   * @static
   * @param  {Token}  token   Token the error occurred on.
   * @param  {string} message Error message.
   */
  static parseError(token, message) {
    if(token.type == TokenType.EOF) {
      this._report(token.line, "at end", message);
    }
    else {
      this._report(token.line, "at '" + token.lexeme + "'", message);
    }
  }

  static runtimeError(error) {
    console.log(`${error.message}\n[line ${error.token.line}]`);
    _hadRuntimeError = true;
  }
}

module.exports = LoxError;