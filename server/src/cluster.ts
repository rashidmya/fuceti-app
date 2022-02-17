import cluster from "cluster";
import http from "http";
import { setupMaster } from "@socket.io/sticky";
import os from 'os';

const WORKERS_COUNT = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < WORKERS_COUNT; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });

  const httpServer = http.createServer();
  setupMaster(httpServer, {
    loadBalancingMethod: "least-connection",
  });
  const PORT = process.env.PORT || 3000;

  httpServer.listen(PORT, () => {
    console.log("server listening on port " + PORT);
  });
} else {
  console.log(`Worker ${process.pid} started`);
  import('./app')
}
