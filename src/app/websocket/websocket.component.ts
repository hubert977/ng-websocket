import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.scss']
})
export class WebsocketComponent implements OnInit {

  constructor() {
   }
   connectionMass = new WebSocket('ws://10.10.2.206:7000/status');
   comp;
   value;
  ngOnInit() {
    this.connectionMass.onopen = function (evt) {
        var that = this;
        window.setInterval(function () {
            var msg = {
                COMMAND: "GET_MOD_INFO"
            };
            that.send(JSON.stringify(msg));
                  }, 100);
  }
  this.connectionMass.onmessage =  (evt) => {
    var msg = JSON.parse(evt.data);
    this.value = msg.Data.Mass[0].NetAct.Value; 
    if(msg.Data.Mass[0].NetAct.Value === 'nie jest liczbą')
    {
      this.value = '0';
    }
    else {
      this.value = msg.Data.Mass[0].NetAct.Value;
    }
  }
}
taring()
{
      var msg = {
        COMMAND: "EXECUTE_ACTION",
        PARAM: "actTarring"
      }
      this.connectionMass.send(JSON.stringify(msg));
}
zeroing()
{
    var msg = {
      COMMAND: "EXECUTE_ACTION",
      PARAM: "actZeroing"
    }
    this.connectionMass.send(JSON.stringify(msg));
}
}