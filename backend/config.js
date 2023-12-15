if (development === dev) {
    mongoose.connect("mongodb://localhost:27017/SignInUp")
        .then(connected => {
            if (connected) {
                console.log("Development DB connected successfully")
            } else {
                console.log("Development DB disconnected")
            }
        })
        .catch(err => {
            console.log("Something Went Wrong:", err)
        })
} else {
    mongoose.connect("mongodb://localhost:27017/test")
        .then(connected => {
            if (connected) {
                console.log("Test DB connected successfully")
            } else {
                console.log("Test DB disconnected")
            }
        })
        .catch(err => {
            console.log("Something Went Wrong:", err)
        })
}