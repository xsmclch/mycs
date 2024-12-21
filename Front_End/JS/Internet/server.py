import json
from http.server import BaseHTTPRequestHandler, HTTPServer


class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # 处理 GET 请求
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()
        response = {"message": "GET request received"}
        self.wfile.write(json.dumps(response).encode())

    def do_POST(self):
        # 处理 POST 请求
        content_length = int(self.headers["Content-Length"])  # 获取请求体的长度
        post_data = self.rfile.read(content_length)  # 读取请求体
        try:
            data = json.loads(post_data)  # 解析 JSON 数据
        except json.JSONDecodeError:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b"Invalid JSON data")
            return

        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()
        response = {"message": "POST request received", "data": data}
        self.wfile.write(json.dumps(response).encode())


def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler, port=1999):
    server_address = ("", port)
    httpd = server_class(server_address, handler_class)
    print(f"Starting server on port {port}...")
    httpd.serve_forever()


if __name__ == "__main__":
    run()
