"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentVerify = exports.initiatePayment = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const initiatePayment = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(process.env.PAYMENT_URL, {
            store_id: process.env.STORE_ID,
            signature_key: process.env.SIGNATURE_KEY,
            tran_id: paymentData.transactionId,
            success_url: `https://peracomerce.vercel.app/api/confirmation?transactionId=${paymentData.transactionId}`,
            fail_url: `https://peracomerce.vercel.app//api/failure?transactionId=${paymentData.transactionId}`,
            cancel_url: "http://www.merchantdomain.com/cancellpage.html",
            amount: paymentData.totalPrice,
            currency: "BDT",
            desc: "Merchant Registration Payment",
            cus_name: paymentData.name,
            cus_email: paymentData.email,
            cus_add1: paymentData.address,
            cus_add2: "N/A",
            cus_city: "N/A",
            cus_state: "N/A",
            cus_postcode: "N/A",
            cus_country: "N/A",
            cus_phone: paymentData.phone,
            type: "json",
        });
        console.log("Payment initiation response:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error initiating payment:", error);
        throw error;
    }
});
exports.initiatePayment = initiatePayment;
const paymentVerify = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(process.env.PAYMENT_VERIFY_URL, {
            params: {
                store_id: process.env.STORE_ID,
                signature_key: process.env.SIGNATURE_KEY,
                type: "json",
                request_id: transactionId,
            },
        });
        console.log("Payment verification response:", response.data);
        return response.data;
    }
    catch (error) {
        console.error("Error verifying payment:", error);
        throw error;
    }
});
exports.paymentVerify = paymentVerify;
