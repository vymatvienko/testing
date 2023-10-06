export function isValidCard(value) {
  if (value.length === 0) {
    return false;
  }

  let sum = 0;
  const nDigits = value.length;
  const parity = nDigits % 2;
  let digit;
  for (let i = 0; i < nDigits; i += 1) {
    digit = Number(value[i]);

    if (i % 2 === parity) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

export function getCardType(value) {
  if (value[0] === '2') {
    return 'mir';
  } if (value[0] === '4') {
    return 'visa';
  } if (value[0] === '5') {
    return 'mastercard';
  } if (value.substr(0, 2) === '34' || value.substr(0, 2) === '37') {
    return 'amex';
  } if (value.substr(0, 2) === '60') {
    return 'discover';
  } if (value.substr(0, 2) === '31' || value.substr(0, 2) === '35') {
    return 'jcb';
  } if (
    value.substr(0, 2) === '30'
      || value.substr(0, 2) === '36'
      || value.substr(0, 2) === '38'
  ) {
    return 'diners';
  }
  return 'others';
}
