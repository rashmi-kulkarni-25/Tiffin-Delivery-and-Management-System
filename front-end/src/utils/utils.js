import { dotNetConstants, nodejsConstants } from "./constants";

export function createDotNetUrl(path) {
  return dotNetConstants.serverUrl + path;
}

export function createNodejsUrl(path) {
  return nodejsConstants.serverUrl + path;
}

export function log(message) {
  console.log(message);
}
