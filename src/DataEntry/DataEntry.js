
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import NavBar from '../Navbar/Navbar';
import './DataEntry.css'; // Import custom CSS
import Footer from "../Footer/Footer";

const DataEntry = () => {
    const [entries, setEntries] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newEntries = [...entries];
        newEntries[index] = { ...newEntries[index], [name]: value };
        setEntries(newEntries);
    };

    const handleAddEntry = () => {
        setEntries([...entries, {
            organizationName: '',
            projectType: '',
            timeIntervals: '',
            clientName: '',
            projectDescription: '',
            startDate: '',
            endDate: '',
            status: '',
            assignedTo: '',
            budget: ''
        }]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Retrieve existing data
        const existingData = JSON.parse(localStorage.getItem('dataEntryData')) || [];
        // Save new data
        localStorage.setItem('dataEntryData', JSON.stringify([...existingData, ...entries]));
        // Clear form and show success message
        setEntries([]);
        setSuccessMessage('Your response is submitted');
        // Clear success message after 5 seconds
        setTimeout(() => {
            setSuccessMessage('');
        }, 5000);
    };

    const handleDownloadExcel = () => {
        const ws = XLSX.utils.json_to_sheet(entries);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Projects');
        XLSX.writeFile(wb, 'data.xlsx');
    };

    return (
        <div className='data-entry-page'>
            <NavBar />
            <div className="container mt-5">
                <h1 className="page-title">Data Entry</h1>
                <form onSubmit={handleSubmit}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Organization Name</th>
                                <th>Project Type</th>
                                <th>Time Intervals</th>
                                <th>Client Name</th>
                                <th>Project Description</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th>Assigned To</th>
                                <th>Budget</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map((entry, index) => (
                                <tr key={index}>
                                    <td data-label="Organization Name">
                                        <input
                                            type="text"
                                            name="organizationName"
                                            value={entry.organizationName}
                                            onChange={(e) => handleInputChange(index, e)}
                                            placeholder="Enter organization name"
                                            className="form-control"
                                        />
                                    </td>
                                    <td data-label="Project Type">
                                        <input
                                            type="text"
                                            name="projectType"
                                            value={entry.projectType}
                                            onChange={(e) => handleInputChange(index, e)}
                                            placeholder="Enter project type"
                                            className="form-control"
                                        />
                                    </td>
                                    <td data-label="Time Intervals">
                                        <input
                                            type="text"
                                            name="timeIntervals"
                                            value={entry.timeIntervals}
                                            onChange={(e) => handleInputChange(index, e)}
                                            placeholder="Enter time intervals"
                                            className="form-control"
                                        />
                                    </td>
                                    <td data-label="Client Name">
                                        <input
                                            type="text"
                                            name="clientName"
                                            value={entry.clientName}
                                            onChange={(e) => handleInputChange(index, e)}
                                            placeholder="Enter client name"
                                            className="form-control"
                                        />
                                    </td>
                                    <td data-label="Project Description">
                                        <input
                                            type="text"
                                            name="projectDescription"
                                            value={entry.projectDescription}
                                            onChange={(e) => handleInputChange(index, e)}
                                            placeholder="Enter project description"
                                            className="form-control"
                                        />
                                    </td>
                                    <td data-label="Start Date">
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={entry.startDate}
                                            onChange={(e) => handleInputChange(index, e)}
                                            placeholder="Select start date"
                                            className="form-control"
                                        />
                                    </td>
                                    <td data-label="End Date">
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={entry.endDate}
                                            onChange={(e) => handleInputChange(index, e)}
                                            placeholder="Select end date"
                                            className="form-control"
                                        />
                                    </td>
                                    <td data-label="Status">
                                        <select
                                            name="status"
                                            value={entry.status}
                                            onChange={(e) => handleInputChange(index, e)}
                                            className="form-control"
                                        >
                                            <option value="">Select status</option>
                                            <option value="Not Started">Not Started</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </td>
                                    <td data-label="Assigned To">
                                        <input
                                            type="text"
                                            name="assignedTo"
                                            value={entry.assignedTo}
                                            onChange={(e) => handleInputChange(index, e)}
                                            placeholder="Enter team member"
                                            className="form-control"
                                        />
                                    </td>
                                    <td data-label="Budget">
                                        <input
                                            type="number"
                                            name="budget"
                                            value={entry.budget}
                                            onChange={(e) => handleInputChange(index, e)}
                                            placeholder="Enter budget"
                                            className="form-control"
                                        />
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => setEntries(entries.filter((_, i) => i !== index))}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="button-group">
                        <button type="button" className="btn btn-primary" onClick={handleAddEntry}>
                            Add Row
                        </button>
                        <button type="submit" className="btn btn-success ml-2">
                           Submit
                        </button>
                        <button type="button" className="btn btn-info ml-2" onClick={handleDownloadExcel}>
                            Download as Excel
                        </button>
                    </div>
                </form>
                {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
            </div>
            <Footer />
        </div>
    );
};

export default DataEntry;
