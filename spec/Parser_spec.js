'use strict';

describe('Parser', () => {
  const mach = require('mach.js');
  const proxyquire = require('proxyquire');

  const AstPrinter = require('../src/utility/AstPrinter');
  const Token = require('../src/Token');
  const TokenType = require('../src/TokenType');

  const mockLoxError = mach.mockObject({
    parseError: () => {}
  }, 'LoxError');

  const Parser = proxyquire('../src/Parser', {
    './LoxError': mockLoxError
  });

  const astPrinter = new AstPrinter();
  const EOF_TOKEN = new Token(TokenType.EOF, '', undefined, 1);
  const SEMICOLON_TOKEN = new Token(TokenType.SEMICOLON, ';', undefined, 1);

  const parser = new Parser();

  describe('should accept empty input', () => {
    it('', () => {
      expect(astPrinter.print(parser.parse([EOF_TOKEN]))).toEqual('');
    });
  });

  describe('should handle primary expressions', () => {
    it('NUMBER', () => {
      const tokens = [
        new Token(TokenType.NUMBER, '9', 9, 1),
        SEMICOLON_TOKEN,
        EOF_TOKEN
      ];

      expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement 9 )');
    });

    it('STRING', () => {
      const tokens = [
        new Token(TokenType.STRING, '\'kthnxbai\'', 'kthnxbai', 1),
        SEMICOLON_TOKEN,
        EOF_TOKEN
      ];

      expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement kthnxbai )');
    });

    it('false', () => {
      const tokens = [
        new Token(TokenType.FALSE, 'false', undefined, 1),
        SEMICOLON_TOKEN,
        EOF_TOKEN
      ];

      expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement false )');
    });

    it('true', () => {
      const tokens = [
        new Token(TokenType.TRUE, 'true', undefined, 1),
        SEMICOLON_TOKEN,
        EOF_TOKEN
      ];

      expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement true )');
    });

    it('nil', () => {
      const tokens = [
        new Token(TokenType.NIL, 'nil', undefined, 1),
        SEMICOLON_TOKEN,
        EOF_TOKEN
      ];

      expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement null )');
    });

    it('( EXPRESSION )', () => {
      const tokens = [
        new Token(TokenType.LEFT_PAREN, '(', undefined, 1),
        new Token(TokenType.TRUE, 'true', undefined, 1),
        new Token(TokenType.RIGHT_PAREN, ')', undefined, 1),
        SEMICOLON_TOKEN,
        EOF_TOKEN
      ];

      expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement ( group true ) )');
    });
  });

  describe('should handle unary expressions', () => {
    it('!true', () => {
      const tokens = [
        new Token(TokenType.BANG, '!', undefined, 1),
        new Token(TokenType.TRUE, 'true', undefined, 1),
        SEMICOLON_TOKEN,
        EOF_TOKEN
      ];

      expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement ( ! true ) )');
    });

    it('-3', () => {
      const tokens = [
        new Token(TokenType.MINUS, '-', undefined, 1),
        new Token(TokenType.NUMBER, '1', 3, 1),
        SEMICOLON_TOKEN,
        EOF_TOKEN
      ];

      expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement ( - 3 ) )');
    });
  });

  describe('should handle factor expressions', () => {
    it('6 * 9', () => {
      const tokens = [
        new Token(TokenType.NUMBER, '6', 6, 1),
        new Token(TokenType.STAR, '*', undefined, 1),
        new Token(TokenType.NUMBER, '9', 9, 1),
        SEMICOLON_TOKEN,
        EOF_TOKEN
      ];

      expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement ( * 6 9 ) )');
    });

    it('6 / 9', () => {
      const tokens = [
        new Token(TokenType.NUMBER, '6', 6, 1),
        new Token(TokenType.SLASH, '/', undefined, 1),
        new Token(TokenType.NUMBER, '9', 9, 1),
        SEMICOLON_TOKEN,
        EOF_TOKEN
      ];

      expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement ( / 6 9 ) )');
    });
  });

  describe('should handle term expressions', () => {
    it('6 + 9', () => {
      const tokens = [
        new Token(TokenType.NUMBER, '6', 6, 1),
        new Token(TokenType.PLUS, '+', undefined, 1),
        new Token(TokenType.NUMBER, '9', 9, 1),
        SEMICOLON_TOKEN,
        EOF_TOKEN
      ];

      expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement ( + 6 9 ) )');
    });

    it('6 - 9', () => {
      const tokens = [
        new Token(TokenType.NUMBER, '6', 6, 1),
        new Token(TokenType.MINUS, '-', undefined, 1),
        new Token(TokenType.NUMBER, '9', 9, 1),
        SEMICOLON_TOKEN,
        EOF_TOKEN
      ];

      expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement ( - 6 9 ) )');
    });
  });

  describe('should handle comparison expressions', () => {
    it('6 > 9', () => {
      const tokens = [
        new Token(TokenType.NUMBER, '6', 6, 1),
        new Token(TokenType.GREATER, '>', undefined, 1),
        new Token(TokenType.NUMBER, '9', 9, 1),
        SEMICOLON_TOKEN,
        EOF_TOKEN
      ];

      expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement ( > 6 9 ) )');
    });

    it('6 >= 9', () => {
      const tokens = [
        new Token(TokenType.NUMBER, '6', 6, 1),
        new Token(TokenType.GREATER_EQUAL, '>=', undefined, 1),
        new Token(TokenType.NUMBER, '9', 9, 1),
        SEMICOLON_TOKEN,
        EOF_TOKEN
      ];

      expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement ( >= 6 9 ) )');
    });

    it('6 < 9', () => {
      const tokens = [
        new Token(TokenType.NUMBER, '6', 6, 1),
        new Token(TokenType.LESS, '<', undefined, 1),
        new Token(TokenType.NUMBER, '9', 9, 1),
        SEMICOLON_TOKEN,
        EOF_TOKEN
      ];

      expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement ( < 6 9 ) )');
    });

    it('6 <= 9', () => {
      const tokens = [
        new Token(TokenType.NUMBER, '6', 6, 1),
        new Token(TokenType.LESS_EQUAL, '<=', undefined, 1),
        new Token(TokenType.NUMBER, '9', 9, 1),
        SEMICOLON_TOKEN,
        EOF_TOKEN
      ];

      expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement ( <= 6 9 ) )');
    });
  });

  describe('should handle equality expressions', () => {
    it('6 != 9', () => {
      const tokens = [
        new Token(TokenType.NUMBER, '6', 6, 1),
        new Token(TokenType.BANG_EQUAL, '!=', undefined, 1),
        new Token(TokenType.NUMBER, '9', 9, 1),
        SEMICOLON_TOKEN,
        EOF_TOKEN
      ];

      expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement ( != 6 9 ) )');
    });

    it('6 == 9', () => {
      const tokens = [
        new Token(TokenType.NUMBER, '6', 6, 1),
        new Token(TokenType.EQUAL_EQUAL, '==', undefined, 1),
        new Token(TokenType.NUMBER, '9', 9, 1),
        SEMICOLON_TOKEN,
        EOF_TOKEN
      ];

      expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement ( == 6 9 ) )');
    });
  });

  describe('complicated input', () => {
    it('(1 + 2) * (3 + 4)', () => {
      const tokens = [
        new Token(TokenType.LEFT_PAREN, '(', undefined, 1),
        new Token(TokenType.NUMBER, '1', 1, 1),
        new Token(TokenType.PLUS, '+', undefined, 1),
        new Token(TokenType.NUMBER, '2', 2, 1),
        new Token(TokenType.RIGHT_PAREN, ')', undefined, 1),
        new Token(TokenType.STAR, '*', undefined, 1),
        new Token(TokenType.LEFT_PAREN, '(', undefined, 1),
        new Token(TokenType.NUMBER, '3', 3, 1),
        new Token(TokenType.PLUS, '+', undefined, 1),
        new Token(TokenType.NUMBER, '4', 4, 1),
        new Token(TokenType.RIGHT_PAREN, ')', undefined, 1),
        SEMICOLON_TOKEN,
        EOF_TOKEN
      ];

      expect(astPrinter.print(parser.parse(tokens)))
        .toEqual('( statement ( * ( group ( + 1 2 ) ) ( group ( + 3 4 ) ) ) )');
    });
  });

  // TODO: multiline input
  // TODO: invalid input
  // TODO: exception (rethrow in parse) <- how?
  // TODO: verify synchronize
});
