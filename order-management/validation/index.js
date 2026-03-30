const validation = (item) => {
    
    const quantity = Number(item?.quantity);
    const unitPrice = Number(item?.unitPrice);
    const orderDate = new Date(item?.orderDate);
    const customerName = item?.customerName
    const productName = item?.productName

    /* 
        [a-zA-Z] — chữ cái Latin a-z, A-Z
        \s — khoảng trắng
        {2,100} — độ dài 2–100 ký tự
    */
    const customerNameRegex = /^[a-zA-Z\s]{10,100}$/;

    /* 
        [a-zA-Z0-9] — chữ Latin và số
        \-\/\. — cho phép -, /, .
        {1,200} — độ dài 1–200 ký tự
    */
    const productNameRegex = /^[a-zA-Z0-9\s\-\/\.]{10,200}$/;
    
    if (!customerName || !customerNameRegex.test(customerName))
        return "customerName chỉ chứa chữ Latin và khoảng trắng (10–100 ký tự)";

    if (!productName || !productNameRegex.test(productName))
        return "productName chỉ chứa chữ Latin, số, -, /, . (10–200 ký tự)";

    if (quantity <= 0) return "quantity phải > 0 và là số nguyên"

    if (unitPrice <= 0) return "unitPrice phải > 0"

    if (orderDate < new Date().setHours(0, 0, 0, 0)) return "orderDate không được nhỏ hơn ngày hiện tại"

    return null;
}


module.exports = { validation };
