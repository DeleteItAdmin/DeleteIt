import { Component } from '@angular/core';
import { Http,Response} from '@angular/http';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Application';
 data :any;
 constructor(private httpClient: HttpClient){

 }
  getMenu(){
    //String uri="this.httpClient.get('http://localhost:8080/', (headers: {"Access-Control-Allow-Origin" :"*"})";
  //  console.log(uri);
    //alert();
    this.httpClient.get("http://localhost:8080", (headers: {"Access-Control-Allow-Origin" :"*"}))
    .subscribe((res) => {
      this.data = res;
      console.log(res);
    });
    //.map((res: Response) => res.json())
  }
}
