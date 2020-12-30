var connection = require('../koneksi')
var response = require('../res')
var config = require('../config/secret')

var mysql = require('mysql')
var md5 = require('md5')
var jwt = require('jsonwebtoken')
var ip = require('ip')
