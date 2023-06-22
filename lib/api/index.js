import axios, { AxiosRequestConfig } from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});
API.interceptors.request.use((req) => {
  if (typeof localStorage !== "undefined" && localStorage?.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  return req;
});

const DUTYPEDIA_API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DUTYPEDIA_API_URL,
  withCredentials: true,
});
DUTYPEDIA_API.interceptors.request.use((req) => {
  if (typeof localStorage !== "undefined" && localStorage?.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  return req;
});

//Authorization
export const signIn = (formData) => API.post("/auth/login", formData);
export const addNewAdmin = (formData) =>
  API.post("/auth/add-new-admin", formData);
export const updateAdmin = (formData) =>
  API.post("/auth/update-admin", formData);
export const deleteAdmin = (id) => API.delete(`/auth/delete-admin/${id}`);
export const resetPasswordRequest = (email) =>
  API.post("/auth/reset-password-request", email);
export const resetPassword = (formData) =>
  API.post("/auth/reset-password", formData);
export const verify = (token) => API.get(`/auth/verify/${token}`);
export const getAllAdmins = (limit = 50, skip = 0, searchTerm = null) =>
  API.get(
    `/auth/get-all-admins?limit=${limit}&skip=${skip}&searchTerm=${searchTerm}`
  );
export const getAllVendors = (limit = 50, skip = 0, searchTerm = null) =>
  DUTYPEDIA_API.get(
    `/admin/auth/get-all-vendors?limit=${limit}&skip=${skip}&searchTerm=${searchTerm}`
  );
export const getAllCustomers = (limit = 50, skip = 0, searchTerm = null) =>
  DUTYPEDIA_API.get(
    `/admin/auth/get-all-customers?limit=${limit}&skip=${skip}&searchTerm=${searchTerm}`
  );
export const getVendorById = (id) =>
  DUTYPEDIA_API.get(`/admin/auth/get-vendor-by-id/${id}`);
export const getCustomerById = (id) =>
  DUTYPEDIA_API.get(`/admin/auth/get-customer-by-id/${id}`);
export const getVendorAccount = (serviceId) =>
  DUTYPEDIA_API.get(`/admin/auth/get-vendor-account/${serviceId}`);
export const getCustomerAccount = (customerId) =>
  DUTYPEDIA_API.get(`/admin/auth/get-customer-account/${customerId}`);
export const bannedService = (formData) =>
  DUTYPEDIA_API.post(`/admin/auth/banned-service`, formData);
export const unbannedService = (formData) =>
  DUTYPEDIA_API.post(`/admin/auth/unbanned-service`, formData);
export const bannedOrder = (formData) =>
  DUTYPEDIA_API.post(`/admin/auth/banned-order`, formData);
export const unbannedOrder = (formData) =>
  DUTYPEDIA_API.post(`/admin/auth/unbanned-order`, formData);
export const sendMessageFromDutySupport = (formData) =>
  DUTYPEDIA_API.post(`/admin/auth/send-message-from-support`, formData);
export const sendSupportMessageFromDutySupport = (formData) =>
  DUTYPEDIA_API.post(`/admin/auth/send-support-message-from-support`, formData);
export const getConversationBetweenVendorAndCustomer = (
  vendorId,
  customerId,
  limit = 50,
  skip = 0
) =>
  DUTYPEDIA_API.get(
    `/admin/auth/get-conversation?vendorId=${vendorId}&customerId=${customerId}&limit=${limit}&skip=${skip}`
  );

//Orders
export const getAllOrders = (
  limit = 50,
  skip = 0,
  gte = null,
  searchTerm = null,
  type = null,
  status = null
) =>
  DUTYPEDIA_API.get(
    `/admin/orders/get-all?limit=${limit}&skip=${skip}&gte=${gte}&searchTerm=${searchTerm}&type=${type}&status=${status}`
  );
export const getOrderById = (orderId) =>
  DUTYPEDIA_API.get(`/admin/orders/get-by-id/${orderId}`);
export const refundOrder = (formData) =>
  DUTYPEDIA_API.post(`/admin/orders/refund`, formData);

//Services
export const getAllVerifications = (limit = 50, skip = 0, searchTerm = "") =>
  DUTYPEDIA_API.get(
    `/admin/services/get-all-verifications?limit=${limit}&skip=${skip}&searchTerm=${searchTerm}`
  );
export const getStartingGigs = (limit = 50, skip = 0, q = "") =>
  DUTYPEDIA_API.get(
    `/admin/services/get-starting-gigs?limit=${limit}&skip=${skip}&q=${q}`
  );
export const getFixedGigs = (limit = 50, skip = 0, q = "") =>
  DUTYPEDIA_API.get(
    `/admin/services/get-fixed-gigs?limit=${limit}&skip=${skip}&q=${q}`
  );
export const getPackageGigs = (limit = 50, skip = 0, q = "") =>
  DUTYPEDIA_API.get(
    `/admin/services/get-package-gigs?limit=${limit}&skip=${skip}&q=${q}`
  );
export const getVerificationById = (verificationId) =>
  DUTYPEDIA_API.get(`/admin/services/get-verification-by-id/${verificationId}`);
export const acceptVerification = (formData) =>
  DUTYPEDIA_API.post(`/admin/services/accept-verification`, formData);
export const rejectVerification = (formData) =>
  DUTYPEDIA_API.post(`/admin/services/reject-verification`, formData);
export const togglePopular = (gigId) =>
  DUTYPEDIA_API.post(`/admin/services/toggle/popular/${gigId}`);
export const toggleTop = (gigId) =>
  DUTYPEDIA_API.post(`/admin/services/toggle/top/${gigId}`);
export const toggleTrending = (gigId) =>
  DUTYPEDIA_API.post(`/admin/services/toggle/trending/${gigId}`);
export const toggleSuggest = (gigId) =>
  DUTYPEDIA_API.post(`/admin/services/toggle/suggest/${gigId}`);
export const getDutyFee = () => DUTYPEDIA_API.get(`/services/get-duty-fee`);

//Support
export const getAllSupportMessages = (
  limit = 50,
  skip = 0,
  searchTerm = null
) =>
  DUTYPEDIA_API.get(
    `/admin/support/get-all?limit=${limit}&skip=${skip}&searchTerm=${searchTerm}`
  );
export const getAllContactMessages = (
  limit = 50,
  skip = 0,
  searchTerm = null
) =>
  DUTYPEDIA_API.get(
    `/admin/support/contact/get-all?limit=${limit}&skip=${skip}&searchTerm=${searchTerm}`
  );
export const getSupportById = (supportId) =>
  DUTYPEDIA_API.get(`/admin/support/get-by-id/${supportId}`);
export const getContactById = (contactId) =>
  DUTYPEDIA_API.get(`/admin/support/contact/get-by-id/${contactId}`);

export const getAllUsersWithSupport = (limit = 50, skip = 0, q = "") =>
  DUTYPEDIA_API.get(
    `/admin/support/get-all-users?limit=${limit}&skip=${skip}&q=${q}`
  );
export const getSupportsByUserId = (userId, limit = 50, skip = 0, q = "") =>
  DUTYPEDIA_API.get(
    `/admin/support/get-by-user/${userId}?limit=${limit}&skip=${skip}&q=${q}`
  );

//Report
export const getAllReports = (limit = 50, skip = 0, q = "") =>
  DUTYPEDIA_API.get(`/admin/report/get-all?limit=${limit}&skip=${skip}&q=${q}`);
export const solvedReport = (reportId) =>
  DUTYPEDIA_API.post(`/admin/report/solved/${reportId}`);

//Withdraw
export const getAllPendingWithdrawRequest = (limit = 50, skip = 0, q = "") =>
  DUTYPEDIA_API.get(
    `/admin/withdraw/get-pending?limit=${limit}&skip=${skip}&q=${q}`
  );
export const getAllCompletedWithdrawRequest = (limit = 50, skip = 0, q = "") =>
  DUTYPEDIA_API.get(
    `/admin/withdraw/get-completed?limit=${limit}&skip=${skip}&q=${q}`
  );
export const getAllCancelledWithdrawRequest = (limit = 50, skip = 0, q = "") =>
  DUTYPEDIA_API.get(
    `/admin/withdraw/get-cancelled?limit=${limit}&skip=${skip}&q=${q}`
  );
export const completeWithdraw = (id) =>
  DUTYPEDIA_API.post(`/admin/withdraw/complete/${id}`);
export const cancelWithdraw = (id) =>
  DUTYPEDIA_API.post(`/admin/withdraw/cancel/${id}`);
