import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, switchMap } from 'rxjs/operators';
import { IpConfig } from '../models/ip-config';
import { SettingsConfig } from '../models/settings-config';

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
  ips: IpConfig = {} as IpConfig;
  settingConfig: SettingsConfig = {} as SettingsConfig;
  http = inject(HttpClient);
 

  initConfiguration(path:string): Promise<any> {
    
    return combineLatest(
      this.http.get<IpConfig>(`${path}/ipConfig.json`),
      this.http.get<SettingsConfig>(`${path}/settingsConfig.json`)
    ).pipe(
      tap(response => console.log(response)),
      tap(response => [this.ips, this.settingConfig] = response),
    ).toPromise();
  }
}
