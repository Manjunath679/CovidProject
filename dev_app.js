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
app.use('/patientdetails/:id', express.static("public"));
app.use('/h_patient_list/:id', express.static("public"));
app.use('/s_patient_list/:id', express.static("public"));
app.use('/hospital_details/:id', express.static("public"));
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

const db = require("./db");
// const { Console } = require("node:console");



const userSchema = new mongoose.Schema({
    UserID: {
        type: String,

        unique: true
    },
    name: {
        type: String,

    },
    workplace: {
        type: String,

    },
    workplace_details: {
        type: String,

    },
    phonenumber: {
        type: String,
    },
    department: {
        type: String,

    },
    designation: {
        type: String
    },
    username: {
        type: String,

        unique: true
    },
    save_pass: {
        type: String
    },
    password: {
        type: String
    }
});
var options = {
    errorMessages: {
        MissingPasswordError: 'No password was given',
        AttemptTooSoonError: 'Account is currently locked. Try again later',
        TooManyAttemptsError: 'Account locked due to too many failed login attempts',
        NoSaltValueStoredError: 'Authentication not possible. No salt value stored',
        IncorrectPasswordError: 'Password or username are incorrect',
        IncorrectUsernameError: 'Password or username are incorrect',
        MissingUsernameError: 'No username was given',
        UserExistsError: 'A user with the given username is already registered'
    }
};
userSchema.plugin(passportLocalMongoose, options);
const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




const Counterschema = new mongoose.Schema({
    counterFor: {
        type: String,

        unique: true
    },
    prefix: {
        type: String,

        unique: true
    },
    count: Number,
    Status: String
});

const Counter = new mongoose.model("counters", Counterschema);


const Centerschema = new mongoose.Schema({
    center_id: {
        type: String,
        unique: true
    },
    facility_name: {
        type: String,
    },
    category: {
        type: String,

    },
    email: {
        type: String,
    },
    telephone: {
        type: String,
    },
    village: {
        type: String,

    },
    block: {
        type: String,

    },
    no_general_bed: {
        type: Number,

    },
    no_oxygen_bed: {
        type: Number,

    },
    no_icu_bed: {
        type: Number,

    },
    no_ventilator: {
        type: Number,

    },
    no_hdu_bed:{
        type: Number,
    },
    no_isolation_bed:{
        type: Number,
    },
    section: {
        section_id: String,
        hospital_id: String,
        hospital_details: String,
        floor: String,
        room_name: String,
        room_category: String,
        no_of_general_beds: String,
        no_of_oxygen_beds: String,
        no_of_icu_beds: String,
        no_of_ventilators: String,
    },
    active_patient_ids: [{
        patient_id: String,
        bed_category: String
    }]

});
const Center = new mongoose.model("centers", Centerschema);
const Patientschema = new mongoose.Schema({
    patient_id: {
        type: String,

        unique: true
    },
    patient_name: {
        type: String,

    },
    age: {
        type: String,

    },
    sex: {
        type: String,

    },
    s_d_w_of: {
        type: String
    },
    address: {
        type: String
    },
    village: {
        type: String
    },
    block: {
        type: String
    },
    telephone: {
        type: String
    },
    alt_telephone: {
        type: String
    },
    covid_status: {
        type: String
    },
    covid_report: {
        type: String
    },
    positive_declare_date: {
        type: String
    },
    co_morbidities: {
        type: String
    },
    travel_history: {
        type: String
    },
    admission_date: {
        type: String
    },
    referrals: {
        type: String,
    },
    symptoms: {
        type: String,
    },
    previous_covid:  {
        type: String,
    },
    previous_covid_date:  {
        type: String,
    },
    vaccination:  {
        type: String,
    },
    vaccination_date:  {
        type: String,
    },
    swap_collection_date:  {
        type: String,
    },
    date_symptoms:  {
        type: String,
    },
    
  
    active_health_status: {
        date: {
            type: String,
        },
        time: {
            type: String,
        },
        section_id: {
            type: String,
        },
        bp: {
            type: String,
        },
        spo2: {
            type: String,
        },
        pulse: {
            type: String,
        },
        temperature: {
            type: String,
        },
        condition: {
            type: String,
        },
        fbs: {
            type: String,
        },
        rbs:  {
            type: String,
        },
    },
    health_status: {
        date: [String],
        time: [String],
        section_id: [String],
        bp: [String],
        spo2: [String],
        pulse: [String],
        temperature: [String],
        condition: [String]
    },
    active_bed_details: {
        date: String,
        center_id: String,
        center_details: String,
        section_id: String,
        section_details: String,
        bed_category: String,
        bed_no: String
    },
    previous_bed_details: {
        start_date: [String],
        end_date: [String],
        center_id: [String],
        center_details: [String],
        bed_no: [String],
        section_id: [String],
        section_details: [String],
        bed_category: [String]
    },
    discharge_status: String,
    discharge_brefing: String



});
const Patient = new mongoose.model("patients", Patientschema);


const Sectionschema = new mongoose.Schema({
    section_id: {
        type: String,
        unique: true
    },
    center_id: {
        type: String,
    },
    center_details: {
        type: String,
    },

    floor: {
        type: String,

    },
    room_name: {
        type: String,

    },
    category: {
        type: String,

    },
    no_of_oxygen_beds: {
        type: Number,

    },
    no_of_general_beds: {
        type: Number,

    },
    no_of_icu_beds: {
        type: Number,

    },
    no_hdu_beds:{
        type: Number,
    },
    no_isolation_beds:{
        type: Number,
    },
    no_of_ventilator_beds: {
        type: Number,

    },
    incharge_name: {
        type: String,

    },
    telephone: {
        type: String,

    },
    active_patient_ids: [{
        patient_id: String,
        bed_category: String
    }]
});

const Sections = new mongoose.model("sections", Sectionschema);


const oxygenScheama = new mongoose.Schema({

    center: {
        type: Centerschema,
    },
    date: {
        type: String,
    },
    total_oxygen_used_yesterday: {
        type: Number,
    },
    total_oxygen_received_yesterday: {
        type: Number,
    },
    total_oxygen_available: {
        type: Number,
    }
});
const Oxygen = new mongoose.model("oxygen", oxygenScheama);


const report_Patientschema = new mongoose.Schema({
    srno: {
        type: Number,
    },
    block: {
        type: String,
    },
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    sex: {
        type: String,
    },
    address: {
        type: String,
    },
    contact: {
        type: String,
    },
    positive_declare_date: {
        type: String,
    },
    present_status: {
        type: String,
    },
    bed_details: {
        type: String,
    }
});
const Report_Patient = new mongoose.model("report_patients", report_Patientschema);

const referral_schema = new mongoose.Schema({
    referral_id: {
        type: String,

        unique: true
    },
    patient_id: {
        type: String,

    },
    patient_name: {
        type: String,

    },
    referral_date: {
        type: String,

    },
    from_center_id: {
        type: String,

    },
    to_center_id: {
        type: String,

    },
    urgency: {
        type: String,
    },
    referred_by: {
        type: String,
    },
    referred_briefing: {
        type: String,
    },
    bed_category: {
        type: String,
    },
    referred_status: {
        type: String,
    },
    hospital_category: {
        type: String,

    },
    referred_status_briefing: {
        type: String,
    },
    referred_approval_bed: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    rrt_id: {
        type: String,
    }


});
const Referral = new mongoose.model("referrals", referral_schema);


// app.get('/startserver', (req, res) => {

// const counter1=new Counter({
//     counterFor:"ADMIN",
//     prefix: "GMCOVADT",
//     count: 990
// });
// counter1.save();

// const counter2=new Counter({
//     counterFor:"COVID_CELL",
//     prefix: "GMCC",
//     count: 0
// });
// counter2.save();

// const counter3=new Counter({
//     counterFor:"CENTERS",
//     prefix: "GMCN",
//     count: 0
// });
// counter3.save();


// const counter4=new Counter({
//     counterFor:"CENTER_DO",
//     prefix: "GMCD",
//     count: 0
// });
// counter4.save();


// const counter5=new Counter({
//     counterFor:"PATIENT",
//     prefix: "GMP",
//     count: 0
// });
// counter5.save();

// const counter6=new Counter({
//     counterFor:"SECTION",
//     prefix: "GMSC",
//     count: 0
// });
// counter6.save();
//  const counter7=new Counter({
//     counterFor:"REFERRAL",
//     prefix: "GMRF",
//     count: 0
// });
// counter7.save();
// const counter8=new Counter({
//     counterFor:"RRT",
//     prefix: "GMRR",
//     count: 0
// });
// counter8.save();
// setTimeout(() => {
//             User.register(new User({
//                 UserID:"TEC00001",
//                 name:"Teceads Solution",
//                 workplace:"Teceads Office",
//                 phonenumber:"9704505596",
//                 department:"TECEADS",
//                 designation:"DEVELOPER",
//                 username:"teceads@gmail.com",
//                 save_pass:"qwerty"
//             }), "qwerty", function(err, user){
//                 if(err){
//                     console.log(err);
//                 }
//             });
//             console.log("User added");
// User.register(new User({
//                     UserID:"GMCOVCELL1",
//                     name:"USER ONE",
//                     workplace:"COVID CELL",
//                     phonenumber:"9704505596",
//                     department:"COVID_CELL",
//                     designation:"AUTHORITY",
//                     username:"covidcell@swosth.in",
//                     save_pass:"qwerty"
//                 }), "qwerty", function(err, user){
//                     if(err){
//                         console.log(err);
//                     }
//                         res.redirect("/");
//                 });
//                 console.log("User added");
// }, 2000);

// });
app.get("/", function (req, res) {
    res.redirect("/login");
});
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/login");
});
app.get("/login", auth, function (req, res) {
    res.redirect("home");
});

app.post('/login', passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login"
}), function (req, res) {
    console.log(req.body);
});

app.get("/home", auth, function (req, res) {
    switch (req.user.department) {
        case "RRT":
            res.redirect("/rrt-home")
            break;
        case "COVID_CELL":
            res.redirect("/covid-cell-home")
            break;
        case "CENTER_DO":
            res.redirect("/center-do-home")
            break;


        default:
            res.render(req.user.department + "/hospital_dashboard",{element:req.user});

            break;
    }
    // res.render(req.user.department+"/hospital_dashboard");
});
// app.get("/home",auth, function (req, res) {res.render(req.user.department+"/hospital_dashboard");});

