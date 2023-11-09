import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const PROTO_PATH ='./proto/hello.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH);

const helloProto = grpc.loadPackageDefinition(packageDefinition);

const client = new helloProto.HelloService("127.0.0.1:9090", grpc.ChannelCredentials.createInsecure());

client.HelloMessage({message: "World"}, (err, response) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(response.message);
});

const stream = new client.Time({});

stream.on('data', (data) => {
    console.log(data.time);
} );

stream.on('end', () => {
    console.log('End');
} );

const ping = new client.Ping();

ping.write("Ping");
ping.on('data', (data) => {
    console.log(data.message);
    setTimeout(() => {
        ping.write("Ping");
    } , 1000);
});