/** Hàm kiểm tra chuỗi (có rỗng/ có độ dài đúng yêu cầu) không?
 * @param {string} value Chuỗi cần kiểm tra
 * @param {number} minLength Độ dài tối thiểu 
 * @param {number} maxLength Độ dài tối đa
 * @param {any} selector Thẻ chứa lỗi cần hiển thị
 * @param {string} messErr Lỗi hiển thị UI
 */
function checkedString(value, minLength, maxLength, selector, messErr) {
    if (value.trim().length < minLength || value.trim().length > Number(maxLength)) {
        document.querySelector(selector).innerHTML = messErr;
        document.querySelector(selector).style.display = 'block';
        return false;
    } else {
        document.querySelector(selector).innerHTML = '';
        return true;
    }
};

export default checkedString