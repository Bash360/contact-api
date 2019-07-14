"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const users_1 = __importDefault(require("./routes/users"));
const app = express_1.default();
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/', users_1.default);
app.use('/users', users_1.default);
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (_err, _req, _res, _next) {
    // set locals, only providing error in development
    _res.locals.message = _err.message;
    _res.locals.error = _req.app.get('env') === 'development' ? _err : {};
    _res.status(_err.status || 500);
    _res.render('error');
});
module.exports = app;
//# sourceMappingURL=app.js.map