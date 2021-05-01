#include <ArduinoWebsockets.h>
#include <ESP8266WiFi.h>

using namespace websockets;

const char* ssid = "Rainbow Rabbit";
const char* password = "hoanglong040800";
const char* host = "192.168.1.3";
int port = 3333;
float tempeture = 12, humidity = 34, pressure = 56, altitude = 78;
WebsocketsClient client;


void onMessageCallback(WebsocketsMessage message) {
  Serial.print("Got message from server: ");
  Serial.println(message.data());
}

void onEventsCallback(WebsocketsEvent event, String data) {
  if (event == WebsocketsEvent::ConnectionOpened) {
    Serial.println("Connnection Opened");
  } else if (event == WebsocketsEvent::ConnectionClosed) {
    Serial.println("Connnection Closed");
  } else if (event == WebsocketsEvent::GotPing) {
    Serial.println("Got a Ping!");
  } else if (event == WebsocketsEvent::GotPong) {
    Serial.println("Got a Pong!");
  }
}

void connectWifi() {
  Serial.println("");
  Serial.println("");
  Serial.print("Connecting WiFi: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  Serial.println();
  Serial.print("Connected. ESP8266 IP: ");
  Serial.println(WiFi.localIP());
  Serial.println("");
  delay(500);
}

void connectSocket() {
  client.onMessage(onMessageCallback);
  client.onEvent(onEventsCallback);
  client.connect(host, port, "/");
  client.send("ESP8266 say hi to Websocket Server!");
  client.send("weather data");
  client.send(String(tempeture)+","+String(humidity)+","+String(pressure)+","+String(altitude));
}

void setup() {
  Serial.begin(115200);
  delay(10);

  connectWifi();
  connectSocket();
}

void loop() {
  if (client.available()) {
    client.poll();
  }

  else {
    Serial.println("Reconnecting...");
    client.connect(host, port, "/");
  }
  delay(1000);
}
