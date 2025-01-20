import React,{useState} from 'react';
import CryptoJS from "crypto-js"; // Import the crypto-js library

const AccountForm = (props) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        dob: '',
        password: '',
        country: '',
        telephone: '',

      });
    
    
      // Handle input changes
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      // Handle form submission
      const handleSubmit = (e) => {

        e.preventDefault();
        // Hash the password using SHA-256
        const hashedPassword = CryptoJS.SHA256(formData.password).toString(CryptoJS.enc.Base64);
    
        // Log the form data with the hashed password
        console.log("Form Data with Hashed Password:", {
          ...formData,
          password: hashedPassword
        });
        props.continue(true);
      };
    
  return (
<>
            <h2>Create account</h2>
            <p id="sub">
              Already have an account? <a href="#">Log in</a>
            </p>
            <form className="create-account-form" onSubmit={handleSubmit}>
              <label>
                <input
                required
                  className="username"
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <input
                required
                  className="email"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <p className="sub-text">
                  The name must match the details on the ID
                </p>
              </label>
              <label>
                <input
                required
                  className="dob"
                  type="date"
                  placeholder="Date of Birth"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
                <p className="sub-text">
                  The minimum age for registration is 18 years old
                </p>
              </label>
              <label>
                <input
                required
                  className="password1"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <p className="sub-text">
                  Password must be at least 8 characters. Can't include your name
                  or email address
                </p>
              </label>
              <label>
                <input
                required
                  className="country"
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
                <input
                required
                  className="telephone"
                  type="tel"
                  placeholder="Telephone number"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                />
              </label>
              <p className="terms">
                I confirm that I am at least 18 years of age, and accept the {" "}
                <a href="#">General Terms & Conditions</a>.
              </p>
              <button type="submit" className="create-account-button">
                Agree and continue
              </button>
            </form>
          </>
  );
};

export default AccountForm;



