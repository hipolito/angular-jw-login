import { Injectable } from "@angular/core";
import { Observable, Subject, filter } from "rxjs";
import { Alert, AlertType, AlertOptions } from "@app/models/alert";

@Injectable({ providedIn: 'root' })
export class AlertService {

    private subject = new Subject<Alert>();
    private defaultId = 'default-alert';

    alert(alert: Alert) {
        alert.id = alert.id || this.defaultId;
        this.subject.next(alert);
    }

    onAlert(id = this.defaultId): Observable<Alert> {
        return this.subject.asObservable().pipe(filter(alert => alert && alert.id === id))
    }

    success(message: string, options?: AlertOptions) {
        this.alert(new Alert({ ...options, type: AlertType.Success, message }));
    }

    error(message: string, options?: AlertOptions) {
        this.alert(new Alert({ ...options, type: AlertType.Error, message }));
    }

    info(message: string, options?: AlertOptions) {
        this.alert(new Alert({ ...options, type: AlertType.Info, message }));
    }

    warn(message: string, options?: AlertOptions) {
        this.alert(new Alert({ ...options, type: AlertType.Warning, message }));
    }

    clear(id = this.defaultId) {
        this.subject.next(new Alert({ id }));
    }
}