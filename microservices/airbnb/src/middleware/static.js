// @flow

import config from 'config';
import express from 'express';
import Logger from 'server/utils/logger';

const ASSETS_CONFIG = config.get('assets');

/**
 * [request description]
 * @type {[type]}
 */
export default function staticMiddleware(): Function {
  return express.static(ASSETS_CONFIG.get('staticRoot'));
}
