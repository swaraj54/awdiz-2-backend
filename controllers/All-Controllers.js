export const kunal = (req, res) => {
    res.send("Sending Message from Kunal Function");
}
export const Swaraj = (req, res) => {
    try {
        // throw new Error("I want to throw error..")
        res.send('Sending Message from Swaraj Function')
    } catch (error) {
        console.log(error, "- error here")
    }
}
export const Anu = (req, res) => {
    res.send("Sending Message from Anu Function")
}
export const Krishnan = (req, res) => {
    res.send("Sending Message from Krishnan Function")
}
export const Abhi = (req, res) => {
    res.send("Sending Message from Abhi Function")
}

