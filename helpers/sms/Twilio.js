import cs from 'twilio'

async function sendSms(number, message) {
    try {
        const client = cs(process.env.TWILIO_SID, process.env.TWILIO_SECRET);
        const response = await client.messages
            .create({
                body: message,
                from: '+12258258462',
                to: `+91${number}`
            })
        return response.sid;
    } catch (error) {
        return error;
    }
}

export default sendSms;