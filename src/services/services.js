const baseUri = "http://localhost:5000/api";

// User
export const login = "/login";
export const register = "/register";
export const me = "/me";
export const logout = "/logout";
export const userUpdate = "/users/update";

// Service
export const service = "/services";
export const serviceById = (uri) => "/service/" + uri;
export const serviceHide = "/service/hide";
export const serviceCreate = "/services";
export const serviceUpdate = "/services";
export const serviceDel = "/services";

// Customer
export const customer = "/customers";
export const customerById = (uri) => "/customers/" + uri;
export const customerCreate = "/customers";
export const customerUpdate = "/customers";
export const customerDel = "/customers";

// Employee
export const employee = "/employees";
export const employeeById = (uri) => "/employees/" + uri;
export const employeeCreate = "/employees";
export const employeeUpdate = "/employees";
export const employeeDel = "/employees";

// Order
export const order = "/orders ";
export const orderByCustomer = (uri) => "/customers/" + uri + "/orders";
export const orderById = (uri) => "/orders/" + uri;
export const orderCreate = "/orders";
export const orderUpdate = "/orders";
export const orderDel = "/orders";
export const orderOrder = "/orders/confirm";
export const orderComplete = "/orders/complete";

// Order Detail
export const orderDetail = (uri) => "/orders/" + uri + "/details";
export const orderDetailCreate = "/orders/details";
export const orderDetailDel = "/orders/details";

// Scedule
export const availSchedule = "/schedules/available";
export const schedules = "/schedules";

// Report
export const orderReport = "/report"; //?type=weekly
