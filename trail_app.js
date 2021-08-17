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

const db = require("./db");



const userSchema = new mongoose.Schema({
    UserID: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    workplace: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
    },
    department: {
        type: String,
        required: true
    },
    designation: {
        type: String
    },
    username: {
        type: String,
        required: true,
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
        required: true,
        unique: true
    },
    prefix: {
        type: String,
        required: true,
        unique: true
    },
    count: Number,
    Status: String
});

const Counter = new mongoose.model("counters", Counterschema);


const Centerschema = new mongoose.Schema({
    center_id: {
        type: String,
        required: true,
        unique: true
    },
    facility_name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    telephone: {
        type: String,
    },
    village: {
        type: String,
        required: true,
    },
    block: {
        type: String,
        required: true,
    },
    no_general_bed: {
        type: Number,
        required: true,
    },
    no_oxygen_bed: {
        type: Number,
        required: true,
    },
    no_icu_bed: {
        type: Number,
        required: true,
    },
    no_ventilator: {
        type: Number,
        required: true,
    },
    section:{
        section_id:String,
        hospital_id:String,
        floor:String,
        room_name:String,
        room_category:String,
        no_of_general_beds:String,
        no_of_oxygen_beds:String,
        no_of_icu_beds:String,
        no_of_ventilators:String,
    },
    active_patient_ids:[String]

});
const Center = new mongoose.model("centers", Centerschema);
const Patientschema = new mongoose.Schema({
    patient_id: {
        type: String,
        required: true,
        unique: true
    },
    patient_name: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        required: true,

    },
    s_d_w_of: {
        type: String,
        required: true,

    },
    address: {
        type: String,
        required: true,
    },
    village: {
        type: String,
        required: true,
    },
    block: {
        type: String,
        required: true,
    },
    telephone: {
        type: String,
        required: true,
    },
    alt_telephone: {
        type: String,
        required: true,
    },
    covid_status: {
        type: String,
        required: true,
    },
    covid_report: {
        type: String,
        required: true,
    },
    positive_declare_date: {
        type: String,
        required: true,
    },
    co_morbidities: {
        type: String,
        required: true,
    },
    travel_history: {
        type: String,
        required: true,
    },
    admission_date: {
        type: String,
        required: true,
    },
    referrals: {
        type: String,
    },
    health_status: {
        date:[String],
        time:[String],
        section_id:[String],
        bp:[String],
        spo2:[String],
        pulse:[String],
        temperature:[String],
        condition:[String]
    },
    active_bed_details:{
        date:String,
        center_id:String,
        section_id:String,
        bed_no:String
    },
    previous_bed_details:{
        start_date:[String],
        end_date:[String],
        center_id:[String],
        bed_no:[String],
        section_id:[String]
    },
    discharge_status:String,
    discharge_brefing:String



});
const Patient = new mongoose.model("patients", Patientschema);


const Sectionschema = new mongoose.Schema({
        section_id:{
            type:String,
            required: true,
            unique: true
        },
        center_id:{
            type:String,
            required: true
        },
        floor:{
            type:String,
            required: true,
        },
        room_name:{
            type:String,
            required: true,
        },
        category:{
            type:String,
            required: true,
        },
        no_of_beds:{
            type:Number,
            required: true,
        },
        no_of_ventilators:{
            type:Number,
            required: true,
        },
        incharge_name:{
            type:String,
            required: true,
        },
        telephone:{
            type:String,
            required: true,
        },
        active_patient_ids:[String]
        
});



const Sections = new mongoose.model("sections", Sectionschema);

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
        type: Date,
    },
    present_status: {
        type: String,
    }

});
const Report_Patient = new mongoose.model("report_patients", report_Patientschema);

