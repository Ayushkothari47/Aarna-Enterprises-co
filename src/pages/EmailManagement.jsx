// EmailManagement.jsx
import React, { useEffect, useState } from "react";
import api from '../api/api';
import { ToastContainer, toast } from 'react-toastify';


const EmailManagement = () => {
    const [activeTab, setActiveTab] = useState("bulk");
    const [emails, setEmails] = useState([]);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [bulkSubject, setBulkSubject] = useState("");
    const [bulkContent, setBulkContent] = useState("");
    const [emailTemplate, setEmailTemplate] = useState(null);

    useEffect(() => {
        fetchEmails();
        fetchEmailTemplate();
    }, []);

    useEffect(() => {
        if (emailTemplate) {
            setBulkSubject(emailTemplate.bulk_email_subject || "");
            setBulkContent(emailTemplate.bulk_email_description || "");
        }
    }, [emailTemplate]);



    const fetchEmails = async () => {
        try {
            const response = await api.get("/email/fetch-emails");
            const data = Array.isArray(response.data.data) ? response.data.data : [];
            setEmails(data);
        } catch (error) {
            toast.error("Error fetching emails:", error)
        }
    };


    const fetchEmailTemplate = async () => {
        try {
            const response = await api.get("/email/get-email-template");
            setEmailTemplate(response.data);
        } catch (error) {
            toast.error("Error fetching template:", error)
        }
    };

    const toggleEmailSelection = (email) => {
        if (selectedEmails.includes(email)) {
            setSelectedEmails(selectedEmails.filter((e) => e !== email));
        } else {
            setSelectedEmails([...selectedEmails, email]);
        }
    };

    const toggleSelectAll = () => {
        if (selectedEmails.length === emails.length) {
            setSelectedEmails([]); // Deselect all
        } else {
            setSelectedEmails([...emails]); // Select all
        }
    };

    const sendBulkEmail = async () => {
        if (!bulkSubject.trim()) {
            toast.error("Subject cannot be empty!")
            return;
        }
        if (!bulkContent.trim()) {
            toast.error("Content cannot be empty!")
            return;
        }
        if (selectedEmails.length === 0) {
            toast.error("Please select at least one email!")
            return;
        }

        try {
            await api.post("/email/send-bulk", {
                toList: selectedEmails,
                subject: bulkSubject,
                htmlContent: bulkContent,
            },{
                headers: {
                'Content-Type': 'application/json'
            }});
          
            toast.success("Bulk Emails sent successfully!")
            setSelectedEmails([]);
            setBulkSubject("");
            setBulkContent("");
        } catch (error) {
            toast.error("Error sending bulk email:", error)
        }
    };

    const updateEmailTemplate = async (updatedTemplate) => {
        for (const key in updatedTemplate) {
            if (typeof updatedTemplate[key] === "string" && !updatedTemplate[key].trim()) {
                toast.error("Template fields cannot be empty!")
                return;
            }
        }

        try {
            await api.put("/email/update-email-template", updatedTemplate);
            toast.success("Template updated successful!")
            fetchEmailTemplate();
        } catch (error) {
            toast.error("Error updating template:", error)
        }
    };

    const toggleAutoStatus = (key) => {
        const updatedTemplate = { ...emailTemplate, [key]: !emailTemplate[key] };
        setEmailTemplate(updatedTemplate);
        updateEmailTemplate(updatedTemplate);
    };

    return (
        <div className="bg-black min-h-screen p-4 sm:p-6 md:p-10 text-yellow-400">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center sm:text-center">
                Email Management
            </h1>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-6 justify-center sm:justify-start">
                <button
                    className={`px-4 py-2 border border-yellow-400 rounded w-full sm:w-auto ${activeTab === "bulk" ? "bg-yellow-400 text-black" : ""}`}
                    onClick={() => setActiveTab("bulk")}
                >
                    Bulk Email
                </button>
                <button
                    className={`px-4 py-2 border border-yellow-400 rounded w-full sm:w-auto ${activeTab === "auto" ? "bg-yellow-400 text-black" : ""}`}
                    onClick={() => setActiveTab("auto")}
                >
                    Auto-Generated Emails
                </button>
            </div>

            {/* Bulk Email Tab */}
            {activeTab === "bulk" && (
                <div className="space-y-6 max-w-4xl mx-auto"> {/* Restrict max width */}
                    <div className="space-y-2 md:space-y-4">
                        <input
                            type="text"
                            placeholder="Subject"
                            className="w-full p-2 md:p-3 border border-yellow-400 bg-black text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            value={bulkSubject || emailTemplate?.bulk_email_subject || ""}
                            onChange={(e) => setBulkSubject(e.target.value)}
                        />

                        <textarea
                            placeholder="Email Content"
                            className="w-full p-2 md:p-3 border border-yellow-400 bg-black text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            rows={5}
                            value={bulkContent || emailTemplate?.bulk_email_description || ""}
                            onChange={(e) => setBulkContent(e.target.value)}
                        />
                    </div>

                    {/* Responsive Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border border-yellow-400 min-w-[300px]">
                            <thead>
                                <tr className="bg-yellow-500 text-black">
                                    <th className="border border-yellow-400 p-2">
                                        <label className="flex items-center justify-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedEmails.length === emails.length && emails.length > 0}
                                                onChange={toggleSelectAll}
                                                className="accent-yellow-400 w-6 h-6"
                                            />
                                            <span>Select All</span>
                                        </label>
                                    </th>
                                    <th className="border border-yellow-400 p-2">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {emails.map((email, idx) => (
                                    <tr key={idx} className="hover:bg-gray-900 transition-colors">
                                        <td className="border border-yellow-400 p-2 text-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedEmails.includes(email)}
                                                onChange={() => toggleEmailSelection(email)}
                                                className="accent-yellow-400 w-6 h-6"
                                            />
                                        </td>
                                        <td className="border border-yellow-400 p-2 break-words">{email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <button
                        className="px-4 py-2 bg-yellow-400 text-black rounded font-semibold hover:bg-yellow-500 transition-colors w-full md:w-auto"
                        onClick={sendBulkEmail}
                    >
                        Send Bulk Email
                    </button>
                </div>
            )}

            {/* Auto-Generated Email Tab */}
            {activeTab === "auto" && emailTemplate && (
                <div className="space-y-6 max-w-4xl mx-auto"> {/* Restrict max width */}
                    {[
                        {
                            title: "Enquiry Submit",
                            subjectKey: "enq_submit_subject",
                            descKey: "enq_submit_desc",
                            statusKey: "enq_submit_auto_status",
                        },
                        {
                            title: "Your Booking is confirmed / rejected",
                            subjectKey: "enq_success_subject",
                            descKey: "enq_success_desc",
                            statusKey: "enq_auto_status",
                        },
                        {
                            title: "Booking Failed",
                            subjectKey: "enq_fail_subject",
                            descKey: "enq_fail_desc",
                            statusKey: "enq_auto_status",
                        },
                    ].map((email, idx) => (
                        <div
                            key={idx}
                            className="p-4 sm:p-6 border border-yellow-400 rounded space-y-2 sm:space-y-3 hover:bg-gray-900 transition-colors"
                        >
                            <h3 className="text-lg sm:text-xl font-semibold text-white">{email.title}</h3>
                            <input
                                type="text"
                                value={emailTemplate[email.subjectKey]}
                                className="w-full p-2 border border-yellow-400 bg-black text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                onChange={(e) =>
                                    setEmailTemplate({
                                        ...emailTemplate,
                                        [email.subjectKey]: e.target.value,
                                    })
                                }
                            />
                            <textarea
                                value={emailTemplate[email.descKey]}
                                rows={4}
                                className="w-full p-2 border border-yellow-400 bg-black text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                onChange={(e) =>
                                    setEmailTemplate({
                                        ...emailTemplate,
                                        [email.descKey]: e.target.value,
                                    })
                                }
                            />
                            <label className="flex items-center space-x-2">
                                <span>Auto Send:</span>
                                <input
                                    type="checkbox"
                                    checked={emailTemplate[email.statusKey]}
                                    className="accent-yellow-400 w-6 h-6"
                                    onChange={() => toggleAutoStatus(email.statusKey)}
                                />
                            </label>
                            <button
                                className="px-4 py-2 bg-yellow-400 text-black rounded font-semibold hover:bg-yellow-500 transition-colors"
                                onClick={() => updateEmailTemplate(emailTemplate)}
                            >
                                Save
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EmailManagement;
