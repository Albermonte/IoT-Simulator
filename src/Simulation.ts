import Battery from "./models/Battery";
import uWS from "uWebSockets.js";

export default class Simulation {
  private static charge: number;
  private static temp: number;
  private static websocketClient: uWS.TemplatedApp;

  public static start() {
    this.charge = 100;
    this.temp = 30;

    const port = 7777;
    this.websocketClient = uWS.App().ws('/*', {
      compression: 0,
      maxPayloadLength: 16 * 1024 * 1024,
      idleTimeout: 10,
      open: (ws) => {
        // this handler is called when a client opens a ws connection with the server
        console.log("WS open");
        ws.subscribe('telemetry');
      },

      message: ws => {
        // called when a client sends a message
      },

      close: (ws, code, message) => {
        // called when a ws connection is closed
      }
    }).listen(port, token => {
      token ?
        console.log(`Listening to port ${port}`) :
        console.log(`Failed to listen to port ${port}`);
    });

    setInterval(() => {
      this.generateBattery();
    }, 1000);
  }

  private static generateBattery() {
    if (this.charge) this.charge -= this.getRandomFloat(0.0, 2.0);
    else this.charge = 0;
    const tension = this.getRandomFloat(10, 40);
    const tempVariation = tension * this.getRandomFloat(0, 0.1) * (tension > 30 ? 1 : -1);
    this.temp += tempVariation;
    if (this.temp < 30) this.temp = 30;

    const data = {
      tension,
      temp: this.temp,
      charge: this.charge
    };

    const dataToDB = new Battery(data);
    dataToDB.save();

    this.websocketClient.publish('telemetry', JSON.stringify({ type: 'battery', ...data }));
  }


  /**
 * Get a random floating point number between `min` and `max`.
 * 
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {number} a random floating point number
 */
  private static getRandomFloat(min: number, max: number): number {
    return Math.round((Math.random() * (max - min) + min) * 100) / 100;
  }
}