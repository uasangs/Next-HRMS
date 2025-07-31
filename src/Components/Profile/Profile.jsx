import React, { useEffect, useState } from "react";
import api from "../../api";
const Profile = () => {
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const employeeId = localStorage.getItem("employee_id");

    useEffect(() => {
        const fetchEmployee = async () => {
            if (!employeeId) {
                setError("Employee ID not found. Please log in.");
                setLoading(false);
                return;
            }

            try {
                const response = await api.post(
                    "/api/method/fbts.api.flamingoApi.get_employees",
                    { name: employeeId }
                );


                const data = response.data.message;

                if (Array.isArray(data) && data.length > 0) {
                    setEmployee(data[0]);
                } else {
                    setError("Employee record not found");
                }
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load profile");
                console.error("Profile fetch error:", err.response?.data || err.message || err);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [employeeId]);

    if (loading) return <div className="p-8 text-center">Loading profile...</div>;
    if (error) return <div className="p-8 text-red-500 text-center">{error}</div>;

    const details = [
        { label: "Employee ID", value: employee.name },
        { label: "Company", value: employee.company },
        { label: "Date of Birth", value: employee.date_of_birth },
        { label: "Gender", value: employee.gender },
    ];

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-pink-400 p-6 text-white">
                    <h1 className="text-2xl font-bold">Employee Profile</h1>
                    <p className="opacity-90">{employee.name}</p>
                </div>

                <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0">
                            {employee.image ? (
                                <img
                                    src={employee.image}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-500">No Image</span>
                                </div>
                            )}
                        </div>

                        <div className="flex-grow">
                            <h2 className="text-xl font-semibold">{employee.employee_name}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                {details.map(({ label, value }) => (
                                    <DetailItem key={label} label={label} value={value} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ label, value }) => (
    <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value || "-"}</p>
    </div>
);

export default Profile;