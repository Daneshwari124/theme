function payNow() {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const pincode = document.getElementById("pincode").value;
    const paymentMethod = document.querySelector('input[name="pay"]:checked').value;
    const amount = paymentMethod === 'Online' ? document.getElementById("amount").value : null;
  
    if (!name || !address || !pincode || (paymentMethod === 'Online' && !amount)) {
      document.getElementById("error").style.display = "block";
      return;
    }
  
    if (paymentMethod === 'Online') {
      const upiId = document.getElementById("upi-id").value;
      const upiRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.)+(upi|paytm|okaxis|gpay)$/;
  
      if (!upiRegex.test(upiId)) {
        alert("Please enter a valid UPI ID (e.g., username@upi)");
        return;
      }
    }
  
    const orderData = {
      name: name,
      address: address,
      pincode: pincode,
      productName: "Product Name", // Replace with dynamic product name
      productPrice: 100, // Replace with dynamic price
      upiId: paymentMethod === 'Online' ? document.getElementById("upi-id").value : null,
      paymentMethod: paymentMethod,
    };
  
    // Sending POST request to backend to save the order
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Order placed successfully") {
          document.getElementById("success").style.display = "block";
          document.getElementById("error").style.display = "none";
        }
      })
      .catch((err) => {
        console.error("Error placing order:", err);
        document.getElementById("error").style.display = "block";
    });
}
  