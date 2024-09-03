export default async function handler(req, res) {
    const { repairCenter } = req.query;
  
    // Fetch phones from your database or any source
    // This is just an example, replace with your actual data fetching logic
    const phones = [
      {
        customerName: 'John Doe',
        phoneNumber: '1234567890',
        email: 'john.doe@example.com',
        phoneMake: 'Nokia',
        phoneModel: '3310',
        imei: '123456789012345',
        phoneIssues: 'Battery issue',
        createdAt: new Date().toISOString(),
        status: 'Out for Repair',
        repairCenterName: 'Nokia Repair Center',
        courier: 'XYZ Courier',
        waybillNumber: 'WAYBILL123',
        repairDate: new Date().toISOString(),
      },
      // Add other phones here
    ].filter(phone => phone.repairCenterName === repairCenter);
  
    res.status(200).json(phones);
  }