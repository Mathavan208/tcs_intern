import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const Form = () => {
  const [formData, setFormData] = useState({
    bookName: '',
    author: '',
    authorEmail: '',
    publisher: '',
    description: '',
    price: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};
    if (formData.bookName.length < 5) errs.bookName = 'Minimum 5 characters required';
    if (!/^[a-zA-Z ]{5,}$/.test(formData.author)) errs.author = 'Minimum 5 alphabets required';
    if (!/^[\w-\.]+@[\w-\.]+\.[a-z]{2,4}$/.test(formData.authorEmail)) errs.authorEmail = 'Invalid email format';
    if (!/^[a-zA-Z ]{5,}$/.test(formData.publisher)) errs.publisher = 'Minimum 5 alphabets required';
    if (formData.description.length < 20) errs.description = 'Minimum 20 characters required';
    if (!/^[0-9]*\.?[0-9]+$/.test(formData.price) || parseFloat(formData.price) <= 0) errs.price = 'Price must be greater than 0';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className="container bg-dark text-light min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 p-4">
        <div className="col-12 col-md-6 mx-auto">
          <h2 className="mb-4 text-center text-primary">Book Details Form</h2>
          <form onSubmit={handleSubmit} className="bg-secondary p-4 rounded">
            {['bookName', 'author', 'authorEmail', 'publisher', 'description', 'price'].map((field, idx) => (
              <div className="mb-3" key={idx}>
                <label className="form-label text-light">
                  {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </label>
                <input
                  type={field === 'price' ? 'number' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
                />
                {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
              </div>
            ))}
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