const referral_schema = new mongoose.Schema({
    referral_id: {
        type: String,
        required: true,
        unique: true
        
    },
    patient_id: {
        type: String,
        required: true,
    },
    patient_name: {
        type: String,
        required: true,

    },
    referral_date: {
        type: String,
        required: true,

    },
    from_center_id: {
        type: String,
        required: true,
    },
    to_center_id: {
        type: String,
        required: true,
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
    referred_status_briefing: {
        type: String,
    },
    referred_approval_bed: {
        type: String,
    },
    date:{
        type:Date,
        default:Date.now()
    }

});
const Referral = new mongoose.model("referrals", referral_schema);


app.get('/startserver', (req, res) => {

    // const counter1=new Counter({
    //     counterFor:"ADMIN",
    //     prefix: "GMCOVADT",
    //     count: 990
    // });
    // counter1.save();

    // const counter2=new Counter({
    //     counterFor:"COVID_CELL",
    //     prefix: "GMCOVCOCLDT",
    //     count: 999
    // });
    // counter2.save();

    // const counter3=new Counter({
    //     counterFor:"CENTERS",
    //     prefix: "GMCOVCENTER",
    //     count: 999
    // });
    // counter3.save();


    // const counter4=new Counter({
    //     counterFor:"CENTER_DO",
    //     prefix: "GMCOVCENDO",
    //     count: 999
    // });
    // counter4.save();


    // const counter5=new Counter({
    //     counterFor:"PATIENT",
    //     prefix: "GMCOVPAT",
    //     count: 9999999
    // });
    // counter5.save();

    // const counter6=new Counter({
    //     counterFor:"SECTION",
    //     prefix: "GMCOVSCTN",
    //     count: 9999999
    // });
    // counter6.save();
    //  const counter7=new Counter({
    //     counterFor:"REFERRAL",
    //     prefix: "GMCOVRFL",
    //     count: 9999999
    // });
    // counter7.save();
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
    //                     res.redirect("/");
    //             });
    //             console.log("User added");
    // }, 2000);
});
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/login");
});
app.get("/", function (req, res) {
    res.render("login");
});


app.get("/index1", function (req, res) {
    res.render("TECEADS/covid_dashboard");
});
app.get("/index2", function (req, res) {
    res.render("TECEADS/index");
});



