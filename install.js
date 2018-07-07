!function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=76)}([function(e,t){e.exports=require("mongoose")},,function(e,t,r){"use strict";const n=r(0),i=r(11);r(27),n.Promise=global.Promise;const o={};e.exports.slat=(()=>"MkY4NUNDLTQ1QS04NUUtRkFCLTJDOTMtNTlFMi0xOEFGNi0zNDE1NC02MjdDQQ"),e.exports.connection=((e,t)=>{let r=t||function(){};return e&&"default"!=e||(e=process.env.DB_NAME),void 0!==o[e]?o[e]:(i.info("Creating connection for: "+e),o[e]=n.createConnection("mongodb://"+process.env.DB_HOST+"/"+e,{useMongoClient:!0}),o[e].on("connected",()=>{i.info("Connection created for: "+e),r(null,e)}),o[e].on("error",t=>{i.error("Error in connection for: "+e,t),r(t,e),process.exit(1)}),o[e])}),process.on("SIGINT",function(){n.connection.close(function(){i.info("Database disconnected on app termination"),process.exit(0)})})},,,,function(e,t){e.exports=require("fs")},function(e,t,r){const n=r(24),i=r(6),o=r(10),s="resources/media";i.existsSync(o.resolve(process.cwd(),s))||n(o.resolve(process.cwd(),s));e.exports=class{static rules(){return{type:"required|in:image",file:"required|size:3mb|mime:png,jpg"}}static move(e){const t=new Date,r=t.getFullYear()+"",n=t.getMonth()+1+"";let a=o.join(process.cwd(),s,r);i.existsSync(a)||i.mkdirSync(a),a=o.join(a,n),i.existsSync(a)||i.mkdirSync(a);const c=o.basename(e);return a=o.join(a,c),i.copyFileSync(e,a),i.unlink(e,()=>{}),o.join(r,n,c)}static exists(e){if(!e||"string"!=typeof e)return!1;e=o.normalize(e).replace(/^(\.\.[\/\\])+/,"");let t=o.join(process.cwd(),s,e);return i.existsSync(t)}static remove(e){return new Promise((t,r)=>{if(!e||"string"!=typeof e)return void r("Invalid path");e=o.normalize(e).replace(/^(\.\.[\/\\])+/,"");let n=o.join(process.cwd(),s,e);i.unlink(n,e=>{e?r(e):t(n)})}).catch(()=>{})}static stream(e){e=o.normalize(e).replace(/^(\.\.[\/\\])+/,"");let t=o.join(process.cwd(),s,e);return i.createReadStream(t)}}},function(e,t,r){"use strict";const n=r(2),i=r(0),o=r(25),s=r(7),a=r(17).Listner,c=r(19),u=new i.PlutoSchema({name:{type:String,required:!0},username:{type:String,required:!0,unique:!0},email:{type:String,lowercase:!0,unique:!0,required:!0},location:{type:String,required:!0},password:{type:String,select:!1,required:!1},image:{type:String,required:!1},trusted:{type:String,default:"yes",enum:["yes","no"]},role:{type:String,default:"member",enum:["member","manager","admin","master"]},status:{type:String,default:"inactive",enum:["active","inactive","blocked"]}},{timestamps:!0});u.pre("save",function(e){let t=this;if(!t.isModified("password"))return e();o.hash(t.password,(r,n)=>{t.password=n,e(r)})}),u.post("findOneAndRemove",function(e){e&&s.remove(e.image)}),u.methods.comparePassword=function(e){return o.verify(e,this.password)},u.statics.rules={name:"required|maxLength:50",email:"required|email",username:"required|maxLength:15|minLength:3",password:"minLength:5",role:"in:admin,member,manager",status:"in:active,blocked,inactive",trusted:"in:yes,no",location:"required|maxLength:100",image:"media"},e.exports.get=(e=>n.connection(e).model("User",u)),a.on("user.created",function(e,t){e.password=null,c.template(e.email,"Account Information","user.new",{user:e,password:t})}),a.on("user.updated",function(){}),a.on("user.status.changed",function(){}),a.on("user.deleted",function(){}),a.on("user.password.reset",function(e,t){c.template(e.email,"Password Reset Request","user.reset-password",{user:e,password:t})})},function(e,t){e.exports=require("bcrypt")},function(e,t){e.exports=require("path")},function(e,t,r){const n=r(29);e.exports=new n({enable:process.env.LOGING||!1,mode:process.env.MODE})},,,,function(e,t,r){"use strict";const n=r(2),i=r(0),o=(r(9),r(7)),s=new i.PlutoSchema({name:{type:String,required:!0},description:{type:String,required:!0},video_link:{type:String,required:!0},image:{type:String,required:!1},target_muscle:{type:String,required:!0},equipment_type:{type:String,required:!0},exercise_type:{type:String,required:!0},mechanics_type:{type:String,required:!0},level:{type:String,required:!0}},{timestamps:!0});s.statics.rules={name:"required|maxLength:50",description:"required|maxLength:500",video_link:"required|maxLength:100",target_muscle:"required|maxLength:50",equipment_type:"required|maxLength:50",exercise_type:"required|maxLength:50",mechanics_type:"required|maxLength:50",level:"required|maxLength:50"},s.post("findOneAndRemove",function(e){e&&o.remove(e.image)}),e.exports.get=(e=>n.connection(e).model("Exercise",s))},,function(e,t,r){const n=new(r(23).EventEmitter);e.exports=class{static emit(){return n.emit(...arguments)}static dispatch(){return this.emit(...arguments)}},e.exports.Listner=class{static on(){n.on(...arguments)}}},,function(e,t,r){"use strict";const n=r(22),i=(r(6),r(21)),o=r(10);e.exports.template=class{};e.exports=new class{async template(e,t,r,n={}){try{let s=o.resolve(process.cwd(),"resources/mail",r.replace(".","/")+".ejs.html");n.subject=t;let a={to:e,subject:t,html:await i.renderFile(s,n)};return await this.transporter(a),!0}catch(e){console.error(e)}return!1}async system(e,t={}){}text(e,t,r){let n={to:e,subject:t,text:r};return this.transporter(n)}hmtl(e,t,r){let n={to:e,subject:t,html:i.render(r,data)};return this.transporter(n)}async transporter(e){return new Promise((t,r)=>{n.createTestAccount((i,o)=>{let s=n.createTransport({host:process.env.MAIL_HOST||"smtp.ethereal.email",port:process.env.MAIL_PORT||587,secure:process.env.MAIL_SECURE||!1,auth:{user:process.env.MAIL_USER||o.user,pass:process.env.MAIL_PASSWORD||o.pass}});e.from=process.env.MAIL_FROM||o.user,s.sendMail(e,(e,n)=>{if(e)return r(e),console.log(e);t(n),console.log("Message sent: %s",n.messageId)})})})}}},,function(e,t){e.exports=require("ejs")},function(e,t){e.exports=require("nodemailer")},function(e,t){e.exports=require("events")},function(e,t){e.exports=require("mkdirp")},function(e,t,r){bcrypt=r(9),e.exports.hash=function(e,t){let r=t||function(){};return new Promise((t,n)=>{bcrypt.genSalt(parseInt(process.env.SALT_WORK_FACTOR)||10,function(i,o){i&&(r(i),n(i)),bcrypt.hash(e,o,function(e,i){e&&(r(e),n(e)),r(e,i),t(i)})})})},e.exports.verify=function(e,t){return new Promise((r,n)=>{bcrypt.compare(e,t,function(e,t){if(e)return n(e);r(t)})})}},function(e,t){e.exports=require("util")},function(e,t,r){const n=r(0);function i(){n.Schema.apply(this,arguments),this.query.fail=async function(e){let t=await this.exec();return t||e.throw(404,this.model.modelName+" not found")},this.query.paginate=function(e){let t=e.perPage(),r=Math.max(0,e.request.query.page-1),n=this.toConstructor();return new Promise((i,o)=>{this.count().exec(function(s,a){s&&o(s),n().limit(t).skip(t*r).exec(function(n,s){n&&o(n),e.meta.pagination={totalRecords:a,currentPage:r+1,totalPages:Math.ceil(a/t),itemsPerPage:t},i(s)})})})}}r(26).inherits(i,n.Schema),n.PlutoSchema=i},function(e,t){e.exports=require("chalk")},function(e,t,r){const n=r(28);e.exports=class{constructor(e){this.canWrite=e.enable||!1,this.mode=e.mode||"verbose",this.consoleLogger="verbose"==this.mode,this.fileLogger=e.fileLogger||!0,this.nl=e.nl||"\n",this.path=e.path,this._prefix=e.prefix||""}prefix(e){this._prefix=e}enable(){this.canWrite=!0}disable(){this.canWrite=!1}verbose(){this.mode="verbose",this.consoleLogger=!0}error(){this.write("error",arguments)}debug(){this.write("debug",arguments)}warn(){this.write("warn",arguments)}warning(){this.write("warn",arguments)}info(){this.write("info",arguments)}write(e,t){if(this.canWrite)return"String"==typeof t&&(t={0:t}),t=Object.values(t),"error"==e?(t.unshift("red"),void this.writeToConsole.apply(this,t)):"info"==e?(t.unshift("magenta"),void this.writeToConsole.apply(this,t)):"debug"==e?(t.unshift("green"),void this.writeToConsole.apply(this,t)):"warn"==e?(t.unshift("yellow"),void this.writeToConsole.apply(this,t)):void 0}writeToConsole(e,...t){if(this.consoleLogger&&arguments.length)for(let r in t)console.log(n[e](this._prefix+t[r]))}writeToFile(){this.fileLogger}}},function(e,t){e.exports=require("dotenv")},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(e,t){e.exports=require("faker")},,,function(e,t){e.exports={name:"Bill Goldberg",username:"admin",email:"admin@example.com",password:"000000",status:"active",location:"mohali",role:"master"}},function(e,t){e.exports=require("glob")},function(e,t,r){r(68);const n=r(11);e.exports=class{async init(e=1){n.info("Sedding: "+this.constructor.name);let t=[];if(e>0)for(let r=1;r<=e;r++)t.push(await this.generate());e<=0&&(t=await this.generate());try{return await this.model().insertMany(t,{ordered:!1})}catch(e){n.error(e)}}}},function(e,t,r){(function(t){r(68);const n=r(73),i=r(72),o=r(6),s=r(15);e.exports=new class extends n{constructor(){super(),this.feeds=[],i(t+"/exercises/*/*.json",(e,t)=>{if(e)throw new Error(e);t.forEach(e=>{this.feeds.push(o.readFileSync(e))})})}async generate(){let e=[];for(let t of this.feeds){let r=JSON.parse(t);e.push({name:r.name,description:r.description,video_link:r.video,image:r.images[0],target_muscle:r.targetMuscle,equipment_type:r.equipmentType,exercise_type:r.type,mechanics_type:"n/a",level:r.level})}return e}model(){return s.get()}}}).call(this,"resources/seeds")},function(e,t,r){"use strict";r(30).config({path:`${process.cwd()}/.env`,overwrite:!0});const n=r(11),i=(r(6),r(74));n.prefix("prod: "),n.verbose(),n.enable(),n.info("Target DB -> "+process.env.DB_NAME),n.info("Installing production application"),n.info("Loading environment variables");const o=r(2),s=r(71),a=r(8),c=o.connection(),u=async()=>{n.info("Starting production migrations"),await p(),await l()},l=async()=>{n.info("Seeding database"),await i.init(0)},p=async function(e){const t=a.get();n.info("Creating master user");const r=new t(s);await r.save()};e.exports=(async e=>{n.info("Cleaning database...");await c.dropDatabase();return await u(),!0})},function(e,t,r){r(75)().then(()=>{console.log("Installation completed!"),process.exit()}).catch(e=>{throw e})}]);