// app.get("/covid_dashboard",auth,  function (req, res) {res.render(req.user.department+"/covid_dashboard");});

//////////////////COVID_CELL///////////
app.get("/covid-cell-home", auth, HasRole("COVID_CELL"), function (req, res) {
    Patient.find({}, async (err, patients_list) => {

        console.log(patients_list)
        var active_patient = 0,
            discharged_patient = 0,
            death = 0,
            total_patient = patients_list.length,
            referred = 0;


        for (let index = 0; index < patients_list.length; index++) {
            const element = patients_list[index];


            if (element.discharge_status.toUpperCase().trim() === "DISCHARGED") {
                discharged_patient++;
            }
            if (element.discharge_status.toUpperCase().trim() === "ACTIVE") {
                active_patient++;
            }
            if (element.discharge_status.toUpperCase().trim() === "DEATH") {
                death++;
            }
            if (element.discharge_status.toUpperCase().trim() === "REFEREED" || element.discharge_status.toUpperCase().trim() === "SHIFTING") {
                referred++;
            }


        }
        var header_data = {
            total_patient: total_patient,
            active_patient: active_patient,
            discharged_patient: discharged_patient,
            referred: referred,
            death: death

        }


        Center.find({}, async (err, centers_list) => {

            hospital_list = [{
                hospital: Centerschema,
                total_available_bed: Number,
                total_occupied_bed: Number,
                total_oxygen_bed_available: Number,
                total_oxygen_bed_occupied: Number,
                total_general_bed_available: Number,
                total_general_bed_occupied: Number,
                total_icu_bed_available: Number,
                total_icu_bed_occupied: Number,
                total_ventilator_bed_available: Number,
                total_ventilator_bed_occupied: Number,
            }];
            for (let index = 0; index < centers_list.length; index++) {
                const element = centers_list[index];
                console.log(element)
                var GENERAL_BED_COUNT = 0,
                    OXYGEN_BED_COUNT = 0,
                    ICU_BED_COUNT = 0,
                    VENTILATOR_BED_COUNT = 0;
                for (let j = 0; j < element.active_patient_ids.length; j++) {
                    const bed_d = element.active_patient_ids[j];
                    if (bed_d.bed_category === "GENERAL_BED") {
                        GENERAL_BED_COUNT++;
                    }
                    if (bed_d.bed_category === "OXYGEN_BED") {
                        OXYGEN_BED_COUNT++;
                    }
                    if (bed_d.bed_category === "ICU_BED") {
                        ICU_BED_COUNT++;
                    }
                    if (bed_d.bed_category === "VENTILATOR_BED") {
                        VENTILATOR_BED_COUNT++;
                    }

                }
                // no_general_bed: 100,
                // no_oxygen_bed: 50,
                // no_icu_bed: 30,
                // no_ventilator: 10,
                hospital_list.push({
                    hospital: element,
                    total_bed_available: Number(element.no_general_bed + element.no_oxygen_bed + element.no_icu_bed + element.no_ventilator),
                    total_bed_occupied: element.active_patient_ids.length,
                    total_oxygen_bed_available: element.no_oxygen_bed,
                    total_oxygen_bed_occupied: OXYGEN_BED_COUNT,
                    total_general_bed_available: element.no_general_bed,
                    total_general_bed_occupied: GENERAL_BED_COUNT,
                    total_icu_bed_available: element.no_icu_bed,
                    total_icu_bed_occupied: ICU_BED_COUNT,
                    total_ventilator_bed_available: element.no_ventilator,
                    total_ventilator_bed_occupied: VENTILATOR_BED_COUNT,
                    hospital_category: element.category,
                });

            }
            hospital_list.shift();
            console.log(hospital_list);

            var total_hospital_data = {
                total_bed_available: 0,
                total_bed_occupied: 0,
                total_oxygen_bed_available: 0,
                total_oxygen_bed_occupied: 0,
                total_icu_bed_available: 0,
                total_icu_bed_occupied: 0,
                total_general_bed_available: 0,
                total_general_bed_occupied: 0,
                total_ventilator_bed_available: 0,
                total_ventilator_bed_occupied: 0,
            };
            var total_dch_data = {
                total_bed_available: 0,
                total_bed_occupied: 0,
                total_oxygen_bed_available: 0,
                total_oxygen_bed_occupied: 0,
                total_icu_bed_available: 0,
                total_icu_bed_occupied: 0,
                total_general_bed_available: 0,
                total_general_bed_occupied: 0,
                total_ventilator_bed_available: 0,
                total_ventilator_bed_occupied: 0,
            };
            var total_dchc_data = {
                total_bed_available: 0,
                total_bed_occupied: 0,
                total_oxygen_bed_available: 0,
                total_oxygen_bed_occupied: 0,
                total_icu_bed_available: 0,
                total_icu_bed_occupied: 0,
                total_general_bed_available: 0,
                total_general_bed_occupied: 0,
                total_ventilator_bed_available: 0,
                total_ventilator_bed_occupied: 0,
            };
            var total_ccc_data = {
                total_bed_available: 0,
                total_bed_occupied: 0,
                total_oxygen_bed_available: 0,
                total_oxygen_bed_occupied: 0,
                total_icu_bed_available: 0,
                total_icu_bed_occupied: 0,
                total_general_bed_available: 0,
                total_general_bed_occupied: 0,
                total_ventilator_bed_available: 0,
                total_ventilator_bed_occupied: 0,
            };
            for (let index = 0; index < hospital_list.length; index++) {
                const element__ = hospital_list[index];
                total_hospital_data.total_bed_available += element__.total_bed_available;
                total_hospital_data.total_bed_occupied += element__.total_bed_occupied;
                total_hospital_data.total_oxygen_bed_available += element__.total_oxygen_bed_available;
                total_hospital_data.total_oxygen_bed_occupied += element__.total_oxygen_bed_occupied;
                total_hospital_data.total_general_bed_available += element__.total_general_bed_available;
                total_hospital_data.total_general_bed_occupied += element__.total_general_bed_occupied;
                total_hospital_data.total_icu_bed_available += element__.total_icu_bed_available;
                total_hospital_data.total_icu_bed_occupied += element__.total_icu_bed_occupied;
                total_hospital_data.total_ventilator_bed_available += element__.total_ventilator_bed_available;
                total_hospital_data.total_ventilator_bed_occupied += element__.total_ventilator_bed_occupied;
                if (element__.hospital_category === "DCHC") {
                    total_dchc_data.total_bed_available += element__.total_bed_available;
                    total_dchc_data.total_bed_occupied += element__.total_bed_occupied;
                    total_dchc_data.total_oxygen_bed_available += element__.total_oxygen_bed_available;
                    total_dchc_data.total_oxygen_bed_occupied += element__.total_oxygen_bed_occupied;
                    total_dchc_data.total_general_bed_available += element__.total_general_bed_available;
                    total_dchc_data.total_general_bed_occupied += element__.total_general_bed_occupied;
                    total_dchc_data.total_icu_bed_available += element__.total_icu_bed_available;
                    total_dchc_data.total_icu_bed_occupied += element__.total_icu_bed_occupied;
                    total_dchc_data.total_ventilator_bed_available += element__.total_ventilator_bed_available;
                    total_dchc_data.total_ventilator_bed_occupied += element__.total_ventilator_bed_occupied;
                }
                if (element__.hospital_category === "DCH") {
                    total_dch_data.total_bed_available += element__.total_bed_available;
                    total_dch_data.total_bed_occupied += element__.total_bed_occupied;
                    total_dch_data.total_oxygen_bed_available += element__.total_oxygen_bed_available;
                    total_dch_data.total_oxygen_bed_occupied += element__.total_oxygen_bed_occupied;
                    total_dch_data.total_general_bed_available += element__.total_general_bed_available;
                    total_dch_data.total_general_bed_occupied += element__.total_general_bed_occupied;
                    total_dch_data.total_icu_bed_available += element__.total_icu_bed_available;
                    total_dch_data.total_icu_bed_occupied += element__.total_icu_bed_occupied;
                    total_dch_data.total_ventilator_bed_available += element__.total_ventilator_bed_available;
                    total_dch_data.total_ventilator_bed_occupied += element__.total_ventilator_bed_occupied;
                }
                if (element__.hospital_category === "DCCC") {
                    total_ccc_data.total_bed_available += element__.total_bed_available;
                    total_ccc_data.total_bed_occupied += element__.total_bed_occupied;
                    total_ccc_data.total_oxygen_bed_available += element__.total_oxygen_bed_available;
                    total_ccc_data.total_oxygen_bed_occupied += element__.total_oxygen_bed_occupied;
                    total_ccc_data.total_general_bed_available += element__.total_general_bed_available;
                    total_ccc_data.total_general_bed_occupied += element__.total_general_bed_occupied;
                    total_ccc_data.total_icu_bed_available += element__.total_icu_bed_available;
                    total_ccc_data.total_icu_bed_occupied += element__.total_icu_bed_occupied;
                    total_ccc_data.total_ventilator_bed_available += element__.total_ventilator_bed_available;
                    total_ccc_data.total_ventilator_bed_occupied += element__.total_ventilator_bed_occupied;
                }
            }



            res.render("COVID_CELL/hospital_dashboard", {
                header_data: header_data,
                hospital_list: hospital_list,
                total_hospital_data: total_hospital_data,
                total_dch_data: total_dch_data,
                total_dchc_data: total_dchc_data,
                total_ccc_data: total_ccc_data,
                element:req.user



            });
        });
    });

});
app.get("/covid_dashboard", auth, HasRole("COVID_CELL"), function (req, res) {
    Report_Patient.find({}, async (err, patients_list) => {

        var active_patient = 0,
            discharged_patient = 0,
            death = 0,
            total_cases = patients_list.length,
            home_isolation = 0,
            hospital = 0;
        var blocks = [],
            positive_declare_date = [],
            bed_details = [];
        for (let index = 0; index < patients_list.length; index++) {
            const element = patients_list[index];
            if (element.present_status.toUpperCase().trim() === "DISCHARGED") {
                discharged_patient++;
            }
            if (element.present_status.toUpperCase().trim() === "ACTIVE") {
                active_patient++;
            }
            if (element.present_status.toUpperCase().trim() === "DEATH") {
                death++;
            }

            if (element.bed_details) {
                if (element.bed_details.toUpperCase().trim() === "HOME ISOLATION" && element.present_status.toUpperCase().trim() === "ACTIVE") {
                    home_isolation++;
                }
            }
            if (element.bed_details) {
                if ((element.bed_details.toUpperCase().trim() === "CCC" || element.bed_details.toUpperCase().trim() === "CCH" || element.bed_details.toUpperCase().trim() === "DCH" || element.bed_details.toUpperCase().trim() === "DCHC") && element.present_status.toUpperCase().trim() === "ACTIVE") {
                    hospital++;
                }
            }
            if (!blocks.contains(element.block)) {
                blocks.push(element.block);
            }
            if (!bed_details.contains(element.bed_details)) {
                bed_details.push(element.bed_details);
            }
            if (!positive_declare_date.contains(element.positive_declare_date)) {
                positive_declare_date.push(element.positive_declare_date);
            }
        }
        var header_data = {
            total_cases: total_cases,
            active_patient: active_patient,
            discharged_patient: discharged_patient,
            home_isolation: home_isolation,
            hospital: hospital,
            death: death

        }
        console.log(header_data)
        var patient_count_b_d = [{
            block: String,
            date: String,
            number: Number
        }];
        var patient_count_d = [{
            day: Number,
            month: String,
            year: Number,
            number: Number
        }];
        var patient_count_b = [{
            block: String,
            number: Number
        }];

        patient_count_daily_count = [];
        patient_count_daily_date = [];
        // console.log(positive_declare_date.length) 
        // console.log(blocks.length) 
        var count = 0
        var block_total_cases = [];
        var block_active_cases = [];
        var block_name = [];
        for (let j = 0; j < blocks.length; j++) {
            const block = blocks[j];
            const total_cases___ = await Report_Patient.countDocuments({
                block: block
            }).exec();
            const active_cases___ = await Report_Patient.countDocuments({
                block: block,
                present_status: "ACTIVE"
            }).exec();
            block_total_cases.push(total_cases___);
            block_active_cases.push(active_cases___);
            block_name.push(block);
        }

        for (let index = 0; index < positive_declare_date.length; index++) {
            const positive_declare_dat = positive_declare_date[index];
            //    
            const _docCount = await Report_Patient.countDocuments({
                positive_declare_date: positive_declare_dat
            }).exec();
            if (positive_declare_dat) {
                patient_count_d.push({
                    day: positive_declare_dat.slice(8, 10),
                    month: positive_declare_dat.slice(4, 7),
                    year: positive_declare_dat.slice(11, 15),
                    number: _docCount
                });
            }

        }
        console.log(patient_count_d);
        var __months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

        for (let index = 0; index < 12; index++) {
            const element = __months[index];
            for (let j = 0; j < 32; j++) {

                for (let k = 0; k < patient_count_d.length; k++) {
                    const element_ = patient_count_d[k];


                    Number(element_.day)
                    if (Number(element_.day) == j && element_.month.toLowerCase() === element) {
                        console.log("fsd")
                        patient_count_daily_date.push(element_.day + '-' + element_.month);
                        patient_count_daily_count.push(element_.number);

                    }
                }

            }
        }

        console.log(patient_count_daily_date);
        console.log(patient_count_daily_count);

        var bed_detail_data = [{
            bed_type: String,
            count: Number
        }]
        for (let index = 0; index < bed_details.length; index++) {
            const element = bed_details[index];
            const docCount_bed = await Report_Patient.countDocuments({
                bed_details: element
            }).exec();
            bed_detail_data.push({
                bed_type: element,
                count: docCount_bed
            });
        }
        res.render("COVID_CELL/covid_dashboard", {
            element:req.user,
            header_data: header_data,
            patient_count_daily_date: patient_count_daily_date,
            patient_count_daily_count: patient_count_daily_count,
            block_total_cases: block_total_cases,
            block_active_cases: block_active_cases,
            block_name: block_name
        });
    });

});
Array.prototype.contains = function (v) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === v) return true;
    }
    return false;
};
app.get("/usermanagement", auth, HasRole("COVID_CELL"), function (req, res) {
    Center.find({}, (err, centers_list) => {
        console.log(centers_list);
        User.find({}, (err, users_list) => {
            console.log(users_list);
            res.render(req.user.department + "/user_management", {
                element:req.user,
                users_list: users_list,
                centers_list: centers_list
            });
        });
    });
});
app.post('/signup', auth, HasRole("COVID_CELL"), (req, res) => {
    console.log(req.body);
    Counter.findOneAndUpdate({
        counterFor: req.body.department
    }, {
        $inc: {
            'count': 1
        }
    }, {
        new: true,
        setDefaultsOnInsert: true
    }, (err, counterOut) => {
        if (err) {
            console.log(err);
            res.redirect("login");
        } else {
            Center.findOne({
                center_id: req.body.workplace.toUpperCase()
            }, (err, centers_list) => {
                console.log(centers_list);
                if (centers_list) {
                    var det_ = centers_list.facility_name + "-" + centers_list.category + "-" + centers_list.block;
                } else {
                    var det_ = req.body.workplace;
                }
                req.body.password = generatePassword();
                User.register(new User({
                    UserID: counterOut.prefix + counterOut.count,
                    name: req.body.name.toUpperCase(),
                    workplace: req.body.workplace.toUpperCase(),
                    workplace_details: det_,
                    phonenumber: req.body.phonenumber,
                    department: req.body.department.toUpperCase(),
                    designation: req.body.designation.toUpperCase(),
                    username: (counterOut.prefix + counterOut.count + "@SWOSTH.IN").toLocaleLowerCase(),
                    save_pass: req.body.password
                }), req.body.password, function (err, user) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("User added userID:" + counterOut.prefix + counterOut.count);
                        console.log(user);
                        res.redirect("/usermanagement");
                    }
                });
            });
        }
    });
});