app.get("/usermanagement", function (req, res) {
    Center.find({}, (err, centers_list) => {
        console.log(centers_list);
        User.find({}, (err, users_list) => {
            console.log(users_list);
            res.render("TECEADS/user_management", {
                users_list: users_list,
                centers_list: centers_list
            });
        });
    });
});
app.post('/signup', (req, res) => {
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
            User.register(new User({
                UserID: counterOut.prefix + counterOut.count,
                name: req.body.name.toUpperCase(),
                workplace: req.body.workplace.toUpperCase(),
                phonenumber: req.body.phonenumber,
                department: req.body.department.toUpperCase(),
                designation: req.body.designation.toUpperCase(),
                username: req.body.username.toLowerCase(),
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


        }
    });
});
app.get("/centermanagement", function (req, res) {
    Center.find({}, (err, centers_list) => {
        console.log(centers_list);
        res.render("TECEADS/center_management", {
            centers_list: centers_list
        });
    });
});
app.post('/add_center', (req, res) => {
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
                no_ventilator: req.body.no_ventilator
            });
            center.save();
            res.redirect("/centermanagement");
        }
    });
});
app.get("/patientmanagement", function (req, res) {
    Center.find({}, (err, centers_list) => {
        Sections.find({}, (err, section_list) => {
            Referral.find({}, (err, referral_list) => {
                Patient.find({}, (err, patients_list) => {
                    console.log(patients_list);
        res.render("TECEADS/patient_management", {
            patients_list: patients_list,
            section_list: section_list,
            centers_list: centers_list,
            referral_list:referral_list
        });
    });
});
});
});
});
app.post('/add_patient', (req, res) => {
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
                admission_date: req.body.admission_date.toUpperCase(),
                referrals: req.body.referrals.toUpperCase(),
                "active_bed_details.date": req.body.admission_date.toUpperCase(),
                "active_bed_details.center_id": req.body.center_id.toUpperCase(),
                "active_bed_details.section_id": req.body.section_id.toUpperCase(),
                "active_bed_details.bed_no": req.body.bed_no.toUpperCase(),
                discharge_status:"ACTIVE"
                
            });
            patient.save();

            Sections.findOneAndUpdate({
                section_id: req.body.section_id
            }, { $push: { active_patient_ids: counterOut.prefix + counterOut.count } }, (err, section_found) => {
                
            });
            Center.findOneAndUpdate({
                center_id: req.body.center_id
            }, { $push: { active_patient_ids: counterOut.prefix + counterOut.count } }, (err, center_found) => {
                
            })

            res.redirect("/patientmanagement");
        }
    });
});
app.post('/discharge_patient', (req, res) => {
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
            }, { $pull: { active_patient_ids: patient_found.patient_id } }, (err, section_found) => {
                
            });
            Center.findOneAndUpdate({
                center_id: patient_found.active_bed_details.center_id
            }, { $pull: { active_patient_ids: patient_found.patient_id } }, (err, center_found) => {
                
            })

            Patient.findOneAndUpdate({
                patient_id: req.body.patient_id
            }, {
                $set: {
                    "active_bed_details.date": "",
                    "active_bed_details.center_id": "",
                    "active_bed_details.section_id": "",
                    "active_bed_details.bed_no": "",  
                    discharge_status: req.body.discharge_status, 
                    discharge_brefing: req.body.discharge_brefing
                },
                
            
                $push: { 
                    "previous_bed_details.start_date": patient_found.active_bed_details.date,
                    "previous_bed_details.end_date": req.body.discharge_date,
                    "previous_bed_details.center_id": patient_found.active_bed_details.center_id,
                    "previous_bed_details.bed_no": patient_found.active_bed_details.bed_no,
                    "previous_bed_details.section_id": patient_found.active_bed_details.section_id,
                } 

            }, (err, patient_updated) => {});
            

            

            res.redirect("/patientmanagement");
        }
    });
});
app.post('/add_health_record', (req, res) => {
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
app.post('/shift_patient_section', (req, res) => {
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

            Sections.findOneAndUpdate({
                section_id: patient_found.active_bed_details.section_id
            }, { $pull: { active_patient_ids: patient_found.patient_id } }, (err, from_section_found) => {
                
            });
    
          
            Sections.findOneAndUpdate({
                section_id: req.body.to_section_id
            }, { $push: { active_patient_ids: patient_found.patient_id } }, (err, to_section_found) => {
                
           
      

            Patient.findOneAndUpdate({
                patient_id: req.body.patient_id
            }, {
                $set: {
                    "active_bed_details.date": req.body.date,
                    "active_bed_details.center_id":  to_section_found.center_id,
                    "active_bed_details.section_id": req.body.to_section_id,
                    "active_bed_details.bed_no": req.body.bed_no,  
                    discharge_status: "ACTIVE"
                },
                
            
                $push: { 
                    "previous_bed_details.start_date": patient_found.active_bed_details.date,
                    "previous_bed_details.end_date": req.body.date,
                    "previous_bed_details.center_id": to_section_found.center_id,
                    "previous_bed_details.bed_no": patient_found.active_bed_details.bed_no,
                    "previous_bed_details.section_id": patient_found.active_bed_details.section_id,
                } 

            }, (err, patient_updated) => {});
            

        });

            res.redirect("/patientmanagement");
        }
    });
});
app.post('/add_referral', (req, res) => {
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
                referral_date:  req.body.date.toUpperCase(),
                from_center_id:  req.body.from_center_id.toUpperCase(),
                to_center_id:  req.body.to_center_id.toUpperCase(),
                urgency:  req.body.urgency.toUpperCase(),
                referred_by:  req.body.referred_by.toUpperCase(),
                referred_briefing:  req.body.referred_briefing.toUpperCase(),
                referred_status:  "ACTIVE",
                bed_category:req.body.bed_category                
            });
            referral.save();
            res.redirect("/patientmanagement");
        }
    });
});
app.get("/referralsmanagement", function (req, res) {
    Referral.find({}, (err, referral_list) => {
        console.log(referral_list);
        res.render("TECEADS/incoming_referrals_management", {
            referral_list: referral_list
        });
    });
});
app.post('/accept_referral', (req, res) => {
console.log(req.body)
    Referral.findOneAndUpdate({
        referral_id: req.body.referral_id
    }, {
        $set: {
            referred_status:  "ACCEPTED",
            referred_status_briefing: req.body.notes,
            referred_approval_bed: req.body.bed_number
        }

    }, (err, patient_updated) => {
        console.log(patient_updated)


        res.redirect("/referralsmanagement");


    });
    
});

