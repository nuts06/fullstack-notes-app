import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import RegisterBackground from "../../assets/images/venusregister.jpg"
import { ToastContainer, toast } from 'react-toastify';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import '../../index.css'
import {Country, State, City} from 'country-state-city'

const PersonalDetails = () => {
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [contact, setContact] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([])
  const [postalCode, setPostalCode] = useState('');
  const navigate = useNavigate();
  const [showGoogleMap, setShowGoogleMap] = useState(false);


  // Fetch countries on mount
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // Update states when country changes
  useEffect(() => {
    if (country) {
      const selectedCountry = countries.find((c) => c.name === country);
      if (selectedCountry) {
        setStates(State.getStatesOfCountry(selectedCountry.isoCode));
        setState(''); // Reset state when country changes
        setCities([]);
        setCity(''); // Reset city when country changes
      }
    } else {
      setStates([]);
      setCities([]);
    }
  }, [country, countries]);

  // Update cities when state changes
  useEffect(() => {
    if (state && country) {
      const selectedCountry = countries.find((c) => c.name === country);
      const selectedState = states.find((s) => s.name === state);
      if (selectedCountry && selectedState) {
        setCities(City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode));
        setCity(''); // Reset city when state changes
      }
    } else {
      setCities([]);
    }
  }, [state, country, countries, states]);

  const handleInputFocus = () => {
    setShowGoogleMap(true)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      alert("running")
      const userId = localStorage.getItem("userId"); // 👈 Get it here

    if (!userId) {
      throw new Error("User ID is missing. Please verify OTP again.");
    }
      const response = await axios.post(
        'http://localhost:3000/api/auth/personal-details', // Adjust if your route is different
        {
          userId,
          name: name,
          password: password,
          repassword: rePassword,
          contact: contact,
          country: country,
          state: state,
          city: city,
          postalcode: postalCode,
        },
      );
      console.log("response", response.data);
      localStorage.setItem('fullName', name );
  
      toast.success(response.data.message || "Details updated successfully", {
        position: "top-right",
        autoClose: 3000,
      });
      setError('');
      setTimeout(() => navigate("/login"), 3000);
  
      // Optional: redirect or clear fields
      // navigate("/dashboard");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Something went wrong');
      } else {
        setError('Network error. Please try again.');
      }
      toast.error(err.response?.data?.message || "Failed to update details");
    }
  };
  
  return (
    <div className="relative w-full h-screen overflow-y-auto">
      <img 
        className="fixed top-0 left-0 w-full h-full object-cover -z-10" 
        src={RegisterBackground} 
        alt="Background" 
      />

      <div className="flex justify-center items-start h-full px-4 pt-10 pb-20">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-6 rounded-lg backdrop-transparent">
          <h2 className="text-4xl font-semibold mb-6 text-center text-white">Personal Details</h2>

          <label className="block mb-2 text-white">Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name"
            className="w-full text-white p-3 border border-gray-300 rounded mb-4" required />

          {/* <label className="block mb-2 text-white">Last Name</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter your last name"
            className="w-full text-white p-3 border border-gray-300 rounded mb-4" required /> */}

          {/* <label className="block mb-2 text-white">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"
            className="w-full text-white p-3 border border-gray-300 rounded mb-4" required /> */}
          
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <label className="block mb-2 text-white">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password"
            className="w-full text-white p-3 border border-gray-300 rounded mb-4" required />

          <label className="block mb-2 text-white">Re-enter Password</label>
          <input type="password" value={rePassword} onChange={(e) => setRePassword(e.target.value)} placeholder="Re-enter password"
            className="w-full p-3 text-white border border-gray-300 rounded mb-4" required />

          <label className="block mb-2 text-white">Contact No</label>
          <PhoneInput
            country={'in'}
            value={contact}
            onChange={(value) => setContact(value)}
            inputProps={{
              name: 'contact',
              required: true,
            }}
            containerClass="w-full mb-4"
            inputClass="custom-phone-input"
          />

          
            <label className="block mb-2 text-white">Country</label>
      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        // className="w-full p-3 text-white border border-gray-300 rounded mb-4 bg-transparent dropdown-custom "
        className={`w-full p-3 border border-gray-300 rounded mb-4 bg-transparent dropdown-custom ${
          country === '' ? 'text-gray-400' : 'text-white'
        }`}
        required
      >
        <option value="" disabled>
          Select your country
        </option>
        {countries.map((c) => (
          <option key={c.isoCode} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
          
      {/* State Dropdown */}
      <label className="block mb-2 text-white">State</label>
      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        className={`w-full p-3 border border-gray-300 rounded mb-4 bg-transparent dropdown-custom ${
          country === '' ? 'text-gray-400' : 'text-white'
        }`}
        required
        disabled={!country} // Disable if no country selected
      >
        <option value="" disabled>
          Select your state
        </option>
        {states.map((s) => (
          <option key={s.isoCode} value={s.name}>
            {s.name}
          </option>
        ))}
      </select>
            <label className="block mb-2 text-white">City</label>
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className={`w-full p-3 border border-gray-300 rounded mb-4 bg-transparent dropdown-custom ${
          country === '' ? 'text-gray-400' : 'text-white'
        }`}
        required
        disabled={!state} // Disable if no state selected
      >
        <option value="" disabled>
          Select your city
        </option>
        {cities.map((c) => (
          <option key={c.name} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
          <label className="block mb-2 text-white">Postal Code</label>
          <input type="number" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Enter postal code"
            className="w-full text-white p-3 border border-gray-300 rounded mb-4" required />

          <button type="submit" className="w-full bg-orange-600 text-white p-3 rounded hover:bg-orange-700 transition-all">
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default PersonalDetails