const globalAPI = {
    register:"api/v1/auth/register",
    login:"api/v1/auth/login",
    forgotPassword:"api/v1/auth/forgot-password",
    otp:"api/v1/auth/verify-otp",
    changePassword:"api/v1/auth/change-password",
    fileupload:"api/v1/common/uploads/pdf",
    allreq:"api/v1/services/service-requests",
    mystatus:"api/v1/services/service-requests-status",
    myreq:"api/v1/services/service-requests",
    allnotes:"api/v1/services/service-requests-notes",
    getFile:"api/v1/common/uploads/pdf",
    textupdate:"api/v1/services/service-requests-notes-update",
    myjobs:"api/v1/services/jobs",
    documentupdate:"api/v1/services/service-requests-notes-update-attachments",
}

export default globalAPI;