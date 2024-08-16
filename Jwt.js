const mixer = require('sools-core/mixer')
const { Model, String } = require('sools-modeling/types')
const User = require('../../../../management/shared/User')
const securityStrategy = require('../../../../management/shared/securityStrategy')
const ControllerError = require('sools-modeling/controlling/ControllerError')

module.exports = class Jwt extends mixer.extends(Model) {

}
  .define({
    name: 'jwt',
    pluralName: 'jwts',
    root: true,
  })
  .properties({
    user: {
      type: User,
      state: {
        required: true,
      }
    },
    name: {
      type: String,
      state: {
        required: true
      }
    },
    id: {
      type: String,
      state: {
        disabled: true,
      }
    },
    key: {
      type: String,
      state: {
        disabled: true
      }
    }
  })
  .controllers({
    create: {
      requires: [securityStrategy],
      check(context) {
        if (!context.user) {
          throw new ControllerError(`You must be connected to create a jwt'`)
        }
      },
    },
    update: {
      requires: [securityStrategy],
      check(context, jwt) {
        if (!jwt.user.equals(context.user)) {
          throw new ControllerError(`User don't have sufficient rights`)
        }
      },
    }
  })