/**
 * We don't need to get the position of the element on native platforms because the popover will be bottom mounted
 *
 * @returns {Object}
 */
function getPaymentMethodScreenLocation() {
    return {
        bottom: 0,
        left: 0,
    };
}

export default getPaymentMethodScreenLocation;