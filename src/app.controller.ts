import { Controller, Get, Render } from "@nestjs/common";
import { AppService } from "./app.service";
import getJsURL from "./helpers/getJsURL";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render("index")
  getHello() {
    return {
      js: getJsURL(),
    };
  }
}
