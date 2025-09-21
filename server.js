// Signup Form Handler
document.getElementById('signup-form')?.addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const contact = document.getElementById('contact').value;
  const bloodGroup = document.getElementById('bloodGroup').value;
  const address = document.getElementById('address').value;

  const newDonor = {
    name,
    email,
    contact,
    bloodGroup,
    address,
  };

  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDonor),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);  // Show success message
      window.location.href = 'login.html'; // Redirect to login page
    } else {
      alert(data.message); // Show error message
    }
  } catch (err) {
    console.error('Error:', err);
    alert('Error during registration. Please try again.');
  }
});

// Login Form Handler
document.getElementById('login-form')?.addEventListener('submit', async function (e) {
  e.preventDefault();

  const bloodGroup = document.getElementById('bloodGroupSearch').value;
  const location = document.getElementById('location').value;

  const searchCriteria = { bloodGroup, location };

  try {
    const response = await fetch('http://localhost:3000/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchCriteria),
    });

    const donors = await response.json();

    if (response.ok) {
      if (donors.length > 0) {
        let donorList = '<ul>';
        donors.forEach(donor => {
          donorList += `<li>${donor.name} - ${donor.bloodGroup} - ${donor.address}</li>`;
        });
        donorList += '</ul>';
        document.getElementById('donor-list').innerHTML = donorList;
      } else {
        document.getElementById('donor-list').innerHTML = 'No donors found';
      }
    } else {
      alert('Error searching for donors');
    }
  } catch (err) {
    console.error('Error:', err);
    alert('Error during search. Please try again.');
  }
});
