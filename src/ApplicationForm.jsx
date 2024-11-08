import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init('bOYksImxWR_11keLR');

const JobApplicationForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        position: '',
        resume: null,
        aboutYourself: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const positions = [
        "Frontend Engineer",
        "Backend Engineer",
        "Full Stack Engineer",
        "WordPress Developer",
        "Shopify Developer",
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            resume: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const fileInput = e.target.querySelector('input[type="file"]');
        const file = fileInput.files[0];
        const formDataObj = new FormData(e.target);

        try {
            let fileBase64 = '';
            if (file) {
                fileBase64 = await convertFileToBase64(file);
            }

            const templateParams = {
                to_email: 'wasimkhanzabi222@gmail.com',
                from_name: formDataObj.get('fullName'),
                from_email: formDataObj.get('email'),
                phone: formDataObj.get('phone'),
                location: formDataObj.get('location'),
                position: formDataObj.get('position'),
                message: formDataObj.get('aboutYourself'),
                resume_name: file ? file.name : '',
                resume_base64: fileBase64
            };

            const result = await emailjs.send(
                'service_h07b8uf',
                'template_232323',
                templateParams,
                'bOYksImxWR_11keLR'
            );

            if (result.status === 200) {
                alert('Application submitted successfully!');
                e.target.reset();
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    location: '',
                    position: '',
                    resume: null,
                    aboutYourself: ''
                });
            } else {
                throw new Error('Failed to send email');
            }

        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to send application. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    return (
        <div className="min-h-screen bg-black text-gray-300 p-4">
            <h1 className='text-3xl font-bold m-8 text-center text-white font-Avenir'>Work Opportunities</h1>
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-950 rounded-lg p-3 border border-gray-950 focus:border-gray-600 focus:outline-none"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-950 rounded-lg p-3 border border-gray-950 focus:border-gray-600 focus:outline-none"
                        required
                    />

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone No:"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-950 rounded-lg p-3 border border-gray-950 focus:border-gray-600 focus:outline-none"
                        required
                    />

                    <input
                        type="text"
                        name="location"
                        placeholder="City, Country"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full bg-neutral-950 rounded-lg p-3 border border-gray-950 focus:border-gray-600 focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <h3 className="text-white mb-3">Choose a Position:</h3>
                    <div className="flex flex-wrap gap-2">
                        {positions.map((pos) => (
                            <button
                                key={pos}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, position: pos }))}
                                className={`px-4 py-2 rounded-full ${formData.position === pos
                                    ? 'bg-white text-black'
                                    : 'bg-neutral-950 text-white'
                                    } hover:bg-neutral-900 transition-colors`}
                            >
                                {pos}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-white mb-3">Upload Resume</h3>
                    <div className="bg-neutral-950 rounded-lg p-3 border border-gray-950">
                        <input
                            type="file"
                            name="resume"
                            onChange={handleFileChange}
                            className="text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-neutral-900 file:text-white hover:file:bg-neutral-700"
                            accept=".pdf,.doc,.docx"
                            required
                        />
                    </div>
                </div>

                <textarea
                    name="aboutYourself"
                    placeholder="Tell us about yourself"
                    value={formData.aboutYourself}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-950 rounded-lg p-3 border border-gray-950 focus:border-gray-600 focus:outline-none min-h-[200px]"
                    required
                />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-lg font-medium transition-colors ${isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-white text-black hover:bg-gray-100'
                        }`}
                >
                    {isSubmitting ? 'Submitting...' : 'SUBMIT'}
                </button>
            </form>
        </div>
    );
};

export default JobApplicationForm;