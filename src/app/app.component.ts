import { Component, OnInit, OnDestroy } from "@angular/core";
import { ApolloQueryResult } from "apollo-client";

import { Subscription } from "rxjs/internal/Subscription";
import { Observable } from "rxjs";
import { UserService } from "src/app/core/user.service";
import { environment } from "../environments/environment.prod";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  loading: boolean;
  user: any;
  environment = JSON.stringify(environment);

  userQuerySubscription: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    const loginName = "mrdulin";
    this.loading = true;
    // this.userService.query(loginName).subscribe(({ user, loading }) => {
    //   this.loading = loading;
    //   this.user = user;
    // });
  }

  ngOnDestroy() {
    this.userQuerySubscription.unsubscribe();
  }
}
