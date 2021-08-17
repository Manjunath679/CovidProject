const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const session = require("express-session");
const fileUpload = require('express-fileupload');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');


//passport is for password setup
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use('/views', express.static(path.join(__dirname, 'views')));
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(fileUpload());

const sessionStore = new session.MemoryStore;
app.use(session({
    secret: 'KBJNIUKHIUNItyjjgbkhjn54657890ir76876b674v4u5i67yv8b87e65yvrtytftx4135q43wy456jup09l[kjyntw8ro7wr8f7yv5ng8',
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}));
app.use(passport.initialize());
app.use(passport.session());

// const db = require("./db");



// const userSchema = new mongoose.Schema({
//     UserID: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     workplace: {
//         type: String,
//         required: true
//     },
//     phonenumber: {
//         type: String,
//     },
//     department: {
//         type: String,
//         required: true
//     },
//     designation: {
//         type: String
//     },
//     username: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     save_pass: {
//         type: String
//     },
//     password: {
//         type: String
//     }
// });
// var options = {
//     errorMessages: {
//         MissingPasswordError: 'No password was given',
//         AttemptTooSoonError: 'Account is currently locked. Try again later',
//         TooManyAttemptsError: 'Account locked due to too many failed login attempts',
//         NoSaltValueStoredError: 'Authentication not possible. No salt value stored',
//         IncorrectPasswordError: 'Password or username are incorrect',
//         IncorrectUsernameError: 'Password or username are incorrect',
//         MissingUsernameError: 'No username was given',
//         UserExistsError: 'A user with the given username is already registered'
//     }
// };
// userSchema.plugin(passportLocalMongoose, options);
// const User = new mongoose.model("User", userSchema);
// passport.use(User.createStrategy());
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());




// const Counterschema = new mongoose.Schema({
//     counterFor: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     prefix: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     count: Number,
//     Status: String
// });

// const Counter = new mongoose.model("counters", Counterschema);


// const Centerschema = new mongoose.Schema({
//     center_id: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     facility_name: {
//         type: String,
//         required: true,
//     },
//     category: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//     },
//     telephone: {
//         type: String,
//     },
//     village: {
//         type: String,
//         required: true,
//     },
//     block: {
//         type: String,
//         required: true,
//     },
//     no_general_bed: {
//         type: Number,
//         required: true,
//     },
//     no_oxygen_bed: {
//         type: Number,
//         required: true,
//     },
//     no_icu_bed: {
//         type: Number,
//         required: true,
//     },
//     no_ventilator: {
//         type: Number,
//         required: true,
//     },
//     section: {
//         section_id: String,
//         hospital_id: String,
//         floor: String,
//         room_name: String,
//         room_category: String,
//         no_of_general_beds: String,
//         no_of_oxygen_beds: String,
//         no_of_icu_beds: String,
//         no_of_ventilators: String,
//     },
//     active_patient_ids: [{
//         patient_id: String,
//         bed_category: String
//     }]

// });
// const Center = new mongoose.model("centers", Centerschema);
// const Patientschema = new mongoose.Schema({
//     patient_id: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     patient_name: {
//         type: String,
//         required: true,
//     },
//     age: {
//         type: String,
//         required: true,
//     },
//     sex: {
//         type: String,
//         required: true,
//    },
//     s_d_w_of: {
//         type: String,
//         required: true,
//    },
//     address: {
//         type: String,
//         required: true,
//     },
//     village: {
//         type: String,
//         required: true,
//     },
//     block: {
//         type: String,
//         required: true,
//     },
//     telephone: {
//         type: String,
//         required: true,
//     },
//     alt_telephone: {
//         type: String,
//         required: true,
//     },
//     covid_status: {
//         type: String,
//         required: true,
//     },
//     covid_report: {
//         type: String,
//         required: true,
//     },
//     positive_declare_date: {
//         type: String,
//         required: true,
//     },
//     co_morbidities: {
//         type: String,
//         required: true,
//     },
//     travel_history: {
//         type: String,
//         required: true,
//     },
//     admission_date: {
//         type: String,
//         required: true,
//     },
//     referrals: {
//         type: String,
//     },
//     health_status: {
//         date: [String],
//         time: [String],
//         section_id: [String],
//         bp: [String],
//         spo2: [String],
//         pulse: [String],
//         temperature: [String],
//         condition: [String]
//     },
//     active_bed_details: {
//         date: String,
//         center_id: String,
//         section_id: String,
//         bed_category: String,
//         bed_no: String
//     },
//     previous_bed_details: {
//         start_date: [String],
//         end_date: [String],
//         center_id: [String],
//         bed_no: [String],
//         section_id: [String],
//         bed_category: [String]
//    },
//     discharge_status: String,
//     discharge_brefing: String



// });
// const Patient = new mongoose.model("patients", Patientschema);


// const Sectionschema = new mongoose.Schema({
//     section_id: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     center_id: {
//         type: String,
//         required: true
//     },
//     floor: {
//         type: String,
//         required: true,
//     },
//     room_name: {
//         type: String,
//         required: true,
//     },
//     category: {
//         type: String,
//         required: true,
//     },
//    no_of_oxygen_beds: {
//         type: Number,
//         required: true,
//     },
//     no_of_general_beds: {
//         type: Number,
//         required: true,
//     },
//     no_of_icu_beds: {
//         type: Number,
//         required: true,
//     },
//     no_of_ventilator_beds: {
//         type: Number,
//         required: true,
//     },
//     incharge_name: {
//         type: String,
//         required: true,
//     },
//     telephone: {
//         type: String,
//         required: true,
//     },
//     active_patient_ids: [{
//         patient_id: String,
//         bed_category: String
//     }]


// });



// const Sections = new mongoose.model("sections", Sectionschema);

// const report_Patientschema = new mongoose.Schema({
//     srno: {
//         type: Number,
//     },
//     block: {
//         type: String,
//     },
//     name: {
//         type: String,
//    },
//     age: {
//         type: Number,
//    },
//     sex: {
//         type: String,
//     },
//     address: {
//         type: String,
//     },
//     contact: {
//         type: String,
//     },
//     positive_declare_date: {
//         type: String,
//     },
//     present_status: {
//         type: String,
//     },
//     bed_details: {
//         type: String,
//     }

// });
// const Report_Patient = new mongoose.model("report_patients", report_Patientschema);

// const referral_schema = new mongoose.Schema({
//     referral_id: {
//         type: String,
//         required: true,
//         unique: true
//    },
//     patient_id: {
//         type: String,
//         required: true,
//     },
//     patient_name: {
//         type: String,
//         required: true,
//    },
//     referral_date: {
//         type: String,
//         required: true,
//    },
//     from_center_id: {
//         type: String,
//         required: true,
//     },
//     to_center_id: {
//         type: String,
//         required: true,
//     },
//     urgency: {
//         type: String,
//     },
//     referred_by: {
//         type: String,
//     },
//     referred_briefing: {
//         type: String,
//     },
//    bed_category: {
//         type: String,
//     },
//     referred_status: {
//         type: String,
//     },
//     referred_status_briefing: {
//         type: String,
//     },
//     referred_approval_bed: {
//         type: String,
//     },
//     date: {
//         type: Date,
//         default: Date.now()
//     }

// });
// const Referral = new mongoose.model("referrals", referral_schema);



app.get("/", function (req, res) {
    res.render("index.html");
});
app.get("/:page", function (req, res) {
    res.render(req.params.page);
});

app.listen(7088, function () {
    console.log("Server is on port on 7088");
});