"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromHeader('auth-token');
opts.secretOrKey = 'shishilid';
const passport = require("passport");
const User = require('../model/User');


passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    const user = {id: jwt_payload.id}
    console.log("in pasport")
    // User.findOne({_id: jwt_payload.id}, function(err, user) {
    //     if (err) {
    //         return done(err, false);
    //     }
    //     if (user) {
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //     }
    // });
    // return done(null, null)
    return done(null, user);
}));