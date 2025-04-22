import styles from "./contactbody.module.css";
import React, { useState } from "react";
import axios from "axios";

export default function ContactBody() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    services: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    };

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
      isValid = false;
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First Name must be at least 2 characters";
      isValid = false;
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
      isValid = false;
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "Last Name must be at least 2 characters";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Phone validation (if provided)
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    // Message validation
    if (formData.message.length > 500) {
      newErrors.message = "Message cannot exceed 500 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "https://gstswebsite.onrender.com/send-email",
        formData
      );
      console.log("Response from server:", response.data);
      alert("Email sent successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        services: "",
        company: "",
        message: "",
      });
      setErrors({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error(
        "Error from server:",
        error.response?.data || error.message
      );
      alert("Failed to send email.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.parallaxSection}>
        <div className={styles.overlay}>
          <h2>Contact Us</h2>
          <p>We’d love to hear from you.</p>
          <p>Reach out and let’s start the conversation.</p>
        </div>

        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
              <div className={styles.fieldContainer}>
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className={errors.firstName ? styles.errorInput : ""}
                />
                {errors.firstName && (
                  <span className={styles.error}>{errors.firstName}</span>
                )}
              </div>

              <div className={styles.fieldContainer}>
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className={errors.lastName ? styles.errorInput : ""}
                />
                {errors.lastName && (
                  <span className={styles.error}>{errors.lastName}</span>
                )}
              </div>
            </div>

            <div className={styles.inputContainer}>
              <div className={styles.fieldContainer}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={errors.email ? styles.errorInput : ""}
                />
                {errors.email && (
                  <span className={styles.error}>{errors.email}</span>
                )}
              </div>

              <div className={styles.fieldContainer}>
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? styles.errorInput : ""}
                />
                {errors.phone && (
                  <span className={styles.error}>{errors.phone}</span>
                )}
              </div>
            </div>

            <div className={styles.inputContainer}>
              <div className={styles.fieldContainer}>
                <label>Company</label>
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.fieldContainer}>
                <label>Services</label>
                <select
                  name="services"
                  value={formData.services}
                  onChange={handleChange}
                >
                  <option value="">---Select---</option>
                  <option value="Immediately">Immediately</option>
                  <option value="In a few months">In a few months</option>
                  <option value="This Year">This Year</option>
                </select>
              </div>
            </div>

            <div className={styles.fieldContainer}>
              <label>Message</label>
              <textarea
                placeholder="Message"
                name="message"
                style={{ width: "191%", height: "80px" }}
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? styles.errorInput : ""}
              />
              {errors.message && (
                <span className={styles.error}>{errors.message}</span>
              )}
            </div>

            <div>
              <button type="submit" className={styles.btn}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