app.post('/reject_referral', (req, res) => {
    Referral.findOneAndUpdate({
                referral_id: req.body.referral_id
            }, {
                $set: {
                    referred_status:  "REJECTED",
                    referred_status_briefing: req.body.reason,
                }
        
            }, (err, patient_updated) => {
                res.redirect("/referralsmanagement");
        
            });
        
            
});
app.post('/discharge_referral', (req, res) => {
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
        referred_status:  "SHIFTING"
        
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
            }, { $pull: { active_patient_ids: patient_found.patient_id } }, (err, section_found) => {
                
            });
            Center.findOneAndUpdate({
                center_id: patient_found.active_bed_details.center_id
            }, { $pull: { active_patient_ids: patient_found.patient_id } }, (err, center_found) => {
                
            })

            Patient.findOneAndUpdate({
                patient_id: found_referral.patient_id
            }, {
                $set: {
                    "active_bed_details.date": "",
                    "active_bed_details.center_id": "",
                    "active_bed_details.section_id": "",
                    "active_bed_details.bed_no": "",  
                    discharge_status: "REFERRED", 
                    discharge_brefing: req.body.notes
                },
                
            
                $push: { 
                    "previous_bed_details.start_date": patient_found.active_bed_details.date,
                    "previous_bed_details.end_date": req.body.date,
                    "previous_bed_details.center_id": patient_found.active_bed_details.center_id,
                    "previous_bed_details.bed_no": patient_found.active_bed_details.bed_no,
                    "previous_bed_details.section_id": patient_found.active_bed_details.section_id,
                } 

            }, (err, patient_updated) => {});
            

            

            res.redirect("/referralsmanagement");
        }
    });
});


    
});
app.post('/admit_patient_referral', (req, res) => {
    console.log(req.body);
    Referral.findOneAndUpdate({
        referral_id: req.body.referral_id
    }, { $set: {                
        referred_status:  "SERVED"

    } }, (err, referral_found) => {
            Patient.findOneAndUpdate({
                patient_id: referral_found.patient_id
            }, {
                $set: {                
                admission_date: req.body.admission_date.toUpperCase(),
                "active_bed_details.date": req.body.admission_date.toUpperCase(),
                "active_bed_details.center_id": req.body.center_id.toUpperCase(),
                "active_bed_details.section_id": req.body.section_id.toUpperCase(),
                "active_bed_details.bed_no": req.body.bed_no.toUpperCase(),
                discharge_status:"ACTIVE"
            }
                
            }, (err, patient_updated) => {
                Sections.findOneAndUpdate({
                    section_id: req.body.section_id
                }, { $push: { active_patient_ids: patient_updated.patient_id } }, (err, section_found) => {
                    
                });
                Center.findOneAndUpdate({
                    center_id: req.body.center_id
                }, { $push: { active_patient_ids: patient_updated.patient_id } }, (err, center_found) => {
                    
                });
                
                    
                });
            });

            

            res.redirect("/patientmanagement");
     
});

app.post('/notshown_patient_referral', (req, res) => {
    console.log(req.body);
    Referral.findOneAndUpdate({
        referral_id: req.body.referral_id
    }, { $set: {                
        referred_status:  "NOT_SHOWN"

    } }, (err, referral_found) => {
            Patient.findOneAndUpdate({
                patient_id: referral_found.patient_id
            }, {
                $set: {                
               
                discharge_status:"NOT_SHOWN",
                discharge_brefing: req.body.discharge_brefing,
                
            }
                
            }, (err, patient_updated) => {
               
            });

          
                
            })

            res.redirect("/patientmanagement");
        
});
app.get("/updateactivecase", function (req, res) {
    Report_Patient.find({}, (err, patients_list) => {
        console.log(patients_list);
        res.render("TECEADS/update_active_cases", {
            patients_list: patients_list
        });
    });
});
app.post('/master_file_active_case', (req, res) => {
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
                    if(!err){
                        result_["MASTER SHEET"].forEach(element => {
                            if(element.A >= 0){
                                const report_patients = new Report_Patient({
                                    srno: element.A,
                                    block: element.B,
                                    name: element.C,
                                    age: element.D,
                                    sex: element.E,
                                    address: element.F,
                                    contact: element.G,
                                    positive_declare_date: element.H,
                                    present_status: element.I
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
app.get("/sectionmanagement", function (req, res) {
    Center.find({}, (err, centers_list) => {
     Sections.find({}, (err, section_list) => {
        console.log(centers_list);
        res.render("TECEADS/section_management", {
            section_list: section_list,
            centers_list: centers_list
        });
     });
    });
});
app.post('/add_section', (req, res) => {
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
            const section = new Sections({
                section_id: counterOut.prefix + counterOut.count,
                center_id: req.body.center_id,
                category: req.body.category.toUpperCase(),
                floor: req.body.floor.toUpperCase(),
                room_name: req.body.room_name.toUpperCase(),
                no_of_beds: req.body.no_of_beds.toUpperCase(),
                no_of_ventilators: req.body.no_of_ventilators.toUpperCase(),
                incharge_name: req.body.incharge_name.toUpperCase(),
                telephone: req.body.telephone.toUpperCase()
            });
            section.save();
            res.redirect("/sectionmanagement");
        }
    });
});

function auth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
app.post('/login', passport.authenticate("local", {
    successRedirect: "/index",
    failureRedirect: "/login"
}), function (req, res) {
    console.log(req.body);
});


app.listen(7087, function () {
    console.log("Server is on port on 7087");
});