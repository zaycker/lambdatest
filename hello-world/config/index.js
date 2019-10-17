module.exports = (data) => {
  obj = {
            "ContactInfo": {
            "FirstName": data.customerInfo.firstName,
            "LastName": data.customerInfo.lastName,
            "Addr1": data.customerInfo.address.street,
            "Addr2": data.customerInfo.address.street2,
            "City": data.customerInfo.address.city,
            "State": data.customerInfo.address.state,
            "Zip": data.customerInfo.address.zipCode,
            "County": data.customerInfo.address.county,
            "CellPhone": data.customerInfo.phone,
            "Email": data.customerInfo.email,
            },
            "Driver": [{
                "FirstName": data.customerInfo.firstName,
                "LastName": data.customerInfo.lastName,
                "BirthDt": data.customerInfo.DOB,
                "Relationship": "Self"
            }],
            "Vehicle": [{
                "Make": data.inventoryInfo.basicData.make,
                "Model": data.inventoryInfo.basicData.model,
                "Year": data.inventoryInfo.basicData.year,
                "Submodel": data.inventoryInfo.basicData.trim,
                "Alarm": "Yes",
                "AnnualMileage": data.annualMileage,
                "Ownership": "Leased",
                "VIN": data.inventoryInfo.VIN,
                "Address": data.dealershipInfo.address,
            }],
    "IntegrationId": "4b28b0d3-dae1-408a-82e0-26bc2ced3eca",
    "Source": "Rodo",
    "SubmissionURL": "www.leadcloud.us/quote",
    "ConsumerSourceIP": "104.225.240.150",
}
   return obj;
};
