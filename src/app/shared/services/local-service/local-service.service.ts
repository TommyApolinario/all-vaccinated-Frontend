import { Injectable } from "@angular/core";
import { SecureServiceService } from "../sercure-service/secure-service.service";

@Injectable({
  providedIn: "root",
})
export class LocalServiceService {
  constructor(private storageService: SecureServiceService) {}

  setJsonLS(key: string, value: any) {
    this.storageService.secureStorage.setItem(key, value);
  }

  getJsonLS(key: string) {
    return this.storageService.secureStorage.getItem(key);
  }

  clearLS() {
    return this.storageService.secureStorage.clear();
  }
}
