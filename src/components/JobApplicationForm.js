import React, { useState } from 'react';
import useFormValidation from './useFormValidation'; // Custom hook for validation


const JobApplicationForm = () => {
  const { 
    handleSubmit,
    handleInputChange,
    handleCheckboxChange,
    errors,
    formValues,
    setFormValues,
    isFormValid
  } = useFormValidation(); // Custom hook for form validation

  const [position, setPosition] = useState('');

  const handlePositionChange = (e) => {
    setPosition(e.target.value);
    setFormValues({ ...formValues, position: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Perform final validation before submission
    let newErrors = {};
    if (!formValues.fullName) {
      newErrors.fullName = 'Full Name is required';
    }
    if (!formValues.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = 'Email must be a valid email address';
    }
    if (!formValues.phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d+$/.test(formValues.phoneNumber)) {
      newErrors.phoneNumber = 'Phone Number must be a valid number';
    }
    if ((formValues.position === 'Developer' || formValues.position === 'Designer') && !formValues.relevantExperience) {
      newErrors.relevantExperience = 'Relevant Experience is required';
    }
    if (formValues.position === 'Designer' && !formValues.portfolioURL) {
      newErrors.portfolioURL = 'Portfolio URL is required';
    }
    if (formValues.position === 'Manager' && !formValues.managementExperience) {
      newErrors.managementExperience = 'Management Experience is required';
    }
    if (!formValues.skills || formValues.skills.length === 0) {
      newErrors.skills = 'At least one skill must be selected';
    }
    if (!formValues.preferredInterviewTime) {
      newErrors.preferredInterviewTime = 'Preferred Interview Time is required';
    }

   if (Object.keys(newErrors).length > 0) {
    // setErrors(newErrors);
    alert('Please fill in all required fields correctly.');
  } else {
    // If form is valid, submit the form (e.g., send data to server or display summary)
    // Example:
    // alert('Form submitted successfully!');
    displaySummary(); // You can implement the displaySummary function
  }
};

const displaySummary = () => {
  // Construct a summary message or display the form values in a modal
  const summaryMessage = `
    Full Name: ${formValues.fullName}
    Email: ${formValues.email}
    Phone Number: ${formValues.phoneNumber}
    Applying for Position: ${formValues.position}
    ${formValues.position === 'Developer' || formValues.position === 'Designer' ? `Relevant Experience: ${formValues.relevantExperience}` : ''}
    ${formValues.position === 'Designer' ? `Portfolio URL: ${formValues.portfolioURL}` : ''}
    ${formValues.position === 'Manager' ? `Management Experience: ${formValues.managementExperience}` : ''}
    Additional Skills: ${formValues.skills ? formValues.skills.join(', ') : ''}
    Preferred Interview Time: ${formValues.preferredInterviewTime}
  `;
  alert(`Form submitted successfully!\n\n${summaryMessage}`);
  // You can also render this summary in a modal or another component if needed
};

  return (
    
    <form className="form_class"onSubmit={onSubmit}>
      <label>
        Full Name:
        <input 
          type="text" 
          name="fullName" 
          value={formValues.fullName || ''} 
          onChange={handleInputChange} 
          required 
        />
        {errors.fullName && <span className="error">{errors.fullName}</span>}
      </label>

      <label className='label_class'>
        Email:
        <input 
          type="email" 
          name="email" 
          value={formValues.email || ''} 
          onChange={handleInputChange} 
          required 
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </label>

      <label className='label_class'>
        Phone Number:
        <input 
          type="tel" 
          name="phoneNumber" 
          value={formValues.phoneNumber || ''} 
          onChange={handleInputChange} 
          required 
        />
        {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
      </label>

      <label className='label_class'>
        Applying for Position: 
        <select name="position" value={position} onChange={handlePositionChange} required>
          <option value="">Select position</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </select>
        {errors.position && <span className="error">{errors.position}</span>}
      </label>

      {position === 'Developer' || position === 'Designer' ? (
        <label>
          Relevant Experience (years):
          <input className='label_class'
            type="number" 
            name="relevantExperience" 
            value={formValues.relevantExperience || ''} 
            onChange={handleInputChange} 
            required={position === 'Developer' || position === 'Designer'} 
          />
          {errors.relevantExperience && <span className="error">{errors.relevantExperience}</span>}
        </label>
      ) : null}

      {position === 'Designer' ? (
        <label>
          Portfolio URL:
          <input className='label_class'
            type="url" 
            name="portfolioURL" 
            value={formValues.portfolioURL || ''} 
            onChange={handleInputChange} 
            required={position === 'Designer'} 
          />
          {errors.portfolioURL && <span className="error">{errors.portfolioURL}</span>}
        </label>
      ) : null}

      {position === 'Manager' ? (
        <label className='label_class_manager'>
          Management Experience:
          <textarea className='manager_text'
            name="managementExperience" 
            value={formValues.managementExperience || ''} 
            onChange={handleInputChange} 
            required={position === 'Manager'} 
          />
          {errors.managementExperience && <span className="error">{errors.managementExperience}</span>}
        </label>
      ) : null}

      <fieldset className='label_class'>
        <legend>Additional Skills: </legend>
        <label>
          <input 
            type="checkbox" 
            name="skills" 
            value="JavaScript" 
            onChange={handleCheckboxChange} 
          />
          JavaScript
        </label>
        <label className='label_class'>
          <input 
            type="checkbox" 
            name="skills" 
            value="CSS" 
            onChange={handleCheckboxChange} 
          />
          CSS
        </label>
        <label className='label_class'>
          <input 
            type="checkbox" 
            name="skills" 
            value="Python" 
            onChange={handleCheckboxChange} 
          />
          Python
        </label>
        {/* Add more skills as needed */}
        {errors.skills && <span className="error">{errors.skills}</span>}
      </fieldset>

      <label className='label_class'>
        Preferred Interview Time:
        <input 
          type="datetime-local" 
          name="preferredInterviewTime" 
          value={formValues.preferredInterviewTime || ''} 
          onChange={handleInputChange} 
          required 
        />
        {errors.preferredInterviewTime && <span className="error">{errors.preferredInterviewTime}</span>}
      </label>

      <button type="submit" disabled={!isFormValid()}>
        Submit Application
      </button>
    </form>
   
  );
};

export default JobApplicationForm;
