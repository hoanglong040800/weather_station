#include <ArduinoWebsockets.h>
#include <ESP8266WiFi.h>

using namespace websockets;

const char* ssid = "Rainbow Rabbit";
const char* password = "hoanglong040800";
char host[] = "192.168.1.3";
int port = 3333;
const char* websocket_server = "192.168.1.3";
WebsocketsClient client;


void onMessageCallback(WebsocketsMessage message) {
  Serial.print("Got Message: ");
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
  client.connect(websocket_server, port, "/");
  client.send("Hi Server!");
  client.ping();
}

void setup() {
  Serial.begin(115200);
  delay(10);

  connectWifi();
  connectSocket();
  // client.close();
}

void loop() {
  client.poll();
}
