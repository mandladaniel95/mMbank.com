// Function to get services
async function getServices() {
    try {
      // Send request to server-side API to get services
      const response = await fetch('/get-services');
      const data = await response.json();
      if (data.success) {
        // Display services to user
        const services = data.services;
        services.forEach((service) => {
          console.log(service.name);
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
