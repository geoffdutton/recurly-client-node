/* istanbul ignore file */
/**
 * This file is automatically created by Recurly's OpenAPI generation process
 * and thus any edits you make by hand will be lost. If you wish to make a
 * change to this file, please create a Github issue explaining the changes you
 * need and we will usher them to the appropriate places.
 */
'use strict'

const Resource = require('../Resource')

/**
 * Account
 * @typedef {Object} Account
 * @prop {Address} address
 * @prop {BillingInfo} billingInfo
 * @prop {string} ccEmails - Additional email address that should receive account correspondence. These should be separated only by commas. These CC emails will receive all emails that the `email` field also receives.
 * @prop {string} code - The unique identifier of the account. This cannot be changed once the account is created.
 * @prop {string} company
 * @prop {datetime} createdAt - When the account was created.
 * @prop {datetime} deletedAt - If present, when the account was last marked inactive.
 * @prop {string} email - The email address used for communicating with this customer. The customer will also use this email address to log into your hosted account management pages. This value does not need to be unique.
 * @prop {string} firstName
 * @prop {string} hostedLoginToken - The unique token for automatically logging the account in to the hosted management pages. You may automatically log the user into their hosted management pages by directing the user to: `https://{subdomain}.recurly.com/account/{hosted_login_token}`.
 * @prop {string} id
 * @prop {string} lastName
 * @prop {string} preferredLocale - Used to determine the language and locale of emails sent on behalf of the merchant to the customer.
 * @prop {Array.<ShippingAddress>} shippingAddresses - The shipping addresses on the account.
 * @prop {string} state - Accounts can be either active or inactive.
 * @prop {boolean} taxExempt - The tax status of the account. `true` exempts tax on the account, `false` applies tax on the account.
 * @prop {datetime} updatedAt - When the account was last changed.
 * @prop {string} username - A secondary value for the account.
 * @prop {string} vatNumber - The VAT number of the account (to avoid having the VAT applied). This is only used for manually collected invoices.
 */
class Account extends Resource {
  static getSchema () {
    return {
      address: 'Address',
      billTo: String,
      billingInfo: 'BillingInfo',
      ccEmails: String,
      code: String,
      company: String,
      createdAt: Date,
      customFields: ['CustomField'],
      deletedAt: Date,
      email: String,
      exemptionCertificate: String,
      firstName: String,
      hostedLoginToken: String,
      id: String,
      lastName: String,
      parentAccountId: String,
      preferredLocale: String,
      shippingAddresses: ['ShippingAddress'],
      state: String,
      taxExempt: Boolean,
      updatedAt: Date,
      username: String,
      vatNumber: String
    }
  }
}

module.exports = Account
