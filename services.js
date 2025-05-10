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
  
  // Function to add service
  async function addService(serviceDetails) {
    try {
      // Validate service details
      if (!serviceDetails || !serviceDetails.name || !serviceDetails.description) {
        throw new Error('Invalid service details');
      }
  
      // Send request to server-side API to add service
      const response = await fetch('/add-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceDetails),
      });
  
      const data = await response.json();
      if (data.success) {
        // Service added successfully
        console.log('Service added successfully');
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  // Function to update service
  async function updateService(serviceId, serviceDetails) {
    try {
      // Validate service details
      if (!serviceId || !serviceDetails || !serviceDetails.name || !serviceDetails.description) {
        throw new Error('Invalid service details');
      }
  
      // Send request to server-side API to update service
      const response = await fetch(`/update-service/${serviceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceDetails),
      });
  
      const data = await response.json();
      if (data.success) {
        // Service updated successfully
        console.log('Service updated successfully');
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  // Function to delete service
  async function deleteService(serviceId) {
    try {
      // Validate service ID
      if (!serviceId) {
        throw new Error('Invalid service ID');
      }
  
      // Send request to server-side API to delete service
      const response = await fetch(`/delete-service/${serviceId}`, {
        method: 'DELETE',
      });
  
      const data = await response.json();
      if (data.success) {
        // Service deleted successfully
        console.log('Service deleted successfully');
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  }
  

  app.get('/get-services', async (req, res) => {
    try {
      // Get services from database
      const services = await Service.find();
      res.json({ success: true, services });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get services' });
    }
  });
  
  app.post('/add-service', async (req, res) => {
    try {
      // Validate service details
      const { name, description } = req.body;
      if (!name || !description) {
        return res.status(400).json({ error: 'Invalid service details' });
      }
  
      // Add service to database
      const newService = new Service({
        name,
        description,
      });
      await newService.save();
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add service' });
    }
  });
  
  app.put('/update-service/:id', async (req, res) => {
    try {
      // Validate service details
      const { id } = req.params;
      const { name, description } = req.body;
      if (!id || !name || !description) {
        return res.status(400).json({ error: 'Invalid service details' });
      }
  
      // Update service in database
      const service = await Service.findByIdAndUpdate(id, {
        name,
        description,
      });
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update service' });
    }
  });
  
  app.delete('/delete-service/:id', async (req, res) => {
    try {
      // Validate service ID
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: 'Invalid service ID' });