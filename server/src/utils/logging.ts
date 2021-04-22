/* eslint-disable no-console */
function getTime () {
  return new Date().toISOString();
}

function info (namespace:string, message: string, obj?: any) {
  if (obj) {
    console.info(`[${getTime()}] [INFO] [${namespace}] ${message}`, obj);
  } else {
    console.info(`[${getTime()}] [INFO] [${namespace}] ${message}`);
  }
}

export default {
  info,
};