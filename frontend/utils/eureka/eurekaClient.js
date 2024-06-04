import { Eureka } from 'eureka-js-client';

const eurekaClient = new Eureka({
  instance: {
    app: 'TripPlanner',
    hostName: 'localhost', // Or your frontend's actual hostname/IP
    ipAddr: '127.0.0.1', // Or your frontend's actual IP
    statusPageUrl: 'http://localhost:3000/info',
    port: {
      '$': 3000, // Or your frontend's port
      '@enabled': true,
    },
    vipAddress: 'tripplanner.test.com', // Unique virtual IP
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    host: '127.0.0.1',
    port: 8761, // Or your Eureka Server port
    servicePath: '/eureka/apps/',
    fetchRegistry: true, // Fetch registry on startup
    registerWithEureka: true, // Register this instance with Eureka
  },
});

eurekaClient.start(error => {
  console.log(error || 'Eureka client startedS');
});

export async function fetchServiceUrl(serviceName) {

  try {
    const instances = eurekaClient.getInstancesByAppId(serviceName);

    if (instances.length === 0) {
      eurekaClient.stop();
      console.log('Service not found, Eureka Client stopped')
      throw new Error(`Service ${serviceName} not found`);
    }

    const instance = instances[0]; // Choose the first instance
    const protocol = instance.securePort ? 'https' : 'http';
    console.log('Service URL:', `${protocol}://${instance.ipAddr}:${instance.port.$}`);
    return `${protocol}://${instance.ipAddr}:${instance.port.$}`;
  } catch (error) {
    console.error('Error fetching service URL:', error);
    throw error;
  }
}