// ============================================================
// src/api/appointmentApi.js
// Connects the Appointment form to AWS API Gateway + Lambda
// ============================================================

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "https://YOUR_API_GATEWAY_ID.execute-api.YOUR_REGION.amazonaws.com";

/**
 * Submits an appointment booking to the AWS backend.
 *
 * @param {Object} formData
 * @param {string} formData.itemType
 * @param {string} formData.fullName
 * @param {string} formData.email
 * @param {string} [formData.whatsapp]
 * @param {string} [formData.description]
 * @param {string} [formData.timezone]
 * @param {string} [formData.reachableHours]
 * @returns {Promise<{success: boolean, message: string, appointmentId?: string}>}
 */
export async function submitAppointment(formData) {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            itemType: formData.itemType,
            fullName: formData.fullName,
            email: formData.email,
            whatsapp: formData.whatsapp || "",
            description: formData.description || "",
            timezone: formData.timezone || "",
            reachableHours: formData.reachableHours || "",
        }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    return response.json();
}
