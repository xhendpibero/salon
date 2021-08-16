export const deaultPayload = {
    allSchedule: {
        "booking_date": "2021-01-01",
        "booking_time": "00:00:00"
    },
    availSchedule: {
        "booking_date": "2021-01-01",
        "booking_time": "00:00:00"
    },
    orderDetailDel: {
        "order_id": "ORD01",
        "service_id": "S002"
    },
    orderDetailCreate: {
        "order_id": "ORD01",
        "service_id": "S002",
        "service_name": "Kramas",
        "price": "20000"
    },
    orderComplete: {
        "order_id": "ORD01"
    },
    orderConfirm: {
        "order_id": "ORD02"
    },
    orderDel: {
        "order_id": "s102"
    },
    orderUpdate: {
        "order_id": "ORD02",
        "customer_id": "CUST001",
        "employee_id": "EMP001",
        "schedule_id": "3",
        "booking_date": "2021-01-01",
        "booking_time": "07:00:00",
        "is_down_payment": true,
        "customer_account_name": "Muhammad Faishal",
        "customer_account_number": "3291910211",
        "customer_payment_nominal": "10000",
        "transfer_evidence": "gambar",
        "status": "on-progress",
        "detail_order": [{
            "service_id": "S001",
            "service_name": "Cukur Rambut",
            "price": "20000"
        }, {
            "service_id": "S002",
            "service_name": "Kramas",
            "price": "20000"
        }],
        "created_by": "user1"
    },
    orderCreate: {
        "customer_id": "CUST001",
        "employee_id": "EMP001",
        "booking_date": "2021-01-01",
        "booking_time": "07:00:00",
        "is_down_payment": true,
        "customer_account_name": "Muhammad Faishal",
        "customer_account_number": "3291910211",
        "customer_payment_nominal": "10000",
        "transfer_evidence": "gambar",
        "detail_order": [{
            "service_id": "S001",
            "service_name": "Cukur Rambut",
            "price": "20000"
        }],
        "created_by": "user1"
    },
    employeeDel: {
        "employee_id": "EMP001"
    },
    employeeUpdate: {
        "employee_id": "EMP001",
        "username": "employee1",
        "fullname": "Faishal Rio",
        "phone_number": "08172312312",
        "address": "Di Rumah",
        "updated_by": "employee1"
    },
    employeeCreate: {
        "employee_id": "EMP001",
        "username": "employee1",
        "fullname": "Faishal",
        "phone_number": "089122617231",
        "address": "Di Rumah",
        "created_by": "employee1"
    },
    customerDel: {
        "customer_id": "CUST001"
    },
    customerUpdate: {
        "customer_id": "CUST001",
        "username": "user1",
        "fullname": "Muhammad Faishal Reza",
        "phone_number": "08888888",
        "email": "user1@celine.shop",
        "id_number": "123123123123",
        "gender": "M",
        "address": "Di Rumah",
        "updated_by": "user1"
    },
    customerCreate: {
        "username": "user1",
        "fullname": "Muhammad Faishal",
        "phone_number": "087122123123",
        "email": "user1@celine.shop",
        "id_number": "123123123123",
        "gender": "M",
        "address": "Di Rumah",
        "created_by": "user1"
    },
    serviceDel: {
        "service_id": "s102"
    },
    serviceUpdate: {
        "service_id": "s103",
        "service_name": "tes123",
        "thumbnail": "asd",
        "description": "asd",
        "price": 10000,
        "is_show": true,
        "updated_by": "dev"
    },
    serviceHide: {
        "service_id": "JzKPFOl_Rs",
        "updated_by": "admin"
    },
    serviceCreate: {
        "service_name": "Cukur Ramb11t1",
        "thumbnail": "-",
        "description": "Cukur Ramb1ut Model A",
        "price": 20000,
        "is_show": true,
        "created_by": "admin"
    },
}