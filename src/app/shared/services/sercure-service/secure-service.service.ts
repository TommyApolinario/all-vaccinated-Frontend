import * as CryptoJS from "crypto-js";
import { Injectable } from "@angular/core";
declare var require: any;
const SecureStorage = require("secure-web-storage");
const SECRET_KEY = "_Bvg/bVq0**";

@Injectable({
  providedIn: "root",
})
export class SecureServiceService {
  constructor() {}

  public secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key) {
      key = CryptoJS.SHA256(key, SECRET_KEY);

      return key.toString();
    },
    encrypt: function encrypt(data) {
      data = CryptoJS.AES.encrypt(data, SECRET_KEY);

      data = data.toString();

      return data;
    },
    decrypt: function decrypt(data) {
      data = CryptoJS.AES.decrypt(data, SECRET_KEY);

      data = data.toString(CryptoJS.enc.Utf8);

      return data;
    },
  });
}
