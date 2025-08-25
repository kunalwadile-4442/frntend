    import { io, Socket } from "socket.io-client";

    class SocketSingleton {
    private static instance: SocketSingleton;
    private socket: Socket;

    private constructor(user_data) {

        this.socket =io(`${import.meta.env.VITE_APP_ENDPOINT_URL}`, {
            auth: { token: user_data?.accessToken },
            autoConnect: false,
            reconnection: false,
            reconnectionAttempts: 0,
            });
    }

    public static getInstance(user_data): SocketSingleton {
        if (!SocketSingleton.instance) {
        SocketSingleton.instance = new SocketSingleton(user_data);
        }
        return SocketSingleton.instance;
    }

    public getSocket(): Socket {
        return this.socket;
    }

    disconnectSocket() {
        if (this.socket) {
          this.socket.disconnect(); // Disconnect the WebSocket connection
          this.socket = null; // Remove the socket instance
        }
        SocketSingleton.instance = null; // Remove the class instance
      }
    }

    export default SocketSingleton;