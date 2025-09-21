document.addEventListener("DOMContentLoaded", () => {
    fetchUsers();
  });
  
  function fetchUsers() {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((users) => {
        const tbody = document.getElementById("user-data");
  
        if (users.length === 0) {
          tbody.innerHTML = `<tr><td colspan="4" class="no-data">No users found.</td></tr>`;
        } else {
          tbody.innerHTML = "";
          users.forEach((user) => {
            tbody.innerHTML += `
              <tr>
                <td>${user.name}</td>
                <td>${user.address}</td>
                <td>${user.productName || "-"}</td>
                <td>$${(user.productPrice || 0).toFixed(2)}</td>
              </tr>
            `;
          });
        }
      })
      .catch((err) => {
        document.getElementById("user-data").innerHTML = `<tr><td colspan="4" class="no-data">Failed to load data.</td></tr>`;
        console.error("Error loading users:", err);
    });
}
  