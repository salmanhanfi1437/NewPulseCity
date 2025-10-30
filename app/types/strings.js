import { all, orders, payments, updates } from "./constants";

export const NotificationTabs = [
  { key: all, title: all },
  { key: orders, title: orders },
  { key: payments, title: payments },
  { key: updates, title: updates },
];


export const NotificationData = [
  { id: 1, title: "Kit Successfully dispatched", msg: "Your zQR-0071214  has been successfully dispacted and is on the way",isNew:true,dateTime: "30-10-2025 04:30 PM" },
  { id: 2, title: "Payment Recieved", msg: "Your zQR-0071214  has been successfully dispacted and is on the way",isNew:false,dateTime: "29-10-2025 02:30 PM" },
  { id: 3, title: "Payment Recieved", msg: "Payment of 1600 for zQR-0071214 recieved successfully",isNew:false,dateTime: "28-10-2025 01:30 PM" },
  { id: 4, title: "New Feature Added", msg: "New testinomial feature added",isNew:false,dateTime: "27-10-2025 12:30 PM" },
  { id: 5, title: "Delivery Confirmed", msg: "Delivery confirmed for zQR-0071214",isNew:false,dateTime: "26-10-2025 10:30 AM" },
  { id: 6, title: "Refund pProcess", msg: "Refund of Rs 1600 for zQR-0071214  has been proccessed to your registered Bank",isNew:false,dateTime: "25-10-2025 09:30 AM" },
  { id: 7, title: all, msg: "Your zQR-0071214  has been successfully dispacted and is on the way",isNew:false,dateTime: "24-10-2025 09:00 AM" },
  { id: 8, title: all, msg: "Your zQR-0071214  has been successfully dispacted and is on the way",isNew:false,dateTime: "23-10-2025 08:30 AM" },
  { id: 9, title: all, msg: "Your zQR-0071214  has been successfully dispacted and is on the way",isNew:false,dateTime: "22-10-2025 08:00 PM" },
  { id: 10, title: all, msg: "Your zQR-0071214  has been successfully dispacted and is on the way",isNew:false,dateTime: "20-10-2025 08:00 PM" },
  
];