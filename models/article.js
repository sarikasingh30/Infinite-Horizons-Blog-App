const mongoose=require("mongoose")
/*
Slugify is a npm package used to convert strings into URL-friendly slugs. Slugs are commonly used in web development 
for generating human-readable URLs from titles, names, or other strings. The slugified version of a string typically 
contains only lowercase alphanumeric characters, dashes, and underscores, making it suitable for use in URLs.
*/
const slugify=require("slugify")
const articleSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    des:{
        type:String,
        required:true
    },
    info:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    slug:{
        type:String,
        required:true,
        unique:true
    }
},
{timestamps: true} 
)

articleSchema.pre("validate",function(next){
    if(this.title){
        this.slug=slugify(this.title,{lower:true, strict:true})
    }
    next()
})

module.exports=mongoose.model("Article",articleSchema)