import { useState } from 'react';

const useFormValidation = () => {
  const [formValues, setFormValues] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    skills: [],
    preferredInterviewTime: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    // Clear error message when input value changes
    setErrors({ ...errors, [name]: '' });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    let currentSkills = formValues[name] || [];

    if (checked) {
      currentSkills = [...currentSkills, value];
    } else {
      currentSkills = currentSkills.filter(skill => skill !== value);
    }

    setFormValues({ ...formValues, [name]: currentSkills });

    // Clear error message when checkbox changes
    setErrors({ ...errors, skills: '' });
  };

  const handleSubmit = (e) => {
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
    } else if (!/^\d{10}$/.test(formValues.phoneNumber)) {
      newErrors.phoneNumber = 'Phone Number must be exactly 10 digits';
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

    setErrors(newErrors);

    // If no errors, you can proceed with form submission
    if (Object.keys(newErrors).length === 0) {
      // Perform action (e.g., submit to server or display summary)
      // For demonstration, logging form values
      console.log('Form submitted with values:', formValues);
      // You can implement further actions like submitting to a server, showing a confirmation message, etc.
    }
  };

  const isFormValid = () => {
    return (
      formValues.fullName &&
      formValues.email &&
      formValues.phoneNumber &&
      /^\d{10}$/.test(formValues.phoneNumber) && // Validate exact 10 digits
      ((formValues.position === 'Developer' || formValues.position === 'Designer') ? formValues.relevantExperience : true) &&
      (formValues.position === 'Designer' ? formValues.portfolioURL : true) &&
      (formValues.position === 'Manager' ? formValues.managementExperience : true) &&
      formValues.skills &&
      formValues.skills.length > 0 &&
      formValues.preferredInterviewTime
    );
  };

  return {
    handleSubmit,
    handleInputChange,
    handleCheckboxChange,
    errors,
    formValues,
    setFormValues,
    isFormValid
  };
};

export default useFormValidation;
