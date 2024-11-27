export const BASE_URL_TRANSACTION = process.env.NODE_ENV === 'production' ? 'https://wowlibre-external-176154737.us-east-2.elb.amazonaws.com/transaction' : 'http://localhost:8092/transaction';
export const BASE_URL = process.env.NODE_ENV === 'production' ?'https://wowlibre-external-176154737.us-east-2.elb.amazonaws.com/core': 'http://localhost:8091/core';
