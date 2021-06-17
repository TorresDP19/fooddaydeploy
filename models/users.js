
const 
    mongoose = require ('mongoose'),
    Schema = mongoose.Schema;

const UserSchema = Schema ({
    name: {
        type: String,
        trim: true,
        required: [true, "El nombre es obligatorio"]
    },
    fathersurname: {
        type: String,
        trim: true,
        required: [true, "El apellido paterno es obligatorio"]
    },
    mothersurname: {
        type: String,
        trim: true,
        required: [true, "El apellido materno es obligatorio"]
    },
    email: {
        type: String,
		lowercase: true,
		trim: true,
		required: [true, "El correo electronico es obligatorio"],
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    creditcard: {
        type: String,
        trim: true,
        required: [true, "La tarjeta de credito es obligatoria"]
    },
    nip: {
        type: String,
        trim: true,
        required: [true, "El NIP es obligatorio"]
    },
    expiration_date: {
        type: String,
        trim: true,
        required: [true, "La fecha de vencimiento es obligatoria"]
    },
    role: {
        type: String
    },
    cart: [
        Array,
    ],
    creation_date: {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('Users_Schema', UserSchema);