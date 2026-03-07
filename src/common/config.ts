import convict from 'convict';

const schema = convict({
  port: {
    doc: 'The application port',
    format: Number,
    default: 3000,
    env: 'PORT',
  },
  email: {
    disabled: {
      doc: 'If true, do not use email client',
      format: Boolean,
      default: false,
      env: 'EMAIL_DISABLED',
    },
    service: {
      doc: 'Service type for email',
      format: String,
      default: 'gmail',
      env: 'EMAIL_SERVICE',
    },
    auth: {
      user: {
        doc: 'Login for email',
        format: String,
        default: '',
        env: 'EMAIL_USER',
      },
      pass: {
        doc: 'Password for email',
        format: String,
        default: '',
        env: 'EMAIL_PASSWORD',
      },
    },
    hello: {
      subject: {
        doc: 'Confirm your email',
        format: String,
        default: 'Confirm your email',
        env: 'EMAIL_HELLO_SUBJECT',
      },
    },
  },
  frontend: {
    baseUrl: {
      doc: 'Fronted application base URL',
      format: String,
      default: 'http://localhost:5000',
      env: 'FRONTEND_URL',
    },
    confirmUrl: {
      doc: 'Fronted confirm-account url',
      format: String,
      default: '/confirm',
      env: 'FRONTEND_CONFIRM_URL',
    },
  },
  password: {
    code: {
      min: {
        doc: 'Password reset code minimum value',
        format: Number,
        default: 9_999,
        env: 'PASSWORD_RESET_CODE_MIN',
      },
      max: {
        doc: 'Password reset code maximum value',
        format: Number,
        default: 999_999,
        env: 'PASSWORD_RESET_CODE_MAX',
      },
      expirationDays: {
        doc: 'Password expiration days',
        format: Number,
        default: 7,
        env: 'PASSWORD_RESET_EXPIRATION_DAYS',
      },
      attempts: {
        doc: 'Password reset attempts',
        format: Number,
        default: 3,
        env: 'PASSWORD_RESET_ATTEMPTS',
      },
    },
  },
  seedUser: {
    email: {
      doc: 'Initial user email',
      format: String,
      default: '',
      env: 'USER_EMAIL',
    },
    password: {
      doc: 'Initial user password',
      format: String,
      default: '',
      env: 'USER_PASSWORD',
    },
    firstName: {
      doc: 'Initial user name',
      format: String,
      default: '',
      env: 'USER_FIRST_NAME',
    },
    lastName: {
      doc: 'Initial user last name',
      format: String,
      default: '',
      env: 'USER_LAST_NAME',
    },
  },
});

schema.validate({ allowed: 'strict' });

export const config = schema.getProperties();
