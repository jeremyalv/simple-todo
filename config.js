const $ = function(selector) {
  return document.querySelector(selector);
};
const ENTER_KEYCODE = 13;
const CROSS_HEX = '&#10006';
const CHECK_HEX = '&#10004';
const CROSS_ITEM_CLASSNAME = 'btn list-item-cross';
const CHECK_ITEM_CLASSNAME = 'btn list-item-check';
const BUTTON_DIV_CLASSNAME = 'command-button-div'

export { $, ENTER_KEYCODE, CROSS_HEX, CHECK_HEX, CROSS_ITEM_CLASSNAME, CHECK_ITEM_CLASSNAME, BUTTON_DIV_CLASSNAME };