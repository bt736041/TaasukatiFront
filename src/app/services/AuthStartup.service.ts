import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthActions } from "../store/auth/auth.actions";
import { selectAuthLoading } from "../store/auth/auth.selectors";
import { filter, take } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthStartupService {
  constructor(private store: Store) {}

  runRefresh(): Promise<void> {
    return new Promise((resolve) => {
      this.store.dispatch(AuthActions.refresh());

      this.store.select(selectAuthLoading).pipe(
        filter(loading => !loading),
        take(1)
      ).subscribe(() => {
        resolve();
      });
    });
  }
}
