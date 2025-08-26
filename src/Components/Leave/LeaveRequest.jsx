import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import "./LeaveRequest.css";
import Header from "../Header/Header";
import { createLeaveApplication } from "../Home/dashboardApi"; // Import your API function
import api from "../Home/api"; // Import your axios instance

const LeaveRequest = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {
      leaves: [
        {
          fromDate: "",
          toDate: "",
          leaveType: "",
          noOfDays: "",
          reason: "",
        },
      ],
    },
  });

  // Field array for dynamic forms
  const { fields, append, remove } = useFieldArray({
    control,
    name: "leaves",
  });

  // Watch for date changes to auto-calculate days
  const watchedLeaves = watch("leaves");

  // Load leave types on component mount
  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const res = await api.get('/api/resource/Leave Type?fields=["name"]');
        console.log("Leave types response:", res.data); // Debug log
        setLeaveTypes(res.data.data || []);
      } catch (err) {
        console.error("Error loading leave types:", err);
        // Fallback data for testing
        setLeaveTypes([
          { name: "Annual Leave" },
          { name: "Sick Leave" },
          { name: "Personal Leave" },
          { name: "Emergency Leave" }
        ]);
      }
    };

    fetchLeaveTypes();
  }, []);

  // Auto-calculate number of days when dates change
  useEffect(() => {
    watchedLeaves.forEach((leave, index) => {
      if (leave?.fromDate && leave?.toDate) {
        const from = new Date(leave.fromDate);
        const to = new Date(leave.toDate);
        
        if (to >= from && !isNaN(from.getTime()) && !isNaN(to.getTime())) {
          const diffTime = to.getTime() - from.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
          console.log(`Setting days for index ${index}:`, diffDays); // Debug log
          setValue(`leaves.${index}.noOfDays`, diffDays);
        } else {
          setValue(`leaves.${index}.noOfDays`, "");
        }
      } else {
        setValue(`leaves.${index}.noOfDays`, "");
      }
    });
  }, [watchedLeaves, setValue]);

  // Form submission handler
  const onSubmit = async (data) => {
    const employeeId = localStorage.getItem("employee_id");

    if (!employeeId) {
      alert("❌ Employee ID not found in localStorage.");
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionPromises = data.leaves.map(async (leave) => {
        if (!leave.fromDate || !leave.toDate || !leave.leaveType || !leave.reason) {
          throw new Error("All fields are required for each leave request");
        }

        const payload = {
          employee: employeeId,
          leave_type: leave.leaveType,
          from_date: leave.fromDate,
          to_date: leave.toDate,
          description: leave.reason,
        };

        return await createLeaveApplication(payload);
      });

      const results = await Promise.all(submissionPromises);
      
      // Check if all submissions were successful
      const successfulSubmissions = results.filter(result => result?.name);
      
      if (successfulSubmissions.length === data.leaves.length) {
        alert(`✅ All ${successfulSubmissions.length} leave request(s) submitted successfully!`);
        handleCancel(); // Reset form after successful submission
      } else {
        alert(`⚠️ Some leave requests may not have been submitted properly. Please check your requests.`);
      }

    } catch (err) {
      console.error("❌ Leave submission failed:", err);
      alert(`❌ Failed to submit leave request: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add new leave form
  const handleAddLeaveForm = () => {
    append({
      fromDate: "",
      toDate: "",
      leaveType: "",
      noOfDays: "",
      reason: "",
    });
  };

  // Reset form
  const handleCancel = () => {
    reset({
      leaves: [
        {
          fromDate: "",
          toDate: "",
          leaveType: "",
          noOfDays: "",
          reason: "",
        },
      ],
    });
  };

  // Remove specific leave form (if more than one)
  const handleRemoveLeave = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <>
      <Header />
      <div className="Leave-request-container">
        <form onSubmit={handleSubmit(onSubmit)} className="Leave-request-form">
          {fields.map((field, index) => (
            <div key={field.id}>
              {/* Row 1 */}
              <div className="Leave-request-row-one-line">
                <div>
                  <label>From Date</label>
                  <input
                    type="date"
                    {...register(`leaves.${index}.fromDate`, {
                      required: "From date is required",
                    })}
                  />
                  {errors.leaves?.[index]?.fromDate && (
                    <span className="error-message">
                      {errors.leaves[index].fromDate.message}
                    </span>
                  )}
                </div>

                <div>
                  <label>To Date</label>
                  <input
                    type="date"
                    {...register(`leaves.${index}.toDate`, {
                      required: "To date is required",
                      validate: (value) => {
                        const fromDate = watchedLeaves[index]?.fromDate;
                        if (fromDate && value && new Date(value) < new Date(fromDate)) {
                          return "To date cannot be before from date";
                        }
                        return true;
                      },
                    })}
                  />
                  {errors.leaves?.[index]?.toDate && (
                    <span className="error-message">
                      {errors.leaves[index].toDate.message}
                    </span>
                  )}
                </div>

                <div>
                  <label>Leave Type</label>
                  <select
                    {...register(`leaves.${index}.leaveType`, {
                      required: "Leave type is required",
                    })}
                  >
                    <option value="">-- Select Leave Type --</option>
                    {leaveTypes && leaveTypes.length > 0 ? (
                      leaveTypes.map((lt) => (
                        <option key={lt.name} value={lt.name}>
                          {lt.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>Loading leave types...</option>
                    )}
                  </select>
                  {errors.leaves?.[index]?.leaveType && (
                    <span className="error-message">
                      {errors.leaves[index].leaveType.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Row 2 */}
              <div className="Leave-request-row">
                <div>
                  <label>No of Days</label>
                  <input
                    type="text"
                    value={watchedLeaves[index]?.noOfDays || ""}
                    readOnly
                    placeholder="Auto-calculated"
                  />
                </div>
                <div>
                  <label>Reason</label>
                  <input
                    type="text"
                    placeholder="Enter reason for leave"
                    {...register(`leaves.${index}.reason`, {
                      required: "Reason is required",
                      minLength: {
                        value: 10,
                        message: "Reason must be at least 10 characters",
                      },
                    })}
                  />
                  {errors.leaves?.[index]?.reason && (
                    <span className="error-message">
                      {errors.leaves[index].reason.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Remove button for individual leave forms (if more than one) */}
              {fields.length > 1 && (
                <div className="remove-leave-container">
                  <button
                    type="button"
                    onClick={() => handleRemoveLeave(index)}
                    className="remove-leave-btn"
                  >
                    Remove This Leave
                  </button>
                </div>
              )}

              {index !== fields.length - 1 && <hr />}
            </div>
          ))}

          <div className="Leave-request-actions">
            <button
              type="button"
              onClick={handleAddLeaveForm}
              className="Leave-request-add-btn"
              disabled={isSubmitting}
            >
              Add Leaves <span className="Leave-request-plus">+</span>
            </button>

            <div className="Leave-request-btns">
              <button
                type="button"
                onClick={handleCancel}
                className="Leave-request-cancel"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="Leave-request-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LeaveRequest;