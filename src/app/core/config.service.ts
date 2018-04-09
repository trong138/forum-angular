import { Injectable } from '@angular/core';
import *  as AppConfig from './config.const'
@Injectable()
export class ConfigService {
  baseURL: string = '';

  constructor() {
    this.setConfig('dev');
  }

  public setConfig(serverId: string): void {
    for (let i = 0; i < AppConfig.APP_CONFIG.length; i++) {
      if (AppConfig.APP_CONFIG[i] && AppConfig.APP_CONFIG[i].id == serverId) {
        this.initConfig(AppConfig.APP_CONFIG[i]);
      }
    }
  }

  private initConfig(config: object): void {
    this.baseURL = config['base_url'];
  }

  public getBaseURL(): string {
    return this.baseURL;
  }
}
