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
 * Subscription
 * @typedef {Object} Subscription
 * @prop {AccountMini} account
 * @prop {datetime} activatedAt - Activated at
 * @prop {Array.<SubscriptionAddOn>} addOns - Add-ons
 * @prop {number} addOnsTotal - Total price of add-ons
 * @prop {datetime} bankAccountAuthorizedAt - Recurring subscriptions paid with ACH will have this attribute set. This timestamp is used for alerting customers to reauthorize in 3 years in accordance with NACHA rules. If a subscription becomes inactive or the billing info is no longer a bank account, this timestamp is cleared.
 * @prop {datetime} canceledAt - Canceled at
 * @prop {string} collectionMethod - Collection method
 * @prop {Array.<CouponRedemptionMini>} couponRedemptions - Coupon redemptions
 * @prop {datetime} createdAt - Created at
 * @prop {string} currency - 3-letter ISO 4217 currency code.
 * @prop {datetime} currentPeriodEndsAt - Current billing period ends at
 * @prop {datetime} currentPeriodStartedAt - Current billing period started at
 * @prop {string} customerNotes - Customer notes
 * @prop {string} expirationReason - Expiration reason
 * @prop {datetime} expiresAt - Expires at
 * @prop {string} id - Subscription ID
 * @prop {number} netTerms - Integer representing the number of days after an invoice's creation that the invoice will become past due. If an invoice's net terms are set to '0', it is due 'On Receipt' and will become past due 24 hours after it’s created. If an invoice is due net 30, it will become past due at 31 days exactly.
 * @prop {SubscriptionChange} pendingChange
 * @prop {PlanMini} plan
 * @prop {string} poNumber - For manual invoicing, this identifies the PO number associated with the subscription.
 * @prop {number} quantity - Subscription quantity
 * @prop {number} remainingBillingCycles - Remaining billing cycles
 * @prop {ShippingAddress} shippingAddress
 * @prop {string} state - State
 * @prop {number} subtotal - Estimated total, before tax.
 * @prop {string} termsAndConditions - Terms and conditions
 * @prop {datetime} trialEndsAt - Trial period ends at
 * @prop {datetime} trialStartedAt - Trial period started at
 * @prop {number} unitAmount - Subscription unit price
 * @prop {datetime} updatedAt - Last updated at
 * @prop {string} uuid - The UUID is useful for matching data with the CSV exports and building URLs into Recurly's UI.
 */
class Subscription extends Resource {
  static getSchema () {
    return {
      account: 'AccountMini',
      activatedAt: Date,
      addOns: ['SubscriptionAddOn'],
      addOnsTotal: Number,
      bankAccountAuthorizedAt: Date,
      canceledAt: Date,
      collectionMethod: String,
      couponRedemptions: ['CouponRedemptionMini'],
      createdAt: Date,
      currency: String,
      currentPeriodEndsAt: Date,
      currentPeriodStartedAt: Date,
      customerNotes: String,
      expirationReason: String,
      expiresAt: Date,
      id: String,
      netTerms: Number,
      pendingChange: 'SubscriptionChange',
      plan: 'PlanMini',
      poNumber: String,
      quantity: Number,
      remainingBillingCycles: Number,
      shippingAddress: 'ShippingAddress',
      state: String,
      subtotal: Number,
      termsAndConditions: String,
      trialEndsAt: Date,
      trialStartedAt: Date,
      unitAmount: Number,
      updatedAt: Date,
      uuid: String
    }
  }
}

module.exports = Subscription