function generatePassword() {
    var length = 6,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
app.get("/centermanagement", auth, HasRole("COVID_CELL"), function (req, res) {
    Center.find({}, (err, centers_list) => {
        console.log(centers_list);
        res.render(req.user.department + "/center_management", {
            centers_list: centers_list,
            element:req.user,

        });
    });
});
app.post('/add_center', auth, HasRole("COVID_CELL"), (req, res) => {
    console.log(req.body);
    Counter.findOneAndUpdate({
        counterFor: "CENTERS"
    }, {
        $inc: {
            'count': 1
        }
    }, {
        new: true,
        setDefaultsOnInsert: true
    }, (err, counterOut) => {
        if (err) {
            console.log(err);
            res.redirect("login");
        } else {
            const center = new Center({
                center_id: counterOut.prefix + counterOut.count,
                facility_name: req.body.facility_name.toUpperCase(),
                category: req.body.category.toUpperCase(),
                email: req.body.email,
                telephone: req.body.telephone,
                village: req.body.village.toUpperCase(),
                block: req.body.block.toUpperCase(),
                no_general_bed: req.body.no_general_bed,
                no_oxygen_bed: req.body.no_oxygen_bed,
                no_icu_bed: req.body.no_icu_bed,
                no_ventilator: req.body.no_ventilator,
                no_hdu_bed: req.body.no_hdu_bed,
                no_isolation_bed: req.body.no_isolation_bed
            });
            center.save();
            res.redirect("/centermanagement");
        }
    });
});
app.get("/updateactivecase", auth, HasRole("COVID_CELL"), function (req, res) {
    Report_Patient.find({}, (err, patients_list) => {
        console.log(patients_list);
        res.render(req.user.department + "/update_active_cases", {
            patients_list: patients_list,
            element:req.user,

        });
    });
});
app.post('/master_file_active_case', auth, HasRole("COVID_CELL"), (req, res) => {
    let sampleFile = req.files.file;
    var o_f_name = req.files.file.name
    console.log(req.files);
    var f_name = o_f_name.split(".");
    var ln = f_name.length - 1;
    var f_ex_ = f_name[ln];
    f_ex = f_ex_.toLowerCase();
    if ((f_ex === "xlsx") || (f_ex === "xls")) {
        var path = 'uploads/active_cases/' + "active_cases" + '.' + f_ex_
        sampleFile.mv(path, function (err) {
            if (err) {
                // console.log(err);
                return res.status(500).send(err);
            } else {
                const result_ = excelToJson({
                    source: fs.readFileSync(path) // fs.readFileSync return a Buffer
                });


                Report_Patient.remove({}, (err, patients_list) => {
                    if (!err) {
                        result_["MASTER SHEET"].forEach(element => {
                            if (element.A >= 0) {
                                const report_patients = new Report_Patient({
                                    srno: element.A,
                                    block: element.B,
                                    name: element.C,
                                    age: element.D,
                                    sex: element.E,
                                    address: element.F,
                                    contact: element.G,
                                    positive_declare_date: element.H,
                                    present_status: element.I,
                                    bed_details: element.M
                                });
                                report_patients.save();
                            }

                        });
                    }
                });
                res.redirect("/updateactivecase");

            }
        });
    } else {
        res.status(500).send("only .xls and .xlxs are accepted");
    }

});
app.get("/hospitallist", auth, HasRole("COVID_CELL"), function (req, res) {

    Center.find({}, async (err, centers_list) => {

        hospital_list = [{
            hospital: Centerschema,
            total_available_bed: Number,
            total_occupied_bed: Number,
            total_oxygen_bed_available: Number,
            total_oxygen_bed_occupied: Number,
            total_general_bed_available: Number,
            total_general_bed_occupied: Number,
            total_icu_bed_available: Number,
            total_icu_bed_occupied: Number,
            total_ventilator_bed_available: Number,
            total_ventilator_bed_occupied: Number,
        }];
        for (let index = 0; index < centers_list.length; index++) {
            const element = centers_list[index];
            console.log(element)
            var GENERAL_BED_COUNT = 0,
                OXYGEN_BED_COUNT = 0,
                ICU_BED_COUNT = 0,
                VENTILATOR_BED_COUNT = 0;
            for (let j = 0; j < element.active_patient_ids.length; j++) {
                const bed_d = element.active_patient_ids[j];
                if (bed_d.bed_category === "GENERAL_BED") {
                    GENERAL_BED_COUNT++;
                }
                if (bed_d.bed_category === "OXYGEN_BED") {
                    OXYGEN_BED_COUNT++;
                }
                if (bed_d.bed_category === "ICU_BED") {
                    ICU_BED_COUNT++;
                }
                if (bed_d.bed_category === "VENTILATOR_BED") {
                    VENTILATOR_BED_COUNT++;
                }

            }
            // no_general_bed: 100,
            // no_oxygen_bed: 50,
            // no_icu_bed: 30,
            // no_ventilator: 10,
            hospital_list.push({
                hospital: element,
                total_bed_available: Number(element.no_general_bed + element.no_oxygen_bed + element.no_icu_bed + element.no_ventilator),
                total_bed_occupied: element.active_patient_ids.length,
                total_oxygen_bed_occupied: OXYGEN_BED_COUNT,
                total_general_bed_occupied: GENERAL_BED_COUNT,
                total_icu_bed_occupied: ICU_BED_COUNT,
                total_ventilator_bed_occupied: VENTILATOR_BED_COUNT,
            });

        }
        hospital_list.shift();
        console.log(hospital_list);
        res.render("COVID_CELL/hospital_list", {
            element:req.user,

            hospital_list: hospital_list
        });

    });


});
app.get("/hospital_details/:h_id", auth, function (req, res) {

    Center.findOne({
        center_id: req.params.h_id
    }, async (err, centers_list) => {

        Sections.find({
            center_id: req.params.h_id
        }, async (err, sections_list) => {

            hospital_list = [{
                hospital: Centerschema,
                section: Sectionschema,
                total_available_bed: Number,
                total_occupied_bed: Number,
                total_oxygen_bed_available: Number,
                total_oxygen_bed_occupied: Number,
                total_general_bed_available: Number,
                total_general_bed_occupied: Number,
                total_icu_bed_available: Number,
                total_icu_bed_occupied: Number,
                total_ventilator_bed_available: Number,
                total_ventilator_bed_occupied: Number,
            }];
            for (let index = 0; index < sections_list.length; index++) {
                const element = sections_list[index];
                console.log(element)
                var GENERAL_BED_COUNT = 0,
                    OXYGEN_BED_COUNT = 0,
                    ICU_BED_COUNT = 0,
                    VENTILATOR_BED_COUNT = 0;
                for (let j = 0; j < element.active_patient_ids.length; j++) {
                    const bed_d = element.active_patient_ids[j];
                    if (bed_d.bed_category === "GENERAL_BED") {
                        GENERAL_BED_COUNT++;
                    }
                    if (bed_d.bed_category === "OXYGEN_BED") {
                        OXYGEN_BED_COUNT++;
                    }
                    if (bed_d.bed_category === "ICU_BED") {
                        ICU_BED_COUNT++;
                    }
                    if (bed_d.bed_category === "VENTILATOR_BED") {
                        VENTILATOR_BED_COUNT++;
                    }

                }
                // no_general_bed: 100,
                // no_oxygen_bed: 50,
                // no_icu_bed: 30,
                // no_ventilator: 10,
                hospital_list.push({
                    hospital: centers_list,
                    section: element,
                    total_bed_available: Number(element.no_of_general_beds + element.no_of_oxygen_beds + element.no_of_icu_beds + element.no_of_ventilator_beds),
                    total_bed_occupied: element.active_patient_ids.length,
                    total_oxygen_bed_occupied: OXYGEN_BED_COUNT,
                    total_general_bed_occupied: GENERAL_BED_COUNT,
                    total_icu_bed_occupied: ICU_BED_COUNT,
                    total_ventilator_bed_occupied: VENTILATOR_BED_COUNT,
                });

            }
            hospital_list.shift();
            console.log(hospital_list);
            res.render("COVID_CELL/section_list", {
                element:req.user,

                hospital_list: hospital_list
            });

        });
    });


});
app.get("/activepatientlist", auth, HasRole("COVID_CELL"), function (req, res) {

    Patient.find({
        discharge_status: "ACTIVE"
    }, (err, patients_list) => {
        res.render("COVID_CELL/active_patient_list", {
            element:req.user,


            patients_list: patients_list
        });
    });
});
app.get("/dischargedpatientlist", auth, HasRole("COVID_CELL"), function (req, res) {
    Patient.find({
        discharge_status: {
            $ne: "ACTIVE"
        }
    }, (err, patients_list) => {
        res.render("COVID_CELL/d_patient_list", {
            element:req.user,

            patients_list: patients_list
        });
    });
});
app.get("/servedreferral", auth, HasRole("COVID_CELL"), function (req, res) {
    Referral.find({
        $or: [{
            referred_status: "REJECTED"
        }, {
            referred_status: "SERVED"
        }]
    }, (err, referral_list) => {
        console.log(referral_list);
        res.render("COVID_CELL/active_referrals", {
            element:req.user,

            referral_list: referral_list
        });
    });
});
app.get("/activereferral", auth, HasRole("COVID_CELL"), function (req, res) {
    Referral.find({
        $and: [{
            referred_status: {
                $ne: "REJECTED"
            }
        }, {
            referred_status: {
                $ne: "SERVED"
            }
        }]
    }, (err, referral_list) => {
        console.log(referral_list);
        res.render("COVID_CELL/active_referrals", {
            element:req.user,

            referral_list: referral_list
        });
    });
});
app.get("/h_patient_list/:h_id", auth, HasRole("COVID_CELL"), function (req, res) {

    Patient.find({
        "active_bed_details.center_id": req.params.h_id
    }, (err, patients_list) => {
        res.render("COVID_CELL/h_patient_list", {
            element:req.user,

            patients_list: patients_list
        });
    });
});
app.get("/s_patient_list/:s_id", auth, HasRole("COVID_CELL"), function (req, res) {

    Patient.find({
        "active_bed_details.section_id": req.params.s_id
    }, (err, patients_list) => {
        res.render("COVID_CELL/s_patient_list", {
            element:req.user,

            patients_list: patients_list
        });
    });
});

app.get("/cov_in_referral", auth, HasRole("COVID_CELL"), function (req, res) {

    Center.find({}, (err, centers_list) => {
        console.log(centers_list);
        Referral.find({

            to_center_id: "ALL_BY_RRT",
            hospital_category: {
                $ne: "DCHC"
            }


        }, (err, referral_list) => {
            hospital_list = [{
                hospital: Centerschema,
                total_available_bed: Number,
                total_occupied_bed: Number,
                total_oxygen_bed_available: Number,
                total_oxygen_bed_occupied: Number,
                total_general_bed_available: Number,
                total_general_bed_occupied: Number,
                total_icu_bed_available: Number,
                total_icu_bed_occupied: Number,
                total_ventilator_bed_available: Number,
                total_ventilator_bed_occupied: Number,
            }];
            for (let index = 0; index < centers_list.length; index++) { if(centers_list[index].category==="DCH"){
                const element = centers_list[index];
                console.log(element)
                var GENERAL_BED_COUNT = 0,
                    OXYGEN_BED_COUNT = 0,
                    ICU_BED_COUNT = 0,
                    VENTILATOR_BED_COUNT = 0;
                for (let j = 0; j < element.active_patient_ids.length; j++) {
                    const bed_d = element.active_patient_ids[j];
                    if (bed_d.bed_category === "GENERAL_BED") {
                        GENERAL_BED_COUNT++;
                    }
                    if (bed_d.bed_category === "OXYGEN_BED") {
                        OXYGEN_BED_COUNT++;
                    }
                    if (bed_d.bed_category === "ICU_BED") {
                        ICU_BED_COUNT++;
                    }
                    if (bed_d.bed_category === "VENTILATOR_BED") {
                        VENTILATOR_BED_COUNT++;
                    }
    
                }
                // no_general_bed: 100,
                // no_oxygen_bed: 50,
                // no_icu_bed: 30,
                // no_ventilator: 10,
                hospital_list.push({
                    hospital: element,
                    total_bed_available: Number(element.no_general_bed + element.no_oxygen_bed + element.no_icu_bed + element.no_ventilator),
                    total_bed_occupied: element.active_patient_ids.length,
                    total_oxygen_bed_occupied: OXYGEN_BED_COUNT,
                    total_general_bed_occupied: GENERAL_BED_COUNT,
                    total_icu_bed_occupied: ICU_BED_COUNT,
                    total_ventilator_bed_occupied: VENTILATOR_BED_COUNT,
                });
    
            }}
            hospital_list.shift();
            console.log(hospital_list);
            console.log(referral_list);
            res.render(req.user.department + "/incoming_referrals_management", {
                element:req.user,

                referral_list: referral_list,
                centers_list: centers_list,
                hospital_list: hospital_list

            });
        });
    });



});
app.get("/cov_out_referral", auth, HasRole("COVID_CELL"), function (req, res) {
    Referral.find({
        from_center_id: "COVID_CELL"
    }, (err, referral_list) => {
        console.log(referral_list);
        res.render(req.user.department + "/outgoing_referrals_management", {
            element:req.user,

            referral_list: referral_list
        });
    });
});
app.post('/accept_referral_rrt_covid_cell', auth, HasRole("COVID_CELL"), (req, res) => {
    console.log(req.body)
    Referral.findOneAndUpdate({
        referral_id: req.body.referral_id
    }, {
        $set: {
            to_center_id: req.body.centers_id,
            from_center_id: "COVID_CELL",
        }
    }, (err, patient_updated) => {
        console.log(patient_updated)
        res.redirect("/cov_in_referral");
    });

});
app.post('/reject_referral_rrt_covid_cell', auth, HasRole("CENTER_DO"), (req, res) => {
    Referral.findOneAndUpdate({
        referral_id: req.body.referral_id
    }, {
        $set: {
            referred_status: "REJECTED",
            referred_status_briefing: req.body.reason,
        }
    }, (err, patient_updated) => {
        res.redirect("/cov_in_referral");
    });


});

//////////////////CENTER_DO///////////

app.get("/oxygenmanagement", auth, HasRole("CENTER_DO"), function (req, res) {

    Oxygen.find({
        "center.center_id":req.user.workplace
    }, (err, oxygen_data) => {
        res.render("CENTER_DO/oxygen_management",{
            element:req.user,

            oxygen_data:oxygen_data
        });
    });
});
app.post("/add_oxygen_data", auth, HasRole("CENTER_DO"), function (req, res) {
    Center.findOne({
        center_id:req.user.workplace
    }, (err, centers_list) => {
        // center: {
        //     type: Centerschema,
        // },
        // date: {
        //     type: String,
        // },
        // total_oxygen_used_yesterday: {
        //     type: Number,
        // },
        // total_oxygen_received_yesterday: {
        //     type: String,
        // },
        // total_oxygen_available: {
            const oxygen = new Oxygen({
                center: centers_list,
                date: req.body.date,
                total_oxygen_used_yesterday: req.body.total_oxygen_used_yesterday,
                total_oxygen_received_yesterday: req.body.total_oxygen_received_yesterday,
                total_oxygen_available: req.body.total_oxygen_available
               
            });
            oxygen.save();
            res.redirect("/oxygenmanagement")

    });

});



app.get("/activepatientlist_do", auth, HasRole("CENTER_DO"), function (req, res) {

    Patient.find({
        discharge_status: "ACTIVE",
        "active_bed_details.center_id": req.user.workplace
    }, (err, patients_list) => {
        res.render("CENTER_DO/active_patient_list", {
            element:req.user,

            patients_list: patients_list
            
        });
    });
});
app.get("/dischargedpatientlist_do", auth, HasRole("CENTER_DO"), function (req, res) {
    Patient.find({
        discharge_status: {
            $ne: "ACTIVE"
        },
        $or: [{
            "active_bed_details.center_id": req.user.workplace,
            "previous_bed_details.center_id": req.user.workplace

        }]

    }, (err, patients_list) => {
        res.render("CENTER_DO/d_patient_list", {
            element:req.user,

            patients_list: patients_list
        });
    });
});
app.get("/patientmanagement", auth, HasRole("CENTER_DO"), function (req, res) {
    Center.find({}, (err, centers_list) => {
        Sections.find({
            center_id: req.user.workplace
        }, (err, section_list) => {
            Referral.find({
                to_center_id: req.user.workplace
            }, (err, referral_list) => {
                Patient.find({
                    "active_bed_details.center_id": req.user.workplace
                }, (err, patients_list) => {
                    console.log(patients_list);
                    res.render(req.user.department + "/patient_management", {
                        element:req.user,

                        patients_list: patients_list,
                        section_list: section_list,
                        centers_list: centers_list,
                        referral_list: referral_list
                    });
                });
            });
        });
    });
});
app.post('/add_patient', auth, HasRole("CENTER_DO"), (req, res) => {
    console.log(req.body);
    Counter.findOneAndUpdate({
        counterFor: "PATIENT"
    }, {
        $inc: {
            'count': 1
        }
    }, {
        new: true,
        setDefaultsOnInsert: true
    }, (err, counterOut) => {
        if (err) {
            console.log(err);
            res.redirect("login");
        } else {
            Center.findOneAndUpdate({
                center_id: req.user.workplace
            }, {
                $push: {
                    active_patient_ids: {
                        patient_id: counterOut.prefix + counterOut.count,
                        bed_category: req.body.bed_category
                    }
                }
            }, (err, center_found) => {
                Sections.findOneAndUpdate({
                    section_id: req.body.section_id
                }, {
                    $push: {
                        active_patient_ids: {
                            patient_id: counterOut.prefix + counterOut.count,
                            bed_category: req.body.bed_category
                        }
                    }
                }, (err, section_found) => {
                    const patient = new Patient({
                        patient_id: counterOut.prefix + counterOut.count,
                        patient_name: req.body.patient_name.toUpperCase(),
                        age: req.body.age.toUpperCase(),
                        sex: req.body.sex.toUpperCase(),
                        s_d_w_of: req.body.s_d_w_of.toUpperCase(),
                        address: req.body.address.toUpperCase(),
                        village: req.body.village.toUpperCase(),
                        block: req.body.block.toUpperCase(),
                        telephone: req.body.telephone.toUpperCase(),
                        alt_telephone: req.body.alt_telephone.toUpperCase(),
                        covid_status: req.body.covid_status.toUpperCase(),
                        covid_report: req.body.covid_report.toUpperCase(),
                        co_morbidities: req.body.co_morbidities.toUpperCase(),
                        travel_history: req.body.travel_history.toUpperCase(),
                        positive_declare_date: req.body.positive_declare_date.toUpperCase(),
                        admission_date: req.body.admission_date.toUpperCase(),
                        referrals: req.body.referrals.toUpperCase(),
                        symptoms: req.body.symptoms.toUpperCase(),

                        previous_covid: req.body.previous_covid.toUpperCase(),
                        previous_covid_date: req.body.previous_covid_date.toUpperCase(),
                        vaccination: req.body.vaccination.toUpperCase(),
                        vaccination_date: req.body.vaccination_date.toUpperCase(),
                        swap_collection_date: req.body.swap_collection_date.toUpperCase(),
                        date_symptoms: req.body.date_symptoms.toUpperCase(),

                        "active_health_status.date": req.body.admission_date,
                        "active_health_status.time": "Admission",
                        "active_health_status.section_id": req.body.section_id.toUpperCase(),
                        "active_health_status.spo2": req.body.spo2,
                        "active_health_status.pulse": req.body.heart_rate,
                        "active_health_status.temperature": req.body.temp,
                        "active_health_status.bp": req.body.bp,
                        "active_health_status.condition": req.body.condition,

                        "health_status.date": [req.body.admission_date],
                        "health_status.time": ["Admission"],
                        "health_status.section_id": [req.body.section_id.toUpperCase()],
                        "health_status.spo2": [req.body.spo2],
                        "health_status.pulse": [req.body.heart_rate],
                        "health_status.temperature": [req.body.temp],
                        "health_status.bp": [req.body.bp],
                        "health_status.condition": [req.body.condition],

                        "active_bed_details.date": req.body.admission_date.toUpperCase(),
                        "active_bed_details.center_id": req.user.workplace.toUpperCase(),
                        "active_bed_details.section_id": req.body.section_id.toUpperCase(),
                        "active_bed_details.section_details": section_found.room_name + "-" + section_found.category,
                        "active_bed_details.center_details": center_found.facility_name + "-" + center_found.category + "-" + center_found.block,
                        "active_bed_details.bed_category": req.body.bed_category.toUpperCase(),
                        "active_bed_details.bed_no": req.body.bed_no.toUpperCase(),
                        discharge_status: "ACTIVE"
                    });
                    patient.save();
                });
            })
            res.redirect("/patientmanagement");
        }
    });
});
app.post('/discharge_patient', auth, HasRole("CENTER_DO"), (req, res) => {
    console.log(req.body);
    //   patient_id: 'GMCOVPAT10000008',
    //   patient_name: 'SIBASIAH PASUPALAK',
    //   discharge_status: 'DISCHARGED',
    //   discharge_date: '2021-04-30',
    //   discharge_brefing: 'on own wish'
    Patient.findOne({
        patient_id: req.body.patient_id
    }, (err, patient_found) => {
        if (err) {
            console.log(err);
            res.redirect("login");
        } else {
            Sections.findOneAndUpdate({
                section_id: patient_found.active_bed_details.section_id
            }, {
                $pull: {
                    active_patient_ids: {
                        patient_id: patient_found.patient_id
                    }
                }
            }, (err, section_found) => {});
            Center.findOneAndUpdate({
                center_id: patient_found.active_bed_details.center_id
            }, {
                $pull: {
                    active_patient_ids: {
                        patient_id: patient_found.patient_id
                    }
                }
            }, (err, center_found) => {})
            Patient.findOneAndUpdate({
                patient_id: req.body.patient_id
            }, {
                $set: {
                    "active_bed_details.date": "",
                    "active_bed_details.center_id": "",
                    "active_bed_details.section_id": "",
                    "active_bed_details.bed_no": "",
                    "active_bed_details.bed_category": "",
                    "active_bed_details.section_details": "",
                    "active_bed_details.center_details": "",
                    discharge_status: req.body.discharge_status,
                    discharge_brefing: req.body.discharge_brefing
                },
                $push: {
                    "previous_bed_details.start_date": patient_found.active_bed_details.date,
                    "previous_bed_details.end_date": req.body.discharge_date,
                    "previous_bed_details.center_id": patient_found.active_bed_details.center_id,
                    "previous_bed_details.bed_no": patient_found.active_bed_details.bed_no,
                    "previous_bed_details.bed_category": patient_found.active_bed_details.bed_category,
                    "previous_bed_details.section_id": patient_found.active_bed_details.section_id,
                    "previous_bed_details.section_details": section_found.room_name + "-" + section_found.category,
                    "previous_bed_details.center_details": center_found.facility_name + "-" + center_found.category + "-" + center_found.block,
                }
            }, (err, patient_updated) => {});


            res.redirect("/patientmanagement");
        }
    });
});
app.post('/add_health_record', auth, HasRole("CENTER_DO"), (req, res) => {
    console.log(req.body);
    //   patient_id: 'GMCOVPAT10000008',
    //   patient_name: 'SIBASIAH PASUPALAK',
    //   discharge_status: 'DISCHARGED',
    //   discharge_date: '2021-04-30',
    //   discharge_brefing: 'on own wish'
    Patient.findOne({
        patient_id: req.body.patient_id
    }, (err, patient_found) => {
        if (err) {
            console.log(err);
            res.redirect("login");
        } else {

            Patient.findOneAndUpdate({
                patient_id: req.body.patient_id
            }, {
                $set: {
                    "active_health_status.date": req.body.date,
                    "active_health_status.time": req.body.time,
                    "active_health_status.section_id": patient_found.active_bed_details.section_id,
                    "active_health_status.spo2": req.body.spo2,
                    "active_health_status.pulse": req.body.pulse,
                    "active_health_status.temperature": req.body.temperature,
                    "active_health_status.bp": req.body.bp,
                    "active_health_status.condition": req.body.condition,
                },
                $push: {
                    "health_status.date": req.body.date,
                    "health_status.time": req.body.time,
                    "health_status.section_id": patient_found.active_bed_details.section_id,
                    "health_status.spo2": req.body.spo2,
                    "health_status.pulse": req.body.pulse,
                    "health_status.temperature": req.body.temperature,
                    "health_status.bp": req.body.bp,
                    "health_status.condition": req.body.condition,
                }
            }, (err, patient_updated) => {});


            res.redirect("/patientmanagement");
        }
    });
});
app.post('/shift_patient_section', auth, HasRole("CENTER_DO"), (req, res) => {
    console.log(req.body);
    // patient_id: 'GMCOVPAT10000009',
    // patient_name: 'U',
    // date: '2021-04-23',
    // from_section_id: 'GMCOVSCTN10000002',
    // to_section_id: 'GMCOVSCTN10000002',
    // bed_no: '1'
    Patient.findOne({
        patient_id: req.body.patient_id
    }, (err, patient_found) => {
        if (err) {
            console.log(err);
            res.redirect("login");
        } else {
            // Sections.findOneAndUpdate({
            //     section_id: patient_found.active_bed_details.section_id
            // }, { $pull: { active_patient_ids: patient_found.patient_id } }, (err, from_section_found) => {
            // });


            Center.findOneAndUpdate({
                center_id: patient_found.active_bed_details.center_id
            }, {
                $pull: {
                    active_patient_ids: {
                        patient_id: patient_found.patient_id
                    }
                }
            }, (err, to_center_found) => {
                Center.findOneAndUpdate({
                    center_id: patient_found.active_bed_details.center_id
                }, {
                    $push: {
                        active_patient_ids: {
                            patient_id: patient_found.patient_id,
                            bed_category: req.body.bed_category
                        }
                    }
                }, (err, center_found) => {})

                Sections.findOneAndUpdate({
                    section_id: patient_found.active_bed_details.section_id
                }, {
                    $pull: {
                        active_patient_ids: {
                            patient_id: patient_found.patient_id
                        }
                    }
                }, (err, from_section_found) => {
                    // Sections.findOneAndUpdate({
                    //     section_id: req.body.to_section_id
                    // }, { $push: { active_patient_ids: patient_found.patient_id } }, (err, to_section_found) => {
                    Sections.findOneAndUpdate({
                        section_id: req.body.to_section_id
                    }, {
                        $push: {
                            active_patient_ids: {
                                patient_id: patient_found.patient_id,
                                bed_category: req.body.bed_category
                            }
                        }
                    }, (err, to_section_found) => {


                        Patient.findOneAndUpdate({
                            patient_id: req.body.patient_id
                        }, {
                            $set: {
                                "active_bed_details.date": req.body.date,
                                "active_bed_details.center_id": to_section_found.center_id,
                                "active_bed_details.section_id": req.body.to_section_id,
                                "active_bed_details.bed_no": req.body.bed_no,
                                "active_bed_details.section_details": to_section_found.room_name + "-" + to_section_found.category,
                                "active_bed_details.center_details": to_center_found.facility_name + "-" + to_center_found.category + "-" + to_center_found.block,
                                "active_bed_details.bed_category": req.body.bed_category,
                                discharge_status: "ACTIVE"
                            },
                            $push: {
                                "previous_bed_details.start_date": patient_found.active_bed_details.date,
                                "previous_bed_details.end_date": req.body.date,
                                "previous_bed_details.center_id": to_section_found.center_id,
                                "previous_bed_details.bed_no": patient_found.active_bed_details.bed_no,
                                "previous_bed_details.bed_category": patient_found.active_bed_details.bed_category,
                                "previous_bed_details.section_details": from_section_found.room_name + "-" + from_section_found.category,
                                "previous_bed_details.center_details": to_center_found.facility_name + "-" + to_center_found.category + "-" + to_center_found.block,
                                "previous_bed_details.section_id": patient_found.active_bed_details.section_id,
                            }
                        }, (err, patient_updated) => {});
                    });
                });
            });
            res.redirect("/patientmanagement");
        }
    });
});
app.post('/add_referral', auth, HasRole("CENTER_DO"), (req, res) => {
    console.log(req.body)
    Counter.findOneAndUpdate({
        counterFor: "REFERRAL"
    }, {
        $inc: {
            'count': 1
        }
    }, {
        new: true,
        setDefaultsOnInsert: true
    }, (err, counterOut) => {
        if (err) {
            console.log(err);
            res.redirect("login");
        } else {
            const referral = new Referral({
                referral_id: counterOut.prefix + counterOut.count,
                patient_id: req.body.patient_id,
                patient_name: req.body.patient_name.toUpperCase(),
                referral_date: req.body.date.toUpperCase(),
                from_center_id: req.body.from_center_id.toUpperCase(),
                to_center_id: req.body.to_center_id.toUpperCase(),
                urgency: req.body.urgency.toUpperCase(),
                referred_by: req.body.referred_by.toUpperCase(),
                referred_briefing: req.body.referred_briefing.toUpperCase(),
                referred_status: "ACTIVE",
                bed_category: req.body.bed_category
            });
            referral.save();
            res.redirect("/patientmanagement");
        }
    });
});
app.get("/in-referralsmanagement-api", auth, function (req, res) {
    if(req.user.department==="CENTER_DO"){ res.redirect("in-referralsmanagement");}
    if(req.user.department==="COVID_CELL"){res.redirect("cov_in_referral");}
});


app.get("/in-referralsmanagement", auth, HasRole("CENTER_DO"), function (req, res) {
    Center.findOne({
        center_id: req.user.workplace
    }, (err, center_details) => {
        if (center_details.category === "DCHC") {
            Referral.find({
                $or: [{
                    to_center_id: req.user.workplace,
                    to_center_id: "ALL_BY_RRT"
                }]
            }, (err, referral_list) => {
                console.log(referral_list);
                res.render(req.user.department + "/incoming_referrals_management", {
                    element:req.user,

                    referral_list: referral_list
                });
            });
        } else {
            Referral.find({

                to_center_id: req.user.workplace
            }, (err, referral_list) => {
                console.log(referral_list);
                res.render(req.user.department + "/incoming_referrals_management", {
                    element:req.user,

                    referral_list: referral_list
                });
            });
        }
    });

});
app.get("/out-referralsmanagement", auth, HasRole("CENTER_DO"), function (req, res) {
    Referral.find({
        from_center_id: req.user.workplace
    }, (err, referral_list) => {
        console.log(referral_list);
        res.render(req.user.department + "/outgoing_referrals_management", {
            element:req.user,

            referral_list: referral_list
        });
    });
});
app.post('/accept_referral', auth, HasRole("CENTER_DO"), (req, res) => {
    console.log(req.body)
    Referral.findOneAndUpdate({
        referral_id: req.body.referral_id
    }, {
        $set: {
            referred_status: "ACCEPTED",
            referred_status_briefing: req.body.notes,
            referred_approval_bed: req.body.bed_number
        }
    }, (err, patient_updated) => {
        console.log(patient_updated)
        res.redirect("/referralsmanagement");
    });

});
app.post('/accept_referral_rrt', auth, HasRole("CENTER_DO"), (req, res) => {
    console.log(req.body)
    Referral.findOneAndUpdate({
        referral_id: req.body.referral_id
    }, {
        $set: {
            referred_status: "ACCEPTED",
            referred_status_briefing: req.body.notes,
            referred_approval_bed: req.body.bed_number,
            to_center_id: req.user.workplace,
        }
    }, (err, patient_updated) => {
        console.log(patient_updated)
        res.redirect("/referralsmanagement");
    });

});
app.post('/reject_referral', auth, HasRole("CENTER_DO"), (req, res) => {
    Referral.findOneAndUpdate({
        referral_id: req.body.referral_id
    }, {
        $set: {
            referred_status: "REJECTED",
            referred_status_briefing: req.body.reason,
        }
    }, (err, patient_updated) => {
        res.redirect("/referralsmanagement");
    });


});
app.post('/discharge_referral', auth, HasRole("CENTER_DO"), (req, res) => {
    console.log(req.body);
    //   patient_id: 'GMCOVPAT10000008',
    //   patient_name: 'SIBASIAH PASUPALAK',
    //   discharge_status: 'DISCHARGED',
    //   discharge_date: '2021-04-30',
    //   discharge_brefing: 'on own wish'
    Referral.findOneAndUpdate({
        referral_id: req.body.referral_id
    }, {
        $set: {
            referred_status: "SHIFTING"
        }
    }, (err, found_referral) => {
        Patient.findOne({
            patient_id: found_referral.patient_id
        }, (err, patient_found) => {
            if (err) {
                console.log(err);
                res.redirect("login");
            } else {
                Sections.findOneAndUpdate({
                    section_id: patient_found.active_bed_details.section_id
                }, {
                    $pull: {
                        active_patient_ids: {
                            patient_id: patient_found.patient_id
                        }
                    }
                }, (err, section_found) => {});
                Center.findOneAndUpdate({
                    center_id: patient_found.active_bed_details.center_id
                }, {
                    $pull: {
                        active_patient_ids: {
                            patient_id: patient_found.patient_id
                        }
                    }
                }, (err, center_found) => {})
                Patient.findOneAndUpdate({
                    patient_id: found_referral.patient_id
                }, {
                    $set: {
                        "active_bed_details.date": "",
                        "active_bed_details.center_id": "",
                        "active_bed_details.section_id": "",
                        "active_bed_details.bed_no": "",
                        "active_bed_details.bed_category": "",
                        "active_bed_details.section_details": "",
                        "active_bed_details.center_details": "",

                        discharge_status: "REFERRED",
                        discharge_brefing: req.body.notes
                    },
                    $push: {
                        "previous_bed_details.start_date": patient_found.active_bed_details.date,
                        "previous_bed_details.end_date": req.body.date,
                        "previous_bed_details.center_id": patient_found.active_bed_details.center_id,
                        "previous_bed_details.bed_no": patient_found.active_bed_details.bed_no,
                        "previous_bed_details.bed_category": patient_found.active_bed_details.bed_category,
                        "previous_bed_details.section_details": patient_found.active_bed_details.section_details,
                        "previous_bed_details.center_details": patient_found.active_bed_details.section_details,
                        "previous_bed_details.section_id": patient_found.active_bed_details.section_id,
                    }
                }, (err, patient_updated) => {});


                res.redirect("/referralsmanagement");
            }
        });
    });



});
app.post('/admit_patient_referral', auth, HasRole("CENTER_DO"), (req, res) => {
    console.log(req.body);
    Referral.findOneAndUpdate({
        referral_id: req.body.referral_id
    }, {
        $set: {
            referred_status: "SERVED"
        }
    }, (err, referral_found) => {
        Sections.findOneAndUpdate({
            section_id: req.body.section_id
        }, {
            $push: {
                active_patient_ids: {
                    patient_id: referral_found.patient_id,
                    bed_category: req.body.bed_category
                }
            }
        }, (err, to_section_found) => {
            Center.findOneAndUpdate({
                center_id: req.user.workplace
            }, {
                $push: {
                    active_patient_ids: {
                        patient_id: referral_found.patient_id,
                        bed_category: req.body.bed_category
                    }
                }
            }, (err, to_center_found) => {
                Patient.findOneAndUpdate({
                    patient_id: referral_found.patient_id
                }, {
                    $set: {
                        admission_date: req.body.admission_date.toUpperCase(),
                        "active_bed_details.date": req.body.admission_date.toUpperCase(),
                        "active_bed_details.center_id": req.user.workplace.toUpperCase(),
                        "active_bed_details.section_id": req.body.section_id.toUpperCase(),
                        "active_bed_details.bed_category": req.body.bed_category.toUpperCase(),
                        "active_bed_details.bed_no": req.body.bed_no.toUpperCase(),
                        "active_bed_details.section_details": to_section_found.room_name + "-" + to_section_found.category,
                        "active_bed_details.center_details": to_center_found.facility_name + "-" + to_center_found.category + "-" + to_center_found.block,
                        discharge_status: "ACTIVE"
                    }
                }, (err, patient_updated) => {});
            })
        });
    });

    res.redirect("/patientmanagement");

});
app.post('/notshown_patient_referral', auth, HasRole("CENTER_DO"), (req, res) => {
    console.log(req.body);
    Referral.findOneAndUpdate({
        referral_id: req.body.referral_id
    }, {
        $set: {
            referred_status: "NOT_SHOWN"
        }
    }, (err, referral_found) => {
        Patient.findOneAndUpdate({
            patient_id: referral_found.patient_id
        }, {
            $set: {
                discharge_status: "NOT_SHOWN",
                discharge_brefing: req.body.discharge_brefing,
            }
        }, (err, patient_updated) => {});

    })
    res.redirect("/patientmanagement");

});
app.get("/sectionmanagement", auth, HasRole("CENTER_DO"), function (req, res) {
    // Center.find({}, (err, centers_list) => {
    Sections.find({
        center_id: req.user.workplace
    }, (err, section_list) => {
        res.render(req.user.department + "/section_management", {
            element:req.user,

            section_list: section_list,
        });
        //  });
    });
});
app.post('/add_section', auth, HasRole("CENTER_DO"), (req, res) => {
    console.log(req.body);
    Counter.findOneAndUpdate({
        counterFor: "SECTION"
    }, {
        $inc: {
            'count': 1
        }
    }, {
        new: true,
        setDefaultsOnInsert: true
    }, (err, counterOut) => {
        if (err) {
            console.log(err);
            res.redirect("login");
        } else {
            Center.findOne({
                center_id: req.user.workplace
            }, (err, center_details) => {
                const section = new Sections({
                    section_id: counterOut.prefix + counterOut.count,
                    center_id: req.user.workplace,
                    center_details: center_details.facility_name + "-" + center_details.category + "-" + center_details.block,
                    category: req.body.category.toUpperCase(),
                    floor: req.body.floor.toUpperCase(),
                    room_name: req.body.room_name.toUpperCase(),
                    no_of_general_beds: req.body.no_of_general_beds.toUpperCase(),
                    no_of_oxygen_beds: req.body.no_of_oxygen_beds.toUpperCase(),
                    no_of_icu_beds: req.body.no_of_icu_beds.toUpperCase(),
                    no_of_ventilator_beds: req.body.no_of_ventilator_beds.toUpperCase(),
                    incharge_name: req.body.incharge_name.toUpperCase(),
                    telephone: req.body.telephone.toUpperCase(),
                    no_hdu_beds: req.body.no_hdu_beds,
                    no_isolation_beds: req.body.no_isolation_beds
                });
                section.save();

            });

            res.redirect("/sectionmanagement");
        }
    });
});

app.post('/edit_section', auth, HasRole("CENTER_DO"), (req, res) => {
    console.log(req.body);
    Counter.findOneAndUpdate({
        counterFor: "SECTION"
    }, {
        $inc: {
            'count': 1
        }
    }, {
        new: true,
        setDefaultsOnInsert: true
    }, (err, counterOut) => {
        if (err) {
            console.log(err);
            res.redirect("login");
        } else {
            Center.findOne({
                center_id: req.user.workplace
            }, (err, center_details) => {
                Section.findOneAndUpdate({
                    section_id:req.body.section_id
                },{
                    $set: {
                        category: req.body.category.toUpperCase(),
                        floor: req.body.floor.toUpperCase(),
                        room_name: req.body.room_name.toUpperCase(),
                        no_of_general_beds: req.body.no_of_general_beds.toUpperCase(),
                        no_of_oxygen_beds: req.body.no_of_oxygen_beds.toUpperCase(),
                        no_of_icu_beds: req.body.no_of_icu_beds.toUpperCase(),
                        no_of_ventilator_beds: req.body.no_of_ventilator_beds.toUpperCase(),
                        incharge_name: req.body.incharge_name.toUpperCase(),
                        telephone: req.body.telephone.toUpperCase(),
                        no_hdu_beds: req.body.no_hdu_beds,
                        no_isolation_beds: req.body.no_isolation_beds                    }
                }, (err, section_details) => {
                
            });
            });

            res.redirect("/sectionmanagement");
        }
    });
});
app.get("/apidata_patient/:patient_id/:field", auth, HasRole("CENTER_DO"), function (req, res) {
    Section.findOneAndUpdate({
        section_id:req.params.section_id
    }, (err, section_details) => {
        if(section_details && req.paramas.field){
        res.json({ 
            data: section_details.req.paramas.field
        });}
        else{
            res.sendStatus(2022);
        }
    });
});
app.get("/center-do-home", auth, HasRole("CENTER_DO"), function (req, res) {
    Patient.find({
        "active_bed_details.center_id": req.user.workplace
    }, async (err, patients_list) => {

        console.log(patients_list)
        var active_patient = 0,
            discharged_patient = 0,
            death = 0,
            total_patient = patients_list.length,
            referred = 0;


        for (let index = 0; index < patients_list.length; index++) {
            const element = patients_list[index];


            if (element.discharge_status.toUpperCase().trim() === "DISCHARGED") {
                discharged_patient++;
            }
            if (element.discharge_status.toUpperCase().trim() === "ACTIVE") {
                active_patient++;
            }
            if (element.discharge_status.toUpperCase().trim() === "DEATH") {
                death++;
            }
            if (element.discharge_status.toUpperCase().trim() === "REFEREED" || element.discharge_status.toUpperCase().trim() === "SHIFTING") {
                referred++;
            }


        }
        var header_data = {
            total_patient: total_patient,
            active_patient: active_patient,
            discharged_patient: discharged_patient,
            referred: referred,
            death: death

        }


        Center.find({
            center_id: req.user.workplace
        }, async (err, centers_list) => {

            hospital_list = [{
                hospital: Centerschema,
                total_available_bed: Number,
                total_occupied_bed: Number,
                total_oxygen_bed_available: Number,
                total_oxygen_bed_occupied: Number,
                total_general_bed_available: Number,
                total_general_bed_occupied: Number,
                total_icu_bed_available: Number,
                total_icu_bed_occupied: Number,
                total_ventilator_bed_available: Number,
                total_ventilator_bed_occupied: Number,
            }];
            for (let index = 0; index < centers_list.length; index++) {
                const element = centers_list[index];
                console.log(element)
                var GENERAL_BED_COUNT = 0,
                    OXYGEN_BED_COUNT = 0,
                    ICU_BED_COUNT = 0,
                    VENTILATOR_BED_COUNT = 0;
                for (let j = 0; j < element.active_patient_ids.length; j++) {
                    const bed_d = element.active_patient_ids[j];
                    if (bed_d.bed_category === "GENERAL_BED") {
                        GENERAL_BED_COUNT++;
                    }
                    if (bed_d.bed_category === "OXYGEN_BED") {
                        OXYGEN_BED_COUNT++;
                    }
                    if (bed_d.bed_category === "ICU_BED") {
                        ICU_BED_COUNT++;
                    }
                    if (bed_d.bed_category === "VENTILATOR_BED") {
                        VENTILATOR_BED_COUNT++;
                    }

                }
                // no_general_bed: 100,
                // no_oxygen_bed: 50,
                // no_icu_bed: 30,
                // no_ventilator: 10,
                hospital_list.push({
                    hospital: element,
                    total_bed_available: Number(element.no_general_bed + element.no_oxygen_bed + element.no_icu_bed + element.no_ventilator),
                    total_bed_occupied: element.active_patient_ids.length,
                    total_oxygen_bed_available: element.no_oxygen_bed,
                    total_oxygen_bed_occupied: OXYGEN_BED_COUNT,
                    total_general_bed_available: element.no_general_bed,
                    total_general_bed_occupied: GENERAL_BED_COUNT,
                    total_icu_bed_available: element.no_icu_bed,
                    total_icu_bed_occupied: ICU_BED_COUNT,
                    total_ventilator_bed_available: element.no_ventilator,
                    total_ventilator_bed_occupied: VENTILATOR_BED_COUNT,
                    hospital_category: element.category,
                });

            }
            hospital_list.shift();
            console.log(hospital_list);

            var total_hospital_data = {
                total_bed_available: 0,
                total_bed_occupied: 0,
                total_oxygen_bed_available: 0,
                total_oxygen_bed_occupied: 0,
                total_icu_bed_available: 0,
                total_icu_bed_occupied: 0,
                total_general_bed_available: 0,
                total_general_bed_occupied: 0,
                total_ventilator_bed_available: 0,
                total_ventilator_bed_occupied: 0,
            };

            for (let index = 0; index < hospital_list.length; index++) {
                const element__ = hospital_list[index];
                total_hospital_data.total_bed_available += element__.total_bed_available;
                total_hospital_data.total_bed_occupied += element__.total_bed_occupied;
                total_hospital_data.total_oxygen_bed_available += element__.total_oxygen_bed_available;
                total_hospital_data.total_oxygen_bed_occupied += element__.total_oxygen_bed_occupied;
                total_hospital_data.total_general_bed_available += element__.total_general_bed_available;
                total_hospital_data.total_general_bed_occupied += element__.total_general_bed_occupied;
                total_hospital_data.total_icu_bed_available += element__.total_icu_bed_available;
                total_hospital_data.total_icu_bed_occupied += element__.total_icu_bed_occupied;
                total_hospital_data.total_ventilator_bed_available += element__.total_ventilator_bed_available;
                total_hospital_data.total_ventilator_bed_occupied += element__.total_ventilator_bed_occupied;

            }




            Sections.find({
                center_id: req.user.workplace
            }, async (err, sections_list) => {

                _section_list = [{
                    hospital: Centerschema,
                    section: Sectionschema,
                    total_available_bed: Number,
                    total_occupied_bed: Number,
                    total_oxygen_bed_available: Number,
                    total_oxygen_bed_occupied: Number,
                    total_general_bed_available: Number,
                    total_general_bed_occupied: Number,
                    total_icu_bed_available: Number,
                    total_icu_bed_occupied: Number,
                    total_ventilator_bed_available: Number,
                    total_ventilator_bed_occupied: Number,
                }];
                for (let index = 0; index < sections_list.length; index++) {
                    const element = sections_list[index];
                    console.log(element)
                    var GENERAL_BED_COUNT = 0,
                        OXYGEN_BED_COUNT = 0,
                        ICU_BED_COUNT = 0,
                        VENTILATOR_BED_COUNT = 0;
                    for (let j = 0; j < element.active_patient_ids.length; j++) {
                        const bed_d = element.active_patient_ids[j];
                        if (bed_d.bed_category === "GENERAL_BED") {
                            GENERAL_BED_COUNT++;
                        }
                        if (bed_d.bed_category === "OXYGEN_BED") {
                            OXYGEN_BED_COUNT++;
                        }
                        if (bed_d.bed_category === "ICU_BED") {
                            ICU_BED_COUNT++;
                        }
                        if (bed_d.bed_category === "VENTILATOR_BED") {
                            VENTILATOR_BED_COUNT++;
                        }

                    }
                    // no_general_bed: 100,
                    // no_oxygen_bed: 50,
                    // no_icu_bed: 30,
                    // no_ventilator: 10,
                    _section_list.push({
                        hospital: centers_list,
                        section: element,
                        total_bed_available: Number(element.no_of_general_beds + element.no_of_oxygen_beds + element.no_of_icu_beds + element.no_of_ventilator_beds),
                        total_bed_occupied: element.active_patient_ids.length,
                        total_oxygen_bed_occupied: OXYGEN_BED_COUNT,
                        total_general_bed_occupied: GENERAL_BED_COUNT,
                        total_icu_bed_occupied: ICU_BED_COUNT,
                        total_ventilator_bed_occupied: VENTILATOR_BED_COUNT,
                    });

                }
                _section_list.shift();
                console.log(_section_list);


                res.render("CENTER_DO/hospital_dashboard", {
                    element:req.user,

                    header_data: header_data,
                    hospital_list: hospital_list,
                    section_list: _section_list,
                    total_hospital_data: total_hospital_data,




                });
            });
        });
    });

});

//////////////////RRT_TEAM///////////

app.get("/rrt-home", auth, HasRole("RRT"), function (req, res) {
    Referral.find({
        rrt_id: req.user.UserID

    }, (err, referral_list) => {
        console.log(referral_list);
        res.render("RRT/hospital_dashboard", {
            element:req.user,

            referral_list: referral_list
        });
    });
});
app.get("/served-referrals-rrt", auth, HasRole("RRT"), function (req, res) {
    Referral.find({
        rrt_id: req.user.UserID

    }, (err, referral_list) => {
        console.log(referral_list);
        res.render("RRT/hospital_dashboard_2", {
            element:req.user,

            referral_list: referral_list
        });
    });
});

app.post('/add_patient_referral_rrt', auth, HasRole("RRT"), (req, res) => {
    console.log(req.body);
    Counter.findOneAndUpdate({
        counterFor: "PATIENT"
    }, {
        $inc: {
            'count': 1
        }
    }, {
        new: true,
        setDefaultsOnInsert: true
    }, (err, counterOut) => {
        if (err) {
            console.log(err);
            res.redirect("login");
        } else {
            const patient = new Patient({
                patient_id: counterOut.prefix + counterOut.count,
                patient_name: req.body.patient_name.toUpperCase(),
                age: req.body.age.toUpperCase(),
                sex: req.body.sex.toUpperCase(),
                s_d_w_of: req.body.s_d_w_of.toUpperCase(),
                address: req.body.address.toUpperCase(),
                village: req.body.village.toUpperCase(),
                block: req.body.block.toUpperCase(),
                telephone: req.body.telephone.toUpperCase(),
                alt_telephone: req.body.alt_telephone.toUpperCase(),
                covid_status: req.body.covid_status.toUpperCase(),
                covid_report: req.body.covid_report.toUpperCase(),
                co_morbidities: req.body.co_morbidities.toUpperCase(),
                travel_history: req.body.travel_history.toUpperCase(),
                positive_declare_date: req.body.positive_declare_date.toUpperCase(),
                // admission_date: req.body.admission_date.toUpperCase(),
                referrals: req.body.referrals.toUpperCase(),

                // "active_bed_details.date": req.body.admission_date.toUpperCase(),
                // "active_bed_details.center_id": req.user.workplace.toUpperCase(),
                // "active_bed_details.section_id": req.body.section_id.toUpperCase(),
                // "active_bed_details.bed_category": req.body.bed_category.toUpperCase(),
                // "active_bed_details.bed_no": req.body.bed_no.toUpperCase(),
                symptoms: req.body.symptoms,
                "active_health_status.date": req.body.admission_date,
                "active_health_status.time": "Admission",
                "active_health_status.section_id": "",
                "active_health_status.spo2": req.body.spo2,
                "active_health_status.pulse": req.body.heart_rate,
                "active_health_status.temperature": req.body.temp,
                "active_health_status.bp": req.body.bp,
                "active_health_status.condition": req.body.condition,

                "health_status.date": [req.body.admission_date],
                "health_status.time": ["Admission"],
                "health_status.section_id": [""],
                "health_status.spo2": [req.body.spo2],
                "health_status.pulse": [req.body.heart_rate],
                "health_status.temperature": [req.body.temp],
                "health_status.bp": [req.body.bp],
                "health_status.condition": [req.body.condition],
                discharge_status: "REFERRED"
            });
            patient.save();

            Counter.findOneAndUpdate({
                counterFor: "REFERRAL"
            }, {
                $inc: {
                    'count': 1
                }
            }, {
                new: true,
                setDefaultsOnInsert: true
            }, (err, counterOut_) => {
                if (err) {
                    console.log(err);
                    res.redirect("login");
                } else {
                    const referral = new Referral({
                        referral_id: counterOut_.prefix + counterOut_.count,
                        patient_id: counterOut.prefix + counterOut.count,
                        patient_name: req.body.patient_name.toUpperCase(),
                        referral_date: req.body.admission_date.toUpperCase(),
                        from_center_id: "RRT",
                        to_center_id: "ALL_BY_RRT",
                        urgency: req.body.urgency.toUpperCase(),
                        referred_by: req.user.UserID,
                        referred_briefing: req.body.referrals.toUpperCase(),
                        referred_status: "ACTIVE",
                        bed_category: req.body.bed_category,
                        hospital_category: req.body.hospital_category,
                        rrt_id: req.user.UserID
                    });
                    referral.save();
                    // res.redirect("/patientmanagement");
                }
            });

            res.redirect("/home");
        }
    });
});
app.post('/discharge_referral_rrt', auth, HasRole("RRT"), (req, res) => {
    console.log(req.body);
    //   patient_id: 'GMCOVPAT10000008',
    //   patient_name: 'SIBASIAH PASUPALAK',
    //   discharge_status: 'DISCHARGED',
    //   discharge_date: '2021-04-30',
    //   discharge_brefing: 'on own wish'
    Referral.findOneAndUpdate({
        referral_id: req.body.referral_id
    }, {
        $set: {
            referred_status: "SHIFTING"
        }
    }, (err, found_referral) => {
        Patient.findOne({
            patient_id: found_referral.patient_id
        }, (err, patient_found) => {
            if (err) {
                console.log(err);
                res.redirect("login");
            } else {

                Patient.findOneAndUpdate({
                    patient_id: found_referral.patient_id
                }, {
                    $set: {

                        discharge_status: "REFERRED",
                        discharge_brefing: req.body.notes
                    }

                }, (err, patient_updated) => {});


                res.redirect("/home");
            }
        });
    });



});
///////////TECEADS/////

app.get("/patientdetails/:patient_id", function (req, res) {

    Patient.findOne({
        patient_id: req.params.patient_id
    }, (err, patients_details) => {
        if (patients_details) {
            Center.findOne({
                center_id: patients_details.active_bed_details.center_id
            }, (err, center_details) => {
                if (1) {

                    Referral.find({
                        patient_id: req.params.patient_id
                    }, (err, referrals_details) => {
                        if (1) {
                            res.render("COVID_CELL/patient_details", {
                                element:req.user,

                                patients_details: patients_details,
                                referral_list: referrals_details,
                                center_details: center_details
                            });
                        } else {
                            res.redirect("/home")
                        }
                    });
                } else {
                    res.redirect("/home")
                }
            });
        } else {
            res.redirect("/home")
        }
    });
});


app.get("/referralsmanagement", auth, HasRole("TECEADS"), function (req, res) {
    Referral.find({}, (err, referral_list) => {
        console.log(referral_list);
        res.render(req.user.department + "/incoming_referrals_management", {
            element:req.user,

            referral_list: referral_list
        });
    });
});

function HasRole(role) {
    return function (req, res, next) {
        if (role === req.user.department || req.user.department === "TECEADS") {
            return next();
        } else {
            res.redirect("/");
        }
    }
}

app.get("/noti-api", function (req, res) {

    if (req.isAuthenticated && req.user) {
        console.log(req.user);

        console.log("rcede");


        //inreferral centerdo
        if (req.user.department === "CENTER_DO") {
            Center.findOne({
                center_id: req.user.workplace
            }, (err, center_details) => {
                if (center_details.category === "DCHC") {
                    Referral.find({
                        $or: [{
                            to_center_id: req.user.workplace,
                            to_center_id: "ALL_BY_RRT"
                        }],
                        referred_status:"ACTIVE"
                    }, (err, referral_list) => {
                        console.log(referral_list.length);
                        res.json({
                            "action": '',
                            "referral_count":referral_list.length
                        })
                    });
                } else {
                    Referral.find({

                        to_center_id: req.user.workplace,
                        referred_status:"ACTIVE"

                    }, (err, referral_list) => {
                        console.log(referral_list.length);
                        res.json({
                            "action": '',
                            "referral_count":referral_list.length
                        })
                    });
                }
            });
        }
        if (req.user.department === "COVID_CELL") {
                Referral.find({

                    to_center_id: "ALL_BY_RRT",
                    hospital_category: {
                        $ne: "DCHC"
                    },
                    referred_status:"ACTIVE"



                }, (err, referral_list) => {
                    console.log(referral_list.length);
                    res.json({
                        action: '',
                        "referral_count":referral_list.length
                    })
            });
        }


    } else {
        res.json({
            action: 'logout'
        })

    }

})


function auth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.render("login");

    }
}




app.listen(7087, function () {
    console.log("Server is on port on 7087");
});