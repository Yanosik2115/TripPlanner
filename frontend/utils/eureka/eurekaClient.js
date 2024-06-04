import Eureka from 'eureka-js-client';

const eurekaClient = new Eureka({
  instance: {
    app: 'TripPlanner',
    hostName: 'localhost', // Or your frontend's actual hostname/IP
    ipAddr: '127.0.0.1', // Or your frontend's actual IP
    port: {
      '$': 3000, // Or your frontend's port
      '@enabled': true,
    },
    vipAddress: 'YOUR_FRONTEND_APP_NAME', // Unique virtual IP
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
  console.log(error || 'Eureka client started');
});

export async function fetchServiceUrl(serviceName) {
  try {
    const instances = await new Promise((resolve, reject) => {
      eurekaClient.getInstancesByAppId(serviceName, (error, instances) => {
        if (error) {
          reject(error);
        } else {
          resolve(instances);
        }
      });
    });

    if (instances.length === 0) {
      throw new Error(`Service ${serviceName} not found`);
    }

    const instance = instances[0]; // Choose the first instance
    const protocol = instance.securePort ? 'https' : 'http';
    return `${protocol}://${instance.ipAddr}:${instance.port.$}`;
  } catch (error) {
    console.error('Error fetching service URL:', error);
    throw error;
  }
}