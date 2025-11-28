import { useState, type FormEvent } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  salesExperience: string;
  educationalQualification: string;
  aboutYou: string;
}

function Form() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+91',
    phoneNumber: '',
    salesExperience: '',
    educationalQualification: '',
    aboutYou: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countryCodes = [
    { code: '+1', country: 'US/CA' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'India' },
    { code: '+971', country: 'UAE' },
    { code: '+966', country: 'Saudi Arabia' },
    { code: '+974', country: 'Qatar' },
    { code: '+965', country: 'Kuwait' },
    { code: '+968', country: 'Oman' },
    { code: '+973', country: 'Bahrain' },
    { code: '+962', country: 'Jordan' },
    { code: '+961', country: 'Lebanon' },
    { code: '+20', country: 'Egypt' },
    { code: '+964', country: 'Iraq' },
    { code: '+963', country: 'Syria' },
    { code: '+970', country: 'Palestine' },
    { code: '+967', country: 'Yemen' },
    { code: '+98', country: 'Iran' },
    { code: '+90', country: 'Turkey' },
    { code: '+972', country: 'Israel' },
    { code: '+61', country: 'Australia' },
    { code: '+81', country: 'Japan' },
    { code: '+86', country: 'China' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Apply input restrictions based on field type
    let sanitizedValue = value;

    switch (name) {
      case 'firstName':
      case 'lastName':
        // Allow only letters, spaces, hyphens, apostrophes, and periods
        sanitizedValue = value.replace(/[^a-zA-Z\s'\-.,]/g, '');
        break;
      case 'phoneNumber':
        // Allow only digits, spaces, hyphens, and parentheses
        sanitizedValue = value.replace(/[^0-9\s\-()]/g, '');
        break;
      case 'educationalQualification':
        // Allow alphanumeric and common punctuation
        sanitizedValue = value.replace(/[^a-zA-Z0-9\s.,'\-()&]/g, '');
        break;
      case 'aboutYou':
        // Allow alphanumeric with common punctuation
        sanitizedValue = value.replace(/[^a-zA-Z0-9\s.,!?'\-()&@#$%:;"\n]/g, '');
        break;
    }

    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    // First Name Validation - Only letters, spaces, hyphens, and apostrophes (2-50 chars)
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    } else if (formData.firstName.trim().length > 50) {
      newErrors.firstName = 'First name must not exceed 50 characters';
    } else if (!nameRegex.test(formData.firstName.trim())) {
      newErrors.firstName = 'First name can only contain letters, spaces, hyphens, and apostrophes';
    }

    // Last Name Validation - Same as first name
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    } else if (formData.lastName.trim().length > 50) {
      newErrors.lastName = 'Last name must not exceed 50 characters';
    } else if (!nameRegex.test(formData.lastName.trim())) {
      newErrors.lastName = 'Last name can only contain letters, spaces, hyphens, and apostrophes';
    }

    // Email Validation - RFC 5322 compliant
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (formData.email.trim().length > 254) {
      newErrors.email = 'Email must not exceed 254 characters';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g., user@example.com)';
    }

    // Phone Number Validation - Only digits, 10-15 characters
    const phoneRegex = /^[0-9]{10,15}$/;
    const cleanPhone = formData.phoneNumber.replace(/[\s\-()]/g, '');
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phoneNumber = 'Phone number must be 10-15 digits (numbers only)';
    } else if (!/^[1-9]/.test(cleanPhone)) {
      newErrors.phoneNumber = 'Phone number cannot start with 0';
    }

    // Sales Experience Validation
    if (!formData.salesExperience) {
      newErrors.salesExperience = 'Please select your sales experience';
    } else if (!['fresher', 'experienced'].includes(formData.salesExperience)) {
      newErrors.salesExperience = 'Invalid sales experience selection';
    }

    // Educational Qualification Validation - Letters, numbers, spaces, common punctuation (5-200 chars)
    const educationRegex = /^[a-zA-Z0-9\s.,'\-()&]+$/;
    if (!formData.educationalQualification.trim()) {
      newErrors.educationalQualification = 'Educational qualification is required';
    } else if (formData.educationalQualification.trim().length < 5) {
      newErrors.educationalQualification = 'Educational qualification must be at least 3 characters';
    } else if (formData.educationalQualification.trim().length > 200) {
      newErrors.educationalQualification = 'Educational qualification must not exceed 200 characters';
    } else if (!educationRegex.test(formData.educationalQualification.trim())) {
      newErrors.educationalQualification = 'Educational qualification contains invalid characters';
    }

    // About You Validation - Optional field (0-1000 chars)
    const aboutYouRegex = /^[a-zA-Z0-9\s.,!?'\-()&@#$%:;"\n]+$/;
    if (formData.aboutYou.trim()) {
      // Only validate if user entered something
      if (formData.aboutYou.trim().length > 1000) {
        newErrors.aboutYou = 'Description must not exceed 1000 characters';
      } else if (!aboutYouRegex.test(formData.aboutYou.trim())) {
        newErrors.aboutYou = 'Description contains invalid characters';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Get the Google Apps Script URL from environment variable
      const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

      if (!scriptUrl) {
        throw new Error('Google Script URL not configured. Please add VITE_GOOGLE_SCRIPT_URL to your .env file');
      }

      console.log('Submitting to:', scriptUrl);
      console.log('Form data:', formData);

      // Create form data for Google Apps Script
      const formDataToSend = new FormData();
      formDataToSend.append('data', JSON.stringify(formData));

      // Send data to Google Sheets via Apps Script using no-cors mode
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formDataToSend,
      });

      // With no-cors, we can't read the response, but if no error is thrown, it worked
      console.log('Form submitted successfully');

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '+1',
        phoneNumber: '',
        salesExperience: '',
        educationalQualification: '',
        aboutYou: '',
      });

      // Show success toast
      toast.success('Form submitted successfully! Redirecting to Telegram group...', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Redirect to Telegram group after a short delay
      setTimeout(() => {
        window.location.href = 'https://t.me/HustlifySalesSchool';
      }, 2000);

    } catch (error) {
      console.error('Error submitting form:', error);

      // Show error toast
      toast.error('There was an error submitting your form. Please try again.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-4 sm:py-8 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 to-purple-600 px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              Application Form
            </h2>
            <p className="text-blue-100 text-sm sm:text-base md:text-lg">
              Fill out the form below to apply
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 space-y-5 sm:space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  maxLength={50}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.firstName
                    ? 'border-red-500 focus:ring-red-500'
                    : formData.firstName.trim() && formData.firstName.length >= 2
                      ? 'border-green-500 focus:ring-green-500'
                      : 'border-gray-300 focus:ring-blue-500'
                    } focus:ring-2 focus:border-transparent transition duration-200 outline-none`}
                  placeholder="John"
                  autoComplete="given-name"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  maxLength={50}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.lastName
                    ? 'border-red-500 focus:ring-red-500'
                    : formData.lastName.trim() && formData.lastName.length >= 2
                      ? 'border-green-500 focus:ring-green-500'
                      : 'border-gray-300 focus:ring-blue-500'
                    } focus:ring-2 focus:border-transparent transition duration-200 outline-none`}
                  placeholder="Doe"
                  autoComplete="family-name"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                maxLength={254}
                className={`w-full px-4 py-3 rounded-lg border ${errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : formData.email.includes('@') && formData.email.includes('.')
                    ? 'border-green-500 focus:ring-green-500'
                    : 'border-gray-300 focus:ring-blue-500'
                  } focus:ring-2 focus:border-transparent transition duration-200 outline-none`}
                placeholder="john.doe@example.com"
                autoComplete="email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Phone Number with Country Code */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="w-full sm:w-auto px-3 sm:px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none bg-white text-sm sm:text-base"
                >
                  {countryCodes.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.code} ({item.country})
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  maxLength={15}
                  className={`w-full sm:flex-1 px-3 sm:px-4 py-3 rounded-lg border ${errors.phoneNumber
                    ? 'border-red-500 focus:ring-red-500'
                    : formData.phoneNumber.replace(/[\s\-()]/g, '').length >= 10
                      ? 'border-green-500 focus:ring-green-500'
                      : 'border-gray-300 focus:ring-blue-500'
                    } focus:ring-2 focus:border-transparent transition duration-200 outline-none text-sm sm:text-base`}
                  placeholder="1234567890"
                  autoComplete="tel"
                />
              </div>
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Sales Experience */}
            <div>
              <label htmlFor="salesExperience" className="block text-sm font-semibold text-gray-700 mb-2">
                Sales Experience <span className="text-red-500">*</span>
              </label>
              <select
                id="salesExperience"
                name="salesExperience"
                value={formData.salesExperience}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${errors.salesExperience ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none bg-white`}
              >
                <option value="">Select your experience level</option>
                <option value="fresher">Fresher</option>
                <option value="experienced">Experienced</option>
              </select>
              {errors.salesExperience && (
                <p className="mt-1 text-sm text-red-500">{errors.salesExperience}</p>
              )}
            </div>

            {/* Educational Qualification */}
            <div>
              <label htmlFor="educationalQualification" className="block text-sm font-semibold text-gray-700 mb-2">
                Educational Qualification <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="educationalQualification"
                name="educationalQualification"
                value={formData.educationalQualification}
                onChange={handleChange}
                maxLength={200}
                className={`w-full px-4 py-3 rounded-lg border ${errors.educationalQualification
                  ? 'border-red-500 focus:ring-red-500'
                  : formData.educationalQualification.trim().length >= 3
                    ? 'border-green-500 focus:ring-green-500'
                    : 'border-gray-300 focus:ring-blue-500'
                  } focus:ring-2 focus:border-transparent transition duration-200 outline-none`}
                placeholder="e.g., Bachelor's in Business Administration"
                autoComplete="off"
              />
              {errors.educationalQualification && (
                <p className="mt-1 text-sm text-red-500">{errors.educationalQualification}</p>
              )}
            </div>

            {/* Tell Us About You */}
            <div>
              <label htmlFor="aboutYou" className="block text-sm font-semibold text-gray-700 mb-2">
                Tell Us About You <span className="text-gray-400 text-xs font-normal">(Optional)</span>
              </label>
              <textarea
                id="aboutYou"
                name="aboutYou"
                value={formData.aboutYou}
                onChange={handleChange}
                rows={5}
                maxLength={1000}
                className={`w-full px-4 py-3 rounded-lg border ${errors.aboutYou
                  ? 'border-red-500 focus:ring-red-500'
                  : formData.aboutYou.trim().length >= 20
                    ? 'border-green-500 focus:ring-green-500'
                    : 'border-gray-300 focus:ring-blue-500'
                  } focus:ring-2 focus:border-transparent transition duration-200 outline-none resize-none`}
                placeholder="Tell us about your background, skills, and why you'd be a great fit for our team..."
              />
              <div className="flex justify-between items-center mt-1">
                {errors.aboutYou ? (
                  <p className="text-sm text-red-500">{errors.aboutYou}</p>
                ) : (
                  <p className="text-sm text-gray-500">Optional - Maximum 1000 characters</p>
                )}
                <p className={`text-sm ${formData.aboutYou.length > 1000 ? 'text-red-500' : 'text-gray-500'}`}>
                  {formData.aboutYou.length}/1000
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg text-white font-semibold text-lg shadow-lg transition duration-300 transform ${isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:-translate-y-0.5'
                  }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <p className="text-center text-white/80 mt-8 text-sm bg-black/20 backdrop-blur-sm rounded-lg py-3 px-4">
          All fields marked with <span className="text-red-400">*</span> are required
        </p>
      </div>
    </div>
  );
}

export default Form;