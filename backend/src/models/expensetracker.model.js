const mongoose=require("mongoose");
let date=new Date();
let month=date.getMonth()
let year=date.getFullYear()
let today=date.getDate();
let x=today+"-"+month+"-"+year;
console.log(x)
const Schema=new mongoose.Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    
    //             type:String,
    //             required:true
                
    //         },
    //         AccountNumber:{
    //             type:Number,
    //             required:true,
    //             unique:true
    //         },
    //         Paise:{
    //             type:Number,
    //             required:true
    //         },
    //         Bank:{
    //             type:String,
    //             required:true
    //         },
    Amount:{
        type:Number,
        required:true
    },
Categories:{
    
        Food:[{
            Name:{
                type:String
            },

            Amount:{
                type:Number
            },
            Account:{
                type:Number
            },
            Place:{
                type:String
            },
            Description:{
                type:String
            },
            image:{
                type:String,
                default:"https://cdn-icons-png.flaticon.com/512/2819/2819194.png"
            }
        }],
        Transportation:[{
            Name:{
                type:String
            },
            Amount:{
                type:Number
            },
            Account:{
                type:Number
            },
            Description:{
                type:String
            },
            image:{
                type:String,
                default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQv0bevhcgTqXvEWUSBPVeQRhqq83jhmrP9A&usqp=CAU"
            }
        }],
        Education:[{
            Name:{
                type:String
            },
            Amount:{
                type:Number
            },
            Account:{
                type:Number
            },
            Description:{
                type:String
            },image:{
                type:String,
                default:"https://cdn-icons-png.flaticon.com/512/4366/4366867.png"
            }
        }],
        Shopping:[{
            Name:{
                type:String
            },
            Amount:{
                type:Number
            },
            Account:{
                type:Number
            },
            Description:{
                type:String
            },image:{
                type:String,
                default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWjM3lW74Wz0JzB__6JLWCxqpJodOThdotzA&usqp=CAU"
            }
        }],
        Other:[{
            Name:{
                type:String
            },
            Amount:{
                type:Number
            },
            Account:{
                type:Number
            },
            Description:{
                type:String
            },image:{
                type:String,
                default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfuGoPkRRXfJcHfUxamXHT2GNT5QYPUN2Rfw&usqp=CAU"
            }
        }]

    },
    Budgets:{
        Food:{
            initialAmount:{
                    type:Number,
                    default:0
                 },
                 limit:{
                    type:Number,
                    default:0
                 }
            },
            Transportation:{
                initialAmount:{
                   type:Number,
                   default:0
                },
                limit:{
                   type:Number,
                   default:0
                }
           },
           Education:{
            initialAmount:{
               type:Number,
               default:0
            },
            limit:{
               type:Number,
               default:0
            }
       },
       Shopping:{
        initialAmount:{
           type:Number,
           default:0
        },
        limit:{
           type:Number,
           default:0
        }
   },
   Other:{
    initialAmount:{
       type:Number,
       default:0
    },
    limit:{
       type:Number,
       default:0
    }
},
date:{
    type:String,
    default:x
}

        
    }

})
const ExpenseModel=mongoose.model("expense",Schema);
module.exports=ExpenseModel;