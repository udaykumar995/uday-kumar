import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateEmail,
  evaluatePasswordStrength,
  validateSignUpForm,
  validateLoginForm,
  validateResetPasswordForm,
  generateMockResetToken,
  validateResetToken
} from './auth-validation';

test('validateEmail correctly accepts valid emails', () => {
  assert.equal(validateEmail('user@example.com'), true);
  assert.equal(validateEmail('test.creator+reels@sub.domain.co'), true);
  assert.equal(validateEmail('jane_doe123@gmail.com'), true);
});

test('validateEmail rejects invalid emails', () => {
  assert.equal(validateEmail(''), false);
  assert.equal(validateEmail('plainaddress'), false);
  assert.equal(validateEmail('@missingusername.com'), false);
  assert.equal(validateEmail('user@.com'), false);
  assert.equal(validateEmail('user@example'), false);
});

test('evaluatePasswordStrength rates weak, medium, and strong passwords', () => {
  const empty = evaluatePasswordStrength('');
  assert.equal(empty.score, 0);
  assert.equal(empty.label, 'Very Weak');

  const weak = evaluatePasswordStrength('abc');
  assert.equal(weak.label, 'Weak');

  const fair = evaluatePasswordStrength('lowercase1234');
  assert.equal(fair.label, 'Fair');

  const strong = evaluatePasswordStrength('Abcdef123456!');
  assert.equal(strong.score >= 3, true);
  assert.ok(['Strong', 'Very Strong'].includes(strong.label));
});

test('validateSignUpForm flags missing fields and mismatches', () => {
  const result = validateSignUpForm({
    name: 'A',
    email: 'bad-email',
    password: 'short',
    confirmPassword: 'different',
    agreeToTerms: false
  });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.email);
  assert.ok(result.errors.password);
  assert.ok(result.errors.confirmPassword);
  assert.ok(result.errors.agreeToTerms);
});

test('validateSignUpForm passes for valid complete data', () => {
  const result = validateSignUpForm({
    name: 'Alex Rivera',
    email: 'alex@creatorreels.com',
    password: 'SafePassword123!',
    confirmPassword: 'SafePassword123!',
    agreeToTerms: true
  });
  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('generateMockResetToken and validateResetToken work end-to-end', () => {
  const email = 'creator@viralreels.io';
  const token = generateMockResetToken(email);
  assert.ok(typeof token === 'string' && token.length > 10);

  const validation = validateResetToken(token);
  assert.equal(validation.isValid, true);
  assert.equal(validation.email, email);

  const corruptedValidation = validateResetToken('corrupted-token-string');
  assert.equal(corruptedValidation.isValid, false);
});
